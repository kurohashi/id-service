'use strict';
var send = require("../configs/response.conf");
var conf = require("../configs/app.conf");
var lib = require("../utils/lib");
let console = conf.console;


module.exports = {
    login, signup, verify,
}

/**
 * Login user
 * @param {*} req 
 * @param {*} res 
 */
function login(req, res) {}

/**
 * Initiate signup. Send OTP to email id
 * @param {*} req 
 * @param {*} res 
 */
function signup(req, res) {}

/**
 * Verify mail after initiating signup
 * @param {*} req 
 * @param {*} res 
 */
function verify(req, res) {}