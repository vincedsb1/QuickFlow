const fs = require("fs");

const deleteOrgLogo = (req, res) => {
  const { filename } = req.params;
  const filePath = `../backend/public/photo/organisation/${filename}`;

  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        res.status(500).send("Error deleting file");
        return;
      }

      res.status(200).send("File deleted successfully");
    });
  } else {
    console.error("File does not exist:", filePath);
    res.status(404).send("File does not exist");
  }
};
module.exports = { deleteOrgLogo };
