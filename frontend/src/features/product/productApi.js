const fetchAllProducts = async (query) => {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:4000/api/v1/products" + query,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
};

const fetchProductsByFilters = async (filter, sort, pagination, admin) => {
  console.log("filter in api", filter);
  let query = "";
  for (let key in filter) {
    // const categoryValues = filter[key].join(","); // if filter[key] is an array
    const categoryValues = Array.from(filter[key]).join(','); // if filter[key] is a set
    console.log("categoryValues", categoryValues);
    query += `${key}=${categoryValues}&`;
  }
  console.log("query", query);
  for (let key in sort) {
    query += `${key}=${sort[key]}&`;
  }
  console.log("query", query);

  // if (query.length > 0) {
  //   query = query.substring(0, query.length - 1);
  //   query = `${query}`;
  // }
  console.log(query);

  // if(admin){
  //     query+=`admin=true`
  // }
  // console.log("filter", filter);

  // let queryString = "";
  // for (let key in filter) {
  //   const categoryValues = filter[key];
  //   console.log("categoryValues", categoryValues);
  //   if (categoryValues.length) {
  //     queryString += `${key}=${categoryValues}&`;
  //     console.log("queryString", queryString);
  //   }
  // }
  // for (let key in sort) {
  //   queryString += `${key}=${sort[key]}&`;
  // }
  // for (let key in pagination) {
  //   queryString += `${key}=${pagination[key]}&`;
  // }
  if (admin) {
    query += `admin=true`;
  }
  console.log("queryString", query);

  // console.log("queryString", queryString);

  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:4000/api/v1/products?" + query
    );
    const data = await response.json();
    const totalItems = response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
};

const fetchCategories = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/v1/categories", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return { data };
  } catch (error) {
    return { error };
  }
};

const fetchBrands = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/v1/brands", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return { data };
  } catch (error) {
    return { error };
  }
};

const createProduct = async (product) => {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:4000/api/v1/products/create",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(product),
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log("create product in api ", data);
      resolve({ data });
    } else {
      const error = await response.json();
      console.log("error in create product in api ", error);
      resolve({ error });
    }
  });
};

const updatedProduct = async (product, update) => {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:4000/api/v1/products/" + product.id,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(update),
      }
    );
    const data = await response.json();
    resolve({ data });
  });
};

const deleteProduct = async (product) => {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:4000/api/v1/products/" + product.id,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(product),
      }
    );
    if (response.ok) {
      const data = await response.json();
      resolve({ data });
    } else {
      const error = await response.json();
      resolve({ error });
    }
  });
};

const fetchProductById = async (id) => {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:4000/api/v1/products/${id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
};

export {
  fetchAllProducts,
  deleteProduct,
  fetchProductsByFilters,
  fetchCategories,
  fetchBrands,
  createProduct,
  updatedProduct,
  fetchProductById,
};
