<template>
  <div class="file">
    <!-- 如果 visible 属性绑定的变量位于 Vuex 的 store 内，那么 .sync 不会正常工作。 -->
    <!-- 此时需要去除 .sync 修饰符，同时监听 Dialog 的 open 和 close 事件，在事件回调中执行 Vuex 中对应的 mutation 更新 visible 属性绑定的变量的值 -->
    <el-dialog
      title="免责声明弹窗"
      :visible="disclaimer"
      width="50%"
      center
      @close="closeDisclaimer"
      :show-close="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <div class="disclaimer">
        <span>
          免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明
          免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明
        </span>
      </div>
      <div slot="footer" class="disclaimer-footer">
        <el-button type="primary" @click="closeDisclaimer"
          >我已阅读以上免责声明</el-button
        >
      </div>
    </el-dialog>

    <!-- <el-dialog title="PDF预览" :visible.sync="showPDFViewer" width="90%" center>
      <iframe
        width="100%"
        height="500"
        scrolling="no"
        :src="`${baseUrl}${pdfSrc}`"
      ></iframe>
    </el-dialog> -->

    <template v-if="device === 'mobile'">
      <div class="lay-mobile">
        <el-tree
          empty-text="目录为空"
          accordion
          default-expand-all
          :expand-on-click-node="false"
          :data="catalogData"
          :props="defaultProps"
          @node-click="handleTreeNodeClick"
        ></el-tree>

        <div class="search-input">
          <div class="title">文件搜索</div>
          <el-input
            v-model="keyword"
            placeholder="请输入查询文件的名称"
            @keyup.enter.native="onSearchFileList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="onSearchFileList"
            ></el-button>
          </el-input>
        </div>

        <div class="file-table">
          <el-table
            v-loading="tableLoading"
            element-loading-text="文件加载中"
            element-loading-spinner="el-icon-loading"
            :data="fileList"
            stripe
            style="width: 100%"
            max-height="1000px"
          >
            <el-table-column prop="name" label="文件名称"></el-table-column>
            <el-table-column label="是否已读">
              <template slot-scope="{ row }">
                <el-tag :type="row.status === 'read' ? 'success' : 'danger'">{{
                  row.status === "read" ? "已读" : "未读"
                }}</el-tag>
              </template>
            </el-table-column>

            <el-table-column prop="date" label="上传时间"></el-table-column>

            <el-table-column label="操作">
              <template slot-scope="{ row }">
                <el-button
                  type="text"
                  icon="el-icon-view"
                  @click="openFileDetail(row)"
                  >查看详情</el-button
                >

                <el-button
                  v-if="row.role === 'admin'"
                  type="text"
                  icon="el-icon-download"
                  @click="handleDownloadFile(row)"
                  >下载</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>

        <pagination
          v-show="total > 0"
          layout="prev, pager, next"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="fetchFileList"
        />
      </div>
    </template>

    <template v-else>
      <div class="lay-pc">
        <el-row type="flex" :gutter="10">
          <el-col :xs="8" :sm="8" :md="6" :lg="4" :xl="4">
            <el-tree
              empty-text="目录为空"
              accordion
              default-expand-all
              :expand-on-click-node="false"
              :data="catalogData"
              :props="defaultProps"
              @node-click="handleTreeNodeClick"
            ></el-tree>
          </el-col>

          <el-col :xs="12" :sm="12" :md="16" :lg="18" :xl="18">
            <div class="search-input">
              <div class="title">文件搜索</div>
              <el-input
                v-model="keyword"
                placeholder="请输入查询文件的名称"
                @keyup.enter.native="onSearchFileList"
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="onSearchFileList"
                ></el-button>
              </el-input>
            </div>

            <div class="file-table">
              <el-table
                v-loading="tableLoading"
                element-loading-text="文件加载中"
                element-loading-spinner="el-icon-loading"
                :data="fileList"
                stripe
                style="width: 100%"
                max-height="1000px"
              >
                <el-table-column prop="name" label="文件名称"></el-table-column>
                <el-table-column label="是否已读">
                  <template slot-scope="{ row }">
                    <el-tag
                      :type="row.status === 'read' ? 'success' : 'danger'"
                      >{{ row.status === "read" ? "已读" : "未读" }}</el-tag
                    >
                  </template>
                </el-table-column>

                <el-table-column prop="date" label="上传时间"></el-table-column>

                <el-table-column label="操作">
                  <template slot-scope="{ row }">
                    <el-button
                      type="text"
                      icon="el-icon-view"
                      @click="openFileDetail(row)"
                      >查看详情</el-button
                    >

                    <el-button
                      v-if="row.role === 'admin'"
                      type="text"
                      icon="el-icon-download"
                      @click="handleDownloadFile(row)"
                      >下载</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <pagination
              v-show="total > 0"
              :total="total"
              :page.sync="listQuery.page"
              :limit.sync="listQuery.limit"
              @pagination="fetchFileList"
            />
          </el-col>
        </el-row>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import { treeData, createTableData } from "./data";
