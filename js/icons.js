/* ===== Paper Planes — shared SVG icons ===== */
(function (g) {
  g.PPIcons = {
    plane:'<svg viewBox="0 0 24 24" fill="none"><path d="M21.5 3.5L2.5 11.2l6.4 2.3M21.5 3.5l-3 16.5-6.6-6.4M21.5 3.5L8.9 13.5m3.4 6.6v-6.6" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/></svg>',
    planeFill:'<svg viewBox="0 0 24 24"><path d="M2 12.5l8 1.3 1.4 7.2c.1.6.9.7 1.2.2L21.8 3.4c.3-.5-.2-1.1-.8-.9L2.3 11.3c-.6.2-.6 1.1-.3 1.2z" fill="currentColor"/><path d="M10 13.8l11.8-10.4-8 11.3-.4 4.1z" fill="rgba(0,0,0,.12)"/></svg>',
    globe:'<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M3 12h18M12 3c2.6 2.5 4 5.7 4 9s-1.4 6.5-4 9c-2.6-2.5-4-5.7-4-9s1.4-6.5 4-9z" stroke="currentColor" stroke-width="1.6"/></svg>',
    pin:'<svg viewBox="0 0 24 24" fill="none"><path d="M12 22s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" stroke-width="1.6"/></svg>',
    arrow:'<svg viewBox="0 0 24 24" fill="none"><path d="M14 6l-6 6 6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    play:'<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>',
    tag:'<svg viewBox="0 0 24 24" fill="none"><path d="M3 12.5V5a2 2 0 012-2h7.5L21 11.5a2 2 0 010 2.8l-6.7 6.7a2 2 0 01-2.8 0L3 12.5z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="7.5" cy="7.5" r="1.4" fill="currentColor"/></svg>',
    book:'<svg viewBox="0 0 24 24" fill="none"><path d="M12 6.5C10.5 5 8 4.5 4 4.7v13c4-.2 6.5.3 8 1.8 1.5-1.5 4-2 8-1.8v-13C16 4.5 13.5 5 12 6.5zM12 6.5v12.8" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    mail:'<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M4 7l8 6 8-6" stroke="currentColor" stroke-width="1.6"/></svg>',
    user:'<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.5" stroke="currentColor" stroke-width="1.6"/><path d="M5 20c1-3.5 4-5 7-5s6 1.5 7 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    trash:'<svg viewBox="0 0 24 24" fill="none"><path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    plus:'<svg viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    check:'<svg viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    clock:'<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M12 7v5l3 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    spotify:'<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.6 14.4a.62.62 0 01-.86.21c-2.35-1.44-5.3-1.76-8.79-.96a.62.62 0 11-.28-1.21c3.82-.87 7.1-.5 9.72 1.1.3.18.39.57.21.86zm1.23-2.74a.78.78 0 01-1.07.26c-2.69-1.65-6.79-2.13-9.97-1.17a.78.78 0 11-.45-1.49c3.64-1.1 8.16-.56 11.24 1.33.37.22.49.7.25 1.07zm.1-2.85C14.82 8.95 9.4 8.77 6.3 9.71a.93.93 0 11-.54-1.78c3.56-1.08 9.55-.87 13.32 1.37a.93.93 0 11-.95 1.6z"/></svg>',
    youtube:'<svg viewBox="0 0 24 24"><path fill="currentColor" d="M23 7.5a3 3 0 00-2.1-2.1C19 4.9 12 4.9 12 4.9s-7 0-8.9.5A3 3 0 001 7.5C.5 9.4.5 12 .5 12s0 2.6.5 4.5A3 3 0 003.1 18.6c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 002.1-2.1c.5-1.9.5-4.5.5-4.5s0-2.6-.5-4.5zM9.8 15.3V8.7l5.7 3.3-5.7 3.3z"/></svg>',
    apple:'<svg viewBox="0 0 24 24"><path fill="currentColor" d="M17 1.5c.1 1.1-.3 2.2-1 3-.7.9-1.9 1.5-3 1.4-.1-1.1.4-2.2 1-3 .8-.9 2-1.5 3-1.4zM20.5 17c-.5 1.2-.8 1.7-1.5 2.8-1 1.5-2.3 3.3-4 3.3-1.5 0-1.9-1-4-1-2 0-2.5 1-4 1-1.6 0-2.9-1.6-3.9-3.1C1.3 16.2.6 11.4 2.4 8.5c1-1.5 2.6-2.4 4.1-2.4 1.6 0 2.6 1 4 1 1.3 0 2.1-1 4-1 1.4 0 2.8.7 3.9 2-3.4 1.9-2.8 6.7.6 8.9z"/></svg>',
    instagram:'<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8"/><circle cx="17.3" cy="6.7" r="1.2" fill="currentColor"/></svg>',
    facebook:'<svg viewBox="0 0 24 24"><path fill="currentColor" d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.5 2.9h-2.3v7A10 10 0 0022 12z"/></svg>',
    phone:'<svg viewBox="0 0 24 24" fill="none"><path d="M5 4h3l1.6 4-2 1.5a12 12 0 005.4 5.4l1.5-2 4 1.6V19a2 2 0 01-2.2 2A16 16 0 014 6.2 2 2 0 016 4z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    whatsapp:'<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1012 2zm0 1.8a8.2 8.2 0 016.9 12.6l.1.2-.8 2.8-2.9-.8-.2.1A8.2 8.2 0 1112 3.8zm-3 4c-.2 0-.5 0-.7.4-.3.4-1 1-1 2.4s1 2.8 1.2 3 2 3.1 4.9 4.3c2.4 1 2.9.8 3.4.8s1.7-.7 1.9-1.4c.2-.6.2-1.2.2-1.3l-.7-.4c-.4-.2-1.7-.9-2-1s-.5-.1-.7.2-.8 1-1 1.2-.4.2-.7 0-1.3-.5-2.5-1.6c-.9-.8-1.5-1.8-1.7-2.1s0-.5.1-.7l.5-.6.3-.5v-.5c0-.1-.7-1.7-.9-2.3s-.5-.5-.7-.5z"/></svg>',
    cloud:'<svg viewBox="0 0 140 70"><path fill="#fff" d="M38 64c-13 0-24-10-24-23 0-12 9-22 21-23 3-10 13-18 24-18 13 0 24 9 26 22 10 1 17 9 17 19 0 12-9 21-21 22H38z"/></svg>'
  };

  // fill decorative cloud layers: <div class="clouds" data-clouds></div>
  function cloudSpans(){
    var c = g.PPIcons.cloud;
    return '<span class="cloud-svg c-a" style="inset-inline-start:3%">'+c+'</span>'+
           '<span class="cloud-svg c-d" style="inset-inline-end:16%">'+c+'</span>'+
           '<span class="cloud-svg c-b" style="inset-inline-end:5%">'+c+'</span>'+
           '<span class="cloud-svg c-c" style="inset-inline-start:34%">'+c+'</span>';
  }
  function fillClouds(){
    [].forEach.call(document.querySelectorAll("[data-clouds]"),function(el){
      el.classList.add("clouds"); el.innerHTML = cloudSpans();
    });
  }
  if (document.readyState!=="loading") fillClouds(); else document.addEventListener("DOMContentLoaded", fillClouds);
})(window);
