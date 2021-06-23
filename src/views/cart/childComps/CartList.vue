<template>
  <div class="cart-list">
    <scroll class="cart-list-scroll" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :product="item"
      ></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import CartListItem from "./CartListItem";

import scroll from "components/common/scroll/Scroll";

import { mapGetters } from "vuex";

export default {
  name: "CartList",
  computed: {
    ...mapGetters(["cartList"]),
  },
  components: {
    CartListItem,
    scroll,
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.cart-list-scroll {
  height: calc(100vh - 44px - 49px - 40px);
  overflow: hidden;
}
</style>