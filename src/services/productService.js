const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getProducts = async () => {
  return await prisma.product.findMany();
};


const getProductById = async (id) => {
    return await prisma.product.findUnique({
        where:{
            id:parseInt(id)
        }
    })
};

const createProduct=async(product)=>{
    return await prisma.product.create({
        data:{
            name:product.name,
            purchase_price:parseFloat(product.price),
            category:product.category,
            quantity_available:parseInt(product.quantity_available),
            description:product.description,
            manufacturer:product.manufacturer,
            all_time_quantity:parseInt(product.quantity_available),
        }
    })
}

const updateProduct=async(id,product)=>{
    return await prisma.product.update({
        where:{
            id:parseInt(id)
        },
        data:{
            name:product.name,
            price:product.price,
            category:product.category,
            quantity_available:product.quantity_available,
            description:product.description,
            image:product.image,
        }
    })

}

const deleteProduct=async(id)=>{
    return await prisma.product.delete({
        where:{
            id:parseInt(id)
        }
    })
}

module.exports={
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}