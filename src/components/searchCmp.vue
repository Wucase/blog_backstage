<template>
  <div class="aboutUser-search">
    <el-input v-model="searchValue" placeholder="请输入内容" clearable @clear="clearBtn">
      <el-button slot="append" icon="el-icon-search" @click="searchBtn">
      </el-button>
    </el-input>
  </div>
</template>

<script>
  export default {
    name: 'searchCmp',
    components: {

    },
    data() {
      return {
        searchValue: '',
        select: ''
      }
    },
    created() {

    },
    methods: {
      searchBtn() {
        this.$emit("searchBtn", this.searchValue)
      },
      clearBtn() {
        this.searchValue = ''
        this.$emit("searchBtn")
      }
    }
  }
</script>

<style lang='scss' scoped>
  .aboutUser-search {
    width: 400px;
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

    /deep/ .el-input__suffix {
      transform: translate(-56px, -4px) !important;
      /* margin-top: -10px; */

    }

    /deep/.el-input__inner {
      border: none !important;
      height: 30px;
      border-radius: 20px;
    }
  }
</style>