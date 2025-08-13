<template>
	<v-container class="pa-16">
		<navbar />

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

		<div v-if="loading" class="text-center my-8">
			<v-progress-circular indeterminate color="primary" size="50" />
		</div>

		<div
			v-else-if="!loading && pageItems.length === 0 && props.items.length > 0"
			class="text-center my-8"
		>
			<p>No Information found</p>
		</div>

		<v-row v-else align="start" no-gutters>
			<v-col v-for="item in pageItems" :key="item.id" cols="12" sm="4" class="pa-2 mb-4">
				<slot :item="item" />
			</v-col>
		</v-row>

		<v-pagination
			v-if="!loading && pageItems.length > 0"
			v-model="page"
			:length="totalpages"
			:total-visible="5"
			rounded="circle"
		/>
	</v-container>
	<footers />
</template>

<script lang="ts" setup>
import paginationPages from '~/shared/pagination'
import navbar from './navbar.vue'
import footers from './footers.vue'

const selectedYear = ref('')
const selectedSort = ref('')
const years: string[] = []
const sort: string[] = ['Asc', 'Desc']
const props = defineProps<{ items: any[] }>()
const page = ref(1)
const totalpages = ref(1)
const pageItems = ref<any[]>([])
const loading = ref(true)

for (let i = 2025; i >= 2001; i--) years.push(i.toString())

function updatePagination(year: string, sort: string) {
	if (!props.items || props.items.length === 0) return
	loading.value = true

	const { page: p, totalpages: t, pageItems: items } = paginationPages(props.items, year, sort)

	page.value = p.value
	totalpages.value = t.value
	pageItems.value = items.value
	loading.value = false
}

watch(
	() => props.items,
	(items) => {
		if (!items || items.length === 0) return
		loading.value = true
		updatePagination(selectedYear.value, selectedSort.value)
		loading.value = false
	},
	{ immediate: true },
)

watch([selectedYear, selectedSort], ([newYear, newSort]) => {
	updatePagination(newYear, newSort)

	if (newYear !== '') {
		if (!years.includes('Remove')) years.unshift('Remove')
	} else {
		const index = years.indexOf('Remove')
		if (index !== -1) years.splice(index, 1)
	}
})
</script>
