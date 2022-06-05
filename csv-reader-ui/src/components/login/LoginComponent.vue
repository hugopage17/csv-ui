<script lang="ts">
    import { defineComponent, ref } from 'vue';
    import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
    import { useRouter } from 'vue-router';
    export default defineComponent({
        name: 'LoginComponent',
        setup() {
            const router = useRouter()
            const auth = getAuth();
            const googleLogin = async() => {
                const provider = new GoogleAuthProvider();
                await signInWithPopup(auth, provider);
                router.push('/');
            }
            
            const email = ref<string>('')
            const password = ref<string>('')

            const loggingIn = ref<boolean>(false)

            const login = async() => {
                loggingIn.value = true
                await signInWithEmailAndPassword(auth, email.value, password.value)
                loggingIn.value = false
            }

            return { googleLogin, email, password, login, loggingIn }
        }
    });
</script>


<template>
    <div class="window-height bg-secondary">
        <div class="fixed-center" style="height: 50vh; width:40%; margin: auto">
            <div class="q-ma-sm">
                <q-input color="secondary" filled v-model="email" label="Email" class="q-mb-sm bg-grey-3" />
                <q-input color="secondary" type="password" filled v-model="password" label="Password" class="q-mb-sm bg-grey-3" />
                <q-btn @click="login" :disable="loggingIn" :loading="loggingIn" color="primary" label="Submit" style="width: 100%" class="q-mb-sm" />
            </div>
            <q-separator/>
            <div class="row items-center" style="width: 70%; margin: auto;">
                <q-btn label="Login with Google" class="text-white q-mt-md" @click="googleLogin" style="background-color: #ff004f;"/>
                <q-space />
                <q-btn label="Login with Facebook" class="text-white q-mt-md" style="background-color: #4267b2;"/>
            </div>
        </div>
    </div>
</template>