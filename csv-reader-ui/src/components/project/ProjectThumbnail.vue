<template>
    <div class="items-center q-pa-sm">
        <q-btn
          flat
          round
          color="dark-grey"
          icon="description"
          size="xl"
          @click="openProject"
        />
        <div>
          <q-checkbox @click="$emit('select', val)" v-model="val"/>
          {{ project.projectName }}
          <q-btn
            flat
            round
            color="dark-grey"
            icon="more_vert"
            size="sm"
          >
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup @click="openProject">
                  <q-item-section>Open</q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="$emit('openSelected')">
                  <q-item-section>Delete</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { useRouter } from 'vue-router';
import { Project } from '@csv-ui/types';

export default defineComponent({
  name: 'ProjectThumbnail',
  props: {
    project: { required: true, type: Object as PropType<Project> }
  },
  emits: ['selectProject', 'openSelected', 'select'],
  setup(props, { emit }) {
      const router = useRouter();
      const openProject = () => {
        emit('selectProject')
        router.push(`${props.project.id}`)
      }
      return { openProject, val: ref(false) }
  }
})
</script>
