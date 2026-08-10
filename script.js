//popup-izlazak-slike//
function closeAllPopups() {
  document.getElementById('overlay').classList.remove('show');
  document.getElementById('popup').classList.remove('show');
  document.getElementById('popup-herne').classList.remove('show');
  document.getElementById('popup-cespar').classList.remove('show');
}

// Otvaranje Introduction popupa
document
  .getElementById('Introduction-link')
  .addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('overlay').classList.add('show');
    document.getElementById('popup').classList.add('show');
  });

// Otvaranje Herne popupa
document.getElementById('Herne-link').addEventListener('click', function (e) {
  e.preventDefault();
  document.getElementById('overlay').classList.add('show');
  document.getElementById('popup-herne').classList.add('show');
});

// Otvaranje Cespar popupa
document.getElementById('Cespar-link').addEventListener('click', function (e) {
  e.preventDefault();
  document.getElementById('overlay').classList.add('show');
  document.getElementById('popup-cespar').classList.add('show');
});

// Zatvaranje klikom na zatamnjenu pozadinu (overlay)
document.getElementById('overlay').addEventListener('click', closeAllPopups);

// Zatvaranje klikom na bilo koje "X" dugme na stranici
const closeButtons = document.querySelectorAll('.close-popup-btn');
closeButtons.forEach((button) => {
  button.addEventListener('click', closeAllPopups);
});

// ==========================================
// LOGIKA ZA FIKSIRANI INFO PROZOR NA HOVER
// ==========================================

const tooltip = document.getElementById('map-tooltip');

// Podaci za ostrva
const islandData = {
  Herne: 'Name: Herne\nCurrency: Septims\nLanguages: Tamrielic, Yoku',
  Cespar: 'Name: Cespar\nCurrency: Septims\nLanguages: Tamrielic, Yoku',
};

function setupIslandHover(islandId) {
  const islandElement = document.getElementById(islandId);

  if (islandElement) {
    // Kada miš uđe na teritoriju ostrva, prozor se pojavi u ćošku ekrana
    islandElement.addEventListener('mouseenter', function () {
      tooltip.innerText = islandData[islandId];
      tooltip.style.display = 'block';
    });

    // Kada miš napusti teritoriju ostrva, prozor se sakrije
    islandElement.addEventListener('mouseleave', function () {
      tooltip.style.display = 'none';
    });
  }
}

// Pokreni hover sisteme nakon učitavanja stranice
document.addEventListener('DOMContentLoaded', function () {
  setupIslandHover('Herne');
  setupIslandHover('Cespar');
});

// ==========================================
// NOVI KOD: SVE VAŠE SVG IKONE I POVEZANE SLIKE
// ==========================================

const infoWindow = document.getElementById('icon-info-window');
const windowImg = document.getElementById('window-img');
const windowName = document.getElementById('window-name');
const windowType = document.getElementById('window-type');

// Tačan naziv vašeg foldera na računaru
const folderName = 'Pictures Iliac Bay Interactive Map';

// Baza podataka sa tačnim nazivima vaših slika (sa razmacima kako su i na računaru)
const iconLocations = {
  Tava_s_Roost: {
    name: "Tava's Roost",
    type: 'Type: Yoku Ruin',
    img: 'Tava s Roost.png',
  },
  Ino_Hirna: {
    name: 'Ino Hirna',
    type: 'Type: Yoku Ruin',
    img: 'Ino-Hirna.png',
  },
  '_Zamhai_Do-Hirn': {
    name: 'Zamhai Do-Hirn',
    type: 'Type: Yoku Ruin',
    img: 'Zamhai-Do-Hirn.png',
  },
  'Mitani_Do-Tu_whacca': {
    name: "Mitani Do-Tu'whacca",
    type: 'Type: Point of Interest',
    img: 'Mitani Do-Tu whacca.png',
  },
  Chendzrkel: {
    name: 'Chendzrkel',
    type: 'Type: Dwemer Ruin',
    img: 'Chendzrkel.png',
  },
  Eko_Hirna: {
    name: 'Eko Hirna',
    type: 'Type: Town/Village',
    img: 'Eko-Hirna.png',
  },
  Fort_Liminos: {
    name: 'Fort Liminos',
    type: 'Type: Imperial Fortt',
    img: 'Fort-Liminos.png',
  },
  Chora_Doks: {
    name: 'Chora Doks',
    type: 'Type: Docks',
    img: 'Chora-Docks.png',
  },
  Irkndzel: {
    name: 'Irkndzel',
    type: 'Type: Dwemer Ruin',
    img: 'Irkndzel.png',
  },
  Chora: { name: 'Chora', type: 'Type: Town/Village', img: 'Chora.png' },
  HoonDing_s_Veil: {
    name: "HoonDing's Veil",
    type: 'Type: Yoku Ruin',
    img: 'HoonDing s-Veil.png',
  },
  Ravanu_Oasis: {
    name: 'Ravanu Oasis',
    type: 'Type: Oasis',
    img: 'Ravanu-Oasis.png',
  },
};

