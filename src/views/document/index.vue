<template>
  <div class="pdf">
    <template v-if="docType === 'pdf'">
      <pdf :url="docSrc" />
    </template>

    <template v-if="docType === 'video'">
      <video-player
        src="https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
      />
    </template>

    <template v-if="docType === 'image'">
      <img class="image" src="https://picsum.photos/1000" />
    </template>
  </div>
</template>

<script>
import pdf from "@/components/PDF/index.vue";
import VideoPlayer from "@/components/VideoPlayer/index.vue";

export default {
  name: "Document",
  components: {
    pdf,
    VideoPlayer
  },
  data() {
    return {
      docSrc: "",
      docType: ""
    };
  },
  watch: {
    $route() {
      this.getDocData();
    }
  },
  created() {
    this.getDocData();
  },
  mounted() {},
  methods: {
    getDocData() {
      const { href, mime } = this.$route.query;
      this.docSrc = href;
      this.docType = mime;
      console.log("docSrc:", this.docSrc, this.docType);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
