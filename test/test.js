'use strict';

const path = require('path');
const fs = require('fs-extra');
const mkdirp = require('mkdirp');
const assert = require('assert');
const helper = require('./helper');
const { rollup } = require('rollup');
const glimmerRedux = require('../src/index');
const nodeResolve = require('rollup-plugin-node-resolve');

helper.prepareSamples();

describe('rollup-plugin-glimmer-redux', function() {

  beforeEach(function() {
    mkdirp.sync(path.join('src'));
  });

  afterEach(function() {
    fs.removeSync(path.join('src'));
  });

  it('required typescript reducer is compiled without error', function () {
    helper.patchReducer('basic');

    return rollup({
      input: 'samples/basic/main.js',
      plugins: [
        nodeResolve(),
        glimmerRedux()
      ]
    }).then((bundle) => {
      return bundle.generate({ format: 'es' });
    }).then(({ code }) => {
      let result = fs.readFileSync(path.join(__dirname, 'samples', 'basic', 'result.js'), 'utf8');
      assert.strictEqual(result, code);
    });
  });

  it('including another typescript reducer compiles without error', function () {
    helper.patchReducer('todos');

    return rollup({
      input: 'samples/todos/main.js',
      plugins: [
        glimmerRedux()
      ]
    }).then((bundle) => {
      return bundle.generate({ format: 'es' });
    }).then(({ code }) => {
      let result = fs.readFileSync(path.join(__dirname, 'samples', 'todos', 'result.js'), 'utf8');
      assert.strictEqual(result, code);
    });
  });

  it('including nested typescript paths will compile without error', function () {
    helper.patchReducer('nested');

    return rollup({
      input: 'samples/nested/main.js',
      plugins: [
        glimmerRedux()
      ]
    }).then((bundle) => {
      return bundle.generate({ format: 'es' });
    }).then(({ code }) => {
      let result = fs.readFileSync(path.join(__dirname, 'samples', 'nested', 'result.js'), 'utf8');
      assert.strictEqual(result, code);
    });
  });

  it('optional typescript middleware included when user provides path', function () {
    helper.patchReducer('middleware');
    helper.patchMiddleware('middleware');

    return rollup({
      input: 'samples/middleware/main.js',
      plugins: [
        glimmerRedux({
          'middleware': './src/middleware/index.ts'
        })
      ]
    }).then((bundle) => {
      return bundle.generate({ format: 'es' });
    }).then(({ code }) => {
      let result = fs.readFileSync(path.join(__dirname, 'samples', 'middleware', 'result.js'), 'utf8');
      assert.strictEqual(result, code);
    });
  });

  it('optional typescript enhancers included when user provides path', function () {
    helper.patchReducer('enhancers');
    helper.patchEnhancer('enhancers');

    return rollup({
      input: 'samples/enhancers/main.js',
      plugins: [
        glimmerRedux({
          'enhancers': './src/enhancers/index.ts'
        })
      ]
    }).then((bundle) => {
      return bundle.generate({ format: 'es' });
    }).then(({ code }) => {
      let result = fs.readFileSync(path.join(__dirname, 'samples', 'enhancers', 'result.js'), 'utf8');
      assert.strictEqual(result, code);
    });
  });

  it('optional typescript store included when user provides path', function () {
    helper.patchStore('store');

    return rollup({
      input: 'samples/store/main.js',
      plugins: [
        glimmerRedux({
          'store': './src/store.ts'
        })
      ]
    }).then((bundle) => {
      return bundle.generate({ format: 'es' });
    }).then(({ code }) => {
      let result = fs.readFileSync(path.join(__dirname, 'samples', 'store', 'result.js'), 'utf8');
      assert.strictEqual(result, code);
    });
  });

  it('javascript reducers included when user provides path', function () {
    helper.patchReducer('javascript');

    return rollup({
      input: 'samples/javascript/main.js',
      plugins: [
        glimmerRedux({
          'reducers': './src/reducers/index.js'
        })
      ]
    }).then((bundle) => {
      return bundle.generate({ format: 'es' });
    }).then(({ code }) => {
      let result = fs.readFileSync(path.join(__dirname, 'samples', 'javascript', 'result.js'), 'utf8');
      assert.strictEqual(result, code);
    });
  });

  it('sagas will be included when middleware imports them', function () {
    helper.patchReducer('sagas');
    helper.patchMiddleware('sagas');

    return rollup({
      input: 'samples/sagas/main.js',
      plugins: [
        glimmerRedux({
          'middleware': './src/middleware/index.ts'
        })
      ]
    }).then((bundle) => {
      return bundle.generate({ format: 'es' });
    }).then(({ code }) => {
      let result = fs.readFileSync(path.join(__dirname, 'samples', 'sagas', 'result.js'), 'utf8');
      assert.strictEqual(result, code);
    });
  });

});
