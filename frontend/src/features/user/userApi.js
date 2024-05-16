export function fetchLoggedInUserOrders() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:4000/api/v1/orders", {
      credentials: "include",
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchLoggedInUser() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:4000/api/v1/users", {
      credentials: "include",
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateUser(address) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:4000/api/v1/users", {
      method: "PATCH",
      body: JSON.stringify(address),
      headers: { "content-type": "application/json" },
      credentials: "include",
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
    resolve({ data });
  });
}


export function deleteUserAddress(index) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:4000/api/v1/users/address", {
      method: "PATCH",
      body: JSON.stringify({ index }),
      headers: { "content-type": "application/json" },
      credentials: "include",
    });
    const data = await response.json();
    resolve({ data });
  });
}
