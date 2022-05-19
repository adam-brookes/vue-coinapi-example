import {Asset} from "@/coin-api/coin-api-models";

export class SelectedCrypto {
    crypto: Asset;
    priceBought: number;
    quantity: number;
    dateBought: Date;
    
    constructor() {
        this.quantity = null;
        this.crypto = null;
        this.priceBought = null;
        this.dateBought = null;
    }
    
    update (item: SelectedCrypto) {
        this.crypto = item.crypto;
        this.priceBought = item.priceBought;
        this.quantity = item.quantity;
        this.dateBought = item.dateBought;
    }
}