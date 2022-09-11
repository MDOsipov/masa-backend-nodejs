import { SqlClient, Connection, Error } from "msnodesqlv8";
import { ErrorHelper } from "./error.helpers";
import { DB_CONNECTION_STRING } from "../constants";
import { ErrorCodes, General } from "../constants";
import { systemError } from "../entities";

export class SqlHelper {
    static sql: SqlClient = require("msnodesqlv8");

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

    public static executeQuerySingleResult<T>(query: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            SqlHelper.SqlConnection()
                .then((connection: Connection) => {
                    const notFoundError: systemError = ErrorHelper.parseError(ErrorCodes.noData, General.noDataFound);
                    connection.query(query, (queryError: Error | undefined, queryResult: T[] | undefined) => {
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

