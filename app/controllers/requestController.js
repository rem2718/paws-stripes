const debug = require('debug')('app:api');
// const Handover = require('../models/requestModel');

const adopt = async (req, res) => {
    debug('adopt');
    res.render('response');
};

const handover = async (req, res) => {
    debug('handover');
    res.render('response');
};

const rescue = async (req, res) => {
    debug('rescue');
    res.render('response');
};

const experience = async (req, res) => {
    debug('experience');
    res.render('response');
};

const recommend = async (req, res) => {
    debug('recommend');
    res.render('recommendation');
}

const getStatus = async (req, res) => {
    debug('get request status');
};

const updateStatus = async (req, res) => {
    debug('change request status');
};

module.exports = {
    adopt,
    handover,
    rescue,
    experience,
    recommend,
    updateStatus,
};