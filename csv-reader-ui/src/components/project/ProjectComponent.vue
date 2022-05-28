<template>
    <div>
        <div>
          <div class="row items-center q-mb-sm text-h6">
            <div class="row items-center">
              <q-btn
                title="Return to overview"
                icon="home"
                color="primary"
                round
                class="q-mr-sm"
                @click="returnHome"
              />
              <div v-if="!editMode">
                {{ projectName }}
              </div>
              <q-input
                v-else-if="editMode"
                :placeholder="projectName"
                color="primary"
                v-model="projectName"
              >
                <template v-slot:append>
                    <q-btn
                      icon="save"
                      color="primary"
                      :loading="makingEdit"
                      :disabled="makingEdit"
                      @click="updateProject"
                    />
                </template>
              </q-input>
            </div>
            <q-space/>
            <q-btn-group>
              <q-btn color="primary" icon="edit" title="Rename Project" @click="editMode = true" />
              <q-btn color="primary" icon="download" title="Export to CSV" />
              <q-btn color="primary" icon="delete" title="Delete Project" @click="openDeleteProjectDialog"/>
            </q-btn-group>
          </div>
          <q-separator />
        <div class="q-ma-sm">
          <q-card class="q-pa-sm row justify-between" style="height: 60vh;" v-if="selectedSec === 'graph'">
            <DatasetsComponent class="col" :xAxis="xAxis" @setXaxis="setXaxis"/>
            <q-separator />
            <GraphComponent class="col" :xAxis="xAxis" v-if="xAxis"/>
          </q-card>

          <q-card style="height: 60vh;" v-else-if="selectedSec === 'table'">
            <TableComponent />
          </q-card>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { Project } from '@csv-ui/types';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import TableComponent from './table/TableComponent.vue';
import { api } from '../../boot/axios';
import DatasetsComponent from './dashboard/DatasetsComponent.vue'
import GraphComponent from './dashboard/GraphComponent.vue'
import DeleteProjectDialog from '../dialogs/projects/DeleteProjectDialog.vue'

export default defineComponent({
  name: 'ProjectComponent',
  components: { TableComponent, DatasetsComponent, GraphComponent },
  props: {
    project: { required: true, type: Object as PropType<Project> },
    selectedSec: { required: true, type: String },
  },
  setup(props) {
    const xAxis = ref<string>('');
    const setXaxis = (xVal: string) => xAxis.value = xVal
    const editMode = ref<boolean>(false);
    const makingEdit = ref<boolean>(false);
    const projectName = ref(props.project.projectName);

    const quasar = useQuasar()
    const openDeleteProjectDialog = () => {
      quasar.dialog({
          component: DeleteProjectDialog,
          componentProps: { 
            projects: [ props.project ]
          }
      });
    }

    const updateProject = () => {
      makingEdit.value = true
      api.put('/project', {
        data: {
          projectName: projectName.value,
          projectId: props.project.id
        }
      }).then(() => {
        editMode.value = false
        makingEdit.value = false
        quasar.notify({
          message: 'Successfully updated project',
          color: 'positive'
        })
      }).catch(() => {
        editMode.value = false
        makingEdit.value = false
        projectName.value = props.project.projectName
        quasar.notify({
          message: 'Failed to update project',
          color: 'negative'
        })
      })
    }

    const router = useRouter();
    const returnHome = () => router.push('/')

    return {
      xAxis,
      setXaxis,
      returnHome,
      openDeleteProjectDialog,
      editMode,
      projectName,
      updateProject,
      makingEdit
    }
  }
})
</script>