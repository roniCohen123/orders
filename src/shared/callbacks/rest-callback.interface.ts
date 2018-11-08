/**
 * Interface for general rest callback
 *
 */
export interface RestCallback {
    onResponse(error, response, body): void;
}