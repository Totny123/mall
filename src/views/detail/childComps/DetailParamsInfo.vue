<template>
  <div class="datail-params-info" v-if="Object.keys(paramsInfo).length !== 0">
    <table>
      <tr v-for="(arr, index) in paramsInfo.rule" :key="index" class="rule-tr">
        <td v-for="(item, index) in arr" :key="index * 2">{{ item }}</td>
      </tr>
    </table>
    <table>
      <tr v-for="(item, index) in paramsInfo.info" :key="index" class="info-tr">
        <td>{{ item.key }}</td>
        <td class="info-value">{{ item.value }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "DetailParamsInfo",
  props: {
    paramsInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.datail-params-info {
  width: 100%;
  font-size: 14px;
}
table {
  width: 100%;
}
.rule-tr {
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid #f0e9e9;
}
.rule-tr:last-child {
  border-bottom: 2px solid #e3e3e3;
}
.rule-tr td {
  padding: 10px;
}

.info-tr {
  display: flex;
  /* justify-content: space-between; */
  width: 100%;
  border-bottom: 1px solid #f0e9e9;
}
.info-tr:last-child {
  border-bottom: none;
}
.info-tr td {
  padding: 10px;
}
.info-value {
  margin-left: 70px;
  color: var(--color-high-text);
  font-weight: bold;
}
</style>