const products = JSON.parse(localStorage.getItem('issaw_products') || '[]');

if (!products.length) {
 localStorage.setItem('issaw_products', JSON.stringify([
  {id:1,name:'Under Armour Training Shirt',price:'399 kr',brand:'Under Armour',image:'https://via.placeholder.com/500'},
  {id:2,name:'Umbro Football Jersey',price:'499 kr',brand:'Umbro',image:'https://via.placeholder.com/500'}
 ]));
}

function getProducts(){
 return JSON.parse(localStorage.getItem('issaw_products') || '[]');
}

function renderProducts(list=getProducts()){
 const area=document.querySelector('#products') || document.querySelector('.products');
 if(!area)return;
 area.innerHTML='';
 
 list.forEach((p,index)=>{
  const id = p.id ?? index;
  area.innerHTML += `
  <article class="card product" onclick="openProduct('${id}')">
   <img src="${p.image}" alt="${p.name}">
   <p>${p.brand || ''}</p>
   <h2>${p.name}</h2>
   <strong>${p.price}</strong>
   <button onclick="event.stopPropagation(); addCart('${p.name}')">Add to cart</button>
  </article>`;
 });
}

function openProduct(id){
 window.location.href = `product.html?id=${id}`;
}

function addCart(name){
 let cart=JSON.parse(localStorage.getItem('cart') || '[]');
 cart.push(name);
 localStorage.setItem('cart',JSON.stringify(cart));
 alert('Added to cart');
}

document.addEventListener('DOMContentLoaded',()=>{
 renderProducts();
 const search=document.querySelector('#search');
 if(search){
  search.addEventListener('input',e=>{
   const value=e.target.value.toLowerCase();
   renderProducts(getProducts().filter(p=>(p.name+p.brand).toLowerCase().includes(value)));
  });
 }
});