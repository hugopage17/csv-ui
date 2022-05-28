<script lang="ts">
    import { defineComponent, PropType } from 'vue';
    import { useQuasar } from 'quasar';
    import { Project } from '@csv-ui/types';
    import CreateProjectDialog from '../dialogs/projects/CreateProjectDialog.vue';

    export default defineComponent({
        name: 'ConsoleComponent',
        props: {
            selectedProjects: { required: true, type: Array as PropType<Project[]> }
        },
        emits: ['openDeleteDialog'],
        setup(props) {
            const quasar = useQuasar();

            const openCreateProjectDialog = () => {
                quasar.dialog({
                    component: CreateProjectDialog,
                    componentProps: {
                        projects: props.selectedProjects
                    }
                })
            }

            return { openCreateProjectDialog }
        }
    })
</script>


<template>
    <div class="q-pa-md">
        <div class="row items-center q-mb-sm">
            <div class="text-h6">Overview</div>
            <q-space/>
            <div>
                <q-btn
                    title="Create Project"
                    icon="add"
                    color="primary"
                    @click="openCreateProjectDialog"
                    round
                    class="q-mr-sm"
                />
                <q-btn
                    :title="`Delete ${selectedProjects.length} selected projects`"
                    icon="delete"
                    color="primary"
                    round
                    @click="$emit('openDeleteDialog')"
                    class="q-mr-sm"
                />
            </div>
        </div>
        <q-separator/>
    </div>
</template>