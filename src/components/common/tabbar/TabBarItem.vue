<template>
  <div>
    <div class="tab-bar-item" @click="itemClick">
      <div v-if="!isActive"><slot name="item-icon"></slot></div>
      <div v-else><slot name="item-icon-active"></slot></div>
      <div :style="activeStyle"><slot name="item-text"></slot></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  data() {
    return {};
  },
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "#ff5777",
    },
  },
  methods: {
    itemClick() {
      this.$router.push(this.path);
    },
  },
  computed: {
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
  },
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin: 3px 0;
  vertical-align: middle;
}
</style>