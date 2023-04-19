const debug = require('debug')('app:api');
// const Handover = require('../models/requestModel');

const adopt = async (req, res) => {
    debug('adopt');
    res.render('response');
};

const recommend = async (req, res) => {
    debug('recommend');
    res.render('recommendation');
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