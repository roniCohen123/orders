import {Request, Response} from "express";
import * as express from "express";
import {OrderModel} from "../models/order.model";
import * as HttpStatus from 'http-status-codes';
import {RestService} from "../services/rest.service";
import {CustomerModel} from "../models/customer.model";
import {CustomerCallback} from "../shared/callbacks/customer-callback";
import {OrderCallback} from "../shared/callbacks/order-callback";

export class OrdersRoute {
    public routes(app: express.Application): void {
        app.route('/placeorder')
            .post((req: Request, res: Response) => {

                // Create new customer from request body
                let customerToAdd: CustomerModel = new CustomerModel();
                customerToAdd.fromJson(req.body);

                // If the customer is valid- request to add it, otherwise- send an error with the expected template
                if (customerToAdd.isValid()){
                    RestService.createCostumer(customerToAdd, new CustomerCallback(new OrderCallback(res), res));
                    res.status(HttpStatus.OK).send();
                } else{
                    res.status(HttpStatus.BAD_REQUEST).send(OrderModel.TEMPLATE);
                }
         })
    }
}