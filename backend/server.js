import express from "express";

const server = express();
const port = 3000;

server.use(express.json());

const products = [
  {
    "id": 1,
    "name": "Hammare",
    "price": 200
  },
  {
    "id": 2,
    "name": "Såg",
    "price": 500
  }
];

server.get("/products", (req, res) => {
  return res.status(200).json(products);
});

server.get("/products/:id", (req, res) => {
  const id = req.params.id;

  const product = products.find(p => p.id == id);

  if (!product) {
    return res.status(404).json({ message: "hitta ingen produkt." });
  }

  return res.status(200).json(product);
});

server.post("/products", (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Sakanar prameter" });
  }

  const newId = products.length + 1;

  products.push({
    id: newId,
    name: name,
    price: price
  });

  return res.status(201).json({ id: newId });
});

server.delete("/products/:id", (req, res) => {
  const id = req.params.id;

  console.log("jkalskdnlaksnd");
  console.log(id);

  const index = products.findIndex(p => p.id == id);

  console.log("jkalskdnlaksnd - 2");

  if (index == -1) {
    return res.status(404).json({ message: "hitta ingen produkt." });
  }

  console.log("jkalskdnlaksnd - 3");

  products.splice(index, 1);

  console.log("jkalskdnlaksnd - 4");

  return res.status(200).json({ "message": "Allt gick bra" });
});

server.listen(port,
  () => console.log(`Server is live at http://localhost:${port}`)
)

