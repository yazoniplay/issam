const products = JSON.parse(localStorage.getItem('issaw_products') || '[]');

if (!products.length) {
 localStorage.setItem('issaw_products', JSON.stringify([
  {name:'Under Armour Training Shirt',price:'399 kr',brand:'Under Armour',image:'https://via.placeholder.com/500'},
  {name:'Umbro Football Jersey',price:'499 kr',brand:'Umbro',image:'https://via.placeholder.com/500'}
 ]));
}

function getProducts(){return JSON.parse(localStorage.getItem('issaw_products')||'[]');}

function renderProducts(){
 const area=document.querySelector('.products');
 if(!area)return;
 area.innerHTML='';
 getProducts().forEach(p=>{
  area.innerHTML+=`<article class="card product"><img src="${p.image}"><h2>${p.name}</h2><p>${p.brand}</p><strong>${p.price}</strong><button onclick="addCart('${p.name}')">Add to cart</button></article>`;
 });
}

function addCart(name){
 let cart=JSON.parse(localStorage.getItem('cart')||'[]');
 cart.push(name);localStorage.setItem('cart',JSON.stringify(cart));alert('Added to cart');
}

document.addEventListener('DOMContentLoaded',renderProducts);