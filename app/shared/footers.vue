<template>
	<v-footer class="text-center d-flex flex-column ga-2 py-4 semiBlack">
		<div class="d-flex ga-3">
			<v-btn
				v-for="icon in icons"
				:key="icon"
				:icon="icon"
				density="comfortable"
				variant="text"
			></v-btn>
		</div>

		<v-divider class="my-2" thickness="2" width="50"></v-divider>

		<div class="text-caption font-weight-regular opacity-60 white-text">
			Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
			the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
			type and scrambled it to make a type specimen book. It has survived not only five centuries, but
			also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in
			the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
			with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
		</div>

		<v-divider></v-divider>

		<div class="white-text">
			{{ new Date().getFullYear() }} —
			<strong>Vuetify</strong>
		</div>
	</v-footer>
</template>

<script setup></script>
<style src="../styles/color.css" scoped />
