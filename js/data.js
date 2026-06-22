/* ===== Paper Planes / מטוסי נייר — data layer ===== */
(function (global) {
  "use strict";

  var ADMIN_PASSWORD = "Itaipaper1998";

  var SOCIAL = {
    spotify:   "https://open.spotify.com/show/174FVxtm9QQQ88pfivcSxF",
    youtube:   "https://www.youtube.com/@PaperPlanes-podcast",
    instagram: "https://instagram.com/paperplanes_podcast",
    apple:     "https://podcasts.apple.com/il/podcast/id1645611119",
    facebook:  "https://www.facebook.com/groups/284414694287767/",
    email:     "podcast.paperplanes@gmail.com",
    phone:     "+972544209786",
    whatsapp:  "972544209786"
  };

  /* ---- countries ---- */
  var COUNTRIES = [
    { code:"jp", he:"יפן",          en:"Japan",           flag:"🇯🇵", lat:36.2,  lng:138.2, geo:["Japan"] },
    { code:"cn", he:"סין",          en:"China",           flag:"🇨🇳", lat:35.0,  lng:105.0, geo:["China"] },
    { code:"kr", he:"דרום קוריאה", en:"South Korea",     flag:"🇰🇷", lat:36.5,  lng:127.8, geo:["South Korea"] },
    { code:"mn", he:"מונגוליה",     en:"Mongolia",        flag:"🇲🇳", lat:46.8,  lng:103.8, geo:["Mongolia"] },
    { code:"th", he:"תאילנד",       en:"Thailand",        flag:"🇹🇭", lat:15.9,  lng:101.0, geo:["Thailand"] },
    { code:"kh", he:"קמבודיה",      en:"Cambodia",        flag:"🇰🇭", lat:12.5,  lng:104.9, geo:["Cambodia"] },
    { code:"ph", he:"הפיליפינים",   en:"Philippines",     flag:"🇵🇭", lat:12.9,  lng:121.8, geo:["Philippines"] },
    { code:"sg", he:"סינגפור",      en:"Singapore",       flag:"🇸🇬", lat:1.35,  lng:103.8, geo:["Singapore"] },
    { code:"hk", he:"הונג קונג",    en:"Hong Kong",       flag:"🇭🇰", lat:22.3,  lng:114.2, geo:[] },
    { code:"ae", he:"דובאי",        en:"Dubai",           flag:"🇦🇪", lat:25.2,  lng:55.3,  geo:["United Arab Emirates"] },
    { code:"fr", he:"צרפת",         en:"France",          flag:"🇫🇷", lat:46.6,  lng:2.4,   geo:["France"] },
    { code:"gb", he:"אנגליה",       en:"England",         flag:"🇬🇧", lat:52.5,  lng:-1.5,  geo:["United Kingdom"] },
    { code:"es", he:"ספרד",         en:"Spain",           flag:"🇪🇸", lat:40.0,  lng:-3.7,  geo:["Spain"] },
    { code:"it", he:"איטליה",       en:"Italy",           flag:"🇮🇹", lat:42.8,  lng:12.8,  geo:["Italy"] },
    { code:"cy", he:"קפריסין",      en:"Cyprus",          flag:"🇨🇾", lat:35.1,  lng:33.4,  geo:["Cyprus","N. Cyprus"] },
    { code:"no", he:"נורבגיה",      en:"Norway",          flag:"🇳🇴", lat:60.5,  lng:8.5,   geo:["Norway"] },
    { code:"is", he:"איסלנד",       en:"Iceland",         flag:"🇮🇸", lat:64.9,  lng:-19.0, geo:["Iceland"] },
    { code:"au", he:"אוסטרליה",     en:"Australia",       flag:"🇦🇺", lat:-25.0, lng:133.0, geo:["Australia"] },
    { code:"nz", he:"ניו זילנד",    en:"New Zealand",     flag:"🇳🇿", lat:-41.0, lng:174.0, geo:["New Zealand"] },
    { code:"fj", he:"פיג'י",        en:"Fiji",            flag:"🇫🇯", lat:-17.7, lng:178.0, geo:["Fiji"] },
    { code:"ws", he:"סמואה",        en:"Samoa",           flag:"🇼🇸", lat:-13.8, lng:-172.1,geo:["Samoa"] },
    { code:"sb", he:"איי שלמה",     en:"Solomon Islands", flag:"🇸🇧", lat:-9.6,  lng:160.2, geo:["Solomon Is."] },
    { code:"us", he:'ארה"ב',        en:"USA",             flag:"🇺🇸", lat:39.8,  lng:-98.6, geo:["United States of America"] },
    { code:"co", he:"קולומביה",     en:"Colombia",        flag:"🇨🇴", lat:4.6,   lng:-74.3, geo:["Colombia"] },
    { code:"pe", he:"פרו",          en:"Peru",            flag:"🇵🇪", lat:-9.2,  lng:-75.0, geo:["Peru"] },
    { code:"br", he:"ברזיל",        en:"Brazil",          flag:"🇧🇷", lat:-10.0, lng:-52.0, geo:["Brazil"] },
    { code:"ar", he:"ארגנטינה",     en:"Argentina",       flag:"🇦🇷", lat:-38.4, lng:-63.6, geo:["Argentina"] },
    { code:"cr", he:"קוסטה ריקה",   en:"Costa Rica",      flag:"🇨🇷", lat:9.7,   lng:-83.8, geo:["Costa Rica"] },
    { code:"ni", he:"ניקרגואה",     en:"Nicaragua",       flag:"🇳🇮", lat:12.9,  lng:-85.2, geo:["Nicaragua"] },
    { code:"aq", he:"אנטארקטיקה",   en:"Antarctica",      flag:"🇦🇶", lat:-75.0, lng:0.0,   geo:["Antarctica"] }
  ];

  /* ---- seed episodes ---- */
  var SEED_EPISODES = [
    {
      id:"ep-jp-tokyo", country:"jp",
      title:"טוקיו: העיר שלא נרדמת לרגע", title_en:"Tokyo: The City That Never Sleeps",
      cover:"", spotify:"https://open.spotify.com/embed/episode/4rOoJ6Egrf8K2IrywzwOMk",
      date:"2024-11-12", duration:"48 דק׳",
      description:"צוללים אל לב לבה של טוקיו — משוק הדגים בטסוקיג׳י ועד לרחובות הניאון של שינג׳וקו.",
      transcript_he:"", transcript_en:""
    },
    {
      id:"ep-pe-machu", country:"pe",
      title:"מאצ׳ו פיצ׳ו: בעקבות האינקה", title_en:"Machu Picchu: Following the Inca Trail",
      cover:"", spotify:"https://open.spotify.com/embed/episode/4rOoJ6Egrf8K2IrywzwOMk",
      date:"2024-09-03", duration:"52 דק׳",
      description:"ארבעה ימים של הליכה בשביל האינקה, 4,200 מטר מעל פני הים.",
      transcript_he:"", transcript_en:""
    },
    {
      id:"ep-jp-kyoto", country:"jp",
      title:"קיוטו: גשרים, גיישות וגנים זן", title_en:"Kyoto: Bridges, Geisha and Zen Gardens",
      cover:"", spotify:"https://open.spotify.com/embed/episode/4rOoJ6Egrf8K2IrywzwOMk",
      date:"2024-12-01", duration:"44 דק׳",
      description:"מטוקיו הסואנת לקיוטו השלווה — בירת התרבות של יפן.",
      transcript_he:"", transcript_en:""
    }
  ];

  var SEED_DISCOUNTS = [
    { id:"disc-esim",      title:"eSIM גלובלי לכל העולם",  headline:"15% הנחה", vendor:"Airalo",       image:"", desc:"כרטיס SIM דיגיטלי שעובד ב-200 מדינות.", code:"PAPERPLANES", url:"#" },
    { id:"disc-insurance", title:"ביטוח נסיעות למטיילים",  headline:"10% הנחה", vendor:"PassportCard", image:"", desc:"כיסוי רפואי בלי השתתפות עצמית.",         code:"PLANES10",    url:"#" },
    { id:"disc-tours",     title:"סיורים מודרכים בעברית", headline:"10% הנחה", vendor:"GetYourGuide", image:"", desc:"הנחה על אטרקציות וסיורים ברחבי העולם.",  code:"",            url:"#" }
  ];

  var SEED_GUIDES = [
    { id:"guide-jp", title:"מדריך יפן המלא — 3 שבועות",    country:"jp", image:"", price:"₪89", desc:"מסלול יומי מפורט, המלצות אוכל ותקציב.", url:"#" },
    { id:"guide-pe", title:"פרו ושביל האינקה",               country:"pe", image:"", price:"₪69", desc:"איך מתכוננים לגובה ומסלול שבועיים.",     url:"#" },
    { id:"guide-nz", title:"ניו זילנד ברכב — מהצפון לדרום", country:"nz", image:"", price:"₪79", desc:"מסלול רוד-טריפ של 18 יום.",               url:"#" }
  ];

  /* ---------- localStorage keys ---------- */
  var K = { ep:"pp_episodes_v1", disc:"pp_discounts_v2", guide:"pp_guides_v1" };

  function read(key, seed) {
    try {
      var raw = localStorage.getItem(key);
      if (raw === null) { localStorage.setItem(key, JSON.stringify(seed)); return seed.slice(); }
      return JSON.parse(raw);
    } catch (e) { return seed.slice(); }
  }
  function write(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch(e){} }

  var Store = {
    countries: COUNTRIES,
    social:    SOCIAL,

    countryByCode: function (c) {
      for (var i = 0; i < COUNTRIES.length; i++) if (COUNTRIES[i].code === c) return COUNTRIES[i];
      return null;
    },

    episodes:              function ()    { return read(K.ep,   SEED_EPISODES); },
    episodesByCountry:     function (c)   { return this.episodes().filter(function(e){ return e.country===c; }); },
    episodeById:           function (id)  { return this.episodes().filter(function(e){ return e.id===id; })[0]||null; },
    countriesWithEpisodes: function ()    {
      var eps=this.episodes(), set={};
      eps.forEach(function(e){ set[e.country]=(set[e.country]||0)+1; });
      return set;
    },

    addEpisode:    function (ep)  { var a=this.episodes(); a.unshift(ep); write(K.ep,a); },
    updateEpisode: function (ep)  { write(K.ep, this.episodes().map(function(e){ return e.id===ep.id?ep:e; })); },
    deleteEpisode: function (id)  { write(K.ep, this.episodes().filter(function(e){ return e.id!==id; })); },

    discounts:     function ()    { return read(K.disc,  SEED_DISCOUNTS); },
    addDiscount:   function (d)   { var a=this.discounts(); a.unshift(d); write(K.disc,a); },
    deleteDiscount:function (id)  { write(K.disc, this.discounts().filter(function(d){ return d.id!==id; })); },

    guides:        function ()    { return read(K.guide, SEED_GUIDES); },
    addGuide:      function (g)   { var a=this.guides(); a.unshift(g); write(K.guide,a); },
    deleteGuide:   function (id)  { write(K.guide, this.guides().filter(function(g){ return g.id!==id; })); },

    /* export all data as JSON — paste to Claude to publish live */
    exportJSON: function () {
      return JSON.stringify({ episodes:this.episodes(), discounts:this.discounts(), guides:this.guides() }, null, 2);
    },

    /* import a JSON backup (restores data from Claude or a backup file) */
    importJSON: function (str) {
      var d = JSON.parse(str);
      if (d.episodes)  write(K.ep,   d.episodes);
      if (d.discounts) write(K.disc,  d.discounts);
      if (d.guides)    write(K.guide, d.guides);
    },

    resetAll: function () {
      localStorage.removeItem(K.ep);
      localStorage.removeItem(K.disc);
      localStorage.removeItem(K.guide);
    },

    checkPassword: function (p)  { return p === ADMIN_PASSWORD; },
    login:         function ()   { sessionStorage.setItem("pp_admin","1"); },
    logout:        function ()   { sessionStorage.removeItem("pp_admin"); },
    isAdmin:       function ()   { return sessionStorage.getItem("pp_admin")==="1"; },

    uid: function (prefix) { return (prefix||"id")+"-"+Date.now().toString(36)+Math.random().toString(36).slice(2,6); }
  };

  global.PP = Store;
})(window);
