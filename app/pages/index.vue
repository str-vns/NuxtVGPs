<template>
	<h2 class="text-center mt-10 white-background">Launches</h2>
	<Cardstyle :items="launches" type="launches" class="white-background" />
</template>

<script lang="ts" setup>
import Cardstyle from '~/shared/cardstyle.vue'
import { useGetLaunches } from '~/api/launches'

const launches = useGetLaunches()
</script>

<style src="../styles/color.css" scoped />
