import { Connection, SqlClient, Error } from "msnodesqlv8";
import { whiteBoardType } from "../entities";
import { ErrorCodes, General, DB_CONNECTION_STRING, Queries } from "../constants";
import { ErrorHelper } from "../helpers/error.helpers";

interface localWhiteBoardType {
    id: number;
    white_board_type: string;
}

interface ISchoolService {
    getBoardTypes(): Promise<whiteBoardType[]>;
};

export class SchoolService implements ISchoolService {
    public getBoardTypes(): Promise<whiteBoardType[]> {
        return new Promise<whiteBoardType[]>((resolve, reject) => {
            const result: whiteBoardType[] = [];
            const sql: SqlClient = require("msnodesqlv8");

            const connectionString: string = DB_CONNECTION_STRING;
            const query: string = Queries.WhiteBoardTypes;

            sql.open(connectionString, (connectionError: Error, connection: Connection) => {
                // Например, сервер не работает
                if (connectionError) {
                    reject(ErrorHelper.parseError(ErrorCodes.ConnectionError, General.DbconnectionError));
                }
                else {
                    connection.query(query, (queryError: Error | undefined, queryResult: localWhiteBoardType[] | undefined) => {
                        if (queryError) {
                            reject(ErrorHelper.parseError(ErrorCodes.queryError, General.SqlQueryError));
                        }
                        else {
                            const result: whiteBoardType[] = [];
                            if (queryResult !== undefined) {
                                queryResult.forEach(whiteBoardType => {
                                    result.push(
                                        this.parseLocalBoardType(whiteBoardType)
                                    )
                                });
                            }
                            resolve(result);
                        }
                    })
                }
            });
        })
    };


    private parseLocalBoardType(local: localWhiteBoardType): whiteBoardType {
        return {
            id: local.id,
            type: local.white_board_type
        }
    }
}