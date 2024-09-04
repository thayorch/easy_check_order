<template>
  <div class="bg-">
    <v-text-field
            v-model="search"
            class="ma-2 text-"
            density="compact"
            placeholder="Search ID"
            hide-details
  ></v-text-field>

  </div>

  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="filteredItems"
    :items-length="totalItems"
    :loading="loading"
    :search="search"
    @update:options="loadItems"
  >
    <template v-slot:item.status="{ item }">
      <v-btn
        :color="item._status ? 'green' : 'red'"
        small
        fixed
      >
        {{ item._status ? "Active" : "Inactive" }}
      </v-btn>
    </template>

    <template v-slot:thead>
      <tr>
        <td>

        </td>
      </tr>
    </template>
  </v-data-table-server>
</template>

<script lang="ts">
import axios from "axios";

export default {
  data: () => ({
    itemsPerPage: 10,
    headers: [
      { title: "Students ID", align: "start", sortable: false, key: "id" },
      { title: "Name", key: "name", align: "start" },
      { title: "Status", key: "status", align: "start" },
      { title: "Timestamp", key: "TIMESTAMP", align: "start" },
    ],
    serverItems: [],
    filteredItems: [],
    loading: true,
    totalItems: 0,
    search: "",
  }),

  watch: {
    search() {
      this.filterItems();
    },
  },

  methods: {
    async loadItems({ page, itemsPerPage }) {
      this.loading = true;
      try {
        const response = await axios.get('http://localhost:3000/logs', {
          params: {
            page,
            itemsPerPage,
            search: this.search,
          },
        });
        this.serverItems = response.data.reverse();
        this.totalItems = response.data.length;
        this.filterItems(); // Apply filtering after loading
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        this.loading = false;
      }
    },

    filterItems() {
      if (!this.search) {
        this.filteredItems = this.serverItems;
      } else {
        this.filteredItems = this.serverItems.filter(item =>
          Object.values(item).some(value =>
            String(value).toLowerCase().includes(this.search.toLowerCase())
          )
        );
      }
    },

  },

  mounted() {
    this.loadItems({ page: 1, itemsPerPage: this.itemsPerPage });
  },
};
</script>
