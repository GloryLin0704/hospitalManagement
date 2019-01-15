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
                        v-model="phone"
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
            id: "",
            name: "",
            call: "",
            phone: "",
            department: "",
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
                let { id, name, call, phone, department } = this;

                let detail = {
                    id,
                    name,
                    call,
                    phone,
                    department,
                    oldid: this.detail.doctor_id
                }

                if (window.isNaN(parseInt(id))) {
                    alert("请正确输入证件号")
                    return;
                } else if (window.isNaN(parseInt(phone))) {
                    alert("请正确输入医生电话")
                    return;
                } else if (!department || !call || !name) {
                    alert("请填写所有信息")
                    return;
                }

                this.http.post('/doctors/update', detail).then(res => {
                    console.log(res)
                    alert('修改完成')
                    this.statue = true;
                    this.$emit("detailDialog", "1")
                }).catch(err => {
                    console.log(err)
                    alert("该工作证号已存在或该科室不存在")
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
        this.id = this.detail.doctor_id
        this.call = this.detail.doctor_call
        this.phone = this.detail.doctor_phone
        this.name = this.detail.doctor_name
        this.department = this.detail.doctor_department

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