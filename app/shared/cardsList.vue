<template>
	<v-container class="pa-2">
		<div class="text-center">
			<v-row align="center" justify="center" dense>
				<v-col cols="12" sm="4" md="3">
					<v-text-field
						v-model="search"
						label="Search"
						prepend-inner-icon="mdi-magnify"
						variant="outlined"
						hide-details
						single-line
					/>
				</v-col>

				<v-col cols="12" sm="3" md="2">
					<v-menu open-on-hover>
						<template v-slot:activator="{ props }">
							<v-btn color="primary" v-bind="props">
								{{
									selectedYear === 'Remove' || selectedYear === ''
										? 'Select Year'
										: selectedYear
								}}
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
				</v-col>

				<v-col cols="12" sm="3" md="2">
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
				</v-col>
			</v-row>
			<div
				v-if="props.types === 'favorite'"
				class="d-flex align-center justify-end mt-2 mb-2"
				@click="clearFavorites"
			>
				<v-btn class="rounded-lg">Clear Favorites</v-btn>
			</div>
		</div>

		<div v-if="loading || pageItems === null" class="text-center my-8">
			<v-progress-circular indeterminate color="primary" size="50" />
		</div>

		<div v-else-if="!loading && pageItems.length === 0" class="text-center my-8">
  <p v-if="props.types === 'favorite'">No favorites yet</p>
  <p v-else-if="props.types === 'rocket'">No Rockets found</p>
  <p v-else>No Launches found</p>
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
</template>

<script lang="ts" setup>
import paginationPages from '~/shared/pagination'

const selectedYear = ref('')
const selectedSort = ref('')
const years: string[] = []
const sort: string[] = ['Asc', 'Desc']
const props = defineProps<{ items: any[], types: string}>()
const page = ref(1)
const totalpages = ref(1)
const pageItems = ref<any[]>([])
const loading = ref(true)
const search = ref('')


for (let i = 2025; i >= 2001; i--) years.push(i.toString())

function updatePagination(year: string, sort: string, search: string) {
  loading.value = true
  if (!props.items) {
    pageItems.value = []
    totalpages.value = 1
    page.value = 1
    loading.value = false
    return
  }

  const { page: p, totalpages: t, pageItems: items } = paginationPages(props.items, year, sort, search)

  page.value = p.value
  totalpages.value = t.value
  pageItems.value = items.value
  loading.value = false
}

watch(
	() => props.items,
	(items) => {
	
		loading.value = true
		updatePagination(selectedYear.value, selectedSort.value, search.value)
		loading.value = false
	},
	{ immediate: true },
)

watch([selectedYear, selectedSort, search], ([newYear, newSort, newSearch]) => {
	updatePagination(newYear, newSort, newSearch)

	if (newYear !== '') {
		if (!years.includes('Remove')) years.unshift('Remove')
	} else {
		const index = years.indexOf('Remove')
		if (index !== -1) years.splice(index, 1)
	}
}) 

const emit = defineEmits<{ (e: 'clear'): void }>() 

const clearFavorites = async () => { emit('clear')

 }
</script>
