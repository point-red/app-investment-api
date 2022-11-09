const httpStatus = require("http-status");
const catchAsync = require("@src/utils/catchAsync");
const apiServices = require("./services/apis");

const findAll = catchAsync(async (req, res) => {
  const { query: queries } = req;
  const { total, owners, maxItem, currentPage, totalPage } =
    await new apiServices.FindAll(queries).call();
  res.status(httpStatus.OK).send({
    data: owners,
    meta: {
      current_page: currentPage,
      last_page: totalPage,
      per_page: maxItem,
      total,
    },
  });
});

const createFormRequest = catchAsync(async (req, res) => {
  const { body: createFormRequestDto } = req;
  const { owner } = await new apiServices.CreateFormRequest({
    createFormRequestDto,
  }).call();
  res.status(httpStatus.CREATED).send({ data: owner });
});

const findOne = catchAsync(async (req, res) => {
  const {
    params: { ownerId },
  } = req;
  const { owner } = await new apiServices.FindOne(ownerId).call();
  res.status(httpStatus.OK).send({ data: owner });
});

const updateForm = catchAsync(async (req, res) => {
  const {
    params: { ownerId },
    body: updateFormDto,
  } = req;
  const { owner } = await new apiServices.UpdateForm({
    ownerId,
    updateFormDto,
  }).call();
  res.status(httpStatus.OK).send({ data: owner });
});

const deleteFormRequest = catchAsync(async (req, res) => {
  const {
    params: { ownerId },
    body: deleteFormRequestDto,
  } = req;
  await new apiServices.DeleteFormRequest({
    ownerId,
    deleteFormRequestDto,
  }).call();
  res
    .status(httpStatus.OK)
    .send({ message: "Data Owner has been deleted successfully" });
});

module.exports = {
  findAll,
  createFormRequest,
  findOne,
  updateForm,
  deleteFormRequest,
};
