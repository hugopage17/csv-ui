<template>
<q-layout>
  <ConsoleComponent v-if="!loading && user"/>
  <div v-else-if="!loading && !user">Welcome to app <q-btn color="primary" @click="loginPage" label="Get Started"/></div>
  <div v-else-if="loading && !user">Loading</div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import ConsoleComponent from '../components/console/ConsoleComponent.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { api } from '../boot/axios'
import { useUserStore } from '../stores/user-store';
import { useProjectStore } from '../stores/project-store';


export default defineComponent({
  name: 'MainLayout',
  components: { ConsoleComponent },
  setup() {
      const auth = getAuth();
      const router = useRouter();
      const userStore = useUserStore();
      const projectStore = useProjectStore();
      const { user, loading } = toRefs(userStore);
      const { projects, loadingProjects } = toRefs(projectStore);
      const loginPage = () => router.push('/login')
      onAuthStateChanged(auth, (userState) => {
        if (userState) {
          user.value = userState
          api.get(`/project?uid=${userState.uid}`).then((res) => {
            const response = res.data.response;
            loadingProjects.value = false
            projects.value = response.getProjects.projects;
          }).catch((err) => {
            console.log(err);
            loadingProjects.value = false
          })
        }
        loading.value = false
      })
      return { user, loginPage, loading }
  },
});
</script>
