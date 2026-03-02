const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
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

// Dados
const products = require('./public/data/products.json');
const conjuntos = require('./public/data/conjuntos.json');
const monster = require('./public/data/monster.json');
const novidades = require('./public/data/novidades.json');
const colecionador = require('./public/data/colecionador.json');

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
  res.render('conjuntos', { conjuntos });
});

app.get('/monster-trucks', (req, res) => {
  res.render('Monster', { monster });
});

app.get('/novidades', (req, res) => {
  res.render('novidades', { novidades });
});

app.get('/colecionador', (req, res) => {
  res.render('colecionador', { colecionador });
});

// Rota 404
app.use((req, res) => {
  res.status(404).render('home');
});

// Exporta o app para a Vercel (serverless)
module.exports = app;

// Roda localmente se não estiver em ambiente serverless
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}
