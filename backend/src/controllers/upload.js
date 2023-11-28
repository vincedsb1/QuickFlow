const fs = require("fs");

const uploadOrgLogo = (req, res) => {
  const { originalname } = req.file;
  const { filename } = req.file;

  fs.rename(
    `../backend/public/photo/organisation/${filename}`,
    `../backend/public/photo/organisation/${originalname}`,
    (err) => {
      if (err) throw err;
    }
  );
  res.status(200).send("file uploaded");
};

const uploadUserPhoto = (req, res) => {
  const { originalname } = req.file;
  const { filename } = req.file;

  fs.rename(
    `../backend/public/photo/user/${filename}`,
    `../backend/public/photo/user/${originalname}`,
    (err) => {
      if (err) throw err;
    }
  );
  res.status(200).send("file uploaded");
};

const uploadIdeaPhoto = (req, res) => {
  const { originalname } = req.file;
  const { filename } = req.file;

  fs.rename(
    `../backend/public/photo/idee/${filename}`,
    `../backend/public/photo/idee/${originalname}`,
    (err) => {
      if (err) throw err;
    }
  );
  res.status(200).send("file uploaded");
};

module.exports = { uploadOrgLogo, uploadUserPhoto, uploadIdeaPhoto };
