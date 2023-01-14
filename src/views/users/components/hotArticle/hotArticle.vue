<template>
  <div class="search">
    <div class="clearfix">
      <h2 style="font-size: 20px; color: rgb(153,153,153)">
        <span class="iconfont icon-remen title"></span>
        blog热门
      </h2>
    </div>
    <el-divider></el-divider>
    <div class="typeList">
      <ul v-if="hotList.length > 0">
        <li v-for="(item, index) in hotList" :key="index">
          <div>{{index+1}}
          </div>
          <el-link :underline="false">
            {{item.articleTitle}}
          </el-link>
          <span class="iconfont icon-xianxingzhifeijitubiao" style="margin-right:0;"></span>
        </li>

      </ul>
      <div v-else class="no-data">
        <img src="@/assets/images/null.jpeg" alt="">
      </div>
    </div>

  </div>
</template>

<script>
  import { typeList } from "./data.js";
  import { getArticleHots } from '@/api/articleApi'
  export default {
    name: "hotArticle",
    components: {},
    data() {
      return {
        articalBI: false,
        searchValue: "",
        typeList: typeList,
        hotList: [],
      };
    },
    created() {
      this.articalBI = true;
      this.getArticleHots()
    },
    methods: {
      getArticleHots() {
        getArticleHots().then(res => {
          console.log('>>>>>>>>>>>>>', res);
          if (res.meta.status === 200) {
            this.hotList = res.data
          }
        })
      }

    },
  };
</script>

<style lang='scss' scoped>
  .search {
    /* height: 250px; */
    padding: 10px;
    box-sizing: border-box;
    background-color: #fff;
    margin: 20px 0;

    h2 {
      margin-top: 0;
    }
  }

  ::v-deep .el-card__header {
    padding: 10px 0;
  }

  .title {
    font-size: 20px;
    color: #6bc30d;
  }

  .typeList {
    margin: 10px 0;

    ul {
      list-style: none;
      position: relative;
      left: 0;
      top: 0;
      padding-left: 20px;

      li {
        /* padding: 0 25px; */
        height: 39px;
        color: #787977;
        line-height: 39px;
        cursor: pointer;
        overflow: hidden;
        display: flex;
        justify-content: flex-start;

        div {
          width: 50px;
          display: inline-block;
        }

        span {
          width: 20px;
          display: inline-block;
          font-size: 25px;
        }

        a {
          flex: 1;
          display: inline-block;
          text-align: left;
        }

        &:hover span {
          color: rgb(64, 158, 255);
        }

        div {
          width: 25px;
          height: 25px;
          background-color: #ddd;
          border-radius: 50%;
          margin-top: 7px;
          text-align: center;
          line-height: 25px;
        }

        &:nth-child(1)>div {
          background-color: red;
          color: #fff;
        }

        &:nth-child(2)>div {
          background-color: skyblue;
          color: #fff;
        }

        &:nth-child(3)>div {
          background-color: #6bc30d;
          color: #fff;
        }

        .el-link {
          margin-left: 15px;
        }
      }
    }
  }

  .search ::v-deep .el-divider {
    margin: 10px 0 !important;
  }

  .no-data{
    display: flex;
    justify-content: center;
    img{
      width: 100px;
      border-radius: 50%;
    }
  }
</style>
