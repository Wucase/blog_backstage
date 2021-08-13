<template>
  <div class="home">
    <el-container>
      <el-aside width="250px">
        <div
          class="aside-title">
          <img
            src="@/assets/images/logo.png"
            alt="">
        </div>
        <div
          class="aside-menu">
          <el-menu router
            class="el-menu-vertical-demo"
            background-color="#3E3E3E"
            text-color="#fff"
            :default-active="$route.path"
            active-text-color="#ffd04b"
            @open="handleOpen"
            @close="handleClose">

            <el-menu-item
              index="users">
              <i
                class="el-icon-menu"></i>
              <span
                slot="title">用户菜单</span>
            </el-menu-item>
            <el-menu-item
              :index="item.menuUrl"
              v-for="item in menuList"
              :key="item.id">
              <i
                class="el-icon-menu"></i>
              <span
                slot="title">{{item.menuName}}</span>
            </el-menu-item>

          </el-menu>
        </div>
      </el-aside>
      <el-main>
        <el-header>
          <el-button
            type="primary"
            size="small"
            @click="toUser">
            用户页面</el-button>
        </el-header>
        <div
          class="main-article">
          <router-view />
        </div>

      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getMenuList } from "@/api/menu";
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
    getMenuLists() {
      let params = {
        menuType: "manager",
        pageSize: 9999,
        pageNum: 1,
      };
      this.listLoading = true;
      getMenuList(params).then((res) => {
        this.listLoading = false;
        console.log(res);
        if (res.meta.status === 200) {
          this.menuList = res.data.docs;
        }
      });
    },
    handleOpen() {},
    handleClose() {},
    toUser() {
      this.$router.push("/users");
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
