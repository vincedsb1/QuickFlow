const database = require("../../database");

// Parti Like commentaire

const getCommentNbLike = (req, res) => {
  const commentId = parseInt(req.params.commentId, 10);
  database
    .query(
      `SELECT COUNT(nb_like_commentaire) AS like_count FROM like_commentaire INNER JOIN commentaire ON commentaire.id = like_commentaire.commentaire_id WHERE like_commentaire.commentaire_id=${commentId} AND nb_like_commentaire=1 GROUP BY like_commentaire.commentaire_id  `
    )
    .then(([users]) => res.json(users))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error getting data from database");
    });
};

const getCommentLike = (req, res) => {
  const commentId = parseInt(req.params.commentId, 10);
  const userId = parseInt(req.params.userId, 10);
  database
    .query(
      `SELECT nb_like_commentaire FROM like_commentaire INNER JOIN commentaire ON commentaire.id = like_commentaire.commentaire_id INNER JOIN user ON user.id = like_commentaire.user_id WHERE like_commentaire.commentaire_id=${commentId} AND like_commentaire.user_id=${userId}  `
    )
    .then(([users]) => res.json(users))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error getting data from database");
    });
};

const updateCommentTrueLike = (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const commentId = parseInt(req.params.commentId, 10);
  const { nbLikeCommentaire } = req.body;

  database
    .query(
      `UPDATE like_commentaire INNER JOIN commentaire ON commentaire.id = like_commentaire.commentaire_id INNER JOIN user ON user.id = like_commentaire.user_id SET nb_like_commentaire = ? WHERE like_commentaire.commentaire_id=${commentId} AND like_commentaire.user_id=${userId}`,
      [nbLikeCommentaire]
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
      res.status(500).send("Error editing the Comments");
    });
};

// Parti Like Idee

const getIdeeNbLike = (req, res) => {
  const ideeId = parseInt(req.params.ideeId, 10);
  database
    .query(
      `SELECT COUNT(nb_like_idee) AS like_count FROM like_idee INNER JOIN idee ON idee.id = like_idee.idee_id WHERE like_idee.idee_id=${ideeId} AND nb_like_idee=1 GROUP BY like_idee.idee_id  `
    )
    .then(([like]) => res.json(like))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error getting data from database");
    });
};

const getIdeeLike = (req, res) => {
  const ideeId = parseInt(req.params.ideeId, 10);
  const userId = parseInt(req.params.userId, 10);
  database
    .query(
      `SELECT nb_like_idee FROM like_idee INNER JOIN idee ON idee.id = like_idee.idee_id INNER JOIN user ON user.id = like_idee.user_id WHERE like_idee.idee_id=${ideeId} AND like_idee.user_id=${userId}  `
    )
    .then(([like]) => res.json(like))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error getting data from database");
    });
};

const updateIdeeTrueLike = (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const ideeId = parseInt(req.params.ideeId, 10);
  const { nbLikeIdee } = req.body;

  database
    .query(
      `UPDATE like_idee INNER JOIN idee ON idee.id = like_idee.idee_id INNER JOIN user ON user.id = like_idee.user_id SET nb_like_idee = ? WHERE like_idee.idee_id=${ideeId} AND like_idee.user_id=${userId}`,
      [nbLikeIdee]
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
      res.status(500).send("Error editing the Comments");
    });
};

module.exports = {
  getCommentNbLike,
  getCommentLike,
  updateCommentTrueLike,
  getIdeeNbLike,
  getIdeeLike,
  updateIdeeTrueLike,
};
