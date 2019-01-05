const router = require("koa-router")();
const db = require("../db");
let res, message;

router.get("/all", async ctx => {
    let selectSQL = `SELECT doctor_id, doctor_name from doctors`;
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
    let selectSQL = `SELECT * FROM doctors WHERE doctor_id='${id}'`;
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
    let { id, name, call, age, department } = ctx.request.body;

    let selectSQL = `SELECT * from doctors where doctor_id='${id}'`;
    let ifEXIST;
    try {
        ifEXIST = await db(selectSQL);
    } catch (err) {
        res = err;
        message = "操作失败";
    }

    if (ifEXIST.length) {
        message = "这个医生已在记录中";
    } else {
        let addSQL =
            "INSERT INTO doctors(doctor_id, doctor_name, doctor_call, doctor_age, doctor_department) VALUE (?,?,?,?,?)";
        let addParams = [id, name, call, age, department];
        try {
            res = await db(addSQL, addParams);
            message = "添加医生完成";
        } catch (err) {
            res = err;
            message = "添加医生失败";
        }
    }

    return (ctx.body = {
        res,
        message
    });
});

router.post("/update", async ctx => {
    let { id, name, call, age, department, oldid } = ctx.request.body;
    let updateSQL =
        "UPDATE doctors set doctor_id=?, doctor_name=?, doctor_call=?, doctor_age=?, doctor_department=?, where doctor_id=?";
    let updataParams = [id, name, call, age, department, oldid];

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

    let delSQL = `DELETE FROM doctors where doctor_id='${id}'`;

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
