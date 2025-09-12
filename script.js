// Mobile menu toggle (guarded)
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Basic form validation (non-blocking; does not intercept submit)
const applicationForm = document.getElementById('application-form');
if (applicationForm) {
  const inputs = applicationForm.querySelectorAll('input[required], textarea[required], select[required]');
  const validateField = (input) => {
    const error = input.nextElementSibling;
    if (!error) return;
    const value = (input.value || '').trim();
    let show = false;
    if (!value) show = true;
    if (!show && input.type === 'email') {
      show = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }
    error.style.display = show ? 'block' : 'none';
  };
  inputs.forEach((input) => {
    ['input', 'blur', 'change'].forEach((evt) => {
      input.addEventListener(evt, () => validateField(input));
    });
  });
}

// ================= Insights: OpenStreetMap + Leaflet choropleth + Charts =================
(function initInsights() {
  const mapEl = document.getElementById('india-map');
  const toggleButtons = document.querySelectorAll('.toggle-btn[data-round]');
  const genderChartRoot = document.getElementById('gender-chart');
  const hasLeaflet = typeof window.L !== 'undefined';
  if (!mapEl || !genderChartRoot) return;

  // Data: offers counts; compute percentages by round totals
  const dataRounds = {
    r1: {
      total: 82077,
      states: {
        'Uttar Pradesh': 8875,
        'Madhya Pradesh': 4917,
        'Andhra Pradesh': 4687,
        'Haryana': 4382,
        'Bihar': 4160,
        'Rajasthan': 3292,
        'Gujarat': 3205,
        'Telangana': 3250,
        'Assam': 2744,
        'Maharashtra': 2657
      }
    },
    r2: {
      total: 72000,
      states: {
        'Andhra Pradesh': 9067,
        'Madhya Pradesh': 7397,
        'Uttar Pradesh': 5992,
        'Rajasthan': 5114,
        'Maharashtra': 4555,
        'Bihar': 4498,
        'Telangana': 3460,
        'Gujarat': 2341,
        'Assam': 1725,
        'Haryana': 1513
      }
    }
  };

  const percentFor = (stateName, roundKey) => {
    const round = dataRounds[roundKey];
    const val = round.states[stateName] || 0;
    return round.total > 0 ? (val / round.total) * 100 : 0;
  };

  // Color scale: light to deep blue by percentage
  const colorForPercent = (p) => {
    const t = Math.min(1, p / 13); // ~top share near 13%
    const l = 90 - (90 - 40) * t; // 90% -> 40% lightness
    return `hsl(211, 100%, ${l}%)`;
  };

  // Map (Leaflet if available, otherwise fallback message)
  let currentRound = 'r1';
  if (hasLeaflet) {
    const map = L.map('india-map', { scrollWheelZoom: true }).setView([22.9734, 78.6569], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    L.control.scale({ metric: true, imperial: false }).addTo(map);

    let stateLayer = null;

    // Loading indicator
    const loading = L.control({ position: 'topright' });
    loading.onAdd = () => {
      const div = L.DomUtil.create('div');
      div.innerHTML = '<div style="background:#fff;border:1px solid #dee2e6;padding:6px 10px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.1);font-weight:600;color:#000080">Loading map…</div>';
      return div;
    };
    loading.addTo(map);

    // Fetch India states GeoJSON (Datameet)
    fetch('https://code.highcharts.com/mapdata/countries/in/in-all.geo.json')
      .then((r) => r.json())
      .then((geo) => {
        const styleFn = (feature) => {
          const nm = feature.properties.st_nm || feature.properties.NAME_1 || feature.properties.name || '';
          const p = percentFor(nm, currentRound);
          const hasData = dataRounds[currentRound].states[nm] != null;
          return { color: '#3572ef', weight: 1, fillColor: hasData ? colorForPercent(p) : '#eee', fillOpacity: hasData ? 0.9 : 0.6 };
        };
        const onEach = (feature, layer) => {
          const nm = feature.properties.st_nm || feature.properties.NAME_1 || feature.properties.name || '';
          const offers = dataRounds[currentRound].states[nm] || 0;
          const p = percentFor(nm, currentRound);
          const content = offers ? `<strong>${nm}</strong><br>${offers.toLocaleString()} offers<br>${p.toFixed(2)}%` : `<strong>${nm}</strong><br>No data`;
          layer.bindTooltip(content, { sticky: true });
          layer.on({ mouseover: (e) => e.target.setStyle({ weight: 2 }), mouseout: (e) => stateLayer.resetStyle(e.target) });
        };

        stateLayer = L.geoJSON(geo, { style: styleFn, onEachFeature: onEach }).addTo(map);
        map.fitBounds(stateLayer.getBounds(), { padding: [20, 20] });
        map.removeControl(loading);

        // Round toggle
        toggleButtons.forEach((btn) => {
          btn.addEventListener('click', () => {
            toggleButtons.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            currentRound = btn.getAttribute('data-round');
            stateLayer.setStyle((f) => styleFn(f));
            stateLayer.eachLayer((layer) => {
              const nm = layer.feature.properties.st_nm || layer.feature.properties.NAME_1 || layer.feature.properties.name || '';
              const offers = dataRounds[currentRound].states[nm] || 0;
              const p = percentFor(nm, currentRound);
              const content = offers ? `<strong>${nm}</strong><br>${offers.toLocaleString()} offers<br>${p.toFixed(2)}%` : `<strong>${nm}</strong><br>No data`;
              layer.setTooltipContent(content);
            });
          });
        });

        // Legend
        const legend = L.control({ position: 'bottomright' });
        legend.onAdd = function () {
          const div = L.DomUtil.create('div', 'leaflet-legend');
          div.innerHTML = `
            <div style="background:#fff;border:1px solid #dee2e6;padding:8px 10px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.1)">
              <div style="font-weight:700;margin-bottom:6px;color:#000080">% of Offers</div>
              <div style="display:flex;align-items:center;gap:8px">
                <span style="font-size:12px;color:#6c757d">Low</span>
                <div style="height:10px;width:120px;border-radius:999px;background:linear-gradient(90deg,#e7f0ff,#007BFF)"></div>
                <span style="font-size:12px;color:#6c757d">High</span>
              </div>
            </div>`;
          return div;
        };
        legend.addTo(map);
      })
      .catch((e) => {
        console.error('Failed to load India states GeoJSON', e);
        const errCtl = L.control({ position: 'topright' });
        errCtl.onAdd = () => {
          const div = L.DomUtil.create('div');
          div.innerHTML = '<div style="background:#fff;border:1px solid #dee2e6;padding:6px 10px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.1);color:#c00">Unable to load state boundaries</div>';
          return div;
        };
        errCtl.addTo(map);
      });
  } else {
    mapEl.innerHTML = '<div style="background:#fff;border:1px solid #dee2e6;padding:12px;border-radius:8px;color:#000080">Map unavailable (Leaflet failed to load). Insights below are still available.</div>';
  }

  // Gender bar chart with axis/grid/legend
  function renderGender() {
    const data = [
      { round: 'Round 1', application: 31, recruitment: 28 },
      { round: 'Round 2', application: 41, recruitment: null }
    ];
    const maxY = 50; // 0-50%
    const ticks = [0,10,20,30,40,50];

    const groupsHtml = data.map((d) => {
      const appBar = `<div class="bar" style="height:${d.application}%" title="Applications: ${d.application}%"><span class="bar-value">${d.application}%</span></div>`;
      const recBar = d.recruitment == null
        ? `<div class="bar na" title="Recruitment: N/A" style="height: 8%"><span class="bar-value">N/A</span></div>`
        : `<div class="bar secondary" style="height:${d.recruitment}%" title="Recruitment: ${d.recruitment}%"><span class="bar-value">${d.recruitment}%</span></div>`;
      return `<div class="bar-group" aria-label="${d.round}">${appBar}${recBar}<div class="bar-label">${d.round}</div></div>`;
    }).join('');

    const axisHtml = ticks.map((t) => `<div class="y-tick" style="bottom:${(t/maxY)*100}%"><span>${t}%</span><div class="grid-line"></div></div>`).join('');
    const legendHtml = `
      <div class="chart-legend">
        <span class="legend-item"><i class="swatch swatch-app"></i> Applications</span>
        <span class="legend-item"><i class="swatch swatch-rec"></i> Recruitment</span>
      </div>`;

    genderChartRoot.innerHTML = `<div class="chart-wrap"><div class="y-axis">${axisHtml}</div><div class="bars">${groupsHtml}</div></div>${legendHtml}`;
  }

  renderGender();
})();
