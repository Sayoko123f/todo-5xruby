import { api } from './api';
import { defineStore } from 'pinia';

interface TodoItem {
    completed_at: any;
    content: string;
    id: string;
}

export const useAPI = defineStore('api', {
    state: () => ({
        jwt: JSON.parse(localStorage.getItem('jwt') || '""') as string,
        isLogin: JSON.parse(
            localStorage.getItem('login') || 'false'
        ) as boolean,
        nickname: JSON.parse(
            localStorage.getItem('nickname') || '""'
        ) as string,
        todolist: [] as Array<TodoItem>,
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
            } catch (err) {
                console.warn('Logout Error');
                console.warn(err);
            } finally {
                this.isLogin = false;
                this.jwt = '';
                this.nickname = '';
                localStorage.setItem('login', JSON.stringify(false));
                localStorage.setItem('nickname', JSON.stringify(''));
                localStorage.setItem('jwt', JSON.stringify(''));
                return !this.isLogin;
            }
        },
        register: api.register,
        async fetchTodolist() {
            try {
                const res = await api.getTodos(this.jwt);
                this.todolist = res.data.todos;
            } catch (err) {
                console.warn(err);
                this.todolist = [];
            }
        },
        createTodo(content: string) {
            return api.createTodo(this.jwt, content);
        },
        toggleTodo(id: string) {
            return api.toggleTodo(this.jwt, id);
        },
        deleteTodo(id: string) {
            return api.deleteTodo(this.jwt, id);
        },
        updateTodo(id: string, content: string) {
            return api.updateTodo(this.jwt, id, content);
        },
    },
});
