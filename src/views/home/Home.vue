<template>
  <div id="home">
    <nav-bar class="home-nav-bar"><div slot="center">购物街</div></nav-bar>
    <scroll
      class="wrapper"
      ref="scroll"
      @scroll="wrapperScroll"
      :pullUpLoad="true"
      @pullingUp="loadMore"
      :probe-type="3"
    >
      <home-swiper :banners="banners"></home-swiper>
      <home-recommend :recommends="recommends"></home-recommend>
      <home-feature></home-feature>
      <tab-control
        class="tab-control"
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
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  data() {
    return {
      banners: null,
      recommends: null,
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
    };
  },
  components: {
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  created() {
    //请求multidata数据，执行的是methods中的方法。有this的都是执行组件的方法。
    this.getHomeMultidata();
    //请求商品数据,把所有类型的第一页数据请求下来。
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
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
    },
    //返回顶部。操作子组件，调用子组件的方法。
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 800);
    },
    //监听滚动，得到滚动的位置
    wrapperScroll(position) {
      this.isShowBackTop = Math.abs(position.y) > 1000;
    },
    //加载更多数据
    loadMore() {
      this.getHomeGoods(this.currentType);
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
  /* padding-top: 44px; */
  height: 100vh;
}

.home-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
  background-color: var(--color-tint);
  color: #fff;
  font-size: 18px;
}

/* .tab-control {
  position: sticky;
  top: 44px;
} */

.wrapper {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  /* margin-top: 44px;
  height: calc(100% - 93px); */
  overflow: hidden;
}
</style>