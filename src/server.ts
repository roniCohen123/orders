import {OrdersApp} from "./orders-app";
import {Properties as Prop} from "./shared/properties";

OrdersApp.getInstance().app.listen(Prop.PORT, () => {
    console.log('listening on port ' + Prop.PORT);
});