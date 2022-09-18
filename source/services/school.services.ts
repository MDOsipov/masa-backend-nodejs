import { whiteBoardType, systemError, entityWithId } from "../entities";
import { ErrorCodes, General, DB_CONNECTION_STRING, Queries, TEMP_USER_ID } from "../constants";
import { SqlHelper } from "../helpers/sql.helper";
import { Status } from "../enums"
import { DateHelper } from "../helpers/date.helper";
import { ErrorService } from "./error.services";


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

    constructor(private errorService: ErrorService) { }

    public getBoardTypes(): Promise<whiteBoardType[]> {
        return new Promise<whiteBoardType[]>((resolve, reject) => {
            const result: whiteBoardType[] = [];
            SqlHelper.executeQueryArrayResult<localWhiteBoardType>(this.errorService, Queries.WhiteBoardTypes, Status.Active)
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
            SqlHelper.executeQuerySingleResult<localWhiteBoardType>(this.errorService, Queries.WhiteBoardTypeById, id, Status.Active)
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
            const updateDate: Date = new Date();
            const updateUser: number = TEMP_USER_ID;
            SqlHelper.executeQueryNoResult<whiteBoardType>(this.errorService, Queries.UpdateWhiteBoardTypeById, false, white_board_type.type, DateHelper.dateToString(updateDate), updateUser, white_board_type.id, Status.Active)
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
            const createDate: string = DateHelper.dateToString(new Date());
            const createUser: number = TEMP_USER_ID;
            SqlHelper.createNew(this.errorService, Queries.AddWhiteBoardType, white_board_type, white_board_type.type, createDate, createDate, createUser, createUser, Status.Active)
                .then((result: entityWithId) => {
                    resolve(result as whiteBoardType);
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
            SqlHelper.executeQueryNoResult<localWhiteBoardType>(this.errorService, Queries.DeleteWhiteBoardType, true, DateHelper.dateToString(updateDate), updateUser, Status.NotActive, id, Status.Active)
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