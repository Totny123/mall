<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      click: true,
      pullUpLoad: this.pullUpLoad,
    });

    //判断变量，决定是否监听，提高性能
    if (this.probeType === 2 || this.probeType == 3) {
      this.scroll.on("scroll", (position) => {
        this.$emit("scroll", position);
      });
    }

    //判断变量，决定是否监听，提高性能
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      //滚动到某处，通常是顶部。
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      //本次上拉加载完成。调用此方法才能调用下一次加载更多。
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      //重新计算可滚动距离
      this.scroll && this.scroll.refresh();
    },
    //获取滚动的Y值
    getY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>

<style scoped>
</style>