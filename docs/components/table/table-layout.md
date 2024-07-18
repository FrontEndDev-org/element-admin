<!--@include: ../../global-tips.md-->

# TableLayout 表格布局

表格场景系列组件，用于快速搭建表格场景。

## 基础用法

以下是一个最简单的示例

<preview path="./demos/Base.vue" ></preview>

## 顶部插槽

<preview path="./demos/OptSlots.vue" ></preview>

## 流体高度

同 `el-table` 的流体高度，`TableLayout` 在默认情况下表现为 `flex-grow`，
通过配置 `maxHeight` 来取消这一行为，并开启原始的流体高度模式。

<preview path="./demos/MaxHeight.vue" ></preview>

## 隐藏分页

<preview path="./demos/NoFooter.vue" ></preview>

## 边框和斑马纹

默认关闭边框，开启版本纹，可自定义修改

<preview path="./demos/BorderAndStripe.vue" ></preview>
