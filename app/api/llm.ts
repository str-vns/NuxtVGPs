import type { ChatMessage } from '~/types/typesInfo'

export const chatData = async (messages: ChatMessage[]) => {
	const token = import.meta.env.VITE_AWANLLM_API

	const response = await fetch('https://api.awanllm.com/v1/chat/completions', {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		method: 'POST',
		body: JSON.stringify({
			model: 'Meta-Llama-3.1-70B-Instruct',
			messages: messages,
		}),
	})

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`)
	}

	return await response.json()
}
