// main.js

document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart and wishlist
    let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    let wishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
  
    // Function to update cart display
    function updateCartDisplay() {
      const cartButton = document.querySelector('button:contains("🛒")');
      cartButton.textContent = `🛒 ${cart.length} Items`;
    }
  
    // Function to toggle wishlist status
    function toggleWishlist(productName) {
      const index = wishlist.findIndex(item => item.name === productName);
      if (index === -1) {
        wishlist.push({ name: productName, price: 0 }); // Price will be updated later
        alert(`${productName} added to wishlist!`);
      } else {
        wishlist.splice(index, 1);
        alert(`${productName} removed from wishlist!`);
      }
      localStorage.setItem('wishlistItems', JSON.stringify(wishlist));
    }
  
    // Function to add product to cart
    function addToCart(product) {
      const existingItem = cart.find(item => item.name === product.name);
      if (existingItem) {
        existingItem.quantity += product.quantity;
      } else {
        cart.push(product);
      }
      localStorage.setItem('cartItems', JSON.stringify(cart));
      updateCartDisplay();
      alert(`${product.name} added to cart!`);
    }
  
    // Event listeners for product cards
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', (event) => {
        const productCard = event.target.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = parseInt(productCard.querySelector('p').textContent.replace('Price: ₹', ''));
        addToCart({ name: productName, price: productPrice, quantity: 1 });
      });
    });
  
    document.querySelectorAll('.wishlist-icon').forEach(button => {
      button.addEventListener('click', (event) => {
        const productCard = event.target.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        toggleWishlist(productName);
        event.target.classList.toggle('active');
      });
    });
  
    // Services Page
    if (document.title.includes('Services')) {
      alert('Welcome to Foody Hub Services!');
    }
  
    // Orders Page
    if (document.title.includes('Your Orders')) {
      const ordersSection = document.querySelector('p');
      const orders = JSON.parse(localStorage.getItem('userOrders')) || [];
  
      if (orders.length === 0) {
        ordersSection.textContent = 'You have not placed any orders yet.';
      } else {
        ordersSection.remove();
        const list = document.createElement('ul');
        orders.forEach(order => {
          const listItem = document.createElement('li');
          listItem.textContent = `${order.name} - ₹${order.price} x ${order.quantity}`;
          list.appendChild(listItem);
        });
        document.body.appendChild(list);
      }
    }
  
    // Wishlist Page
    if (document.title.includes('Wishlist')) {
      const wishlistSection = document.querySelector('p');
  
      if (wishlist.length === 0) {
        wishlistSection.textContent = 'Your wishlist is empty. Add your favorite dishes for easy access!';
      } else {
        wishlistSection.remove();
        const list = document.createElement('ul');
        wishlist.forEach((item, index) => {
          const listItem = document.createElement('li');
          listItem.textContent = `${item.name} - ₹${item.price}`;
          const removeBtn = document.createElement('button');
          removeBtn.textContent = 'Remove';
          removeBtn.style.marginLeft = '10px';
          removeBtn.onclick = () => {
            wishlist.splice(index, 1);
            localStorage.setItem('wishlistItems', JSON.stringify(wishlist));
            location.reload();
          };
          listItem.appendChild(removeBtn);
          list.appendChild(listItem);
        });
        document.body.appendChild(list);
      }
    }
  
    // Cart Page
    if (document.title.includes('Cart')) {
      const cartMessage = document.querySelector('p');
  
      if (cart.length === 0) {
        cartMessage.textContent = 'No items in the cart yet.';
      } else {
        cartMessage.remove();
        const list = document.createElement('ul');
        let total = 0;
        cart.forEach((item, index ) => {
          const listItem = document.createElement('li');
          const itemTotal = item.price * item.quantity;
          total += itemTotal;
          listItem.textContent = `${item.name} - ₹${item.price} x ${item.quantity} = ₹${itemTotal}`;
  
          const removeBtn = document.createElement('button');
          removeBtn.textContent = 'Remove';
          removeBtn.style.marginLeft = '10px';
          removeBtn.onclick = () => {
            cart.splice(index, 1);
            localStorage.setItem('cartItems', JSON.stringify(cart));
            location.reload();
          };
  
          listItem.appendChild(removeBtn);
          list.appendChild(listItem);
        });
        document.body.appendChild(list);
  
        const totalText = document.createElement('h3');
        totalText.textContent = `Total: ₹${total}`;
        totalText.style.marginTop = '20px';
        document.body.appendChild(totalText);
      }
    }
  
    // Checkout Page
    if (document.title.includes('Checkout')) {
      const totalPara = document.querySelector('p');
      const payButton = document.querySelector('button');
      let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
      totalPara.textContent = `Total Amount: ₹${total}`;
  
      payButton.addEventListener('click', () => {
        if (total === 0) {
          alert('Your cart is empty. Please add items before proceeding to pay.');
        } else {
          alert(`Payment of ₹${total} is being processed. Thank you for ordering with Foody Hub!`);
          localStorage.removeItem('cartItems');
          window.location.href = 'thankyou.html'; // Redirect to a thank you page (if exists)
        }
      });
    }
  
    // Contact Page
    if (document.title.includes('Contact')) {
      const form = document.querySelector('form');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = form.elements['name'].value.trim();
        const email = form.elements['email'].value.trim();
        const message = form.elements['message'].value.trim();
  
        if (!name || !email || !message) {
          alert('Please fill out all fields before submitting.');
          return;
        }
  
        alert(`Thank you, ${name}! Your message has been received.`);
        form.reset();
      });
    }
  
    updateCartDisplay(); // Initial call to update cart display
  });