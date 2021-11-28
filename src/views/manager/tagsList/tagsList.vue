<template>
  <div class='articleMagList'>
    <div class="article-header">
      <el-button type="success" round size="mini" @click="createClassfity">
        新建标签
      </el-button>
    </div>
    <el-divider></el-divider>
    <el-table @expand-change="expandSelect" type='index' :row-key='getRowKeys' :expand-row-keys="expands"
      :data="tableData" stripe tooltip-effect="dark" style="width: 100%" v-loading="listLoading" ref='refTable'>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <div class="table-expand">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="签标名称" prop="tagName">
                <el-input v-model="ruleForm.tagName" size='small'>
                </el-input>
              </el-form-item>
              <el-form-item label="签标描述" prop="description">
                <el-input v-model="ruleForm.description" size='small'>
                </el-input>
              </el-form-item>
            </el-form>
            <el-button @click="updateArticle(scope.row)" size='small'>取 消
            </el-button>
            <el-button type="primary" @click="submitForm('ruleForm',scope.row.id)" size='small'>确 定
            </el-button>
          </div>
        </template>
      </el-table-column>

      <el-table-column :show-overflow-tooltip="true" prop="id" label="ID">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="tagName" label="标签名称">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="description" label="描述">

      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="tagStatus" label="状态" width="120">
        <template slot-scope="scope">
          <el-tag class="tip-type" :type="scope.row.tagStatus == 1 ? 'success' : 'danger'" effect="dark" size='small'>
            {{scope.row.tagStatus == 1 ? '展示' : '隐藏'}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="createDate" label="新建时间">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="updateDate" label="更新时间">
      </el-table-column>
      <el-table-column width="150" label="操作">
        <template slot-scope="scope">
          <el-link :underline="false" type="warning" round size="mini"
            @click="changeStatus(scope.row.id, scope.row.tagStatus)">
            {{scope.row.tagStatus == 1? '隐藏' : '展示'}}
          </el-link>
          <el-divider direction="vertical">
          </el-divider>
          <el-link :underline="false" type="success" round size="mini" @click="updateArticle(scope.row)">
            修改
          </el-link>
          <el-divider direction="vertical">
          </el-divider>
          <el-link :underline="false" type="danger" round size="mini" @click="deleteArticle(scope.row.id)">
            删除
          </el-link>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
        :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" background layout=" prev, pager, next, jumper,sizes,total"
        :total="total">
      </el-pagination>
    </div>
    <tags-edit :dialogVisible='dialogVisible' @cancel="cancel" @success='success'>
    </tags-edit>
  </div>
</template>

<script>
  import { getTagsList, deleteTagsById, updateTagsById, updateTagsStatusById } from "@/api/tags";
  import tagsEdit from "./components/tagsEdit.vue";
  export default {
    name: "articleMagList",
    components: { tagsEdit },
    props: {},
    data() {
      return {

        expands: [],
        getRowKeys(row) {
          return row.id
        },
        listLoading: false,
        tableData: [],
        pageSize: 10,
        pageNum: 1,
        total: 0,
        dialogVisible: false,
        detail: {},
        ruleForm: {
          tagName: "",
          description: "",
        },
        rules: {
          tagName: [
            { required: true, message: "请输入分类名称", trigger: "blur" },
          ],
          description: [
            { required: true, message: "请输入分裂描述", trigger: "blur" },
          ],
        },
      };
    },
    mounted() { },
    created() {
      this.handleCurrentChange(1);
    },
    methods: {
      expandSelect(row, expandedRows) {
        var that = this
        if (expandedRows.length) {
          that.expands = []
          if (row) {
            this.ruleForm.tagName = row.tagName;
            this.ruleForm.description = row.description;
            that.expands.push(row.id)
          }
        } else {
          that.expands = []
        }
      },
      changeStatus(id, status) {
        console.log(id);
        let params = {
          tagStatus: status == 1 ? 0 : 1,
          id: id,
        };
        updateTagsStatusById(params).then((res) => {
          if (res.meta.status == 200) {
            this.$message.success((status == 1 ? "隐藏" : "展示") + "成功");
            this.handleSizeChange(10);
          }
        });
      },
      submitForm(formName, id) {
        this.$refs.ruleForm.validate((valid) => {
          if (!valid) return false;
          let params = {
            id,
            ...this.ruleForm,
          };
          updateTagsById(params).then((res) => {
            if (res.meta.status === 200) {
              this.$notify.success({
                message: res.meta.msg,
                showClose: false,
              });
              this.handleCurrentChange(1);
            } else {
              this.$notify.error({
                message: res.meta.msg,
                showClose: false,
              });
            }
          });
        });
      },
      handleSizeChange(size) {
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
        };
        this.listLoading = true;
        getTagsList(params).then((res) => {
          this.listLoading = false;
          console.log(res);
          if (res.meta.status === 200) {
            this.tableData = res.data.docs;
            this.total = res.data.total;
          }
        });
      },

      updateArticle(row) {
        this.ruleForm.tagName = row.tagName;
        this.ruleForm.description = row.description;
        this.$refs.refTable.toggleRowExpansion(row);
      },
      deleteArticle(id) {
        console.log(id, "====");
        deleteTagsById({ id }).then((res) => {
          if (res.meta.status == 200) {
            this.$message.success("删除成功");
            this.getArticleLists();
          }
        });
      },
      toArticleDetail(id) {
        this.$router.push("/manager/articleDetail/" + id);
      },
      createClassfity() {
        this.detail = {};
        this.dialogVisible = true;
      },
      cancel() {
        this.dialogVisible = false;
      },
      success() {
        this.handleCurrentChange(1);
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

  .el-pagination {
    margin: 20px 0;
  }

  .page {
    display: flex;
    justify-content: flex-end;
  }

  .table-expand {
    display: flex;
    justify-content: flex-start;

    .el-button {
      width: 100px;

      height: 30px;
      margin: 5px 25px;
    }

    .el-form {
      display: flex;
      justify-content: flex-start;
    }
  }
</style>