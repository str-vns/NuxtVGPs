<template>
	<cardsList :items="rocketeers">
		<template #default="{ item }">
			<v-card rounded class="rounded-lg">
				<v-hover v-slot="{ isHovering, props }">
					<div v-bind="props">
						<v-card-title>{{ item.name }}</v-card-title>
						<v-card-subtitle>
							<div>First Flight: {{ dateConvert(item.first_flight) }}</div>
							<div>Company: {{ item.company }}</div>
							<div>Country: {{ item.country }}</div>
						</v-card-subtitle>

						<v-overlay
							:model-value="!!isHovering"
							class="align-center justify-center"
							scrim="#036358"
							contained
						>
							<NuxtLink :to="`Rockets/${item.id}`">
								<v-btn variant="flat">See more info</v-btn>
							</NuxtLink>
						</v-overlay>
					</div>
				</v-hover>

				<v-expansion-panels class="mt-6">
					<v-expansion-panel
						title="View Description"
						:text="item.description ?? 'No Currently Details'"
					/>
				</v-expansion-panels>
			</v-card>
		</template>
	</cardsList>
</template>

<script lang="ts" setup>
import cardsList from '~/shared/cardsList.vue'
import { useGetRockets } from '~/api/rockets'
import { dateConvert } from '~/shared/Date'

const rocketeers = useGetRockets()

</script>
