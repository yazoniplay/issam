let products=JSON.parse(localStorage.getItem('products'))||[
{name:'Under Armour Hoodie',price:'699 SEK',brand:'Under Armour'},
{name:'Umbro Football Jersey',price:'499 SEK',brand:'Umbro'}
];
const area=document.getElementById('products');
if(area){area.innerHTML=products.map(p=>`<div class="card"><h2>${p.name}</h2><p>${p.brand}</p><b>${p.price}</b></div>`).join('')}
let cart=0;document.getElementById('cart')?.addEventListener('click',()=>alert('Cart: '+cart+' items'));