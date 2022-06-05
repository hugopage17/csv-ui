<template>
    <q-page padding>
        <AccountDetail
            v-for="detail in displayableDetails"
            :key="detail.key"
            :detail="detail"
        />
        <q-separator />
        <AccountDetail
            v-for="detail in metadataDetails"
            :key="detail.key"
            :detail="detail"
        />
        <q-space />
        <q-btn
            label="Delete Account"
            color="negative"
            outline
        />
    </q-page>
</template>


<script lang="ts">
    import { defineComponent, toRefs } from 'vue';
    import { User } from '@firebase/auth'
    import { useUserStore } from '../../../stores/user-store';
    import AccountDetail from './AccountDetail.vue';
    import { displayableDetails, metadataDetails } from './displayableDetails';

    export default defineComponent({
        name: 'AccountDetails',
        components: { AccountDetail },
        setup() {
            const userStore = useUserStore()
            const { user } = toRefs(userStore)
            return {
                metadataDetails: metadataDetails(user.value as User),
                displayableDetails: displayableDetails(user.value as User)
            }
        }
    })
</script>