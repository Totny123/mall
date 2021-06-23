<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav-bar"
      @titleClick="titleClick"
      ref="detailNavBar"
    ></detail-nav-bar>
    <scroll class="wrapper" ref="scroll" :probeType="3" @scroll="scroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detailInfo="detailInfo"
        @detailImgLoad="detailImgLoad"
      ></detail-goods-info>
      <detail-params-info
        :paramsInfo="paramsInfo"
        ref="params"
      ></detail-params-info>
      <detail-comment-info :rate="rate" ref="rate"></detail-comment-info>
      <detail-recommend
        :recommend="recommend"
        ref="recommend"
      ></detail-recommend>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamsInfo from "./childComps/DetailParamsInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailRecommend from "./childComps/DetailRecommend";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";

import { debounce } from "common/utils";
import { imgLoadedListenerMixin, backTopMixin } from "common/mixin";

import { mapActions } from "vuex";

import {
  getDetail,
  Goods,
  Shop,
  ParamsInfo,
  getRecommend,
} from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: null,
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      rate: {},
      recommend: [],
      offsetTopArr: [],
      getOffsetTopArr: null,
    };
  },
  mixins: [imgLoadedListenerMixin, backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    DetailRecommend,
    DetailBottomBar,
    Scroll,
  },
  created() {
    //保存传进来的iid
    this.iid = this.$route.params.iid;
    //获取详情数据。
    this.getDetail(this.iid);
    //获取推荐数据
    this.getRecommend();
    //防抖包装获取offsetTop
    this.getOffsetTopArr = debounce(() => {
      this.offsetTopArr = [];
      this.offsetTopArr.push(0);
      this.offsetTopArr.push(this.$refs.params.$el.offsetTop);
      this.offsetTopArr.push(this.$refs.rate.$el.offsetTop);
      this.offsetTopArr.push(this.$refs.recommend.$el.offsetTop);
      //添加一个范围，以便于滚动的时候联动标题不会下标溢出。
      this.offsetTopArr.push(Number.MAX_VALUE);
    }, 100);
  },
  mounted() {},
  updated() {},
  destroyed() {
    this.$bus.$off("imgLoaded", this.imgLoadedCallback);
  },
  methods: {
    ...mapActions({ add: "addCart" }),
    getDetail(iid) {
      getDetail(iid).then((res) => {
        const data = res.result;
        // console.log(data);
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
        //保存商品详情信息
        this.detailInfo = data.detailInfo;
        //获取参数信息
        this.paramsInfo = new ParamsInfo(
          data.itemParams.info,
          data.itemParams.rule
        );
        //获取评论信息
        if (data.rate.cRate !== 0) {
          this.rate = data.rate.list[0];
        }
      });
    },
    getRecommend() {
      getRecommend().then((res) => {
        this.recommend = res.data.list;
      });
    },
    detailImgLoad() {
      //刷新可滚动距离
      this.newRefresh();
      //计算offsetTop
      this.getOffsetTopArr();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.offsetTopArr[index], 300);
    },
    scroll(position) {
      //返回顶部按钮的显示与否
      this.isShowBackTop = Math.abs(position.y) > 1000;
      //获取滚动的y值
      const y = Math.abs(position.y);
      //获取数组的长度
      const length = this.offsetTopArr.length;
      //获取导航的currentIndex
      const currentIndex = this.$refs.detailNavBar.currentIndex;
      //遍历offsetTop。提取范围，判断范围
      //不能使用for of，因为获取不到index。
      for (let i = 0; i < length - 1; i++) {
        i = parseInt(i);
        if (
          currentIndex !== i &&
          y >= this.offsetTopArr[i] &&
          y < this.offsetTopArr[i + 1]
        ) {
          this.$refs.detailNavBar.currentIndex = i;
        }
      }
    },
    //添加到购物车
    addCart() {
      const product = {};
      product.iid = this.iid;
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.realPrice = this.goods.realPrice;
      this.add(product).then((res) => {
        this.$toast.show(res, 2000);
      });
    },
  },
};
</script>

<style scoped>
#detail {
  height: 100vh;
}
.detail-nav-bar {
  position: relative;
  z-index: 10;
  background-color: #fff;
}
.wrapper {
  position: relative;
  height: calc(100% - 44px - 49px);
  z-index: 9;
  background-color: #fff;
  overflow: hidden;
}
</style>