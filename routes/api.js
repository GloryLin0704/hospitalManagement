const router = require("koa-router")();
const departments = require("./departments.js");
const doctors = require("./doctors.js");
const wards = require("./wards.js");
const patients = require("./patients.js");

router.prefix("/api");

router.use("/departments", departments.routes(), departments.allowedMethods());
router.use("/doctors", doctors.routes(), doctors.allowedMethods());
router.use("/wards", wards.routes(), wards.allowedMethods());
router.use("/patients", patients.routes(), patients.allowedMethods());

router.get("/", async (ctx, next) => {
    await ctx.render("index", {
        title: "Hello Koa 2!"
    });
});

module.exports = router;
