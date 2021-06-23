<template>
  <div class="detail-goods-info">
    <div class="top"></div>
    <div class="detail-info-desc">{{ detailInfo.desc }}</div>
    <div class="bottom"></div>
    <div v-if="detailInfo.detailImage" class="detail-info-key">
      {{ detailInfo.detailImage[0].key }}
    </div>
    <div v-if="detailInfo.detailImage">
      <img
        class="goods-img"
        @load="detailImgLoad"
        v-for="item in detailInfo.detailImage[0].list"
        :src="item"
        :key="item"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    detailImgLoad() {
      this.$emit("detailImgLoad");
    },
  },
};
</script>

<style scoped>
.detail-goods-info {
  margin-top: 10px;
}
.goods-img {
  width: 100%;
}
.detail-info-key {
  color: black;
  font-size: 18px;
  padding: 15px;
}
.top {
  position: relative;
  height: 2px;
  width: 30%;
  background-color: #e3e3e3;
  margin-left: 15px;
}
.top::before {
  position: absolute;
  top: 0;
  transform: translateY(-3px);
  content: "";
  display: block;
  width: 5px;
  height: 5px;
  background-color: black;
}
.bottom {
  position: relative;
  float: right;
  height: 2px;
  width: 30%;
  background-color: #e3e3e3;
  margin-right: 15px;
}
.bottom::before {
  position: absolute;
  top: 0;
  right: 0;
  transform: translateY(-3px);
  content: "";
  display: block;
  width: 5px;
  height: 5px;
  background-color: black;
}
.detail-info-desc {
  padding: 15px;
}
</style>