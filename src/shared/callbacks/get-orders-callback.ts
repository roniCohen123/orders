import {RestCallback} from "./rest-callback.interface";
import * as HttpStatus from "http-status-codes";
import {Response} from "express";
import {RestService} from "../../services/rest.service";
import {PageModel} from "../../models/page.model";


/**
 * Callback class for getOrders request
 * Each response is fore specific page
 * keep sending requests until there are no pages
 * (maybe it can be stopped after the order is too old but wasn't sure if the tasks are sorted)
 *
 */
export class GetOrdersCallback implements RestCallback{
    private readonly _lastWeekDate: Date;
    private _currentPage: PageModel = new PageModel(1);

    // The orders that pass the filter and eventually will be sent back as a response
    private _filteredOrders: Array<any> = new Array();

    constructor(protected _phone: string, protected _response: Response){
        // Set the date of last week
        this._lastWeekDate = new Date();
        this._lastWeekDate.setDate(this._lastWeekDate.getDate()-7);
    }

    /**
     * Handle response for get order request on specific page
     *
     */
    onResponse(error, response, body): void{
        if (!error && response.statusCode == HttpStatus.OK) {

            let orders = JSON.parse(body);

            // Check if the body is a valid array and filter by cell number field and time
            if (Array.isArray(orders)){
                // If this is last page (no more orders) - return all the filtered orders
                if (orders.length == 0){
                    this._response.status(HttpStatus.OK).send(JSON.stringify(this._filteredOrders));
                } else{
                    // Add all the orders that pass the filter
                    let currFiltered: Array<any> = orders.filter(order => this.isPassFilter(order));
                    this._filteredOrders = this._filteredOrders.concat(currFiltered);

                    // Request next page
                    this._currentPage.nextPage();
                    RestService.getOrders(this._currentPage, this);
                }
            } else{
                this._response.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
            }
        } else{
            this._response.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        }
    }

    /**
     * Check if the order pass the filters
     *
     */
    protected isPassFilter(order: any) : boolean{
        let passFilter: boolean = false;

        // Check if phone number is the same
        if (order.customer && order.customer.phone){
            passFilter = order.customer.phone == this._phone;
        }

        // If order passed phone filter, check if this order is from last week
        if (passFilter && order.created_at){
            let orderDate: Date = new Date(order.created_at);
            passFilter = (orderDate > this._lastWeekDate);
        }

        return passFilter;
    }
}