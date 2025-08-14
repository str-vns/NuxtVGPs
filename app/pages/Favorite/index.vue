<template>
	<h2 class="text-center mt-10">Favorites</h2>
	<Cardstyle :items="rockets" type="favorite" @clear="handleClear" />
</template>

<script lang="ts" setup>
import Cardstyle from '~/shared/cardstyle.vue'

const store = useFavorite()
const { favoriteList } = storeToRefs(store)

const rockets = favoriteList
console.log(rockets)
const loadFavorites = async () => {
	await store.getFav()
}

onMounted(() => {
	loadFavorites()
})

watchEffect(() => {
	console.log('Favorites changed:', favoriteList.value)
})

const handleClear = async () => {
	await store.clearAll()
}
</script>
