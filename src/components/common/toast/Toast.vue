<template>
  <div v-show="isShow" class="toast">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: "",
      isShow: false,
    };
  },
  methods: {
    show(message = "", duration = 1500) {
      this.message = message;
      this.isShow = true;
      setTimeout(() => {
        this.isShow = false;
      }, duration);
    },
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  transition: all 0.5s;
  background-color: rgba(0, 0, 0, 0.75);
  color: white;
  border-radius: 5px;
  z-index: 99;
  white-space: nowrap;
}
</style>