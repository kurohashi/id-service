
module.exports = new (function () {
	Object.assign(this, require("../utils/parse.arguments"));
	this.console = require("tracer").colorConsole();
	this.appid = "986146a7a343594be0e9aa78fcb5a8808cd3472c";

	// Put the env variables for production inside
	if (this.env == "prod") {
		this.appid = "";		// put production appid here
	}

	this.crypto = {
		gen: {
			salt: "general-random-salt",
			iterations: 10,
			keyLen: 80,
		}
	};

	this.email = {
        from: "smjackson94@gmail.com",
        replyto: "smjackson94@gmail.com"
    }
	this.mailer = {
        sendgrid: {
            host: "smtp.sendgrid.net",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'apikey', // generated ethereal user
                pass: 'SG.FblIkfY0Q1KN-1ZMFNfItg.1uMbjtIkEB-O0bf7IO9kB_WdrdJpYVpuEEbqdVYSdP0', // generated ethereal password
            },
        }
    };
})();
