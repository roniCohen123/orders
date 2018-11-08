import {Properties as Prop} from "../shared/properties";
import {AbstractJsonModel} from "./abstract-json.model";

export class CustomerModel extends AbstractJsonModel{
    protected m_name: String;
    protected m_cellNumber: String;
    protected m_address: String;

    // Expected template
    public static readonly TEMPLATE: String =
        `Expected template: {name(length:${Prop.MIN_NAME_LEN}-${Prop.MAX_NAME_LEN}),`+
        `cellNumber(max length:${Prop.CELL_NUMBER_LEN}, only numbers),`+
        `address(length:${Prop.MIN_ADDRESS_LEN}-${Prop.MAX_ADDRESS_LEN})}`;

    constructor(){
        super();
    }

    public toJson(): string{
        return `{"name":"${this.name}","address":"${this.address}","phone":"${this.cellNumber}"}`;
    }

    public fromJson(json: any): void{
        this.name = json.name;
        this.address = json.address;
        this.cellNumber = json.cellNumber;
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

    /**
     * Check validation of all the fields
     *
     */
    public isValid(): boolean{
        return (!!this.m_address) && (!!this.m_cellNumber) && (!!this.m_name);
    }

}