const database = require("../../database");

const getUsers = (req, res) => {
  database
    .query("SELECT * FROM user")
    .then(([users]) => res.json(users))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error getUsers");
    });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  database
    .query(
      "SELECT id, email, nom, prenom, photoProfil FROM user WHERE user.id = ?",
      [id]
    )
    .then(([users]) => res.json(users))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error getting data from database");
    });
};

const postUser = (req, res) => {
  const { nom, prenom, hashedPassword, email, photoProfil } = req.body;

  database
    .query(
      "INSERT INTO user(nom, prenom, hashedPassword, email,photoProfil) VALUES (?,?,?,?,?)",
      [nom, prenom, hashedPassword, email, photoProfil]
    )
    .then(([result]) => {
      res
        .status(201)
        .location(`/user/${result.insertId}`)
        .json({ id: result.insertId });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the user");
    });
};

// ------------------------------------------------------------

const inviteUser = (req, res) => {
  const { orgId, userId } = req.body;

  database
    .query(
      `INSERT INTO organisation_user(organisation_id, user_id, role_id) VALUES (?,${
        userId ? "?" : "LAST_INSERT_ID()"
      },1)`,
      [orgId, userId]
    )
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error in post user/org join table");
    });
};

// ---------------------------------------------------------------

const updateUserById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { nom, prenom, email, photo } = req.body;

  database
    .query(
      "UPDATE user SET nom = ?, prenom = ?, email = ?, photoProfil = ? WHERE id = ?",
      [nom, prenom, email, photo, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the user");
    });
};

const deleteUserById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  database
    .query("DELETE FROM user WHERE id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting the user");
    });
};
const deleteOrgaUserById = (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const orgaId = parseInt(req.params.orgaId, 10);
  database
    .query(
      "DELETE FROM organisation_user WHERE organisation_id = ? AND user_id = ?",
      [orgaId, userId]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting userOrga");
    });
};

const getUserByEmailWithPasswordAndPassToNext = (req, res, next) => {
  const { email } = req.body;

  database
    .query("SELECT * FROM user WHERE email = ?", [email])
    .then(([users]) => {
      if (users[0] != null) {
        // eslint-disable-next-line prefer-destructuring
        req.user = users[0];
        next();
      } else {
        res.sendStatus(401);
      }
    })
    .catch(() => {
      res.status(500).send("Connexion failed");
    });
};

const getIdeeUserByIdeeId = (req, res) => {
  const ideeId = parseInt(req.params.ideeId, 10);

  if (Number.isNaN(ideeId)) {
    res.status(400).send("Invalid ideeId parameter");
    return;
  }

  database
    .query(
      "SELECT user.id, user.nom, user.prenom FROM idee JOIN user ON idee.user_id = user.id WHERE idee.id = ?",
      [ideeId]
    )
    .then(([user]) => res.json(user))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error getting user infos from database");
    });
};

const updateUserForgottenPassword = (req, res) => {
  const { hashedPassword, email } = req.body;

  database
    .query("UPDATE user SET hashedPassword = ? WHERE email = ?", [
      hashedPassword,
      email,
    ])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the user");
    });
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  updateUserById,
  deleteUserById,
  deleteOrgaUserById,
  getUserByEmailWithPasswordAndPassToNext,
  getIdeeUserByIdeeId,
  updateUserForgottenPassword,
  inviteUser,
};
