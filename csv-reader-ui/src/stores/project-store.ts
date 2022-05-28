import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Project } from '@csv-ui/types';

export const useProjectStore = defineStore('projects', () => {
    const projects = ref<Project[]>();
    const selectedProject = ref<Project | undefined>();
    const loadingProjects = ref(true);

    return { projects, loadingProjects, selectedProject }
});