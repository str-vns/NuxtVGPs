<template>
	<cardsList :items="rocketeers">
		<template #default="{ item }">
			<v-card rounded class="rounded-lg" :title="item.name">
				<v-card-subtitle>
					<div>First Flight: {{ item.first_flight }}</div>
					<div>Company: {{ item.company }}</div>
                    <div>Country: {{ item.country }}</div>
				</v-card-subtitle>

				<v-expansion-panels class="mt-6">
					<v-expansion-panel title="View Description" :text="item.description ?? 'No Currently Details'" />
				</v-expansion-panels>
			</v-card>
		</template>
	</cardsList>
</template>

<script lang="ts" setup>
import cardsList from '~/shared/cardsList.vue'
import { useGetRockets } from '~/api/rockets'
const rocketeers = useGetRockets()
</script>
