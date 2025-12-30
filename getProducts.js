const { connectDB, getDB } = require("./db");

async function run() {
  await connectDB();
  const db = getDB();

  const products = await db.collection("products").find().toArray();
  console.log(products);
}

run();