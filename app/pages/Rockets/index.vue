<template>
	<cardstyle :items="rocketeers"/>
	
</template>

<script lang="ts" setup>
import cardstyle from '~/shared/cardstyle.vue'
import { useGetRockets } from '~/api/rockets'

const rocketeers = useGetRockets()
</script>
