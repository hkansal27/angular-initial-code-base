export class ServerResponse<T> {
    code: number;
    status: string;
    data: T;
}
