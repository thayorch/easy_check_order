<template>
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="serverItems"
    :items-length="totalItems"
    :loading="loading"
    :search="search"
    item-value="id"
    @update:options="loadItems"
  >
    <template v-slot:item.status="{ item }">
      <v-btn
        :color="item._status ? 'green' : 'red'"
        small
        @click="toggleStatus(item)"
      >
        {{ item._status ? "Active" : "Inactive" }}
      </v-btn>
    </template>

    <template v-slot:tfoot>
      <tr>
        <td>
          <v-text-field
            v-model="id"
            class="ma-2"
            density="compact"
            placeholder="Search ID"
            hide-details
          ></v-text-field>
        </td>
      </tr>
    </template>
  </v-data-table-server>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    itemsPerPage: 10,
    headers: [
      { title: "Students ID", align: "start", sortable: false, key: "id" },
      { title: "Name", key: "name", align: "end" },
      { title: "Shirt", key: "shirt", align: "end" },
      { title: "Polo", key: "polo", align: "end" },
      { title: "Status", key: "status", align: "end" },
    ],
    serverItems: [],
    loading: true,
    totalItems: 0,
    search: "",
  }),
  methods: {
    async loadItems({ page, itemsPerPage }) {
      this.loading = true;
      try {
        const response = await axios.get("http://localhost:3000/students");
        this.serverItems = response.data.slice(
          (page - 1) * itemsPerPage,
          page * itemsPerPage
        );
        this.totalItems = response.data.length;
        this.loading = false;
      } catch (error) {
        console.error("Error fetching students:", error);
        this.loading = false;
      }
    },
    async toggleStatus(item) {
      try {
        await axios.put(`http://localhost:3000/students/${item.id}/status`, {
          status: !item._status,
        });
        item._status = !item._status;
      } catch (error) {
        console.error("Error updating status:", error);
      }
    },
  },
};
</script>
