export function createOrder(order) {
    return new Promise(async (resolve) => {
      const response = await fetch('http://localhost:4000/api/v1/orders', {
        method: 'POST',
        body: JSON.stringify(order),
        headers: { 'content-type': 'application/json' },
        credentials: 'include'
      });
      const data = await response.json();
      resolve({ data });
    });
  }
  
  export function fetchOrdersByUser() {
    return new Promise(async (resolve) => {
      const response = await fetch("http://localhost:4000/api/v1/orders", {
        credentials: "include",
      });
      const data = await response.json();
      resolve({ data });
    });
  }

  // export function updateOrder(order) {
  //   return new Promise(async (resolve) => {
  //     const response = await fetch('/orders/'+order.id, {
  //       method: 'PATCH',
  //       body: JSON.stringify(order),
  //       headers: { 'content-type': 'application/json' },
  //     });
  //     const data = await response.json();
  //     resolve({ data });
  //   });
  // }

  export function fetchOrderById(orderId) {
    return new Promise(async (resolve) => {
      const response = await fetch('http://localhost:4000/api/v1/orders/' + orderId,{
        credentials: 'include'
      });
      const data = await response.json();
      resolve({ data });
    });
  }
  
  export function fetchAllOrders(sort, pagination) {
   let queryString = '';
  
   for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
    for (let key in pagination) {
      queryString += `${key}=${pagination[key]}&`;
    }
  
    return new Promise(async (resolve) => {
      const response = await fetch(
        'http://localhost:4000/api/v1/orders/?' + queryString
      );
      const data = await response.json();
      const totalOrders = await response.headers.get('X-Total-Count');
      resolve({ data: { orders: data, totalOrders: +totalOrders } });
    });
  }


  export function fetchTotalOrdersByAdmin (admin, queryString) {
    return new Promise(async (resolve) => {
      console.log("admin in fetchTotalOrdersByAdmin", admin,queryString);
      const response = await fetch('http://localhost:4000/api/v1/orders/admin/' + admin.id + queryString, {
        credentials: 'include'
      }
      );
      const data = await response.json();
      console.log("data in fetchTotalOrdersByAdmin", data);
      resolve({ data });
    });
  }

  export function updateOrderStatusById(orderId, orderStatus) {
    return new Promise(async (resolve) => {
      console.log("orderId in updateOrderStatusById", orderId,orderStatus);
      const response = await fetch('http://localhost:4000/api/v1/orders/' + orderId, {
        method: 'PATCH',
        body: JSON.stringify(orderStatus),
        headers: { 'content-type': 'application/json' },
        credentials: 'include'
      });
      const data = await response.json();
      resolve({ data });
    });
  }