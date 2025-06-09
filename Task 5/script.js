const products = [
  {
    name: "Smartphone",
    category: "electronics",
    price: 699,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=2118&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Jeans",
    category: "clothing",
    price: 49,
    image: "https://st.depositphotos.com/1021124/1759/i/450/depositphotos_17597535-stock-photo-jeans.jpg"
  },
  {
    name: "Headphones",
    category: "electronics",
    price: 199,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTp99HdLuyoa0PNpvc5bYccVnrRM-Rn1DjRw&s"
  },
  {
    name: "T-Shirt",
    category: "clothing",
    price: 25,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaD3yJMoLi5jiqPG3gn8r7spsswix9b6g6bg&s"
  }
];

const productList = document.getElementById("product-list");
const filterCategory = document.getElementById("filterCategory");
const sortPrice = document.getElementById("sortPrice");

// Modal Elements
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalCategory = document.getElementById("modal-category");
const modalPrice = document.getElementById("modal-price");
const closeBtn = document.querySelector(".close-btn");

function displayProducts(filteredProducts) {
  productList.innerHTML = "";
  filteredProducts.forEach((product, index) => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <i class="fas fa-heart favorite" data-index="${index}"></i>
      <img src="${product.image}" alt="${product.name}" loading="lazy"/>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.category}</p>
        <p><strong>$${product.price}</strong></p>
      </div>
    `;

    div.addEventListener("click", (e) => {
      if (!e.target.classList.contains("favorite")) {
        openModal(product);
      }
    });

    div.querySelector(".favorite").addEventListener("click", function (e) {
      e.stopPropagation();
      this.classList.toggle("active");
    });

    productList.appendChild(div);
  });
}

function openModal(product) {
  modalImg.src = product.image;
  modalTitle.textContent = product.name;
  modalCategory.textContent = `Category: ${product.category}`;
  modalPrice.textContent = `Price: $${product.price}`;
  modal.classList.remove("hidden");
}

closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

window.addEventListener("click", e => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

function filterAndSort() {
  let filtered = [...products];

  const category = filterCategory.value;
  if (category !== "all") {
    filtered = filtered.filter(p => p.category === category);
  }

  const sort = sortPrice.value;
  if (sort === "low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  displayProducts(filtered);
}

filterCategory.addEventListener("change", filterAndSort);
sortPrice.addEventListener("change", filterAndSort);

window.addEventListener("DOMContentLoaded", () => {
  displayProducts(products);
});
