<template>
  <div>
    <md-dialog :md-fullscreen="true" :md-active="showDialog">
      <md-dialog-title>Preferences</md-dialog-title>

      <crypto-selection-table :assets="assets"></crypto-selection-table>

      <md-divider></md-divider>

      <!--      <div class="md-layout md-gutter">-->
      <!--        <div class="md-layout-item md-small-size-100">-->
      <!--          <md-field>-->
      <!--            <label for="quanity"></label>-->
      <!--            <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.firstName" :disabled="sending" />-->
      <!--            <span class="md-error" v-if="!$v.form.firstName.required">The first name is required</span>-->
      <!--            <span class="md-error" v-else-if="!$v.form.firstName.minlength">Invalid first name</span>-->
      <!--          </md-field>-->
      <!--        </div>-->

      <!--        <div class="md-layout-item md-small-size-100">-->
      <!--          <md-field :class="getValidationClass('lastName')">-->
      <!--            <label for="last-name">Last Name</label>-->
      <!--            <md-input name="last-name" id="last-name" autocomplete="family-name" v-model="form.lastName" :disabled="sending" />-->
      <!--            <span class="md-error" v-if="!$v.form.lastName.required">The last name is required</span>-->
      <!--            <span class="md-error" v-else-if="!$v.form.lastName.minlength">Invalid last name</span>-->
      <!--          </md-field>-->
      <!--        </div>-->
      <!--      </div>-->

      <!--      <div class="md-layout md-gutter">-->
      <!--        <div class="md-layout-item md-small-size-100">-->
      <!--          <md-field :class="getValidationClass('gender')">-->
      <!--            <label for="gender">Gender</label>-->
      <!--            <md-select name="gender" id="gender" v-model="form.gender" md-dense :disabled="sending">-->
      <!--              <md-option></md-option>-->
      <!--              <md-option value="M">M</md-option>-->
      <!--              <md-option value="F">F</md-option>-->
      <!--            </md-select>-->
      <!--            <span class="md-error">The gender is required</span>-->
      <!--          </md-field>-->
      <!--        </div>-->
      <!--      -->
      <!--      <md-dialog-actions>-->
      <!--        <md-button class="md-primary" @click="showDialog = false">Close</md-button>-->
      <!--        <md-button class="md-primary" @click="showDialog = false">Save</md-button>-->
      <!--      </md-dialog-actions>-->
    </md-dialog>
  </div>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue';
import {Asset} from "@/coin-api/coin-api-models";
import CryptoSelectionTable from "@/components/CryptoSelectionTable.vue";
import {SelectedCrypto} from "@/models/selected-crypto";

interface CryptoDialogModel {
  selectedCrypto: SelectedCrypto;
}

export default Vue.extend({
  name: 'CryptoSelectionDialog',
  props: {
    showDialog: Boolean,
    assets: Array as PropType<Asset[]>,
    editingSelectedCrypto: Object as PropType<SelectedCrypto>
  },
  components: {
    CryptoSelectionTable
  },
  data(): CryptoDialogModel {
    return {
      selectedCrypto: new SelectedCrypto()
    }
  },
  created() {

    // If we have passed in a crypto as a prop this means that we are editing and we need to 
    // update the current model.
    if (this.editingSelectedCrypto) {
      this.selectedCrypto.update(this.editingSelectedCrypto);
    }
  },
  methods: {}
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.md-dialog {
  width: 90%;
}
</style>
