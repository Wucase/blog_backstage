<template>
  <div class='userArticleList'>
    <div class="loading" v-if="listLoading">
      <Loading :posit="true">
      </Loading>
    </div>
    <div v-else style="height: 100%;">
      <div class="header">
        <div class="articles-header">
          <div class="msg-left">
            <el-row>
              <el-col :span="1">
                <img src="@/assets/images/class.png" alt="">
              </el-col>
              <el-col :span="22">
                <span class="blog-name blog-time">零售时间 --</span>
                <span class="blog-name blog-create">{{currentClassfity}}</span>
              </el-col>
              <el-col :span="1">

              </el-col>
            </el-row>

          </div>
        </div>
      </div>
      <div class="article-list-item">

        <div>
          <div class="list" v-for="(item, index) in articleList" :key="index" @click="toArticleDetail(item.articleId)">
            <article-list-item :articleData='item'>
            </article-list-item>
          </div>
        </div>
        <div class="article-list-page" v-if="total>10">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
            :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" background
            layout=" prev, pager, next, jumper,sizes,total" :total="total">
          </el-pagination>
        </div>

        <div class="no-data" v-if="total<1">
          <img src="@/assets/images/null.jpeg" alt="">
        </div>

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
        listLoading: false,
        pageSize: 10,
        pageNum: 1,
        total: 0,
        filter: {},
        currentClassfity: '全部分类'
      };
    },
    mounted() { },
    created() {
      this.handleSizeChange();
      this.$eventBus.$on('sendSearch', (data, type) => {

        console.log(">>>>>>>>>>>>>>", data, type)
        this.filter = {}
        if (type) {
          this.filter.articleTitle = data
        } else {
          this.filter.articleType = data
          this.currentClassfity = data
          if (data == '全部分类') this.filter = {}
        }

        this.handleSizeChange();
      })
    },
    methods: {
      handleSizeChange(size = 10) {
        this.pageSize = size;
        this.pageNum = 1;
        this.getArticleLists();
      },
      handleCurrentChange(page) {
        this.pageNum = page;
        this.getArticleLists();
      },
      getArticleLists() {
        let params = {
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          ...this.filter,
          articleStatus: 1
        };
        this.listLoading = true;
        getArticleList(params).then((res) => {
          this.listLoading = false;
          if (res.meta.status === 200) {
            this.articleList = res.data.docs;
            this.total = res.data.total;
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
    height: 100%;
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
            color: rgba(47, 84, 235, 0.6) !important;
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
      height: 100%;
      .loadingBox {}

      .list {
        padding: 0 15px;
        cursor: pointer;

        &:hover {
          background-color: rgb(249, 250, 252);
        }
      }
    }
  }

  .article-list-page {
    display: flex;
    justify-content: flex-end;
    margin: 20px 0;
  }

  .no-data{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
width: 300px;
      border-radius: 50%;
    }
  }
</style>