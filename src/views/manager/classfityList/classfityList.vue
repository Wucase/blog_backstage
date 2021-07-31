<template>
  <div class='articleMagList'>
    <div class="article-header">
      <el-button type="success" round size="mini" @click="createClassfity">
        写博客
      </el-button>
    </div>
    <el-divider></el-divider>
    <el-table :data="tableData" stripe tooltip-effect="dark" style="width: 100%" v-loading="listLoading" ref='refTable'>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <div class="table-expand">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="分类名称" prop="classifyName">
                <el-input v-model="ruleForm.classifyName" size='small'></el-input>
              </el-form-item>
              <el-form-item label="分类描述" prop="description">
                <el-input v-model="ruleForm.description" size='small'></el-input>
              </el-form-item>
            </el-form>
            <el-button @click="updateArticle(scope.row)" size='small'>取 消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm',scope.row.id)" size='small'>确 定</el-button>
          </div>
        </template>
      </el-table-column>

      <el-table-column :show-overflow-tooltip="true" prop="id" label="ID">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="classifyName" label="分类名称">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="description" label="描述">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="createDate" label="新建时间">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="updateDate" label="更新时间">
      </el-table-column>
      <el-table-column width="150" label="操作">
        <template slot-scope="scope">
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
    <div v-if='dialogVisible'>
      <classfity-edit :dialogVisible='dialogVisible' :detail="detail" @cancel="cancel" @success='success'>
      </classfity-edit>
    </div>
  </div>
</template>

<script>
  import {
    getClassfityList, classfityCreate, updateClassfityById
  } from "@/api/classfity";
  import classfityEdit from './components/classfityEdit.vue'
  export default {
    name: "articleMagList",
    components: { classfityEdit },
    props: {},
    data() {
      return {
        listLoading: false,
        tableData: [],
        pageSize: 10,
        pageNum: 1,
        total: 0,
        dialogVisible: false,
        detail: {},
        ruleForm: {
          classifyName: '',
          description: '',

        },
        rules: {
          classifyName: [
            { required: true, message: '请输入分类名称', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '请输入分裂描述', trigger: 'blur' }
          ]

        }
      };
    },
    mounted() { },
    created() {
      this.handleCurrentChange(1);
    },
    methods: {
      submitForm(formName, id) {
        this.$refs.ruleForm.validate((valid) => {
          if (!valid) return false
          let params = {
            id,
            ...this.ruleForm
          }
          updateClassfityById(params).then(res => {
            if (res.meta.status === 200) {
              this.$notify.success({
                message: res.meta.msg,
                showClose: false
              });
              this.handleCurrentChange(1);
            } else {
              this.$notify.error({
                message: res.meta.msg,
                showClose: false
              });
            }
          })
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
        getClassfityList(params).then((res) => {
          this.listLoading = false;
          console.log(res);
          if (res.meta.status === 200) {
            this.tableData = res.data.docs;
            this.total = res.data.total
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
      updateArticle(row) {
        this.ruleForm.classifyName = row.classifyName
        this.ruleForm.description = row.description
        this.$refs.refTable.toggleRowExpansion(row)
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
      createClassfity() {
        this.detail = {}
        this.dialogVisible = true
      },
      cancel() {
        this.dialogVisible = false
      },
      success() {
        this.handleCurrentChange(1);
      }
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