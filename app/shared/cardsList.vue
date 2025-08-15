<template>
	<v-container class="pa-2">
		<div class="text-center">
			<v-row class="mb-2 justify-center">
				<v-col cols="12" sm="6" md="7" class="d-flex justify-end">
					<v-text-field
						class="search-design"
						v-model="search"
						label="Search"
						prepend-inner-icon="mdi-magnify"
						hide-details
						single-line
						density="compact"
						rounded="pill"
						variant="solo"
					/>
				</v-col>

				<v-col cols="12" sm="6" md="3" class="d-flex justify-start">
					<v-menu transition="fab-transition">
						<template v-slot:activator="{ props }">
							<v-btn v-bind="props" class="button-design mr-2">
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

					<v-menu transition="fab-transition">
						<template v-slot:activator="{ props }">
							<v-btn class="button-design" v-bind="props">
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
		</div>
		<div v-if="props.types === 'favorite'" class="d-flex mt-2 mb-2 justify-end">
			<v-btn class="rounded-lg button-design" @click="clearFavorites">Clear Favorites</v-btn>
		</div>
		<div v-if="loading" class="text-center my-8">
			<v-progress-circular indeterminate color="primary" size="50" />
		</div>

		<div v-else-if="props.items && pageItems.length === 0" class="text-center my-8">
			<p v-if="props.types === 'favorite'">No favorites yet</p>
			<p v-else-if="props.types === 'rocket'">No Rockets found</p>
			<p v-else>No Launches found</p>
		</div>

		<transition name="fade-slide" mode="out-in">
			<v-row v-if="pageItems.length" :key="page" align="start" no-gutters>
				<v-col v-for="item in pageItems" :key="item.id" cols="12" sm="4" class="pa-2 mb-4">
					<slot :item="item" />
				</v-col>
			</v-row>
		</transition>

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
const props = defineProps<{ items: any[]; types: string }>()
const page = ref(1)
const totalpages = ref(1)
const pageItems = ref<any[]>([])
const loading = ref(true)
const search = ref('')

for (let i = 2022; i >= 2006; i--) years.push(i.toString())

function updatePagination() {
	loading.value = true
	if (!props.items || props.items.length === 0) {
		pageItems.value = []
		totalpages.value = 1
		loading.value = false
		return
	}

	const { totalpages: t, pageItems: items } = paginationPages(
		page,
		props.items,
		selectedYear.value,
		selectedSort.value,
		search.value,
	)

	totalpages.value = t.value
	pageItems.value = items.value
	loading.value = false
}

watch(
	() => props.items,
	() => {
		page.value = 1
		updatePagination()
	},
	{ immediate: true },
)

watch(
    [selectedYear, selectedSort, search, page],
    ([newYear, newSort, newSearch, newPage], [oldYear, oldSort, oldSearch, oldPage]) => {
        console.log('Watcher triggered for filter, sort, search, or page change.')

        const filtersChanged = newYear !== oldYear || newSort !== oldSort || newSearch !== oldSearch

        if (filtersChanged && newPage !== 1) {
            console.log('Filters changed, resetting page to 1.')
            page.value = 1
            updatePagination()
        } else {
            console.log('Page changed or no filters changed. Updating pagination.')
            updatePagination()
        }

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
    }
)

const emit = defineEmits<{ (e: 'clear'): void }>()

const clearFavorites = async () => {
	emit('clear')
}
</script>

<style src="../styles/list.css" scoped />
