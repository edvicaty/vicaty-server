const Project = require("../models/Project");
const { CreatedModel, createdModelSchema } = require("../models/CreatedModel");
const User = require("../models/User");

//projects
exports.viewProjects = async (req, res) => {
  const projects = await Project.find({ user: req.user._id });
  res.status(200).json(projects);
};
exports.viewProject = async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.find({ _id: projectId, user: req.user._id })
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
  const project = await Project.findById(projectId);
  if (req.user._id.toString() === project.user.toString()) {
    await Project.findByIdAndDelete(projectId);
    return res.status(200).json({ message: "deleted" });
  } else {
    return res
      .status(401)
      .json({ message: "unauthorized, https://http.cat/401" });
  }
};
//duplicateProject
exports.duplicateProject = async (req, res) => {
  const { projectId } = req.params;
  const { projectName } = req.body;
  const originalProject = await Project.findById(projectId).populate(
    "createdModels"
  );
  if (req.user._id.toString() === originalProject.user.toString()) {
    //creating new project
    const newProject = await Project.create({
      user: req.user._id,
      projectName,
      createdModels: [],
    });
    const user = await User.findOne({ _id: req.user._id });
    user.projects.push(newProject);
    user.save();
    //model multiplication loop
    for (let i = 0; i < originalProject.createdModels.length; i++) {
      const user = req.user._id;
      const project = newProject._id;
      const createdModelName =
        originalProject.createdModels[i].createdModelName;
      const description = originalProject.createdModels[i].description;
      const elements = originalProject.createdModels[i].elements;

      const newModel = await CreatedModel.create({
        user,
        project,
        createdModelName,
        elements,
        description,
      });

      newModel.api = {
        viewAllProjects: {
          reqType: "POST",
          route: `/project`,
          body: "userId : <your user Id>",
        },
        getProject: {
          reqType: "POST",
          route: `/project/${newProject._id}`,
          body: "userId : <your user Id>",
        },
        getCreatedModel: {
          reqType: "POST",
          route: `/createdModel/${newModel._id}`,
          body: "userId : <your user Id>",
        },
        getAllElements: {
          reqType: "POST",
          route: `/element/getAll/${newModel._id}`,
          body: "userId : <your user Id>",
        },
        getElement: {
          reqType: "POST",
          route: `/element/getSingle/${newModel._id}/<elementName>`,
          body: "userId : <your user Id>",
        },
        createElement: {
          reqType: "POST",
          route: `/element/create/${newModel._id}`,
          body:
            "userId : <your user Id> || elementName: <your new element Name>",
        },
        deleteElement: {
          reqType: "POST",
          route: `/element/delete/${newModel._id}/<elementName>`,
          body: "userId : <your user Id>",
        },
        addSingleData: {
          reqType: "POST",
          route: `/element/addSingle/${newModel._id}/<elementName>`,
          body: "userId : <your user Id> || value: <your data value>",
        },
        updateSingleData: {
          reqType: "POST",
          route: `/element/updateSingle/${newModel._id}/<elementName>/<dataId>`,
          body: "userId : <your user Id> || value: <your new data value>",
        },
        deleteSingleData: {
          reqType: "POST",
          route: `/element/deleteSingle/${newModel._id}/<elementName>/<dataId>`,
          body: "userId : <your user Id>",
        },
      };
      newModel.save();
      await newProject.createdModels.push(newModel._id);
      await newProject.save();
    }
    return res.status(201).json(newProject);
  } else {
    return res
      .status(401)
      .json({ message: "unauthorized, https://http.cat/401" });
  }
};

//models
exports.viewCreatedModel = async (req, res) => {
  const { modelId } = req.params;
  const createdModel = await CreatedModel.findById(modelId);
  res.status(200).json(createdModel);
};
exports.createCreatedModel = async (req, res) => {
  const { projectId } = req.params;
  const { createdModelName, description } = req.body;
  const project = await Project.findOne({ _id: projectId });
  const newModel = await CreatedModel.create({
    user: req.user._id,
    project: project._id,
    createdModelName,
    elements: [],
    description,
  });
  newModel.api = {
    viewAllProjects: {
      reqType: "POST",
      route: `/project`,
      body: "userId : <your user Id>",
    },
    getProject: {
      reqType: "POST",
      route: `/project/${projectId}`,
      body: "userId : <your user Id>",
    },
    getCreatedModel: {
      reqType: "POST",
      route: `/createdModel/${newModel._id}`,
      body: "userId : <your user Id>",
    },
    getAllElements: {
      reqType: "POST",
      route: `/element/getAll/${newModel._id}`,
      body: "userId : <your user Id>",
    },
    getElement: {
      reqType: "POST",
      route: `/element/getSingle/${newModel._id}/<elementName>`,
      body: "userId : <your user Id>",
    },
    createElement: {
      reqType: "POST",
      route: `/element/create/${newModel._id}`,
      body: "userId : <your user Id> || elementName: <your new element Name>",
    },
    deleteElement: {
      reqType: "POST",
      route: `/element/delete/${newModel._id}/<elementName>`,
      body: "userId : <your user Id>",
    },
    addSingleData: {
      reqType: "POST",
      route: `/element/addSingle/${newModel._id}/<elementName>`,
      body: "userId : <your user Id> || value: <your data value>",
    },
    updateSingleData: {
      reqType: "POST",
      route: `/element/updateSingle/${newModel._id}/<elementName>/<dataId>`,
      body: "userId : <your user Id> || value: <your new data value>",
    },
    deleteSingleData: {
      reqType: "POST",
      route: `/element/deleteSingle/${newModel._id}/<elementName>/<dataId>`,
      body: "userId : <your user Id>",
    },
  };
  newModel.save();
  await project.createdModels.push(newModel._id);
  await project.save();
  res.status(201).json(newModel);
};
exports.editCreatedModel = async (req, res) => {
  const { modelId } = req.params;
  const { createdModelName, description } = req.body;
  const updatedModel = await CreatedModel.findByIdAndUpdate(
    modelId,
    {
      createdModelName,
      description,
    },
    { new: true }
  );
  res.status(200).json(updatedModel);
};
exports.deleteCreatedModel = async (req, res) => {
  const { modelId } = req.params;
  const model = await CreatedModel.findById(modelId);
  if (req.user._id.toString() === model.user.toString()) {
    await CreatedModel.findByIdAndDelete(modelId);
    return res.status(200).json({ message: "deleted" });
  } else {
    return res
      .status(401)
      .json({ message: "unauthorized, https://http.cat/401" });
  }
};
