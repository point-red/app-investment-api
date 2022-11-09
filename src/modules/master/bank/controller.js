const httpStatus = require("http-status");
const catchAsync = require("@src/utils/catchAsync");
const apiServices = require("./services/apis");

const findAll = catchAsync(async (req, res) => {
  const { query: queries } = req;
  const { total, banks, maxItem, currentPage, totalPage } =
    await new apiServices.FindAll(queries).call();
  res.status(httpStatus.OK).send({
    data: banks,
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
  const { bank } = await new apiServices.CreateFormRequest({
    createFormRequestDto,
  }).call();
  res.status(httpStatus.CREATED).send({ data: bank });
});

const findOne = catchAsync(async (req, res) => {
  const {
    params: { bankId },
  } = req;
  const { bank } = await new apiServices.FindOne(bankId).call();
  res.status(httpStatus.OK).send({ data: bank });
});

const updateForm = catchAsync(async (req, res) => {
  const {
    params: { bankId },
    body: updateFormDto,
  } = req;
  const { bank } = await new apiServices.UpdateForm({
    bankId,
    updateFormDto,
  }).call();
  res.status(httpStatus.OK).send({ data: bank });
});

const deleteFormRequest = catchAsync(async (req, res) => {
  const {
    params: { bankId },
    body: deleteFormRequestDto,
  } = req;
  await new apiServices.DeleteFormRequest({
    bankId,
    deleteFormRequestDto,
  }).call();
  res
    .status(httpStatus.OK)
    .send({ message: "Data Bank has been deleted successfully" });
});

const deleteAccountFormRequest = catchAsync(async (req, res) => {
  const {
    params: { bankId, bankAccountId },
    body: deleteFormRequestDto,
  } = req;
  await new apiServices.DeleteAccountFormRequest({
    bankId,
    bankAccountId,
    deleteFormRequestDto,
  }).call();
  res
    .status(httpStatus.OK)
    .send({ message: "Data Bank Account has been deleted successfully" });
});

module.exports = {
  findAll,
  createFormRequest,
  findOne,
  updateForm,
  deleteFormRequest,
  deleteAccountFormRequest,
};
