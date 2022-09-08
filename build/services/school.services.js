"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolService = void 0;
const constants_1 = require("../constants");
;
class SchoolService {
    getBoardTypes() {
        return new Promise((resolve, reject) => {
            const result = [];
            const sql = require("msnodesqlv8");
            const connectionString = "server=.;Database=masa_school;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
            const query = "SELECT * FROM white_board_type";
            sql.open(connectionString, (connectionError, connection) => {
                // Например, сервер не работает
                if (connectionError !== null) {
                    const error = {
                        code: constants_1.ErrorCodes.ConnectionError,
                        message: "SQL server connection error"
                    };
                    reject("Connection error!");
                }
                else {
                    connection.query(query, (queryError, queryResult) => {
                        const result = [];
                        if (queryResult !== undefined) {
                            queryResult.forEach(whiteBoardType => {
                                result.push(this.parseLocalBoardType(whiteBoardType));
                            });
                        }
                        resolve(result);
                    });
                }
            });
        });
    }
    ;
    parseLocalBoardType(local) {
        return {
            id: local.id,
            type: local.white_board_type
        };
    }
}
exports.SchoolService = SchoolService;
