import productsMock from '../mock/products';

async function getProductsMatch(searchVal: string){
    const result: Record<string, string>[] = productsMock.filter((obj) => obj.name.toLowerCase().includes(searchVal.toLowerCase()));
    return new Promise((resolve) => {
        setTimeout(resolve, 400, result);
    });
}
export default getProductsMatch;