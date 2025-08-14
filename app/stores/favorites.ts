import { storageDB, fetchDb, removeDb, clearData } from '~/db/store'
import type { FavoriteItem } from '~/types/typesInfo'

export const useFavorite = defineStore('rocket', {
	state: () => {
		return {
			favoriteList: [] as FavoriteItem[],
		}
	},
	getters: {
		items: (state) => state.favoriteList,
	},
	actions: {
		saveFav(item: FavoriteItem) {
			console.log(item)
			this.favoriteList.push(item)
			storageDB('persistDb', item)
		},
		async getFav() {
			const data = await fetchDb('persistDb')
			this.favoriteList = Array.isArray(data) ? data : []
			return this.favoriteList
		},
		async removeFav(id: string) {
			removeDb('persistDb', id)
			await this.getFav()
		},
		async clearAll() {
			await clearData('persistDb')
			await this.getFav()
			this.favoriteList = []
		},
	},
})
