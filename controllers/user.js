const Project = require("../models/Project");
const { CreatedModel, createdModelSchema } = require("../models/CreatedModel");
const { findByIdAndDelete } = require("../models/Project");
const User = require("../models/User");

//projects
exports.viewProjects = async (req, res) => {
  const projects = await Project.find().populate("user");
  res.status(200).json(projects);
};
exports.viewProject = async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId)
    .populate("user")
    .populate("createdModels");
  res.status(200).json(project);
};
exports.createProject = async (req, res) => {
  const { projectName } = req.body;
  const newProject = await Project.create({
    user: req.user._id,
    projectName,
    createdModels: [],
  });
  const user = await User.findOne({ _id: req.user._id });
  user.projects.push(newProject);
  user.save();
  res.status(201).json(newProject);
};
exports.editProject = async (req, res) => {
  const { projectId } = req.params;
  const { projectName } = req.body;
  const updatedProject = await Project.findByIdAndUpdate(
    projectId,
    {
      projectName,
    },
    { new: true }
  );
  res.status(200).json(updatedProject);
};
exports.deleteProject = async (req, res) => {
  const { projectId } = req.params;
  await Project.findByIdAndDelete(projectId);
  res.status(200).json({ message: "deleted" });
};

//models
exports.viewCreatedModel = async (req, res) => {
  const { modelId } = req.params;
  const createdModel = await CreatedModel.findById(modelId);
  res.status(200).json(createdModel);
};
exports.createCreatedModel = async (req, res) => {
  const { projectId } = req.params;
  const { createdModelName } = req.body;
  const project = await Project.findOne({ _id: projectId });
  const newModel = await CreatedModel.create({
    user: req.user._id,
    project: project._id,
    createdModelName,
    strings: [],
    numbers: [],
    booleans: [],
  });
  await project.createdModels.push(newModel._id);
  await project.save();
  res.status(201).json(newModel);
};
exports.editCreatedModel = async (req, res) => {
  const { modelId } = req.params;
  const { createdModelName } = req.body;
  const updatedModel = await CreatedModel.findByIdAndUpdate(
    modelId,
    {
      createdModelName,
    },
    { new: true }
  );
  res.status(200).json(updatedModel);
};
exports.deleteCreatedModel = async (req, res) => {
  const { modelId } = req.params;
  await CreatedModel.findByIdAndDelete(modelId);
  res.status(200).json({ message: "deleted" });
};

//elements inside CreatedModel
//userId sent through body for validation
exports.getAllElements = async (req, res) => {
  const { modelId } = req.params;
  //userId as a token for user validation
  const { userId } = req.body;
};
exports.getElement = async (req, res) => {
  const { modelId, elementName } = req.params;
  const { userId } = req.body;
};
exports.createElement = async (req, res) => {
  const { modelId } = req.params;
  const { userId } = req.body;

  const model = await CreatedModel.findOne({ _id: modelId });
};
exports.updateSingle = async (req, res) => {
  const { modelId, elementName } = req.params;
  const { userId } = req.body;
};
exports.deleteElement = async (req, res) => {
  const { modelId, elementName } = req.params;
  const { userId } = req.body;
};
