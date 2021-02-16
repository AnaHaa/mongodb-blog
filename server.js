const express = require('express')
const mongoose = require('mongoose')
const article = require('./models/article')
const articleRouter = require('./routes/articles')
const Article = require('./models/article')
const methodOverride = require('method-override')
const app = express()

/*
Made using tutorial by Web Dev Simplified
2020 YouTube
*/

// Connect to the db
mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

// Find and sort the existing articles
app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(5000)