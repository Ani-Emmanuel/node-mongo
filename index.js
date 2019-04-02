const mongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://127.0.0.1:27017/conFusion";

mongoClient.connect(url, (err, db) => {
  assert.equal(err, null);
  console.log("Connected Successfully");

  const collection = db.collection("dishes");
  collection.insertOne(
    { name: "Fried Rice", description: "Its very a delicious meal" },
    (err, result) => {
      assert.equal(err, null);
      console.log("After Insert: \n");
      console.log(result.ops);

      collection.find({}).toArray((err, result) => {
        assert.equal(err, null);
        console.log("Found: \n");
        console.log(result);

        db.dropCollection("dishes", (err, result) => {
          assert.equal(err, null);

          db.close();
        });
      });
    }
  );
});
