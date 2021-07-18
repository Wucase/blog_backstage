<template>
  <div class='articleCreate'>
    <el-form
      :model="articleForm"
      :rules="articleRules"
      ref="articleFormRef"
      label-width="100px"
      class="demo-ruleForm">
      <el-form-item
        label="文章名称"
        prop="articleTitle">
        <el-input
          v-model="articleForm.articleTitle"
          size="mini">
        </el-input>
      </el-form-item>
      <el-form-item
        label="文章作者"
        prop="articleAuthor">
        <el-input
          v-model="articleForm.articleAuthor"
          size="mini">
        </el-input>
      </el-form-item>
      <div
        class="upload-type">
        <el-form-item
          label="创作方式"
          prop="uploadType">
          <el-radio-group
            v-model="articleForm.uploadType"
            size="mini"
            @change="changeType">
            <el-radio-button
              label="write">
              立即创作
            </el-radio-button>
            <el-radio-button
              label="file">
              上传文件
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <div
          v-if="articleForm.uploadType == 'file'"
          class="upload-type-file">
          <el-upload action
            multiple
            :show-file-list="false"
            :http-request="(data) => handleAvatarSuccess(data, fileList)">
            <el-button
              size="mini"
              type="success">
              上传文章
            </el-button>
            <div slot="tip"
              class="el-upload__tip">
              只能上传md文件，且不超过200M
            </div>
          </el-upload>
        </div>
      </div>

      <div
        class='article-content'>
        <el-form-item
          label="文章内容"
          prop="articleContent">
          <mavon-editor
            v-model="articleForm.articleContent"
            :toolbars="toolbars"
            :toolbarsBackground="'#f9f9f9'"
            @imgAdd="imgAdd" />
        </el-form-item>
      </div>
      <el-form-item
        label="文章类型"
        prop="articleType">
        <el-input
          v-model="articleForm.articleType"
          size="mini">
        </el-input>
      </el-form-item>
      <el-form-item
        label="文章标签"
        prop="articleTip">
        <el-input
          v-model="articleForm.articleTip"
          size="mini">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="mini"
          @click="submitArticleForm('ruleForm')">
          立即创建</el-button>
        <el-button size="mini"
          @click="resetForm('ruleForm')">
          重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  fileUpload,
  articleCreate,
  getArticleById,
  updateArticleById,
} from "@/api/articleApi";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { testData, toolbars } from "./data";
export default {
  name: "articleCreate",
  components: { mavonEditor },
  props: {},
  data() {
    return {
      articleId: "",
      uploadName: "",
      fileList: [],
      toolbars,
      articleForm: {
        articleTitle: "substring",
        uploadType: "write",
        articleContent: testData,
        articleAuthor: "substring",
        articleTip: "substring",
        articleType: "substring",
      },
      articleRules: {
        articleTitle: [
          { required: true, message: "请输入文章名称", trigger: "change" },
        ],
      },
    };
  },
  created() {
    if (this.$route.query.articleId) {
      this.articleId = this.$route.query.articleId;
      this.updataArticleInit(this.articleId);
    }
  },
  mounted() {},
  methods: {
    changeType(val) {
      console.log(">>>>>>>>", val);
      this.articleForm.uploadType = val;
    },
    updataArticleInit(id) {
      let params = {
        articleId: id,
      };
      getArticleById(params).then((res) => {
        if (res.meta.status == "200") {
          if (res.data.length) {
            this.articleForm = { ...this.articleForm, ...res.data[0] };
            console.log(this.articleForm);
          }
        } else {
          this.$message.error("查询文章失败");
        }
      });
    },
    imgAdd() {},
    handleAvatarSuccess(data) {
      console.log(data);
      console.log(data.file);
      this.uploadName = null;
      let file = data.file;
      let fileType = file.name.substring(file.name.lastIndexOf(".") + 1);
      if (fileType != "md") return this.$message.warning("请上传md类型文件");
      const form = new FormData();
      form.append("multipartFile", file);
      fileUpload(form).then((res) => {
        console.log(res.meta);
        if (res.meta.status == "200") {
          console.log(">>>>>>>>", res);
          this.uploadName = res.fileName;
          this.$message.success(res.meta.msg);
          this.articleForm.articleContent = res.fileContent;
        }
      });
    },
    submitArticleForm() {
      console.log(">>>>>", this.articleForm.articleContent);
      this.$refs["articleFormRef"].validate((valid) => {
        if (!valid) return false;
        let params = { ...this.articleForm };
        if (this.$route.query.articleId) {
          updateArticleById(params).then((res) => {
            if (res.meta.status == 200) {
              this.$message.success(res.meta.msg);
              this.$router.push("/manager/articleMagList");
            }
          });
        } else {
          params["userId"] = "test";
          if (this.articleForm.uploadType == "file" && this.uploadName)
            params["uploadName"] = this.uploadName;
          articleCreate(params).then((res) => {
            if (res.meta.status == 200) {
              this.$message.success(res.meta.msg);
              this.$router.push("/manager/articleMagList");
            }
          });
        }
      });
    },
    resetForm() {
      this.$refs["articleFormRef"].resetFields();
    },
  },
};
</script>

<style lang='scss' scoped>
.upload-type {
  display: flex;
  justify-content: flex-start;
  .upload-type-file {
    margin-top: 8px;
    margin-left: 25px;
  }
}
</style>