<template>
  <q-layout>
      <ConsoleComponent v-if="!loading && user"/>
      <DefaultLayoutVue v-else>
        <div v-if="!loading && !user">Welcome to app <q-btn color="primary" @click="loginPage" label="Get Started"/></div>
        <div v-else-if="loading && !user">Loading</div>
        <q-page-container>
          <router-view />
        </q-page-container>
    </DefaultLayoutVue>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import ConsoleComponent from '../components/console/ConsoleComponent.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { HTTPMethods, FetchProjectsResponse } from '@csv-ui/types';
import { useUserStore } from '../stores/user-store';
import { useProjectStore } from '../stores/project-store';
import DefaultLayoutVue from './DefaultLayout.vue';
import apiClient from '../api/apiClient';

export default defineComponent({
  name: 'MainLayout',
  components: { ConsoleComponent, DefaultLayoutVue },
  setup() {
      const auth = getAuth();
      const router = useRouter();
      const userStore = useUserStore();
      const projectStore = useProjectStore();
      const { user, loading } = toRefs(userStore);
      const { projects, loadingProjects } = toRefs(projectStore);
      const loginPage = () => router.push('/signup')
      onAuthStateChanged(auth, (userState) => {
        if (userState) {
          user.value = userState
          apiClient<FetchProjectsResponse>(`/project?uid=${userState.uid}`, HTTPMethods.GET).then((res) => {
            loadingProjects.value = false
            projects.value = res.response.getProjects.projects;
          }).catch((err) => {
            console.log(err);
            loadingProjects.value = false
          })
        } else {
          user.value = null
          projects.value = []
        }
        router.push('/')
        loading.value = false
      })
      return { user, loginPage, loading }
  },
});
</script>
