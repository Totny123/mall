<template>
  <div class="cart-list-item">
    <div class="check-btn">
      <check-btn
        :isChecked="product.checked"
        @click.native="changeCheck"
      ></check-btn>
    </div>
    <div class="img-div">
      <img class="cart-img" :src="product.image" alt="" />
    </div>
    <div class="text-div">
      <div class="title">{{ product.title }}</div>
      <div class="desc">{{ product.desc }}</div>
      <div class="bottom-div">
        <span class="real-price">{{ product.realPrice | priceFormat }}</span>
        <span class="count">x{{ product.count }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import CheckBtn from "components/content/checkBtn/CheckBtn";

export default {
  name: "CartListItem",
  components: {
    CheckBtn,
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    priceFormat(price) {
      return "￥" + price;
    },
  },
  methods: {
    changeCheck() {
      this.product.checked = !this.product.checked;
    },
  },
};
</script>

<style scoped>
.cart-list-item {
  display: flex;
  width: 100%;
  padding: 5px;
  border-bottom: 1px solid #aaa;
}
.check-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 2px;
}
.img-div {
  width: 20%;
}
.cart-img {
  width: 100%;
  border-radius: 5px;
}
.text-div {
  position: relative;
  width: 80%;
  padding: 0 10px;
}
.title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: black;
}
.desc {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  margin: 10px 0;
}
.bottom-div {
  position: absolute;
  bottom: 5px;
  width: 90%;
}
.real-price {
  font-size: 17px;
  color: orangered;
}
.count {
  float: right;
  font-size: 17px;
}
</style>