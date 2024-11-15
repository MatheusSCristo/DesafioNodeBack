const createSaleValidation=(sale)=>{
    if(!sale.product_sold || sale.product_sold.length===0){
        return {error:'É necessário informar ao menos um produto para cadastrar a venda'}
    }
    for(let product of sale.product_sold){
        
        if(!product.product_id || !product.quantity_sold || !product.unit_price){
            return {error:'É necessário informar o id do produto, a quantidade vendida e o preço unitário para cada produto vendido'}
        }
    }

    if(typeof sale.discount !== 'number' || sale.discount<0){
        return {error:'O desconto deve ser um número positivo'}	
    }

    const errors=[];
    
    sale.product_sold.forEach((product,index) => {
        if(typeof product.product_id !='number' || product.product_id<=0){
            errors.push({error:`ID do produto inválido no item ${index + 1}`})
        }
        if(typeof product.quantity_sold !='number' || product.quantity_sold<=0){
            errors.push({error:`Quantidade vendida inválida no item ${index + 1}`})
        }
        if(typeof product.unit_price !='number' || product.unit_price<=0){
            errors.push({error:`Preço unitário inválido no item ${index + 1}`})
        }    
    })
    if(errors.length>0){
        return {error:errors[0].error}
    }
    
    return {error:null}
}

module.exports ={ createSaleValidation }