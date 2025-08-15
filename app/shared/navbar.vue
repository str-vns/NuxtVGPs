<template>
	<v-app-bar
		:elevation="4"
		class="top-margin shadow-app-bar"
		style="width: 92%; left: 4.3%; border-radius: 12px"
	>
		<v-app-bar-nav-icon class="d-md-none nav-text-white" @click="drawer = !drawer"></v-app-bar-nav-icon>

		<v-app-bar-title class="nav-text-white">
			<v-icon>mdi-rocket-launch</v-icon>
			XSpace
		</v-app-bar-title>

		<v-spacer></v-spacer>

		<div class="d-none d-md-flex mr-2">
			<nuxt-link :to="'/'">
				<v-btn text :color="$route.path === '/' ? '#00ADB5' : '#EEEEEE'">Home</v-btn>
			</nuxt-link>
			<!-- <nuxt-link :to="'/Launches'">
				<v-btn text :color="$route.path === '/Launches' ? '#00ADB5' : '#EEEEEE'">Launches</v-btn>
			</nuxt-link> -->
			<nuxt-link :to="'/Rockets'">
				<v-btn text :color="$route.path === '/Rockets' ? '#00ADB5' : '#EEEEEE'">Rockets</v-btn>
			</nuxt-link>
			<nuxt-link :to="'/Favorite'">
				<v-btn text :color="$route.path === '/Favorite' ? '#00ADB5' : '#EEEEEE'">Favorite</v-btn>
			</nuxt-link>
		</div>
	</v-app-bar>

	<v-navigation-drawer v-model="drawer" temporary class="transparent-drawer">
		<v-list>
			<v-list-item v-for="page in pages" :key="page.name">
				<v-btn :to="page.path" class="menu-button" block>
					{{ page.label }}
				</v-btn>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script setup>
const drawer = ref(false)

const pages = [
	{ name: 'home', label: 'Home', path: '/' },
	{ name: 'rockets', label: 'Rockets', path: '/Rockets' },
	{ name: 'favorite', label: 'Favorite', path: '/Favorite' },
]
</script>

<style src="../styles/navbar.css" scoped />
