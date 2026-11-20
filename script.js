let savatcha = [];

const bolimlar = document.querySelectorAll(".bolim");
const navTugmalari = document.querySelectorAll(".nav-btn");
const navLinks = document.getElementById("navLinks");
const menuToggle = document.getElementById("menuToggle");
const savatSoniEl = document.getElementById("savat-soni");
const savatchaRoyxatEl = document.getElementById("savatcha-royxat");
const jamiNarxEl = document.getElementById("jami-narx");
const xabarOynaEl = document.getElementById("xabar-oyna");

// Bo'limlar o'rtasida o'tish funksiyasi
function bolimniOch(bolimId) {
  bolimlar.forEach((bolim) => {
    bolim.classList.remove("aktiv-bolim");
  });

  const tanlanganBolim = document.getElementById(bolimId);
  if (tanlanganBolim) {
    tanlanganBolim.classList.add("aktiv-bolim");
  }

  navTugmalari.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.bolim === bolimId);
  });

  navLinks.classList.remove("ochiq");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Yuqori menyudagi bo'lim tugmalariga hodisa ulash
navTugmalari.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const bolimId = btn.dataset.bolim;
    bolimniOch(bolimId);
  });
});

// Mobil menyuni ochish/yopish
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("ochiq");
});

// Vaqtinchalik xabar chiqarish
function xabarKorsat(matn) {
  xabarOynaEl.textContent = matn;
  xabarOynaEl.classList.add("korinadi");

  setTimeout(() => {
    xabarOynaEl.classList.remove("korinadi");
  }, 2400);
}

// Mahsulotni savatchaga qo'shish
function savatgaQosh(nomi, narxi) {
  savatcha.push({ nomi, narxi });
  savatchaniYangilash();
  xabarKorsat(`"${nomi}" savatchaga qo'shildi!`);
}

// Mahsulotni savatchadan o'chirish
function savatdanOchir(indeks) {
  savatcha.splice(indeks, 1);
  savatchaniYangilash();
  xabarKorsat("Mahsulot savatchadan o'chirildi");
}

// Savatchani tozalash
function savatniTozalash() {
  savatcha = [];
  savatchaniYangilash();
  xabarKorsat("Savatcha tozalandi");
}

// Buyurtma berish
function buyurtmaBerish() {
  if (savatcha.length === 0) {
    xabarKorsat("Savatchangiz bo'sh! Avval mahsulot tanlang.");
    return;
  }

  const jami = savatcha.reduce((sum, item) => sum + item.narxi, 0);
  xabarKorsat(`Buyurtmangiz qabul qilindi! Jami: $${jami.toLocaleString()}`);
  savatcha = [];
  savatchaniYangilash();
}

// Savatcha ko'rinishini va jami narxni yangilash
function savatchaniYangilash() {
  savatSoniEl.textContent = savatcha.length;

  const jami = savatcha.reduce((sum, item) => sum + item.narxi, 0);
  jamiNarxEl.textContent = jami.toLocaleString();

  if (savatcha.length === 0) {
    savatchaRoyxatEl.innerHTML = '<p class="bosh-savatcha">Savatchada hozircha mahsulot yo\'q.</p>';
    return;
  }

  savatchaRoyxatEl.innerHTML = savatcha
    .map(
      (item, index) => `
      <div class="savatcha-element">
        <div>
          <strong>${item.nomi}</strong>
          <div>$${item.narxi.toLocaleString()}</div>
        </div>
        <button class="ochirish-btn" onclick="savatdanOchir(${index})">O'chirish</button>
      </div>
    `
    )
    .join("");
}

// Sahifa yuklanganda savatchani boshlang'ich holatda ko'rsatish
savatchaniYangilash();