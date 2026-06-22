/* ===== Paper Planes — interactive 3D globe (globe.gl) ===== */
(function () {
  var el = document.getElementById("globe");
  if (!el) return;
  var PP = window.PP;

  function start() {
    if (!window.Globe || !window.topojson) { return setTimeout(start, 120); }

    var counts = PP.countriesWithEpisodes();          // { code: n }
    var visitedCodes = {};
    PP.countries.forEach(function (c) { visitedCodes[c.code] = c; });

    // geo-name -> country code (for polygon highlight + click)
    var geoToCode = {};
    PP.countries.forEach(function (c) {
      (c.geo || []).forEach(function (n) { geoToCode[n] = c.code; });
    });

    var TEAL = "#157A8B", TEALH = "#0E5E6C", LAND = "#E6EFE6", LANDS = "#cfe0d6";

    var world = Globe()(el)
      .backgroundColor("rgba(0,0,0,0)")
      .showGlobe(true)
      .showGraticules(true)
      .showAtmosphere(true)
      .atmosphereColor("#9ED8E6")
      .atmosphereAltitude(0.22)
      .globeImageUrl(null);

    try { world.globeMaterial().color.set("#BFE6EF"); } catch (e) {}

    function isVisited(feat) { return !!geoToCode[feat.properties.name]; }
    function hasEps(feat) { var c = geoToCode[feat.properties.name]; return c && counts[c]; }

    world
      .polygonAltitude(function (f) { return isVisited(f) ? 0.05 : 0.012; })
      .polygonCapColor(function (f) { return isVisited(f) ? TEAL : LAND; })
      .polygonSideColor(function (f) { return isVisited(f) ? "rgba(14,94,108,.55)" : "rgba(150,170,160,.25)"; })
      .polygonStrokeColor(function () { return "#a9c6cf"; })
      .polygonLabel(function (f) {
        var c = geoToCode[f.properties.name];
        if (!c) return "";
        var cc = visitedCodes[c], n = counts[c] || 0;
        return '<div class="globe-tip">'+cc.flag+' <b>'+cc.he+'</b>'+
               (n ? '<span>'+n+' פרקים</span>' : '<span>בקרוב</span>')+'</div>';
      })
      .onPolygonClick(function (f) {
        var c = geoToCode[f.properties.name];
        if (c) location.href = "country.html?c=" + c;
      })
      .onPolygonHover(function (f) {
        el.style.cursor = (f && isVisited(f)) ? "pointer" : "grab";
      });

    // clickable labels for countries that have episodes (native, reliable)
    var pinData = PP.countries.filter(function (c) { return counts[c.code]; });
    world.labelsData(pinData)
      .labelLat(function (d) { return d.lat; })
      .labelLng(function (d) { return d.lng; })
      .labelText(function (d) { return d.en; })
      .labelColor(function () { return "#FFC24B"; })
      .labelDotRadius(0.55)
      .labelSize(1.25)
      .labelAltitude(0.055)
      .labelResolution(2)
      .labelLabel(function (d) {
        return '<div class="globe-tip">'+d.flag+' <b>'+d.he+'</b><span>'+(counts[d.code])+' פרקים</span></div>';
      })
      .onLabelClick(function (d) { location.href = "country.html?c=" + d.code; });

    // load country polygons
    fetch("https://unpkg.com/world-atlas@2.0.2/countries-110m.json")
      .then(function (r) { return r.json(); })
      .then(function (topo) {
        var feats = window.topojson.feature(topo, topo.objects.countries).features;
        world.polygonsData(feats);
      })
      .catch(function () {});

    // view + auto-rotate
    world.pointOfView({ lat: 22, lng: 80, altitude: 2.3 }, 0);
    var ctrl = world.controls();
    ctrl.autoRotate = true;
    ctrl.autoRotateSpeed = 0.55;
    ctrl.enableZoom = true;
    ctrl.minDistance = 180;
    ctrl.maxDistance = 520;
    el.addEventListener("mouseenter", function () { ctrl.autoRotate = false; });
    el.addEventListener("mouseleave", function () { ctrl.autoRotate = true; });

    function size() {
      var w = el.clientWidth, h = el.clientHeight;
      world.width(w).height(h);
    }
    size();
    window.addEventListener("resize", size);
  }
  start();
})();
