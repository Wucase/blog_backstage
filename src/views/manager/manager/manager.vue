<template>
  <div class="home">
    <el-container>
      <el-aside width="250px">
        <div class="aside-title">
          <img src="@/assets/images/logo.png" alt="">
        </div>
        <div class="aside-menu">
          <el-menu router class="el-menu-vertical-demo" background-color="#3E3E3E" text-color="#fff"
            :default-active="$route.path" active-text-color="#ffd04b" @open="handleOpen" @close="handleClose">

            <el-menu-item @click="toUser">
              <i class="el-icon-menu"></i>
              <span slot="title">游客页面</span>
            </el-menu-item>
            <el-menu-item :index="item.menuUrl" v-for="item in menuList" :key="item.id">
              <i class="el-icon-menu"></i>
              <span slot="title">{{item.menuName}}</span>
            </el-menu-item>

          </el-menu>
        </div>
      </el-aside>
      <el-main>
        <el-header>

        </el-header>
        <div class="main-article">
          <router-view @refleshMenu="refleshMenu" />
        </div>

      </el-main>
    </el-container>
  </div>
</template>

<script>
  import { getMenuListFun } from "@/utils/tools";
  export default {
    name: "Home",
    components: {},
    data() {
      return {
        menuList: [],
      };
    },
    created() {
      this.getMenuLists();
    },
    methods: {
      async refleshMenu() {
        this.menuList = await getMenuListFun('manager')
      },
      async getMenuLists() {
        // let managerMenu = JSON.parse(window.sessionStorage.getItem("managerMenu"))
        // if (managerMenu) return this.menuList = managerMenu
        this.menuList = await getMenuListFun('manager')
      },
      handleOpen() { },
      handleClose() { },
      toUser() {
        this.$confirm('跳转到游客页面, 是否继续?', '游客页面', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$router.push("/users");
        }).catch(() => {

        });

      },
    },
  };
</script>
<style lang="scss" scoped>
  .home {
    width: 100%;
    height: 100%;

    .el-container {
      width: 100%;
      height: 100%;

      .el-aside {
        height: 100%;
        background-color: rgb(62, 62, 62);
      }

      .el-main {
        .el-header {
          padding: 0;
          margin-bottom: 15px;
          background-color: #fff;
          box-sizing: border-box;
        }

        .main-article {
          background-color: #fff;
          padding: 15px;
          box-sizing: border-box;
        }

        height: 100%;
        background-color: rgb(240, 243, 244);
        padding: 15px;
        padding-top: 0;
        box-sizing: border-box;
      }
    }
  }

  .aside-title {
    width: 100%;
    height: 60px;
    background-color: #fff;

    img {
      width: 200px;
      height: 50px;
    }
  }

  .aside-menu {
    margin-top: 20px;

    .el-menu {
      border-right: 1px solid #3e3e3e;
    }
  }
</style>