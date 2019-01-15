<template>
    <div id="box">
        <div class="dialog">
            <div class="content">
                <div>
                    <span>科名</span>
                    <input
                        type="text"
                        v-model="department"
                    >
                </div>
                <div>
                    <span>科地址</span>
                    <input
                        type="text"
                        v-model="place"
                    >
                </div>
                <div>
                    <span>科电话</span>
                    <input
                        type="text"
                        v-model="phone"
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
            department: "",
            place: "",
            phone: "",
            leftButton: "添加",
            rightButton: "关闭",
        };
    },
    methods: {
        change() {
            var name = this.department;
            var place = this.place;
            var phone = this.phone
            console.log(name, place, phone)
            var data = {
                name,
                place,
                phone
            }

            if (!name || !palce || !phone) {
                alert("请填写所有信息")
                return;
            }

            this.http.post(`/departments/create`, data).then(res => {
                alert("添加成功")
                this.$emit("add_close")
            }).catch(err => {
                alert("已存在该科室")
                this.$emit("add_close")
            })
        },
        close() {
            this.$emit("add_close")
        }
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
    width: 1rem;
    text-align: left;
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