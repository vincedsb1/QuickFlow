const database = require("../../database");

const getIdeeCommentsAll = (req, res) => {
  const ideeId = parseInt(req.params.ideeId, 10);
  database
    .query(
      `SELECT commentaire.id, commentaire.description, commentaire.date, user.nom, user.prenom,commentaire.user_id, user.photoProfil FROM commentaire INNER JOIN idee ON commentaire.idee_id = idee.id INNER JOIN user ON commentaire.user_id = user.id WHERE commentaire.idee_id=${ideeId}`
    )
    .then(([users]) => res.json(users))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error getCommentsAll");
    });
};

const getCommentById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  database
    .query("SELECT * FROM commentaire WHERE id = ?", [id])
    .then(([users]) => res.json(users))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error getting data from database");
    });
};

const postComment = (req, res) => {
  const ideeId = parseInt(req.params.ideeId, 10);
  const { description, userId } = req.body;

  database
    .query(
      `INSERT INTO commentaire(description, idee_id, user_id) VALUES (?,${ideeId},${userId})`,
      [description, userId]
    )
    .then(([result]) => {
      res.location(`/user/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the user");
    });
};

const updateCommentById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { description } = req.body;

  database
    .query(`UPDATE commentaire SET description = ? WHERE id = ${id}`, [
      description,
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
      res.status(500).send("Error editing the Comments");
    });
};

const deleteCommentById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  database
    .query("DELETE FROM commentaire WHERE id = ?", [id])
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

module.exports = {
  getIdeeCommentsAll,
  getCommentById,
  postComment,
  updateCommentById,
  deleteCommentById,
};
