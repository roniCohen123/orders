import {OrdersApp} from "./orders-app";

const PORT = 3001;

OrdersApp.getInstance().app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
})