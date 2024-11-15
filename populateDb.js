const { faker } = require("@faker-js/faker");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function populateProducts()  {
  const products = [];

  for (let i = 0; i < 70; i++) {
    const quantity = faker.number.int({ min: 1, max: 50 });
    const product = await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        category: faker.commerce.department(),
        quantity_available: quantity,
        purchase_price: parseFloat(faker.commerce.price(5, 500, 2)),
        description: faker.commerce.productDescription(),
        manufacturer: faker.company.name(),
        min_quantity_threshold: faker.number.int({ min: 1, max: 10 }),
        createdAt: faker.date.recent({ years: 3 }),
        all_time_quantity: quantity,
      },
    });
    products.push(product);
  }

  return products;
}

async function populateSales(products) {
  for (let i = 0; i < 80; i++) {
    let totalPrice = 0;

    const sale = await prisma.sale.create({
      data: {
        total_price: 0,
        discount: parseFloat(faker.commerce.price(0, 100, 2)),
        createdAt: faker.date.between({ from: "2017-01-01", to: "2024-11-14" }),
      },
    });

    for (const product of products) {
      if (product.quantity_available < 1) continue;

      const quantitySold = faker.number.int({ min: 1, max: product.quantity_available });
      const profitMargin = faker.number.float({ min: 0.2, max: 0.5 }); // Margem de lucro entre 20% e 50%
      const salePrice = product.purchase_price * (1 + profitMargin);

      product.quantity_available -= quantitySold;
      totalPrice += salePrice * quantitySold;

      await prisma.product.update({
        where: { id: product.id },
        data: { quantity_available: product.quantity_available },
      });


      await prisma.productSold.create({
        data: {
          product_id: product.id,
          quantity_sold: quantitySold,
          sale_price: salePrice,
          sales_id: sale.id,
          createdAt: faker.date.recent({ days: 100 }),
        },
      });
    }

    if (totalPrice > 0) {
      await prisma.sale.update({
        where: { id: sale.id },
        data: {
          total_price: totalPrice,
        },
      });
    } else {
      await prisma.sale.delete({ where: { id: sale.id } });
    }
  }
}

async function main() {
  try {
    const products = await populateProducts();
    await populateSales(products);
    await populateProducts();
    console.log("Dados populados com sucesso!");
  } catch (error) {
    console.error("Erro ao popular dados:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();