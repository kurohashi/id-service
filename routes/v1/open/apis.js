var users = require("../../../controllers/users.controller")

// The route urls presented here are going to  
module.exports = function (app) {
	app.route("/login")
		.post(users.login);
	app.route("/signup")
		.post(users.signup);
	app.route("/verify")
		.post(users.verify);
}