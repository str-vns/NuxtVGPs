<template>
	<div class="d-flex justify-center align-center mt-15" style="min-height: 50vh container">
		<v-card class="pa-6 w-50" style="background-color: rgba(255, 255, 255, 0.95); border-radius: 30px">
			<div class="d-flex justify-end mb-4">
				<v-btn
					:color="isFavorite ? 'yellow' : 'primary'"
					class="text-center"
					@click="isFavoriteHandler(singleRocket)"
				>
					Favorite
					<v-icon size="20">
						{{ isFavorite ? 'mdi-star' : 'mdi-star-outline' }}
					</v-icon>
				</v-btn>
			</div>

			<div class="text-center mb-5">
				<h1 class="mb-3 display-4 text-stroke">
					{{ singleRocket.mission_name }}
				</h1>

				<p class="lead font-weight-bold text-stroke">
					Company: {{ singleRocket?.launch_site?.site_name }}
				</p>

				<p class="lead font-weight-bold text-stroke">Rocket: {{ singleRocket.rocket.rocket_name }}</p>
			</div>

			<div class="text-center mx-auto" style="max-width: 600px">
				<p>{{ singleRocket.details ?? 'No details available' }}</p>
				<p class="mt-3">First Flight: {{ dateConvert(singleRocket.launch_date_local) }}</p>
			</div>
		</v-card>
		<Chat :items="singleRocket" :type="type" />
	</div>
</template>

<script lang="ts" setup>
import Chat from '~/shared/chat.vue'
import { useSingleGetLaunches } from '~/api/launches'
import { dateConvert } from '~/shared/Date'
import type { FavoriteItem } from '~/types/typesInfo'

const route = useRoute()
const id = route.params.id as string
const singleRocket = useSingleGetLaunches(id)
const store = useFavorite()
const rockets = ref<FavoriteItem[]>([])
const isFavorite = ref(false)

const getTypeFromRoute = (): 'rocket' | 'launch' => {
	if (route.path.startsWith('/Rockets')) return 'rocket'
	if (route.path.startsWith('/Launches')) return 'launch'
	throw new Error(`Unknown type for route: ${route.path}`)
}

const type = getTypeFromRoute()
onMounted(async () => {
	rockets.value = (await store.getFav()) as FavoriteItem[]
	isFavorite.value = rockets.value.some((r) => r.id === id)
})

const isFavoriteHandler = async (data: any) => {
	if (isFavorite.value) {
		store.removeFav(id)
		isFavorite.value = false
	} else {
		store.saveFav({ id: id, type: type, data: data })
		isFavorite.value = true
	}
}
</script>

<style scoped>
.text-stroke {
	-webkit-text-stroke: 1px black;
	color: white;
}

.font-weight-bold {
	font-weight: 800;
}
</style>
