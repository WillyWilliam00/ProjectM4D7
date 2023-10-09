const Row = document.querySelector(".row")
const NavBarCart = document.querySelector('.offcanvas-body')
let result = []


 window.onload = async () => {
   const data = await GetProducts();
   DisplayMyProducts(data);

 }

 async function GetProducts() {
  Row.innerHTML = /*html*/

    `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`

  try {
    const response = await fetch("https://striveschool-api.herokuapp.com/api/product/",
      { headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFjZjIwYzUyYmJmMzAwMTg3OWIxZTgiLCJpYXQiOjE2OTYzOTU3ODgsImV4cCI6MTY5NzYwNTM4OH0.9R7rOYsAE9jENc32hvt3ua7fc2bv2dWkSDK-PGXuOFE" } })
    const data = await response.json()
    result = data
    console.log(result)
    return data
  }
  catch {
    alert("oh oh");
  }
  finally {
    Row.querySelector(".lds-ring").remove();
  }
}

async function deleteproduct(name, id) {
  
    if (!confirm(`Sei sicuro di voler eliminare ${name}?`)) {
    return}
    

  const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFjZjIwYzUyYmJmMzAwMTg3OWIxZTgiLCJpYXQiOjE2OTYzOTU3ODgsImV4cCI6MTY5NzYwNTM4OH0.9R7rOYsAE9jENc32hvt3ua7fc2bv2dWkSDK-PGXuOFE"
    }})
    if (response.ok) {
      
      alert(`Prodotto ${name} eliminato!`)
      DisplayMyProducts(await GetProducts())
    } else {
      alert("Oh Oh, riprova!")
  }
  
}

async function DisplayMyProducts(data) {

  Row.innerHTML= data.map(product => /*html*/
  `
  <div class="col-12 d-flex border-radius-black p-2 my-2">
    <div>
        <img src="${product.imageUrl}"
            class="border-radius-img" alt="..." style="width: 250px; height: 250px; object-fit: cover;">
    </div>
    <div class="ps-4 d-flex flex-column justify-content-evenly">
        <h5 class="m-0">${product.name}</h5>
        <p  class="m-0"><span class="fw-bolder">Prezzo: </span>${product.price}€</p>
        <p  class="m-0"><span class="fw-bolder">Brand: </span>${product.brand}</p>
        <span class="fw-bolder">Description:</span>
        <p  class="m-0">${product.description}</p>
     </div>
     <div class="d-flex align-items-start pt-1 pe-1">
        <a href="../ModifyProduct/ModifyProduct.html?id=${product._id}"><button type="button" class="btn btn-warning hover-button" ><i class="bi bi-pencil-square"></i></button></a>
        <button type="button" class="btn btn-danger ms-1 hover-button" onclick="deleteproduct('${product.name}', '${product._id}')"><i class="bi bi-trash"></i></button>
     </div>
  
  </div>`).join("")
  
}

function AlphabeticOrder() {

  result.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }


    return 0;
  });

  DisplayMyProducts(result)

}

function IncreasingPrice() {
  result.sort((a, b) => a.price - b.price);
  DisplayMyProducts(result)
}

function DecreasingPrice() {
  result.sort((a, b) => a.price - b.price).reverse()
  DisplayMyProducts(result)
}