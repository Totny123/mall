<template>
  <div class="detail-comment-info" v-if="Object.keys(rate).length !== 0">
    <div class="header">
      <span class="header-left">用户评价</span>
      <span class="header-right"><a href="javascript:;">更多</a></span>
    </div>
    <div v-if="rate.user" class="user">
      <img :src="rate.user.avatar" alt="" class="user-img" />
      <span class="user-name">{{ rate.user.uname }}</span>
    </div>
    <p class="content">{{ rate.content }}</p>
    <div class="comment-info">
      <span>{{ rate.created | realTime }}</span>
      <span>{{ rate.style }}</span>
    </div>
    <div class="show">
      <img
        class="show-img"
        v-for="item in rate.images"
        :src="item"
        :key="item"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import { formatDate } from "common/utils";

export default {
  name: "DetailCommentInfo",
  props: {
    rate: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    realTime(value) {
      //将时间戳转成date对象，单位转成毫秒。*1000
      const date = new Date(value * 1000);
      //调用函数转成时间字符串
      return formatDate(date, "yyyy-MM-dd");
    },
  },
};
</script>

<style scoped>
.detail-comment-info {
  padding-bottom: 25px;
  border-bottom: 5px solid #f6f6f6;
}
.header {
  display: flex;
  justify-content: space-between;
  height: 50px;
  padding: 0 15px;
  line-height: 50px;
  border-bottom: 2px solid #f6f6f6;
  border-top: 5px solid #f6f6f6;
  font-size: 15px;
  color: black;
}
.user {
  height: 50px;
  line-height: 50px;
}
.user-img {
  width: 35px;
  height: 35px;
  margin: 0 10px;
  border-radius: 50%;
  vertical-align: middle;
}
.user-name {
  color: black;
  font-size: 16px;
}
.content {
  padding: 0 10px;
  margin-top: 8px;
  font-size: 15px;
}

.comment-info span {
  display: inline-block;
  margin: 10px;
  font-size: 13px;
  color: #908e8e;
}
.show {
  /* width: 80px;
  height: 80px; */
  display: flex;
  padding-left: 5px;
  margin-top: 5px;
}
.show-img {
  width: 80px;
  height: 80px;
}
</style>