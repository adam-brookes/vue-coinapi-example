<template>
  <div class="about">
      <crypto-selection-dialog :show-dialog="showDialog" :assets="assets"></crypto-selection-dialog>
      <md-button @click="showDialog = !showDialog">Show Dialog</md-button>
      <div v-if="loading && assets.length">
        {{showDialog}}
        <md-button class="md-primary md-raised" @click="showDialog = !showDialog">Show Dialog</md-button>
      </div>
<!--    <md-card>-->
<!--      <h1>Configure Cypto Here</h1>-->
<!--      <md-progress-spinner v-if="loading" :md-diameter="100" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>-->
<!--      <div v-if="!loading && assets.length">-->
<!--        <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>-->
<!--          <md-table-toolbar>-->
<!--            <div class="md-toolbar-section-start">-->
<!--              <h1 class="md-title">Cypro Currencies</h1>-->
<!--            </div>-->

<!--            <md-field md-clearable class="md-toolbar-section-end">-->
<!--              <md-input placeholder="Search by name..." v-model="searchTerm" @input="searchOnTable" />-->
<!--            </md-field>-->
<!--          </md-table-toolbar>-->

<!--          <md-table-empty-state-->
<!--              md-label="No users found"-->
<!--              :md-description="`No user found for this '${searchTerm}' query. Try a different search term or create a new user.`">-->
<!--          </md-table-empty-state>-->

<!--          <md-table-row slot="md-table-row" slot-scope="{ item }">-->
<!--            &lt;!&ndash;          <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>&ndash;&gt;-->
<!--            <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>-->
<!--            <md-table-cell md-label="Price Usd" md-sort-by="price_usd">{{ item.price_usd | toCurrency }}</md-table-cell>-->
<!--            &lt;!&ndash;          <md-table-cell md-label="Gender" md-sort-by="gender">{{ item.gender }}</md-table-cell>&ndash;&gt;-->
<!--            &lt;!&ndash;          <md-table-cell md-label="Job Title" md-sort-by="title">{{ item.title }}</md-table-cell>&ndash;&gt;-->
<!--          </md-table-row>-->
<!--        </md-table>-->
<!--        <md-divider></md-divider>-->
<!--        -->
<!--      </div>-->
<!--    </md-card>-->
    <div v-if="!loading" class="md-layout md-gutter">
<!--      <div class="md-layout-item">-->
<!--        <md-field>-->
<!--          <label for="assets">Assets</label>-->
<!--          &lt;!&ndash; TODO: Rethink if a dropdown is the best way to display this information &ndash;&gt;-->
<!--          <md-select-->
<!--            v-model="selectedAsset"-->
<!--            name="assets"-->
<!--            id="assets"-->
<!--            md-dense-->
<!--          >-->
<!--            <md-option-->
<!--              :value="asset.asset_id"-->
<!--              v-for="(asset, index) of assets"-->
<!--              :key="index"-->
<!--              >{{ asset.name }}</md-option-->
<!--            >-->
<!--          </md-select>-->
<!--        </md-field>-->
<!--      </div>-->
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import CoinApiClient from "@/coin-api/coin-api-client";
import { Asset } from "@/coin-api/coin-api-models";
import CryptoSelectionDialog from "@/components/CryptoSelectionDialog.vue";

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
  }
});
</script>