import Pagination from "@/components/Pagination";
import Api from "@/api";

export default {
  name: "File",
  components: {
    // pdf,
    Pagination
  },
  data() {
    return {
      keyword: "",
      defaultProps: {
        children: "child", //指定子树为节点对象的某个属性值
        label: "name" //指定节点标签为节点对象的某个属性值
      },
      catalogData: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      tableLoading: false,
      fileList: []
      //通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据
    };
  },
  computed: {
    ...mapGetters(["disclaimer"]),
    device() {
      return this.$store.state.app.device;
    }
  },
  async created() {
    this.total = 50;
    // this.catalogData = [...treeData];
    // this.generateTableData();
    await this.getDocumentCategory();
    await this.getDocumentList();
  },
  mounted() {},
  methods: {
    closeDisclaimer() {
      this.$store.dispatch("app/closeDisclaimer");
    },
    handleTreeNodeClick(e) {
      console.log(e);
      this.categoryId = e.id;
      this.getDocumentList();
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: "region1" }, { name: "region2" }]);
      }
      if (node.level > 3) return resolve([]);

      var hasChild;
      if (node.data.name === "region1") {
        hasChild = true;
      } else if (node.data.name === "region2") {
        hasChild = false;
      } else {
        hasChild = Math.random() > 0.5;
      }

      setTimeout(() => {
        var data;
        if (hasChild) {
          data = [
            {
              name: "zone" + this.count++
            },
            {
              name: "zone" + this.count++
            }
          ];
        } else {
          data = [];
        }

        resolve(data);
      }, 500);
    },
    async getDocumentCategory() {
      try {
        const res = await Api.getDocumentCategory();
        console.log(res);
        if (res.code === 100) {
          this.catalogData = res.content.slice();
          this.categoryId = this.catalogData[0].id;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getDocumentList() {
      this.tableLoading = true;
      const params = {
        categoryId: this.categoryId
      };
      try {
        const res = await Api.getDocumentList(params);
        console.log(res);
        if (res.code === 100) {
          this.tableLoading = false;
          const host =
            process.env.NODE_ENV === "development"
              ? "http://by2.hjlinfo.top"
              : "http://by2.hjlinfo.top";
          //https://jc.cgoport.com

          // const mimeList = ["pdf", "video", "image"];
          this.fileList = res.content.map((item, index) => {
            return {
              id: item.id,
              name: item.name,
              status: Math.random() > 0.5 ? "read" : "unread",
              date: item.createTime, //YYYY-MM-DD HH:mm:ss
              mime: "pdf",
              download_url: `${host}/uploadDir${item.path}`,
              href: `${host}/uploadDir${item.path}`
            };
          });
        }
      } catch (err) {
        console.log(err);
        this.tableLoading = false;
      }
    },
    // generateTableData() {
    //   this.tableLoading = true;
    //   const size = Math.floor(Math.random() * 10 + 1);
    //   // console.log(size);
    //   setTimeout(() => {
    //     const list = createTableData(size);
    //     this.fileList = [...list];
    //     this.tableLoading = false;
    //   }, 500);
    // },
    onSearchFileList() {
      if (this.keyword.trim() === "") return;
      // this.generateTableData();
      // this.getFileList();
    },
    fetchFileList({ page, limit }) {
      this.listQuery.page = page;
      this.listQuery.limit = limit;
      this.keyword = "";
      // this.generateTableData();
      // this.getFileList();
    },
    openFileDetail({ href = "", mime }) {
      this.$router
        .push({ path: "/document", query: { href, mime } })
        .catch(() => {});
      // this.pdfSrc = href;
      // this.showPDFViewer = true;
      // const loadingTask = pdf.createLoadingTask(href);
      // this.pdfSrc = loadingTask;
      // loadingTask.promise
      //   .then((pdf) => {
      //     this.numPages = pdf.numPages;
      //     this.showPDFViewer = true;
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    },
    handleDownloadFile({ download_url = "", name = "" }) {
      console.log(download_url);
      let eLink = document.createElement("a");
      eLink.style.display = "none";
      eLink.href = download_url;
      eLink.setAttribute("download", name); //设置下载属性 以及文件名
      document.body.appendChild(eLink);
      eLink.click();
      document.body.removeChild(eLink);
    }
  }
};
</script>

<style lang="scss">
// .el-table {
//   .doc {
//     color: $el-primary;
//   }
// }
</style>

<style lang="scss" scoped>
@import "./index.scss";
</style>
