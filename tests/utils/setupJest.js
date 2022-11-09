const connection = require("@src/config/database");
const mongoose = require("mongoose");

global.beforeAll(async (done) => {
  await connection();
  done();
});

global.beforeEach(async () => {
  await clearCollections();
});

global.afterAll(async (done) => {
  done();
});

async function clearCollections() {
  const collections = mongoose.connection.collections;

  await Promise.all(
    Object.values(collections).map(async (collection) => {
      await collection.deleteMany({}); // an empty mongodb selector object ({}) must be passed as the filter argument
    })
  );
}
