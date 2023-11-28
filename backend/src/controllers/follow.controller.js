const database = require("../../database");

const getFollowIdee = (req, res) => {
  const ideeId = parseInt(req.params.ideeId, 10);
  const userId = parseInt(req.params.userId, 10);
  database
    .query(
      `SELECT follow_idee FROM follow INNER JOIN idee ON idee.id = follow.idee_id INNER JOIN user ON user.id = follow.user_id WHERE follow.idee_id=${ideeId} AND follow.user_id=${userId}  `
    )
    .then(([users]) => res.json(users))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error getting data from database");
    });
};

const updateFollowIdee = (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const ideeId = parseInt(req.params.ideeId, 10);
  const { followLike } = req.body;

  database
    .query(
      `UPDATE follow INNER JOIN idee ON idee.id = follow.idee_id INNER JOIN user ON user.id = follow.user_id SET follow_idee = ? WHERE follow.idee_id=${ideeId} AND follow.user_id=${userId}`,
      [followLike]
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
  getFollowIdee,
  updateFollowIdee,
};
