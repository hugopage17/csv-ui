<script lang="ts">
    import { defineComponent, toRefs, ref } from 'vue';
    import { useQuasar } from 'quasar';
    import { Project, HTTPMethods, FetchProjectsResponse } from '@csv-ui/types';
    import CreateProjectDialog from '../dialogs/projects/CreateProjectDialog.vue';
    import DeleteProjectDialog from '../dialogs/projects/DeleteProjectDialog.vue';
    import DefaultLayout from '../../layouts/DefaultLayout.vue';
    import ConsoleHeader from './ConsoleHeader.vue';
    import { useProjectStore } from '../../stores/project-store';
    import { useUserStore } from '../../stores/user-store';
    import ProjectThumbnail from '../project/ProjectThumbnail.vue';
    import apiClient from '../../api/apiClient';

    export default defineComponent({
        name: 'ConsoleComponent',
        components: { DefaultLayout, ConsoleHeader, ProjectThumbnail },
        setup() {
            const projectStore = useProjectStore()
            const userStore = useUserStore()
            const { user } = toRefs(userStore);
            const { projects, loadingProjects, selectedProject } = toRefs(projectStore)
            const selectedProjects = ref<Project[]>([])

            const quasar = useQuasar()

            const openCreateProjectDialog = () => {
                quasar.dialog({
                    component: CreateProjectDialog
                })
            }

            const openDeleteProjectDialog = () => {
                quasar.dialog({
                    component: DeleteProjectDialog,
                    componentProps: { 
                        projects: selectedProjects.value
                    }
                }).onOk(() => {
                    loadingProjects.value = true
                    apiClient<FetchProjectsResponse>(`/project?uid=${user?.value?.uid}`, HTTPMethods.GET).then((res) => {
                        loadingProjects.value = false
                        console.log(res)
                        projects.value = res.response.getProjects.projects;
                    }).catch((err) => {
                        console.log(err);
                        loadingProjects.value = false
                    })
                })
            }

            const deleteSingle = (project: Project) => {
                selectedProjects.value = [project]
                openDeleteProjectDialog()
            }

            const selectedSec = ref<string>('files');
            const iconsList = ref<{
                name: string
                icon: string
            }[]>([
                {
                    name: 'files',
                    icon: 'description'
                },
                {
                    name: 'user',
                    icon: 'account_circle'
                }
            ]);

            const selectProject = (project: Project) => selectedProject.value = project;

            const addToSelected = (val: boolean, project: Project) => {
                if (val) {
                    selectedProjects.value.push(project)
                } else {
                    selectedProjects.value.filter(({ id }) => id !== project.id)
                }
            }

            return {
                projects,
                addToSelected,
                loading: loadingProjects,
                openCreateProjectDialog,
                selectProject,
                selectedProjects,
                iconsList,
                selectedSec,
                deleteSingle,
                openDeleteProjectDialog
            }
        }
    })
</script>


<template>
    <DefaultLayout :sidebar="true"> 
        <template v-slot:listIcons>
            <q-list>
                <q-item
                    v-for="sec in iconsList"
                    :key="sec.name"
                    clickable
                    v-ripple
                    @click="selectedSec = sec.name"
                >
                    <q-item-section avatar>
                        <q-icon
                            :name="sec.icon"
                            :color="selectedSec === sec.name ? 'primary' : 'grey'"
                            size="sm"
                        />
                    </q-item-section>
                </q-item>
            </q-list>
        </template>
        <div>
            <div>
                <ConsoleHeader
                    @openDeleteDialog="openDeleteProjectDialog"
                    :selectedProjects="selectedProjects"
                />
            </div>

            <div v-if="loading" class="fixed-center">
                <div class="text-h5">Loading projects, please wait...</div>
                <q-linear-progress indeterminate color="primary" class="q-mt-sm" />
            </div>

            <q-card v-else-if="!loading && (!projects || projects.length === 0)" class="fixed-center q-pa-sm">
                <q-card-section >
                    <div class="text-h5">Create your first project</div>
                </q-card-section>

                <q-card-actions align="center" style="width: 100%">
                    <q-btn label="Get Started" color="primary" @click="openCreateProjectDialog"/>
                </q-card-actions>
            </q-card>

            <div v-else-if="projects" class="row items-center q-ml-md">
                <ProjectThumbnail
                    v-for="project in projects"
                    :key="project.id"
                    :project="project"
                    @selectProject="selectProject(project)"
                    @openSelected="deleteSingle(project)"
                    @select="(val) => addToSelected(val, project)"
                />
            </div>
        </div>
    </DefaultLayout>
</template>