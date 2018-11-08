import {RestCallback} from "./rest-callback.interface";
import * as HttpStatus from "http-status-codes";
import {Response} from "express";

/**
 * Callback for create order request
 *
 */
export class PlaceOrderCallback implements RestCallback{

    protected _response: Response;

    constructor(response: Response){
        this._response = response;
    }

    onResponse(error, response, body): void{
        if (!error && response.statusCode == HttpStatus.OK) {
            this._response.status(HttpStatus.OK).send();
        } else{
            this._response.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        }
    }

    get response(): any {
        return this._response;
    }

    set response(value: any) {
        this._response = value;
    }
}