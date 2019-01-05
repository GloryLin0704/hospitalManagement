const connection = require("./connect");

const sqlOperator = (SQL, ...params) => {
    return new Promise((res, rej) => {
        connection.query(SQL, ...params, (err, data) => {
            if (err) {
                rej(err);
            } else {
                res(data);
            }
        });
    });
};

module.exports = sqlOperator;
