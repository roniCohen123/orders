export interface RestCallback {
    onResponse(error, response, body): void;
}