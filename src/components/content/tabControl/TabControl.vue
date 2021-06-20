<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :key="index"
      class="tab-control-item"
      :class="{ active: index === currentIndex }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);
    },
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.tab-control {
  display: flex;
  justify-content: space-around;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  text-align: center;
  background: #fff;
}
.tab-control-item {
  flex: 1;
}

.active span {
  color: var(--color-high-text);
  padding: 5px;
  border-bottom: 3px solid var(--color-tint);
}
</style>