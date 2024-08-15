## @xlong-eslint/eslint-plugin

> 自定义 eslint 工具  
> 包含了 styled-components 样式检测【通用样式检测】【全局变量检测】  
> 包含了 styles 样式检测【通用样式检测】【全局变量检测】 

#### 安装

```shell
npm install @xlong-eslint/eslint-plugin
yarn add @xlong-eslint/eslint-plugin
pnpm add @xlong-eslint/eslint-plugin
```

### styled-components 配置

###### 使用 styled.Css 编写通用样式 src/styles/commons.ts
```typescript
import { css } from "styled-components";

// 其他 styled 中如果使用当前样式 centerAlign，插件会检测出来并报错
export const centerAlign = css`
  display: flex;
  align-items: center;
`;

// 其他 styled 中如果使用当前样式 center，插件会检测出来并报错
export const center = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
```

###### 配置 .eslintrc.js
```typescript
module.exports = {
  ... ,
  extends: ["eslint:recommended", 'plugin:@xlong-eslint/styledComponents',],
  parserOptions: {
    ... ,
    styleRuleSameConfig: {
      // 禁止使用的样式规则，使用定义的变量代替
      cssRules: {
        // 不能使用 z-index:1, 值只能是变量 z-index:${toastIndex}、z-index:${({theme})=>theme.tab.index}
        zIndex: true,
        // 不能 color:red、color: #ffffff
        color: ['red','#ffffff'],
        // 不能 font-size:12px
        fontSize: ['12px'],
      },
      // styled.Css 编写通用样式目录数组
      styles: ['src/styles/commons'],
      messages: ''
    }
  },
  ... ,
}

```

