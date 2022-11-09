const httpStatus = require("http-status");
const ApiError = require("@src/utils/ApiError");
const factory = require("@root/tests/utils/factory");
const CreateFormRequest = require("./CreateFormRequest");

describe("Bank - CreateFormRequest", () => {
  describe("validation", () => {
    let createFormRequestDto, createAccountFormRequestDto;
    beforeEach(async (done) => {
      const recordFactories = await generateRecordFactories();
      ({ bank } = recordFactories);
      createAccountFormRequestDto = [
        {
          accountName: "You Forger",
          accountNumber: "008367812589",
          notes: "Lorem",
        },
      ];
      createFormRequestDto = generateCreateFormRequestDto({
        name: bank.name,
        branch: bank.branch,
        address: bank.address,
        phone: bank.phone,
        fax: bank.fax,
        code: bank.code,
        notes: bank.notes,
        accounts: createAccountFormRequestDto,
      });
      done();
    });

    it("can't create when bank is exist", async () => {
      await expect(async () => {
        await new CreateFormRequest({ createFormRequestDto }).call();
      }).rejects.toThrow(
        new ApiError(httpStatus.BAD_REQUEST, "Bank Name is Exist")
      );
    });
  });

  describe("success create", () => {
    let bankForm, createFormRequestDto, createAccountFormRequestDto;
    beforeEach(async (done) => {
      createAccountFormRequestDto = [
        {
          accountName: "You Forger",
          accountNumber: "008367812589",
          notes: "Lorem",
        },
        {
          accountName: "You Forger 2",
          accountNumber: "008367812581",
          notes: "Lorem 1",
        },
      ];
      createFormRequestDto = generateCreateFormRequestDto({
        name: "PT Bank Negara Indonesia",
        branch: "Bandung",
        address: "Jl Asia Africa",
        phone: "022-82123223",
        fax: "021-812323",
        code: "KCBDG001",
        notes: "lorem",
        accounts: createAccountFormRequestDto,
      });
      ({ bank: bankForm } = await new CreateFormRequest({
        createFormRequestDto,
      }).call());

      done();
    });

    it("create form with correct data", () => {
      expect(bankForm).toBeDefined();
      expect(bankForm.name).toEqual(createFormRequestDto.name);
    });
  });
});

const generateCreateFormRequestDto = ({
  name,
  branch,
  address,
  phone,
  fax,
  code,
  notes,
  accounts,
}) => ({
  name,
  branch,
  address,
  phone,
  fax,
  code,
  notes,
  accounts,
});

const generateRecordFactories = async ({ bank } = {}) => {
  bank = await factory.bank.create({});

  return {
    bank,
  };
};
