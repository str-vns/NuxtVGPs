<template>
	<cardsList :items="props.items" :types="props.type">
		<template #default="{ item }">
			<v-card rounded class="rounded-xl">
				<v-card-title class="d-flex align-center justify-space-between mt-2">
					<span>{{ getItemTitle(item, type) }}</span>

					<v-icon v-if="type === 'favorite'" size="25" class="cursor-pointer"
					 @click="removeFavs(item.id)">
						{{  'mdi-star'  }}
					</v-icon>
				</v-card-title>

				<div>
					<v-card-subtitle>
						<div>{{ getItemDate(item, type) }}</div>
						<div>{{ getInfo1(item, type) }}</div>
						<div>{{ getInfo2(item, type) }}</div>
					</v-card-subtitle>
					<div class="d-flex justify-end mt-2 mr-2">
						<NuxtLink :to="`${getRouterNav(item, type)}/${item.id}`">
							<v-btn variant="flat">See more info</v-btn>
						</NuxtLink>
					</div>
				</div>

				<v-expansion-panels class="mt-5">
					<v-expansion-panel :title="getDetailsTitle(item, type)" :text="getDetails(item, type)" />
				</v-expansion-panels>
			</v-card>
		</template>
	</cardsList>
</template>

<script lang="ts" setup>
import {
	getItemTitle,
	getDetailsTitle,
	getDetails,
	getInfo2,
	getInfo1,
	getItemDate,
	getRouterNav,
} from '~/helpers/cards'
import cardsList from '~/shared/cardsList.vue'
const props = defineProps<{ items: any[]; type: 'rocket' | 'launches' | 'favorite' }>()
const type = props.type
const removeFavorite = useFavorite()

const removeFavs = async (id: string) => {
    await removeFavorite.removeFav(id)
}

</script>
