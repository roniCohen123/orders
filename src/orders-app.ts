import * as express from 'express';
import * as bodyParser from 'body-parser';
import {OrdersRoute} from "./routes/orders-route";

export class OrdersApp {

    private static m_instance;
    private readonly m_app: express.Application;
    public ordersRoute: OrdersRoute = new OrdersRoute();

    private constructor() {
        this.m_app = express();
        this.config();
        this.ordersRoute.routes(this.m_app);
    }

    public static getInstance(){
        if (!this.m_instance) {
            this.m_instance = new OrdersApp();
        }

        return this.m_instance;
    }

    private config(): void {
        // Support json type post data
        this.m_app.use(bodyParser.json());

        // Support application form-urlencoded post data
        this.m_app.use(bodyParser.urlencoded({extended: false}));
    }

    public get app() : express.Application{
        return this.m_app;
    }
}