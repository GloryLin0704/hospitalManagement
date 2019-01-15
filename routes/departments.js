const router = require("koa-router")();
const db = require("../db");
let res, message;

router.get("/all", async ctx => {
    let selectSQL = `SELECT * from departments`;
    try {
        res = await db(selectSQL);
        message = "查询完毕";
    } catch (error) {
        res = err;
        message = "查询失败";
    }

    return (ctx.body = {
        res,
        message
    });
});

router.get("/one", async ctx => {
    let { name } = ctx.request.query;
    let selectSQL = `SELECT * FROM departments WHERE department_name='${name}'`;
    try {
        res = await db(selectSQL);
        message = "查询完毕";
    } catch (error) {
        res = err;
        message = "查询失败";
    }

    return (ctx.body = {
        res,
        message
    });
});

router.post("/create", async ctx => {
    let { name, place, phone } = ctx.request.body;
    let time = new Date().toJSON().substring(0, 10);

    let selectSQL = `SELECT * from departments where department_name='${name}'`;
    let ifEXIST;
    try {
        ifEXIST = await db(selectSQL);
    } catch (err) {
        res = err;
        message = "操作失败";
    }

    if (ifEXIST.length) {
        throw new Error("already exist");
    } else {
        let addSQL =
            "INSERT INTO departments(department_name, department_place, department_phone,create_time) VALUE (?,?,?,?)";
        let addParams = [name, place, phone, time];
        try {
            res = await db(addSQL, addParams);
            message = "添加科室完成";
        } catch (err) {
            res = err;
            message = "添加科室失败";
        }
    }

    return (ctx.body = {
        res,
        message
    });
});

router.post("/update", async ctx => {
    let { name, place, phone, oldName } = ctx.request.body;
    let updateSQL =
        "UPDATE departments set department_name=?, department_place=?, department_phone=? where department_name=?";
    let updataParams = [name, place, phone, oldName];

    try {
        res = await db(updateSQL, updataParams);
        message = "更新数据完成";
    } catch (error) {
        res = error;
        message = "更新失败";
        throw new Error("lost");
    }

    return (ctx.body = {
        res,
        message
    });
});

router.get("/delete", async ctx => {
    let { name } = ctx.request.query;

    let delSQL = `DELETE FROM departments where department_name='${name}'`;

    try {
        res = await db(delSQL);
        message = "删除完成";
    } catch (error) {
        res = error;
        message = "删除失败";
    }
    return (ctx.body = {
        res,
        message
    });
});

module.exports = router;
