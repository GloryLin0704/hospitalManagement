<template>
    <div id="box">
        <p class="title">科室管理</p>
        <detail
            v-if="detail_show"
            class="dialog"
            :detail="detail_data"
            @detailDialog="detail_close"
        ></detail>
        <add
            v-show="add_show"
            class="dialog"
            @add_close="add_close"
        ></add>
        <div class="search">
            <input
                type="text"
                class="searchInput"
                v-model="searchText"
            >

            <div class="right">
                <div
                    class="index-button"
                    style="background:rgb(103, 194, 58)"
                    @click="search"
                >查询</div>
            </div>

            <div class="right">
                <div
                    class="index-button"
                    @click="handleAdd"
                >新增</div>
            </div>

            <div class="total">
                <p>总计: {{total}}</p>
            </div>
        </div>
        <el-table :data="tableData">
            <el-table-column
                label="创建日期"
                width="180"
            >
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="科室"
                width="300"
            >
                <template slot-scope="scope">
                    <el-popover
                        trigger="hover"
                        placement="top"
                    >
                        <p>科地址: {{ scope.row.department_place }}</p>
                        <p>科电话: {{ scope.row.department_phone }}</p>
                        <div
                            slot="reference"
                            class="name-wrapper"
                        >
                            <el-tag size="medium">{{ scope.row.department_name }}</el-tag>
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
            searchText: "",
            detail_data: "",
            detail_show: false,
            add_show: false,
            tableData: [],
            total:"",
        }
    },
    methods: {
        handleEdit(index, row) {
            this.detail_data = this.tableData[index]
            this.detail_show = true;
        },
        handleDelete(index, row) {
            let department = this.tableData[index].department_name
            this.http.get(`/departments/delete?name=${department}`).then(res => {
                this.getAllData()
            }).catch(err => {
                console.log(err)
            })
        },
        search() {
            var name = this.searchText;
            if (name === "") {
                this.getAllData()
            } else {
                this.http.get(`/departments/one?name=${name}`).then(res => {
                    if (res.data.res.length) {
                        this.tableData = res.data.res
                    } else {
                        alert("没有这个科室")
                    }
                })
            }
        },
        handleAdd() {
            this.add_show = true;
        },
        detail_close(type) {
            this.detail_show = false;
            if (type) {
                this.getAllData()
            }
        },
        add_close() {
            this.add_show = false;
            this.getAllData()
        },
        getAllData() {
            this.http.get('/departments/all').then(res => {
                this.tableData = res.data.res;
                this.total = res.data.res.length
            })
        }
    },
    mounted() {
        document.getElementById("box").style.padding = '0 1.7rem';
        this.getAllData();
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
.right {
    display: inline-block;
    vertical-align: middle;
    position: relative;
    width: 8%;
    height: 100%;
}
.total {
    display: inline-block;
    vertical-align: middle;
    position: relative;
    width: 8%;
    top: -2%;
    color: white;
    background: rgb(98, 162, 226);
    padding: .02rem;
    font-size: 16px;
    user-select: none;
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
.search {
    font-size: 20px;
    text-align: center;
    height: 0.6rem;
}
.searchInput {
    height: 0.23rem;
    text-indent: 3px;
    border: 1px solid rgb(57, 156, 236);
    vertical-align: middle;
    display: inline-block;
}
</style>

