<template>
    <q-dialog ref="dialogRef" persistent>
        <q-card class="app-dialog" style="min-width: 560px;">
            <q-card-section class="row items-center bg-positive text-white">
                <div class="text-h6">New Project</div>
                <q-space />
                <q-btn flat dense icon="close" round @click="onDialogCancel" />
            </q-card-section>

            <q-card-section class="full-width column items-center q-gutter-y-md q-pa-xl">
                <q-input class="full-width" v-model="projectName" label="Project Name" color="primary"/>
                <q-file accept=".csv" filled @update:model-value="browseFile" bottom-slots v-model="selectedFile" label="Browse" counter>
                    <template v-slot:prepend>
                        <q-icon name="cloud_upload" @click.stop />
                    </template>
                    <template v-slot:append>
                        <q-icon name="close" @click.stop="selectedFile = null" class="cursor-pointer" />
                    </template>

                    <template v-slot:hint>
                        csv
                    </template>
                </q-file>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn
                    label="Create"
                    :disabled="creatingProject"
                    color="positive"
                    :loading="creatingProject"
                    @click="createProject"
                />
            </q-card-actions>
        </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue'
import { useDialogPluginComponent, useQuasar } from 'quasar'
import { useRouter } from 'vue-router';
import { FileData, APIResponse, CreateProjectResponse } from '@csv-ui/types';
import { useUserStore } from '../../../stores/user-store';
import { useProjectStore } from '../../../stores/project-store';
import axios from 'axios'

export default defineComponent({
  name: 'CreateProjectDialog',
  setup() {
    const { dialogRef, onDialogCancel, onDialogOK } = useDialogPluginComponent()
    const projectName = ref<string>('');
    const quasar = useQuasar();
    const selectedFile = ref();
    const fileData = ref<FileData>({});
    const creatingProject = ref<boolean>(false);
    const router = useRouter();

    const userStore = useUserStore();
    const projectStore = useProjectStore();
    const { user } = toRefs(userStore);
    const { selectedProject, projects } = toRefs(projectStore)
    // eslint-disable-next-line
    const browseFile = (e: any) => {
        if (e) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e?.target?.result as string;
                const dataObject: FileData = {};
                const allArray: string[][] = []
                data.split('\n').forEach((eachEntry) => {
                    eachEntry.split(',').forEach((entry, entryIdx) => {
                        if (!allArray[entryIdx]) {
                            allArray[entryIdx] = []
                            allArray[entryIdx].push(entry);
                        } else {
                            allArray[entryIdx].push(entry);
                        }
                    })
                });
                allArray.forEach((array) => {
                    const key = array?.shift()?.trim() as string;
                    dataObject[key] = { content: [], enabled: true, axisType: 'y-axis' }
                    array.forEach((item) => {
                        dataObject[key]?.content.push(item);
                    });
                });
                fileData.value = dataObject
            };
            reader.readAsText(e);
        }
    }

    const createProject = async() => {
        creatingProject.value = true
        try {
            const call = await axios.post('https://0jamvxoi9l.execute-api.ap-southeast-2.amazonaws.com/prod/v0/rest/project', {
                projectName: projectName.value,
                userId: user.value?.uid,
                fileData: fileData.value
            })
            const data = await call.data as APIResponse<CreateProjectResponse>
            selectedProject.value = data.response.createProject
            projects.value?.push(data.response.createProject)
            onDialogOK()
            quasar.notify({
                message: data.response.message,
                color: 'positive'
            })
            router.push(`/${data.response.createProject.id}`)
            return data;
        } catch (err) {
            onDialogOK()
            quasar.notify({
                message: 'Failed to create project',
                color: 'negative'
            })
        }
        creatingProject.value = false
    }

    return {
      dialogRef,
      onDialogCancel,
      onDialogOK,
      selectedFile,
      projectName,
      createProject,
      browseFile,
      creatingProject,
      user
    }
  }
})
</script>