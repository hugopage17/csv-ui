<template>
    <q-dialog
        ref="dialogRef"
        persistent
        :maximized="true"
        transition-show="slide-up"
        transition-hide="slide-down"
    >
        <q-card class="app-dialog bg-grey-3">
            <q-layout view="hHh Lpr lff" container class="shadow-2 rounded-borders">
                <q-header>
                    <q-toolbar class="bg-primary">
                        <div class="text-h6">Settings</div>
                        <q-space />
                        <q-btn dense flat icon="close" @click="onDialogCancel">
                            <q-tooltip class="bg-white text-dark">Close</q-tooltip>
                        </q-btn>
                    </q-toolbar>
                </q-header>
                <q-drawer
                    show-if-above
                    :width="320"
                    :breakpoint="500"
                    bordered
                    class="bg-white"
                >
                    <q-scroll-area class="fit">
                        <q-list>
                            <q-item>
                                <q-item-section side>
                                    <q-avatar circle class="bg-grey-3">
                                        <img
                                            v-if="user?.photoURL"
                                            :src="user.photoURL"
                                            :title="`Logged in as ${user.displayName}`"
                                        >
                                        <div v-else>{{ user?.displayName?.split('')[0].toUpperCase() }}</div>
                                    </q-avatar>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>{{ user.displayName }}</q-item-label>
                                    <q-item-label caption>{{ user.email }}</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-separator />
                            <template v-for="(menuItem, index) in menuList" :key="index">
                                <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple>
                                    <q-item-section avatar>
                                    <q-icon :name="menuItem.icon" />
                                    </q-item-section>
                                    <q-item-section>
                                    {{ menuItem.label }}
                                    </q-item-section>
                                </q-item>
                            </template>
                        </q-list>
                        <div class="fixed-bottom q-pa-md">
                            <q-btn outline color="negative" label="Logout"/>
                        </div>
                    </q-scroll-area>
                </q-drawer>
                <q-page-container>
                    <AccountDetails />
                </q-page-container>
            </q-layout>
        </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from 'quasar'
import { toRefs } from 'vue'
import { useUserStore } from 'src/stores/user-store'
import AccountDetails from './AccountDetails.vue'

export default {
    name: 'SettingsDialog',
    components: { AccountDetails },
    setup () {
        const { dialogRef, onDialogCancel, onDialogOK } = useDialogPluginComponent()
        const menuList = [
            {
                icon: 'account_circle',
                label: 'Account',
            },
            {
                icon: 'settings',
                label: 'Settings',
            }
        ]
        const userStore = useUserStore()
        const { user } = toRefs(userStore)
        return {
            dialogRef,
            onDialogCancel,
            onDialogOK,
            menuList,
            user
        }
    }
}
</script>

