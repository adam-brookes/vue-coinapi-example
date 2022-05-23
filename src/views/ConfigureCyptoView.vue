<template>
  <div class="about">
    <crypto-selection-dialog @cancel="showDialog = false"
                             @save="onCryptoSaved"
                             :editing-selected-crypto="editingAsset"
                             :show-dialog="showDialog"  
                             :assets="assets">
    </crypto-selection-dialog>

    <md-table v-model="selectedAssets" md-card md-fixed-header>
      <md-table-toolbar>
        <h1 class="md-title">My Crypto</h1>
        <md-button class="md-primary md-raised" @click="addNewItem()">Add Crypto</md-button>
      </md-table-toolbar>

      <md-table-empty-state
          md-label="No Crypto Added"
          :md-description="`Please Add Crypto to your portfolio by pressing the button in the top right`">
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name">{{ item.crypto.name }}</md-table-cell>
        <md-table-cell md-label="Quantity">{{ item.quantity }}</md-table-cell>
        <md-table-cell md-label="Price Brought ($)">${{ item.priceBought | toCurrency }}</md-table-cell>
        <md-table-cell md-label="Date Bought">{{ item.dateBought | date }}</md-table-cell>
        <md-table-cell md-label="Bought Value">{{ item.dateBought | date }}</md-table-cell>
        <md-table-cell md-label="Actions"> 
          <md-button @click="editItem(item)" class="md-fab md-mini md-primary">
            <md-icon>edit</md-icon>
          </md-button>
          <md-button @click="removeItem(item)" class="md-fab md-mini md-plain">
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import CoinApiClient from "@/coin-api/coin-api-client";
import {Asset} from "@/coin-api/coin-api-models";
import CryptoSelectionDialog from "@/components/CryptoSelectionDialog.vue";
import {SelectedCrypto} from "@/models/selected-crypto";
import {SelectedCryptoStore} from "@/stores/selected-crypto-store";

interface ConfigureCryptoModel {
  client: CoinApiClient;
  assets: Array<Asset>;
  editingAsset: Asset | null;
  loading: boolean;
  showDialog: boolean;
}

export default Vue.extend({
  name: "ConfigureCyptoView",
  data(): ConfigureCryptoModel {
    return {
      client: new CoinApiClient( true),
      editingAsset: null,
      assets: [],
      loading: true,
      showDialog: false
    };
  },
  setup() {
    const store = SelectedCryptoStore();

    return {store};
  },
  components: {CryptoSelectionDialog},
  computed: {
    selectedAssets(): Array<SelectedCrypto> {
      return this.store.getAll;
    }
  },
  mounted() {
    this.loading = false;
    this.client.listAssets().then((result: Array<Asset>) => {
      this.assets = result;
      this.loading = false;
    });
  },
  methods: {
    addNewItem() {
      this.editingAsset = null;
      this.showDialog = true;
    },
    editItem(item: SelectedCrypto) {
      this.editingAsset = item;
      this.showDialog = true;
    },
    onCryptoSaved(item: SelectedCrypto) {
      console.log(item.crypto.name);
      this.store.addCrypto(item);

      this.showDialog = false;
    },
    removeItem(item: SelectedCrypto) {
      this.store.removeCrypto(item);
    }
  }
});
</script>
