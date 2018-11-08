import {RestCallback} from "./rest-callback.interface";
import * as HttpStatus from "http-status-codes";
import {RestService} from "../../services/rest.service";
import {PlaceOrderCallback} from "./place-order-callback";
import {OrderModel} from "../../models/order.model";

/**
 * Callback for create customer request
 *
 */
export class AddCustomerCallback implements RestCallback{
    protected _orderCallback : PlaceOrderCallback;
    protected _order: OrderModel;

    constructor(orderCallback: PlaceOrderCallback, order: OrderModel){
        this._orderCallback = orderCallback;
        this._order = order;
    }

    /**
     * Handle response from create customer request
     *
     */
    onResponse(error, response, body): void{
        if (!error && response.statusCode == HttpStatus.OK) {
            this._order.fromJson(JSON.parse(body));

            // If the order is valid- request to add it, otherwise- send an error
            if (this._order.isValid()){
                RestService.createOrder(this._order, this._orderCallback);
            } else{
                this._orderCallback.response.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
            }
        } else{
            this._orderCallback.response.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        }
    }
}