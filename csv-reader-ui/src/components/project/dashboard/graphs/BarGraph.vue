<template>
<q-card class="q-ma-md" style="height: 60vh;">
    <Bar
        :chart-data="graphData"
        :chart-options="chartOptions"
    />
</q-card>
    
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { DataObject, FileData, Project } from '@csv-ui/types';
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, BarElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, BarElement)

export default defineComponent({
  name: 'LineGraphComponent',
  components: { Bar },
  props: {
        xAxis: { required: true, type: String },
        selectedProject: { required: true, type: Object as PropType<Project> },
        colors: { required: true, type: Array as PropType<string[]> },
    },
  setup(props) {
    const fileData = props.selectedProject?.fileData as FileData;

    

    const datasets = computed(() => {
        return Object.entries(fileData)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .filter(([label, dataObj]) => label !== props.xAxis)
            .map(([label, dataObj]: [string, DataObject | undefined], idx: number) => {
                if(dataObj?.enabled && label !== props.xAxis) {
                    return {
                        label,
                        data: dataObj.content,
                        backgroundColor: props.colors[idx],
                        borderColor: props.colors[idx],
                        borderWidth: 1,
                        pointRadius: 1,
                    };
                }
        }).filter(Boolean);
    });

    const graphData = computed(() => {
        return {
            labels: fileData[props.xAxis]?.content.filter((item: string) => item !== '') ?? [],
            datasets: datasets.value,
        };
    })
    return {
        graphData,
        chartOptions: {
            responsive: true,
            maintainAspectRatio: false
        }
    }
  }
})
</script>