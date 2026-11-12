const CORRECT_DATE = "11/12/07";

function tryUnlock(){
  const input = document.getElementById('lockInput');
  const err = document.getElementById('lockError');
  const val = input.value.trim();
  if (val === CORRECT_DATE || val === "11/12/07" || val === "11/12/2007" || val === "11/12/2007"){
    document.getElementById('lock').style.display = 'none';
    const gifts = document.getElementById('gifts');
    gifts.classList.add('reveal');
    gifts.scrollIntoView({ behavior:'smooth' });
    err.textContent = '';
  } else {
    err.textContent = "That's not quite it — try again 💚";
  }
}

document.getElementById('lockInput').addEventListener('input', (e) => {
  let v = e.target.value.replace(/[^\d]/g, '');
  if (v.length > 6) v = v.slice(0,6);
  let out = v;
  if (v.length > 4) out = v.slice(0,2) + '/' + v.slice(2,4) + '/' + v.slice(4);
  else if (v.length > 2) out = v.slice(0,2) + '/' + v.slice(2);
  e.target.value = out;
});
document.getElementById('lockInput').addEventListener('focus', (e) => {
  e.target.type = 'tel';
});
document.getElementById('lockInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') tryUnlock();
});

// ---------- Gifts ----------
const giftContents = [
  { label:'Flowers', icon:'gift', title:'Ohana Flowers', text:"A little bouquet of love and cheerful vibes, just like a bright island morning." },
  { label:'Sunset', icon:'sun', title:'Sunset Adventure', text:"A perfect walk with you, full of laughter, sunset colors, and dreamy memories." },
  { label:'Necklace', icon:'heart', title:'Karimii Necklace', text:"A custom necklace with her name, made to keep your sparkle close to your heart every day." },
  { label:'Letter', icon:'moon', title:'Sweet Note', text:"A handmade card full of love, gratitude, and all the reasons you are extra special." },
];

const iconPaths = {
  gift: '<path d="M20 12v10H4V12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.6z"/>',
  star: '<path d="M12 2l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17l-6.1 3.5 1.5-6.8L2.2 9l6.9-.7z"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/>',
};

const galleryImages = [
  { type: 'image', src: 'usage/IMG_20261112_064413_277_2.jpg', alt: 'Photo memory' },
  { type: 'video', src: 'usage/VID_20261111_194413_286.mp4', alt: 'Video memory' },
  { type: 'image', src: 'usage/IMG_20261112_064413_279.jpg', alt: 'Photo memory' },
  { type: 'image', src: 'usage/IMG_20261112_064413_497_3.jpg', alt: 'Photo memory' },
  { type: 'image', src: 'usage/IMG_20261112_064413_506_4.jpg', alt: 'Photo memory' },
];

function renderGifts(){
  const grid = document.getElementById('giftGrid');
  grid.innerHTML = giftContents.map((g,i) => `
    <button class="gift" id="gift-${i}" onclick="openGift(${i})">
      <div class="gift-box">
        <div class="gift-bow"></div>
        <div class="gift-lid"></div>
        <div class="gift-body"></div>
        <div class="gift-ribbon-v"></div>
      </div>
      <div class="gift-label">${g.label}</div>
    </button>
  `).join('');
}
renderGifts();

function openGift(i){
  const g = giftContents[i];
  document.getElementById('gift-'+i).classList.add('opened');
  document.getElementById('modalIcon').innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${iconPaths[g.icon]}</svg>`;
  document.getElementById('modalTitle').textContent = g.title;
  document.getElementById('modalText').textContent = g.text;
  document.getElementById('giftModal').classList.add('open');
}
function closeGiftModal(){
  document.getElementById('giftModal').classList.remove('open');
}

function renderGallery(){
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;
  grid.innerHTML = galleryImages.map((image) => `
    <div class="gallery-card">
      ${image.type === 'video'
        ? `<video src="${image.src}" controls playsinline preload="metadata" muted></video>`
        : `<img src="${image.src}" alt="${image.alt}" loading="lazy">`
      }
    </div>
  `).join('');
}

function openGallery(){
  const modal = document.getElementById('galleryModal');
  if (!modal) return;
  modal.classList.add('open');
}

function closeGallery(){
  const modal = document.getElementById('galleryModal');
  if (!modal) return;
  modal.classList.remove('open');
}

renderGallery();

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape'){
    closeGiftModal();
    closeGallery();
  }
});

// ---------- Reasons ----------
const reasons = [
  "You can make my whole world feel lighter and brighter in seconds.",
  "You have this warm, beautiful energy that makes everyone feel safe and happy.",
  "You’re thoughtful, funny, and the kind of person who makes life feel more magical.",
  "Your smile has a way of turning ordinary moments into favorite memories.",
  "You inspire me to be kinder, braver, and more joyful just by being you.",
  "You’re one of those rare people who makes every little moment feel like home.",
];
document.getElementById('reasonsList').innerHTML = reasons.map((r,i) => `
  <div class="reason">
    <div class="reason-num">${i+1}</div>
    <div class="reason-text">${r}</div>
  </div>
`).join('');

// ---------- Confetti ----------
const confettiColors = ['#b99cff','#d9ccff','#eee6ff','#ffffff','#a889ef'];
function celebrate(){
  const wrap = document.getElementById('confettiWrap');
  for (let i = 0; i < 60; i++){
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random()*100 + '%';
    c.style.background = confettiColors[Math.floor(Math.random()*confettiColors.length)];
    c.style.animationDuration = (2.5 + Math.random()*2) + 's';
    c.style.animationDelay = (Math.random()*0.4) + 's';
    c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    wrap.appendChild(c);
    setTimeout(() => c.remove(), 5000);
  }
}