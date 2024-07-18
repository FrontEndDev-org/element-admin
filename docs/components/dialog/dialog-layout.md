<!--@include: ../../global-tips.md-->

# DialogLayout 对话框布局

封装了对话框的基本布局和交互，包含了标题、内容、操作按钮等。

## 基本用法

<preview path="./demos/Base.vue" ></preview>

## 通过 API 控制对话框

一些动态的场景，可以通过 api 控制对话框，参数与组件属性一致，额外提供了 `content` 参数，用于设置对话框内容。

<preview path="./demos/UseApi.vue" ></preview>

## 属性

该组件是对 `el-dialog` 对二次封装，拓展以下属性：

<<< ../../../src/dialog/types.ts#DialogLayoutProps

除了以下内部控制的属性外，其余的 `el-dialog` 属性都支持：

-   width
-   align-center
-   close-on-click-modal
-   close-on-press-escape
-   append-to-body
-   before-close

## 方法

<<< ../../../src/dialog/types.ts#DialogLayoutExpose
