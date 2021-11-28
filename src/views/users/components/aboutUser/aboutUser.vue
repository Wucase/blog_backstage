<template>
  <div class="aboutUser">
    <div class="aboutUser-name">
      <div class="aboutUser-name-icon">
        <img src="@/assets/images/myicon.jpg" alt="" style="width:50px;height:80px;">
      </div>
      <div class="aboutUser-name-info">
        <h4>零售时间</h4>
        <p>愿时间可以零售，得以找回失去的**
        </p>
      </div>
    </div>
    <div class="aboutUser-info">
      <ul>
        <li>
          <p>{{countInfo.articleCount || 0}}</p>
          <p class="text">原创
          </p>
        </li>
        <li>
          <p>{{countInfo.classfityCount || 0}}</p>
          <p class="text">转载
          </p>
        </li>
        <li>
          <p>{{countInfo.articleVisit || 0}}</p>
          <p class="text">访问
          </p>
        </li>
        <li>
          <p>{{countInfo.articleComment || 0}}</p>
          <p class="text">评论
          </p>
        </li>
        <li>
          <p>{{countInfo.userCount || 0}}</p>
          <p class="text">用户
          </p>
        </li>
      </ul>
    </div>
    <el-divider></el-divider>
    <div class="aboutUser-search">
      <el-input v-model="searchValue" placeholder="请输入内容">
        <el-button slot="append" icon="el-icon-search" @click="searchBlog">
        </el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
  import { getStatisticsCount } from '@/api/articleApi'
  export default {
    name: "",
    components: {},
    data() {
      return {
        searchValue: "",
        articalBI: false,
        countInfo: {}
      };
    },
    created() {
      this.articalBI = true;
      this.getStatisticsCount()

    },
    methods: {
      searchBlog() {
        this.$eventBus.$emit('sendSearch', this.searchValue, 'search')
      },
      getStatisticsCount() {
        getStatisticsCount().then(res => {
          console.log('res---', res);
          if (res.meta.status === 200) {
            this.countInfo = res.data
          }
        })
      }
    },
  };
</script>

<style lang='scss' scoped>
  .aboutUser {
    background-color: #fff;
    padding: 15px;
    box-sizing: border-box;

    .aboutUser-name {
      display: flex;
      justify-content: flex-start;

      .aboutUser-name-icon {}

      .aboutUser-name-info {
        padding-left: 20px;
        box-sizing: border-box;
        font-size: 12px;
        line-height: 6px;
        margin-top: 7px;
        font-family: Avenir, Helvetica, Arial, sans-serif !important;

        h4 {
          font-size: 14px !important;
        }

        p {
          color: #999aaa;
        }
      }
    }

    .aboutUser-info {
      ul {
        width: 100%;
        display: flex;
        padding: 0;
        justify-content: space-between;

        li {
          width: 50px;
          height: 50px;
          list-style: none;
          text-align: center;
          font-size: 12px;

          p {
            margin: 0;
            line-height: 25px;
            color: #000;
          }

          .text {
            color: #999aaa;
            font-size: 14px;
          }
        }
      }
    }

    .el-divider {
      margin: 15px 0;
    }
  }

  .aboutUser-search {
    margin: 10px 0;

    .el-button {
      position: relative;
      top: 0;
      left: 0;

      &::before {
        content: "";
        display: inline-block;
        width: 2px !important;
        height: 20px;
        position: absolute;
        top: 9px;
        left: 2px;
        background-color: #ddd;
      }
    }

    /deep/ .el-input-group__append {
      border: none;
      background-color: #fff;
      border-radius: 20px;
      height: 30px;
    }

    /deep/ .el-input {
      border: 1px solid #ddd;
      border-radius: 20px;
      height: 30px;
    }

    /deep/.el-input__inner {
      border: none !important;
      height: 30px;
      border-radius: 20px;
    }
  }
</style>