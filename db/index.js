const sqlOperator = require("./sql.js");

// var addSql = "INSERT INTO patients(name,age) VALUES(?,?)";
// var addSqlParams = ["Glory", 23];

// (async () => {
//     let res = await sqlOperator(addSql, addSqlParams);
//     console.log(res);
// })();

module.exports = sqlOperator;