<template>
  <div class="pdf-view">
    <!-- <div class="btn-group">
      <el-button-group>
        <el-button type="primary" @click="firstPageHandler"
          >跳转到第一页</el-button
        >

        <el-button
          type="primary"
          icon="el-icon-arrow-left"
          @click="previousPage"
          >上一页</el-button
        >
        <el-button type="primary" @click="nextPage"
          >下一页<i class="el-icon-arrow-right el-icon--right"></i
        ></el-button>

        <el-button type="primary" @click="lastPageHandler"
          >跳转到最后一页</el-button
        >
      </el-button-group>
    </div> -->

    <div :style="{ width: pdfWidth, margin: `0 auto` }">
      <canvas
        v-for="page in totalPage"
        :id="'pdfCanvas' + page"
        :key="page"
      ></canvas>
    </div>

    <!-- <canvas id="pdfCanvas"></canvas> -->
  </div>
</template>

<script>
// const pdfjsLib = require("pdfjs-dist/legacy/build/pdf");
// pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;
// import * as PDFJSWorker from "pdfjs-dist/legacy/build/pdf.worker";

import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import PDFJSWorker from "pdfjs-dist/legacy/build/pdf.worker.entry";
pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJSWorker;

export default {
  name: "PDF",
  props: {
    // PDF 文件的实际链接
    url: {
      type: String,
      default: ""
    },
    watermark: {
      type: String,
      default: "测试水印内容"
    }
  },
  data() {
    return {
      currentPage: 1,
      totalPage: 1,
      width: 0,
      height: 0,
      pdfWidth: "",
      pdfDoc: null,
      // 是否位于队列中
      rendering: false
    };
  },
  computed: {
    // 是否首页
    firstPage() {
      return this.currentPage <= 1;
    },
    // 是否尾页
    lastPage() {
      return this.currentPage >= this.totalPage;
    }
  },
  watch: {
    url: {
      handler(nVal) {
        if (!nVal) {
          return;
        }
        this._initPdf();
      }
    }
  },
  mounted() {
    this._initPdf();
  },
  methods: {
    // 跳转到首页
    firstPageHandler() {
      if (this.firstPage) {
        return;
      }

      this.currentPage = 1;
      this._renderQueue();
    },
    // 跳转到尾页
    lastPageHandler() {
      if (this.lastPage) {
        return;
      }

      this.currentPage = this.totalPage;
      this._renderQueue();
    },
    // 上一页
    previousPage() {
      if (this.firstPage) {
        return;
      }

      this.currentPage--;
      this._renderQueue();
    },
    // 下一页
    nextPage() {
      if (this.lastPage) {
        return;
      }

      this.currentPage++;
      this._renderQueue();
    },
    _initPdf() {
      pdfjsLib.getDocument(this.url).promise.then(doc => {
        // 文档对象
        this.pdfDoc = doc;
        // 总页数
        this.totalPage = doc.numPages;
        // 渲染页面
        this.$nextTick(() => {
          this._renderPage();
        });
      });
    },
    _getRatio(ctx) {
      let dpr = window.devicePixelRatio || 1;
      let bspr =
        ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio ||
        1;
      return dpr / bspr;
    },
    _getClientWidth() {
      const width = window.innerWidth
        ? window.innerWidth
        : document.documentElement.clientWidth
        ? document.documentElement.clientWidth
        : screen.width;
      // const width =
      //   document.documentElement.getBoundingClientRect().width ||
      //   document.documentElement.clientWidth ||
      //   document.body.clientWidth ||
      //   window.innerWidth;
      return width - 40;
    },
    _renderPage() {
      // 队列开始
      this.rendering = true;

      this.pdfDoc.getPage(this.currentPage).then(page => {
        // let canvas = document.querySelector("#pdfCanvas");
        let canvas = document.getElementById(`pdfCanvas${this.currentPage}`);
        if (!canvas) return;
        let ctx = canvas.getContext("2d");
        // 获取页面比率
        let ratio = this._getRatio(ctx);
        // 根据页面宽度和视口宽度的比率就是内容区的放大比率
        //所以这里分别获取了父容器和页面本身的宽度，父容器宽度 / 页面宽度 后得出的比率就是实际页面需要放大多少的比率
        //page.view 是一个数组，里面有四个值，分别是 x轴偏移量、y轴偏移量、宽度、高度
        //要获取真实的宽度，还需要考虑当前页面比率，所以使用 page.view[2] * ratio 计算得出实际宽度
        const clientWidth = this._getClientWidth();
        // const pageWidth = page.view[2] * ratio;
        const pageWidth = page.getViewport({ scale: 1 }).width;
        const scale = clientWidth / pageWidth;
        console.log(
          "scale: ",
          scale,
          ratio,
          clientWidth,
          page.view[2] * ratio,
          page.getViewport({ scale: 1 }).width
        );
        const viewport = page.getViewport({ scale });
        // 记录内容区宽高，后期添加水印时需要
        this.width = viewport.width * ratio;
        this.height = viewport.height * ratio;
        canvas.width = this.width;
        canvas.height = this.height;

        canvas.style.width = viewport.width + "px";
        canvas.style.height = viewport.height + "px";
        this.pdfWidth = viewport.width + "px";
        // 缩放比率
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

        page
          .render({
            canvasContext: ctx,
            viewport
          })
          .promise.then(() => {
            if (this.currentPage < this.totalPage) {
              this.rendering = false;
              this._renderWatermark(); // 渲染水印
              this.currentPage += 1;
              this._renderPage();
            }
          });
      });
    },
    _renderQueue() {
      if (this.rendering) {
        return;
      }
      this._renderPage();
    },
    _initWatermark() {
      let canvas = document.createElement("canvas");
      canvas.width = 200;
      canvas.height = 200;

      let ctx = canvas.getContext("2d");
      ctx.rotate((-18 * Math.PI) / 180);
      ctx.font = "14px Vedana";
      ctx.fillStyle = "rgba(200, 200, 200, .3)";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(this.watermark, 50, 50);

      return canvas;
    },
    _renderWatermark() {
      //   let canvas = document.querySelector("#pdfCanvas");
      let canvas = document.getElementById(`pdfCanvas${this.currentPage}`);
      if (!canvas) return;
      let ctx = canvas.getContext("2d");
      // 平铺水印
      let pattern = ctx.createPattern(this._initWatermark(), "repeat");
      ctx.rect(0, 0, this.width, this.height);
      ctx.fillStyle = pattern;
      ctx.fill();
    }
  }
};
</script>

<style lang="scss" scoped>
.pdf-view {
}
</style>
