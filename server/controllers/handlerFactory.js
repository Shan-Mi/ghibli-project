// create a function, return controllers
// we need to pass model to this function
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  });

const updateOne = (Model, field) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // return the new document
      runValidators: true, // will run validators before updated
    });
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        [field]: doc,
      },
    });
  });

const createOne = (Model, field) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        [field]: doc,
      },
    });
  });

const getOne = (Model, field, populateOption) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOption) {
      query = await query.populate(populateOption);
    }
    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        [field]: doc,
      },
    });
  });

const getAll = (Model, field) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.find({});
    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        [field]: doc,
      },
    });
  });

export { getAll, getOne, createOne, updateOne, deleteOne };
