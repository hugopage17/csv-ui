<template>
<q-card class="q-ma-md" style="height: 60vh;">
    <LineGraph
        :xAxis="xAxis"
        :selectedProject="selectedProject"
        :colors="colors"
        v-if="graphType === 'line'"
    />
    <BarGraph 
        :xAxis="xAxis"
        :selectedProject="selectedProject"
        :colors="colors"
        v-else-if="graphType === 'bar'"
    />
</q-card>
    
</template>

<script lang="ts">
import { defineComponent, toRefs, ref } from 'vue'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'
import { useProjectStore } from '../../../stores/project-store';
import LineGraph from './graphs/LineGraph.vue';
import BarGraph from './graphs/BarGraph.vue';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

export default defineComponent({
  name: 'GraphComponent',
  components: { LineGraph, BarGraph },
  props: {
        xAxis: { required: true, type: String },
        graphType: { required: true, type: String }
    },
  setup() {
    const projectStore = useProjectStore();
    const { selectedProject } = toRefs(projectStore)

    const colors = ['#07FFC4', '#04b58b', '#64E8FF'];
    return {
        selectedProject,
        colors
    }
  }
})
</script>