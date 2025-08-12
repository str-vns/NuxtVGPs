<template>
	<v-container class="pa-16">
		<v-select clearable label="Select Year" v-model="selectedYear" :items="years" />

		<div v-if="pageItems.length === 0" class="text-center my-8">
			<p>No launches found</p>
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
const years: string[] = []
for (let i = 2025; i >= 2001; i--) {
	years.push(i.toString())
}

const props = defineProps<{ items?: any[] }>()

const page = ref(1)
const totalpages = ref(1)
const pageItems = ref<any[]>([])

function updatePagination(year: string) {
	const { page: p, totalpages: t, pageItems: items } = paginationPages(props.items ?? [], year)
	page.value = p.value
	totalpages.value = t.value
	pageItems.value = items.value
}

updatePagination(selectedYear.value)
watch(selectedYear, (newYear) => {
	updatePagination(newYear)
})
</script>
