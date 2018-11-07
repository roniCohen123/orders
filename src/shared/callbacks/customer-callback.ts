import {RestCallback} from "./rest-callback.interface";
import * as HttpStatus from "http-status-codes";
import {OrderModel} from "../../models/order.model";
import {RestService} from "../../services/rest.service";
import {OrderCallback} from "./order-callback";

export class CustomerCallback implements RestCallback{
    protected _orderCallback : OrderCallback;
    protected _response: any;

    constructor(orderCallback: OrderCallback, response: any){
        this._orderCallback = orderCallback;
        this._response = response;
    }

    onResponse(error, response, body): void{
        if (!error && response.statusCode == HttpStatus.OK) {
            console.log(" customer reponse : " + body);

            let orderToAdd: OrderModel = new OrderModel();
            orderToAdd.fromJson(body);

            console.log("the order is  : " + orderToAdd.toJson());

            // If the order is valid- request to add it, otherwise- send an error with the expected template
            if (orderToAdd.isValid()){
                RestService.createOrder(orderToAdd, this._orderCallback);
            } else{
                this._response.status(HttpStatus.BAD_REQUEST).send(OrderModel.TEMPLATE);
            }
        } else{
            console.log(error);
            this._response.status(HttpStatus.BAD_REQUEST).send(OrderModel.TEMPLATE);
        }
    }
}