const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const port = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5174", "https://technest-project.netlify.app"],
  })
);
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("This is from TechNes Server site");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vuymtad.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // all collections
    const allProductsCollection = client
      .db("techNestDB")
      .collection("allProducts2");

    app.get("/allProducts", async (req, res) => {
      const minPrice = parseInt(req.query.minPrice) || 0;
      const maxPrice = parseInt(req.query.maxPrice) || 0;

      const selectedCategories = req.query.selectedCategories
        ? req.query.selectedCategories.split(",")
        : [];
      const selectedBrands = req.query.selectedBrands
        ? req.query.selectedBrands.split(",")
        : [];
      const searchText = req.query.search || "";
      const selectedSort = req.query.selectedSort;

      const page = parseInt(req.query.page) || 1;
      const size = parseInt(req.query.size) || 6;

      const query = {};

      //   filter by price range
      if (minPrice > 0) {
        query.Price = {
          $gte: minPrice,
        };
      }
      if (maxPrice > 0) {
        query.Price = {
          $lte: maxPrice,
        };
      }

      // Filter by selected category names if provided
      if (selectedCategories.length > 0) {
        query.Category = {
          $in: selectedCategories,
        };
      }

      // Filter by selected brand names if provided
      if (selectedBrands.length > 0) {
        query.Brand = {
          $in: selectedBrands,
        };
      }

      // Filter by ProductName if searchText is provided
      if (searchText) {
        query.ProductName = {
          $regex: searchText,
          $options: "i",
        };
      }
      const options = {
        sort: {},
      };

      // Sorting logic
      if (selectedSort === "l>h") {
        options.sort.Price = 1;
      } else if (selectedSort === "h>l") {
        options.sort.Price = -1;
      } else if (selectedSort === "new") {
        options.sort.DateTime = -1;
      }

      //   const result = await allProductsCollection
      //     .find(query, options)
      //     .skip(page * size)
      //     .limit(size)
      //     .toArray();
      //   res.send(result);

      try {
        //  Fetch Total Count for Pagination
        const count = await allProductsCollection.countDocuments(query);

        // Fetch Data with Pagination
        const result = await allProductsCollection
          .find(query, options)
          .skip((page - 1) * size)
          .limit(size)
          .toArray();

        res.send({ result, count: count });
      } catch (err) {
        res
          .status(500)
          .send({ message: "Error fetching products", error: err });
      }
    });

    // app.get("/allProductsCount", async (req, res) => {
    //   const count = await allProductsCollection.estimatedDocumentCount();
    //   res.send({ count });
    // });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log("This server is running on port :", port);
});
