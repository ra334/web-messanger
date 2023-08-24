import { instance } from './api.config'


export default const AuthService: any {
    // name = (nickname || email)
    login(name: string, password: string) {
        return instance.post('/api/login', {name, password})
    }

    refreshToken() {
        return instance.get('/api/refresh')
    }

    logout() {
        return instance.post('/api/logout')
    }
}