<template>
	<v-container class="pa-16">
		<v-row align="start" no-gutters>
			<v-col v-for="item in pageItems" :key="item.id" cols="12" sm="4" class="pa-2 mb-4">
				<slot :item="item" />
			</v-col>
		</v-row>
		<v-pagination v-model="page" :length="totalpages" :total-visible="5" rounded="circle" />
	</v-container>
</template>

<script lang="ts" setup>
import paginationPages from '~/shared/pagination'
const props = defineProps<{ items?: any[] }>()
const { page, totalpages, pageItems } = paginationPages(props?.items ?? [])
</script>
