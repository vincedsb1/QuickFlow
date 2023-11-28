const express = require("express");
const multer = require("multer");

const router = express.Router();
const uploadLogoOrga = multer({ dest: "../backend/public/photo/organisation" });
const uploadPhotoUser = multer({ dest: "../backend/public/photo/user" });
const uploadIdeaPicture = multer({ dest: "../backend/public/photo/idee" });

const ideeController = require("../controllers/idee.controller");
const userController = require("../controllers/user.controller");

const commentController = require("../controllers/comment.controller");
const likeControlleur = require("../controllers/like.controller");
const followControlleur = require("../controllers/follow.controller");

const orgController = require("../controllers/organisation.controller");
const uploadController = require("../controllers/upload");
const deleteController = require("../controllers/deleteOrgLogo");

const photoIdeaController = require("../controllers/photoIdea.controller");
const roleController = require("../controllers/role.controlleur");
const {
  hashPassword,
  verifyPassword,
  generateForgottenPasswordToken,
  verifyToken,
} = require("../auth/auth");
/*= ======================================================================= 
                              Routes Publiques
=========================================================================== */
/* ------------------------------------------------------------------------
Route Login
------------------------------------------------------------------------- */

router.post(
  "/login",
  userController.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

/* ------------------------------------------------------------------------
Route Inscription
------------------------------------------------------------------------- */

router.post("/user", hashPassword, userController.postUser);
router.post("/inviteUser", userController.inviteUser);
router.post(
  "/user/:userId/orga/:orgaId/role/:roleId/checkRole/inscription",
  roleController.postCheckRole
);

/* ------------------------------------------------------------------------
Route Forgotten Password
------------------------------------------------------------------------- */

router.post("/forgotpassword", generateForgottenPasswordToken);
router.put(
  "/forgotpassword",
  hashPassword,
  userController.updateUserForgottenPassword
);

/* ------------------------------------------------------------------------
Routes Ideas
------------------------------------------------------------------------- */

router.get(
  "/user/:userId/orga/:orgId/dashboard/vote",
  ideeController.getAllInVoteIdeas
);
router.get(
  "/user/:userId/orga/:orgId/dashboard/vote/:ideeId",
  ideeController.getInVoteIdeaById
);
router.get(
  "/user/:userId/orga/:orgId/dashboard/decision",
  ideeController.getAllToDecideIdeas
);
router.get(
  "/user/:userId/orga/:orgId/dashboard/decision/:ideeId",
  ideeController.getToDecideIdeaById
);
router.get(
  "/user/:userId/orga/:orgId/dashboard/termine",
  ideeController.getAllFinishIdeas
);
router.get(
  "/user/:userId/orga/:orgId/dashboard/termine/:ideeId",
  ideeController.getFinishIdeaById
);

router.get("/user/idee/:ideeId/details", ideeController.getIdeeDetailsById);
// Pour récupérer l'état des vote d'une idée par un user (les pouces remplis ou pas)
router.get(
  "/user/:userId/idee/:ideeId/status",
  ideeController.getIdeeVoteStatusByUserById
);
router.get(
  "/user/:userId/orga/:orgId/last/vote/",
  ideeController.getLastsInVoteIdeas
);

router.get("/dashboard/update/:ideeId", ideeController.getIdeaById);
/* ------------------------------------------------------------------------
Routes Users
------------------------------------------------------------------------- */
router.get("/user", userController.getUsers);
router.get("/user/:id", userController.getUserById);
router.get("/user/idee/:ideeId", userController.getIdeeUserByIdeeId);

/* ------------------------------------------------------------------------
Routes commentaries
------------------------------------------------------------------------- */

router.get("/idee/:ideeId/comment", commentController.getIdeeCommentsAll);
router.get("/idee/comment/:id", commentController.getCommentById);

/* ------------------------------------------------------------------------
Routes Likes
------------------------------------------------------------------------- */

// like commentaire
router.get("/comment/:commentId/like", likeControlleur.getCommentNbLike);
router.get(
  "/user/:userId/comment/:commentId/like",
  likeControlleur.getCommentLike
);

// like idees
router.get("/idee/:ideeId/like", likeControlleur.getIdeeNbLike);
router.get("/user/:userId/idee/:ideeId/like", likeControlleur.getIdeeLike);

/* ------------------------------------------------------------------------
Routes Follow
------------------------------------------------------------------------- */

router.get(
  "/user/:userId/idee/:ideeId/follow",
  followControlleur.getFollowIdee
);
router.put(
  "/user/:userId/idee/:ideeId/follow",
  followControlleur.updateFollowIdee
);

/* ------------------------------------------------------------------------
Routes Organizations
------------------------------------------------------------------------- */

router.get("/orga/:orgId", orgController.getOrgaSettingsById);
router.get("/user/:userId/orga", orgController.getAllOrgByUserId);
router.get("/user/:userId/orga/focus", orgController.getFocusOrgByUserId);
router.get("/user/orga/:orgId", orgController.getAllUserByOrgId);

/* ------------------------------------------------------------------------
Routes Photo's Ideas
------------------------------------------------------------------------- */

router.get(
  "/user/orga/idee/:ideaId/photo",
  photoIdeaController.getAllPhotosByIdeaId
);
router.get(
  "/user/orga/idee/:ideaId/photo",
  photoIdeaController.getAllPhotosByIdByIdeaId
);

/* ------------------------------------------------------------------------
Routes Roles
------------------------------------------------------------------------- */

router.get("/orga/:orgaId/role", roleController.getRoleAllUserByOrga);
router.get(
  "/user/:userId/orga/:orgaId/role",
  roleController.getRoleAllUserOrga
);
router.get(
  "/user/:userId/orga/:orgaId/role/:roleId",
  roleController.getRoleUserOrgaById
);
router.get("/orga/:orgaId/role/:role", roleController.getUserRoleAdmin);

/*= ======================================================================= 
                              Routes Privées
=========================================================================== */

// Authentication Wall
router.use(verifyToken);

/* ------------------------------------------------------------------------
Routes Ideas
------------------------------------------------------------------------- */

router.post(
  "/user/:userId/orga/:orgId/dashboard/creation",
  ideeController.postIdea
);
router.put(
  "/user/:userId/orga/:orgId/dashboard/update/:ideeId",
  ideeController.updateIdea
);
router.put("/orga/:orgId/update/:ideeId", ideeController.updateStatusIdea);
router.put(
  "/user/:userId/orga/:orgId/vote/update/:ideeId",
  ideeController.updateVote
);
router.delete(
  "/user/:userId/orga/:orgId/dashboard/delete/:ideeId",
  ideeController.deleteIdea
);

/* ------------------------------------------------------------------------
Routes Users
------------------------------------------------------------------------- */

router.put("/user/:id", userController.updateUserById);
router.delete("/user/:id", userController.deleteUserById);
router.delete("/user/:userId/orga/:orgaId", userController.deleteOrgaUserById);

/* ------------------------------------------------------------------------
Routes Photos Users
------------------------------------------------------------------------- */

router.post(
  "/user/upload",
  uploadPhotoUser.single("photo"),
  uploadController.uploadUserPhoto
);

/* ------------------------------------------------------------------------
Routes commentaries
------------------------------------------------------------------------- */

router.post("/idee/:ideeId/comment", commentController.postComment);
router.put("/idee/comment/:id", commentController.updateCommentById);
router.delete("/idee/comment/:id", commentController.deleteCommentById);

/* ------------------------------------------------------------------------
Routes Likes
------------------------------------------------------------------------- */

// like commentaires
router.put(
  "/user/:userId/comment/:commentId/like",
  likeControlleur.updateCommentTrueLike
);

// like idee
router.put(
  "/user/:userId/idee/:ideeId/like",
  likeControlleur.updateIdeeTrueLike
);

/* ------------------------------------------------------------------------
Routes Organizations
------------------------------------------------------------------------- */

router.post("/user/:userId/orga", orgController.createOrg);
router.put("/user/orga/:orgId", orgController.updateOrg);
router.put("/user/orga/:orgId/params", orgController.updateOrgParams);
router.put("/user/orga/logo/:orgId", orgController.updateOrgLogo);
router.delete("/user/orga/:orgId", orgController.deleteOrg);

/* ------------------------------------------------------------------------
Routes Organizations images
------------------------------------------------------------------------- */

router.post(
  "/orga/upload",
  uploadLogoOrga.single("logo"),
  uploadController.uploadOrgLogo
);

router.delete("/orga/delete/:filename", deleteController.deleteOrgLogo);

/* ------------------------------------------------------------------------
Routes Photo's Ideas
------------------------------------------------------------------------- */

router.post(
  "/user/orga/idee/:ideaId/photo",
  photoIdeaController.createPhotoIdea
);
router.put(
  "/user/orga/idee/:ideaId/photo/:photoId",
  photoIdeaController.updateIdeaPhoto
);
router.delete(
  "/user/orga/idee/:ideaId/photo/:photoId",
  photoIdeaController.deletePhotoIdea
);

router.post(
  "/idea/upload",
  uploadIdeaPicture.single("photo"),
  uploadController.uploadIdeaPhoto
);

/* ------------------------------------------------------------------------
Routes Roles
------------------------------------------------------------------------- */

router.put(
  "/user/:userId/orga/:orgaId/role/:roleId/checkRole",
  roleController.updateCheckRole
);
router.post(
  "/user/:userId/orga/:orgaId/role/:roleId/checkRole",
  roleController.postCheckRole
);
router.delete(
  "/user/:userId/orga/:orgaId/role/:roleId/delete",
  roleController.deleteUserOrga
);

module.exports = router;
