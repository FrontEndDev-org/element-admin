<!--@include: ../../global-tips.md-->

# Table Actions&Dialogs 表格操作列和对话框

封装了常用的表格操作，以及关联的对话框及其交互流程

## 删除操作

<preview path="./demos/Delete.vue"  />

## 编辑操作

<preview path="./demos/Edit.vue"  />

## 折叠操作按钮

`TableActionColumn` 可配置 `maxLength` 来控制折叠按钮的最大数量（不配置则不进行折叠）
通过`more-popover-reference`插槽可以自定义折叠按钮

<preview path="./demos/ActionColumn.vue"  />
