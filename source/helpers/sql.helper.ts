import { SqlClient, Connection, Error } from "msnodesqlv8";
import { ErrorHelper } from "./error.helpers";
import { DB_CONNECTION_STRING, Queries } from "../constants";
import { ErrorCodes, General } from "../constants";
import { systemError } from "../entities";
import { query, Request } from "mssql";
import { Query } from "msnodesqlv8";
import { getOriginalNode } from "typescript";

export class SqlHelper {
    static sql: SqlClient = require("msnodesqlv8");
    static mssql: SqlClient = require("mssql");

    // FIXME: SQL injection

    public static executeQueryArrayResult<T>(query: string): Promise<T[]> {
        return new Promise<T[]>((resolve, reject) => {
            SqlHelper.SqlConnection()
                .then((connection: Connection) => {
                    connection.query(query, (queryError: Error | undefined, queryResult: T[] | undefined) => {
                        if (queryError) {
                            reject(ErrorHelper.parseError(ErrorCodes.queryError, General.SqlQueryError));
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
                    const notFoundError: systemError = ErrorHelper.parseError(ErrorCodes.noData, General.noDataFound);
                    connection.query(query, params, (queryError: Error | undefined, queryResult: T[] | undefined) => {
                        if (queryError) {
                            reject(ErrorHelper.parseError(ErrorCodes.queryError, General.SqlQueryError));
                        }
                        else {
                            if (queryResult !== undefined) {
                                switch (queryResult.length) {
                                    case 0:
                                        reject(notFoundError)
                                        break;
                                    case 1:
                                        resolve(queryResult[0]);
                                    default:
                                        resolve(queryResult[0]);
                                        break;
                                }
                            } else {
                                reject(notFoundError);
                            }
                        };
                    });
                })
                .catch((error: systemError) => {
                    reject(error);
                })
        });
    }

    public static createNew<T>(query: string, original: T, ...params: (string | number)[]): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            SqlHelper.SqlConnection()
                .then((connection: Connection) => {
                    const queries: string[] = [query, Queries.SelectIdentity];

                    const executeQuery: string = queries.join(';');
                    const badQuerryError: systemError = ErrorHelper.parseError(ErrorCodes.queryError, General.SqlQueryError);
                    let executionCounter: number = 0;
                    connection.query(executeQuery, params, (queryError: Error | undefined, queryResult: T[] | undefined) => {
                        if (queryError) {
                            reject(ErrorHelper.parseError(ErrorCodes.queryError, General.SqlQueryError));
                        }
                        else {
                            executionCounter++;
                            if (executionCounter === queries.length) {
                                if (queryResult !== undefined) {
                                    if (queryResult.length == 1) {
                                        (original as any).id = (queryResult[0] as any).id;
                                        resolve(original);
                                    }
                                    else {
                                        reject(badQuerryError);
                                    }
                                }
                                else {
                                    reject(badQuerryError);
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

    public static executeQueryNoResult<T>(query: string, ...params: (string | number)[]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            SqlHelper.SqlConnection()
                .then((connection: Connection) => {
                    const q: Query = connection.query(query, params, (queryError: Error | undefined, rows: any) => {
                        if (queryError) {
                            switch (queryError.code) {
                                case 547:
                                    reject(ErrorHelper.parseError(ErrorCodes.DeletionConflict, General.DeletionConflict));
                                    break;
                                default:
                                    reject(ErrorHelper.parseError(ErrorCodes.queryError, General.SqlQueryError));
                                    break;
                            }
                        }
                    });
                    q.on('rowcount', (rowCount: number) => {
                        if (rowCount === 0) {
                            reject(ErrorHelper.parseError(ErrorCodes.noData, General.noDataFound));
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
                    reject(ErrorHelper.parseError(ErrorCodes.ConnectionError, General.DbconnectionError));
                }
                else {
                    resolve(connection);
                }
            });
        })
    }
}

