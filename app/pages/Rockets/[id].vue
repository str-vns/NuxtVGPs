<template>
  <div class="rocket-details">
    <div
      class="page-header"
      :style="{
        backgroundImage: `url('https://res.cloudinary.com/diljhwf3a/image/upload/v1755065785/heic0604a_sfmtyb.jpg')`
      }"
    >
      <div class="header-content">
        <h1>{{ singleRocket.name }}</h1>
        <p class="lead">Company: {{ singleRocket.company }}</p>
        <p class="lead">Country: {{ singleRocket.country }}</p>
      </div>
    </div>


    <v-card
      class="rocket-card mx-auto pa-6 w-50"
    >
      <div class="d-flex justify-end mb-3 text-center">
        <v-btn
          :color="isFavorite ? 'yellow' : 'primary'"
          @click="isFavoriteHandler(singleRocket)"
        >
          Favorite
          <v-icon size="20">
            {{ isFavorite ? 'mdi-star' : 'mdi-star-outline' }}
          </v-icon>
        </v-btn>
      </div>

      <span class="description">{{ singleRocket.description }}</span>

      <span class="info">First Flight: {{ dateConvert(singleRocket.first_flight) }}</span>
      <span class="info">
        Height : {{ singleRocket.height.feet }} ft | {{ singleRocket.height.meters }} m
      </span>
      <span class="info">
        Diameter : {{ singleRocket.diameter.feet }} ft | {{ singleRocket.diameter.meters }} m
      </span>
      <span class="info">
        Mass : {{ singleRocket.mass.kg }} kg | {{ singleRocket.mass.lb }} lb
      </span>
      <span class="info">Number of stages : {{ singleRocket.stages }}</span>
    </v-card>
    <Chat :items="singleRocket" :type="type" />
  </div>
</template>

<script lang="ts" setup>
import { useSingleRockets } from '~/api/rockets'
import { dateConvert } from '~/shared/Date'
import Chat from '~/shared/chat.vue'
import type { FavoriteItem } from '~/types/typesInfo'

const route = useRoute()
const id = route.params.id as string
const singleRocket = useSingleRockets(id)
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

<style src="../../styles/singleRocket.css" scoped/>
