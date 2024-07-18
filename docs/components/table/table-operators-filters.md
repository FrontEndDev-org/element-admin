<!--@include: ../../global-tips.md-->

# Table Operators&Filters 表格顶部操作和过滤器

封装了常用的表格顶部操作和过滤器

## 过滤组合场景

<preview path="./demos/Filters.vue"  />

## 自定义过滤器

一些较为复杂的场景，你可能需要自定义过滤器，可以通过 `tableFilter` 组件实现，
param-key 将会在 params 中注册相应的 key，在搜索和重置时会自动处理。

<preview path="./demos/CustomFilters.vue"  />

## 新增

<preview path="./demos/Add.vue"  />

## 控制列显隐

<preview path="./demos/ControlColumnVisible.vue" />
