<template>
  <div class="cart-bottom-bar">
    <div class="check-div">
      <check-btn
        class="check-btn"
        @click.native="checkClick"
        :isChecked="isAllSelected"
      ></check-btn>
      <span>全选</span>
    </div>
    <div>
      <span>合计：</span>
      <span class="totalPrice">{{ totalPrice }}</span>
    </div>
    <div class="calc" @click="calcClick">去结算({{ productLength }})</div>
  </div>
</template>

<script>
import CheckBtn from "components/content/checkBtn/CheckBtn";

import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  data() {
    return {};
  },
  components: {
    CheckBtn,
  },
  computed: {
    ...mapGetters(["cartList"]),
    productLength() {
      return this.cartList.filter((item) => item.checked).length;
    },
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter((item) => item.checked)
          .reduce((pre, item) => pre + item.realPrice * item.count, 0)
          .toFixed(2)
      );
    },
    isAllSelected() {
      if (this.cartList.length == 0) return false;
      return !this.cartList.some((item) => !item.checked);
    },
  },
  methods: {
    checkClick() {
      if (this.isAllSelected == true) {
        this.cartList.map((item) => (item.checked = false));
      } else {
        this.cartList.map((item) => (item.checked = true));
      }
    },
    calcClick() {
      if (!this.isAllSelected) {
        this.$toast.show("请选择需要结算的商品！");
      }
    },
  },
};
</script>

<style scoped>
.cart-bottom-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  background-color: #eee;
}
.check-div {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-left: 10px;
}

.check-btn {
  margin-right: 5px;
}

.calc {
  width: 100px;
  height: 100%;
  text-align: center;
  line-height: 44px;
  color: #fff;
  background-color: #f04d00;
}

.totalPrice {
  margin-left: -10px;
}
</style>