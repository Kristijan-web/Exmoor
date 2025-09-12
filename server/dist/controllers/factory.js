"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOne = exports.deleteOne = exports.createOne = exports.getOne = exports.getAll = void 0;
const catchAsync_1 = __importDefault(require("../utills/catchAsync"));
const appError_1 = __importDefault(require("../utills/appError"));
const sendResponse_1 = __importDefault(require("../utills/sendResponse"));
const getAll = (Model) => (0, catchAsync_1.default)(async (req, res, next) => {
    const documents = await Model.find();
    (0, sendResponse_1.default)(res, documents);
});
exports.getAll = getAll;
const getOne = (Model) => (0, catchAsync_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);
    if (!document) {
        return next(new appError_1.default("Resource does not exist", 404));
    }
    (0, sendResponse_1.default)(res, document);
});
exports.getOne = getOne;
const createOne = (Model) => (0, catchAsync_1.default)(async (req, res, next) => {
    // ne zaboravi da filtriras body jer neko moze da uradi user: "admin"
    const newDocument = await Model.create(req.body);
    (0, sendResponse_1.default)(res, newDocument);
});
exports.createOne = createOne;
// ovo je za admina
const deleteOne = (Model) => (0, catchAsync_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const deletedDocument = await Model.findByIdAndDelete(id);
    if (!deletedDocument) {
        return next(new appError_1.default("Specified element does not exist", 404));
    }
    // trebalo bi vrati statusCode 204 i message: 'success', umesto da se salje ceo user document
    res.status(204).json({
        message: "success",
    });
});
exports.deleteOne = deleteOne;
const updateOne = (Model) => (0, catchAsync_1.default)(async (req, res, next) => {
    console.log("evo me u catchAsync");
    const { id } = req.params;
    // ne zaboravi da uradis filtraciju req.body, moze se poslati role: 'admin'
    const updatedDocument = await Model.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!updatedDocument) {
        return next(new appError_1.default("Specified element does not exist", 404));
    }
    (0, sendResponse_1.default)(res, updatedDocument);
});
exports.updateOne = updateOne;
