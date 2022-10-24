function getElement(selection) {
  const element = document.querySelector(selection);

  if (element) {
    return element;
  }
  throw new Error(`No such element ${selection} exists`);
};
const url = `https://course-api.com/javascript-store-products`;


const productsDom = getElement('.product-center');

async function fetchProducts() { 
  productsDom.innerHTML=`<div class="loading"></div>`
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  } catch (error) {
    productsDom.innerHTML = `<p class="error">
    there was an error</p>`
    }
};

function displayProducts(list) { 
  const productsList = list.map((item) => {
    const { id } = item;
    const { url: img } = item.fields.image[0];
    const { name:title, price } = item.fields;
    const formatPrice = price / 100;

    return `<a class="single-product" href="product.html?id=${id}&name=asensio&age=23">
          <img 
          src="${img}"
          alt="${title}" 
          class="single-product-img img"
          />
          <footer>
            <h5 class="name">${title}</h5>
            <span class="price">$${formatPrice}</span>
          </footer>
        </a> `
  }).join('');
  productsDom.innerHTML = `
      <div class="products-container">
        ${productsList}
      </div>
  `
}

const start = async() => {
  const data = await fetchProducts();
  displayProducts(data);
}

start();
