<template>
  <div class='articleMagList'>
    <div class="article-header">
      <el-button type="success" round size="mini" @click="createClassfity">
        新建菜单
      </el-button>
    </div>
    <el-divider></el-divider>
    <el-tabs v-model="tabActiveName" @tab-click="handleClick">
      <el-tab-pane label="用户菜单" name="user">
      </el-tab-pane>
      <el-tab-pane label="管理员菜单" name="manager">
      </el-tab-pane>
    </el-tabs>
    <el-table :data="tableData" stripe tooltip-effect="dark" style="width: 100%;margin-top:20px;"
      v-loading="listLoading" ref='refTable'>


      <el-table-column :show-overflow-tooltip="true" prop="id" label="ID">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="menuName" label="菜单名称">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="menuUrl" label="菜单URL">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="menuIcon" label="菜单ICON">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="menuType" label="菜单类型">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="menuStatus" label="菜单状态">
        <template slot-scope="scope">
          <el-tag class="tip-type" :type="scope.row.menuStatus == 1 ? 'success' : 'danger'" effect="dark" size='small'>
            {{scope.row.menuStatus == 1 ? '展示' : '隐藏'}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="description" label="描述">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="createDate" label="新建时间">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="updateDate" label="更新时间">
      </el-table-column>
      <el-table-column width="150" label="操作">
        <template slot-scope="scope">
          <el-link :underline="false" type="warning" round size="mini"
            @click="changeStatus(scope.row.id, scope.row.menuStatus)">
            {{scope.row.menuStatus == 1? '隐藏' : '展示'}}
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
    <div v-if='dialogVisible'>
      <menu-edit :dialogVisible='dialogVisible' :detail="detail" @cancel="cancel" @success='success'>
      </menu-edit>
    </div>
  </div>
</template>

<script>
  import { updateClassfityById, } from "@/api/classfity";
  import { getMenuList, deleteMenuById, updateMenuStatusById } from "@/api/menu";
  import menuEdit from "./components/menuEdit.vue";
  export default {
    name: "articleMagList",
    components: { menuEdit },
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
        tabActiveName: "user",
        ruleForm: {
          classifyName: "",
          description: "",
        },
        rules: {
          classifyName: [
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
      changeStatus(id, status) {
        console.log(id);
        let params = {
          menuStatus: status == 1 ? 0 : 1,
          id: id,
        };
        updateMenuStatusById(params).then((res) => {
          if (res.meta.status == 200) {
            this.$message.success((status == 1 ? "隐藏" : "展示") + "成功");
            this.handleCurrentChange(1);
          }
        });
      },
      handleClick(val) {
        console.log(val.name);
        this.handleCurrentChange(1);
      },
      submitForm(formName, id) {
        this.$refs.ruleForm.validate((valid) => {
          if (!valid) return false;
          let params = {
            id,
            ...this.ruleForm,
          };
          updateClassfityById(params).then((res) => {
            if (res.meta.status === 200) {
              this.$notify.success({
                message: res.meta.msg,
                showClose: false,
              });
              this.handleCurrentChange(1);
              this.$emit("refleshMenu");
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
        this.getMenuLists();
      },
      handleCurrentChange(page) {
        this.pageNum = page;
        this.getMenuLists();
      },
      getMenuLists() {
        let params = {
          menuType: this.tabActiveName,
          pageSize: this.pageSize,
          pageNum: this.pageNum,
        };
        this.listLoading = true;
        getMenuList(params).then((res) => {
          this.listLoading = false;
          console.log(res);
          if (res.meta.status === 200) {
            this.tableData = res.data.docs;
            this.total = res.data.total;
          }
        });
      },
      updateArticle(row) {
        this.detail = row;
        this.dialogVisible = true;
      },
      deleteArticle(id) {
        console.log(id, "====");
        deleteMenuById({ id: id }).then((res) => {
          if (res.meta.status == 200) {
            this.$message.success("删除成功");
            this.getMenuLists();
            this.$emit("refleshMenu");
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
        this.$emit("refleshMenu");
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