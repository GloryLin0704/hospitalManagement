const router = require("koa-router")();
const db = require("../db");
let res, message;

router.get("/all", async ctx => {
    let selectSQL = `SELECT * from patients`;
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
        var selectSQL = `SELECT * FROM patients WHERE patient_id='${id}'`;
    } else if (type === 1) {
        var selectSQL = `SELECT * FROM patients WHERE patient_ward like '%${id}%'`;
    } else if (type === 2) {
        var selectSQL = `SELECT * FROM patients WHERE patient_doctor='${id}'`;
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
    let { id, name, sex, doctor, ward } = ctx.request.body;
    let time = new Date().toJSON().substring(0, 10);

    let selectSQL = `SELECT * from patients where patient_id='${id}'`;
    let ifEXIST;
    try {
        ifEXIST = await db(selectSQL);
    } catch (err) {
        res = err;
        message = "操作失败";
    }

    if (ifEXIST.length) {
        throw new Error("lost");
        message = "这个病人已在记录中";
    } else {
        let checkSQL = `SELECT ward_freeNum from wards where ward_id='${ward}'`;
        let freeNum = await db(checkSQL);
        if (!freeNum[0].ward_freeNum) {
            let code = 1;
            return (ctx.body = {
                code
            });
        }

        let addSQL =
            "INSERT INTO patients(patient_id, patient_name, patient_sex, patient_doctor, patient_ward, create_time) VALUE (?,?,?,?,?,?)";
        let addParams = [id, name, sex, doctor, ward, time];
        try {
            res = await db(addSQL, addParams);
            message = "添加病人完成";
        } catch (err) {
            throw new Error("lost");
            res = err;
            message = "添加病人失败";
        }
    }

    return (ctx.body = {
        res,
        message
    });
});

router.post("/update", async ctx => {
    let { id, name, sex, doctor, ward, oldid } = ctx.request.body;
    let updateSQL =
        "UPDATE patients set patient_id=?, patient_name=?, patient_sex=?, patient_doctor=?, patient_ward=? where patient_id=?";
    let updataParams = [id, name, sex, doctor, ward, oldid];

    try {
        res = await db(updateSQL, updataParams);
        message = "更新数据完成";
    } catch (error) {
        throw new Error("lost");
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

    let delSQL = `DELETE FROM patients where patient_id='${id}'`;

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
