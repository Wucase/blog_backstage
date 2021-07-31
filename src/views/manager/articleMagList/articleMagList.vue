<template>
  <div class='articleMagList'>
    <div
      class="article-header">
      <el-button
        type="success" round
        size="mini"
        @click="toArticleCreate">
        写博客
      </el-button>
    </div>
    <el-divider></el-divider>
    <el-table
      :data="tableData" stripe
      tooltip-effect="dark"
      style="width: 100%"
      v-loading="listLoading">
      <el-table-column
        type="expand">
        <template
          slot-scope="scope">
          <div
            class="table-expand">
            <div>
              <h2>
                {{scope.row.articleTitle}}
              </h2>
            </div>
            <Article-show
              :articleContent="scope.row.articleContent">
            </Article-show>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="date"
        label="文章标题"
        width="180">
        <template
          slot-scope="scope">
          <el-link
            :underline="false"
            type="primary"
            @click="toArticleDetail(scope.row.articleId)">
            {{scope.row.articleTitle}}
          </el-link><br>
          <span>{{scope.row.articleId}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="articleAuthor"
        label="作者">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="articleDescription"
        label="描述">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="articleType"
        label="类型">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="articleTip"
        label="标签">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="articleShare"
        label="分享">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="articleVisit"
        label="游客">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="articleStatus"
        label="状态">
      </el-table-column>
      <el-table-column
        width="150"
        label="操作">
        <template
          slot-scope="scope">
          <el-link
            :underline="false"
            type="warning"
            round size="mini"
            @click="changeStatus(scope.row.articleId, scope.row.articleStatus)">
            {{scope.row.articleStatus == 1? '隐藏' : '展示'}}
          </el-link>
          <el-divider
            direction="vertical">
          </el-divider>
          <el-link
            :underline="false"
            type="success"
            round size="mini"
            @click="updateArticle(scope.row.articleId)">
            修改
          </el-link>
          <el-divider
            direction="vertical">
          </el-divider>
          <el-link
            :underline="false"
            type="danger"
            round size="mini"
            @click="deleteArticle(scope.row.articleId)">
            删除
          </el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  getArticleList,
  updateArticleById,
  deleteArticleById,
} from "@/api/articleApi";
import ArticleShow from "./components/articleShow.vue";
export default {
  name: "articleMagList",
  components: { ArticleShow },
  props: {},
  data() {
    return {
      listLoading: false,
      tableData: [],
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
          this.tableData = res.data.docs;
        }
      });
    },
    changeStatus(id, status) {
      console.log(id);
      let params = {
        articleStatus: status == 1 ? 0 : 1,
        articleId: id,
      };
      updateArticleById(params).then((res) => {
        if (res.meta.status == 200) {
          this.$message.success(status == 1 ? "隐藏" : "展示" + "成功");
          this.getArticleLists();
        }
      });
    },
    updateArticle(id) {
      console.log(id);
      this.$router.push({
        path: "/manager/articleCreate",
        query: { articleId: id },
      });
    },
    deleteArticle(id) {
      console.log(id, "====");
      deleteArticleById({ articleId: id }).then((res) => {
        if (res.meta.status == 200) {
          this.$message.success("删除成功");
          this.getArticleLists();
        }
      });
    },
    toArticleDetail(id) {
      this.$router.push("/manager/articleDetail/" + id);
    },
    toArticleCreate() {
      this.$router.push("/manager/articleCreate");
    },
  },
};
</script>

<style lang='scss' scoped>
.el-divider {
  margin: 15px 0;
}
.table-expand {
  background-color: rgb(240, 243, 244);
  box-sizing: border-box;
  margin: 15px;
  padding: 15px;
}
</style>