<template>
  <div class="shiMask">
    <div class="text" style="font-size:18px;">
      <p style="color:#fff;">
        知道的越多，不知道的越多</p>
      <p>wming
        个人博客旨在锻炼自己的能力,提升自己！并将遇到的一些问题进行整理
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ShiMask",
    components: {},
    props: {

    },
    data() {
      return {};
    },
    created() { },
    methods: {},
  };
</script>

<style lang="scss" scoped>
  .text {
    width: 100%;
    /* height: 20%; */
    text-align: center;
    background-image: -webkit-linear-gradient(left,
        #147b96,
        #ffe1ff 25%,
        #147b96 50%,
        #fff0f5 75%,
        #147b96);
    -webkit-text-fill-color: transparent;
    /* 将字体设置成透明色 */
    -webkit-background-clip: text;
    /* 裁剪背景图，使文字作为裁剪区域向外裁剪 */
    -webkit-background-size: 200% 100%;
    -webkit-animation: masked-animation 4s linear infinite;
    font-size: 22px;
  }

  @keyframes masked-animation {
    0% {
      background-position: 0 0;
    }

    100% {
      background-position: -100% 0;
    }
  }
</style>