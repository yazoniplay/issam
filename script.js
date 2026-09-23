import { supabase } from './supabase.js';

let products=[];
let cart=JSON.parse(localStorage.getItem('cart')||'');

async function loadProducts(){
 const {data,error}=await supabase.from('products').select('*');
 if(error) return console.error(error);
 products=data||[];
 const area=document.getElementById('products');
 if(area) area.innerHTML=products.map((p,i)=>`<div class="card"><img src="${p.image_url||''}" width="200"><h2>${p.name}</h2><p>${p.brand}</p><b>${p.price} SEK</b><button onclick="addToCart(${i})">Add to cart</button></div>`).join('');
}

window.addToCart=function(i){cart.push(products[i]);localStorage.setItem('cart',JSON.stringify(cart));alert('Added to cart')}

window.checkout=async function(customer){
 const total=cart.reduce((a,p)=>a+Number(p.price),0);
 const {data,error}=await supabase.from('orders').insert({customer_name:customer.name,email:customer.email,phone:customer.phone,address:customer.address,total,status:'Pending'}).select().single();
 if(error)return alert(error.message);
 await supabase.from('order_items').insert(cart.map(p=>({order_id:data.id,product_id:p.id,quantity:1,price:p.price})));
 localStorage.removeItem('cart');cart=[];alert('Order placed');
}

loadProducts();