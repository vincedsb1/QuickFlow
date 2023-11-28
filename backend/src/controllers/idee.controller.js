const database = require("../../database");

const getAllInVoteIdeas = (req, res) => {
  const orgId = parseInt(req.params.orgId, 10);
  database
    .query(
      "SELECT DISTINCT user_id, idee.id, date, date_limite, titre, contenu, statuts_id, utilite, contexte, benefice, inconvenient, vote, votant FROM idee INNER JOIN statuts ON idee.statuts_id = statuts.id INNER JOIN organisation ON idee.organisation_id = organisation.id WHERE etat = 'À voter' AND idee.organisation_id = ?",
      [orgId]
    )
    .then(([ideas]) => res.json(ideas))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error getting data from database");
    });
};

const getAllToDecideIdeas = (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const orgId = parseInt(req.params.orgId, 10);
  database
    .query(
      "SELECT DISTINCT idee.id, date, date_limite, titre, contenu, status, statuts_id, contexte, benefice, inconvenient, vote, votant FROM idee INNER JOIN statuts ON idee.statuts_id = statuts.id INNER JOIN organisation_user ON idee.organisation_id = organisation_user.organisation_id WHERE etat = 'Décisions en cours' AND idee.organisation_id = ? AND organisation_user.user_id = ?",
      [orgId, userId]
    )
    .then(([ideas]) => res.json(ideas))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error getting data from database");
    });
};

const getAllFinishIdeas = (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const orgId = parseInt(req.params.orgId, 10);
  database
    .query(
      "SELECT DISTINCT idee.id, date, date_limite, titre, status, contenu, statuts_id, contexte, benefice, inconvenient, vote, votant FROM idee INNER JOIN statuts ON idee.statuts_id = statuts.id INNER JOIN organisation_user ON idee.organisation_id = organisation_user.organisation_id WHERE etat = 'Terminé' AND idee.organisation_id = ? AND organisation_user.user_id = ?",
      [orgId, userId]
    )
    .then(([ideas]) => res.json(ideas))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error getting data from database");
    });
};

const getInVoteIdeaById = (req, res) => {
  const ideeId = parseInt(req.params.ideeId, 10);
  // const userId = parseInt(req.params.userId, 10);
  // const orgId = parseInt(req.params.orgId, 10);
  database
    .query(
      "SELECT idee.id,date,date_limite,titre,contenu,status,contexte,benefice,inconvenient,vote,votant FROM idee INNER JOIN statuts ON idee.statuts_id = statuts.id INNER JOIN organisation ON idee.organisation_id = organisation.id WHERE etat = 'À voter' AND idee.id = ?",
      [ideeId]
    )
    .then(([idea]) => res.json(idea))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error getting data from database");
    });
};

const getToDecideIdeaById = (req, res) => {
  const ideeId = parseInt(req.params.ideeId, 10);
  // const userId = parseInt(req.params.userId, 10);
  // const orgId = parseInt(req.params.orgId, 10);
  database
    .query(
      "SELECT idee.id,date,date_limite,titre,contenu,status,contexte,benefice,inconvenient,vote,votant FROM idee INNER JOIN statuts ON idee.statuts_id = statuts.id INNER JOIN organisation ON idee.organisation_id = organisation.id WHERE etat = 'Décisions en cours' AND idee.id = ?",
      [ideeId]
    )
    .then(([idea]) => res.json(idea))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error getting data from database");
    });
};

const getIdeaById = (req, res) => {
  const ideeId = parseInt(req.params.ideeId, 10);
  // const userId = parseInt(req.params.userId, 10);
  // const orgId = parseInt(req.params.orgId, 10);
  database
    .query(
      "SELECT idee.id,date,date_limite,titre,contenu,status, utilite,contexte,benefice,inconvenient,vote,votant FROM idee INNER JOIN statuts ON idee.statuts_id = statuts.id INNER JOIN organisation ON idee.organisation_id = organisation.id WHERE idee.id = ?",
      [ideeId]
    )
    .then(([idea]) => res.json(idea))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error getting data from database");
    });
};

const getFinishIdeaById = (req, res) => {
  const ideeId = parseInt(req.params.ideeId, 10);
  // const userId = parseInt(req.params.userId, 10);
  // const orgId = parseInt(req.params.orgId, 10);
  database
    .query(
      "SELECT idee.id,date,date_limite,titre,contenu,status,contexte,benefice,inconvenient,vote,votant FROM idee INNER JOIN statuts ON idee.statuts_id = statuts.id INNER JOIN organisation ON idee.organisation_id = organisation.id WHERE etat = 'Terminé' AND idee.id = ?",
      [ideeId]
    )
    .then(([idea]) => res.json(idea))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error getting data from database");
    });
};

const getIdeeDetailsById = (req, res) => {
  const ideeId = parseInt(req.params.ideeId, 10);
  database
    .query("SELECT * FROM idee WHERE idee.id =?", [ideeId])
    .then(([ideas]) => res.json(ideas))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error getting data from database");
    });
};

const getIdeeVoteStatusByUserById = (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const ideeId = parseInt(req.params.ideeId, 10);
  database
    .query(
      "SELECT like_idee.status FROM like_idee WHERE idee_id = ? AND user_id = ?",
      [ideeId, userId]
    )
    .then(([ideas]) => res.json(ideas))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error getting idea status from database");
    });
};

