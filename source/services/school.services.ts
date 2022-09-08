import { Connection, SqlClient, Error } from "msnodesqlv8";
import { whiteBoardType, systemError } from "../entities";
import { ErrorCodes } from "../constants";

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

            const connectionString: string = "server=.;Database=masa_school;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
            const query: string = "SELECT * FROM white_board_type";

            sql.open(connectionString, (connectionError: Error, connection: Connection) => {
                // Например, сервер не работает
                if (connectionError !== null) {
                    const error: systemError = {
                        code: ErrorCodes.ConnectionError,
                        message: "SQL server connection error"
                    }
                    reject("Connection error!");
                }
                else {
                    connection.query(query, (queryError: Error | undefined, queryResult: localWhiteBoardType[] | undefined) => {
                        const result: whiteBoardType[] = [];
                        if (queryResult !== undefined) {
                            queryResult.forEach(whiteBoardType => {
                                result.push(
                                    this.parseLocalBoardType(whiteBoardType)
                                )
                            });
                        }
                        resolve(result);
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