<template>
  <div
    class='articleListItem'>
    <div
      class="article-title">
      <el-button
        type="success"
        size="mini"><i
          class="iconfont icon-remen"
          style="font-size:15px;"></i>
        原创
      </el-button>
      <div class="title">
        {{articleData.articleTitle}}
      </div>
    </div>
    <div class="article-dec">
      {{articleData.articleDescription}}
    </div>
    <div class="article-time">
      <div>
        <span
          class="iconfont icon-shijian"></span>
        {{$timeFormat(articleData.articleDate)}}
      </div>
      <div><span
          class="iconfont icon-yan"></span>
        {{123}}
      </div>
      <div><span
          class="iconfont icon-fenxiang"></span>
        {{33}}
      </div>
      <div><span
          class="iconfont icon-guanyuwomen"></span>
        {{0}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "articleListItem",
  components: {},
  props: {
    articleData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  mounted() {},
  created() {},
  methods: {},
};
</script>

<style lang='scss' scoped>
.articleListItem {
  position: relative;
  top: 0;
  left: 0;
  padding: 10px 0;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  &:hover .article-title {
    color: rgba(47, 84, 235, 0.6);
  }
  &:hover .article-title ::v-deep .el-button {
    color: rgba(47, 84, 235, 0.6);
  }
  .article-title {
    display: flex;
    justify-content: flex-start;
    ::v-deep .el-button--mini,
    .el-button--small {
      font-size: 14px;
      border-radius: 3px;
    }
    .title {
      line-height: 30px;
      margin-left: 10px;
      font-size: 20px;
    }
    span {
      display: inline-block;
      width: 50px;
      height: 30px;
      line-height: 30px;
      text-align: left;
      background-color: #6bc30d;
    }
  }
  .article-dec {
    margin-top: 15px;
    line-height: 25px;
    color: #999aaa;
  }
  .article-time {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
    .iconfont {
      font-size: 13px !important;
    }
    div {
      color: rgb(129, 144, 242);
      margin-left: 20px;
    }
  }
}
</style>
