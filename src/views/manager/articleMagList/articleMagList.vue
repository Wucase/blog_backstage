<template>
  <div class='articleMagList'>
    <div class="article-header">
      <div style="padding-top: 13px;">
        <el-button type="danger" round size="mini" @click="deleteArticle('more')" :disabled="isDeletes">
          批量删除
        </el-button>
        <el-button type="success" round size="mini" @click="toArticleCreate">
          写博客
        </el-button>
      </div>
      <search-cmp @searchBtn="searchBtn"></search-cmp>
    </div>
    <el-divider></el-divider>
    <el-table :data="tableData" stripe tooltip-effect="dark" style="width: 100%" v-loading="listLoading"
      @selection-change="handleSelectionChange">

      <el-table-column type="selection" width="45">
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <div class="table-expand">
            <div>
              <h2>
                {{scope.row.articleTitle}}
              </h2>
            </div>
            <Article-show :articleContent="scope.row.articleContent">
            </Article-show>
          </div>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="date" label="文章标题" width="180">
        <template slot-scope="scope">
          <el-link :underline="false" type="primary" @click="toArticleDetail(scope.row.articleId)">
            {{scope.row.articleTitle}}
          </el-link><br>
          <span>{{scope.row.articleId}}</span>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="articleAuthor" label="作者">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="articleDescription" label="描述">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="articleType" label="类型">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="articleTip" label="标签" width="400">
        <template slot-scope="scope">
          <el-tag class="tip-type" v-for="(item,index) in JSON.parse(scope.row.articleTip)" :key="index"
            :type="tipType[index]" effect="dark" size='small'>
            {{ item}}
          </el-tag>
          <el-tag class="tip-type" v-if="!JSON.parse(scope.row.articleTip).length" type="danger" effect="dark"
            size='small'>
            {{ '暂无标签'}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="articleShare" label="分享" width="70">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="articleVisit" label="游客" width="70">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="articleStatus" label="状态" width="120">
        <template slot-scope="scope">
          <el-tag class="tip-type" :type="scope.row.articleStatus == 1 ? 'success' : 'danger'" effect="dark"
            size='small'>
            {{scope.row.articleStatus == 1 ? '展示' : '隐藏'}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column width="150" label="操作">
        <template slot-scope="scope">
          <el-link :underline="false" type="warning" round size="mini"
            @click="changeStatus(scope.row.articleId, scope.row.articleStatus)">
            {{scope.row.articleStatus == 1? '隐藏' : '展示'}}
          </el-link>
          <el-divider direction="vertical">
          </el-divider>
          <el-link :underline="false" type="success" round size="mini" @click="updateArticle(scope.row.articleId)">
            修改
          </el-link>
          <el-divider direction="vertical">
          </el-divider>
          <el-link :underline="false" type="danger" round size="mini" @click="deleteArticle(scope.row.articleId)">
            删除
          </el-link>
        </template>
      </el-table-column>
    </el-table>
    <div class="article-list-page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
        :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" background layout=" prev, pager, next, jumper,sizes,total"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {
    getArticleList,
    updateArticleById,
    deleteArticleById,
    updateArticleStatusById
  } from "@/api/articleApi";
  import ArticleShow from "./components/articleShow.vue";
  import searchCmp from '@/components/searchCmp'
  export default {
    name: "articleMagList",
    components: { ArticleShow, searchCmp },
    props: {},
    data() {
      return {
        tipType: ['danger', 'warning', 'success', 'parimary', 'info'],
        listLoading: false,
        tableData: [],
        pageSize: 10,
        pageNum: 1,
        total: 0,
        multipleSelection: [],
        isDeletes: true,
        filter: {}
      };
    },
    watch: {
      multipleSelection: {
        handler(newVal) {
          this.isDeletes = !newVal.length
        },
        immediate: true
      }
    },
    mounted() { },
    created() {
      this.handleSizeChange();
    },
    methods: {
      deleteByIds() {

        let ids = []
        if (this.multipleSelection.length) {
          ids = this.multipleSelection.map(item => item.articleId)
        }
        console.log('?????????>>>>>>>>>', ids);
        this.deleteArticle(ids)

      },
      searchBtn(data) {
        this.filter = data ? { articleTitle: data } : {}
        this.handleSizeChange();
      },
      handleSelectionChange(data) {
        this.multipleSelection = data
      },
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
        this.listLoading = true;
        let params = {
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          ...this.filter
        };
        getArticleList(params).then((res) => {
          this.listLoading = false;
          console.log(res);
          if (res.meta.status === 200) {
            this.tableData = res.data.docs;
            this.total = res.data.total;
          }
        });
      },
      changeStatus(id, status) {
        console.log(id);
        let params = {
          articleStatus: status == 1 ? 0 : 1,
          articleId: id,
        };
        updateArticleStatusById(params).then((res) => {
          if (res.meta.status == 200) {
            this.$message.success((status == 1 ? "隐藏" : "展示") + "成功");
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
      deleteArticle(idList) {
        let ids = []
        if (idList == 'more') {
          if (this.multipleSelection.length) {
            ids = this.multipleSelection.map(item => item.articleId)
          }
        } else {
          ids = [idList]
        }

        deleteArticleById({ ids }).then((res) => {
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

  .article-list-page {
    display: flex;
    justify-content: flex-end;
    margin: 20px 0;
  }

  .article-header {
    display: flex;
    justify-content: space-between;

  }

  .tip-type {
    margin-right: 10px !important;
  }
</style>