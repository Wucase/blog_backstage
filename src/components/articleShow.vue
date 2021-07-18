<template>
  <div class='articleShow'>
    <div id="content"
      class="markdown-body content-box"
      v-html="articalInfo">
    </div>
  </div>
</template>

<script>
import hljs from "highlight.js";
import { addCodeBtn } from "@/plugins/mavonEdit/mavon";
import { mavonEditor } from "mavon-editor";
export default {
  name: "articleShow",
  components: {},
  props: {
    articleContent: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      articalInfo: "",
    };
  },
  mounted() {
    hljs.highlightCode();
    this.$nextTick(() => {
      addCodeBtn();
    });
  },
  created() {
    const md = mavonEditor.getMarkdownIt();
    this.articalInfo = md.render(this.articleContent);
  },
  methods: {},
};
</script>

<style lang='scss' scoped>
div /deep/ pre.code {
  position: relative !important;
  border-radius: 3px !important;
  border: 1px solid #c3ccd0 !important;
  overflow: hidden;
  background-color: #fff;
  padding: 0;
  box-sizing: border-box;
  color: #fff;
  padding-left: 60px !important;
  code {
    line-height: 30px !important;
    color: #777;
  }
  ol.pre-numbering {
    position: absolute !important;
    top: 0 !important;
    left: -30px !important;
    line-height: 30px;
    list-style-type: none;
    counter-reset: sectioncounter;
    margin-bottom: 0;
    background-color: #f1f1f1;
    li {
      margin-top: 0 !important;
      color: #777;
      &:before {
        content: counter(sectioncounter) "";
        counter-increment: sectioncounter;
        display: inline-block;
        width: 40px;
        text-align: center;
        border-right: solid 1px rgba(255, 255, 255, 0.7);
      }
    }
  }
  i.code-copy {
    position: absolute;
    top: 0;
    right: 0;
    background-color: #464d5e;
    padding: 3px;
    margin: 3px 3px 0 0;
    font-size: 11px;
    border-radius: inherit;
    color: #f1f1f1;
    cursor: pointer;
    display: none;
  }
  &:hover i.code-copy {
    display: block;
  }
}
</style>