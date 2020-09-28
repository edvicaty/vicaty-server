const express = require("express");
const router = express.Router();
const {
  viewProjects,
  viewProject,
  createProject,
  editProject,
  deleteProject,
  duplicateProject,
  viewCreatedModel,
  createCreatedModel,
  editCreatedModel,
  deleteCreatedModel,
} = require("../controllers/user");
const { isAuth, checkRole, catchErrors } = require("../middlewares");
//projects CRUD
router.get("/", isAuth, viewProjects);
router.get("/project/:projectId", isAuth, viewProject);
router.post("/", isAuth, createProject);
router.put("/project/:projectId", isAuth, editProject);
router.delete("/project/:projectId", isAuth, deleteProject);
//Duplicate project schema
router.post("/duplicateProject/:projectId", isAuth, duplicateProject);
//models CRUD
router.get("/model/:modelId", isAuth, viewCreatedModel);
router.post("/model/:projectId", isAuth, createCreatedModel);
router.put("/model/:modelId", isAuth, editCreatedModel);
router.delete("/model/:modelId", isAuth, deleteCreatedModel);

module.exports = router;
