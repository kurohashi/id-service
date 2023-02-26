
module.exports = new (function () {
	Object.assign(this, require("../utils/parse.arguments"));
	this.console = require("tracer").colorConsole();

	// Put the env variables for production inside
	if (this.env == "prod") {
		this.appid = "";		// put production appid here
	}

	this.crypto = {
		gen: {
			salt: "general-random-salt",
			iterations: 10,
			keyLen: 80,
		},
		jwtSecKey: "s9miaHZ2nvTxWQXft5dI03Z4jJCdAln3LYOSvUABS2dc2wD7SeOpx3Ojs2k8",
	};

	this.limits = {
		keyExpiry: "1d",
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
