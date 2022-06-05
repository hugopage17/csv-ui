<script lang="ts">
  import { defineComponent, toRefs, computed, Ref } from 'vue'
  import { DataObject, FileData, Project } from '@csv-ui/types';
  import { useProjectStore } from '../../../stores/project-store';

  export default defineComponent({
    name: 'DatasetsComponent',
    emits: [ 'setXaxis', 'setGraphType' ],
    props: {
        xAxis: { required: true, type: String },
        graphType: { required: true, type: String },
    },
    setup(props) {
        const projectStore = useProjectStore();
        const selectedProject = toRefs(projectStore).selectedProject as Ref<Project>;

        const fileData = selectedProject?.value?.fileData as FileData;

        const dataKeys = computed<{ label: string, value: string }[]>(() => {
            return Object.keys(fileData).map((fileKey) => {
                return {
                    label: fileKey,
                    value: fileKey,
                }
            });
        })

        const yAxisKeys = computed(() => {
            return Object.keys(fileData ?? {}).filter((key) => key !== props.xAxis);
        })

        const enabledYAxisKeys = computed<string[]>(() => {
            return Object.entries(fileData ?? {}).map(([key, dataObj]: [string, DataObject | undefined]) => {
                if (dataObj?.enabled && key !== props.xAxis) {
                    return key;
                }
            }).filter(Boolean) as string[];
        });

        return {
            fileData: selectedProject?.value?.fileData as FileData,
            dataKeys,
            yAxisKeys,
            enabledYAxisKeys,
            xAxisKey: props.xAxis,
        };
    },
  })
</script>

<template>
    <div class="row items-center q-ma-sm">
        <q-select
            @update:model-value="$emit('setXaxis', $event)"
            standout="bg-primary text-white"
            v-model="xAxisKey"
            :options="yAxisKeys"
            label="X Axis"
            style="width: 30%;"
        />
        <q-space/>
        <q-card class="q-pa-sm row">
            <q-btn-group class="q-mr-sm">
                <q-btn @click="$emit('setGraphType', 'line')" :color="graphType === 'line' ? 'secondary' : 'primary'" icon="show_chart" title="Line Chart"/>
                <q-btn @click="$emit('setGraphType', 'bar')" :color="graphType === 'bar' ? 'secondary' : 'primary'" icon="bar_chart" title="Bar Chart" />
                <q-btn @click="$emit('setGraphType', 'pie')" :color="graphType === 'pie' ? 'secondary' : 'primary'" icon="pie_chart" title="Pie Chart" />
            </q-btn-group>
            <q-separator vertical />
            <q-checkbox
                v-for="yAxis in yAxisKeys"
                :key="yAxis"
                v-model="fileData[yAxis].enabled"
                :val="yAxis"
                :label="yAxis"
                color="primary"
                class="q-mr-sm"
            />
        </q-card>
    </div>
</template>

<style>
    .root-wrapper {
        width: 100%;
        height: 100vh;
    }
</style>
