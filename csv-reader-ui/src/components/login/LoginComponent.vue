<script lang="ts">
    import { defineComponent } from 'vue';
    import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
    import { useRouter } from 'vue-router';
    export default defineComponent({
        name: 'LoginComponent',
        setup() {
            const router = useRouter()
            const googleLogin = async() => {
                const provider = new GoogleAuthProvider();
                const auth = getAuth();
                await signInWithPopup(auth, provider);
                router.push('/');
            }
            return { googleLogin }
        }
    });
</script>


<template>
    <div>
        <q-card class="width-50" style="height: 50vh; width:50%; margin: auto">
            <q-card-section class="q-ma-sm">
                <q-input outlined v-model="text" label="Email" class="q-mb-sm" />
                <q-input outlined v-model="text" label="Password" class="q-mb-sm" />
                <q-btn color="primary" label="Submit" style="width: 100%" class="q-mb-sm" />
            </q-card-section>
            <q-separator/>
            <q-card-section>
                <q-btn label="Sign up with Google" class="text-white" @click="googleLogin" style="background-color: #ff004f;"/>
                <q-btn label="Sign up with Facebook" class="text-white" style="background-color: #4267b2;"/>
            </q-card-section>
        </q-card>
    </div>
</template>