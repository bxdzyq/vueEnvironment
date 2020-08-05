<template>
  <div id="app">
    <!-- 占位，，后面router-link t跳到那个页面，就会把该页面渲染到router-view 所在的地方 -->
    <router-view></router-view>
  </div>
</template>
<script type="text/javascript">
  
</script>
<style type="text/css">

body{
  height: 100%;
  width: 100%;
  /*布局属性  绝对布局界面内外边距 */
  margin:0;
  padding: 0;

}
#app{
  height: 100%;
  width: 100%;
  /*布局属性  绝对布局 如果父级元素  有position:absolute; position:relative; */
  position: absolute;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>