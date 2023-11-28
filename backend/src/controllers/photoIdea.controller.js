const database = require("../../database");

const getAllPhotosByIdeaId = (req, res) => {
  const ideaId = parseInt(req.params.ideaId, 10);
  database
    .query(
      "SELECT lien FROM photo_idee INNER JOIN idee ON photo_idee.idea_id = idee.id WHERE idee.id = ?",
      [ideaId]
    )
    .then(([photos]) => {
      res.json(photos);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error getting all photos by idea id");
    });
};

const getAllPhotosByIdByIdeaId = (req, res) => {
  const ideaId = parseInt(req.params.ideaId, 10);
  const photoId = parseInt(req.params.photoId, 10);
  database
    .query(
      "SELECT lien FROM photo_idee INNER JOIN idee ON photo_idee.idea_id = idee.id WHERE idee.id = ? AND photo_idee.id = ?",
      [ideaId, photoId]
    )
    .then(([photo]) => {
      res.json(photo);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error getting all photos by idea id");
    });
};

const createPhotoIdea = (req, res) => {
  const ideaId = parseInt(req.params.ideaId, 10);
  const { link } = req.body;
  database
    .query("INSERT INTO photo_idee (lien, idea_id) VALUES (?,?)", [
      link,
      ideaId,
    ])
    .then(([photo]) => {
      res
        .location(`/user/orga/${ideaId}/photo/${photo.insertId}`)
        .sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Post request failed");
    });
};

const updateIdeaPhoto = (req, res) => {
  const ideaId = parseInt(req.params.ideaId, 10);
  const photoId = parseInt(req.params.photoId, 10);
  const { link } = req.body;
  database
    .query(
      "UPDATE photo_idee SET lien = ? WHERE photo_idee.id = ? AND idea_id = ?",
      [link, photoId, ideaId]
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
      res.status(500).send("Error updating the photo");
    });
};

const deletePhotoIdea = (req, res) => {
  const ideaId = parseInt(req.params.ideaId, 10);
  const photoId = parseInt(req.params.photoId, 10);
  database
    .query(
      `DELETE FROM photo_idee WHERE photo_idee.id = ${photoId} AND photo_idee.idea_id = ${ideaId}`,
      []
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
      res.status(500).send("Error deleting this photo");
    });
};

module.exports = {
  getAllPhotosByIdeaId,
  getAllPhotosByIdByIdeaId,
  createPhotoIdea,
  updateIdeaPhoto,
  deletePhotoIdea,
};
