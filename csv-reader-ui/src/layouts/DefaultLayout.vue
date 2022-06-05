<script lang="ts">
    import { defineComponent, toRefs } from 'vue';
    import { signOut, getAuth } from '@firebase/auth';
    import { useQuasar } from 'quasar';
    import { useUserStore } from '../stores/user-store';
    import SettingsDialog from '../components/dialogs/settings/SettingsDialog.vue';

    export default defineComponent({
        props: {
            sidebar: { type: Boolean }
        },
        setup() {
            const userStore = useUserStore()
            const { user } = toRefs(userStore);
            const auth = getAuth();
            const logout = () => signOut(auth);
            const quasar = useQuasar()

            const openSettingsDialog = () => {
                quasar.dialog({
                    component: SettingsDialog
                })
            }
            return { user, logout, openSettingsDialog }
        }        
    })
</script>


<template>
    <q-layout>
        <q-header elevated class="text-white bg-dark" id="navbar">
            <q-toolbar>
                <q-toolbar-title>
                    CSV UI
                </q-toolbar-title>
                <div v-if="user">
                    <q-avatar class="bg-grey">
                        <img
                            v-if="user?.photoURL"
                            :src="user.photoURL"
                            :title="`Logged in as ${user.displayName}`"
                        >
                        <div v-else>{{ user?.displayName?.split('')[0].toUpperCase() }}</div>
                    </q-avatar>
                    <q-btn flat round color="white" icon="arrow_drop_down">
                        <q-menu>
                            <q-list style="min-width: 100px">
                                <q-item clickable v-close-popup @click="openSettingsDialog">
                                    <q-item-section>Settings</q-item-section>
                                    <q-item-section avatar>
                                        <q-icon color="dark" name="settings" />
                                    </q-item-section>
                                </q-item>
                                <q-separator />
                                <q-item clickable v-close-popup @click="logout">
                                    <q-item-section>Logout</q-item-section>
                                    <q-item-section avatar>
                                        <q-icon color="dark" name="exit_to_app" />
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-btn>
                </div>
                <q-btn 
                    v-else
                    color="primary"
                    @click="$router.push('/login')"
                >
                    Sign in
                </q-btn>
            </q-toolbar>
        </q-header>
        <q-drawer
            show-if-above
            v-if="sidebar"
            :mini="true"
            :width="200"
            :breakpoint="500"
            bordered
            class="bg-dark"
        >
            <slot name="listIcons">
                
            </slot >
            <q-separator />
            <q-item v-if="user" clickable v-ripple class="fixed-bottom" @click="openSettingsDialog">
                <q-item-section avatar>
                    <q-icon name="settings" color="grey" size="sm"/>
                </q-item-section>
            </q-item>
        </q-drawer>
        <q-page-container>
            <slot></slot>
        </q-page-container>
    </q-layout>
</template>

<style lang="scss">
    #navbar{
        border-bottom: 1px solid $primary;
    }
</style>