"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queries = exports.DB_CONNECTION_STRING = exports.SqlParameters = exports.General = exports.ErrorCodes = void 0;
class ErrorCodes {
}
exports.ErrorCodes = ErrorCodes;
ErrorCodes.ConnectionError = 100;
ErrorCodes.queryError = 101;
ErrorCodes.noData = 102;
ErrorCodes.NonNumericInput = 103;
ErrorCodes.InputParameterNotSupplied = 104;
class General {
}
exports.General = General;
General.DbconnectionError = "DB server connection error";
General.SqlQueryError = "Incorrect query";
General.noDataFound = "Not found";
General.NonNumericInput = "Non numeric input supplied";
General.InputParameterNotSupplied = "Input parameter not supplied";
class SqlParameters {
}
exports.SqlParameters = SqlParameters;
SqlParameters.Id = 'id';
exports.DB_CONNECTION_STRING = "server=.;Database=masa_school;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
class Queries {
}
exports.Queries = Queries;
Queries.WhiteBoardTypes = "SELECT * FROM white_board_type";
Queries.WhiteBoardTypeById = `SELECT * FROM white_board_type WHERE id = ?`;
Queries.UpdateWhiteBoardTypeById = "UPDATE white_board_type SET white_board_type = ? WHERE id = ?";
