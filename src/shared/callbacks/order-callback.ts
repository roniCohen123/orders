import {RestCallback} from "./rest-callback.interface";
import * as HttpStatus from "http-status-codes";
import {OrderModel} from "../../models/order.model";

export class OrderCallback implements RestCallback{

    protected _response: any;

    constructor(responce: any){
        this._response = responce;
    }

    onResponse(error, response, body): void{
        console.log("here!!");
        if (!error && response.statusCode == HttpStatus.OK) {
            console.log(body);
            this._response.status(HttpStatus.OK).send();
        } else{
            this._response.status(HttpStatus.BAD_REQUEST).send(OrderModel.TEMPLATE);
        }
    }
}