console.log('====================================');
console.log("Connected");
console.log('====================================');


fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
  .then(response => response.json())
  .then(data => {
    console.log(data); 

    
    const productContainer = document.getElementById('product-container');

    const categoryProducts = {};
    data.categories.forEach(category => {
      categoryProducts[category.category_name.toLowerCase()] = category.category_products;
    });

    function displayProducts(category) {
      productContainer.innerHTML = '';
      const products = categoryProducts[category];
      products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const productImage = document.createElement('div');
        productImage.classList.add('product-image');
        productImage.style.backgroundImage = `url('${product.image}')`; 
        productCard.appendChild(productImage);

        if (product.badge_text) {
          const badge = document.createElement('div');
          badge.classList.add('badge');
          badge.textContent = product.badge_text;
          productCard.appendChild(badge); 
        }

        const productInfo = document.createElement('div');
        productInfo.classList.add('product-info');

        const productTitle = document.createElement('div');
productTitle.classList.add('product-title');
productTitle.style.display = 'flex'; 
productTitle.style.gap = '1rem'; 
productTitle.style.alignItems = 'center'; 

const titleSpan = document.createElement('span'); 
titleSpan.textContent = product.title; 
productTitle.appendChild(titleSpan); 

const vendorSpan = document.createElement('li'); 
vendorSpan.textContent = product.vendor; 

productTitle.appendChild(vendorSpan); 

productInfo.appendChild(productTitle);

        // const vendor = document.createElement('li');
        // vendor.classList.add('vendor');
        // vendor.textContent = ` ${product.vendor}`; 
        // productInfo.appendChild(vendor); 

        const price = document.createElement('div');
        price.classList.add('price');
        price.innerHTML = `
          <span class="discounted-price">Rs ${product.price}</span>
          <span class="compare-price">  Rs ${product.compare_at_price}</span>
          <span class="discount">(50% off)</span>
        `; 
        productInfo.appendChild(price); 

        productCard.appendChild(productInfo); 

        const addToCartBtn = document.createElement('button');
        addToCartBtn.classList.add('add-to-cart-btn');
        addToCartBtn.textContent = 'Add to Cart';
        productCard.appendChild(addToCartBtn); 

        productContainer.appendChild(productCard);
      });
    }

    displayProducts('men');

    const menTab = document.getElementById('men-tab');
    const womenTab = document.getElementById('women-tab');
    const kidsTab = document.getElementById('kids-tab');

    menTab.addEventListener('click', () => displayProducts('men'));
    womenTab.addEventListener('click', () => displayProducts('women'));
    kidsTab.addEventListener('click', () => displayProducts('kids'));
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
