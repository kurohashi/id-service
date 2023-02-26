
var crypto = require("crypto");
var send = require("../configs/response.conf");
var conf = require("../configs/app.conf");
var moment = require("moment-timezone");
var jwt = require('jsonwebtoken');
var nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport(conf.mailer.sendgrid);
let console = conf.console;

module.exports = {
	createId, authFailed, preupdate, ISODate, regex, createHash,
	sendMailToServer, signToken, extractToken, verifyToken,
}

function regex(val, type) {
	return new RegExp(val, type);
}

function ISODate(val) {
	return new Date(val);
}

function preupdate(req, res, next) {
	req.body.updateTS = moment().unix();
	// if some logging has to be done.. it can be added here...
	next();
}

/**
 *  General response for failing Autharization. It can fail for various reasons. 
 * 		- 	forbidden actions (user control)
 * 		-	invalid token or credentials
 * 		-	Payment required (premium features)
 * @param {*} req 
 * @param {*} res 
 */
function authFailed(err, req, res, next) {
	console.error("Forbidden", err);
	if (err == 426)
		return send.upgrade(res);
	if (err == 401)
		return send.unauthorized(res);
	send.forbidden(res);
}

/**
 * 
 * @param {*} type  : Base64 or Hex type
 * @param {*} len 	: length of the id
 */
function createId(type, len) {
	const supported_types = ["hex", "base64"];
	var foo = "";
	if (supported_types.indexOf(type) < 0)
		foo = "hex";
	else
		foo = type;
	if (!len)
		len = 20;

	return crypto.randomBytes(Math.ceil(len))
		.toString(foo) // convert to given format
		.slice(0, len);
}

/**
 * Create hash from given fields in an array
 * @param {*} key : key string to be created hash for
 * @param {*} salt? : (optional) salt to be used for encryption
 * @param {*} type? : (optional) type of hash
 */
function createHash(key, salt, type) {
	type = type || "gen";
	return Buffer.from(crypto.pbkdf2Sync(key, salt || conf.crypto[type].salt, conf.crypto[type].iterations, conf.crypto[type].keyLen, "SHA256"), 'binary').toString('base64');
}


/**
 * Send a mail
 * @param {*} to 
 * @param {*} subject 
 * @param {*} text 
 * @returns 
 */
async function sendMailToServer(to, subject, text) {
	return transporter.sendMail({
		to: to,
		...conf.email,
		subject: subject,
		text: text,
		html: text,
	});
}

/**
 * Create user jwt token
 * @param {*} obj 
 * @returns 
 */
function signToken(obj) {
	if (!isObject(obj))
		return null;
	return jwt.sign(obj, conf.crypto.jwtSecKey, {
		expiresIn: conf.limits.keyExpiry
	});
}

/**
 * Extract data from token
 * @param {*} token 
 */
function extractToken(token) {
	if (token.includes("Bearer"))
		token = token.replace("Bearer", "");
	token = token.trim();
	return jwt.decode(token);
}

/**
 * Verify the token
 * @param {*} token 
 */
function verifyToken(token) {
	return jwt.verify(token, conf.crypto.jwtSecKey);
}