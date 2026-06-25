/* ===== Paper Planes — shared header + footer (i18n) ===== */
(function () {
  /* ---- Google Analytics 4 ---- */
  var GA_ID = "G-CBYGT3Q5G6";
  (function(){
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
  })();
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_ID);

  /* ---- Click tracking ---- */
  document.addEventListener("click", function(ev){
    var el = ev.target.closest("a[href], button");
    if (!el) return;
    var href = el.getAttribute("href") || "";

    // Episode card or episode page link
    if (href.indexOf("episode.html") !== -1) {
      var id = (href.match(/id=([^&]+)/) || [])[1] || "";
      var title = (el.querySelector(".card__title") || el.querySelector("h3") || {}).textContent || id;
      gtag("event", "episode_click", { episode_id: id, episode_title: title.trim() });

    // Discount "redeem" button
    } else if (el.closest(".disc") && el.classList.contains("btn")) {
      var vendor = ((el.closest(".disc")||{}).querySelector(".disc__vendor")||{}).textContent || "";
      gtag("event", "discount_click", { vendor: vendor.trim() });

    // Copy coupon code button
    } else if (el.classList.contains("copy-btn")) {
      var code = el.getAttribute("data-code") || "";
      gtag("event", "coupon_copy", { code: code });

    // Guide buy button
    } else if (el.closest(".guide") && el.classList.contains("btn")) {
      var gtitle = ((el.closest(".guide")||{}).querySelector(".guide__title")||{}).textContent || "";
      gtag("event", "guide_click", { guide_title: gtitle.trim() });

    // Quiz banner
    } else if (href.indexOf("formaloo") !== -1) {
      gtag("event", "quiz_click");

    // Listen platform links (Spotify, Apple, YouTube, etc.)
    } else if (el.closest(".listen") || el.closest(".aside-listen")) {
      var platform = (el.querySelector(".listen__t") || el.querySelector("span:last-child") || {}).textContent
        || href.replace(/https?:\/\/(www\.)?/,"").split("/")[0];
      gtag("event", "platform_click", { platform: platform.trim() });
    }
  });


  var I = window.PPIcons || {};
  var S = window.PP || {};
  var page = document.body.getAttribute("data-page") || "";

  var NAV = [
    { key:"home",      href:"index.html",      label:T.t("nav_home") },
    { key:"where",     href:"index.html#globe-section", label:T.t("nav_where") },
    { key:"discounts", href:"discounts.html",  label:T.t("nav_discounts") },
    { key:"guides",    href:"guides.html",     label:T.t("nav_guides") },
    { key:"about",     href:"about.html",      label:T.t("nav_about") },
    { key:"contact",   href:"contact.html",    label:T.t("nav_contact") }
  ];

  function navLinks(cls) {
    return NAV.map(function (n) {
      var active = (n.key === page) ? " is-active" : "";
      return '<a href="'+n.href+'" class="'+(cls||"")+active+'">'+n.label+'</a>';
    }).join("");
  }

  var langBtn = '<button class="lang-switch" id="ppLang" aria-label="Language">'+(T.lang==="he"?"EN":"עב")+'</button>';

  var searchBtn = '<button class="nav__search" id="ppSearchBtn" aria-label="חיפוש">'+
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>'+
    '</button>';

  var header =
    '<header class="topbar"><div class="wrap topbar__inner">'+
      '<a href="index.html" class="brand">'+
        '<img src="assets/logo.jpg" alt="מטוסי נייר" class="brand__logo">'+
        '<span class="brand__name">מטוסי נייר<small>PAPER PLANES</small></span>'+
      '</a>'+
      '<nav class="nav">'+navLinks("")+searchBtn+langBtn+
        '<a href="admin.html" class="nav__admin" title="Admin" aria-label="Admin">'+I.user+'</a>'+
      '</nav>'+
      '<div class="topbar__mobile"><button class="nav__search" id="ppSearchBtnM" aria-label="חיפוש">'+
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>'+
      '</button><button class="lang-switch" id="ppLangM">'+(T.lang==="he"?"EN":"עב")+'</button>'+
        '<button class="burger" aria-label="menu" id="ppBurger">☰</button></div>'+
    '</div></header>'+
    '<div id="ppSearchOverlay" style="display:none;position:fixed;inset:0;z-index:999;background:rgba(0,0,0,.45)" role="dialog" aria-modal="true">'+
      '<div style="background:#fff;max-width:560px;margin:70px auto 0;border-radius:16px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,.22)">'+
        '<div style="display:flex;align-items:center;gap:10px;padding:14px 18px;border-bottom:1px solid #e5eef0">'+
          '<svg viewBox="0 0 24 24" fill="none" stroke="#157A8B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20" style="flex-shrink:0"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>'+
          '<input id="ppSearchInput" type="search" placeholder="חיפוש פרק..." autocomplete="off" style="flex:1;border:none;outline:none;font-size:17px;font-family:inherit;color:#0a3f49;background:transparent">'+
          '<button id="ppSearchClose" style="background:none;border:none;font-size:22px;cursor:pointer;color:#666;padding:0 4px" aria-label="סגור">✕</button>'+
        '</div>'+
        '<div id="ppSearchResults" style="max-height:400px;overflow-y:auto"></div>'+
      '</div>'+
    '</div>'+
    '<div class="mnav" id="ppMnav">'+navLinks("")+
      '<a href="admin.html">'+T.t("nav_admin")+'</a>'+
    '</div>';

  var footer =
    '<footer class="footer"><div class="wrap">'+
      '<div class="footer__top">'+
        '<div class="footer__brand">'+
          '<a href="index.html" class="brand">'+
            '<img src="assets/logo.jpg" alt="מטוסי נייר" class="brand__logo">'+
            '<span class="brand__name" style="color:#fff">מטוסי נייר<small>PAPER PLANES</small></span>'+
          '</a>'+
          '<p>'+T.t("foot_tag")+'</p>'+
          '<div class="footer__social">'+
            '<a href="'+S.social.spotify+'" target="_blank" rel="noopener" aria-label="Spotify">'+I.spotify+'</a>'+
            '<a href="'+S.social.youtube+'" target="_blank" rel="noopener" aria-label="YouTube">'+I.youtube+'</a>'+
            '<a href="'+S.social.instagram+'" target="_blank" rel="noopener" aria-label="Instagram">'+I.instagram+'</a>'+
            '<a href="'+S.social.apple+'" target="_blank" rel="noopener" aria-label="Apple Podcasts">'+I.apple+'</a>'+
            '<a href="'+S.social.facebook+'" target="_blank" rel="noopener" aria-label="Facebook">'+I.facebook+'</a>'+
          '</div>'+
        '</div>'+
        '<div><h4>'+T.t("foot_nav")+'</h4><div class="footer__links">'+
          '<a href="index.html">'+T.t("nav_home")+'</a><a href="index.html#globe-section">'+T.t("nav_where")+'</a>'+
          '<a href="discounts.html">'+T.t("nav_discounts")+'</a><a href="guides.html">'+T.t("nav_guides")+'</a>'+
        '</div></div>'+
        '<div><h4>'+T.t("foot_more")+'</h4><div class="footer__links">'+
          '<a href="about.html">'+T.t("nav_about")+'</a><a href="contact.html">'+T.t("nav_contact")+'</a>'+
          '<a href="admin.html">'+T.t("foot_admin")+'</a>'+
        '</div></div>'+
      '</div>'+
      '<div class="footer__bottom"><span>© '+new Date().getFullYear()+' מטוסי נייר · '+T.t("foot_rights")+'</span>'+
        '<span>'+T.t("foot_love")+'</span></div>'+
    '</div></footer>';

  var hMount = document.getElementById("site-header");
  var fMount = document.getElementById("site-footer");
  if (hMount) hMount.innerHTML = header; else document.body.insertAdjacentHTML("afterbegin", header);
  if (fMount) fMount.innerHTML = footer; else document.body.insertAdjacentHTML("beforeend", footer);

  var burger = document.getElementById("ppBurger");
  var mnav = document.getElementById("ppMnav");
  if (burger && mnav) burger.addEventListener("click", function () { mnav.classList.toggle("open"); });

  function switchLang(){ T.set(T.other); }
  var lb = document.getElementById("ppLang"); if (lb) lb.addEventListener("click", switchLang);
  var lbm = document.getElementById("ppLangM"); if (lbm) lbm.addEventListener("click", switchLang);

  // Search overlay
  var overlay = document.getElementById("ppSearchOverlay");
  var searchInput = document.getElementById("ppSearchInput");
  var searchResults = document.getElementById("ppSearchResults");

  function openSearch(){
    overlay.style.display = "block";
    setTimeout(function(){ searchInput.focus(); }, 50);
  }
  function closeSearch(){
    overlay.style.display = "none";
    searchInput.value = "";
    searchResults.innerHTML = "";
  }

  var sb = document.getElementById("ppSearchBtn"); if (sb) sb.addEventListener("click", openSearch);
  var sbm = document.getElementById("ppSearchBtnM"); if (sbm) sbm.addEventListener("click", openSearch);
  var sc = document.getElementById("ppSearchClose"); if (sc) sc.addEventListener("click", closeSearch);
  overlay.addEventListener("click", function(ev){ if (ev.target === overlay) closeSearch(); });
  document.addEventListener("keydown", function(ev){ if (ev.key === "Escape") closeSearch(); });

  var searchTimer2;
  searchInput.addEventListener("input", function(){
    clearTimeout(searchTimer2);
    var q = searchInput.value.trim().toLowerCase();
    if (!q) { searchResults.innerHTML = ""; return; }
    searchTimer2 = setTimeout(function(){
      var PP2 = window.PP;
      if (!PP2) return;
      var allEps = PP2.episodes();
      var matches = allEps.filter(function(e){
        var ttl = (e.title || "").toLowerCase();
        var ctry = PP2.countryByCode(e.country);
        var cname = ctry ? (ctry.he+" "+ctry.en).toLowerCase() : "";
        return ttl.indexOf(q)!==-1 || cname.indexOf(q)!==-1;
      }).slice(0, 8);
      if (!matches.length) {
        searchResults.innerHTML = '<p style="padding:18px 20px;color:#888;font-size:15px">לא נמצאו פרקים.</p>';
        return;
      }
      searchResults.innerHTML = matches.map(function(e){
        var cover = e.cover || "assets/logo.jpg";
        var ttl = (T.lang==="en" && e.title_en) ? e.title_en : e.title;
        var ctry = PP2.countryByCode(e.country);
        var tag = ctry ? (ctry.flag+" "+(T.lang==="he"?ctry.he:ctry.en)) : "🎙️ כללי";
        return '<a href="episode.html?id='+e.id+'" style="display:flex;align-items:center;gap:14px;padding:12px 18px;text-decoration:none;border-bottom:1px solid #eef3f5;transition:.12s" '+
          'onmouseover="this.style.background=\'#f0f8fa\'" onmouseout="this.style.background=\'\'">'+
          '<img src="'+cover+'" alt="" style="width:52px;height:52px;object-fit:cover;border-radius:10px;flex-shrink:0">'+
          '<span style="flex:1;min-width:0">'+
            '<span style="display:block;font-weight:600;font-size:15px;color:#0a3f49;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+ttl+'</span>'+
            '<span style="font-size:13px;color:#6b8c95">'+tag+'</span>'+
          '</span></a>';
      }).join("");
    }, 200);
  });
})();
