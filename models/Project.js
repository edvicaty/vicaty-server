const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    projectName: String,
    createdModels: [{ type: Schema.Types.ObjectId, ref: "CreatedModel" }],
    api: {
      type: Object,
      default: {
        viewAllProjects: {
          reqType: "POST",
          route: `https://vicaty-api.herokuapp.com/user/project`,
          body: "userId : <your user Id>",
        },
        getProject: {
          reqType: "POST",
          route: `https://vicaty-api.herokuapp.com/user/project/<projectId>`,
          body: "userId : <your user Id>",
        },
        getCreatedModel: {
          reqType: "POST",
          route: `https://vicaty-api.herokuapp.com/user/createdModel/<modelId>`,
          body: "userId : <your user Id>",
        },
        getAllElements: {
          reqType: "POST",
          route: `https://vicaty-api.herokuapp.com/user/element/getAll/<modelId>`,
          body: "userId : <your user Id>",
        },
        getElement: {
          reqType: "POST",
          route: `https://vicaty-api.herokuapp.com/user/element/getSingle/<modelId>/<elementName>`,
          body: "userId : <your user Id>",
        },
        createElement: {
          reqType: "POST",
          route: `https://vicaty-api.herokuapp.com/user/element/create/<modelId>`,
          body:
            "userId : <your user Id> || elementName: <your new element Name>",
        },
        deleteElement: {
          reqType: "POST",
          route: `https://vicaty-api.herokuapp.com/user/element/delete/<modelId>/<elementName>`,
          body: "userId : <your user Id>",
        },
        addSingleData: {
          reqType: "POST",
          route: `https://vicaty-api.herokuapp.com/user/element/addSingle/<modelId>/<elementName>`,
          body: "userId : <your user Id> || value: <your data value>",
        },
        updateSingleData: {
          reqType: "POST",
          route: `https://vicaty-api.herokuapp.com/user/element/updateSingle/<modelId>/<elementName>/<dataId>`,
          body: "userId : <your user Id> || value: <your new data value>",
        },
        deleteSingleData: {
          reqType: "POST",
          route: `https://vicaty-api.herokuapp.com/user/element/deleteSingle/<modelId>/<elementName>/<dataId>`,
          body: "userId : <your user Id>",
        },
      },
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
