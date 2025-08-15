<template>
	<div class="rocket-details">
		<v-btn
			fab
			class="chat-button"
			:color="token === '' ? '#393E46' : '#00ADB5'"
			:disabled="token === ''"
			@click="chatOpen = true"
		>
			<v-icon size="28" color="#222831">mdi-chat</v-icon>
		</v-btn>

		<v-dialog v-model="chatOpen" max-width="500">
			<v-card class="chat-card pa-4 rounded-xl">
				<v-card-title class="chat-title text-h6">
					{{ type === 'rocket' ? 'Rocket' : 'Launches' }} Q&A
				</v-card-title>

				<v-card-text class="chat-container">
					<div class="chat-messages" ref="chatMessages">
						<div
							v-for="(msg, index) in conversation"
							:key="index"
							:class="['chat-msg', msg.role === 'user' ? 'user-msg' : 'response-msg']"
						>
							<strong>{{ msg.role === 'user' ? 'You:' : 'Response:' }}</strong>
							<span>{{ msg.content }}</span>
						</div>

						<div v-if="loading" class="loading-message">
							<v-progress-circular indeterminate color="#00ADB5" size="20" />
							Processing...
						</div>
					</div>

					<v-text-field
						v-model="userMessage"
						label="Ask something..."
						outlined
						dense
						hide-details
						single-line
						density="compact"
						rounded="pill"
						variant="solo"
						class="chat-input mt-3"
						@keyup.enter="sendMessage(item)"
					></v-text-field>
				</v-card-text>

				<v-card-actions class="d-flex justify-end">
					<v-btn color="#00ADB5" @click="sendMessage(item)" :disabled="loading">Send</v-btn>
					<v-btn @click="chatOpen = false">Close</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script lang="ts" setup>
import type { ChatMessage } from '~/types/typesInfo'
import { chatData } from '~/api/llm'

const token = import.meta.env.VITE_AWANLLM_API
const chatOpen = ref(false)
const userMessage = ref('')
const conversation = ref<ChatMessage[]>([])
const loading = ref(false)
const chatMessages = ref<HTMLElement | null>(null)
const props = defineProps<{ items: any; type: string }>()
const item = props.items

const sendMessage = async (singleRocket: any) => {
	if (!userMessage.value) return

	conversation.value.push({ role: 'user', content: userMessage.value })
	loading.value = true

	const context = `You are answering questions about the ${props.type}: ${props.type === 'rocket' ? singleRocket.name : singleRocket.mission_name}.`

	const messages: ChatMessage[] = [
		{ role: 'system', content: context },
		{ role: 'user', content: userMessage.value },
	]

	try {
		const result = await chatData(messages)
		const answer = result?.choices?.[0]?.message?.content || 'No answer found'

		conversation.value.push({ role: 'assistant', content: answer })

		nextTick(() => {
			chatMessages.value?.scrollTo({
				top: chatMessages.value.scrollHeight,
				behavior: 'smooth',
			})
		})
	} catch (error) {
		conversation.value.push({ role: 'assistant', content: 'Error fetching answer.' })
		console.error(error)
	} finally {
		loading.value = false
		userMessage.value = ''
	}
}
</script>

<style src="../styles/chat.css" scoped />
