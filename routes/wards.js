const router = require("koa-router")();
const db = require("../db");
let res, message;

router.get("/all", async ctx => {
    let selectSQL = `SELECT ward_id from wards`;
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

router.get("one", async ctx => {
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
    let { id, firstNum, lastNum, department } = ctx.request.body;

    let selectSQL = `SELECT * from wards where ward_id='${id}'`;
    let ifEXIST;
    try {
        ifEXIST = await db(selectSQL);
    } catch (err) {
        res = err;
        message = "操作失败";
    }

    if (ifEXIST.length) {
        message = "这个病房已在记录中";
    } else {
        let addSQL =
            "INSERT INTO wards(ward_id, ward_firstNum, ward_lastNum, ward_department) VALUE (?,?,?,?)";
        let addParams = [id, firstNum, lastNum, department];
        try {
            res = await db(addSQL, addParams);
            message = "添加病房完成";
        } catch (err) {
            res = err;
            message = "添加病房失败";
        }
    }

    return (ctx.body = {
        res,
        message
    });
});

router.post("/update", async ctx => {
    let { id, firstNum, lastNum, department, oldid } = ctx.request.body;
    let updateSQL =
        "UPDATE wards set ward_id=?, ward_firstNum=?, ward_lastNum=?, ward_department=?, where ward_id=?";
    let updataParams = [id, firstNum, lastNum, department, oldid];

    try {
        res = await db(updateSQL, updataParams);
        message = "更新数据完成";
    } catch (error) {
        res = error;
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
