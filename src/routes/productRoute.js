const express = require("express");
const router = express.Router();
const productService = require("../services/productService");

router.get("/", async (req, res) => {
  try {
    const products = await productService.getProducts();
    res.json(products);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erro ao listar os produtos", error: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar o produto com id: "+req.params.id, error: err });
  }
});


router.post("/", async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Erro ao criar o produto", error: err });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar o produto com id: "+req.params.id, error: err });
  }
});


router.delete("/", async (req, res) => {
    try{
        await productService.deleteProduct(req.query.id)
        res.json({message: "Produto deletado com sucesso"})
    } catch (err) {
        res.status(500).json({message: "Erro ao deletar o produto  com id: "+req.query.id, error: err})
    }
})

module.exports=router;