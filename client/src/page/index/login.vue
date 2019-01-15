<template>
    <div id="loginBox">
        <div>
            <p class="text">用户名</p>
            <input
                type="text"
                v-model="username"
            >
        </div>

        <div>
            <p class="text">密码</p>
            <input
                type="password"
                v-model="password"
            >
        </div>

        <div>
            <p
                id="login"
                @click="login"
            >登录</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: "",
            password: ""
        }
    },
    methods: {
        login() {
            var username = this.username;
            var password = this.password;
            console.log(username, password)
            var data = {
                username,
                password
            }
            this.http.post('/login', data).then(res => {
                if(res.data.res.length){
                    sessionStorage.setItem('login',1)
                    this.$router.push('/index')
                }
            })

        }
    },
}
</script>

<style scoped>
#loginBox {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 21px;
}
#loginBox > div {
    padding: 0.3rem 0;
    position: relative;
}
.text {
    width: 0.9rem;
    text-align: right;
    color: rgb(98, 162, 226);
    display: inline-block;
    vertical-align: middle;
    padding-right: 0.3rem;
}
#login {
    margin: 0 auto;
    width: 30%;
    text-align: center;
    color: rgb(98, 162, 226);
    vertical-align: middle;
    color: white;
    background: rgb(245, 108, 108);
    border-radius: 10px;
    user-select: none;
}
#login:active {
    position: relative;
    top: 1px;
}
input {
    text-indent: 0.1rem;
    height: 0.26rem;
    border: 1px solid rgb(98, 162, 226);
}
</style>