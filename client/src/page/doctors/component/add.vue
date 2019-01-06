<template>
    <div id="box">
        <div class="dialog">
            <div class="content">
                <div>
                    <span>工作证号</span>
                    <input
                        type="text"
                        v-model="id"
                    >
                </div>
                <div>
                    <span>姓名</span>
                    <input
                        type="text"
                        v-model="name"
                    >
                </div>
                <div>
                    <span>职称</span>
                    <input
                        type="text"
                        v-model="call"
                    >
                </div>
                <div>
                    <span>年龄</span>
                    <input
                        type="text"
                        v-model="age"
                    >
                </div>
                <div>
                    <span>所属科室</span>
                    <input
                        type="text"
                        v-model="department"
                    >
                </div>
                <div class="button">
                    <el-button
                        type="primary"
                        round
                        @click="change"
                    >{{leftButton}}</el-button>
                    <el-button
                        type="info"
                        round
                        @click="close"
                    >{{rightButton}}</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            labelPosition: 'left',
            id: "",
            name: "",
            call: "",
            age: "",
            department: "",
            leftButton: "添加",
            rightButton: "关闭",
            status: true
        };
    },
    methods: {
        change() {
            var department = this.department;
            var palce = this.palce;
            var phone = this.phone
            console.log(department, palce, phone)
        },
        close() {
            this.$emit("add_close")
        }
    },
    mounted() {
    },
}
</script>

<style scoped>
#box {
    height: 100%;
    width: 100%;
    background: rgba(201, 201, 201, 0.3);
}
.dialog {
    user-select: none;
    z-index: 999;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 5rem;
    color: white;
    border: 1px solid #eee;
    background: rgb(129, 194, 224);
}
.content {
    padding: 7%;
    font-size: 21px;
}
.content > div {
    text-align: center;
    padding: 10px 0;
}
.content > div > span {
    display: inline-block;
    width: 1.4rem;
    padding-right: 10px;
    text-align: right;
}
.content > div > input,
.content > div > span {
    vertical-align: middle;
}
.content > div > input {
    height: 0.35rem;
    line-height: 0.35rem;
    border-radius: 10px;
    outline: none;
    border: none;
    text-indent: 10px;
}
.button {
    margin-top: 20px;
}
</style>