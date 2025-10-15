const headerBasket = document.querySelector(".header__basket");
const productsContainer = document.querySelector(".products");
const productTemplate = document.querySelector(".product__template");
const categories = document.querySelector(".categories");
const headerInput = document.querySelector(".header__input");
const headerBtn = document.querySelector(".header__btn");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal__close");
const modalTemplate = document.querySelector(".modal__template");
const modalProducts = document.querySelector(".modal__products");
const modalTitle = document.querySelector(".modal__title");
const modalFullPrice = document.querySelector(".modal__fullprice");
let cart = [];

getProducts();
calcProducts();

fetch("https://dummyjson.com/products/category-list")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    renderCategories(["all", ...data]);
  });

headerBtn.addEventListener("click", () => {
  const value = headerInput.value;
  getProducts(null, value);
});

headerBasket.addEventListener("click", () => {
  modal.classList.add("modal__active");
});

modalClose.addEventListener("click", () => {
  modal.classList.remove("modal__active");
});

function renderProducts(products) {
  productsContainer.innerHTML = null;
  products.forEach((product) => {
    const clone = productTemplate.content.cloneNode(true);
    const productTitle = clone.querySelector(".product__title");
    productTitle.innerHTML = product.title;
    const productImg = clone.querySelector(".product__img");
    productImg.src = product.thumbnail;
    const productText = clone.querySelector(".product__text");
    productText.innerHTML = product.description;
    const productPrice = clone.querySelector(".product__price");
    productPrice.innerHTML = `$ ${product.price}`;
    const productBtn = clone.querySelector(".product__btn");
    productBtn.addEventListener("click", () => {
      addToCart(product);
    });
    productsContainer.append(clone);
  });
}

function renderCart() {
  modalProducts.innerHTML = null;
  cart.forEach((product) => {
    const clone = modalTemplate.content.cloneNode(true);
    const modalName = clone.querySelector(".modal__name");
    modalName.innerHTML = product.title;
    const modalText = clone.querySelector(".modal__text");
    modalText.innerHTML = product.description;
    const modalPrice = clone.querySelector(".modal__price");
    modalPrice.innerHTML = `$ ${product.price}`;
    const modalImg = clone.querySelector(".modal__img");
    modalImg.src = product.thumbnail;
    const modalCount = clone.querySelector(".modal__count");
    modalCount.innerHTML = product.count;
    const modalAdd = clone.querySelector(".modal__add");
    const modalRemove = clone.querySelector(".modal__remove");
    const modalBtn = clone.querySelector(".modal__btn");
    modalBtn.addEventListener("click", () => {
      removeProduct(product);
    });
    modalAdd.addEventListener("click", () => {
      addToCart(product);
    });
    modalRemove.addEventListener("click", () => {
      minusCount(product);
    });
    modalProducts.append(clone);
  });
  calcProducts();
}

function renderCategories(categoriesArr) {
  categoriesArr.forEach((category, index) => {
    const btn = document.createElement("button");
    btn.classList.add("category");
    if (index === 0) {
      btn.classList.add("category-active");
    }
    btn.innerHTML = category;
    btn.addEventListener("click", () => {
      const activeBtn = document.querySelector(".category-active");
      activeBtn.classList.remove("category-active");
      btn.classList.add("category-active");
      getProducts(category);
    });
    categories.append(btn);
  });
}
function getProducts(category, search) {
  let url = "https://dummyjson.com/products";
  if (category && category != "all") {
    url += `/category/${category}`;
  }
  if (search) {
    url = `https://dummyjson.com/products/search?q=${search}`;
  }
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.products);
      renderProducts(data.products);
    });
  const products = [
    {
      id: 1,
      title: "iPhone 9",
      description: "An apple mobile which is nothing like apple",
      price: 549.99,
      discountPercentage: 12.96,
      rating: 4.69,
      stock: 94,
      brand: "Apple",
      category: "smartphones",
      thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
      images: [
        "https://cdn.dummyjson.com/product-images/1/1.jpg",
        "https://cdn.dummyjson.com/product-images/1/2.jpg",
        "https://cdn.dummyjson.com/product-images/1/3.jpg",
        "https://cdn.dummyjson.com/product-images/1/4.jpg",
        "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
      ],
    },
    {
      id: 2,
      title: "iPhone X",
      description:
        "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
      price: 899.99,
      discountPercentage: 17.94,
      rating: 4.44,
      stock: 34,
      brand: "Apple",
      category: "smartphones",
      thumbnail: "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
      images: [
        "https://cdn.dummyjson.com/product-images/2/1.jpg",
        "https://cdn.dummyjson.com/product-images/2/2.jpg",
        "https://cdn.dummyjson.com/product-images/2/3.jpg",
        "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
      ],
    },
    {
      id: 3,
      title: "Samsung Universe 9",
      description:
        "Samsung's new variant which goes beyond Galaxy to the Universe",
      price: 1249,
      discountPercentage: 15.46,
      rating: 4.09,
      stock: 36,
      brand: "Samsung",
      category: "smartphones",
      thumbnail: "https://cdn.dummyjson.com/product-images/3/thumbnail.jpg",
      images: ["https://cdn.dummyjson.com/product-images/3/1.jpg"],
    },
    {
      id: 4,
      title: "OPPOF19",
      description: "OPPO F19 is officially announced on April 2021.",
      price: 280,
      discountPercentage: 17.91,
      rating: 4.3,
      stock: 123,
      brand: "OPPO",
      category: "smartphones",
      thumbnail: "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg",
      images: [
        "https://cdn.dummyjson.com/product-images/4/1.jpg",
        "https://cdn.dummyjson.com/product-images/4/2.jpg",
        "https://cdn.dummyjson.com/product-images/4/3.jpg",
        "https://cdn.dummyjson.com/product-images/4/4.jpg",
        "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg",
      ],
    },
    {
      id: 5,
      title: "Huawei P30",
      description:
        "Huawei's re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
      price: 499,
      discountPercentage: 10.58,
      rating: 4.09,
      stock: 32,
      brand: "Huawei",
      category: "smartphones",
      thumbnail: "https://cdn.dummyjson.com/product-images/5/thumbnail.jpg",
      images: [
        "https://cdn.dummyjson.com/product-images/5/1.jpg",
        "https://cdn.dummyjson.com/product-images/5/2.jpg",
        "https://cdn.dummyjson.com/product-images/5/3.jpg",
      ],
    },
  ];
  renderProducts(products);
}

function addToCart(product) {
  const currentProduct = cart.find((item) => item.id === product.id);
  if (currentProduct) {
    currentProduct.count++;
  } else {
    cart.push({ ...product, count: 1 });
  }
  renderCart();
}

function minusCount(product) {
  const currentProduct = cart.find((item) => item.id === product.id);
  if (currentProduct.count > 1) {
    currentProduct.count--;
  }
  renderCart();
}

function removeProduct(product) {
  cart = cart.filter((item) => item.id != product.id);
  renderCart();
}

function calcProducts() {
  let sum = 0;
  let count = 0;
  cart.forEach((item) => {
    sum += item.price * item.count;
    count += item.count;
  });
  sum = sum.toFixed(2);   
  if (count === 0) {
    modalTitle.innerHTML = "Cart is empty...";
  } else {
    modalTitle.innerHTML = `${count} products for $ ${sum}`;
  }
  modalFullPrice.innerHTML = `$ ${sum}`;
}
