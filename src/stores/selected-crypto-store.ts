import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import {Asset} from "@/coin-api/coin-api-models";
import {SelectedCrypto} from "@/models/selected-crypto";

interface SelectedCryptoStoreModel {
    cryptos: Array<Asset>
}

export const SelectedCryptoStore = defineStore('selected-crypto-store', {
    // arrow function recommended for full type inference
    state: () => ({
        cryptos: useStorage('selected-crypto', [])
    }),
    getters: {
        getAll(): Array<Asset> {
            return this.cryptos;
        },
        isEmpty(): boolean {
            return this.cryptos.length <= 0
        }
    },
    actions: {
        addCrypto(item: SelectedCrypto) {
            this.cryptos.push(item);
        },
        removeCrypto(item: SelectedCrypto) {
            this.cryptos.splice(item, 1)
        }
    },
})