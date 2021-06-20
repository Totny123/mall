<template>
  <div class="goods-list-item">
    <img :src="goodsItem.show.img" alt="" />
    <div class="goods-list-item-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.goods-list-item img {
  width: 100%;
  border-radius: 7px;
}

.goods-list-item-info {
  text-align: center;
}

.goods-list-item-info p {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  margin: 3px 0;
}

.price {
  font-size: 14px;
  color: var(--color-high-text);
}

.collect {
  font-size: 14px;
  padding: 0 5px;
}

.collect::before {
  content: "";
  display: inline-block;
  background: url("~assets/img/common/collect.svg") no-repeat 0px 1px;
  background-size: 100%;
  width: 14px;
  height: 14px;
  vertical-align: top;
}
</style>