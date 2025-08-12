<template>
	<cardsList :items="launches">
		<template #default="{ item }">
			<v-card rounded class="rounded-lg" :title="item.mission_name">
				<v-card-subtitle>
					<div>Launch Date: {{ dateConvert(item.launch_date_local) }}</div>
					<div>Rocket: {{ item.rocket.rocket_name }}</div>
					<div>Site: {{ item.launch_site?.site_name ?? '' }}</div>
				</v-card-subtitle>

				<v-expansion-panels class="mt-6">
					<v-expansion-panel title="View Details" :text="item.details ?? 'No Currently Details'" />
				</v-expansion-panels>
			</v-card>
		</template>
	</cardsList>
</template>

<script lang="ts" setup>
import cardsList from '~/shared/cardsList.vue'
import { useGetLaunches } from '~/api/launches'
import { dateConvert } from '~/shared/Date'
const launches = useGetLaunches()

</script>
