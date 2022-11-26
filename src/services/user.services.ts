import { whiteBoardType, systemError, entityWithId, user } from "../entities";
import { ErrorCodes, General, DB_CONNECTION_STRING, Queries } from "../constants";
import { SqlHelper } from "../helpers/sql.helper";
import { Role, Status } from "../enums"
import { DateHelper } from "../helpers/date.helper";
import { ErrorService } from "./error.services";

interface IUserService {
    updateById(user: user, userId: number): Promise<user>;
    add(user: user, userId: number): Promise<user>;
    deleteById(id: number, userId: number): Promise<void>;
};

export class UserService implements IUserService {

    constructor(private errorService: ErrorService) { }

    public getUserById(userId: number): Promise<user> {
        return new Promise<user>((resolve, reject) => {
            SqlHelper.executeQuerySingleResult<user>(this.errorService, Queries.GetUserById, userId, Status.Active)
                .then((user: user) => {
                    resolve(user);
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        })
    }

    public updateById(user: user, userId: number): Promise<user> {
        return new Promise<user>((resolve, reject) => {
            const updateDate: Date = new Date();
            SqlHelper.executeQueryNoResult<user>(this.errorService, Queries.UpdateUserById, false, user.firstName, user.lastName, DateHelper.dateToString(updateDate), userId, user.id, Status.Active)
                .then(() => {
                    resolve(user);
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        })
    }

    public add(user: user, userId: number): Promise<user> {
        return new Promise<user>((resolve, reject) => {
            const createDate: string = DateHelper.dateToString(new Date());
            SqlHelper.createNew(this.errorService, Queries.AddUser, user, user.firstName, user.lastName, user.login as string, user.password as string, Role.RegularUser, createDate, createDate, userId, userId, Status.Active)
                .then((result: entityWithId) => {
                    resolve(result as user);
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        })
    }

    public deleteById(id: number, userId: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const updateDate: Date = new Date();
            SqlHelper.executeQueryNoResult<user>(this.errorService, Queries.DeleteUserById, true, DateHelper.dateToString(updateDate), userId, Status.NotActive, id, Status.Active)
                .then(() => {
                    resolve();
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }
}