import Joi from 'joi';
import {Properties as Props} from "../../common/properties";

export default {
    routes: {
        body: {
            name: Joi.string().isLength({ min: Props.MIN_NAME_LEN , max: Props.MAX_NAME_LEN}).required(),
            address: Joi.string().required(),
            orderDetails: Joi.string().required(),
            cellNumber: Joi.string().regex(/[0-9]+/).required()
        }
    }
};