<template>
  <div class="detail-shop-info">
    <div class="title">
      <img :src="shop.shopLogo" alt="" /> <span>{{ shop.name }}</span>
    </div>
    <div class="left">
      <div class="cSells">
        <div class="num">{{ cSells }}</div>
        <div class="text">总销量</div>
      </div>
      <div class="cGoods">
        <div class="num">{{ shop.cGoods }}</div>
        <div class="text">全部宝贝</div>
      </div>
    </div>
    <div class="right">
      <div v-for="(item, index) in shop.score" :key="index">
        <span class="name">{{ item.name }}</span>
        <span
          class="score-default-color"
          :class="{ 'score-bad-color': item.isBetter }"
          >{{ item.score }}</span
        >
        <span class="score-title">
          <span
            v-if="item.isBetter"
            class="score-default-bg-color"
            :class="{ 'score-bad-bg-color': item.isBetter }"
            >高</span
          >
          <span
            v-else
            class="score-default-bg-color"
            :class="{ 'score-bad-bg-color': item.isBetter }"
            >低</span
          >
        </span>
      </div>
    </div>
    <div class="bottom-text">进店逛逛</div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    cSells() {
      return (this.shop.cSells / 10000).toFixed(1) + "万";
    },
  },
};
</script>

<style scoped>
.detail-shop-info {
  padding: 0 15px;
  position: relative;
  height: 220px;
  border-bottom: 5px solid #f6f6f6;
}
.title {
  margin: 30px 0;
}
.title img {
  width: 50px;
  height: 50px;
  border: 1px solid #e3e3e3;
  border-radius: 50%;
  vertical-align: middle;
}

.left {
  position: relative;
  display: flex;
  width: 45%;
  justify-content: space-between;
  text-align: center;
  border-right: 1px solid #e3e3e3;
  padding-right: 20px;
}
.cSells {
  padding-left: 20px;
}
.num {
  margin-bottom: 7px;
  font-size: 18px;
}
.text {
  font-size: 12px;
}
.right {
  width: 45%;
  font-size: 14px;
  margin-top: -18px;
  line-height: 25px;
  margin-right: 5px;
}
.name {
  padding-right: 12px;
}
.score-title {
  float: right;
  margin-right: 30px;
}
.score-default-bg-color {
  background-color: green;
  color: white;
}
.score-bad-bg-color {
  background-color: red;
}
.score-default-color {
  color: green;
}
.score-bad-color {
  color: red;
}
.bottom-text {
  position: absolute;
  width: 130px;
  height: 30px;
  line-height: 30px;
  bottom: 30px;
  left: 50%;
  text-align: center;
  transform: translate(-50%);
  border: 1px solid #e3e3e3;
  border-radius: 10px;
  background: #e3e3e3;
}
</style>