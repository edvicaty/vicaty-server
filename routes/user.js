const express = require("express");
const router = express.Router();
const {
  viewProjects,
  viewProject,
  createProject,
  editProject,
  deleteProject,
  viewCreatedModel,
  createCreatedModel,
  editCreatedModel,
  deleteCreatedModel,
  getAllElements,
  getElement,
  createElement,
  updateSingle,
  deleteElement,
} = require("../controllers/user");
//projects CRUD
router.get("/", viewProjects);
router.get("/project/:projectId", viewProject);
router.post("/", createProject);
router.put("/project/:projectId", editProject);
router.delete("/project/:projectId", deleteProject);
//models CRUD
router.get("/model/:modelId", viewCreatedModel);
router.post("/model/:projectId", createCreatedModel);
router.put("/model/:modelId", editCreatedModel);
router.delete("/model/:modelId", deleteCreatedModel);
//Created Models elements (API endpoints to be delivered)
router.post("/element/getAll/:modelId/", getAllElements);
router.post("/element/getSingle/:modelId/:elementName", getElement);
router.post("/element/create/:modelId", createElement);
router.put("/element/updateSingle/:modelId/:elementName", updateSingle);
router.post("/element/deleteSingle/:modelId/:elementName", deleteElement);

module.exports = router;