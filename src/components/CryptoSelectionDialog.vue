<template>
  <div>
    <md-dialog :md-fullscreen="true" :md-active="showDialog">
      <md-dialog-content>
        <md-dialog-title>Add/Edit Crpyto</md-dialog-title>

        <crypto-selection-table v-if="!selectedCrypto.crypto" class="table-padding-top" @crypto-selected="cryptoSelected"
                                :assets="assets"></crypto-selection-table>

        <md-divider></md-divider>
        
        <form v-if="selectedCrypto.crypto" novalidate class="md-layout" @submit.prevent="validate">
          
          <div class="md-layout-item md-large-size-100">
            <md-field>
              <label for="crypto">Crypto Coin</label>
              <md-input :disabled="true" name="crypto" id="crypto" autocomplete="crypto" :value="selectedCrypto.crypto.name"/>
              <md-button @click="reset()" class="md-fab md-mini md-plain">
                <md-icon>edit</md-icon>
              </md-button>
            </md-field>
          </div>
          
            <div class="md-layout-item md-large-size-100">
              <md-field :class="getValidationClass('quantity')">
                <label for="quantity">Quantity</label>
                <md-input name="quantity" id="quantity" autocomplete="Quantity" v-model="form.quantity"/>
                <span class="md-error"  v-if="fieldIsInValid('quantity')">Quantity is required</span>
              </md-field>
            </div>

            <div class="md-layout-item md-large-size-100">
              <md-field :class="getValidationClass('priceBought')">
                <label for="price-bought">Price Bought</label>
                <md-input name="price-bought" id="price-bought" autocomplete="Price Bought"
                          v-model="form.priceBought"/>
                <span class="md-error" v-if="fieldIsInValid('priceBought')">Price Bought is required</span>
              </md-field>
            </div>
            <div class="md-layout-item md-large-size-100">
              <md-datepicker :class="getValidationClass('dateBought')" v-model="form.dateBought">
                <label>Date Bought</label>
                <span class="md-error" v-if="fieldIsInValid('dateBought')">Date Bought is required</span>
              </md-datepicker>
            </div>
        </form>
      </md-dialog-content>


      <md-dialog-actions>
        <md-button class="md-dense md-raised md-accent" type="button" @click="onCancel()">Cancel</md-button>
        <md-button class="md-dense md-raised md-primary" type="button" @click="validate()">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue';
import {Asset} from "@/coin-api/coin-api-models";
import CryptoSelectionTable from "@/components/CryptoSelectionTable.vue";
import {SelectedCrypto} from "@/models/selected-crypto";
import {
  required
} from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';


interface CryptoDialogModel {
  selectedCrypto: SelectedCrypto;
  form: any;
}

export default {
  name: 'CryptoSelectionDialog',
  props: {
    showDialog: Boolean,
    assets: Array as PropType<Asset[]>,
    editingSelectedCrypto: Object as PropType<SelectedCrypto>
  },
  components: {
    CryptoSelectionTable
  },  
  setup: () => ({ $v: useVuelidate() }),
  created() {
    // If we have passed in a crypto as a prop this means that we are editing and we need to 
    // update the current model.
    if (this.editingSelectedCrypto) {
      this.selectedCrypto.update(this.editingSelectedCrypto);
    } else {
      this.editingSelectedCrypto = new SelectedCrypto();
    }
  },
  data(): CryptoDialogModel {
    return {
      selectedCrypto: new SelectedCrypto(),
      form: {
        quantity: null,
        priceBought: null,
        dateBought: null
      }
    }
  },
  validations: {
    form: {
      quantity: {
        required
      },
      priceBought: {
        required
      },
      dateBought: {
        required
      },
      email: {
        required
      }
    }
  },
  methods: {
    cryptoSelected(item: Asset) {
      this.selectedCrypto.crypto = item;
    },
    onCancel() {
      this.$emit('cancel');
    },
    onSave() {
      this.$emit('save', this.selectedCrypto);
    },
    reset() {
      this.selectedCrypto.crypto = null;
    },
    validate () {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.selectedCrypto.dateBought = this.form.dateBought;
        this.selectedCrypto.quantity = this.form.quantity;
        this.selectedCrypto.priceBought = this.form.priceBought
        this.onSave();
      }
    },
    fieldIsInValid(fieldName: string): boolean {
      return this.$v.form[fieldName].$invalid;
    },
    getValidationClass(fieldName: string) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.md-dialog {
  width: 100%;
}

.md-dialog-container {
  height: 80%;
  width: 80%;
  border-radius: 10px;
  background: lightcyan;
  color: #039be5;
}

.table-padding-top {
  padding-top: 20px;
}
</style>
