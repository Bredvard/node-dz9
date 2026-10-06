const express = require('express');

const app = express();
const port = 3000;


const users = [];
const articles = [];
let nextUserId = 1;
let nextArticleId = 1;
app.use(express.json());
app.set('view engine', 'pug');

app.get('/users', (req, res) => {
  const data = { title: 'Головна сторінка', users};
  res.render('index', data);
});
app.get('/users/:userId', (req, res) => {
  const user = users.find(u => u.id === Number(req.params.userId));
  if (!user) {
  return res.status(404).send('Користувача не знайдено');
}
  const data = { title: 'Головна сторінка', user };
  res.render('userid', data);
});

app.get('/articles', (req, res) => {
  
  const data = { title: 'Головна сторінка', articles };
  
  res.render('index.ejs', data);
});
app.get('/articles/:articleId', (req, res) => {
  const article = articles.find(u => u.id === Number(req.params.articleId));
  if (!article) {
  return res.status(404).send('Статтю не знайдено');
  }
  const data = { title: 'Головна сторінка', article };
  res.render('article.ejs', data);
});
app.post('/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Потрібні поля name та email' });
  }

  const user = { id: nextUserId++, name, email };
  users.push(user);

  res.status(201).json(user);
});

app.post('/articles', (req, res) => {
  const { year, header} = req.body;

  if (!year || !header) {
    return res.status(400).json({ error: 'Потрібні поля year та header' });
  }

  const article = { id: nextArticleId++, header, year };
  articles.push(article);

  res.status(201).json(article);
});

// Запускаємо сервер
app.listen(port, () => {
  console.log(`Сервер запущено за адресою <http://localhost>:${port}`);
});