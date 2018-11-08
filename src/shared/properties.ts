/**
 * Holds all the constant properties for the application
 *
 */
export class Properties {
    // Parameter validation
    public static readonly MAX_NAME_LEN: number = 50;
    public static readonly MIN_NAME_LEN: number = 2;
    public static readonly MAX_PHONE_LEN: number = 10;
    public static readonly CELL_NUMBER_LEN: number = 10;
    public static readonly MAX_ADDRESS_LEN: number = 100;
    public static readonly MIN_ADDRESS_LEN: number = 5;
    public static readonly MAX_TITLE_LEN: number = 300;
    public static readonly MIN_TITLE_LEN: number = 5;
    public static readonly NULL_STRING_VALUE: String = "";
    public static readonly NULL_NUMBER_VALUE: number = -1;

    // Properties for bringg's API
    public static readonly TOKEN = "ZtWsDxzfTTkGnnsjp8yC";
    public static readonly KEY = "V_-es-3JD82YyiNdzot7";
    public static readonly CUSTOMERS_URL = "https://developer-api.bringg.com/partner_api/customers/";
    public static readonly ORDERS_URL = "https://developer-api.bringg.com/partner_api/tasks/";
    public static readonly CUSTOMER_BY_PHONE_URL = "'https://developer-api.bringg.com/partner_api/customers/phone/";

    public static readonly PORT = "3001";
}