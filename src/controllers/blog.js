exports.createBlogPost = (req, res, next) => {
    const title = req.body.title;
    // const image = req.body.image;
    const body = req.body.body;

    const result = {
        message: "Create Blog Post Success",
        data: {
            post_id: 1,
            title: "Title Blog",
            // image: "image.png",
            body: "Lorem Ipsum Dolor Sit Amet",
            created_at: "03/05/2021",
            author: {
                uid: 1,
                name: "nama"
            }
        }
    }
    res.status(201).json(result)
}