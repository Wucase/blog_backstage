<template>
  <div class="home">
    <el-container>
      <el-aside width="250px">
        Aside</el-aside>
      <el-main>
        <el-header>Header
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
export default {
  name: "Home",
  components: {},
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
</style>
