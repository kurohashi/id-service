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
function login(req, res) {
    (async _ => {
        let user = req.body;
        if (!(user.email && user.passwd))
            return send.invalidReq(res, "missing parameters");
        let userData = await conf.collections.users.find({ email: user.email }).toArray();
        if (!userData.length)
            return send.notFound(res, null, "user not found");
        userData = userData[0];
        let passwd = lib.createHash(user.passwd, userData.salt);
        if (passwd != userData.passwd)
            return send.invalid(res, "invalid password");
        send.ok(res, lib.signToken({ uid: userData.uid }));
    })().catch(err => {
        console.error(err);
        send.serverError(res);
    });
}

/**
 * Initiate signup. Send OTP to email id
 * @param {*} req 
 * @param {*} res 
 */
function signup(req, res) {
    (async _ => {
        let user = req.body;
        if (!(user.email && user.passwd))
            return send.invalidReq(res, "missing parameters");
        user.salt = lib.createId(null, 25);
        user.uid = createId(10);
        user.passwd = lib.createHash(user.passwd, user.salt);
        await conf.collections.users.insertOne(user);
        send.ok(res, lib.signToken({ uid: user.uid }));
    })().catch(err => {
        console.error(err);
        send.serverError(res);
    });
}

/**
 * Verify mail after initiating signup
 * @param {*} req 
 * @param {*} res 
 */
function verify(req, res) {
    (async _ => {
        if (!req.body.token)
            return send.invalidReq(res);
        lib.verifyToken(req.body.token);
        let tokData = lib.extractToken(req.body.token);
        if (!tokData.uid)
            return send.forbidden(res);
        let users = await conf.collections.users.find({ uid: tokData.uid }).toArray();
        if (!users.length)
            return send.forbidden(res);
        return send.ok(res);
    })().catch(err => {
        console.error(error);
        return send.forbidden(res);
    });
}