<template>
  <div class='articleDetail'>
    <div class="loading" v-if="loading">
      <Loading :posit="true"></Loading>
    </div>
    <div class="article-detail-content" v-else>
      <div class="detail-header">
        <div class="title">
          <h2>
            {{articleInfo.articleTitle}}
          </h2>
        </div>
        <div class="authorMsg">
          <div class="msg-left">
            <el-row>
              <el-col :span="1">
                <img src="@/assets/images/owner.png" alt="">
              </el-col>
              <el-col :span="22">
                <span class="blog-name blog-time">零售时间</span>
                <span class="blog-name blog-create">{{ $timeFormat(articleInfo.articleDate) }}</span>
              </el-col>
              <el-col :span="1">
                <span class="blog-name show" @click="showMsg">{{showTitle}}</span>
              </el-col>
            </el-row>

          </div>

        </div>
        <el-collapse-transition>
          <div class="slide-box" v-show="isShow">
            <div class="tags-box">
              <div class="tags-item-box">
                <span class="label">博客类型：<el-tag :type="tipType[0]" size="mini" >{{ articleInfo.articleType}}</el-tag></span>
              </div>
            </div>
            <div class="tags-box">
              <div class="tags-item-box">
                <span class="label">博客标签：<el-tag :type="tipType[index]" size="mini" v-for="(item,index) in articleInfo.articleTip" :key="index">{{item}}</el-tag></span>
              </div>
            </div>
            <div class="article-copyright">
              <div class="info-list">
                <span>转载来源：</span>
                <el-link type="primary" :underline="false" v-if="articleInfo.isOriginal">
                  {{$imgUrl + $route.fullPath}}
                </el-link>
                <el-link type="primary" :underline="false" v-else>
                  {{$imgUrl + $route.fullPath}}
                </el-link>
              </div>
              <div class="creativeCommons" info-list>
                <span>本文链接：</span>
                <el-link type="primary" :underline="false" >
                  {{$imgUrl + $route.fullPath}}
                </el-link>
              </div>
              <div class="creativeCommons">
                版权声明：本文为博主原创文章，转载请附上原文出处链接和本声明。
              </div>
            </div>
          </div>
        </el-collapse-transition>
      </div>
      <div class="detail-main" v-if="articleInfo.articleId">
        <Article-show :articleContent="articleInfo.articleContent">
        </Article-show>
      </div>
    </div>
  </div>
</template>

<script>
  import { getArticleById } from "@/api/articleApi";
  import ArticleShow from "@/components/articleShow.vue";
  export default {
    name: "articleDetail",
    components: { ArticleShow },
    props: {},
    data() {
      return {
        articleId: this.$route.params.articleId,
        articleInfo: {},
        isShow: false,
        showTitle: "展开",
        loading: true,
        tipType:["primary","info", "success","danger", "warning"],
      };
    },
    mounted() { },
    created() {
      this.getArticle();
    },
    methods: {
      getArticle() {
        let params = {
          articleId: this.articleId,
        };
        console.log(">>>>>>>>", params);
        getArticleById(params).then((res) => {

          if (res.meta.status == 200) {
            this.loading = false
            this.articleInfo = res.data[0];
            this.articleInfo.articleTip = JSON.parse(this.articleInfo.articleTip)
          }
        });
      },
      showMsg() {
        this.showTitle = !this.isShow ? "折叠" : "展开";
        this.isShow = !this.isShow;
      },
    },
  };
</script>

<style lang='scss' scoped>
  .articleDetail {
    padding: 15px 15px 0 15px;
    height: 100%;
    background-color: #fff;
    margin-left: 15px !important;
    box-sizing: border-box;

    .detail-header {
      .title {
        h2 {
          margin: 0;
          margin-bottom: 15px;
        }
      }
    }
  }

  .authorMsg {
    height: 32px;
    width: 100%;
    background-color: #f7f7fc;

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

  .article-copyright {
    padding: 0px 8px 8px 0;
    color: #6f6f82;
    font-size: 13px;
    line-height: 20px;
    letter-spacing: 1px;

    a {
      color: #4a88c4;
    }
  }

  .tags-box {
    .tags-item-box {
      font-size: 13px;
      line-height: 18px;
      margin-top: 0px;
      margin-right: 8px;
      .el-tag{
        margin-right: 10px;
      }
      .label {
        display: inline-block;
        color: #555666;
      }

      .tag-link {
        margin-right: 8px;
        padding: 3px 6px;
        font-size: 12px;
        background-color: #fff;
        color: #4a88c4;
        border: 1px solid #eaeaef;
        border-radius: 4px;
      }
    }
  }

  .slide-box {
    padding: 4px 0;
    overflow: hidden;
    border-bottom: 1px solid #f5f6f7;
    .article-copyright{
      .info-list{
        display: flex;
        span{
          width: 70px;
        }
        justify-content: flex-start;
        .el-link{
          min-width: 500px ;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
        }
      }

    }

  }

  .detail-main {
    clear: both;
    padding-top: 15px;
    box-sizing: border-box;
  }

  .loading {}
</style>