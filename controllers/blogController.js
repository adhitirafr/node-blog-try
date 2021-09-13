const Blog = require('../models/blog')

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
    .then((result) => {
        res.render('blogs/index', { title: 'All Articles', blogs: result })
    })
    .catch((err) => {
        console.log(err)
    })
}

const blog_detail = (req, res) => {
    const id = req.params.id

    Blog.findById(id)
        .then((result) => {
            res.render('blogs/details', {blog: result, title: result.title})
        })
        .catch((err) => {
            console.log(err)
        })
}

const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'Add new article' })
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body)

    blog.save()
        .then((result) => {
            console.log(result)
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err)
        })
}

const blog_delete = (req, res) => {
    const id = req.params.id

    Blog.findByIdAndDelete(id)
        .then(res => {
            console.log('article is deleted')
            
            res.json({
                redirect: '/blogs',
                message: 'data is deleted'
            })
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = {
    blog_index,
    blog_detail,
    blog_create_get,
    blog_create_post,
    blog_delete
}