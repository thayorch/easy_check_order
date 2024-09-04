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
      <v-btn :color="item.status ? 'green' : 'red'" @click="toggleStatus(item)">
        {{ item.status ? 'Active' : 'Inactive' }}
      </v-btn>
    </template>


    <template v-slot:tfoot>
      <tr>
        <td>
          <v-text-field v-model="id" class="ma-2" density="compact" placeholder="Search ID" hide-details></v-text-field>
        </td>
      </tr>
    </template>
  </v-data-table-server>
</template>



<script>
  const data = []

  const FakeAPI = {
    async fetch ({ page, itemsPerPage, sortBy, search }) {
      return new Promise(resolve => {
        setTimeout(() => {
          const start = (page - 1) * itemsPerPage
          const end = start + itemsPerPage
          const items = data.slice().filter(item => {
            if (search.id && !item.id.toLowerCase().includes(search.id.toLowerCase())) {
              return false
            }

            if (search.name && !(item.name >= Number(search.name))) {
              return false
            }

            return true
          })

          if (sortBy.length) {
            const sortKey = sortBy[0].key
            const sortOrder = sortBy[0].order
            items.sort((a, b) => {
              const aValue = a[sortKey]
              const bValue = b[sortKey]
              return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
            })
          }

          const paginated = items.slice(start, end)

          resolve({ items: paginated, total: items.length })
        }, 500)
      })
    },
  }

  export default {
    data: () => ({
      itemsPerPage: 5,
      headers: [
        {
          title: 'Students ID',
          align: 'start',
          sortable: false,
          key: 'id',
        },
        { title: 'Name', key: 'name', align: 'end' },
        { title: 'Shirt', key: 'shirt', align: 'end' },
        { title: 'Polo', key: 'polo', align: 'end' },
        { title: 'Status', key: 'status', align: 'center' },
      ],
      serverItems: [],
      loading: true,
      totalItems: 0,
      id: '',
      name: '',
      search: '',
    }),
    watch: {
      id () {
        this.search = String(Date.now())
      },
      name () {
        this.search = String(Date.now())
      },
    },
    methods: {
      loadItems ({ page, itemsPerPage, sortBy }) {
        this.loading = true
        FakeAPI.fetch({ page, itemsPerPage, sortBy, search: { id: this.id, name: this.name } }).then(({ items, total }) => {
          this.serverItems = items
          this.totalItems = total
          this.loading = false
        })
      },
      toggleStatus (item) {
        item.status = !item.status
        this.loadItems({ page: 1, itemsPerPage: this.itemsPerPage, sortBy: [] })
      },
    },
  }
</script>
