<template>
    <div id="box">
        <div class="dialog">
            <div class="content">
                <div>
                    <span>病历号</span>
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
                    <span>性别</span>
                    <input
                        type="text"
                        v-model="sex"
                        disabled
                    >
                </div>
                <div>
                    <span>主管医生</span>
                    <input
                        type="text"
                        v-model="doctor"
                        disabled
                    >
                </div>
                <div>
                    <span>病房号</span>
                    <input
                        type="text"
                        v-model="ward_id"
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
            sex: "",
            doctor: "",
            ward_id: "",
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
                let { id, name, sex, doctor, ward_id } = this;

                let detail = {
                    id,
                    name,
                    sex,
                    doctor,
                    ward: ward_id,
                    oldid: this.detail.patient_id
                }
                if (window.isNaN(parseInt(id))) {
                    alert("请正确输入病历号")
                    return;

                } else if (window.isNaN(parseInt(doctor))) {
                    alert("请正确输入主管医生")
                    return;
                } else if (window.isNaN(parseInt(ward_id))) {
                    alert("请正确输入病房号")
                    return;
                } else if (!name || !sex) {
                    alert("请填写所有信息")
                    return;
                }

                this.http.post('/patients/update', detail).then(res => {
                    console.log(res)
                    alert('修改完成')
                    this.statue = true;
                    this.$emit("detailDialog", "1")
                }).catch(err => {
                    console.log(err)
                    alert("该病历号已存在或其他信息不存在")
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
        console.log(this.detail)
        this.id = this.detail.patient_id
        this.name = this.detail.patient_name
        this.sex = this.detail.patient_sex
        this.doctor = this.detail.patient_doctor
        this.ward_id = this.detail.patient_ward
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