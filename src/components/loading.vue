<template>
  <div class='loading' :class="{isPosition:posit}">
    <div id="ajaxloader3">
      <div class="outer">
      </div>
      <div class="inner">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "loading",
    components: {},
    props: {
      posit: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {};
    },
    mounted() { },
    created() { },
    methods: {},
  };
</script>

<style lang='scss' scoped>
  .loading {
    height: 65px;
  }

  #ajaxloader3 {
    margin: 0 auto;
    //   padding-top: 25px !important;
    box-sizing: border-box;
    height: 65px;
  }

  #ajaxloader3 .outer {
    //   border: 5px solid rgba(0, 229, 183, 0.9);
    border: 5px solid rgba(47, 84, 235, 0.9);
    opacity: 0.9;
    border-right-color: transparent;
    border-left-color: transparent;
    width: 50px;
    height: 50px;
    margin: 0 auto;
    border-radius: 50%;
    -webkit-box-shadow: 0 0 35px rgba(0, 76, 61, 0.9);
    -moz-box-shadow: 0 0 35px rgba(0, 76, 61, 0.9);
    box-shadow: 0 0 35px rgba(0, 76, 61, 0.9);
    -webkit-animation: spin-pulse 1s linear infinite normal;
    -moz-animation: spin-pulse 1s linear infinite normal;
    -ms-animation: spin-pulse 1s linear infinite normal;
    animation: spin-pulse 1s linear infinite normal;
    -webkit-animation-delay: 0;
    -moz-animation-delay: 0;
    -o-animation-delay: 0;
    animation-delay: 0;
  }

  #ajaxloader3 .inner {
    //   border: 5px solid rgba(0, 229, 183, 0.9);
    border: 5px solid rgba(107, 195, 13, 0.9);
    opacity: 0.9;
    border-left-color: transparent;
    border-right-color: transparent;
    border-radius: 50%;
    -webkit-box-shadow: 0 0 15px rgba(0, 76, 61, 0.9);
    -moz-box-shadow: 0 0 15px rgba(0, 76, 61, 0.9);
    box-shadow: 0 0 15px rgba(0, 76, 61, 0.9);
    width: 30px;
    height: 30px;
    position: relative;
    top: -50px;
    margin: 0 auto;
    -webkit-animation: spin-right 1s linear infinite normal;
    -moz-animation: spin-right 1s linear infinite normal;
    -ms-animation: spin-right 1s linear infinite normal;
    animation: spin-right 1s linear infinite normal;
    -webkit-animation-delay: 0;
    -moz-animation-delay: 0;
    -o-animation-delay: 0;
    animation-delay: 0;
  }

  @keyframes spin-right {
    from {
      transform: rotate(0deg);
      opacity: 0.2;
    }

    50% {
      transform: rotate(180deg);
      opacity: 1;
    }

    to {
      transform: rotate(360deg);
      opacity: 0.2;
    }
  }

  @-moz-keyframes spin-right {
    from {
      -moz-transform: rotate(0deg);
      opacity: 0.2;
    }

    50% {
      -moz-transform: rotate(180deg);
      opacity: 1;
    }

    to {
      -moz-transform: rotate(360deg);
      opacity: 0.2;
    }
  }

  @-webkit-keyframes spin-right {
    from {
      -webkit-transform: rotate(0deg);
      opacity: 0.2;
    }

    50% {
      -webkit-transform: rotate(180deg);
      opacity: 1;
    }

    to {
      -webkit-transform: rotate(360deg);
      opacity: 0.2;
    }
  }

  @keyframes spin-left {
    from {
      transform: rotate(0deg);
      opacity: 0.2;
    }

    50% {
      transform: rotate(-180deg);
      opacity: 1;
    }

    to {
      transform: rotate(-360deg);
      opacity: 0.2;
    }
  }

  @-moz-keyframes spin-left {
    from {
      -moz-transform: rotate(0deg);
      opacity: 0.2;
    }

    50% {
      -moz-transform: rotate(-180deg);
      opacity: 1;
    }

    to {
      -moz-transform: rotate(-360deg);
      opacity: 0.2;
    }
  }

  @-webkit-keyframes spin-left {
    from {
      -webkit-transform: rotate(0deg);
      opacity: 0.2;
    }

    50% {
      -webkit-transform: rotate(-180deg);
      opacity: 1;
    }

    to {
      -webkit-transform: rotate(-360deg);
      opacity: 0.2;
    }
  }

  @keyframes spin-pulse {
    from {
      transform: rotate(160deg);
      opacity: 0;
      box-shadow: 0 0 1px rgba(0, 61, 76, 0.9);
    }

    50% {
      transform: rotate(145deg);
      opacity: 1;
    }

    to {
      transform: rotate(-320deg);
      opacity: 0;
    }
  }

  @-moz-keyframes spin-pulse {
    from {
      -moz-transform: rotate(160deg);
      opacity: 0;
      box-shadow: 0 0 1px rgba(0, 61, 76, 0.9);
    }

    50% {
      -moz-transform: rotate(145deg);
      opacity: 1;
    }

    to {
      -moz-transform: rotate(-320deg);
      opacity: 0;
    }
  }

  @-webkit-keyframes spin-pulse {
    from {
      -webkit-transform: rotate(160deg);
      opacity: 0;
      box-shadow: 0 0 1px rgba(0, 61, 76, 0.9);
    }

    50% {
      -webkit-transform: rotate(145deg);
      opacity: 1;
    }

    to {
      -webkit-transform: rotate(-320deg);
      opacity: 0;
    }
  }

  .isPosition {
    position: absolute;
    top: 50%;
    left: 55%;
  }
</style>