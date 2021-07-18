<template>
  <el-dialog title="用户登录" :visible.sync="dialogVisible" width="300px" :before-close="handleClose">


    <div class="title-show">
      <span class="animated bounceInDown" style="animation-delay: 0.2s;"><i
          class="iconfont icon-W_round_solid icon-title"></i></span>
      <span class="animated bounceInDown" style="animation-delay: 0.5s;"><i
          class="iconfont icon-M_round_solid icon-title"></i></span>
      <span class="animated bounceInDown" style="animation-delay: 0.1s;"><i
          class="iconfont icon-I_round_solid icon-title"></i></span>
      <span class="animated bounceInDown" style="animation-delay: 0.3s;"><i
          class="iconfont icon-N_round_solid icon-title"></i></span>
      <span class="animated bounceInDown" style="animation-delay: 0.4s;"><i
          class="iconfont icon-G_round_solid icon-title"></i></span>
    </div>
    <!-- <el-divider></el-divider> -->
    <el-form :model="loginForm" status-icon :rules="loginForm" ref="loginForm" class="demo-ruleForm">
      <el-form-item prop="userName">
        <el-input type="text" v-model="loginForm.userName" autocomplete="off" placeholder="用户名" size="mini"
          prefix-icon="el-icon-user"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="密码" size="mini"
          prefix-icon="el-icon-lock"></el-input>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose" size="mini">取 消</el-button>
      <el-button type="primary" @click="submitForm" size="mini">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: 'loginForm',
    components: {

    },
    props: { dialogVisible: { type: Boolean, default: false } },
    data() {
      return {
        loginForm: {
          userName: '',
          password: ""
        }
      }
    },
    created() {

    },
    methods: {
      submitForm() { },
      handleClose() { this.$emit('cancel') }
    }
  }
</script>

<style lang='scss' scoped>
  div /deep/ .el-dialog {
    border-radius: 10px !important;

    .el-dialog__header {
      padding: 10px;
    }

    .el-dialog__body {
      padding: 15px 25px;
    }

    .el-dialog__footer {
      padding: 0 25px 15px 25px;
    }
  }

  .title-show {

    text-align: center;

    span {
      display: inline-block;
    }

    .icon-title {
      color: rgb(75, 163, 240);
      font-size: 20px !important;
    }

    // background-color: #fff;
  }
</style>