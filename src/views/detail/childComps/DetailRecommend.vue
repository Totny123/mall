<template>
  <div v-if="Object.keys(recommend).length !== 0">
    <goods-list :goods="recommend"></goods-list>
  </div>
</template>

<script>
import GoodsList from "components/content/goodsList/GoodsList";
export default {
  name: "DetailRecommend",
  props: {
    recommend: {
      type: Array,
      default() {
        return {};
      },
    },
  },
  components: {
    GoodsList,
  },
};
</script>

<style scoped>
</style>