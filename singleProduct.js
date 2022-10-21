function getElement(selection) {
  const element = document.querySelector(selection);

  if (element) {
    return element;
  }
  throw new Error(`No such element ${selection} exists`);
};

const url = 'https://course-api.com/javascript-store-single-product';

const productDom = getElement('.product');

async function fetchProduct() {
  try {
  productDom.innerHTML=`<div class="loading"></div>`
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    console.log(id);
    const response = await fetch(`${url}?id=${id}`);
    console.log(response);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    productDom.innerHTML =`<p class="error">There was a problem loading the product. Please try again later</p>`
  }
} 

const displayProducts = (product) => {
  const {
    colors,
    description,
    image,
    name: title,
    price,
    company,
  } = product.fields;
  document.title = title.toUpperCase();
  const { url: img } = image[0];
  const formatPrice = price / 100;

  const colorsList = colors.map((color) => {
    return `<span class="color" style=background:${color}></span>`
  })

  productDom.innerHTML = `<div class="product-wrapper">
  <img src="${img}" alt="${title}" class="img" />
  <div class="product-info">
    <h3>${title}</h3>
    <h5>${company}</h5>
    <span>${formatPrice}</span>
    <div class="colors">
      ${colorsList}
    </div>
    <p>
      ${description}
    </p>
    <button class="btn">
      add to cart
    </button>
  </div>
  </div>`
}

const start = async ()=>{
  const data = await fetchProduct();
  console.log(data);
  displayProducts(data);
}

start();
