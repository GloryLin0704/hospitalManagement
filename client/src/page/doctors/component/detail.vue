<template>
    <div id="box">
        <div class="dialog">
            <div class="content">
                <div>
                    <span>工作证号</span>
                    <input
                        type="text"
                        v-model="id"
                        disabled
                    >
                </div>
                <div>
                    <span>姓名</span>
                    <input
                        type="text"
                        v-model="name"
                        disabled
                    >
                </div>
                <div>
                    <span>职称</span>
                    <input
                        type="text"
                        v-model="call"
                        disabled
                    >
                </div>
                <div>
                    <span>年龄</span>
                    <input
                        type="text"
                        v-model="age"
                        disabled
                    >
                </div>
                <div>
                    <span>所属科室</span>
                    <input
                        type="text"
                        v-model="department"
                        disabled
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
    props: [
        'detail'
    ],
    data() {
        return {
            labelPosition: 'left',
            id: "123",
            name: "123",
            call: "123",
            age: "123",
            department: "123",
            leftButton: "修改",
            rightButton: "关闭",
            status: true
        };
    },
    methods: {
        change() {
            if (this.status) {
                var oDOM = document.getElementsByTagName('input')
                Array.from(oDOM).forEach(e => {
                    e.disabled = "";
                })
                this.leftButton = "确定"
                this.rightButton = "取消"
                this.status = false
            } else {
            }
        },
        close() {
            if (!this.status) {
                var oDOM = document.getElementsByTagName('input')
                Array.from(oDOM).forEach(e => {
                    e.disabled = "disabled";
                })
                this.leftButton = "修改";
                this.rightButton = "关闭";
                this.status = true;
            }
            this.$emit("detailDialog")
        }
    },
    mounted() {
        console.log(this.detail)
        this.department = this.detail.address
        this.palce = this.detail.date
        this.phone = this.detail.name
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