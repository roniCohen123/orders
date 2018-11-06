import {Properties as Prop} from "../common/properties";

export class OrderModel{
    protected m_name: String;
    protected m_cellNumber: String;
    protected m_address: String;
    protected m_orderDetails: String;

    // Expected template
    public static readonly TEMPLATE: String = `Expected template: {name(length:${Prop.MIN_NAME_LEN}-${Prop.MAX_NAME_LEN}), 
    cellNumber(max length:${Prop.CELL_NUMBER_LEN}, only numbers),
    address(length:${Prop.MIN_ADDRESS_LEN}-${Prop.MAX_ADDRESS_LEN}),
    orderDetails(length:${Prop.MIN_DETAILS_LEN}-${Prop.MAX_DETAILS_LEN})}`;

    constructor(){}

    /**
     * Convert a json property to OrderModel
     *
     */
    public static fromJson(json: any): OrderModel{
        let order: OrderModel = new OrderModel();
        order.name = json.name;
        order.address = json.address;
        order.cellNumber = json.cellNumber;
        order.orderDetails = json.orderDetails;

        return order;
    }

    public toJson(): String{
        return `OrderModel: {"name" : '${this.name}', "address": '${this.address}',
                "cellNumber": '${this.cellNumber}', "orderDetails": '${this.orderDetails}'`;
    }

    public get name(): String{
        if (!this.m_name) return Prop.NULL_STRING_VALUE;

        return this.m_name;
    }

    public set name(name: String){
        if ((name != null) && (name.length <= Prop.MAX_NAME_LEN) && (name.length >= Prop.MIN_NAME_LEN)){
            this.m_name = name;
        }
    }

    public get cellNumber(): String{
        if (!this.m_cellNumber) return Prop.NULL_STRING_VALUE;

        return this.m_cellNumber;
    }

    public set cellNumber(cellNumber: String) {
        if ((cellNumber) && (cellNumber.match("[0-9]+")) &&
            (cellNumber.length == Prop.CELL_NUMBER_LEN)) {
            this.m_cellNumber = cellNumber;
        }
    }

    public get address(): String {
        if (!this.m_address) return Prop.NULL_STRING_VALUE;

        return this.m_address;
    }

    public set address(address: String){
        if ((address) && (address.length <= Prop.MAX_ADDRESS_LEN) && (address.length >= Prop.MIN_ADDRESS_LEN)) {
            this.m_address = address;
        }
    }

    public get orderDetails(): String{
        if (!this.m_orderDetails) return Prop.NULL_STRING_VALUE;

        return this.m_orderDetails;
    }

    public set orderDetails(details: String){
        if ((details != null) && (details.length <= Prop.MAX_DETAILS_LEN) && (details.length >= Prop.MIN_DETAILS_LEN)) {
            this.m_orderDetails = details;
        }
    }

    public isValid(): boolean{
        return (this.name.length > 0) && (this.cellNumber.length > 0) &&
               (this.address.length > 0) && (this.orderDetails.length > 0);
    }
}