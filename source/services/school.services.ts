import { whiteBoardType, systemError } from "../entities";
import { ErrorCodes, General, DB_CONNECTION_STRING, Queries, TEMP_USER_ID } from "../constants";
import { SqlHelper } from "../helpers/sql.helper";
import { Status } from "../enums"
import { DateHelper } from "../helpers/date.helper";


interface localWhiteBoardType {
    id: number;
    white_board_type: string;
    create_date: Date;
    update_date: Date;
    create_user_id: number;
    update_user_id: number;
    status_id: number;
}

interface ISchoolService {
    getBoardTypes(): Promise<whiteBoardType[]>;
    getBoardType(id: number): Promise<whiteBoardType>;
    updateBoardType(white_board_type: whiteBoardType): Promise<whiteBoardType>;
    addBoardType(white_board_type: whiteBoardType): Promise<whiteBoardType>;
    deleteBoardTypeById(id: number): Promise<void>;
};

export class SchoolService implements ISchoolService {

    public getBoardTypes(): Promise<whiteBoardType[]> {
        return new Promise<whiteBoardType[]>((resolve, reject) => {
            const result: whiteBoardType[] = [];
            SqlHelper.executeQueryArrayResult<localWhiteBoardType>(Queries.WhiteBoardTypes, Status.Active)
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
            SqlHelper.executeQueryNoResult<whiteBoardType>(Queries.UpdateWhiteBoardTypeById, false, white_board_type.type, white_board_type.id)
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

    public deleteBoardTypeById(id: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const updateDate: Date = new Date();
            const updateUser: number = TEMP_USER_ID;
            SqlHelper.executeQueryNoResult<localWhiteBoardType>(Queries.DeleteWhiteBoardType, true, DateHelper.dateToString(updateDate), updateUser, Status.NotActive, id, Status.Active)
                .then(() => {
                    resolve();
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