// #region DialogLayoutProps
export interface DialogLayoutProps {
    title?: string;
    confirmMethod?: () => Promise<any> | any;
    cancelMethod?: () => Promise<any> | any;
    confirmText?: string;
    cancelText?: string;
}
// #endregion DialogLayoutProps

// #region DialogLayoutExpose
export interface DialogLayoutExpose {
    open: (props: Partial<DialogLayoutProps>) => void;
    close: () => void;
}
// #endregion DialogLayoutExpose
