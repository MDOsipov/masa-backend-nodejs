import { SqlClient, Connection, Error } from "msnodesqlv8";
import { ErrorHelper } from "./error.helpers";
import { DB_CONNECTION_STRING } from "../constants";
import { ErrorCodes, General } from "../constants";

export class SqlHelper {
    static sql: SqlClient = require("msnodesqlv8");

    public static SqlConnection(): Promise<Connection> {
        return new Promise<Connection>((resolve, reject) => {
            SqlHelper.sql.open(DB_CONNECTION_STRING, (connectionError: Error, connection: Connection) => {
                if (connectionError) {
                    reject(ErrorHelper.parseError(ErrorCodes.ConnectionError, General.DbconnectionError));
                }
                else {
                    resolve(connection);
                }
            });
        });
    }
}