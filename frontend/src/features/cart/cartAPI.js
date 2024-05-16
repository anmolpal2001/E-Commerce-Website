
export function addToCart(item,token) {
    return new Promise(async (resolve) => {
      console.log("token ",token);
      const response = await fetch('http://localhost:4000/api/v1/cart', {
        method: 'POST',
        body: JSON.stringify(item),
        headers: { 
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
      const data = await response.json();
      resolve({ data });
    });
  }
  
  export function fetchItemsByUserId() {
    return new Promise(async (resolve) => {
      const response = await fetch('http://localhost:4000/api/v1/cart',{
        credentials: 'include'
      });
      const data = await response.json();
      resolve({ data });
    });
  }
  
  export function updateCart(update) {
    return new Promise(async (resolve) => {
      const response = await fetch('http://localhost:4000/api/v1/cart/' + update.id, {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: { 'content-type': 'application/json' },
        credentials: 'include'
      });
      const data = await response.json();
      resolve({ data });
    });
  }
  
  export function deleteItemFromCart(itemId) {
    return new Promise(async (resolve) => {
      const response = await fetch('http://localhost:4000/api/v1/cart/' + itemId, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        credentials: 'include'
      });
      const data = await response.json();
      resolve({ data: { id: itemId } });
    });
  }
  
  export function resetCart() {
    // get all items of user's cart - and then delete each
    return new Promise(async (resolve) => {
      const response = await fetchItemsByUserId();
      const items = response.data;
      for (let item of items) {
        await deleteItemFromCart(item.id);
      }
      resolve({ status: 'success' });
    });
  }