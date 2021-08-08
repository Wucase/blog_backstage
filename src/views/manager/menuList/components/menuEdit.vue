<template>
  <el-dialog :title="title"
    :visible.sync="dialogVisible"
    width="35%"
    :before-close="handleClose">
    <el-form :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      class="demo-ruleForm">
      <el-form-item
        label="菜单名称"
        prop="menuName">
        <el-input
          v-model="ruleForm.menuName"
          size="small">
        </el-input>
      </el-form-item>
      <el-form-item
        label="菜单Url"
        prop="menuUrl">
        <el-input
          v-model="ruleForm.menuUrl"
          size="small">
        </el-input>
      </el-form-item>
      <el-form-item
        label="菜单icon"
        prop="menuIcon">
        <el-input
          v-model="ruleForm.menuIcon"
          size="small">
        </el-input>
      </el-form-item>
      <el-form-item
        label="菜单类型"
        prop="menuType">
        <el-select
          v-model="ruleForm.menuType"
          placeholder="请选择"
          size="small">
          <el-option
            label="用户"
            value="user">
          </el-option>
          <el-option
            label="管理员"
            value="manager">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="菜单描述"
        prop="description">
        <el-input
          type="textarea"
          v-model="ruleForm.description"
          size="small">
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer"
      class="dialog-footer">
      <el-button
        @click="handleClose">取
        消</el-button>
      <el-button
        type="primary"
        @click="submitForm('ruleForm')">
        确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { menuCreate } from "@/api/menu";
export default {
  name: "classfityEdit",
  components: {},
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
    },
    detail: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  data() {
    return {
      title: "新建文章分类",
      ruleForm: {
        menuName: "",
        menuType: "",
        menuUrl: "",
        menuIcon: "",
        description: "",
      },
      rules: {
        menuName: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
        menuUrl: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
        menuType: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
        menuIcon: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
        description: [
          { required: true, message: "请输入分裂描述", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.title = this.detail.id ? "编辑文章分类" : "新建文章分类";
  },
  methods: {
    submitForm(formName) {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return false;
        let params = {
          ...this.ruleForm,
        };
        menuCreate(params).then((res) => {
          if (res.meta.status === 200) {
            this.$notify.success({
              message: res.meta.msg,
              showClose: false,
            });
            this.handleClose();
            this.$emit("success");
          } else {
            this.$notify.error({
              message: res.meta.msg,
              showClose: false,
            });
          }
        });
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    handleClose() {
      this.$refs.ruleForm.resetFields();
      this.$emit("cancel");
    },
  },
};
</script>

<style lang='scss' scoped>
</style>