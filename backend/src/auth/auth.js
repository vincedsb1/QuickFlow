const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const hasingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (req, res, next) => {
  argon2
    .hash(req.body.motDePasse, hasingOptions)
    .then((hashedPassword) => {
      req.body.hashedPassword = hashedPassword;
      delete req.body.motDePasse;
      next();
    })
    .catch((err) => {
      console.error(err);
      return res.sendStatus(500);
    });
};

const verifyPassword = (req, res) => {
  if (!req.user || !req.user.hashedPassword) {
    console.error("User object or hashed password is missing in the request");
    return res.sendStatus(500);
  }

  if (!req.body.password) {
    console.error("Password is missing in the request body");
    return res.sendStatus(400); // Bad request
  }

  return argon2 // Add return here
    .verify(req.user.hashedPassword, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        delete req.user.hashedPassword;
        const payload = { sub: req.user };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        delete req.user.hashedPassword;
        return res.send({ token, user: req.user });
      }
      return res.sendStatus(401);
    })
    .catch((err) => {
      console.error(err);
      return res.sendStatus(500);
    });
};

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");

    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }

    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    req.payload = jwt.verify(token, process.env.JWT_SECRET);

    return next();
  } catch (err) {
    console.error(err);
    return res.sendStatus(401);
  }
};

// -------------------------------------------------------- //

const generateForgottenPasswordToken = (req, res) => {
  const { email } = req.body;
  if (!email) {
    console.error("Email is missing for this request");
    return res.sendStatus(500);
  }
  try {
    const payload = { userMail: email };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return res.send({ token }).status(200);
  } catch (err) {
    console.error(err);
    return res.sendStatus(401);
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
  generateForgottenPasswordToken,
};
