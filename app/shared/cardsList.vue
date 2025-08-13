<template>
	<v-container class="pa-16">
		<div class="text-center">
			<v-menu open-on-hover>
				<template v-slot:activator="{ props }">
					<v-btn color="primary" v-bind="props">
						{{ selectedYear === 'Remove' || selectedYear === '' ? 'Select Year' : selectedYear }}
					</v-btn>
				</template>

				<v-list>
					<v-list-item
						v-for="(item, index) in years"
						:key="index"
						@click="selectedYear = item === 'Remove' ? '' : item"
					>
						<v-list-item-title>{{ item }}</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>

			<v-menu open-on-hover>
				<template v-slot:activator="{ props }">
					<v-btn color="primary" v-bind="props">
						{{ selectedSort === '' ? 'Asc' : selectedSort }}
					</v-btn>
				</template>

				<v-list>
					<v-list-item
						v-for="(item, index) in sort"
						:key="index"
						@click="selectedSort = item"
						:disabled="
							(selectedSort === '' && item === 'Asc') ||
							(selectedSort === 'Asc' && item === 'Asc') ||
							(selectedSort === 'Desc' && item === 'Desc')
						"
					>
						<v-list-item-title>{{ item }}</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
		</div>

		<div v-if="pageItems.length === 0" class="text-center my-8">
			<p>No Information found</p>
		</div>
		<v-row v-else align="start" no-gutters>
			<v-col v-for="item in pageItems" :key="item.id" cols="12" sm="4" class="pa-2 mb-4">
				<slot :item="item" />
			</v-col>
		</v-row>
		<v-pagination v-model="page" :length="totalpages" :total-visible="5" rounded="circle" />
	</v-container>
</template>

<script lang="ts" setup>
import paginationPages from '~/shared/pagination'

const selectedYear = ref('')
const selectedSort = ref('')
const years: string[] = []
const sort: string[] = ['Asc', 'Desc']
const props = defineProps<{ items?: any[] }>()
const page = ref(1)
const totalpages = ref(1)
const pageItems = ref<any[]>([])

// Decrement for Years
for (let i = 2025; i >= 2001; i--) {
	years.push(i.toString())
}

//Pagination
function updatePagination(year: string, sort: string) {
	const { page: p, totalpages: t, pageItems: items } = paginationPages(props.items ?? [], year, sort)
	page.value = p.value
	totalpages.value = t.value
	pageItems.value = items.value
}

updatePagination(selectedYear.value, selectedSort.value)

// Year Input & Sort
watch([selectedYear, selectedSort], ([newYear, newSort]) => {
	updatePagination(newYear, newSort)
	if (newYear !== '') {
		if (!years.includes('Remove')) {
			years.unshift('Remove')
		}
	} else {
		const index = years.indexOf('Remove')
		if (index !== -1) {
			years.splice(index, 1)
		}
	}
})
</script>
