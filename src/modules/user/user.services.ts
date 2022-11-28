import { whiteBoardType, systemError, entityWithId, user } from "../../entities";
import { ErrorCodes, General, DB_CONNECTION_STRING, Queries } from "../../constants";
import { SqlHelper } from "../../core/sql.helper";
import { Role, Status } from "../../enums"
import { DateHelper } from "../../framework/date.helper";
import ErrorService from "../../core/error.services"

interface IUserService {
    updateById(user: user, userId: number): Promise<user>;
    add(user: user, userId: number): Promise<user>;
    deleteById(id: number, userId: number): Promise<void>;
};

interface localUser extends entityWithId {
    first_name: string;
    last_name: string;
    login: string;
    password: string;
}

class UserService implements IUserService {

    constructor() { }

    public getUsers(): Promise<user[]> {
        return new Promise<user[]>((resolve, reject) => {
            const result: user[] = [];
            SqlHelper.executeQueryArrayResult<localUser>(Queries.GetUsers, Status.Active)
                .then((queryError: localUser[]) => {
                    queryError.forEach((elem: localUser) => {
                        result.push(this.parseLocalUser(elem));
                    })
                    resolve(result);
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        })
    }

    public getUserById(userId: number): Promise<user> {
        return new Promise<user>((resolve, reject) => {
            SqlHelper.executeQuerySingleResult<localUser>(Queries.GetUserById, userId, Status.Active)
                .then((queryResult: localUser) => {
                    resolve(this.parseLocalUser(queryResult));
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        })
    }

    public updateById(user: user, userId: number): Promise<user> {
        return new Promise<user>((resolve, reject) => {
            const updateDate: Date = new Date();
            SqlHelper.executeQueryNoResult<user>(Queries.UpdateUserById, false, user.firstName, user.lastName, DateHelper.dateToString(updateDate), userId, user.id, Status.Active)
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
            SqlHelper.createNew(Queries.AddUser, user, user.firstName, user.lastName, user.login as string, user.password as string, Role.RegularUser, createDate, createDate, userId, userId, Status.Active)
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
            SqlHelper.executeQueryNoResult<user>(Queries.DeleteUserById, true, DateHelper.dateToString(updateDate), userId, Status.NotActive, id, Status.Active)
                .then(() => {
                    resolve();
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    private parseLocalUser(localUser: localUser): user {
        return {
            id: localUser.id,
            firstName: localUser.first_name,
            lastName: localUser.last_name,
            login: localUser.login,
            password: localUser.password
        }
    }

}

export default new UserService();