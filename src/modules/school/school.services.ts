import { whiteBoardType, systemError, entityWithId } from "../../entities";
import { ErrorCodes, General, DB_CONNECTION_STRING, Queries } from "../../constants";
import { SqlHelper } from "../../core/sql.helper";
import { Status } from "../../enums"
import { DateHelper } from "../../framework/date.helper";
import ErrorService from "../../core/error.services"


interface localWhiteBoardType {
    id: number;
    white_board_type: string;
    create_date: Date;
    update_date: Date;
    create_user_id: number;
    update_user_id: number;
    status_id: Status;
}

interface ISchoolService {
    getBoardTypes(): Promise<whiteBoardType[]>;
    getBoardType(id: number): Promise<whiteBoardType>;
    updateBoardType(white_board_type: whiteBoardType, userId: number): Promise<whiteBoardType>;
    addBoardType(white_board_type: whiteBoardType, userId: number): Promise<whiteBoardType>;
    deleteBoardTypeById(id: number, userId: number): Promise<void>;
};

class SchoolService implements ISchoolService {

    constructor() { }

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
            SqlHelper.executeQuerySingleResult<localWhiteBoardType>(Queries.WhiteBoardTypeById, id, Status.Active)
                .then((queryResult: localWhiteBoardType) => {
                    resolve(this.parseLocalBoardType(queryResult));
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    public updateBoardType(white_board_type: whiteBoardType, userId: number): Promise<whiteBoardType> {
        return new Promise<whiteBoardType>((resolve, reject) => {
            const updateDate: Date = new Date();
            SqlHelper.executeQueryNoResult<whiteBoardType>(Queries.UpdateWhiteBoardTypeById, false, white_board_type.type, DateHelper.dateToString(updateDate), userId, white_board_type.id, Status.Active)
                .then(() => {
                    resolve(white_board_type);
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        })
    }

    public addBoardType(white_board_type: whiteBoardType, userId: number): Promise<whiteBoardType> {
        return new Promise<whiteBoardType>((resolve, reject) => {
            const createDate: string = DateHelper.dateToString(new Date());
            SqlHelper.createNew(Queries.AddWhiteBoardType, white_board_type, white_board_type.type, createDate, createDate, userId, userId, Status.Active)
                .then((result: entityWithId) => {
                    resolve(result as whiteBoardType);
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        })
    }

    public deleteBoardTypeById(id: number, userId: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const updateDate: Date = new Date();
            SqlHelper.executeQueryNoResult<localWhiteBoardType>(Queries.DeleteWhiteBoardType, true, DateHelper.dateToString(updateDate), userId, Status.NotActive, id, Status.Active)
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

export default new SchoolService();