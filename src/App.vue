<template>
  <div id="app">
      <router-view />
  </div>
</template>
<script>
export default {
  
}
</script>

<style lang="scss">
@import "./style/common.scss";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  .el-table thead {
    th {
      font-weight: 800;
      color: #666;
      text-align: center;
    }
  }
  .el-table--enable-row-transition .el-table__body td {
    text-align: center;
  }
  .el-table--border {
    border: none;
  }
  .el-divider__text {
    font-size: 16px
  }
  .el-image{
    img{
      width: auto;
      max-height: 100px;
    }
  }
  .el-button-group .el-button--primary:last-child{
    border-left-color:#b3d8ff;
  }
  .el-divider--horizontal{
    margin-bottom: 40px;
    margin-top: 35px;
  }
  .my-span-notice{
    color: red;
    margin-right: 5px;
    position: relative;
    top: 2px;
  }
  .emoji{
    width: 15px;
    height: 15px;
    margin: 1px
  }
  .mt20{
    margin-top: 20px;
  }
  .ml20{
    margin-left: 20px;
  }
  .mr20{
    margin-right: 20px;
  }
  .mb20{
    margin-bottom: 20px;
  }
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }
  .dis_inl_blo{
    display: inline-block;
    vertical-align: top;
  }
  .el-menu-item-group__title{
    padding: 0px;
  }
}
</style>
