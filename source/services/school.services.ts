import { whiteBoardType, systemError } from "../entities";
import { ErrorCodes, General, DB_CONNECTION_STRING, Queries } from "../constants";
import { SqlHelper } from "../helpers/sql.helper";


interface localWhiteBoardType {
    id: number;
    white_board_type: string;
}

interface ISchoolService {
    getBoardTypes(): Promise<whiteBoardType[]>;
    getBoardType(id: number): Promise<whiteBoardType>;
    updateBoardType(white_board_type: whiteBoardType): Promise<whiteBoardType>;
    addBoardType(white_board_type: whiteBoardType): Promise<whiteBoardType>;
};

export class SchoolService implements ISchoolService {
    public getBoardTypes(): Promise<whiteBoardType[]> {
        return new Promise<whiteBoardType[]>((resolve, reject) => {
            const result: whiteBoardType[] = [];
            SqlHelper.executeQueryArrayResult<localWhiteBoardType>(Queries.WhiteBoardTypes)
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
        return new Promise<whiteBoardType>((resolve, reject) => {
            SqlHelper.executeQuerySingleResult<localWhiteBoardType>(Queries.WhiteBoardTypeById, id)
                .then((queryResult: localWhiteBoardType) => {
                    resolve(this.parseLocalBoardType(queryResult));
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    public updateBoardType(white_board_type: whiteBoardType): Promise<whiteBoardType> {
        return new Promise<whiteBoardType>((resolve, reject) => {
            SqlHelper.executeQueryNoResult<whiteBoardType>(Queries.UpdateWhiteBoardTypeById, white_board_type.type, white_board_type.id)
                .then(() => {
                    resolve(white_board_type);
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        })
    }

    public addBoardType(white_board_type: whiteBoardType): Promise<whiteBoardType> {
        return new Promise<whiteBoardType>((resolve, reject) => {
            SqlHelper.createNew<whiteBoardType>(Queries.AddWhiteBoardType, white_board_type, white_board_type.type)
                .then((result: whiteBoardType) => {
                    resolve(result);
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        })
    }

    private parseLocalBoardType(local: localWhiteBoardType): whiteBoardType {
        return {
            id: local.id,
            type: local.white_board_type
        }
    }
}