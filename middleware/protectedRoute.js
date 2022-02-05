
const jwt = require("jsonwebtoken");

const protectRoute = (req, res, next) => {
	const header = req.headers["authorization"];

	if (typeof header !== "undefined") {
		const bearer = header.split(" ");
		const token = bearer[1];

		jwt.verify(token, process.env.TOKEN_SECRET, (err, authorizedData) => {
			if (err) {
				//If error send Forbidden (403)
				console.log("ERROR: Could not connect to the protected route");
				res.sendStatus(403);
			} else {
				//If token is successfully verified, we can enter in the next route

				next();
			}
		});
	} else {
		res.sendStatus(403);
	}
};

module.exports = protectRoute;