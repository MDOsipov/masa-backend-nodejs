export class ErrorCodes {
    public static ConnectionError: number = 100;
    public static queryError: number = 101;
    public static noData: number = 102;
    public static NonNumericInput: number = 103;
    public static InputParameterNotSupplied: number = 104;
    public static DeletionConflict: number = 105;

}

export class General {
    public static DbconnectionError: string = "DB server connection error";
    public static SqlQueryError: string = "Incorrect query";
    public static noDataFound: string = "Not found";
    public static NonNumericInput: string = "Non numeric input supplied";
    public static InputParameterNotSupplied: string = "Input parameter not supplied";
    public static DeletionConflict: string = "Delete failed due to conflict";
}

export class SqlParameters {
    public static Id: string = 'id';
}

export const DB_CONNECTION_STRING: string = "server=.;Database=masa_school;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
export const NON_EXISTENT_ID: number = -1;
export const TOKENSECRET: string = "a59ccae2-29a5-467f-b623-1050f6970b3b";

export class Queries {
    public static WhiteBoardTypes: string = "SELECT * FROM white_board_type WHERE status_id = ?";
    public static WhiteBoardTypeById: string = `SELECT * FROM white_board_type WHERE id = ? AND status_id = ?`;
    public static UpdateWhiteBoardTypeById: string = "UPDATE white_board_type SET white_board_type = ?, update_date = ?, update_user_id = ? WHERE id = ? AND status_id = ?";
    public static AddWhiteBoardType: string = "INSERT INTO white_board_type (white_board_type, create_date, update_date, create_user_id, update_user_id, status_id) VALUES (?, ?, ?, ?, ?, ?)";
    public static SelectIdentity: string = "SELECT SCOPE_IDENTITY() AS id";
    public static DeleteWhiteBoardType: string = "UPDATE white_board_type SET update_date = ?, update_user_id = ?, status_id = ? WHERE id = ? AND status_id = ?";

    public static GetUserByLogin: string = "SELECT id, password, role_id FROM [user] WHERE login = ?"

    public static UpdateUserById: string = "UPDATE [user] SET first_name = ?, last_name = ?, update_date = ?, update_user_id = ? WHERE id = ? AND status_id = ?";
    public static DeleteUserById: string = "UPDATE [user] SET update_date = ?, update_user_id = ?, status_id = ? WHERE id = ? AND status_id = ?";
    public static AddUser: string = "INSERT INTO [user] (first_name, last_name, login, password, role_id, create_date, update_date, create_user_id, update_user_id, status_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";


}