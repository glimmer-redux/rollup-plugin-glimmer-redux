# Glimmer Redux Rollup Plugin

## Description

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
        'store': './src/store.js',
        'middleware': './src/middleware/index.js',
        'enhancers': './src/enhancers/index.js'
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
