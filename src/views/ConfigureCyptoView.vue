<template>
  <div class="about">
    <crypto-selection-dialog @cancel="showDialog = false" 
                             @save="onCryptoSaved" 
                             :show-dialog="showDialog"
                             :assets="assets">
    </crypto-selection-dialog>
    <md-button @click="showDialog = !showDialog">Show Dialog</md-button>
    <div v-if="loading && assets.length">
      {{ showDialog }}
      <md-button class="md-primary md-raised" @click="showDialog = !showDialog">Show Dialog</md-button>
    </div>

  </div>
</template>
<script lang="ts">
import Vue from "vue";
import CoinApiClient from "@/coin-api/coin-api-client";
import {Asset} from "@/coin-api/coin-api-models";
import CryptoSelectionDialog from "@/components/CryptoSelectionDialog.vue";
import {SelectedCrypto} from "@/models/selected-crypto";

interface ConfigureCyptoModel {
  client: CoinApiClient;
  assets: Array<Asset>;
  searched: Array<Asset>
  selectedAsset: Asset | null;
  loading: boolean;
  searchTerm: string;
  showDialog: boolean;
}

export default Vue.extend({
  name: "ConfigureCyptoView",
  data(): ConfigureCyptoModel {
    return {
      client: new CoinApiClient("F0D169E0-F382-437E-9FBF-C69C474EFACD", true),
      assets: [],
      selectedAsset: null,
      loading: true,
      searched: [],
      searchTerm: "",
      showDialog: false
    };
  },
  components: {CryptoSelectionDialog},
  mounted() {
    this.loading = false;
    this.client.listAssets().then((result: Array<Asset>) => {
      this.assets = result;
      this.searched = this.assets;
      this.loading = false;
    });
  },
  methods: {
    searchOnTable() {
      this.searched = this.assets.filter((asset) =>
          asset.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    },
    onCryptoSaved(item: SelectedCrypto) {
      console.log(item.crypto.name);
    }
  }
});
</script>
