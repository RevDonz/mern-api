const {validationResult} = require('express-validator');


exports.createBlogPost = (req, res, next) => {
    const title = req.body.title;
    // const image = req.body.image;
    const body = req.body.body;

    const error = validationResult(req)

    if (!error.isEmpty()) {
        const err = new Error('Input value tidak sesuai');
        err.errorStatus = 400;
        err.data = error.array();
        throw err;
    }

    const result = {
        message: "Create Blog Post Success",
        data: {
            post_id: 1,
            title: title,
            image: "image.png", 
            body: body,
            created_at: "03/05/2021",
            author: {
                uid: 1,
                name: "nama"
            }
        }
    }
    res.status(201).json(result)
}