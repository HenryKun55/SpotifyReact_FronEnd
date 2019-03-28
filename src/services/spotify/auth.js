export const TOKEN_SPOTIFY_KEY = "@medweb-spotify-token"
export const isAuthenticatedSpotify = () => localStorage.getItem(TOKEN_SPOTIFY_KEY) !== null
export const getSpotifyToken = () => localStorage.getItem(TOKEN_SPOTIFY_KEY)
export const loginSpotify = token => {localStorage.setItem(TOKEN_SPOTIFY_KEY, token)}
export const logoutSpotify = () => {localStorage.removeItem(TOKEN_SPOTIFY_KEY)}