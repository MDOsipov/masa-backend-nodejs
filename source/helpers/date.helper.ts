export class DateHelper {
    public static dateToString(input: Date): string {
        const year: string = input.getFullYear().toString();
        const month: string = (input.getMonth() + 1).toString().padStart(2, "0");
        const day: string = (input.getDate()).toString().padStart(2, "0");
        const hour: string = (input.getHours()).toString().padStart(2, "0");
        const minute: string = (input.getMinutes()).toString().padStart(2, "0");
        const second: string = (input.getSeconds()).toString().padStart(2, "0");
        return `${year}${month}${day} ${hour}:${minute}:${second}`;
    }
}