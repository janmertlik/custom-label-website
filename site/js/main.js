/* Custom Label by VOLTFUSE · site scripts */
(function () {
  'use strict';

  /* ---------- Active nav link ---------- */
  var page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach(function (a) {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.querySelector('.menu-btn');
  var nav = document.querySelector('.site-nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting || en.boundingClientRect.top < 0) {
          en.target.classList.add('in');
          ro.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    reveals.forEach(function (el) { ro.observe(el); });
    /* safety net: anything the observer misses (fast jumps, anchor loads) */
    window.addEventListener('scroll', function () {
      reveals.forEach(function (el) {
        if (!el.classList.contains('in') && el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add('in');
          ro.unobserve(el);
        }
      });
    }, { passive: true });
    /* timed failsafe for environments where observer callbacks stall */
    var failsafe = setInterval(function () {
      var pending = false;
      reveals.forEach(function (el) {
        if (!el.classList.contains('in')) {
          if (el.getBoundingClientRect().top < window.innerHeight + 40) el.classList.add('in');
          else pending = true;
        }
      });
      if (!pending) clearInterval(failsafe);
    }, 1200);
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Count-up stats ---------- */
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var runCounter = function (el) {
      if (el.dataset.done) return;
      el.dataset.done = '1';
      var target = parseFloat(el.dataset.count);
      var decimals = (el.dataset.count.split('.')[1] || '').length;
      if (reduce) { el.textContent = el.dataset.count; return; }
      var start = null, dur = 1200;
      function tick(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(decimals);
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    };
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting || en.boundingClientRect.top < 0) {
          co.unobserve(en.target);
          runCounter(en.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { el.textContent = '0'; co.observe(el); });
    window.addEventListener('scroll', function () {
      counters.forEach(function (el) {
        if (!el.dataset.done && el.getBoundingClientRect().top < window.innerHeight) runCounter(el);
      });
    }, { passive: true });
  }

  /* ---------- Stacked photo cards (hero alt 06) ---------- */
  var stacks = document.querySelectorAll('.card-stack');
  if (stacks.length) {
    var playStack = function (el) { el.classList.add('play'); };
    if ('IntersectionObserver' in window) {
      var so = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting || en.boundingClientRect.top < 0) {
            so.unobserve(en.target);
            playStack(en.target);
          }
        });
      }, { threshold: 0.35 });
      stacks.forEach(function (el) { so.observe(el); });
    }
    /* failsafe: play once shortly after load even if the observer stalls */
    setTimeout(function () { stacks.forEach(playStack); }, 3500);
  }

  /* ---------- Tabs ---------- */
  document.querySelectorAll('[data-tabs]').forEach(function (t) {
    t.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () {
        t.querySelectorAll('button').forEach(function (x) { x.classList.remove('active'); });
        b.classList.add('active');
        var scope = t.dataset.tabs ? document.getElementById(t.dataset.tabs) : document;
        (scope || document).querySelectorAll('.tabpane').forEach(function (p) { p.classList.remove('active'); });
        var pane = document.getElementById(b.dataset.tab);
        if (pane) pane.classList.add('active');
      });
    });
  });

  /* ---------- Accordion ---------- */
  document.querySelectorAll('[data-acc] .item').forEach(function (it) {
    var q = it.querySelector('.q'), a = it.querySelector('.a');
    if (it.classList.contains('open')) a.style.maxHeight = a.scrollHeight + 'px';
    q.addEventListener('click', function () {
      var open = it.classList.contains('open');
      it.parentElement.querySelectorAll('.item').forEach(function (x) {
        x.classList.remove('open');
        x.querySelector('.a').style.maxHeight = null;
      });
      if (!open) { it.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });

  /* ---------- Gallery filters ---------- */
  var filterRow = document.querySelector('[data-filters]');
  if (filterRow) {
    var tiles = document.querySelectorAll('.gallery .tile');
    filterRow.querySelectorAll('.filter-chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        filterRow.querySelectorAll('.filter-chip').forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        var f = chip.dataset.filter;
        tiles.forEach(function (tile) {
          var cats = (tile.dataset.cat || '').split(' ');
          tile.classList.toggle('hide', f !== 'all' && cats.indexOf(f) === -1);
        });
      });
    });
  }

  /* ---------- Toast ---------- */
  var toastEl = null, toastTimer = null;
  window.clToast = function (msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.setAttribute('role', 'status');
      document.body.appendChild(toastEl);
    }
    toastEl.innerHTML = '<span style="color:var(--signal)">&#10003;</span> ' + msg;
    requestAnimationFrame(function () { toastEl.classList.add('show'); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 3800);
  };

  /* ---------- Demo forms (contact / newsletter) ---------- */
  document.querySelectorAll('form[data-demo]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      window.clToast(f.dataset.demo);
      f.reset();
    });
  });

  /* ============================================================
     THE BUILDER
     ============================================================ */
  var builder = document.getElementById('builder');
  if (!builder) return;

  var PRICING = {
    cap:      { label: 'Cap',      tiers: [[1000, 12.40], [500, 14.40], [200, 15.60], [0, 16.00]] },
    beanie:   { label: 'Beanie',   tiers: [[1000, 9.40],  [500, 11.40], [200, 12.60], [0, 13.00]] },
    facewear: { label: 'Facewear', tiers: [[1000, 8.40],  [500, 10.40], [200, 11.60], [0, 12.00]] }
  };

  var FABRICS = ['Charcoal', 'Black', 'Olive', 'Sand', 'Slate', 'Rust'];
  var MIN_TOTAL = 100, MIN_COLOUR = 50, MAX_COLOURWAYS = 4;

  var state = {
    style: '5-Panel', cat: 'cap',
    fabricName: 'Charcoal',
    embellishment: 'Woven patch',
    closure: 'Snapback',
    colorways: [
      { name: 'Charcoal', hex: '#3b3a37', qty: 50 },
      { name: 'Sand', hex: '#b8a888', qty: 50 }
    ]
  };

  var SWATCH_HEX = { Charcoal: '#3b3a37', Black: '#0c0c0c', Olive: '#6f6a5e', Sand: '#b8a888', Slate: '#3c4b55', Rust: '#7a3b2e' };

  /* style selection */
  builder.querySelectorAll('.opt').forEach(function (o) {
    o.addEventListener('click', function () {
      builder.querySelectorAll('.opt').forEach(function (x) { x.classList.remove('sel'); });
      o.classList.add('sel');
      state.style = o.dataset.style;
      state.cat = o.dataset.cat;
      var img = builder.querySelector('.stage-img img');
      img.src = o.querySelector('img').src;
      img.alt = o.dataset.style + ' preview';
      render();
    });
  });

  /* fabric colour swatches (sets the preview colour name) */
  builder.querySelectorAll('.fab').forEach(function (f) {
    f.addEventListener('click', function () {
      builder.querySelectorAll('.fab').forEach(function (x) { x.classList.remove('sel'); });
      f.classList.add('sel');
      state.fabricName = f.title;
      render();
    });
  });

  /* segmented controls */
  builder.querySelectorAll('.seg').forEach(function (s) {
    s.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () {
        s.querySelectorAll('button').forEach(function (x) { x.classList.remove('active'); });
        b.classList.add('active');
        if (s.dataset.seg === 'emb') state.embellishment = b.textContent.trim();
        if (s.dataset.seg === 'closure') state.closure = b.textContent.trim();
        render();
      });
    });
  });

  /* colorway module */
  var cwList = document.getElementById('cwList');
  var cwAdd = document.getElementById('cwAdd');

  function renderColorways() {
    cwList.innerHTML = '';
    state.colorways.forEach(function (cw, i) {
      var row = document.createElement('div');
      row.className = 'cw-row';
      var low = cw.qty > 0 && cw.qty < MIN_COLOUR;
      row.innerHTML =
        '<span class="cw-swatch" style="background:' + cw.hex + '"></span>' +
        '<span class="cw-name">' + cw.name +
          '<br><span class="cw-sub' + (low ? ' low' : '') + '">' +
          (low ? 'Min ' + MIN_COLOUR + ' per colour' : 'Colourway ' + (i + 1)) + '</span></span>' +
        '<span class="qty">' +
          '<button type="button" data-i="' + i + '" data-d="-1" aria-label="Decrease quantity">&minus;</button>' +
          '<input type="number" min="0" step="10" value="' + cw.qty + '" data-i="' + i + '" aria-label="' + cw.name + ' quantity">' +
          '<button type="button" data-i="' + i + '" data-d="1" aria-label="Increase quantity">+</button>' +
        '</span>' +
        (state.colorways.length > 1
          ? '<button type="button" class="cw-remove" data-i="' + i + '" aria-label="Remove ' + cw.name + '">&times;</button>'
          : '<span></span>');
      cwList.appendChild(row);
    });

    cwList.querySelectorAll('.qty button').forEach(function (b) {
      b.addEventListener('click', function () {
        var cw = state.colorways[+b.dataset.i];
        cw.qty = Math.max(0, cw.qty + (+b.dataset.d) * 10);
        renderColorways(); render();
      });
    });
    cwList.querySelectorAll('.qty input').forEach(function (inp) {
      inp.addEventListener('change', function () {
        state.colorways[+inp.dataset.i].qty = Math.max(0, parseInt(inp.value, 10) || 0);
        renderColorways(); render();
      });
    });
    cwList.querySelectorAll('.cw-remove').forEach(function (b) {
      b.addEventListener('click', function () {
        state.colorways.splice(+b.dataset.i, 1);
        renderColorways(); render();
      });
    });

    cwAdd.disabled = state.colorways.length >= MAX_COLOURWAYS;
  }

  cwAdd.addEventListener('click', function () {
    if (state.colorways.length >= MAX_COLOURWAYS) return;
    var used = state.colorways.map(function (c) { return c.name; });
    var next = FABRICS.filter(function (f) { return used.indexOf(f) === -1; })[0] || 'Custom';
    state.colorways.push({ name: next, hex: SWATCH_HEX[next] || '#6f6a64', qty: 50 });
    renderColorways(); render();
  });

  function total() {
    return state.colorways.reduce(function (s, c) { return s + c.qty; }, 0);
  }
  function unitPrice() {
    var t = total(), tiers = PRICING[state.cat].tiers;
    for (var i = 0; i < tiers.length; i++) if (t >= tiers[i][0]) return tiers[i][1];
    return tiers[tiers.length - 1][1];
  }

  function render() {
    var t = total();
    var met = t >= MIN_TOTAL;

    /* MOQ bar */
    var bar = document.getElementById('moqBar');
    bar.style.width = Math.min(100, (t / MIN_TOTAL) * 100) + '%';
    bar.classList.toggle('met', met);
    document.getElementById('moqCount').innerHTML =
      t + ' <span class="of">/ ' + MIN_TOTAL + ' unit minimum</span>';

    var msg = document.getElementById('moqMsg');
    if (met) {
      msg.className = 'alert ok';
      msg.innerHTML = '<span class="ai">&#10003;</span><div><b>Minimum met.</b> ' + t + ' units across ' +
        state.colorways.length + ' colourway' + (state.colorways.length > 1 ? 's' : '') + '. You are good to go.</div>';
    } else {
      msg.className = 'alert warn';
      msg.innerHTML = '<span class="ai">&#9888;</span><div><b>Almost there.</b> Add ' + (MIN_TOTAL - t) +
        ' more units to hit the ' + MIN_TOTAL + ' unit minimum for this style.</div>';
    }

    /* summary */
    document.getElementById('sumStyle').textContent = state.style;
    document.getElementById('sumFabric').textContent = state.fabricName;
    document.getElementById('sumClosure').textContent = state.closure;
    document.getElementById('sumEmb').textContent = state.embellishment;
    document.getElementById('sumColours').textContent =
      state.colorways.map(function (c) { return c.name; }).join(', ');
    document.getElementById('sumQty').textContent = t + ' units';
    var p = unitPrice();
    document.getElementById('sumPrice').textContent = '$' + p.toFixed(2);
    document.getElementById('sumEst').textContent =
      t > 0 ? '≈ $' + (p * t).toLocaleString('en-CA', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' total' : '';

    var btn = document.getElementById('requestProof');
    btn.disabled = !met;
    document.getElementById('proofHint').textContent = met
      ? 'Free design proof in 24 hours. No commitment.'
      : 'Reach the 100 unit minimum to request your free proof.';
  }

  document.getElementById('requestProof').addEventListener('click', function () {
    window.clToast('Request received. Your free proof is on the way within 24 hours.');
  });

  renderColorways();
  render();
})();
