export const setIsLoading = (value) => {
     return {type: 'SET_IS_LOADING', payload: value};
}

export const countTotalPayment = (data) => {
     
     let total = 0;
     data.forEach((dataItem) => {
          total += dataItem.product.price*dataItem.quantity;
     });
     return total;
}