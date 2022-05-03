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
                /></label>
                <p class="mt-1 mb-4 text-sm text-[#D87355]">此欄位不可為空</p>
                <label class="text-sm"
                    >密碼<input
                        type="text"
                        class="form-input mt-1 block h-[2.9375rem] w-full rounded-[0.625rem] border-none py-[0.75rem] font-medium placeholder-[#9F9A91] outline-none"
                        placeholder="請輸入密碼"
                /></label>
                <p class="mt-1 mb-4 text-sm text-[#D87355]">此欄位不可為空</p>
            </div>
            <div class="mb-3 text-center">
                <button
                    class="rounded-[0.625rem] bg-[#333333] py-3 px-12 text-white font-bold"
                >
                    登入
                </button>
            </div>
            <div class="text-center">
                <button
                    class="rounded-[0.625rem] border border-transparent py-3 px-12 hover:border-secondary hover:text-secondary font-bold"
                >
                    註冊帳號
                </button>
            </div>
        </div>
    </RegisterAndLoginLayout>
</template>
<script lang="ts" setup>
import RegisterAndLoginLayout from './register-and-login-layout.vue';
</script>
