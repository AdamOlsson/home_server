

exports.get_test = (req, res, next) => {
    res.status(200).json({
        message: "Successful GET"
    });
}