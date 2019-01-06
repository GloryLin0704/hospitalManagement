<template>
    <div id="box">
        <p class="title">病房管理</p>
        <detail
            v-if="detail_show"
            :detail="detail_data"
            class="dialog"
            @detailDialog="detail_close"
        ></detail>
        <add
            v-if="add_show"
            class="dialog"
            @add_close="add_close"
        ></add>
        <el-table
            :data="tableData"
            class="left"
        >
            <el-table-column
                label="创建日期"
                width="180"
            >
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="病房号"
                width="180"
            >
                <template slot-scope="scope">
                    <el-popover
                        trigger="hover"
                        placement="top"
                    >
                        <p>所属科室: {{ scope.row.address }}</p>
                        <div
                            slot="reference"
                            class="name-wrapper"
                        >
                            <el-tag size="medium">{{ scope.row.name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
                    >详情</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="right">
            <div class="index-button" @click="handleAdd">新增</div>
        </div>
    </div>
</template>

<script>
import Detail from './component/detail'
import Add from './component/add'

const components = {
    "detail": Detail,
    "add": Add
}
export default {
    components,
    data() {
        return {
            detail_data: "",
            detail_show: false,
            add_show: false,
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },
    methods: {
        handleEdit(index, row) {
            this.detail_show = true;
        },
        handleDelete(index, row) {
            this.tableData.pop();
        },
        handleAdd() {
            this.add_show = true;
        },
        detail_close() {
            this.detail_show = false;
        },
        add_close() {
            this.add_show = false;
        }
    },
    mounted() {
        // document.getElementById("box").style.width = '8rem';
        document.getElementById("box").style.padding = '0 1.7rem';
    }
}
</script>

<style>
.title {
    user-select: none;
    color: rgb(98, 162, 226);
    padding: 20px 0;
    font-size: 28px;
    text-align: center;
}
.el-table th {
    text-align: center;
}
.cell {
    text-align: center;
    user-select: none;
}
.el-table_1_column_3 {
    width: 30%;
}
.left,
.right {
    display: inline-block;
    vertical-align: top;
}
.left {
    width: 88%;
}
.right {
    position: relative;
    width: 8%;
    height: 80px;
}
.index-button {
    user-select: none;
    background: rgb(245, 108, 108);
    border-radius: 10px;
    text-align: center;
    padding: 3px;
    color: white;
    font-size: 14px;
    position: relative;
    top: 0.13rem;
}
.index-button:active {
    position: relative;
    top: 0.14rem;
}
</style>

