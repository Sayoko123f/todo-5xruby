import { api } from './api';
import { defineStore } from 'pinia';

export const useAPI = defineStore('api', {
    state: () => ({
        jwt: JSON.parse(localStorage.getItem('jwt') || '""') as string,
        isLogin: JSON.parse(
            localStorage.getItem('login') || 'false'
        ) as boolean,
        nickname: JSON.parse(localStorage.getItem('nickname') || '""') as string,
    }),
    actions: {
        async updateLoginStatus() {
            const res = await api.checkAuthorization(this.jwt);
            return (this.isLogin = res.status === 200);
        },
        async login(email: string, password: string): Promise<boolean> {
            try {
                const res = await api.userSignIn(email, password);
                this.isLogin = true;
                this.nickname = res.data.nickname;
                this.jwt = res.headers.authorization;
                localStorage.setItem('login', JSON.stringify(true));
                localStorage.setItem('nickname', JSON.stringify(this.nickname));
                localStorage.setItem('jwt', JSON.stringify(this.jwt));
                console.log(this.jwt);
            } catch (err) {
                this.isLogin = false;
            } finally {
                return this.isLogin;
            }
        },
        async logout(): Promise<boolean> {
            try {
                await api.userSignOut(this.jwt);
                console.log('Logout Success');
                this.isLogin = false;
                this.jwt = '';
                this.nickname = '';
                localStorage.setItem('login', JSON.stringify(false));
                localStorage.setItem('nickname', JSON.stringify(''));
                localStorage.setItem('jwt', JSON.stringify(''));
            } catch (err) {
                console.warn('Logout Error');
                console.warn(err);
            } finally {
                return !this.isLogin;
            }
        },
        register: api.register,
    },
});
