<template>
<div style="height: 60vh;">
    <Line
        :chart-data="graphData"
        :chart-options="chartOptions"
    />
</div>
    
</template>

<script lang="ts">
import { defineComponent, toRefs, computed } from 'vue'
import { DataObject, FileData } from '@csv-ui/types';
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'
import { useProjectStore } from '../../../stores/project-store';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

export default defineComponent({
  name: 'GraphComponent',
  components: { Line },
  props: {
        xAxis: { required: true, type: String }
    },
  setup(props) {
    const projectStore = useProjectStore();
    const { selectedProject } = toRefs(projectStore)
    const fileData = selectedProject?.value?.fileData as FileData;
    const colors = ['#64ffda', '#26A69A', '#64E8FF'];

    const datasets = computed(() => {
        return Object.entries(fileData)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .filter(([label, dataObj]) => label !== props.xAxis)
            .map(([label, dataObj]: [string, DataObject | undefined], idx: number) => {
                if(dataObj?.enabled && label !== props.xAxis) {
                    return {
                        label,
                        data: dataObj.content,
                        backgroundColor: colors[idx],
                        borderColor: colors[idx],
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