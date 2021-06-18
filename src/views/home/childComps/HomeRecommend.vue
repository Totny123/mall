<template>
  <div id="home-recommend">
    <div
      class="home-recommend-item"
      v-for="item in recommends"
      :key="item.image"
    >
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommend",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
#home-recommend {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 14px;
  padding: 10px 0 20px;
  border-bottom: 10px solid #f6f6f6;
}

.home-recommend-item {
  flex: 1;
}

.home-recommend-item img {
  width: 80%;
  margin-bottom: 8px;
}
</style>