import {RestCallback} from "./rest-callback.interface";
import * as HttpStatus from "http-status-codes";
import {Response} from "express";

export class GetOrdersCallback implements RestCallback{
    // The date of last week- update whenever get response
    private _lastWeekDate: Date;

    constructor(protected _phone: string, protected _response: Response){}

    onResponse(error, response, body): void{
        if (!error && response.statusCode == HttpStatus.OK) {
            let orders = JSON.parse(body);

            // Check if the body is a valid array and filter by cell number field and time
            if (Array.isArray(orders)){

                // Update the date of last week once, before running filter on the orders receive
                this._lastWeekDate = new Date();
                this._lastWeekDate.setDate(this._lastWeekDate.getDate()-7);

                // Return only the orders that pass the filter
                let filterOrders = orders.filter((order => this.isPassFilter(order)));
                this._response.status(HttpStatus.OK).send(JSON.stringify(filterOrders));
            } else{
                this._response.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
            }
        } else{
            this._response.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        }
    }

    /**
     * Check if on order pass the phone and the date filters
     *
     */
    protected isPassFilter(order: any) : boolean{
        let passFilter: boolean = false;

        // Check if phone number is the same
        if (order.customer && order.customer.phone){
            passFilter = order.customer.phone == this._phone;
        }

        // If pass phone filter, check if this order is from last week
        if (passFilter && order.created_at){
            let orderDate: Date = new Date(order.created_at);
            passFilter = (orderDate > this._lastWeekDate);
        }

        return passFilter;
    }
}