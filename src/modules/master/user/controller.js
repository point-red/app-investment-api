const httpStatus = require("http-status");
const catchAsync = require("@src/utils/catchAsync");
const apiServices = require("./services/apis");

const findAll = catchAsync(async (req, res) => {
  const { query: queries } = req;
  const { total, users, maxItem, currentPage, totalPage } =
    await new apiServices.FindAll(queries).call();
  res.status(httpStatus.OK).send({
    data: users,
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
  const { user } = await new apiServices.CreateFormRequest({
    createFormRequestDto,
  }).call();
  res.status(httpStatus.CREATED).send({ data: user });
});

const uploadProfile = catchAsync(async (req, res) => {
  const { file } = req;
  const { profile } = await new apiServices.UploadUserProfile({
    image: file,
  }).call();
  res.status(httpStatus.CREATED).send({ data: profile });
});

const findOne = catchAsync(async (req, res) => {
  const {
    params: { userId },
  } = req;
  const { user } = await new apiServices.FindOne(userId).call();
  res.status(httpStatus.OK).send({ data: user });
});

const updateForm = catchAsync(async (req, res) => {
  const {
    params: { userId },
    body: updateFormDto,
  } = req;
  const { user } = await new apiServices.UpdateForm({
    userId,
    updateFormDto,
  }).call();
  res.status(httpStatus.OK).send({ data: user });
});

const deleteFormRequest = catchAsync(async (req, res) => {
  const {
    params: { userId },
    body: deleteFormRequestDto,
  } = req;
  await new apiServices.DeleteFormRequest({
    userId,
    deleteFormRequestDto,
  }).call();
  res
    .status(httpStatus.OK)
    .send({ message: "Data User has been deleted successfully" });
});

module.exports = {
  findAll,
  createFormRequest,
  uploadProfile,
  findOne,
  updateForm,
  deleteFormRequest,
};
