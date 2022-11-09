const httpStatus = require("http-status");
const catchAsync = require("@src/utils/catchAsync");
const apiServices = require("./services/apis");

const findAll = catchAsync(async (req, res) => {
  const { query: queries } = req;
  const { total, roles, maxItem, currentPage, totalPage } =
    await new apiServices.FindAll(queries).call();
  res.status(httpStatus.OK).send({
    data: roles,
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
  const { role } = await new apiServices.CreateFormRequest({
    createFormRequestDto,
  }).call();
  res.status(httpStatus.CREATED).send({ data: role });
});

const findOne = catchAsync(async (req, res) => {
  const {
    params: { roleId },
  } = req;
  const { role } = await new apiServices.FindOne(roleId).call();
  res.status(httpStatus.OK).send({ data: role });
});

const updateForm = catchAsync(async (req, res) => {
  const {
    params: { roleId },
    body: updateFormDto,
  } = req;
  const { role } = await new apiServices.UpdateForm({
    roleId,
    updateFormDto,
  }).call();
  res.status(httpStatus.OK).send({ data: role });
});

const deleteFormRequest = catchAsync(async (req, res) => {
  const {
    params: { roleId },
  } = req;
  await new apiServices.DeleteFormRequest({
    roleId,
  }).call();
  res
    .status(httpStatus.OK)
    .send({ message: "Data Role has been deleted successfully" });
});

const assignPermissionFormRequest = catchAsync(async (req, res) => {
  const {
    body: assignPermissionFormRequestDto,
    params: { roleId },
  } = req;
  const { role } = await new apiServices.FindOne(roleId).call();
  await new apiServices.AssignPermissionFormRequest({
    roleId,
    assignPermissionFormRequestDto,
  }).call();
  res.status(httpStatus.OK).send({ data: role });
});

// ------------------------------PERMISSION---------------------------------- //

const findAllPermission = catchAsync(async (req, res) => {
  const { query: queries } = req;
  const { total, permissions, maxItem, currentPage, totalPage } =
    await new apiServices.FindAllPermission(queries).call();
  res.status(httpStatus.OK).send({
    data: permissions,
    meta: {
      current_page: currentPage,
      last_page: totalPage,
      per_page: maxItem,
      total,
    },
  });
});

const createFormRequestPermission = catchAsync(async (req, res) => {
  const { body: createFormRequestDto } = req;
  const { permission } = await new apiServices.CreateFormRequestPermission({
    createFormRequestDto,
  }).call();
  res.status(httpStatus.CREATED).send({ data: permission });
});

const findOnePermission = catchAsync(async (req, res) => {
  const {
    params: { permissionId },
  } = req;
  const { permission } = await new apiServices.FindOnePermission(
    permissionId
  ).call();
  res.status(httpStatus.OK).send({ data: permission });
});

const updateFormPermission = catchAsync(async (req, res) => {
  const {
    params: { permissionId },
    body: updateFormDto,
  } = req;
  const { permission } = await new apiServices.UpdateFormPermission({
    permissionId,
    updateFormDto,
  }).call();
  res.status(httpStatus.OK).send({ data: permission });
});

const deleteFormRequestPermission = catchAsync(async (req, res) => {
  const {
    params: { permissionId },
    body: deleteFormRequestDto,
  } = req;
  await new apiServices.DeleteFormRequestPermission({
    permissionId,
    deleteFormRequestDto,
  }).call();
  res
    .status(httpStatus.OK)
    .send({ message: "Data Permission has been deleted successfully" });
});

module.exports = {
  findAll,
  createFormRequest,
  findOne,
  updateForm,
  deleteFormRequest,
  assignPermissionFormRequest,

  findAllPermission,
  createFormRequestPermission,
  findOnePermission,
  updateFormPermission,
  deleteFormRequestPermission,
};
