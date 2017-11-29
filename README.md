# Glimmer Redux Rollup Plugin

Rollup plugin to customize the store, middleware, or enhancer for glimmer redux

## Installation

```
yarn add rollup-plugin-glimmer-redux
```

## Usage

To write your own store, middleware or enhancer just provide an option

```
let app = new GlimmerApp(defaults, {
  rollup: {
    plugins: [
      glimmerRedux({
        'store': './src/store.ts',
        'middleware': './src/middleware/index.ts',
        'enhancers': './src/enhancers/index.ts'
      })
    ]
  }
});
```

Be sure to define the type for any of the above by updating the config/environment.js file

```
moduleConfiguration['types']['middleware'] = {
  definitiveCollection: 'middleware'
};
moduleConfiguration['collections']['middleware'] = {
  types: ['middleware/index'],
  defaultType: 'middleware'
};
```
