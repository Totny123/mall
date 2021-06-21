<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :topImages="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";

import { getDetail, Goods, Shop } from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: null,
      goods: {},
      shop: {},
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
  },
  created() {
    //保存传进来的iid
    this.iid = this.$route.params.iid;
    //获取详情数据。
    this.getDetail(this.iid);
  },
  methods: {
    getDetail(iid) {
      getDetail(iid).then((res) => {
        const data = res.result;
        //提取轮播图数据。
        this.topImages = data.itemInfo.topImages;
        //创建商品数据对象，提取有关数据。
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        //创建店铺数据对象，提取有关数据。
        this.shop = new Shop(data.shopInfo);
      });
    },
  },
};
</script>

<style scoped>
</style>