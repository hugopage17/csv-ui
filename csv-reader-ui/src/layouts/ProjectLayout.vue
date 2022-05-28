<script lang="ts">
    import { defineComponent, toRefs, ref } from 'vue';
    import { useRoute } from 'vue-router'
    import { useProjectStore } from '../stores/project-store';
    import ProjectComponent from '../components/project/ProjectComponent.vue'
    import DefaultLayout from './DefaultLayout.vue';

    export default defineComponent({
        name: 'ProjectLayout',
        components: { ProjectComponent, DefaultLayout },
        setup() {
            const router = useRoute();
            const projectId = router.params.project;
            const projectStore = useProjectStore()
            const { projects } = toRefs(projectStore)
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
            return { project, selectedSec, iconsList }
        }
    })
</script>


<template>
    <DefaultLayout>
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
            <ProjectComponent :selectedSec="selectedSec" :project="project"/>
        </div>
    </DefaultLayout>
</template>
