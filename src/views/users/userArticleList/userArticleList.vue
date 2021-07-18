<template>
  <div
    class='userArticleList'>
    <div class="header">
      <div
        class="articles-header">
        <div class="msg-left">
          <el-row>
            <el-col :span="1">
              <img
                src="@/assets/images/class.png"
                alt="">
            </el-col>
            <el-col
              :span="22">
              <span
                class="blog-name blog-time">零售时间</span>
              <span
                class="blog-name blog-create">{{ $timeFormat('') }}</span>
            </el-col>
            <el-col :span="1">

            </el-col>
          </el-row>

        </div>
      </div>
    </div>
    <div
      class="article-list-item">
      <div class="list"
        v-for="(item, index) in articleList"
        :key="index"
        @click="toArticleDetail(item.articleId)">
        <article-list-item
          :articleData='item'>
        </article-list-item>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleList } from "@/api/articleApi";
import ArticleListItem from "./components/articleListItem.vue";
export default {
  name: "userArticleList",
  components: { ArticleListItem },
  props: {},
  data() {
    return {
      articleList: [],
    };
  },
  mounted() {},
  created() {
    this.getArticleLists();
  },
  methods: {
    getArticleLists() {
      this.listLoading = true;
      getArticleList().then((res) => {
        this.listLoading = false;
        console.log(res);
        if (res.meta.status === 200) {
          this.articleList = res.data;
        }
      });
    },
    toArticleDetail(id) {
      this.$router.push("/users/userArticleDetail/" + id);
    },
  },
};
</script>

<style lang='scss' scoped>
.userArticleList {
  background-color: #fff;
  margin-left: 15px;
  padding-bottom: 15px;
  box-sizing: border-box;
  //   padding: 15px;
  .header {
    padding: 15px;
    .articles-header {
      height: 32px;
      width: 100%;
      background-color: #f7f7fc;
      margin-bottom: 5px;
      box-sizing: border-box;
      .msg-left {
        font-size: 12px !important;
        img {
          width: 36px;
          height: 32px;
        }
        .blog-name {
          color: rgba(47, 84, 235, 0.6);
          line-height: 32px;
        }
        .blog-time {
          padding-left: 10px;
          box-sizing: border-box;
        }
        .blog-create {
          padding-left: 10px;
          color: #999aaa;
        }
        .show {
          cursor: pointer;
        }
      }
    }
  }
  .article-list-item {
    //
    .list {
      padding: 0 15px;
      cursor: pointer;
      &:hover {
        background-color: rgb(249, 250, 252);
      }
    }
  }
}
</style>