import { supabase } from './supabase.js';

let products=[];
let cart=JSON.parse(localStorage.getItem('cart') || '[]');

async function loadProducts(){
 const {data,error}=await supabase.from('products').select('*');
 if(error) return console.error(error);
 products=data||[];
 const area=document.getElementById('products');
 if(area) area.innerHTML=products.map((p)=>`
 <div class="card product">
  <img src="${p.image_url||''}">
  <p>${p.brand||''}</p>
  <h2>${p.name}</h2>
  <b>${p.price} SEK</b>
  <button onclick="addToCart('${p.id}')">Add to cart</button>
 </div>`).join('');
}

window.addToCart=function(id){
 const product=products.find(p=>String(p.id)===String(id));
 if(!product)return;
 const existing=cart.find(p=>p.id===product.id);
 if(existing) existing.quantity=(existing.quantity||1)+1;
 else cart.push({...product,quantity:1});
 localStorage.setItem('cart',JSON.stringify(cart));
 alert('Added to cart');
}

window.removeFromCart=function(id){
 cart=cart.filter(p=>String(p.id)!==String(id));
 localStorage.setItem('cart',JSON.stringify(cart));
 location.reload();
}

window.updateQuantity=function(id,qty){
 const item=cart.find(p=>String(p.id)===String(id));
 if(item)item.quantity=Math.max(1,Number(qty));
 localStorage.setItem('cart',JSON.stringify(cart));
 location.reload();
}

window.checkout=async function(customer){
 const total=cart.reduce((a,p)=>a+(Number(p.price)*p.quantity),0);
 const {data,error}=await supabase.from('orders').insert({customer_name:customer.name,email:customer.email,phone:customer.phone,address:customer.address,total,status:'Pending'}).select().single();
 if(error)return alert(error.message);
 await supabase.from('order_items').insert(cart.map(p=>({order_id:data.id,product_id:p.id,quantity:p.quantity,price:p.price})));
 localStorage.removeItem('cart');
 cart=[];
 alert('Order placed');
}

loadProducts();