function setupIconHoverWindow(baseId) {
  const part1 = document.getElementById(baseId);
  const part2 = document.getElementById(baseId + '-2');
  const elements = [part1, part2].filter((el) => el !== null);

  elements.forEach((element) => {
    // Kada kursor pređe preko ikone
    element.addEventListener('mouseenter', function () {
      const data = iconLocations[baseId];
      if (data) {
        // Pametno spajanje putanje: pretvara razmake u sigurne znakove za browser (%20)
        const safeFolderPath = folderName
          .split(' ')
          .map(encodeURIComponent)
          .join(' ');
        const safeImgPath = data.img
          .split(' ')
          .map(encodeURIComponent)
          .join(' ');

        windowImg.src = safeFolderPath + '/' + safeImgPath;
        windowName.innerText = 'Name: ' + data.name;
        windowType.innerText = data.type;
        infoWindow.style.display = 'block'; // Otvara prozor u ćošku
      }
    });

    // Kada kursor napusti ikonu
    element.addEventListener('mouseleave', function () {
      infoWindow.style.display = 'none'; // Zatvara prozor
    });
  });
}

// Pokretanje nakon učitavanja stranice
document.addEventListener('DOMContentLoaded', function () {
  Object.keys(iconLocations).forEach((baseId) => {
    setupIconHoverWindow(baseId);
  });
});

// ==========================================
// LOGIKA ZA EFECT STROKE CRTANJA LINIJA
// ==========================================

function triggerIslandDrawing(islandId) {
  // Pronalazimo grupu (npr. <g id="Herne"> ili <g id="Cespar">)
  const islandGroup = document.getElementById(islandId);
  if (!islandGroup) return;

  // Selektujemo sve path-ove unutar te grupe
  const paths = islandGroup.querySelectorAll('path');

  paths.forEach((path) => {
    // 1. Resetujemo animaciju ako je već bila pokrenuta ranije
    path.classList.remove('drawing-animation');
    path.style.removeProperty('--path-length');
    path.style.strokeDasharray = '';
    path.style.strokeDashoffset = '';

    // Force reflow (trik da browser shvati da smo uklonili klasu)
    void path.offsetWidth;

    // 2. Izračunavamo tačnu ukupnu dužinu ovog konkretnog path-a
    const length = path.getTotalLength();

    // 3. Postavljamo dasharray i početni offset na punu dužinu linije (sakrivamo je)
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    // 4. Prosljeđujemo dužinu u CSS varijablu kako bi je animacija koristila
    path.style.setProperty('--path-length', length);

    // 5. Dodajemo klasu koja pokreće @keyframes drawLine animaciju
    path.classList.add('drawing-animation');
  });
}

// Povezivanje klikova na dugmad nakon što se stranica učita
document.addEventListener('DOMContentLoaded', function () {
  const herneBtn = document.getElementById('draw-herne-btn');
  const cesparBtn = document.getElementById('draw-cespar-btn');

  if (herneBtn) {
    herneBtn.addEventListener('click', function () {
      triggerIslandDrawing('Herne'); // Proslijedi tačan ID grupe iz vašeg SVG-a
    });
  }

  if (cesparBtn) {
    cesparBtn.addEventListener('click', function () {
      triggerIslandDrawing('Cespar'); // Proslijedi tačan ID grupe iz vašeg SVG-a
    });
  }
});
