
export function isTokenValid () {
    const token = localStorage.getItem('token')
    if (token !== null) {
        return true
    }
    return false
} 