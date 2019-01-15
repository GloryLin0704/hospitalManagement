const router = require("koa-router")();
const db = require("../db");
let res, message;

router.get("/all", async ctx => {
    let selectSQL = `SELECT * from wards`;
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
    let { id } = ctx.request.query;
    let selectSQL = `SELECT * FROM wards WHERE ward_id='${id}'`;
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
    let { id, freeNum, department } = ctx.request.body;
    let time = new Date().toJSON().substring(0, 10);

    let selectSQL = `SELECT * from wards where ward_id='${id}'`;
    let ifEXIST;
    try {
        ifEXIST = await db(selectSQL);
    } catch (err) {
        res = err;
        message = "操作失败";
    }

    if (ifEXIST.length) {
        throw new Error("already exist")
    } else {
        let addSQL =
            "INSERT INTO wards(ward_id, ward_freeNum, ward_department, create_time) VALUE (?,?,?,?)";
        let addParams = [id, freeNum, department, time];
        try {
            res = await db(addSQL, addParams);
            message = "添加病房完成";
        } catch (err) {
            throw new Error("reject")
        }
    }

    return (ctx.body = {
        res,
        message
    });
});

router.post("/update", async ctx => {
    let { id, freeNum, department, oldid } = ctx.request.body;
    let updateSQL =
        "UPDATE wards set ward_id=?, ward_freeNum=?, ward_department=? where ward_id=?";
    let updataParams = [id, freeNum, department, oldid];

    try {
        res = await db(updateSQL, updataParams);
        message = "更新数据完成";
    } catch (error) {
        res = error;
        throw new Error("lost");
        message = "更新失败";
    }

    return (ctx.body = {
        res,
        message
    });
});

router.get("/delete", async ctx => {
    let { id } = ctx.request.query;

    let delSQL = `DELETE FROM wards where ward_id='${id}'`;

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