const getLastsInVoteIdeas = (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const orgId = parseInt(req.params.orgId, 10);
  database
    .query(
      "SELECT DISTINCT idee.id, date, titre, statuts_id, vote, votant FROM idee INNER JOIN statuts ON idee.statuts_id = statuts.id INNER JOIN organisation_user ON idee.organisation_id = organisation_user.organisation_id WHERE etat = 'À voter' AND idee.organisation_id = ? AND organisation_user.user_id = ? ORDER BY date DESC LIMIT 5",
      [orgId, userId]
    )
    .then(([ideas]) => res.json(ideas))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error getting data from database");
    });
};

const postIdea = (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const orgId = parseInt(req.params.orgId, 10);
  const {
    dateIdea,
    descriptionIdea,
    titleIdea,
    utiliteIdea,
    contextIdea,
    beneficesIdea,
    inconvenientsIdea,
    lien,
  } = req.body;

  const sqlPhoto = `INSERT INTO photo_idee (lien, idea_id) VALUES (?, LAST_INSERT_ID())`;
  database
    .query(
      `INSERT INTO idee (date_limite, contenu, titre, utilite, contexte, benefice, inconvenient, user_id,organisation_id) VALUES (?,?,?,?,?,?,?,${userId},${orgId}); ${sqlPhoto}`,
      [
        dateIdea,
        descriptionIdea,
        titleIdea,
        utiliteIdea,
        contextIdea,
        beneficesIdea,
        inconvenientsIdea,
        lien,
      ]
    )
    .then(([result]) => {
      res
        .location(
          `/user/${userId}/orga/${orgId}/dashboard/vote/${result.insertId}`
        )
        .sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Post request failed");
    });
};

const updateIdea = (req, res) => {
  const ideeId = parseInt(req.params.ideeId, 10);
  const {
    today,
    dateIdea,
    descriptionIdea,
    utiliteIdea,
    titleIdea,
    contexteIdea,
    beneficesIdea,
    inconvenientsIdea,
  } = req.body;
  database
    .query(
      "UPDATE idee SET date = ?, date_limite = ?, contenu = ?, utilite = ?, titre = ?, contexte = ?, benefice = ?, inconvenient = ?  WHERE id = ?",
      [
        today,
        dateIdea,
        descriptionIdea,
        utiliteIdea,
        titleIdea,
        contexteIdea,
        beneficesIdea,
        inconvenientsIdea,
        ideeId,
      ]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.status(204).send("Données modifiées avec succès.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error updating the idea");
    });
};

const updateStatusIdea = (req, res) => {
  const ideeId = parseInt(req.params.ideeId, 10);
  const { finalStatusLabel } = req.body;
  const { statusId } = req.body;
  database
    .query("UPDATE idee SET status = ?, statuts_id = ? WHERE id = ?", [
      finalStatusLabel,
      statusId,
      ideeId,
    ])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.status(200).send("Statuts de l'idée modifié avec succès.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error updating the idea status");
    });
};

const updateVote = (req, res) => {
  const ideeId = parseInt(req.params.ideeId, 10);
  const userId = parseInt(req.params.userId, 10);
  const { vote, votant, status } = req.body;

  database
    .query("SELECT * FROM like_idee WHERE idee_id = ? AND user_id = ?", [
      ideeId,
      userId,
    ])
    .then(([rows]) => {
      const likeIdeeRow = rows[0];

      if (!likeIdeeRow) {
        // Aucune ligne dans like_idee, insérer une nouvelle ligne
        return database
          .query(
            "INSERT INTO like_idee (idee_id, user_id, status) VALUES (?, ?, ?)",
            [ideeId, userId, status]
          )
          .then(() => {
            // Mise à jour des champs vote et votant dans la table idee
            return database.query(
              "UPDATE idee SET vote = ?, votant = ? WHERE id = ?",
              [vote, votant, ideeId]
            );
          });
      }
      // Ligne existe déjà dans like_idee, mettre à jour les champs
      return Promise.all([
        // Mise à jour du champ status dans like_idee
        database.query(
          "UPDATE like_idee SET status = ? WHERE idee_id = ? AND user_id = ?",
          [status, ideeId, userId]
        ),
        // Mise à jour des champs vote et votant dans la table idee
        database.query("UPDATE idee SET vote = ?, votant = ? WHERE id = ?", [
          vote,
          votant,
          ideeId,
        ]),
      ]);
    })
    .then(() => {
      // Si la mise à jour a réussi, renvoyer une réponse JSON avec le message et les informations de l'idée
      res.status(200).json({
        message: "Data update succeeded",
        ideaId: ideeId,
        status,
      });
    })
    .catch((err) => {
      // En cas d'erreur, renvoyer une réponse JSON avec un message d'erreur
      console.error(err);
      res.status(500).json({ message: "Error updating the idea" });
    });
};
const deleteIdea = (req, res) => {
  const ideeId = parseInt(req.params.ideeId, 10);
  database
    .query("DELETE FROM idee WHERE id = ?", [ideeId])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting this idea");
    });
};

// ------------------------------------------------------------------------------------

module.exports = {
  getAllInVoteIdeas,
  getAllToDecideIdeas,
  getAllFinishIdeas,
  getInVoteIdeaById,
  getToDecideIdeaById,
  getFinishIdeaById,
  getIdeeDetailsById,
  getIdeeVoteStatusByUserById,
  getLastsInVoteIdeas,
  getIdeaById,
  postIdea,
  updateIdea,
  updateVote,
  updateStatusIdea,
  deleteIdea,
};
