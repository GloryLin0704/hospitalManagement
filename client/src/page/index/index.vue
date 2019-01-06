<template>
    <div id="box">
        <router-link :to="'departments'">科室管理</router-link>
        <router-link :to="'doctors'">医生管理</router-link>
        <router-link :to="'wards'">病房管理</router-link>
        <router-link :to="'patients'">病人管理</router-link>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    methods: {
    },
}
</script>

<style scoped>
a{
    display: block;
    background: rgb(98, 162, 226);
    color: white;
    margin: .9rem auto;
    padding: .14rem .25rem;
    width: 2rem;
    border-radius: 25px;
    text-align: center;
    font-size: 20px;
    text-decoration: none;
}
</style>