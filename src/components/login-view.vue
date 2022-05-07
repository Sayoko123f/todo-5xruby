<template>
    <RegisterAndLoginLayout>
        <div class="mx-auto w-full max-w-[304px] font-noto font-bold xl:mx-0">
            <h2 class="pb-6 text-center text-2xl font-bold md:text-left">
                最實用的線上代辦事項服務
            </h2>
            <!-- register form -->
            <div>
                <label class="text-sm"
                    >Email<input
                        type="text"
                        class="form-input mt-1 block h-[2.9375rem] w-full rounded-[0.625rem] border-none py-[0.75rem] px-4 font-medium placeholder-[#9F9A91] outline-none"
                        placeholder="請輸入Email"
                        v-model="user.email"
                        maxlength="400"
                /></label>
                <p
                    class="mt-1 mb-4 text-sm text-[#D87355]"
                    :class="{ invisible: !tips.email, visible: tips.email }"
                >
                    {{ tips.email }}&nbsp;
                </p>
                <label class="text-sm"
                    >密碼<input
                        type="password"
                        class="form-input mt-1 block h-[2.9375rem] w-full rounded-[0.625rem] border-none py-[0.75rem] font-medium placeholder-[#9F9A91] outline-none"
                        placeholder="請輸入密碼"
                        v-model="user.password"
                        maxlength="30"
                /></label>
                <p
                    class="mt-1 mb-4 text-sm text-[#D87355]"
                    :class="{ invisible: !tips.email, visible: tips.email }"
                >
                    {{ tips.password }}&nbsp;
                </p>
            </div>
            <div class="mb-3 text-center">
                <button
                    class="rounded-[0.625rem] bg-[#333333] py-3 px-12 font-bold text-white"
                    @click="handleLoginButtonClick"
                >
                    登入
                </button>
            </div>
            <div class="text-center">
                <button
                    class="rounded-[0.625rem] border border-transparent py-3 px-12 font-bold hover:border-secondary hover:text-secondary"
                    @click="gotoRegisterPage"
                >
                    註冊帳號
                </button>
            </div>
        </div>
        <Teleport
            to="#portal-target"
            v-if="showLoadingOverlay || isLoginSuccess"
        >
            <OverlayScreen :loading="true" v-if="showLoadingOverlay" />
            <OverlayScreen v-if="isLoginSuccess">
                <div class="font-noto font-bold text-white">
                    <p class="text-xl"><LoadingSvg />登入成功</p>
                </div>
            </OverlayScreen>
        </Teleport>
    </RegisterAndLoginLayout>
</template>
<script lang="ts" setup>
import RegisterAndLoginLayout from './register-and-login-layout.vue';
import { useRouter } from 'vue-router';
import { useAPI } from '../store/use-api';
import { reactive, ref } from 'vue';
import { validateEmail } from '../util';
import OverlayScreen from './overlay-screen.vue';
import LoadingSvg from './loading-svg.vue';
const router = useRouter();
const api = useAPI();
const isLoginSuccess = ref(false);
const showLoadingOverlay = ref(false);
const user = reactive({
    email: '',
    password: '',
});
const tips = reactive({
    email: '',
    password: '',
});

function gotoRegisterPage() {
    router.push({ name: 'register' });
}

function validInput(): boolean {
    let valid = true;
    if (!validateEmail(user.email)) {
        tips.email = '此欄位不可為空';
        valid = false;
    } else {
        tips.email = '';
    }
    if (!user.password) {
        tips.password = '此欄位不可為空';
        valid = false;
    } else {
        tips.password = '';
    }
    return valid;
}

function handleLoginButtonClick() {
    if (!validInput()) {
        console.log('invalid.');
        return;
    }
    showLoadingOverlay.value = true;
    api.login(user.email, user.password)
        .then(() => {
            if (api.isLogin) {
                isLoginSuccess.value = true;
                window.setTimeout(() => {
                    router.push({ name: 'home' });
                }, 900);
            } else {
                console.log('login failed.');
                tips.email = '登入失敗，可能是 Email 或密碼不對';
            }
        })
        .finally(() => {
            showLoadingOverlay.value = false;
        });
}
</script>
