const router = require("koa-router")();
const departments = require("./departments.js");
const doctors = require("./doctors.js");
const wards = require("./wards.js");
const patients = require("./patients.js");
const db = require("../db");

router.prefix("/api");

router.post("/login", async (ctx, next) => {
    let { username, password } = ctx.request.body;

    let selectSQL = `SELECT * FROM user WHERE username='${username}' AND password='${password}'`;
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

router.use("/departments", departments.routes(), departments.allowedMethods());
router.use("/doctors", doctors.routes(), doctors.allowedMethods());
router.use("/wards", wards.routes(), wards.allowedMethods());
router.use("/patients", patients.routes(), patients.allowedMethods());

module.exports = router;
