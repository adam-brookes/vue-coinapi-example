<template>
  <div>
    <md-table v-model="paginatedUsers" md-card md-sort="name" md-sort-order="asc">
      <md-table-toolbar>
        <h1 class="md-title">Users</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Gender">{{ item.gender }}</md-table-cell>
        <md-table-cell md-label="Job Title">{{ item.title }}</md-table-cell>
      </md-table-row>
    </md-table>

    <table-paging
        :md-page-size="20"
        :md-page-options="[1,2,3,4,5,6, 20]"
        :md-update="updatePagination"
        :md-data="users"
        :md-paginated-data.sync="paginatedUsers"></table-paging>

  </div>
</template>

<script>
import TablePaging from "@/components/TablePaging";

export default {
  name: 'TablePagination',
  components: {TablePaging},
  data: () => ({
    users: [
      {
        id: 1,
        name: "Shawna Dubbin",
        email: "sdubbin0@geocities.com",
        gender: "Male",
        title: "Assistant Media Planner"
      },
      {
        id: 2,
        name: "Odette Demageard",
        email: "odemageard1@spotify.com",
        gender: "Female",
        title: "Account Coordinator"
      },
      {
        id: 3,
        name: "Vera Taleworth",
        email: "vtaleworth2@google.ca",
        gender: "Male",
        title: "Community Outreach Specialist"
      },
      {
        id: 4,
        name: "Lonnie Izkovitz",
        email: "lizkovitz3@youtu.be",
        gender: "Female",
        title: "Operator"
      },
      {
        id: 5,
        name: "Thatcher Stave",
        email: "tstave4@reference.com",
        gender: "Male",
        title: "Software Test Engineer III"
      },
      {
        id: 7,
        name: "Thatcher Stave",
        email: "tstave4@reference.com",
        gender: "Male",
        title: "Software Test Engineer III"
      },
      {
        id: 8,
        name: "Thatcher Stave",
        email: "tstave4@reference.com",
        gender: "Male",
        title: "Software Test Engineer III"
      },
      {
        id: 9,
        name: "Thatcher Stave",
        email: "tstave4@reference.com",
        gender: "Male",
        title: "Software Test Engineer III"
      },
      {
        id: 10,
        name: "Thatcher Stave",
        email: "tstave4@reference.com",
        gender: "Male",
        title: "Software Test Engineer III"
      },
    ],
    paginatedUsers: [],
  }),
  methods: {
    updatePagination (page, pageSize) {
      debugger;
      
      console.log('pagination has updated', page, pageSize);
    }
  },
}
</script>

<style lang="scss" scoped>
.md-table + .md-table {
  margin-top: 16px
}
</style>