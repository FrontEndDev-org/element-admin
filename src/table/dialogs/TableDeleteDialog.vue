<script setup lang="ts">
import { useTableLayout } from '../composables';
import DialogLayout from '../../dialog/DialogLayout.vue';

const props = defineProps<{
    layoutKey?: string;
}>();

const tableStore = useTableLayout(props.layoutKey);
</script>

<template>
    <DialogLayout :ref="tableStore.deleteConfirmDialogRef" />
</template>
