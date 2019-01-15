<template>
    <div id="app">
        <header>医院病房管理系统</header>
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'App',
    mounted() {

        let designSize = 1920; // 设计图尺寸
        let html = document.documentElement;
        let wW = html.clientWidth;// 窗口宽度
        let rem = wW * 100 / designSize;
        document.documentElement.style.fontSize = rem + 'px';
    }
}
</script>

<style>
* {
    padding: 0;
    margin: 0;
}
#app {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 8rem;
    width: 12rem;
	border: 2px solid #409EFF;
}
header {
	user-select: none;
    font-size: 23px;
	letter-spacing: 4px;
    text-align: center;
    line-height: 0.6rem;
	color: white;
	background: rgb(98, 162, 226);
}
</style>
