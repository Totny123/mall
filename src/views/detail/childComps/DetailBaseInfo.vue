<template>
  <div class="detail-base-info" v-if="goods">
    <div class="title">{{ goods.title }}</div>
    <div class="price-info">
      <span class="price">{{ goods.price }}</span>
      <span class="old-price">{{ goods.oldPrice }}</span>
      <span
        class="discountDesc"
        v-if="goods.discountDesc"
        :style="discountBgColorStyle"
        >{{ goods.discountDesc }}</span
      >
    </div>
    <div class="columns">
      <span
        class="columns-item"
        v-for="(item, index) in goods.columns"
        :key="index"
      >
        {{ item }}
      </span>
    </div>
    <div class="services">
      <div
        class="services-item"
        v-for="(item, index) in goods.services"
        :key="index"
      >
        <span><img :src="item.icon" alt="" class="services-item-icon" /></span>
        <span class="services-item-name">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  data() {
    return {};
  },
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    discountBgColorStyle() {
      return { backgroundColor: this.goods.discountBgColor };
    },
  },
};
</script>

<style scoped>
.detail-base-info {
  padding: 0 5px 20px;
  border-bottom: 7px solid #f6f6f6;
}
.title {
  margin: 10px 0 12px;
  color: black;
  font-size: 15px;
}
.price-info {
  margin-bottom: 18px;
}
.price {
  font-size: 20px;
  color: var(--color-high-text);
}
.old-price {
  font-size: 14px;
  text-decoration: line-through;
  margin: 0 3px;
}
.discountDesc {
  position: relative;
  left: 2px;
  top: -6px;
  padding: 2px;
  color: #fff;
  font-size: 13px;
  border-radius: 8px;
}
.columns {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #a1a1a1;
  padding-bottom: 6px;
  border-bottom: 1px solid #f3f3f3;
}
.services {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.services-item-icon {
  width: 14px;
  height: 14px;
  vertical-align: middle;
}
.services-item-name {
  font-size: 14px;
}
</style>