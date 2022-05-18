<template>
    <div id="app" class="page-container">
      <md-app md-mode="reveal">
        <md-app-toolbar class="md-primary">
          <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
            <md-icon>menu</md-icon>
          </md-button>
          <span class="md-title">My App</span>
        </md-app-toolbar>

        <md-app-drawer :md-active.sync="menuVisible">
<!--          <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>-->
          <md-list>
            <md-list-item>
                <md-icon>home</md-icon>
                <span class="md-list-item-text">
                 <router-link to="/">Home</router-link>
                </span>
            </md-list-item>
            <md-list-item>
              
              <md-icon>currency_bitcoin</md-icon>
                <span class="md-list-item-text">
                  <router-link to="/configure-crypto">Configure</router-link>
              </span>

            </md-list-item>
          </md-list>
        </md-app-drawer>

        <md-app-content>
         <router-view/>
        </md-app-content>
      </md-app>
    </div>
  </template>

<script lang="ts">
  import Vue from 'vue';  
  export default Vue.extend({
    name: 'App',
    components: {
    },
    data: () => ({
      menuVisible: false
    })
  });
</script>

<style lang="scss" scoped>
  .md-app {
    max-height: 100%;
    min-height: 100%;
    border: 1px solid rgba(#000, .12);
  }
  
  // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
</style>
