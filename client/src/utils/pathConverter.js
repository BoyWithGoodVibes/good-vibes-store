export const pathConverter = (path) => {
	return path.replace(/ /g, '-').replace(/'/g, '')
}
