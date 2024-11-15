const express = require("express");
const router = express.Router();
const saleService = require("../services/saleService");

router.get("/", async (req, res) => {
  try {
    const vendas = await saleService.getAllSales();
    res.json(vendas);
  } catch (err) {
    res.status(500).json({ message: "Erro ao listar as vendas", error: err });
  }
});

router.get("/", async (req, res) => {
  try {
    const {id}=req.query
    const venda = await saleService.getSaleById(id);
    res.json(venda);
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Erro ao buscar venda com id: " + req.params.id,
        error: err,
      });
  }
});

router.get("/date", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const vendas = await saleService.getSalesByDateRange(startDate, endDate);
    res.json(vendas);
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Erro ao buscar vendas no intervalo de datas",
        error: err,
      });
  }
});

router.get("/productId", async (req, res) => {
  try {
    const {productId}=req.query
    if(!productId) {
      throw new Error("ID do produto não informado")
    }
    const venda = await saleService.getSalesWithProductId(productId);
    res.json(venda);
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Erro ao buscar venda com id: " + req.query.productId,
        error: err,
      });
  }
});


router.post("/", async (req, res) => {
  try {
    const venda = await saleService.createSale(req.body);
    res.json(venda);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Erro ao criar a venda", error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await saleService.deleteSale(req.params.id);
    res.json({ message: "Venda deletado com sucesso" });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Erro ao deletar a venda com id: " + req.params.id,
        error: err,
      });
  }
});

module.exports = router;
