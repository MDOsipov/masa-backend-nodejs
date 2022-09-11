"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlHelper = void 0;
const error_helpers_1 = require("./error.helpers");
const constants_1 = require("../constants");
const constants_2 = require("../constants");
class SqlHelper {
    // FIXME: SQL injection
    static executeQueryArrayResult(query) {
        return new Promise((resolve, reject) => {
            SqlHelper.SqlConnection()
                .then((connection) => {
                connection.query(query, (queryError, queryResult) => {
                    if (queryError) {
                        reject(error_helpers_1.ErrorHelper.parseError(constants_2.ErrorCodes.queryError, constants_2.General.SqlQueryError));
                    }
                    else {
                        if (queryResult !== undefined) {
                            resolve(queryResult);
                        }
                        else {
                            resolve([]);
                        }
                    }
                    ;
                });
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    static executeQuerySingleResult(query, ...params) {
        return new Promise((resolve, reject) => {
            SqlHelper.SqlConnection()
                .then((connection) => {
                const notFoundError = error_helpers_1.ErrorHelper.parseError(constants_2.ErrorCodes.noData, constants_2.General.noDataFound);
                connection.query(query, params, (queryError, queryResult) => {
                    if (queryError) {
                        reject(error_helpers_1.ErrorHelper.parseError(constants_2.ErrorCodes.queryError, constants_2.General.SqlQueryError));
                    }
                    else {
                        if (queryResult !== undefined) {
                            switch (queryResult.length) {
                                case 0:
                                    reject(notFoundError);
                                    break;
                                case 1:
                                    resolve(queryResult[0]);
                                default:
                                    resolve(queryResult[0]);
                                    break;
                            }
                        }
                        else {
                            reject(notFoundError);
                        }
                    }
                    ;
                });
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    static executeQueryNoResult(query, ...params) {
        return new Promise((resolve, reject) => {
            SqlHelper.SqlConnection()
                .then((connection) => {
                connection.query(query, params, (queryError) => {
                    console.log("query: ", query);
                    console.log("params: ", params);
                    if (queryError) {
                        console.log('Я тут 5');
                        reject(error_helpers_1.ErrorHelper.parseError(constants_2.ErrorCodes.queryError, constants_2.General.SqlQueryError));
                    }
                    else {
                        resolve();
                    }
                    ;
                });
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    static SqlConnection() {
        return new Promise((resolve, reject) => {
            SqlHelper.sql.open(constants_1.DB_CONNECTION_STRING, (connectionError, connection) => {
                if (connectionError) {
                    reject(error_helpers_1.ErrorHelper.parseError(constants_2.ErrorCodes.ConnectionError, constants_2.General.DbconnectionError));
                }
                else {
                    resolve(connection);
                }
            });
        });
    }
}
exports.SqlHelper = SqlHelper;
SqlHelper.sql = require("msnodesqlv8");
SqlHelper.mssql = require("mssql");
