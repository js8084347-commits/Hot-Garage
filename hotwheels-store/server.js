const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do Handlebars com suporte a partials
const hbs = exphbs.create({
  defaultLayout: 'main',
  partialsDir: path.join(__dirname, 'views/partials'),
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

const products = require('./public/data/products.json');

// Rotas principais
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/products', (req, res) => {
  res.render('products', { products });
});

app.get('/cart', (req, res) => {
  res.render('cart');
});

app.get('/checkout', (req, res) => {
  res.render('checkout');
});

app.get('/conjuntos', (req, res) => {
  res.render('conjuntos');
});

app.get('/monster-trucks', (req, res) => {
  res.render('monster');
});

app.get('/novidades', (req, res) => {
  res.render('novidades');
});

app.get('/colecionador', (req, res) => {
  res.render('colecionador');
});

// Rota 404
app.use((req, res) => {
  res.status(404).render('home');
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
