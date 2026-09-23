let products=JSON.parse(localStorage.getItem('products'))||[
{name:'Under Armour Hoodie',price:'699 SEK',brand:'Under Armour'},
{name:'Umbro Football Jersey',price:'499 SEK',brand:'Umbro'}
];

const area=document.getElementById('products');
let cart=JSON.parse(localStorage.getItem('cart'))||[];

if(area){
 area.innerHTML=products.map((p,i)=>`<div class="card"><h2>${p.name}</h2><p>${p.brand}</p><b>${p.price}</b><button onclick="addToCart(${i})">Add to cart</button></div>`).join('');
}

function addToCart(index){
 cart.push(products[index]);
 localStorage.setItem('cart',JSON.stringify(cart));
 alert('Added to cart');
}

function checkout(){
 if(cart.length===0)return alert('Cart is empty');
 let orders=JSON.parse(localStorage.getItem('orders'))||[];
 orders.push({
  id:Date.now(),
  items:cart,
  status:'Pending',
  date:new Date().toLocaleString()
 });
 localStorage.setItem('orders',JSON.stringify(orders));
 localStorage.removeItem('cart');
 cart=[];
 alert('Order placed');
}

document.getElementById('cart')?.addEventListener('click',()=>alert('Cart: '+cart.length+' items'));