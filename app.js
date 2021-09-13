const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const blogRoute = require('./routes/blogRoutes')

//-- connnect to mongodb
const dbURI = 'mongodb+srv://ramnit:08155001768@clusterblognode.t7upy.mongodb.net/blognode?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => {
        console.log('connect to db mongodb cloud')
        app.listen(3000)
    })
    .catch((err) => console.log(err))

const app = express()

app.set('view engine', 'ejs')

//-- middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

//-- using custom route
app.use('/blogs', blogRoute)

app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'Abput' })
})

app.use((req, res) => {
    res.status(404).render('404')
})