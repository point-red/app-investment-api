const { RoleModel } = require("../../models");

class FindAll {
  constructor(queries = {}) {
    this.queries = queries;
  }

  async call() {
    let [queryLimit, queryPage, search, sort] = [
      parseInt(this.queries.limit, 10) || 10,
      parseInt(this.queries.page, 10) || 1,
      this.queries.search || "",
      this.queries.sort ? this.queries.sort.split(",") : ["createdAt"],
    ];

    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    const total = await this.getCount();
    const roles = await RoleModel.find({
      name: { $regex: search, $options: "i" },
    })
      .populate("permissions")
      .sort(sortBy)
      .limit(queryLimit)
      .skip(offsetParams(queryPage, queryLimit))
      .exec();

    const totalPage = Math.ceil(total / parseInt(queryLimit, 10));

    return {
      total,
      roles,
      maxItem: queryLimit,
      currentPage: queryPage,
      totalPage,
    };
  }

  async getCount(filter = {}) {
    return await RoleModel.countDocuments(filter);
  }
}

function offsetParams(page, maxItem) {
  return page > 1 ? maxItem * (page - 1) : 0;
}

module.exports = FindAll;
