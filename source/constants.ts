export class ErrorCodes {
    public static ConnectionError: number = 100;
    public static queryError: number = 101;
    public static noData: number = 102;
    public static NonNumericInput: number = 103;
    public static InputParameterNotSupplied: number = 104;
}

export class General {
    public static DbconnectionError: string = "DB server connection error";
    public static SqlQueryError: string = "Incorrect query";
    public static noDataFound: string = "Not found";
    public static NonNumericInput: string = "Non numeric input supplied";
    public static InputParameterNotSupplied: string = "Input parameter not supplied";

}

export const DB_CONNECTION_STRING: string = "server=.;Database=masa_school;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

export class Queries {
    public static WhiteBoardTypes: string = "SELECT * FROM white_board_type";
    public static WhiteBoardTypeById: string = "SELECT * FROM white_board_type WHERE id = ";
}