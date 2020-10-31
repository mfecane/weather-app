
export const selectCity = (id) => {
    return { type: 'SELECT_CITY', city: id };
}

export const setTheme = (theme) => {
    return { type: 'SET_THEME', theme: theme };
}
