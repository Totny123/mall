<template>
  <div class="goods-list">
    <goods-list-item
      class="goods-list-item"
      v-for="(item, index) in goods"
      :key="index"
      :goodsItem="item"
    ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem.vue";
export default {
  name: "GoodsList",
  components: {
    GoodsListItem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.goods-list-item {
  width: 48%;
  margin: 2px 0;
}
</style>