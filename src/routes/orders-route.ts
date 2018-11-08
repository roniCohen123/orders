import {Request, Response} from "express";
import * as express from "express";
import * as HttpStatus from 'http-status-codes';
import {RestService} from "../services/rest.service";
import {CustomerModel} from "../models/customer.model";
import {AddCustomerCallback} from "../shared/callbacks/add-customer-callback";
import {PlaceOrderCallback} from "../shared/callbacks/place-order-callback";
import {OrderModel} from "../models/order.model";
import {GetOrdersCallback} from "../shared/callbacks/get-orders-callback";
import {PageModel} from "../models/page.model";

export class OrdersRoute {
    public routes(app: express.Application): void {
        app.route('/placeorder')
            .post((req: Request, res: Response) => {
                if (req.body){
                    // Create new customer from request body
                    let customerToAdd: CustomerModel = new CustomerModel();
                    customerToAdd.fromJson(req.body);

                    // If the customer is valid- request to add it, otherwise- send an error with the expected template
                    if (customerToAdd.isValid()){
                        // Create new order and set the details
                        let order: OrderModel = new OrderModel();
                        order.fromJson(req.body);

                        // Create callbacks and send request to create customer
                        let ordersCallback: PlaceOrderCallback = new PlaceOrderCallback(res);
                        RestService.createCostumer(customerToAdd, new AddCustomerCallback(ordersCallback, order));
                        res.status(HttpStatus.OK).send();
                    } else{
                        res.status(HttpStatus.BAD_REQUEST).send(CustomerModel.TEMPLATE);
                    }
                } else{
                    res.status(HttpStatus.BAD_REQUEST).send(CustomerModel.TEMPLATE);
                }
         });

        app.route('/getorders')
            .get((req: Request, res: Response) => {
                if (req.body){
                    let phoneNumber: string = req.body.cellNumber;

                    // If body is valid - send request for orders and start with page 1
                    if (phoneNumber){
                        RestService.getOrders(new PageModel(1), new GetOrdersCallback(phoneNumber, res));
                    } else{
                        res.status(HttpStatus.BAD_REQUEST).send("expected template: {cellNumber}");
                    }
                } else{
                    res.status(HttpStatus.BAD_REQUEST).send("expected template: {cellNumber}");
                }
            });
    }
}