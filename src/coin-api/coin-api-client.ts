import axios from 'axios'
import { Asset, Exchange, CyptoSymbol } from "@/coin-api/coin-api-models";

export default class CoinApiClient {

    private readonly apiKey: string;
    private readonly useLocalJson: boolean;

    private readonly authenticationHeader = {
        "X-CoinAPI-Key": ""
    };

    private readonly apiAddress = "https://rest.coinapi.io/v1";

    constructor(apiKey: string, useLocalJson: boolean ) {
        this.apiKey = apiKey;
        this.useLocalJson = useLocalJson;
        this.authenticationHeader["X-CoinAPI-Key"] = this.apiKey;
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