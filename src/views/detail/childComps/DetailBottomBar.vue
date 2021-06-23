<template>
  <div class="detail-bottom-bar">
    <div class="customer-service">
      <div></div>
      <span>客服</span>
    </div>
    <div class="store">
      <div></div>
      <span>店铺</span>
    </div>
    <div class="collect">
      <div class="no"></div>
      <div class="yes"></div>
      <span>收藏</span>
    </div>
    <div class="add-cart" @click="addCart">加入购物车</div>
    <div class="buy">购买</div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods:{
    addCart(){
      this.$emit('addCart')
    }
  }
};
</script>

<style scoped>
.detail-bottom-bar {
  position: relative;
  display: flex;
  height: 49px;
  background-color: #fff;
  z-index: 99;
  text-align: center;
}

.customer-service,
.store,
.collect {
  position: relative;
  flex: 2;
}
.customer-service span,
.store span,
.collect span {
  display: block;
  width: 100%;
  position: absolute;
  bottom: 2px;
  font-size: 15px;
}
.add-cart {
  flex: 3;
  background-color: #ffdd0c;
  line-height: 49px;
}
.buy {
  flex: 3;
  line-height: 49px;
  background-color: var(--color-high-text);
  color: #fff;
}

.customer-service div {
  margin: 5px auto;
  width: 22px;
  height: 21px;
  background: url("~assets/img/detail/detail_bottom.png") no-repeat 0 -53px;
  background-size: 100% auto;
}

.store div {
  margin: 5px auto;
  width: 21px;
  height: 18px;
  background: url("~assets/img/detail/detail_bottom.png") no-repeat 0 -95px;
  background-size: 100% auto;
}

.collect .no {
  /* display: none; */
  margin: 5px auto;
  width: 20px;
  height: 19px;
  background: url("~assets/img/detail/detail_bottom.png") no-repeat 1px -1px;
  background-size: 100% auto;
}
.collect .yes {
  display: none;
  margin: 5px auto;
  width: 21px;
  height: 21px;
  background: url("~assets/img/detail/detail_bottom.png") no-repeat 0 -27px;
  background-size: 100% auto;
}
</style>