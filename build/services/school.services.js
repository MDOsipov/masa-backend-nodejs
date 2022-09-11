"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolService = void 0;
const constants_1 = require("../constants");
const sql_helper_1 = require("../helpers/sql.helper");
;
class SchoolService {
    getBoardTypes() {
        return new Promise((resolve, reject) => {
            const result = [];
            sql_helper_1.SqlHelper.executeQueryArrayResult(constants_1.Queries.WhiteBoardTypes)
                .then((queryResult) => {
                queryResult.forEach(whiteBoardType => {
                    result.push(this.parseLocalBoardType(whiteBoardType));
                });
                resolve(result);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    getBoardType(id) {
        return new Promise((resolve, reject) => {
            sql_helper_1.SqlHelper.executeQuerySingleResult(constants_1.Queries.WhiteBoardTypeById, id)
                .then((queryResult) => {
                resolve(this.parseLocalBoardType(queryResult));
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    updateBoardType(white_board_type) {
        return new Promise((resolve, reject) => {
            sql_helper_1.SqlHelper.executeQueryNoResult(constants_1.Queries.UpdateWhiteBoardTypeById, white_board_type.type, white_board_type.id)
                .then(() => {
                console.log("Я тут 3");
                resolve();
            })
                .catch((error) => {
                console.log("Я тут 4");
                reject(error);
            });
        });
    }
    parseLocalBoardType(local) {
        return {
            id: local.id,
            type: local.white_board_type
        };
    }
}
exports.SchoolService = SchoolService;
