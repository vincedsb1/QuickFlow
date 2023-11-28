const database = require("../../database");

const getOrgaSettingsById = (req, res) => {
  const orgId = parseInt(req.params.orgId, 10);
  database
    .query(`SELECT * FROM organisation WHERE organisation.id = ?`, [orgId])
    .then(([projects]) => {
      res.json(projects);
    })
    .catch(() => {
      res.status(500).send("Error getting organisation settings from database");
    });
};

const getAllOrgByUserId = (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  database
    .query(
      `SELECT * FROM organisation INNER JOIN organisation_user ON organisation.id = organisation_user.organisation_id INNER JOIN user ON organisation_user.user_id = user.id WHERE user.id = ${userId}`
    )
    .then(([projects]) => {
      res.json(projects);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error getting organisation from database");
    });
};
const getFocusOrgByUserId = (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  database
    .query(
      `SELECT organisation.id, nom_organisation, logo, organisation_id, user_id FROM organisation INNER JOIN organisation_user ON organisation.id = organisation_user.organisation_id WHERE user_id = ${userId}`
    )
    .then(([projects]) => {
      res.json(projects);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error getting organisation from database");
    });
};

const getAllUserByOrgId = (req, res) => {
  const orgId = parseInt(req.params.orgId, 10);
  database
    .query(
      `SELECT * FROM user INNER JOIN organisation_user ON user.id = organisation_user.user_id INNER JOIN organisation ON organisation.id = organisation_user.organisation_id WHERE organisation.id = ${orgId}`
    )
    .then(([projects]) => {
      res.json(projects);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error getting organization's user from database");
    });
};

const createOrg = (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const { titleOrg, descriptionOrg, logo } = req.body;
  const sql = `INSERT INTO organisation_user (organisation_id,user_id) VALUES (LAST_INSERT_ID(),${userId});`;

  database
    .query(
      `INSERT INTO organisation (nom_organisation,description,logo) VALUES (?,?,?);${sql}`,
      [titleOrg, descriptionOrg, logo]
    )
    .then(([[result]]) => {
      res.status(201).json({ id: result.insertId });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Post request failed");
    });
};

const updateOrg = (req, res) => {
  const orgId = parseInt(req.params.orgId, 10);
  const {
    orgName,
    description,
    logo,
    voteTime,
    ratioVote,
    isAnonyme,
    periode,
  } = req.body;

  database
    .query(
      `UPDATE organisation SET nom_organisation = ?, description = ?, logo = ?, duree_des_votes = ?, ratio_vote_positif = ?, anonyme = ?, periode_idee_terminee = ? WHERE organisation.id = ${orgId}`,
      [orgName, description, logo, voteTime, ratioVote, isAnonyme, periode]
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
      res.status(500).send("Error updating the organization");
    });
};

const updateOrgLogo = (req, res) => {
  const orgId = parseInt(req.params.orgId, 10);
  const { titleOrg, logo } = req.body;
  database

    .query(
      `UPDATE organisation SET nom_organisation = ?,  logo = ? WHERE organisation.id = ?`,
      [titleOrg, logo, orgId]
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
      res.status(500).send("Error updating the organization");
    });
};

const updateOrgParams = (req, res) => {
  const orgId = parseInt(req.params.orgId, 10);
  const { orgName, description, voteTime, ratioVote, isAnonyme, periode } =
    req.body;

  database
    .query(
      `UPDATE organisation SET nom_organisation = ?, description = ?, duree_des_votes = ?, ratio_vote_positif = ?, anonyme = ?, periode_idee_terminee = ? WHERE organisation.id = ${orgId}`,
      [orgName, description, voteTime, ratioVote, isAnonyme, periode]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        const message = `Organisation parameters updated successfully:
        orgName: ${orgName}
        description: ${description}
        voteTime: ${voteTime}
        ratioVote: ${ratioVote}
        isAnonyme: ${isAnonyme}
        periode: ${periode}`;

        res.status(200).send(message);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error updating the organization");
    });
};

const deleteOrg = (req, res) => {
  const orgId = parseInt(req.params.orgId, 10);

  database
    .query("DELETE FROM organisation WHERE organisation.id = ?", [orgId])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting the organization");
    });
};

module.exports = {
  getOrgaSettingsById,
  getAllOrgByUserId,
  getFocusOrgByUserId,
  getAllUserByOrgId,
  updateOrgLogo,
  createOrg,
  updateOrg,
  updateOrgParams,
  deleteOrg,
};
