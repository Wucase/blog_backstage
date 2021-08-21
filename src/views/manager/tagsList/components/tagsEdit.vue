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
        label="标签名称"
        prop="tagName">
        <el-input
          v-model="ruleForm.tagName"
          size="small">
        </el-input>
      </el-form-item>

      <el-form-item
        label="标签描述"
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
import { tagsCreate } from "@/api/tags";
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
      title: "新建文章标签",
      ruleForm: {
        tagName: "",
        menuType: "user",
        menuUrl: "",
        menuIcon: "",
        menuStatus: "1",
        description: "",
      },
      rules: {
        tagName: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.title = this.detail.id ? "编辑文章标签" : "新建文章标签";
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
        tagsCreate(params).then((res) => {
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