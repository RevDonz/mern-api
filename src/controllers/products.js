exports.createProduct = (req, res, next) => {
    const nama = req.body.name;
    const price = req.body.price;
    res.json(
        {
            message: "Create product success!",
            data: {
                id: 1,
                nama: nama,
                harga: price
            }
        }
    )
    next();
}

exports.getAllProducts = (req, res, next) => {
    res.json(
        {
            message: "Get All Products",
            data: [
                {
                    id: 1,
                    nama: "Roti Bakar",
                    harga: 5000
                },
                {
                    id: 2,
                    nama: "Sagu keju",
                    harga: 7000
                },
            ]
        }
    )
    next();
}