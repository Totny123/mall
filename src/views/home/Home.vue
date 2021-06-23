<template>
  <div id="home">
    <nav-bar class="home-nav-bar"><div slot="center">购物街</div></nav-bar>
    <tab-control
      class="tcontrol"
      ref="placeHolderTabControl"
      :titles="['流行', '新款', '精选']"
      @tabClick="changeCurrentType"
      v-show="isFixedTabControl"
    ></tab-control>
    <scroll
      class="wrapper"
      ref="scroll"
      @scroll="wrapperScroll"
      :pullUpLoad="true"
      @pullingUp="loadMore"
      :probe-type="3"
    >
      <home-swiper
        :banners="banners"
        @swiperImgLoaded="swiperImgLoaded"
      ></home-swiper>
      <home-recommend :recommends="recommends"></home-recommend>
      <home-feature></home-feature>
      <tab-control
        ref="tabControl"
        :titles="['流行', '新款', '精选']"
        @tabClick="changeCurrentType"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper.vue";
import HomeRecommend from "./childComps/HomeRecommend.vue";
import HomeFeature from "./childComps/HomeFeature.vue";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goodsList/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { imgLoadedListenerMixin, backTopMixin } from "common/mixin";

export default {
  name: "Home",
  data() {
    return {
      banners: null,
      recommends: null,
      currentType: "pop",

      tabControlOffsetTop: 0,
      isFixedTabControl: false,
      saveY: 0,
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
    };
  },
  mixins: [imgLoadedListenerMixin, backTopMixin],
  components: {
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
  },
  created() {
    //请求multidata数据，执行的是methods中的方法。有this的都是执行组件的方法。
    this.getHomeMultidata();
    //请求商品数据,把所有类型的第一页数据请求下来。
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {},
  destroyed() {},
  activated() {
    //活跃时，滚动到离开时的位置，并重新计算可滚动距离。
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
    //活跃时监听imgload
    this.$bus.$on("imgLoaded", this.imgLoadedCallback);
  },
  deactivated() {
    //记录离开的滚动距离
    this.saveY = this.$refs.scroll.getY();
    //离开时取消监听imgload
    this.$bus.$off("imgLoaded", this.imgLoadedCallback);
    this.$bus.$off("imgLoaded", this.imgLoadedCallback);
  },
  methods: {
    getHomeMultidata() {
      //发送请求，执行的是导入的函数。
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      //计算应该请求的页码，同时更新goods的页码。
      const page = ++this.goods[type].page;
      //发送请求，根据参数请求相应的数据并保存在goods里。执行的是导入的函数。
      //加载数据完成后，调用better-scroll的方法，以便于下一次加载
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.$refs.scroll.finishPullUp();
      });
    },
    //修改当前显示商品的类型
    changeCurrentType(index) {
      //根据子组件传过来的index更改currentType
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      //同步两个TabControl的选项。
      this.$refs.placeHolderTabControl.currentIndex = index;
      this.$refs.tabControl.currentIndex = index;
    },

    //监听滚动，得到滚动的位置
    wrapperScroll(position) {
      //修改backtop的显示与否
      this.isShowBackTop = Math.abs(position.y) > 1000;
      //修改tabcontrol是否fixed
      this.isFixedTabControl = Math.abs(position.y) > this.tabControlOffsetTop;
    },
    //加载更多数据
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    //监听轮播图加载完成,从而获取准确的offsetTop
    swiperImgLoaded() {
      //获取tabControl的offsetTop值
      this.tabControlOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
};
</script>

<style scoped>
#home {
  position: relative;
  height: 100vh;
}

.home-nav-bar {
  background-color: var(--color-high-text);
  color: #fff;
  font-size: 18px;
}

.wrapper {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}

.tcontrol {
  position: relative;
  z-index: 9;
}
</style>