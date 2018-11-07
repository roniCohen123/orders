import {Properties as Prop} from "../shared/properties";
import {OrderModel} from "../models/order.model";
import {CustomerModel} from "../models/customer.model";
import {AbstractJsonModel} from "../models/abstract-json.model";
import {RestCallback} from "../shared/callbacks/rest-callback.interface";
let CryptoJS = require("crypto-js");
let request = require('request');

export class RestService{

    public static createOrder(order: OrderModel, callback: RestCallback){
        this.send(order, Prop.ADD_ORDER_URL, callback);
    }

    public static createCostumer(customer: CustomerModel, callback: RestCallback){
        this.send(customer, Prop.ADD_CUSTOMER_URL, callback);
    }

    private static send(data: AbstractJsonModel, url: string, callback: RestCallback): void{
        // Create query body from data and extra parameters for signature
        let params = JSON.parse(data.toJson());
        params.timestamp = Date.now();
        params.access_token = Prop.TOKEN;

        // Create encoded params string and signature
        let queryParams = this.getURLEncodedString(params);
        params.signature = CryptoJS.HmacSHA1(queryParams, Prop.KEY).toString();

        console.log(JSON.stringify(params));

       let options = {
            url: url,
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(params)
       };

        request(options, function(error, response, body) { callback.onResponse(error, response, body);});
    }

    /**
     * Get a key-value object and return a string contains the keys with encoded values
     *
     */
    private static getURLEncodedString(params: any): string{
        let queryParams = '';

        for (let key in params) {
            let value = params[key];

            if (queryParams.length > 0) {
                queryParams += '&';
            }

            queryParams += key + '=' + encodeURIComponent(value);
        }

        return queryParams;
    }
}