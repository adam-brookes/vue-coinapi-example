<template>
  <div class="about">
    <h1>Configure Cypto Here</h1>
    <md-progress-spinner v-if="loading" :md-diameter="100" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>
    <div v-if="!loading" class="md-layout md-gutter">
      <div class="md-layout-item">
        <md-field>
          <label for="assets">Assets</label>
          <!-- TODO: Rethink if a dropdown is the best way to display this information -->
          <md-select
            v-model="selectedAsset"
            name="assets"
            id="assets"
            md-dense
          >
            <md-option
              :value="asset.asset_id"
              v-for="(asset, index) of assets"
              :key="index"
              >{{ asset.name }}</md-option
            >
          </md-select>
        </md-field>
      </div>
    </div>
    <div v-if="selectedAsset">
      {{selectedAsset.asset_id}}
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import CoinApiClient from "@/coin-api/coin-api-client";
import { Asset } from "@/coin-api/coin-api-models";

interface ConfigureCyptoModel {
  client: CoinApiClient;
  assets: Array<Asset>;
  selectedAsset: Asset | null;
  loading: boolean;
}

export default Vue.extend({
  name: "ConfigureCyptoView",
  data(): ConfigureCyptoModel {
    return {
      client: new CoinApiClient("F0D169E0-F382-437E-9FBF-C69C474EFACD"),
      assets: [],
      selectedAsset: null,
      loading: false
    };
  },
  components: {},
  mounted() {
    debugger;
    this.client.listAssets().then((result: Array<Asset>) => {
      this.asset = result;
      this.loading = false;
    });
  },
});
</script>
