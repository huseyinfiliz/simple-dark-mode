import app from 'flarum/forum/app';

export { default as extend } from './extend';

app.initializers.add('huseyinfiliz-simple-dark-mode', () => {
  console.log('[huseyinfiliz/simple-dark-mode] Hello, forum!');
});
