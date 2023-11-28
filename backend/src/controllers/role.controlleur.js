const database = require("../../database");

// Pour voir tous les rôles des utilisateurs par organisation
const getRoleAllUserByOrga = (req, res) => {
  const orgaId = parseInt(req.params.orgaId, 10);
  database
    .query(
      `SELECT role,user.nom,user.prenom,check_role,user_id,role_id,organisation_id FROM organisation_user INNER JOIN role ON role.id = organisation_user.role_id INNER JOIN user ON user.id = organisation_user.user_id INNER JOIN organisation ON organisation.id = organisation_user.organisation_id WHERE organisation_user.organisation_id=${orgaId}`
    )
    .then(([users]) => res.json(users))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error getting data from database");
    });
};

// Pour voir tous les rôles d'un utilisateur d'une orga
const getRoleAllUserOrga = (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const orgaId = parseInt(req.params.orgaId, 10);
  database
    .query(
      `SELECT role,user.nom,user.prenom,check_role FROM organisation_user INNER JOIN role ON role.id = organisation_user.role_id INNER JOIN user ON user.id = organisation_user.user_id INNER JOIN organisation ON organisation.id = organisation_user.organisation_id WHERE organisation_user.user_id=${userId} AND  organisation_user.organisation_id=${orgaId}`
    )
    .then(([users]) => res.json(users))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error getting data from database");
    });
};

// Pour voir le rôle précis d'un utilisateur dans une orga
const getRoleUserOrgaById = (req, res) => {
  const roleId = parseInt(req.params.roleId, 10);
  const userId = parseInt(req.params.userId, 10);
  const orgaId = parseInt(req.params.orgaId, 10);
  database
    .query(
      `SELECT role,user.nom,user.prenom,check_role FROM organisation_user INNER JOIN role ON role.id = organisation_user.role_id INNER JOIN user ON user.id = organisation_user.user_id INNER JOIN organisation ON organisation.id = organisation_user.organisation_id WHERE organisation_user.role_id=${roleId} AND organisation_user.user_id=${userId} AND  organisation_user.organisation_id=${orgaId}`
    )
    .then(([users]) => res.json(users))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error getting data from database");
    });
};

// Pour voir les user du rôle demander dans le /:role

const getUserRoleAdmin = (req, res) => {
  const orgaId = parseInt(req.params.orgaId, 10);
  const { role } = req.params;
  database
    .query(
      `SELECT role,user.nom,user.prenom,check_role FROM organisation_user INNER JOIN role ON role.id = organisation_user.role_id INNER JOIN user ON user.id = organisation_user.user_id INNER JOIN organisation ON organisation.id = organisation_user.organisation_id WHERE organisation_user.organisation_id=${orgaId} AND role="${role}"`
    )
    .then(([users]) => res.json(users))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error getting data from database");
    });
};

const postCheckRole = (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const roleId = parseInt(req.params.roleId, 10);
  const orgaId = parseInt(req.params.orgaId, 10);
  const { checkRole } = req.body;

  database
    .query(
      "INSERT INTO organisation_user(role_id,user_id,organisation_id,check_role) VALUES (?,?,?,?)",
      [roleId, userId, orgaId, checkRole]
    )
    .then(([result]) => {
      res.location(`/user/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the user");
    });
};

// Update des role pas true ou false

const updateCheckRole = (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const roleId = parseInt(req.params.roleId, 10);
  const orgaId = parseInt(req.params.orgaId, 10);
  const { checkRole } = req.body;

  database
    .query(
      `UPDATE organisation_user INNER JOIN role ON role.id = organisation_user.role_id INNER JOIN user ON user.id = organisation_user.user_id INNER JOIN organisation ON organisation.id = organisation_user.organisation_id SET check_role = ? WHERE organisation_user.role_id=${roleId} AND organisation_user.user_id=${userId} AND  organisation_user.organisation_id=${orgaId}`,
      [checkRole]
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
      res.status(500).send("Error editing the Comments ici!!!");
    });
};
const deleteUserOrga = (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const roleId = parseInt(req.params.roleId, 10);
  const orgaId = parseInt(req.params.orgaId, 10);

  database
    .query(
      `DELETE FROM organisation_user WHERE organisation_user.role_id=${roleId} AND organisation_user.user_id=${userId} AND  organisation_user.organisation_id=${orgaId}`
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
      res.status(500).send("Error deleting the user by orga");
    });
};

module.exports = {
  getRoleAllUserByOrga,
  getRoleAllUserOrga,
  getRoleUserOrgaById,
  getUserRoleAdmin,
  postCheckRole,
  updateCheckRole,
  deleteUserOrga,
};
