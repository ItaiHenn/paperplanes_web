/* ===== Paper Planes — bilingual (HE/EN) i18n ===== */
(function (g) {
  var LANG = (function () { try { return localStorage.getItem("pp_lang") || "he"; } catch (e) { return "he"; } })();
  try {
    document.documentElement.setAttribute("lang", LANG);
    document.documentElement.setAttribute("dir", LANG === "he" ? "rtl" : "ltr");
  } catch (e) {}

  var D = {
    /* nav + footer */
    nav_home:{he:"בית",en:"Home"},
    nav_where:{he:"איפה היינו?",en:"Where we've been"},
    nav_discounts:{he:"הטבות",en:"Discounts"},
    nav_guides:{he:"מדריכים",en:"Guides"},
    nav_about:{he:"על הפודקאסט",en:"About"},
    nav_contact:{he:"צרו קשר",en:"Contact"},
    nav_admin:{he:"ניהול 🔒",en:"Admin 🔒"},
    foot_tag:{he:"פודקאסט על טיולים, הרפתקאות, סיפורים ומקומות מסביב לעולם. עם איתי חן.",en:"A podcast about travel, adventures, stories and places around the world. With Itay Chen."},
    foot_nav:{he:"ניווט",en:"Navigate"},
    foot_more:{he:"עוד",en:"More"},
    foot_admin:{he:"ניהול אתר",en:"Site admin"},
    foot_rights:{he:"כל הזכויות שמורות",en:"All rights reserved"},
    foot_love:{he:"נבנה באהבה לכל מטייל ✈︎",en:"Made with love for every traveler ✈︎"},

    /* home */
    hero_eyebrow:{he:"טיולים · הרפתקאות · סיפורים · מקומות",en:"Travel · Adventures · Stories · Places"},
    hero_h1:{he:"העולם הוא<br><span class='accent'>סיפור אחד גדול.</span>",en:"The world is<br><span class='accent'>one big story.</span>"},
    hero_tag:{he:"פודקאסט על <b>טיולים, הרפתקאות, סיפורים ומקומות</b> מכל קצוות העולם<br>בהגשת איתי חן",en:"A podcast about <b>travel, adventures, stories and places</b> from every corner of the world. With Itay Chen — coming along?"},
    hero_cta_globe:{he:"למפה האינטראקטיבי",en:"Explore the globe"},
    hero_cta_listen:{he:"איפה להאזין",en:"Where to listen"},
    stat_countries:{he:"מדינות",en:"Countries"},
    stat_episodes:{he:"פרקים",en:"Episodes"},
    stat_continents:{he:"יבשות",en:"Continents"},
    globe_eyebrow:{he:"המסע שלנו",en:"Our journey"},
    globe_title:{he:"איפה כבר היינו?",en:"Where have we been?"},
    globe_lead:{he:"סובבו את הגלובוס, לחצו על מדינה — ותגיעו לכל הפרקים שהקלטנו שם.",en:"Spin the globe, click a country — and reach every episode we recorded there."},
    globe_hint:{he:"טיפ: גררו לסובב, גלגלת לזום, ולחצו על מדינה מודגשת.",en:"Tip: drag to rotate, scroll to zoom, click a highlighted country."},
    listen_eyebrow:{he:"האזנה",en:"Listen"},
    listen_title:{he:"איפה להאזין",en:"Where to listen"},
    listen_lead:{he:"זמינים בכל מקום שנוח לכם. עקבו כדי לא לפספס אף פרק חדש.",en:"Available everywhere you like. Follow so you never miss an episode."},
    eplist_eyebrow:{he:"הכי חדש",en:"Latest"},
    eplist_title:{he:"פרקים אחרונים",en:"Latest episodes"},
    cta_title:{he:"יש לכם סיפור או יעד שכדאי שנכסה?",en:"Got a story or a destination we should cover?"},
    cta_p:{he:"אנחנו תמיד מחפשים את ההרפתקה הבאה. כתבו לנו — אולי הפרק הבא הוא שלכם.",en:"We're always chasing the next adventure. Write to us — maybe the next episode is yours."},
    cta_btn:{he:"צרו קשר",en:"Get in touch"},
    listen_chip:{he:"להאזנה",en:"Listen"},
    soon:{he:"בקרוב",en:"Soon"},
    eps_word:{he:"פרקים",en:"episodes"},
    s_spotify:{he:"להאזנה",en:"Full episodes"},
    s_youtube:{he:"גם בוידאו",en:"Also on video"},
    s_apple:{he:"להאזנה",en:"For iPhone"},
    s_instagram:{he:"מאחורי הקלעים",en:"Behind the scenes"},
    s_facebook:{he:"הצטרפו לשיחה",en:"Join the conversation"},
    t_facebook:{he:"קהילת הפייסבוק",en:"Facebook group"},

    /* country */
    crumb_home:{he:"בית",en:"Home"},
    crumb_where:{he:"איפה היינו",en:"Where we've been"},
    country_empty_title:{he:"הפרקים בדרך ✈︎",en:"Episodes on the way ✈︎"},
    country_empty_btn:{he:"עקבו בספוטיפיי",en:"Follow on Spotify"},
    country_nf_title:{he:"אופס, לא מצאנו את היעד",en:"Oops, destination not found"},
    country_nf_p:{he:"חזרו לגלובוס ובחרו מדינה.",en:"Back to the globe to pick a country."},
    to_globe:{he:"לגלובוס",en:"To the globe"},

    /* episode */
    ep_about:{he:"על הפרק",en:"About this episode"},
    ep_transcript:{he:"תמלול הפרק",en:"Episode transcript"},
    ep_seo:{he:"התמלול המלא — לחיפוש והנגשה",en:"Full transcript — for search & accessibility"},
    ep_tab_he:{he:"עברית",en:"Hebrew"},
    ep_aside:{he:"האזינו לפרק",en:"Listen to the episode"},
    ep_nf:{he:"הפרק לא נמצא",en:"Episode not found"},
    ep_nf_p:{he:"אולי הקישור השתנה. חזרו לעמוד הבית.",en:"The link may have changed. Back to home."},
    to_home:{he:"לעמוד הבית",en:"Back home"},
    player_soon:{he:"נגן ספוטיפיי יתווסף בקרוב.",en:"Spotify player coming soon."},
    transcript_en_soon:{he:"Full English transcript coming soon.",en:"Full English transcript coming soon."},

    /* discounts */
    disc_eyebrow:{he:"חוסכים בדרך",en:"Save on the road"},
    disc_title:{he:"הטבות למטיילים",en:"Traveler perks"},
    disc_p:{he:"אספנו לכם את הכלים שאנחנו עצמנו משתמשים בהם בכל טיול — עם הנחות בלעדיות למאזינים.",en:"We've gathered the tools we use on every trip — with exclusive listener discounts."},
    disc_redeem:{he:"למימוש ההטבה",en:"Redeem offer"},
    disc_copy:{he:"העתקת הקוד",en:"Copy code"},
    disc_copy_label:{he:"קוד קופון",en:"Coupon"},
    disc_copied:{he:"הקוד הועתק! ✓",en:"Code copied! ✓"},
    disc_empty:{he:"אין הטבות כרגע. חזרו בקרוב!",en:"No offers right now. Check back soon!"},
    admin_disc:{he:"מצב ניהול פעיל — אפשר למחוק הטבות.",en:"Admin mode on — you can delete offers."},
    admin_add_disc:{he:"+ הוספת הטבה חדשה",en:"+ Add new offer"},
    del:{he:"מחק",en:"Delete"},

    /* guides */
    guide_eyebrow:{he:"לתכנן כמו מקצוענים",en:"Plan like a pro"},
    guide_title:{he:"מדריכים דיגיטליים",en:"Digital guides"},
    guide_p:{he:"כל מה שלמדנו בשטח, מסודר למדריך אחד. מסלולים יומיים, תקציב, המלצות אוכל ולינה — מוכן להורדה.",en:"Everything we learned on the ground, in one guide. Day-by-day routes, budgets, food and stay tips — ready to download."},
    guide_buy:{he:"לרכישה",en:"Buy"},
    guide_empty:{he:"אין מדריכים כרגע. בקרוב!",en:"No guides yet. Coming soon!"},
    admin_guide:{he:"מצב ניהול פעיל — אפשר למחוק מדריכים.",en:"Admin mode on — you can delete guides."},
    admin_add_guide:{he:"+ הוספת מדריך חדש",en:"+ Add new guide"},

    /* about */
    about_eyebrow:{he:"על הפודקאסט",en:"About the podcast"},
    about_h1:{he:"העולם, פרק אחר פרק.",en:"The world, one episode at a time."},
    about_lead:{he:"מטוסי נייר הוא פודקאסט על הסקרנות שמניעה אותנו לצאת לדרך — לפגוש אנשים, לטעום, ללכת לאיבוד ולמצוא את עצמנו במקומות הכי רחוקים.",en:"Paper Planes is a podcast about the curiosity that drives us out the door — to meet people, to taste, to get lost and find ourselves in the most far-flung places."},
    story_eyebrow:{he:"מי אנחנו",en:"Who we are"},
    story_title:{he:"הסיפור שלנו",en:"Our story"},
    story_p1:{he:"הכול התחיל מכרטיס טיסה בכיוון אחד ומחברת ריקה. מאז, כל פרק הוא נחיתה במקום חדש — מהרחובות הסואנים של טוקיו, דרך פסגות האנדים בפרו, ועד לקרחונים השקטים של אנטארקטיקה.",en:"It all started with a one-way ticket and an empty notebook. Since then, every episode is a landing in a new place — from the busy streets of Tokyo, through the Andean peaks of Peru, to the silent glaciers of Antarctica."},
    story_p2:{he:"אנחנו לא מספרים לכם רק לאן ללכת. אנחנו מספרים את הסיפורים שמאחורי המקומות: האנשים שפגשנו, הטעויות שעשינו, והרגעים הקטנים שהפכו טיול להרפתקה. כי בסוף, הזיכרון הכי טוב הוא תמיד הסיפור.",en:"We don't just tell you where to go. We tell the stories behind the places: the people we met, the mistakes we made, and the small moments that turned a trip into an adventure. Because in the end, the best souvenir is always the story."},
    story_p3:{he:"הפודקאסט מוגש על ידי <b>איתי חן</b>, ומלווה אלפי מאזינים שמתכננים, חולמים, או פשוט אוהבים לשמוע סיפור טוב על הדרך.",en:"The podcast is hosted by <b>Itay Chen</b>, joining thousands of listeners who plan, dream, or just love a good story for the road."},
    pillar1_t:{he:"טיולים",en:"Travel"}, pillar1_d:{he:"מסלולים אמיתיים, טיפים והמלצות",en:"Real routes, tips that work — all from first-hand experience."},
    pillar2_t:{he:"הרפתקאות",en:"Adventures"}, pillar2_d:{he:"היציאה מאזור הנוחות — שם מתחילים הסיפורים הכי טובים.",en:"Stepping out of the comfort zone — where the best stories begin."},
    pillar3_t:{he:"סיפורים",en:"Stories"}, pillar3_d:{he:"אנשים, תרבויות ורגעים שנשארים איתנו הרבה אחרי הנחיתה.",en:"People, cultures and moments that stay with us long after landing."},
    pillar4_t:{he:"מקומות",en:"Places"}, pillar4_d:{he:"30+ מדינות, 6 יבשות, ועוד המון נקודות על המפה שמחכות לכם!",en:"30+ countries, 6 continents, and many more dots on the map waiting for you!"},

    /* contact */
    contact_eyebrow:{he:"צרו קשר",en:"Get in touch"},
    contact_h1:{he:"בואו נדבר",en:"Let's talk"},
    contact_lead:{he:"יש לכם יעד שחייבים שנכסה? רעיון לשיתוף פעולה? או שאתם פשוט רוצים לספר לנו על טיול מטורף? נשמח לשמוע.",en:"Got a destination we must cover? A collaboration idea? Or just want to share an epic trip? We'd love to hear it."},
    contact_form_title:{he:"שלחו הודעה",en:"Send a message"},
    contact_form_sub:{he:"נחזור אליכם הכי מהר שאפשר ✈︎",en:"We'll get back to you as soon as we can ✈︎"},
    f_name:{he:"שם מלא",en:"Full name"}, f_name_ph:{he:"איך קוראים לכם?",en:"Your name?"},
    f_email:{he:"אימייל",en:"Email"},
    f_topic:{he:"נושא",en:"Subject"},
    topic1:{he:"הצעת יעד לפרק",en:"Suggest a destination"}, topic2:{he:"שיתוף פעולה / חסות",en:"Collaboration / sponsorship"},
    topic3:{he:"מדריכים והטבות",en:"Guides & offers"}, topic4:{he:"אחר",en:"Other"},
    f_msg:{he:"ההודעה שלכם",en:"Your message"}, f_msg_ph:{he:"ספרו לנו הכול...",en:"Tell us everything..."},
    f_send:{he:"שליחה",en:"Send"},
    contact_done:{he:"ההודעה נשלחה! נחזור אליכם בקרוב.",en:"Message sent! We'll be in touch soon."},
    way_email_t:{he:"אימייל",en:"Email"},
    way_phone_t:{he:"טלפון",en:"Phone"}, way_phone_s:{he:"א׳–ה׳ 9:00–17:00",en:"Sun–Thu 9:00–17:00"},
    way_whatsapp_t:{he:"וואטסאפ",en:"WhatsApp"}, way_whatsapp_s:{he:"כתבו לנו הודעה",en:"Message us"},
    s_spotify_follow:{he:"עקבו ואל תפספסו פרק",en:"Follow & never miss an episode"},
    s_youtube_vid:{he:"הפרקים גם בוידאו",en:"Episodes on video too"}
  };

  function t(k){ var e=D[k]; if(!e) return k; return e[LANG]!=null?e[LANG]:e.he; }
  function apply(root){
    root=root||document;
    [].forEach.call(root.querySelectorAll("[data-i18n]"),function(el){el.textContent=t(el.getAttribute("data-i18n"));});
    [].forEach.call(root.querySelectorAll("[data-i18n-html]"),function(el){el.innerHTML=t(el.getAttribute("data-i18n-html"));});
    [].forEach.call(root.querySelectorAll("[data-i18n-ph]"),function(el){el.setAttribute("placeholder",t(el.getAttribute("data-i18n-ph")));});
  }
  function set(l){ try{localStorage.setItem("pp_lang",l);}catch(e){} location.reload(); }

  g.T = { lang:LANG, t:t, apply:apply, set:set, other:(LANG==="he"?"en":"he") };
  g.t = t;
  if (document.readyState!=="loading") apply(); else document.addEventListener("DOMContentLoaded",function(){apply();});
})(window);
