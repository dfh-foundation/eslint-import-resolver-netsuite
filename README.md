# eslint-import-resolver-netsuite

This resolver can be used with [`eslint-plugin-import`][eslint-plugin-import-home]
to help identify import errors in NetSuite SuiteScript 2.x projects.

## What this does

The AMD module loader in SuiteScript 2.x follows different semantics than Node. In
particular, NetSuite does not resolve relative directory imports, and this resolver
enables ESLint to identify errors in static analysis.

## Usage

This resolver accepts a single configuration option: `extensions`. This defaults to
`[".js", ".ts", ".d.ts"]` and is passed to Substack's [`resolve`][resolve-home].

```js
module.exports = {
  settings: {
    'import/resolver': {
      'eslint-import-resolver-netsuite': {}
    }
  }
}
```

[eslint-plugin-import-home]: https://github.com/benmosher/eslint-plugin-import
[resolve-home]: https://github.com/browserify/resolve
