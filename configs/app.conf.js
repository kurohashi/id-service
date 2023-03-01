
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
		sendinblue: {
			host: "smtp-relay.sendinblue.com",
			port: 587,
			auth: {
				user: "api-key",
				pass: "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"
				// user: "Node",
				// pass: "xsmtpsib-50880ec26e66c4f4f44c0498b23ff637d3a949e33a8b7ba81877387e07eca384-P8aKUT3LzI7cvt5p",
			}
		}
    };
})();
