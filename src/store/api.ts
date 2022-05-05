import axios from 'axios';

const req = axios.create({ baseURL: 'https://todoo.5xcamp.us/' });
req.defaults.headers.common['accept'] = 'application/json';
req.defaults.headers.common['content-type'] = 'application/json';

export const api = {
    checkAuthorization(Authorization: string) {
        return req.get('/check', { headers: { Authorization } });
    },
    userSignIn(email: string, password: string) {
        return req.post('/users/sign_in', { user: { email, password } });
    },
    userSignOut(Authorization: string) {
        return req.delete('/users/sign_out', { headers: { Authorization } });
    },
    register(email: string, nickname: string, password: string) {
        return req.post('/users', { user: { email, nickname, password } });
    },
};
