<template>
  <div v-if="searchedAssets.length" class="hello">
    <md-table v-model="paginatedAssets" md-card md-fixed-header
              @md-selected="onSelect">
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Cypro Currencies</h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search by name..." v-model="searchTerm" @input="searchOnTable"/>
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state
          md-label="No Cryptos found"
          :md-description="`No Cryptos found with the name '${searchTerm}'.`">
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
        <!--          <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>-->
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Price Usd" md-sort-by="price_usd">{{ item.price_usd | toCurrency }}</md-table-cell>
        <!--          <md-table-cell md-label="Gender" md-sort-by="gender">{{ item.gender }}</md-table-cell>-->
        <!--          <md-table-cell md-label="Job Title" md-sort-by="title">{{ item.title }}</md-table-cell>-->
      </md-table-row>
    </md-table>
    <table-paging
        :md-page-size="20"
        :md-page-options="[20, 30, 40, 50]"
        :md-update="updatePagination"
        :md-data="searchedAssets"
        :md-paginated-data.sync="paginatedAssets"></table-paging>
  </div>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue';
import {Asset} from "@/coin-api/coin-api-models";
import TablePaging from "@/components/TablePaging.vue"

interface CryptoSelectionTableModel {
  searchedAssets: Array<Asset>,
  paginatedAssets: Array<Asset>
  searchTerm: string;
  selectedAsset: Asset;
}

export default Vue.extend({
  name: 'CryptoSelectionTable',
  components: {TablePaging},
  props: {
    assets: Array as PropType<Asset[]>,
    selection: Object as PropType<Asset | null>
  },
  data(): CryptoSelectionTableModel {
    return {
      searchedAssets: [],
      searchTerm: "",
      selectedAsset: null,
      paginatedAssets: []
    }
  },
  created() {
    this.searchedAssets = this.assets;
    if (this.selection) {

      // TODO: Might need to do a deep copy this.
      this.selectedAsset = this.selection;
    }
  },
  methods: {
    searchOnTable() {
      this.searchedAssets = this.assets.filter((asset) =>
          asset.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    },
    onSelect(item: Asset) {
      this.selectedAsset = item;
    },
    updatePagination (page, pageSize, sort, sortOrder) {
      debugger;

      console.log('pagination has updated', page, pageSize, sort, sortOrder);
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
