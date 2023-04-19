const debug = require('debug')('app:api');
// const Handover = require('../models/requestModel');

const adopt = async (req, res) => {
    debug('adopt');
    res.redirect('/requests/response');
};

const recommend = async (req, res) => {
    debug('recommend');
    res.render('recommendation', { isLoggedIn: req.cookies.isLoggedIn || false });
}
//reguler get
const getStatus = async (req, res) => {
    debug('get adopt status');
};

const updateStatus = async (req, res) => {
    debug('change adopt status');
};

module.exports = {
    adopt,
    recommend,
    updateStatus,
};