import { defineStore } from 'pinia';
import { ref } from 'vue';
import { User } from 'firebase/auth';

export const useUserStore = defineStore('user', () => {
    const user = ref<User | null>(null);
    const loading = ref(true);

    return { user, loading }
});