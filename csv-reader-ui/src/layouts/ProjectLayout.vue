<script lang="ts">
    import { defineComponent, toRefs, ref } from 'vue';
    import { HTTPMethods, FetchProjectResponse } from '@csv-ui/types';
    import { useRoute } from 'vue-router'
    import { useProjectStore } from '../stores/project-store';
    import ProjectComponent from '../components/project/ProjectComponent.vue'
    import DefaultLayout from './DefaultLayout.vue';
    import apiClient from '../api/apiClient';
    import { onAuthStateChanged, getAuth } from 'firebase/auth';

    export default defineComponent({
        name: 'ProjectLayout',
        components: { ProjectComponent, DefaultLayout },
        setup() {
            const router = useRoute();
            const projectId = router.params.project;
            const projectStore = useProjectStore()
            const auth = getAuth();
            onAuthStateChanged(auth, (userState) => {
                console.log(userState);
            })
            const { projects, selectedProject } = toRefs(projectStore)
            const selectedSec = ref<string>('graph');
            const iconsList = ref([
                {
                    name: 'graph',
                    icon: 'show_chart'
                }, {
                    name: 'table',
                    icon: 'table_chart'
                }
            ]);
            const project = projects.value?.find((project) => project.id === projectId)
            selectedProject.value = project
            if (!project) {
                apiClient<FetchProjectResponse>(`/project/${projectId}`, HTTPMethods.GET).then((res) => {
                    const project = res.response.getProject.project
                    selectedProject.value = project;
                });
            }
            return { selectedProject, selectedSec, iconsList }
        }
    })
</script>


<template>
    <DefaultLayout :sidebar="true">
        <template v-slot:listIcons>
            <q-list>
                <q-item v-for="sec in iconsList" :key="sec.name" clickable v-ripple @click="selectedSec = sec.name">
                    <q-item-section avatar>
                        <q-icon :name="sec.icon" :color="selectedSec === sec.name ? 'primary' : 'grey'" size="sm"/>
                    </q-item-section>
                </q-item>
            </q-list>
        </template>
        <div class="q-pa-md">
            <ProjectComponent
                v-if="selectedProject"
                :selectedSec="selectedSec"
                :project="selectedProject"
            />
            <div v-if="!selectedProject" class="fixed-center">
                <div class="text-h5">Loading project, please wait...</div>
                <q-linear-progress indeterminate color="primary" class="q-mt-sm" />
            </div>
        </div>
    </DefaultLayout>
</template>
