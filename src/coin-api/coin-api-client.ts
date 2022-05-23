import axios from 'axios'
import { Asset, Exchange, CyptoSymbol } from "@/coin-api/coin-api-models";

export default class CoinApiClient {

    // Change the key here depending on your 
    private readonly apiKey = "F0D169E0-F382-437E-9FBF-C69C474EFACD";
    private readonly useLocalJson: boolean;

    private readonly authenticationHeader = {
        "X-CoinAPI-Key": this.apiKey
    };

    private readonly apiAddress = "https://rest.coinapi.io/v1";

    constructor(useLocalJson: boolean) {
        this.useLocalJson = useLocalJson;
    }

    listExchanges(): Promise<Exchange[]> {
        if(this.useLocalJson) {
            throw new Error("No local json file saved for testing...");
        }
        
        const path = this.apiAddress + "/exchanges";

        return axios.get(path, { headers: this.authenticationHeader })
            .then(resp => {
                return resp.data as Exchange[]
            })
    }

    symbols(): Promise<Array<CyptoSymbol>> {
        
        if(this.useLocalJson) {
            throw new Error("No local json file saved for testing...");
        }
        
        const path = this.apiAddress + "/symbols";

        return axios.get(path, { headers: this.authenticationHeader })
            .then(resp => {
                return resp.data as CyptoSymbol[]
            })
    }

    listAssets(): Promise<Array<Asset>> {
        let path = this.apiAddress + "/assets";

        if(this.useLocalJson) {
            path =  `${window.location.origin}/json/assets.json`;
        }
        
        return axios.get(path, { headers: this.authenticationHeader })
            .then(resp => {
                return (resp.data as Asset[]).filter(asset => asset.type_is_crypto && asset.volume_1day_usd > 0 && asset.volume_1hrs_usd > 0);
            })
    }
}