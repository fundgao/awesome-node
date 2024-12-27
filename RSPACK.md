# rspack

## 包分析

`rspack build --analyze`

- Rspack CLI 支持使用 --analyze 选项进行包体积分析

## 开启 SourceMap

## 性能分析

## Tree Shaking

Rspack 支持 tree shaking 功能，这是一个在 JavaScript 生态中广泛使用的术语，主要用于去除未被访问的代码，俗称“死代码”。当一个模块的某些导出未被使用且不存在副作用时，这部分代码就可以被安全地删除，以减小最终产物的体积。
