<template>
  <el-dialog :title="title"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <el-form :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm">
      <el-form-item
        label="分类名称"
        prop="classifyName">
        <el-input
          v-model="ruleForm.classifyName">
        </el-input>
      </el-form-item>
      <el-form-item
        label="分类描述"
        prop="description">
        <el-input
          v-model="ruleForm.description">
        </el-input>
      </el-form-item>
      <el-form-item
        label="分类图片"
        prop="blogImg"
        class="blogImg">
        <div class="block"
          v-if="imgUrl">
          <img :src="imgUrl"
            alt="no"
            style="width: 100px;height: 100px;" />
        </div>

        <el-upload
          :class="{upLoadBtn:true,upBtn:imgUrl}"
          action multiple
          :show-file-list="false"
          :http-request="(data) => handleAvatarSuccess(data, fileList)">
          <el-button
            size="small"
            type="primary">
            点击上传
          </el-button>
          <div slot="tip"
            class="el-upload__tip">
            只能上传jpg文件，且不超过2M
          </div>
        </el-upload>
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
import { imgUpload } from "@/api/articleApi";
import { classfityCreate } from "@/api/classfity";
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
      imgUrl: "",
      fileList: [],
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
  created() {
    this.title = this.detail.id ? "编辑文章分类" : "新建文章分类";
  },
  methods: {
    handleAvatarSuccess(data) {
      let file = data.file;
      if (!/image/.test(file.type))
        return this.$message.warning("请上传图片类型");
      const form = new FormData();
      form.append("multipartFile", file);
      imgUpload(form).then((res) => {
        console.log(res.meta);
        if (res.meta.status == "200") {
          this.imgUrl = this.$imgUrl + res.avatar_url;
          this.ruleForm.classfityIcon = res.avatar_url;
        }
      });
    },
    submitForm(formName) {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return false;
        let params = {
          ...this.ruleForm,
        };
        classfityCreate(params).then((res) => {
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
.blogImg {
}
</style>