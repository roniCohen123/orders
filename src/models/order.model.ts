import {Properties as Prop} from "../shared/properties";
import {CustomerModel} from "./customer.model";
import {AbstractJsonModel} from "./abstract-json.model";

export class OrderModel extends AbstractJsonModel{
    protected _customer: CustomerModel = new CustomerModel();
    protected _orderDetails: String = "some title";
    private _companyId: number;
    private _customerId: number;

    // Expected template
    public static readonly TEMPLATE: String = `Expected template: {name(length:${Prop.MIN_NAME_LEN}-${Prop.MAX_NAME_LEN}),\
    cellNumber(max length:${Prop.CELL_NUMBER_LEN}, only numbers),\
    address(length:${Prop.MIN_ADDRESS_LEN}-${Prop.MAX_ADDRESS_LEN}),\
    orderDetails(length:${Prop.MIN_DETAILS_LEN}-${Prop.MAX_DETAILS_LEN})}`;

    constructor(){
        super();
    }

    /**
     * Convert a json property to OrderModel
     */
    public fromJson(json: any): void{
        this.companyId = json.company_id;
        this.customerId = json.customer_id;
       // this.orderDetails = json.orderDetails;
    }

    public toJson(): string{
      //  return `{"title":"Generic Title","external_id":"14080283","scheduled_at":"2017-10-31T12:00:00-5",`+
        //       `"customer":${this.customer.toJson()}}`;
        return `{"company_id":11010,"customer_id":14083302,"title":"${this.orderDetails}"}`
    }

    public get orderDetails(): String{
        if (!this._orderDetails) return Prop.NULL_STRING_VALUE;

        return this._orderDetails;
    }

    public set orderDetails(details: String){
        if ((details != null) && (details.length <= Prop.MAX_DETAILS_LEN) && (details.length >= Prop.MIN_DETAILS_LEN)) {
            this._orderDetails = details;
        }
    }


    get customer(): CustomerModel {
        return this._customer;
    }

    set customer(value: CustomerModel) {
        this._customer = value;
    }

    public set name(name: String){
        this.customer.name = name;
    }

    public get name(){
        return this.customer.name;
    }

    public get cellNumber(): String{
        return this.customer.cellNumber;
    }

    public set cellNumber(cellNumber: String) {
        this.customer.cellNumber = cellNumber;
    }

    public get address(): String {
        return this.customer.address;
    }

    public set address(address: String){
        this.customer.address = address;
    }

    get companyId(): number {
        return this._companyId;
    }

    set companyId(companyId: number) {
        if (companyId == undefined) this._companyId = Prop.NULL_NUMBER_VALUE;

        this._companyId = companyId;
    }

    get customerId(): number {
        return this._customerId;
    }

    set customerId(customerId: number) {
        if (customerId == undefined) this._customerId = Prop.NULL_NUMBER_VALUE;

        this._customerId = customerId;
    }

    public isValid(): boolean{
        return (!!this._orderDetails) && (this.companyId != Prop.NULL_NUMBER_VALUE) &&
               (this.customerId != Prop.NULL_NUMBER_VALUE);
    }
}