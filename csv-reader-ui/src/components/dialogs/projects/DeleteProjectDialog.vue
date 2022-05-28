<template>
    <q-dialog ref="dialogRef" persistent>
        <q-card class="app-dialog" style="min-width: 560px;">
            <q-card-section class="row items-center bg-negative text-white">
                <div class="text-h6">Delete Project</div>
                <q-space />
                <q-btn flat dense icon="close" round @click="onDialogCancel" />
            </q-card-section>

            <q-card-section class="column items-center q-gutter-y-md q-pa-xl">
               <div class="text-subtitle1">Are you sure you want to delete the following projects</div>
                <q-list class="items-left">
                    <q-item
                        v-for="project in projects"
                        :key="project.id"
                    >
                        <q-item-section>{{ project.projectName }}</q-item-section>
                    </q-item>
                </q-list>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn
                    label="Delete"
                    :disabled="deletingProject"
                    color="negative"
                    :loading="deletingProject"
                    @click="deleteProject"
                />
            </q-card-actions>
        </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { useDialogPluginComponent, useQuasar } from 'quasar'
import { useRouter } from 'vue-router';
import { APIResponse, ResponseBase, Project } from '@csv-ui/types';
import { api } from '../../../boot/axios';

export default defineComponent({
  name: 'DeleteProjectDialog',
  props: { projects: { required: true, type: Array as PropType<Project[]> } },
  setup(props) {
    const { dialogRef, onDialogCancel, onDialogOK } = useDialogPluginComponent()
    const quasar = useQuasar();
    const router = useRouter();
    const deletingProject = ref<boolean>(false);
    // eslint-disable-next-line

    const deleteProject = async() => {
        deletingProject.value = true
        try {
            const call = await api.delete('/project', {
                data: {
                    projects: props.projects.map(({ id }) => id)
                }
            })
            const data = await call.data as APIResponse<ResponseBase>
            onDialogOK()
            quasar.notify({
                message: data.response.message,
                color: 'positive'
            })
            router.push('/')
            deletingProject.value = false
        } catch (err) {
            onDialogOK()
            quasar.notify({
                message: 'Failed to delete project',
                color: 'negative'
            })
        }
    }

    return {
      dialogRef,
      deletingProject,
      onDialogCancel,
      onDialogOK,
      deleteProject,
    }
  }
})
</script>