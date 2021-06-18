<template>
  <div id="home">
    <nav-bar class="home-nav-bar"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend :recommends="recommends"></home-recommend>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper.vue";
import HomeRecommend from "./childComps/HomeRecommend.vue";

import { getHomeMultidata } from "network/home";

export default {
  name: "Home",
  data() {
    return {
      banners: null,
      recommends: null,
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
  },
  created() {
    getHomeMultidata().then((res) => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
  },
};
</script>

<style scoped>
.home-nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 18px;
}
</style>