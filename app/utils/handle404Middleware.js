
const err404 = (req, res, next) => {
    let err = 404;
    let msg = 'page not found :\( please check the URL and try again';
    return res.status(err).render('err-response', { err, msg });
};

module.exports = err404;