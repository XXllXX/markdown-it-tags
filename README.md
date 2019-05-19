# markdown-it-tags

## 安装

```bash
npm install markdown-it-tags
Or
yarn add markdown-it-tags
```

## 用法

```css
.note-tags {
  color: rgba(44, 63, 81, 0.3);
}

.note-tags code {
  color: rgba(44, 63, 81, 0.5);
  background: rgba(102, 128, 153, 0.075);
  border-radius: 0;
  padding: 2px 5px;
}

.note-tags code:empty {
  display: none;
}

.note-tags .notebook {
  background: rgba(44, 63, 81, 0.3);
  color: #fff;
  margin-right: 6px;
}
```

```js
var md = require('markdown-it')().use(require('markdown-it-tags'))

md.render('@(markdown)[markdown-it|plugin|tags]') // => '<p><p class="note-tags"><code class="notebook">markdown</code> <code >markdown-it</code> <code >plugin</code> <code >tags</code> </p></p>'
```

## 参数

| 参数名         | 描述             | 默认值    |
| -------------- | ---------------- | --------- |
| containerClass | 包裹 Class       | note-tags |
| mainClass      | 括号里内容 Class | notebook  |
| otherClass     | 中括号内容 Class |           |

```js
var md = require('markdown-it')().use(require('markdown-it-tags'), { containerClass: 'container-tags', mainClass: 'main-tag', otherClass: '' })

md.render('@(markdown)[markdown-it|plugin|tags]') // => '<p><p class="container-tags"><code class="main-tag">markdown</code> <code >markdown-it</code> <code >plugin</code> <code >tags</code> </p></p>'
```
