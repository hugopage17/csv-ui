<template>
    <div class="row items-center q-mb-lg q-mt-lg">
        {{ detail.key }}
        <q-space/>
        <q-btn
            v-if="detail.isCopyable"
            :label="detail.value"
            outline
            color="accent"
            style="text-transform: none;"
            class="bg-white"
        />
        <q-input
            v-else-if="detail.isEditable"
            outlined
            color="accent"
            class="bg-white"
            v-model="form"
        >
            <template v-slot:append>
                <q-btn
                    icon="edit"
                    color="accent"
                />
            </template>
        </q-input>
        <div v-else>
            {{ detail.value }}
        </div>
    </div>
</template>


<script lang="ts">
    import { defineComponent, PropType, ref } from 'vue';
    import { Detail } from './displayableDetails';

    export default defineComponent({
        name: 'AccountDetail',
        props: {
            detail: {
                type: Object as PropType<Detail>,
                required: true
            }
        },
        setup(props) {
            return {
                form: ref(props.detail.value)
            }
        }
    })
</script>