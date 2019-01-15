<template>
    <div id="box">
        <div class="dialog">
            <div class="content">
                <div>
                    <span>病房号</span>
                    <input
                        type="text"
                        v-model="id"
                    >
                </div>
                <div>
                    <span>空闲床位</span>
                    <input
                        type="text"
                        v-model="free_num"
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
            free_num: "",
            department: "",
            leftButton: "添加",
            rightButton: "关闭",
        };
    },
    methods: {
        change() {
            var id = this.id;
            var freeNum = this.free_num;
            var department = this.department;

            if (window.isNaN(parseInt(id))) {
                alert("请正确输入病房号")
                return;
            } else if (window.isNaN(parseInt(freeNum))) {
                alert("请正确输入空闲病房数")
                return;
            } else if (!department) {
                alert("请正确输入所属科室")
                return;
            }
            
            var data = { id, freeNum, department }
            this.http.post(`/wards/create`, data).then(res => {
                alert("添加成功")
                this.$emit("add_close")
            }).catch(err => {
                alert("该病房已存在或该科室不存在")
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