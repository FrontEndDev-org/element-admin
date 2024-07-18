import {
    DefaultFormType,
    LayoutKey,
    TableLayoutProps,
    TableStore,
} from './types';
import { UnwrapNestedRefs } from 'vue';

const useTableLayoutProvide = <FormType>(
    props: TableLayoutProps<FormType>
): TableStore<FormType> => {
    const load = async () => {
        const { pageNum, pageSize, ...rest } = tableStore.params;
        tableStore.loading.value = true;
        try {
            const { data, total } = await props.loadMethod({
                pageNum,
                pageSize,
                ...rest,
            });
            tableStore.tableData.value = data;
            tableStore.total.value = total;
            // 没有数据但是有总数，说明当前页码超过了最大页码，需要重新加载
            if (data.length === 0 && total > 0) {
                tableStore.params.pageNum = Math.ceil(total / pageSize);
                load().finally();
            }
        } catch (e) {
            console.error(e);
        }
        tableStore.loading.value = false;
    };

    const tableStore: TableStore<FormType> = {
        refresh: load,
        reset: () => {
            tableStore.params.pageNum = 1;
            for (const key in tableStore.params) {
                if (['pageNum', 'pageSize'].includes(key)) continue;
                tableStore.params[key] = undefined;
            }
            load().finally();
        },
        saveMethod: props.saveMethod,
        formInitMethod: props.formInitMethod,
        formDialog: reactive({
            ref: ref(null as any),
            open: () => undefined,
        }),
        formRef: ref(null),
        formData: reactive({}) as UnwrapNestedRefs<FormType>,
        formRules: props.formRules,
        loading: ref(false),
        delete: (row) => {
            if (!props.deleteMethod) {
                throw new Error('deleteMethod is not provided');
            }
            return props.deleteMethod({ row, params: tableStore.params });
        },
        params: reactive({ pageNum: 1, pageSize: 10 }),
        tableData: ref([]),
        total: ref(0),
        deleteConfirmDialogRef: ref(null),
        allColumns: ref([]),
        hideColumns: ref([]),
    };

    watch(
        () => ({
            pageNum: tableStore.params.pageNum,
            pageSize: tableStore.params.pageSize,
        }),
        () => {
            load().finally();
        },
        { deep: true, immediate: props.immediate ?? true }
    );

    provide<TableStore<FormType>>(props.layoutKey || 'tableStore', tableStore);

    return tableStore;
};

const useTableLayoutInject = <FormType>(
    layoutKey?: LayoutKey
): TableStore<FormType> => {
    const tableStore = inject<TableStore<FormType>>(layoutKey || 'tableStore');
    if (!tableStore) {
        throw new Error('tableStore is not provided');
    }
    return tableStore;
};

export const useTableLayout = <FormType = DefaultFormType>(
    props?: LayoutKey | TableLayoutProps<FormType>
): TableStore<FormType> => {
    if (['string', 'symbol'].includes(typeof props)) {
        return useTableLayoutInject<FormType>(props as LayoutKey);
    } else if (!props) {
        return useTableLayoutInject<FormType>();
    } else {
        return useTableLayoutProvide<FormType>(
            props as TableLayoutProps<FormType>
        );
    }
};
