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

  var header =
    '<header class="topbar"><div class="wrap topbar__inner">'+
      '<a href="index.html" class="brand">'+
        '<img src="assets/logo.jpg" alt="מטוסי נייר" class="brand__logo">'+
        '<span class="brand__name">מטוסי נייר<small>PAPER PLANES</small></span>'+
      '</a>'+
      '<nav class="nav">'+navLinks("")+langBtn+
        '<a href="admin.html" class="nav__admin" title="Admin" aria-label="Admin">'+I.user+'</a>'+
      '</nav>'+
      '<div class="topbar__mobile"><button class="lang-switch" id="ppLangM">'+(T.lang==="he"?"EN":"עב")+'</button>'+
        '<button class="burger" aria-label="menu" id="ppBurger">☰</button></div>'+
    '</div></header>'+
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
})();
