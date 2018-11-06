import {Request, Response} from "express";
import * as express from "express";
import {OrderModel} from "../models/order.model";

/**
 * Route for managing orders
 *
 */
export class OrdersRoute {

    private m_orders: Array<OrderModel> = new Array();

    public routes(app: express.Application): void {
        app.route('/placeorder')
            .post((req: Request, res: Response) => {
                let orderToAdd: OrderModel = OrderModel.fromJson(req.body);

                // Check if the order is valid and add it, otherwise- send an error with the expected order template
                if (orderToAdd.isValid()){
                    this.m_orders.push(orderToAdd);
                    console.log(this.m_orders.length);
                    res.status(200).send();
                } else{
                    res.status(400).send(OrderModel.TEMPLATE);
                }
         })
    }
}