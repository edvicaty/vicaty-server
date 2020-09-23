const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const createdModelSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    project: { type: Schema.Types.ObjectId, ref: "Project" },
    createdModelName: String,
    api: {
      getAllRoute: String,
      getSingleRoute: String,
      createRoute: String,
      updateSingleRoute: String,
      deleteSingleRoute: String,
    },
    elements: [
      /*
      @ = user input

      {
      
      @name = {
        
        elementId: ModelId+@name,
        type: @String,
        required: @false
        default: @"pedrito",
        data: []
        }
      }
      
      */
    ],

    // TODO: Here the user will add elements to the schema
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

exports.CreatedModel = mongoose.model("CreatedModel", createdModelSchema);
exports.createdModelSchema = createdModelSchema;
