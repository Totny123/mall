<template>
  <div class="check-btn">
    <img
      class="default"
      :class="{ checked: isChecked }"
      src="~assets/img/cart/tick.svg"
      alt=""
    />
  </div>
</template>

<script>
export default {
  name: "CheckBtn",
  props: {
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.default {
  border-radius: 50%;
  border: 1px solid #ccc;
}
.checked {
  background-color: var(--color-high-text);
  border-color: transparent;
}
</style>