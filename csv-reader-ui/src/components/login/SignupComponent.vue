<script lang="ts">
    import { defineComponent, ref } from 'vue';
    import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
    import { useQuasar } from 'quasar'
    import { useRouter } from 'vue-router';
    import { api } from '../../boot/axios';
    import DefaultLayout from '../../layouts/DefaultLayout.vue';

    export default defineComponent({
        name: 'LoginComponent',
        components: { DefaultLayout },
        setup() {
            const router = useRouter()
            const email = ref<string>('')
            const username = ref<string>('')
            const password = ref<string>('')
            const confirmPassword = ref<string>('')
            const quasar = useQuasar()
            const auth = getAuth();

            const googleLogin = async() => {
                const provider = new GoogleAuthProvider();
                await signInWithPopup(auth, provider);
                router.push('/');
            }

            const creatingUser = ref(false);

            const emailSignup = () => {
                creatingUser.value = true
                api.post('/user', {
                    email: email.value,
                    username: username.value,
                    password: password.value
                }).then(async(res) => {
                    await signInWithEmailAndPassword(auth, email.value, password.value)
                    creatingUser.value = false
                    quasar.notify({
                        message: res.data.response.message,
                        color: 'positive'
                    })
                }).catch(() => {
                    creatingUser.value = true
                })
            }

            return {
                googleLogin,
                email,
                password,
                step: ref(1),
                username,
                confirmPassword,
                emailSignup,
                creatingUser
            }
        }
    });
</script>


<template>
    <DefaultLayout>
        <div class="q-pa-md" style="width: 75%; margin: auto;">
            <q-stepper
                v-model="step"
                ref="stepper"
                color="primary"
                animated
            >
                <q-step
                    :name="1"
                    title="Enter Email & Username"
                    icon="email"
                    :done="step > 1"
                >
                    <q-card-section class="text-h6 text-center">
                        Enter your email and create a username
                    </q-card-section>
                    <q-card-section>
                        <q-input outlined v-model="email" label="Email" class="q-ma-sm" />
                        <q-separator />
                        <q-input outlined v-model="username" label="Username" class="q-ma-sm" />
                    </q-card-section>
                </q-step>

                <q-step
                    :name="2"
                    title="Set Password"
                    icon="lock"
                    :done="step > 2"
                >
                    <q-card-section class="text-h6 text-center">
                        Set your password
                    </q-card-section>
                    <q-card-section>
                        <q-input outlined type="password" v-model="password" label="Password" class="q-ma-sm" />
                        <q-separator />
                        <q-input outlined type="password" v-model="confirmPassword" label="Confirm Password" class="q-ma-sm" />
                    </q-card-section>  
                </q-step>

                <q-step
                    :name="3"
                    title="Confirm"
                    icon="done"
                    :done="step > 3"
                >
                    <div class="text-h6 text-center">Thank you for signing up, cick "CREATE ACCOUNT" below to continue</div>
                </q-step>

                <template v-slot:navigation>
                    <q-stepper-navigation>
                    <q-btn
                        @click="step === 3 ? emailSignup() : $refs.stepper.next()"
                        color="primary"
                        :label="step === 3? 'Create Account' : 'Continue'"
                        :loading="creatingUser"
                        :disable="creatingUser"
                        align="right"
                    />
                    <q-btn
                        v-if="step > 1"
                        :disable="creatingUser"
                        flat
                        color="primary"
                        @click="$refs.stepper.previous()"
                        label="Back"
                        class="q-ml-sm"
                    />
                    </q-stepper-navigation>
                </template>
            </q-stepper>
        </div>
    </DefaultLayout>
</template>
