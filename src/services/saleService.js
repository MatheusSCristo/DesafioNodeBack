const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { createSaleValidation } = require("../validations/createSaleValidation");

const getAllSales = async () => {
  return await prisma.sale.findMany({
    include: { product_sold: { include: { product: true } } },
  });
};

const getSaleById = async (id) => {
  return await prisma.sale.findUnique({
    where: {
      id: parseInt(id),
    },
  });
};

const getSalesWithProductId = async (productId) => {
  return await prisma.sale.findMany({
    where: {
      product_sold: {
        some: {
          product_id: parseInt(productId),
        },
      },
    },
    include: {
      product_sold: true,
    },
  });
};

const createSale = async (sale) => {
  const { error } = createSaleValidation(sale);
  if (error) {
    throw new Error(error);
  }
  const price = sale.product_sold.reduce(
    (acc, product) => acc + product.unit_price * product.quantity_sold,
    0
  );
  return await prisma.sale.create({
    data: {
      total_price: price,
      discount: sale.discount,
      product_sold: {
        create: sale.product_sold.map((product) => ({
          product_id: product.product_id,
          quantity_sold: product.quantity_sold,
          sale_price: product.unit_price,
        
        })),
      },
    },
    include: {
      product_sold: true,
    },
  });
};

async function getSalesByDateRange(startDate, endDate) {
  const parsedStartDate = startDate
    ? new Date(startDate)
    : new Date("1970-01-01");
  const parsedEndDate = endDate ? new Date(endDate) : new Date();

  if (isNaN(parsedStartDate) || isNaN(parsedEndDate)) {
    throw new Error("Formato de data inválido");
  }

  return await prisma.sale.findMany({
    where: {
      createdAt: {
        gte: parsedStartDate,
        lte: parsedEndDate,
      },
    },
    include: { product_sold: true },
  });
}

async function deleteSale(id) {
  return await prisma.sale.delete({
    where: {
      id: parseInt(id),
    },
  });
}

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  getSalesByDateRange,
  deleteSale,
  getSalesWithProductId,
};
