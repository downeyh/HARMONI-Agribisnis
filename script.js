
// Configuration
const WA_NUMBER = "+6283189208158"; // nomor WA yang diberikan
const SITE_NAME = "HARMONI Agribisnis";

const PRODUCTS = [
  {id:1, name:"Selada Hidroponik (250 gr)", cat:"daun", price:14000, stock:120, desc:"Selada segar, dipanen pagi hari, tanpa pestisida."},
  {id:2, name:"Pakcoy (250 gr)", cat:"daun", price:10000, stock:100, desc:"Pakcoy sehat dari sistem hidroponik kami."},
  {id:3, name:"Kangkung (250 gr)", cat:"daun", price:9000, stock:130, desc:"Kangkung renyah, cocok untuk tumisan."},
  {id:4, name:"Bayam (250 gr)", cat:"daun", price:11000, stock:90, desc:"Bayam hijau kaya nutrisi."},
  {id:5, name:"Telur Ayam Kampung (1 kg)", cat:"telur", price:32000, stock:300, desc:"Telur dari ayam petelur HARMONI, kualitas terjaga."}
];

function formatRp(n){ return 'Rp' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); }

const grid = document.getElementById('productGrid');
function renderProducts(filter='all', q=''){
  grid.innerHTML = '';
  const filtered = PRODUCTS.filter(p=> (filter==='all'?true:p.cat===filter) && (q===''?true:(p.name.toLowerCase().includes(q)||p.desc.toLowerCase().includes(q))) );
  if(filtered.length===0){ grid.innerHTML = '<div style="grid-column:1/-1;padding:18px;color:#666;background:#fff;border-radius:8px">Tidak ada produk.</div>'; return; }
  filtered.forEach(p=>{
    const el = document.createElement('article'); el.className='card';
    el.innerHTML = `
      <div class="thumb">${p.name.split(' ')[0]}</div>
      <h4>${p.name}</h4>
      <p>${p.desc}</p>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="price">${formatRp(p.price)}</div>
        <div style="color:#666">Stok: ${p.stock}</div>
      </div>
      <div style="margin-top:8px"><a href="#" class="btn primary order-btn" data-id="${p.id}">Pesan via WhatsApp</a></div>
    `;
    grid.appendChild(el);
  });

  document.querySelectorAll('.order-btn').forEach(b=>b.addEventListener('click', e=>{
    e.preventDefault();
    const id = Number(e.currentTarget.dataset.id);
    const p = PRODUCTS.find(x=>x.id===id);
    const msg = `Halo ${SITE_NAME}, saya ingin memesan: *${p.name}* (qty: 1). Mohon info ketersediaan & total harga. Terima kasih.`;
    const url = `https://wa.me/${WA_NUMBER.replace(/[^0-9]/g,'')}?text=`+encodeURIComponent(msg);
    window.open(url,'_blank');
  }));
}

document.querySelectorAll('.chip').forEach(c=>c.addEventListener('click', ()=>{
  document.querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));
  c.classList.add('active');
  renderProducts(c.dataset.cat);
}));

document.getElementById('waTop').addEventListener('click', ()=>{
  const msg = `Halo ${SITE_NAME}, saya mau info & pemesanan.`;
  const url = `https://wa.me/${WA_NUMBER.replace(/[^0-9]/g,'')}?text=`+encodeURIComponent(msg);
  window.open(url,'_blank');
});

document.getElementById('waFloat').addEventListener('click', (e)=>{
  e.preventDefault();
  const msg = `Halo ${SITE_NAME}, saya mau info & pemesanan.`;
  const url = `https://wa.me/${WA_NUMBER.replace(/[^0-9]/g,'')}?text=`+encodeURIComponent(msg);
  window.open(url,'_blank');
});

// init
document.getElementById('waNumber').textContent = "+62 831-8920-8158";
renderProducts('all','');
