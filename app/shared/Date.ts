export function dateConvert(dates: string) {
	const date = new Date(dates)
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
}
