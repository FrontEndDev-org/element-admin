import { Ref, UnwrapNestedRefs } from 'vue';
import DialogLayout from '../dialog/DialogLayout.vue';
import { FormInstance, FormRules } from 'element-plus';

export type DefaultFormType = Record<string, any>;
export type LayoutKey = string | symbol;

export interface TableLayoutProps<FormType = DefaultFormType> {
    loadMethod: (props: {
        pageNum: number;
        pageSize: number;
        [key: string]: any;
    }) => Promise<{
        data: any[];
        total: number;
    }>;
    deleteMethod?: (props: { row: any; params: any }) => Promise<void>;
    saveMethod?: (props: {
        form: FormType;
        type: FormCurrentType;
    }) => Promise<void>;
    formInitMethod?: (props: {
        row?: any;
        type: FormCurrentType;
    }) => Promise<FormType> | FormType;
    formRules?: FormRules<Ref<FormType>>;
    layoutKey?: LayoutKey;
    immediate?: boolean;
}

export type FormCurrentType = 'add' | 'edit' | 'view';

export interface TableStore<FormType = DefaultFormType> {
    refresh: () => void;
    reset: () => void;
    delete?: (row: any) => Promise<void>;
    saveMethod?: (props: {
        form: FormType;
        type: FormCurrentType;
    }) => Promise<void>;
    formInitMethod?: (props: {
        row?: any;
        type: FormCurrentType;
    }) => Promise<void>;
    formDialog: {
        ref: Ref<InstanceType<typeof DialogLayout> | null>;
        open: (props: {
            type: FormCurrentType;
            row?: any;
            title?: string;
        }) => void;
    };
    formRef?: Ref<FormInstance | null>;
    formData: UnwrapNestedRefs<FormType>;
    formRules?: FormRules<Ref<FormType>>;
    loading: Ref<boolean>;
    params: UnwrapNestedRefs<{
        pageSize: number;
        pageNum: number;
        [key: string]: any;
    }>;
    tableData: Ref<any[]>;
    total: Ref<number>;
    deleteConfirmDialogRef: Ref<InstanceType<typeof DialogLayout> | null>;
    allColumns: Ref<any[]>;
    hideColumns: Ref<any[]>;
}
