<template>
	<h2 class="text-center mt-10">Launches</h2>
	<Cardstyle :items="launches" type="launches" />
</template>

<script lang="ts" setup>
import Cardstyle from '~/shared/cardstyle.vue'
import { useGetLaunches } from '~/api/launches'

const launches = useGetLaunches()
</script>
