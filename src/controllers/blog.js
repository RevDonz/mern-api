const {validationResult} = require('express-validator');
const BlogPost = require('../models/blog');
const path = require('path')
const fs = require('fs')

exports.createBlogPost = (req, res, next) => {
    const error = validationResult(req)

    if (!error.isEmpty()) {
        const err = new Error('Input value tidak sesuai');
        err.errorStatus = 400;
        err.data = error.array();
        throw err;
    }

    if (!req.file) {
        const err = new Error('Image harus di upload');
        err.errorStatus = 422;
        throw err;
    }

    const title = req.body.title;
    const image = req.file.path;    
    const body = req.body.body;

    const Posting = new BlogPost({
        title: title,
        body: body,
        image: image,
        author: {
            uid: 1,
            name: 'Reva Doni Aprilio',
        }
    })

    Posting.save()
    .then(result => {
        res.status(201).json({
            message: "Create Blog Post Success",
            data: result
        })
    })
    .catch(err => {
        console.log(err);
    });

}

exports.getAllBlogPost = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = req.query.perPage || 5;
    let totalItems;

    BlogPost.find()
    .countDocuments()
    .then(count => {
        totalItems = count;
        return BlogPost.find()
        .skip((parseInt(currentPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage))
    })
    .then(result => {
        res.status(200).json({
            message: 'data blog berhasil dipanggil',
            data: result,
            total_data: totalItems,
            per_page: parseInt(perPage),
            current_page: parseInt(currentPage),
        })
    })
    .catch(err => {
        next(err)
    })

}

exports.getBlogPostById = (req, res, next) => {
    const postId = req.params.postId
    BlogPost.findById(postId)
    .then(result => {
        if(!result) {
            const error = new Error('Blog post tidak ditemukan')
            err.errorStatus = 404;
            throw err;
        }
        res.status(200).json({
            message: 'data blog berhasil dipanggil',
            data: result
        })
    })
    .catch(err => {
        next(err)
    })  
}

exports.updateBlogPost = (req, res, next) => {  
    const error = validationResult(req)

    if (!error.isEmpty()) {
        const err = new Error('Input value tidak sesuai');
        err.errorStatus = 400;
        err.data = error.array();
        throw err;
    }

    if (!req.file) {
        const err = new Error('Image harus di upload');
        err.errorStatus = 422;
        throw err;
    }

    const title = req.body.title;
    const image = req.file.path;    
    const body = req.body.body;
    const postId = req.params.postId;

    BlogPost.findById(postId)
    .then(post => {
        if(!post) {
            const err = new Error('Blog post tidak ditemukan')
            err.errorStatus = 404;
            throw err;
        }

        post.title = title;
        post.body = body;
        post.image = image;

        return post.save()
    })
    .then(result => {
        res.status(200).json({
            message: 'Update blog sukses',
            data: result
        })
    })
    .catch(err => {
        next(err)
    })
}

exports.deleteBlogPost = (req, res, next) => {
    const postId = req.params.postId;

    BlogPost.findById(postId)
    .then(post => {
        if (!post) {
            const err = new Error('Blog post tidak ditemukan')
            err.errorStatus = 404;
            throw err;
        }

        removeImage(post.image);
        return BlogPost.findByIdAndRemove(postId)
    })
    .then(result => {
        res.status(200).json({
            message: 'Hapus Blog Post Berhasil!',
            data: result,
        })
    })
    .catch(err => {
        next(err)
    })
}

const removeImage = (filePath) => {
    console.log('filepath:', filePath);
    console.log('dir name:', __dirname);

    filePath = path.join(__dirname, '../..', filePath)
    fs.unlink(filePath, err => console.log(err));
}