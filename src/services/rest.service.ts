import {Properties as Prop} from "../shared/properties";
import {OrderModel} from "../models/order.model";
import {CustomerModel} from "../models/customer.model";
import {AbstractJsonModel} from "../models/abstract-json.model";
import {RestCallback} from "../shared/callbacks/rest-callback.interface";
import {EncodeService} from "./encode.service";
import {PageModel} from "../models/page.model";
let CryptoJS = require("crypto-js");
let request = require('request');

export class RestService{

    public static createOrder(order: OrderModel, callback: RestCallback){
        this.sendRest(Prop.ORDERS_URL, callback, "POST", order);
    }

    public static createCostumer(customer: CustomerModel, callback: RestCallback){
        this.sendRest(Prop.CUSTOMERS_URL, callback, "POST", customer);
    }

    public static getOrders(page: PageModel, callback: RestCallback){
        this.sendRest(Prop.ORDERS_URL, callback, "GET", page);
    }

    private static sendRest(url: string, callback: RestCallback, method: string, data?: AbstractJsonModel): void{
        // Create query body from data and extra parameters for signature
        let params = data ? JSON.parse(data.toJson()) : {};
        params.timestamp = Date.now();
        params.access_token = Prop.TOKEN;

        // Create encoded params string and signature
        let queryParams = EncodeService.getURLEncodedString(params);
        params.signature = CryptoJS.HmacSHA1(queryParams, Prop.KEY).toString();

       let options = {
            url: url,
            method: method,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(params)
       };

        request(options, function(error, response, body) { callback.onResponse(error, response, body);});
    }
}