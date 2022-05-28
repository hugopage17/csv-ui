<script lang="ts">
    import { defineComponent, toRefs, computed, ref } from 'vue';
    import { FileData } from '@csv-ui/types';
    import { useProjectStore } from '../../../stores/project-store';
    import formatTableData from '../../../api/formatTableData';

    type RowData = {
        [key: string]: string | number;
    }

    export default defineComponent({
        setup () {
            const projectStore = useProjectStore();
        const { selectedProject } = toRefs(projectStore);
            const fileData = selectedProject?.value?.fileData as FileData;
            const columns = computed(() => {
                return Object.keys(fileData).map((header) => {
                    return {
                        key: header,
                        name: header,
                        align: 'center',
                        label: header,
                        field: header,
                        sortable: true
                    }
                });
            });
            const data = computed<RowData[]>(() => formatTableData(fileData));
            const pagination = ref({
                sortBy: 'desc',
                descending: false,
                // rowsNumber: xx if getting data from a server
            })
            return {
                data,
                columns,
                pagination
            }
        }
    })
</script>

<template>
    <div style="height: 60vh">
        <q-table
            :rows="data"
            :columns="columns"
            row-key="name"
            class="full-height"
            v-model:pagination="pagination"
        />
        <div class="row justify-center q-mt-md">
            <q-pagination
                v-model="pagination.page"
                color="grey-8"
                :max="pagesNumber"
                size="sm"
            />
        </div>
    </div>
</template>
