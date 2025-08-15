<template>
	<v-app>
		<Navbar />
		<v-main class="white-background">
			<slot />
		</v-main>

		<Footers />
	</v-app>
</template>
<script>
import Footers from '~/shared/footers.vue'
import Navbar from '~/shared/navbar.vue'

export default {
	name: 'DefaultLayout',
	components: {
		Footers,
		Navbar,
	},
}
</script>

<style src="../styles/color.css" scoped />
