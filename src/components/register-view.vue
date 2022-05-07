<template>
    <RegisterAndLoginLayout>
        <div class="mx-auto w-full max-w-[304px] font-noto font-bold xl:mx-0">
            <h2 class="pb-6 text-center text-2xl font-bold md:text-left">
                註冊帳號
            </h2>
            <!-- register form -->
            <div>
                <label class="text-sm"
                    >Email
                    <span class="text-red-500">{{ tips.email }}</span>
                    <input
                        type="text"
                        class="form-input mt-1 mb-4 block h-[2.9375rem] w-full rounded-[0.625rem] border-none py-[0.75rem] px-4 font-medium placeholder-[#9F9A91] outline-none"
                        placeholder="請輸入Email"
                        v-model="user.email"
                        maxlength="400" /></label
                ><label class="text-sm"
                    >您的暱稱
                    <span class="text-red-500">{{ tips.nickname }}</span
                    ><input
                        type="text"
                        class="form-input mt-1 mb-4 block h-[2.9375rem] w-full rounded-[0.625rem] border-none py-[0.75rem] font-medium placeholder-[#9F9A91] outline-none"
                        placeholder="請輸入您的暱稱"
                        v-model="user.nickname"
                        maxlength="20" /></label
                ><label class="text-sm"
                    >密碼 <span class="text-red-500">{{ tips.password }}</span
                    ><input
                        type="password"
                        class="form-input mt-1 mb-4 block h-[2.9375rem] w-full rounded-[0.625rem] border-none py-[0.75rem] font-medium placeholder-[#9F9A91] outline-none"
                        placeholder="請輸入密碼"
                        v-model="user.password"
                        maxlength="30" /></label
                ><label class="text-sm"
                    >再次輸入密碼
                    <span class="text-red-500">{{ tips.password2 }}</span
                    ><input
                        type="password"
                        class="form-input mt-1 mb-6 block h-[2.9375rem] w-full rounded-[0.625rem] border-none py-[0.75rem] font-medium placeholder-[#9F9A91] outline-none"
                        placeholder="請再次輸入密碼"
                        v-model="password2"
                        maxlength="30"
                /></label>
            </div>
            <div class="mb-3 text-center">
                <button
                    class="rounded-[0.625rem] bg-[#333333] py-3 px-12 font-bold text-white"
                    @click="handleRegisterButtonClick"
                >
                    註冊帳號
                </button>
            </div>
            <div class="text-center">
                <button
                    class="rounded-[0.625rem] border border-transparent py-3 px-12 font-bold hover:border-secondary hover:text-secondary"
                    @click="gotoLoginPage"
                >
                    登入
                </button>
            </div>
        </div>
        <Teleport
            to="#portal-target"
            v-if="showLoadingOverlay || isRegisterSuccess"
        >
            <OverlayScreen :loading="true" v-if="showLoadingOverlay" />
            <OverlayScreen v-if="isRegisterSuccess">
                <div class="font-noto font-bold text-white">
                    <p class="text-xl">註冊成功</p>
                    <p><LoadingSvg /> 即將導向登入頁面</p>
                </div>
            </OverlayScreen>
        </Teleport>
    </RegisterAndLoginLayout>
</template>
<script setup lang="ts">
import RegisterAndLoginLayout from './register-and-login-layout.vue';
import { useAPI } from '../store/use-api';
import { validateEmail } from '../util';
import { useRouter } from 'vue-router';
import { ref, reactive } from 'vue';
import OverlayScreen from './overlay-screen.vue';
import LoadingSvg from './loading-svg.vue';
const api = useAPI();
const router = useRouter();
const showLoadingOverlay = ref(false);
const isRegisterSuccess = ref(false);
const user = reactive({
    email: '',
    nickname: '',
    password: '',
});
const tips = reactive({
    email: '',
    nickname: '',
    password: '',
    password2: '',
});
const password2 = ref('');

function validData(): boolean {
    let vaild = true;
    // check email format
    if (!validateEmail(user.email)) {
        tips.email = '請填寫 Email';
        vaild = false;
    } else {
        tips.email = '';
    }
    // check nickname
    if (!user.nickname.length) {
        tips.nickname = '請填寫暱稱';
        vaild = false;
    } else {
        tips.nickname = '';
    }
    // check password
    if (user.password.length < 6) {
        tips.password = '密碼長度需要 6 個字元以上';
        vaild = false;
    } else {
        tips.password = '';
    }
    // check password === password2
    if (user.password !== password2.value) {
        tips.password2 = '必須與密碼欄位相同';
        vaild = false;
    } else {
        tips.password2 = '';
    }
    return vaild;
}

function handleRegisterButtonClick() {
    if (!validData()) {
        console.log('invalid.');
        return;
    }
    showLoadingOverlay.value = true;
    api.register(user.email, user.nickname, user.password)
        .then((res) => {
            console.log('success register');
            console.log(res.data);
            isRegisterSuccess.value = true;
            window.setTimeout(() => {
                gotoLoginPage();
            }, 1600);
        })
        .catch((err) => {
            console.log('failed register');
            console.log(err);
            tips.email = '註冊時發生錯誤';
        })
        .finally(() => {
            showLoadingOverlay.value = false;
        });
}

function gotoLoginPage() {
    router.push({ name: 'login' });
}
</script>
