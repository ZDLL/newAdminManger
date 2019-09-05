<template>
  <div class="crumb">
    <span>当前位置</span>
    <h2 class="weizhi-h2">{{placeText}}</h2>
  </div>
</template>
<script>
export default {
  name: "weizhi",
  props: ["placeText"],
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {},
  filters: {}
};
</script>
<style lang="scss">
.crumb {
  font-size: 14px;
  color: #9b9b9b;
  margin-bottom: 30px;
  margin-top: 10px;
  .weizhi-h2 {
    display: inline-block;
    vertical-align: top;
    font-weight: 600;
    color: #000;
    font-size: 18px;
    margin-left: 15px;
    margin-top: -4px;
  }
}
</style>

