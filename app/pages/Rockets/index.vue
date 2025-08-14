<template>
	<h2 class="text-center mt-10">Rockets</h2>
	<Cardstyle :items="rocketeers" type="rocket" />
</template>

<script lang="ts" setup>
import Cardstyle from '~/shared/cardstyle.vue'
import { useGetRockets } from '~/api/rockets'

const rocketeers = useGetRockets()
</script>
