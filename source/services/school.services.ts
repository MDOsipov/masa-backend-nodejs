import { Connection, SqlClient, Error } from "msnodesqlv8";
import { whiteBoardType, systemError } from "../entities";
import { ErrorCodes, General, DB_CONNECTION_STRING, Queries } from "../constants";
import { ErrorHelper } from "../helpers/error.helpers";
import { SqlHelper } from "../helpers/sql.helper";

interface localWhiteBoardType {
    id: number;
    white_board_type: string;
}

interface ISchoolService {
    getBoardTypes(): Promise<whiteBoardType[]>;
    getBoardType(id: number): Promise<whiteBoardType>;
};

export class SchoolService implements ISchoolService {
    public getBoardTypes(): Promise<whiteBoardType[]> {
        return new Promise<whiteBoardType[]>((resolve, reject) => {
            const result: whiteBoardType[] = [];

            SqlHelper.SqlConnection()
                .then((connection: Connection) => {
                    return SqlHelper.executeQueryArrayResult<localWhiteBoardType>(connection, Queries.WhiteBoardTypes)
                })
                .then((queryResult: localWhiteBoardType[]) => {
                    queryResult.forEach(whiteBoardType => {
                        result.push(this.parseLocalBoardType(whiteBoardType));
                    });
                    resolve(result);
                })
                .catch((error: systemError) => {
                    reject(error)
                });
        });
    }


    public getBoardType(id: number): Promise<whiteBoardType> {
        let result: whiteBoardType;
        return new Promise<whiteBoardType>((resolve, reject) => {

            SqlHelper.SqlConnection()
                .then((connection: Connection) => {
                    return SqlHelper.executeQuerySingleResult<localWhiteBoardType>(connection, `${Queries.WhiteBoardTypeById} ${id}`);
                })
                .then((queryResult: localWhiteBoardType) => {
                    resolve(this.parseLocalBoardType(queryResult));
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    private parseLocalBoardType(local: localWhiteBoardType): whiteBoardType {
        return {
            id: local.id,
            type: local.white_board_type
        }
    }
}