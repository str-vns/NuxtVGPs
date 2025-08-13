<template>
	<v-app-bar
		:elevation="4"
		class="top-margin shadow-app-bar"
		style="width: 92%; left: 4.3%; border-radius: 12px"
	>
		<v-app-bar-nav-icon class="d-md-none" @click="drawer = !drawer"></v-app-bar-nav-icon>

		<v-app-bar-title>
			<v-icon>mdi-rocket-launch</v-icon>
			XSpace
		</v-app-bar-title>

		<v-spacer></v-spacer>

		<div class="d-none d-md-flex">
			<nuxt-link :to="'/'">
				<v-btn text :color="$route.path === '/' ? 'blue' : 'black'">Home</v-btn>
			</nuxt-link>
			<nuxt-link :to="'/Launches'">
				<v-btn text :color="$route.path === '/Launches' ? 'blue' : 'black'">Launches</v-btn>
			</nuxt-link>
			<nuxt-link :to="'/Rockets'">
				<v-btn text :color="$route.path === '/Rockets' ? 'blue' : 'black'">Rockets</v-btn>
			</nuxt-link>
			<nuxt-link :to="'/Favorite'">
				<v-btn text :color="$route.path === '/Favorite' ? 'blue' : 'black'">Favorite</v-btn>
			</nuxt-link>
		</div>
	</v-app-bar>

	<v-navigation-drawer v-model="drawer" temporary class="d-md-none">
		<v-list>
			<v-list-item
				v-for="page in pages"
				:key="page.name"
				@click="
					navigate(page.path),
					drawer = false
				"
			>
				<v-list-item-title :class="{ 'text-blue': $route.path === page.path }">
					{{ page.label }}
				</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script setup>
const drawer = ref(false)

const pages = [
	{ name: 'home', label: 'Home', path: '/' },
	{ name: 'launches', label: 'Launches', path: '/Launches' },
	{ name: 'rockets', label: 'Rockets', path: '/Rockets' },
	{ name: 'favorite', label: 'Favorite', path: '/Favorite' },
]

function navigate(path) {
	window.location.href = path
}
</script>

<style>
.text-blue {
	color: #1976d2;
}
.top-margin {
	margin-top: 12px;
	border-radius: 8px;
}

.shadow-app-bar {
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
</style>
