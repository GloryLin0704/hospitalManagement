<template>
    <div id="box">
        <div class="dialog">
            <div class="content">
                <div>
                    <span>科名</span>
                    <input
                        type="text"
                        v-model="name"
                        disabled
                    >
                </div>
                <div>
                    <span>科地址</span>
                    <input
                        type="text"
                        v-model="place"
                        disabled
                    >
                </div>
                <div>
                    <span>科电话</span>
                    <input
                        type="text"
                        v-model="phone"
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
            name: "",
            place: "",
            phone: "",
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
                let { name, place, phone } = this;
                let detail = {
                    name,
                    place,
                    phone,
                    oldName: this.detail.department_name
                }

                if (!name || !palce || !phone) {
                    alert("请填写所有信息")
                    return;
                }

                this.http.post('/departments/update', detail).then(res => {
                    alert('修改完成')
                    this.statue = true;
                    this.$emit("detailDialog", "1")
                }).catch(err => {
                    console.log(err)
                    alert("该科室已存在")
                    this.$emit("detailDialog")
                })
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
        this.name = this.detail.department_name
        this.place = this.detail.department_place
        this.phone = this.detail.department_phone
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