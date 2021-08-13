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
        label="菜单类型"
        prop="menuType">
        <el-radio-group
          v-model="ruleForm.menuType"
          size="small">
          <el-radio-button
            label="user">用户
          </el-radio-button>
          <el-radio-button
            label="manager">
            管理员
          </el-radio-button>
        </el-radio-group>

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
        label="菜单状态"
        prop="menuStatus">
        <el-radio-group
          v-model="ruleForm.menuStatus"
          size="small">
          <el-radio-button
            label="1">启用
          </el-radio-button>
          <el-radio-button
            label="0">禁用
          </el-radio-button>
        </el-radio-group>

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
import { menuCreate, updateMenuById } from "@/api/menu";
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
        menuType: "user",
        menuUrl: "",
        menuIcon: "",
        menuStatus: "1",
        description: "",
      },
      rules: {
        menuName: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
        ],
        menuUrl: [
          { required: true, message: "请输入菜单URL", trigger: "blur" },
        ],
        menuType: [
          { required: true, message: "请选择菜单类型", trigger: "blur" },
        ],
        menuIcon: [
          { required: true, message: "请输入菜单ICON", trigger: "blur" },
        ],
        menuStatus: [
          { required: true, message: "请选择菜单状态", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.title = this.detail.id ? "编辑文章分类" : "新建文章分类";
    if (this.detail.id) {
      this.ruleForm = JSON.parse(JSON.stringify(this.detail));
    }
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return false;
        let params = {
          ...this.ruleForm,
        };
        let api = { updateMenuById, menuCreate };
        api[this.detail.id ? "updateMenuById" : "menuCreate"](params).then(
          (res) => {
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
          }
        );
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