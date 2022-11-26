import { SqlClient, Connection, Error } from "msnodesqlv8";
import { DB_CONNECTION_STRING, Queries } from "../constants";
import { ErrorCodes, General } from "../constants";
import { systemError } from "../entities";
import { query, Request } from "mssql";
import { Query } from "msnodesqlv8";
import { getOriginalNode } from "typescript";
import { entityWithId } from "../entities"
import ErrorService from "./error.services";
import { AppError } from "../enums";

export class SqlHelper {
    static sql: SqlClient = require("msnodesqlv8");
    static mssql: SqlClient = require("mssql");

    public static executeQueryArrayResult<T>(query: string, ...params: (string | number)[]): Promise<T[]> {
        return new Promise<T[]>((resolve, reject) => {
            console.log(query, params);
            SqlHelper.SqlConnection()
                .then((connection: Connection) => {
                    connection.query(query, params, (queryError: Error | undefined, queryResult: T[] | undefined) => {
                        if (queryError) {
                            reject(ErrorService.getError(AppError.queryError));
                        }
                        else {
                            if (queryResult !== undefined) {
                                resolve(queryResult);
                            } else {
                                resolve([]);
                            }
                        };
                    });
                })
                .catch((error: systemError) => {
                    reject(error);
                })
        });
    }

    public static executeQuerySingleResult<T>(query: string, ...params: (string | number)[]): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            SqlHelper.SqlConnection()
                .then((connection: Connection) => {
                    connection.query(query, params, (queryError: Error | undefined, queryResult: T[] | undefined) => {
                        if (queryError) {
                            reject(ErrorService.getError(AppError.queryError));
                        }
                        else {
                            if (queryResult !== undefined) {
                                switch (queryResult.length) {
                                    case 0:
                                        reject(ErrorService.getError(AppError.noData))
                                        break;
                                    case 1:
                                        resolve(queryResult[0]);
                                    default:
                                        resolve(queryResult[0]);
                                        break;
                                }
                            } else {
                                reject(ErrorService.getError(AppError.noData));
                            }
                        };
                    });
                })
                .catch((error: systemError) => {
                    console.log("Connection error!");
                    reject(error);
                })
        });
    }

    public static createNew(query: string, original: entityWithId, ...params: (string | number)[]): Promise<entityWithId> {
        return new Promise((resolve, reject) => {
            SqlHelper.SqlConnection()
                .then((connection: Connection) => {
                    const queries: string[] = [query, Queries.SelectIdentity];

                    const executeQuery: string = queries.join(';');
                    let executionCounter: number = 0;
                    connection.query(executeQuery, params, (queryError: Error | undefined, queryResult: entityWithId[] | undefined) => {
                        if (queryError) {
                            reject(ErrorService.getError(AppError.queryError));
                        }
                        else {
                            executionCounter++;
                            if (executionCounter === queries.length) {
                                if (queryResult !== undefined) {
                                    if (queryResult.length == 1) {
                                        original.id = (queryResult[0] as any).id;
                                        resolve(original);
                                    }
                                    else {
                                        reject(ErrorService.getError(AppError.queryError));
                                    }
                                }
                                else {
                                    reject(ErrorService.getError(AppError.queryError));
                                };
                            }
                        }
                    });
                })
                .catch((error: systemError) => {
                    reject(error);
                })
        });
    }

    public static executeQueryNoResult<T>(query: string, ignoreNoRowsAffected: boolean, ...params: (string | number)[]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            SqlHelper.SqlConnection()
                .then((connection: Connection) => {
                    const q: Query = connection.query(query, params, (queryError: Error | undefined, rows: any) => {
                        if (queryError) {
                            switch (queryError.code) {
                                case 547:
                                    reject(ErrorService.getError(AppError.DeletionConflict));
                                    break;
                                default:
                                    reject(ErrorService.getError(AppError.queryError));
                                    break;
                            }
                        }
                    });
                    q.on('rowcount', (rowCount: number) => {
                        if (!ignoreNoRowsAffected && rowCount === 0) {
                            reject(ErrorService.getError(AppError.noData));
                            return;
                        }
                        resolve();
                    });
                })
                .catch((error: systemError) => {
                    reject(error);
                })
        });
    }

    private static SqlConnection(): Promise<Connection> {
        return new Promise<Connection>((resolve, reject) => {
            SqlHelper.sql.open(DB_CONNECTION_STRING, (connectionError: Error, connection: Connection) => {
                if (connectionError) {
                    reject(ErrorService.getError(AppError.ConnectionError));
                }
                else {
                    resolve(connection);
                }
            });
        })
    }
}

