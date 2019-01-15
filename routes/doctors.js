const router = require("koa-router")();
const db = require("../db");
let res, message;

router.get("/all", async ctx => {
    let selectSQL = `SELECT * from doctors`;
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
    let { id, type } = ctx.request.query;

    type = parseInt(type);
    if (type === 0) {
        var selectSQL = `SELECT * FROM doctors WHERE doctor_id='${id}'`;
    } else if (type === 1) {
        var selectSQL = `SELECT * FROM doctors WHERE doctor_name like '%${id}%'`;
    } else if (type === 2) {
        var selectSQL = `SELECT * FROM doctors WHERE doctor_department='${id}'`;
    }

    try {
        res = await db(selectSQL);
        message = "查询完毕";
    } catch (error) {
        res = error;
        message = "查询失败";
    }

    return (ctx.body = {
        res,
        message
    });
});

router.post("/create", async ctx => {
    let { id, name, call, phone, department } = ctx.request.body;
    let time = new Date().toJSON().substring(0, 10);

    let selectSQL = `SELECT * from doctors where doctor_id='${id}'`;
    let ifEXIST;
    try {
        ifEXIST = await db(selectSQL);
    } catch (err) {
        res = err;
        message = "操作失败";
    }

    if (ifEXIST.length) {
        throw new Error("reject");
    } else {
        let addSQL =
            "INSERT INTO doctors(doctor_id, doctor_name, doctor_call, doctor_phone, doctor_department, create_time) VALUE (?,?,?,?,?,?)";
        let addParams = [id, name, call, phone, department, time];
        try {
            res = await db(addSQL, addParams);
            message = "添加医生完成";
        } catch (err) {
            throw new Error("reject");
            res = err;
        }
    }

    return (ctx.body = {
        res,
        message
    });
});

router.post("/update", async ctx => {
    let { id, name, call, phone, department, oldid } = ctx.request.body;
    let updateSQL =
        "UPDATE doctors set doctor_id=?, doctor_name=?, doctor_call=?, doctor_phone=?, doctor_department=?where doctor_id=?";
    let updataParams = [id, name, call, phone, department, oldid];

    try {
        res = await db(updateSQL, updataParams);
        message = "更新数据完成";
    } catch (error) {
        res = error;
        throw new Error("lost");
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
