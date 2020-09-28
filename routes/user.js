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
  getAllElements,
  getElement,
  createElement,
  deleteElement,
  addSingle,
  updateSingle,
  deleteSingleData,
  viewAllProjects,
  getProject,
  getCreatedModel,
} = require("../controllers/user");
//projects CRUD
router.get("/", viewProjects);
router.get("/project/:projectId", viewProject);
router.post("/", createProject);
router.put("/project/:projectId", editProject);
router.delete("/project/:projectId", deleteProject);
//Duplicate project schema
router.post("/duplicateProject/:projectId", duplicateProject);
//models CRUD
router.get("/model/:modelId", viewCreatedModel);
router.post("/model/:projectId", createCreatedModel);
router.put("/model/:modelId", editCreatedModel);
router.delete("/model/:modelId", deleteCreatedModel);

//Created Models elements (API endpoints to be delivered)
router.post("/project", viewAllProjects);
router.post("/project/:projectId", getProject);
router.post("/createdModel/:modelId", getCreatedModel);

router.post("/element/getAll/:modelId/", getAllElements);
router.post("/element/getSingle/:modelId/:elementName", getElement);
router.post("/element/create/:modelId", createElement);
router.post("/element/delete/:modelId/:elementName", deleteElement);
router.post("/element/addSingle/:modelId/:elementName", addSingle);
router.put("/element/updateSingle/:modelId/:elementName/:dataId", updateSingle);
router.post(
  "/element/deleteSingle/:modelId/:elementName/:dataId",
  deleteSingleData
);

module.exports = router;
