import{i as u,r as P,d as D,g as F,u as U}from"./index-BvrYQBFb.js";document.body.classList.add("preloading");function ee(){const e=document.getElementById("preloader"),t=e.querySelector(".loading-progress");let s=0;const n=setInterval(()=>{s+=Math.random()*15,s>100?(s=100,clearInterval(n),t.style.width="100%",setTimeout(()=>{e.style.transition="opacity 0.5s ease-out",e.style.opacity="0",setTimeout(()=>{e.remove(),document.body.classList.remove("preloading"),u.updatePageContent(),_()},500)},500)):t.style.width=`${s}%`},100)}function _(){console.log("Starting language switcher initialization");const e=document.getElementById("language-switcher"),t=document.getElementById("language-dropdown");if(console.log("Initializing language switcher:",{languageSwitcher:e,languageDropdown:t}),!e||!t){console.error("Language switcher elements not found:",{languageSwitcher:e,languageDropdown:t});return}const s=e.cloneNode(!0);e.parentNode.replaceChild(s,e);const n=u.getCurrentLocale(),o=s.querySelector("span");if(console.log("Initial language setup:",{currentLang:n,langSpan:o}),o){const a={en:"English",ru:"Русский","pt-br":"Português"};o.textContent=a[n]||"English"}s.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation(),console.log("Language switcher clicked");const l=t.classList.contains("hidden");l?(t.classList.remove("hidden"),s.classList.add("bg-white/10")):(t.classList.add("hidden"),s.classList.remove("bg-white/10")),console.log("Dropdown toggled, hidden:",!l)});const i=t.querySelectorAll("button");console.log("Language buttons found:",i.length),i.forEach(a=>{a.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation();const r=a.dataset.lang;if(console.log("Language button clicked:",r),u.setLocale(r),t.classList.add("hidden"),s.classList.remove("bg-white/10"),o){const d={en:"English",ru:"Русский","pt-br":"Português"};o.textContent=d[r]||"English"}v()})}),document.addEventListener("click",a=>{s.contains(a.target)||(console.log("Clicking outside, closing dropdown"),t.classList.add("hidden"),s.classList.remove("bg-white/10"))});const c=()=>{const a=e.querySelector("span"),l={en:"English",ru:"Русский","pt-br":"Português"};a.textContent=l[u.currentLocale]||"English"};document.addEventListener("languageChanged",c)}document.addEventListener("DOMContentLoaded",()=>{ee(),pe();const e=document.getElementById("accept-cookies"),t=document.getElementById("reject-cookies"),s=document.getElementById("cookie-consent");e&&e.addEventListener("click",()=>{n(),T("cookie-consent","accepted",365)}),t&&t.addEventListener("click",()=>{n(),T("cookie-consent","rejected",365)});function n(){s.classList.add("translate-y-full"),s.addEventListener("transitionend",()=>{s.style.display="none"},{once:!0})}te(),setTimeout(()=>{Z()},300),ye(),be(),ve(),q(),ae(),initializeMobileFilters();let o;window.addEventListener("resize",()=>{clearTimeout(o),o=setTimeout(()=>{q()},100)}),u.updatePageContent(),_()});function te(){document.querySelectorAll(".sort-option").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".sort-option").forEach(n=>{n.classList.remove("bg-white/10","text-white"),n.classList.add("text-white/70")}),t.classList.remove("text-white/70"),t.classList.add("bg-white/10","text-white");const s=t.dataset.sort;localStorage.setItem("currentSort",s),v()})});const e=localStorage.getItem("currentSort");if(e){const t=document.querySelector(`.sort-option[data-sort="${e}"]`);t&&(t.classList.remove("text-white/70"),t.classList.add("bg-white/10","text-white"))}}let g=[],E="",b=null,m=1;const S={mobile:4,tablet:6,desktop:9,wide:15},w=document.getElementById("about-modal"),se=document.getElementById("about-btn"),V=document.getElementById("close-about"),k=document.getElementById("suggest-modal"),ne=document.getElementById("suggest-btn"),oe=document.getElementById("close-suggest"),B=24*60*60*1e3;document.getElementById("mobile-filters-btn");document.getElementById("mobile-filters-modal");document.getElementById("close-mobile-filters");document.getElementById("mobile-filters-content");document.getElementById("reset-filters");document.getElementById("apply-filters");const I=document.getElementById("active-filters-count"),j={tablet:768};function q(){var n;const e=document.getElementById("filters-sidebar"),t=(n=document.getElementById("mobile-filters-btn"))==null?void 0:n.parentElement;if(!e||!t){console.error("Filter elements not found:",{filtersSidebar:e,mobileFiltersBtn:t});return}const s=window.innerWidth<j.tablet;console.log("Visibility check:",{isMobile:s,width:window.innerWidth,breakpoint:j.tablet}),e.classList.toggle("hidden",s),t.classList.toggle("hidden",!s)}function ae(){const e=document.getElementById("mobile-filters-btn"),t=document.getElementById("mobile-filters-modal"),s=t==null?void 0:t.querySelector(".flex.flex-col.bg-\\[\\#111\\]"),n=t==null?void 0:t.querySelector(".bg-\\[\\#0A0A0A\\]");if(!e||!t||!s||!n){console.error("Required mobile filter elements not found");return}function o(){t.classList.remove("hidden"),t.offsetHeight,n.classList.add("opacity-100"),s.classList.remove("translate-y-full"),document.body.classList.add("overflow-hidden")}function i(){n.classList.remove("opacity-100"),s.classList.add("translate-y-full"),setTimeout(()=>{t.classList.add("hidden"),document.body.classList.remove("overflow-hidden")},300)}e.addEventListener("click",r=>{r.preventDefault(),o()});const c=document.getElementById("close-mobile-filters");c&&c.addEventListener("click",r=>{r.preventDefault(),i()}),t.addEventListener("click",r=>{r.target===t&&i()}),document.addEventListener("keydown",r=>{r.key==="Escape"&&!t.classList.contains("hidden")&&i()});const a=document.getElementById("reset-filters");a&&a.addEventListener("click",r=>{r.preventDefault(),re(),Y()});const l=document.getElementById("apply-filters");l&&l.addEventListener("click",r=>{r.preventDefault(),i(),v()})}function Y(){const e=ie();I&&(e>0?(I.textContent=`${e} active`,I.classList.remove("hidden")):I.classList.add("hidden"))}function ie(){let e=0;return E&&e++,b&&e++,localStorage.getItem("currentSort")&&e++,e}function re(){E="",b=null,localStorage.removeItem("currentSort"),document.querySelectorAll(".status-filter-btn div").forEach(e=>{e.classList.remove("bg-black/40")}),document.querySelectorAll(".games-filter-btn div").forEach(e=>{e.classList.remove("border-emerald-500/20","bg-black/40"),e.classList.add("border-white/5","bg-black/20")}),document.querySelectorAll(".sort-option").forEach(e=>{e.classList.remove("bg-white/10","text-white"),e.classList.add("text-white/70")}),v()}async function Z(){try{g=(await(await fetch("data/resources.json")).json()).sources,await ce(),v(g),H()}catch(e){console.error("Error loading sources:",e)}}async function ce(){try{const e=P(D,"sources"),s=(await F(e)).val();console.log("Raw Firebase stats:",s),s&&(g=g.map(n=>{var r;const o=n.url.replace(/[^a-zA-Z0-9]/g,"_"),i=((r=s[o])==null?void 0:r.stats)||{installs:0,copies:0,activity:[]},c=Array.isArray(i.activity)?i.activity:[],a=Date.now(),l=c.filter(d=>a-d<B).length;return console.log(`Source ${n.title} activity:`,{activity:c,recentActivity:l,now:a,window:B}),{...n,stats:{...i,recentActivity:l,activity:c}}}),g.forEach(n=>{z(n.url,n.stats)}))}catch(e){console.error("Error loading stats from Firebase:",e)}}function N(e){document.querySelector("main").classList.add("blur-sm","transition-all","duration-200");const t=u.t.bind(u),s=document.createElement("div");s.className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in p-4",s.innerHTML=`
        <div class="fixed inset-0 bg-black/90 backdrop-blur-sm"></div>
        <div class="relative bg-[#111] rounded-xl overflow-hidden animate-scale-in max-w-md w-full mx-4">
            <!-- Animated background effects -->
            <div class="absolute inset-0 overflow-hidden">
                <!-- Diagonal stripes -->
                <div class="absolute inset-0" style="
                    background-image: repeating-linear-gradient(
                        45deg,
                        #FF0000 0,
                        #FF0000 1px,
                        transparent 0,
                        transparent 10px
                    );
                    opacity: 0.03;
                "></div>
                
                <!-- Animated gradient -->
                <div class="absolute inset-0 animate-gradient-shift" style="
                    background: linear-gradient(45deg, 
                        rgba(255,0,0,0.1) 0%,
                        transparent 20%,
                        transparent 80%,
                        rgba(255,0,0,0.1) 100%
                    );
                "></div>
                
                <!-- Pulsing border -->
                <div class="absolute inset-0 border border-red-500/20 rounded-xl animate-pulse-border"></div>
            </div>
            
            <!-- Content -->
            <div class="relative p-4 sm:p-6">
                <div class="flex items-start gap-3 sm:gap-4">
                    <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-red-500/10 border border-red-500/20 
                              flex items-center justify-center shrink-0">
                        <i class="fas fa-exclamation-triangle text-red-500 text-sm sm:text-base"></i>
                    </div>
                    <div>
                        <h3 class="text-base sm:text-lg font-medium text-white mb-2">${t("modal.warning.title")}</h3>
                        <p class="text-white/70 text-xs sm:text-sm">
                            ${t("modal.warning.message")}
                        </p>
                    </div>
                </div>

                <!-- Buttons -->
                <div class="flex items-center justify-end gap-2 sm:gap-3 mt-4 sm:mt-6">
                    <button class="cancel-btn px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm 
                                 text-white/70 hover:text-white transition-colors">
                        ${t("modal.warning.cancel")}
                    </button>
                    <button class="proceed-btn px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm 
                                 bg-red-500/10 hover:bg-red-500/20 
                                 border border-red-500/20 text-red-400 hover:text-red-300
                                 rounded-lg transition-colors">
                        ${t("modal.warning.confirm")}
                    </button>
                </div>
            </div>
        </div>
    `,document.body.appendChild(s);const n=()=>{document.querySelector("main").classList.remove("blur-sm"),s.remove()};s.querySelector(".cancel-btn").addEventListener("click",()=>{n(),e(!1)}),s.querySelector(".proceed-btn").addEventListener("click",()=>{n(),e(!0)}),s.querySelector(".fixed.inset-0").addEventListener("click",o=>{o.target===o.currentTarget&&(n(),e(!1))})}function J(e){var p,f,h,C;const t=u.getCurrentLocale(),n=(((p=u.translations[t])==null?void 0:p.sources)||{})[e.title]||{title:e.title,description:e.description},o=e.status.includes("Use At Your Own Risk"),i=e.stats||{installs:0,copies:0,recentActivity:0},c=parseInt(i.recentActivity||0),a=document.createElement("div");a.className="source-card animate-fade-in rounded-xl",a.dataset.url=e.url,a.dataset.name=e.title,a.dataset.copies=((f=e.stats)==null?void 0:f.copies)||0,a.dataset.installs=((h=e.stats)==null?void 0:h.installs)||0,a.dataset.activity=((C=e.stats)==null?void 0:C.recentActivity)||0;const l=e.status.map(x=>{const y=x.toLowerCase().replace(/\s+/g,"-"),L={trusted:{color:"emerald",icon:"shield",key:"trusted"},"safe-for-use":{color:"teal",icon:"check-circle",key:"safeForUse"},"use-at-your-own-risk":{color:"red",icon:"exclamation-triangle",key:"useAtOwnRisk"},russian:{color:"indigo",icon:"globe",key:"russian"}}[y]||{color:"gray",icon:"circle",key:y};return`
            <span class="inline-flex items-center gap-1.5 px-2 py-1 rounded-md 
                         bg-${L.color}-500/10 border border-${L.color}-500/20 
                         text-${L.color}-400 text-xs backdrop-blur-sm status-badge">
                <i class="fas fa-${L.icon} text-[10px]"></i>
                ${u.t(`status.${L.key}`)}
            </span>
        `}).join("");a.innerHTML=`
        <div class="group relative h-full flex flex-col overflow-hidden
                    ${o?"border-red-500/20":"border-white/5"} border
                    backdrop-blur-sm transition-all duration-300
                    hover:shadow-lg ${o?"hover:shadow-red-500/10":"hover:shadow-emerald-500/10"}
                    bg-[#111]/40 rounded-xl">
            
            <!-- Card background effects -->
            <div class="absolute inset-0 bg-gradient-to-b 
                        ${o?"from-red-500/5":"from-emerald-500/5"} to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <!-- Glass effect overlay - Moved before the games count -->
            <div class="absolute inset-0 backdrop-blur-sm bg-black/10"></div>
            
            <!-- Games count badge -->
            <div class="absolute mt-4 right-4 inline-flex items-center gap-1.5 px-2 py-1 z-10
                        rounded-md bg-emerald-500/10 border border-emerald-500/20 
                        text-emerald-400 text-xs">
                <i class="fas fa-gamepad text-[10px]"></i>
                <span>${e.gamesCount}</span>
            </div>
            
            <!-- Card content -->
            <div class="relative p-4 flex-1 flex flex-col">
                <!-- Status badges -->
                <div class="flex flex-wrap gap-1.5 mb-4">
                    ${l}
                </div>

                <!-- Title and description -->
                <div class="flex items-start gap-3 flex-1">
                    <div class="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
                         ${o?"bg-red-500/10 border-red-500/20":"bg-emerald-500/10 border-emerald-500/20"} 
                         border group-hover:scale-110 transition-transform duration-300
                         backdrop-blur-sm">
                        <i class="fas ${o?"fa-triangle-exclamation text-red-500/70":"fa-book-open text-emerald-500/70"} 
                             text-lg"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="text-base font-medium text-white group-hover:text-${o?"red":"emerald"}-400 
                                   transition-colors duration-300 mb-1.5 truncate">
                            ${n.title}
                        </h3>
                        <p class="text-white/60 text-sm leading-relaxed line-clamp-2">
                            ${n.description}
                        </p>
                    </div>
                </div>

                <!-- Stats and date (fixed at bottom) -->
                <div class="mt-2 pt-4 border-t border-white/5">
                    <div class="flex items-center justify-between text-white/40 text-xs">
                        <span class="flex items-center gap-1.5 mr-2">
                            <i class="fas fa-calendar-alt text-[10px]"></i>
                            ${u.t("common.added")} ${fe(e.addedDate)}
                        </span>
                        <div class="source-stats flex items-center gap-3">
                            <span class="flex items-center gap-1.5 ${c>0?"text-red-400":""}
                                       transition-colors duration-300">
                                <i class="fas fa-fire text-[10px]"></i>
                                ${c}
                            </span>
                            <span class="flex items-center gap-1.5">
                                <i class="fas fa-download text-[10px]"></i>
                                ${i.installs||0}
                            </span>
                            <span class="flex items-center gap-1.5">
                                <i class="fas fa-copy text-[10px]"></i>
                                ${i.copies||0}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card actions -->
            <div class="relative border-t ${o?"border-red-500/10":"border-white/5"} 
                        p-3 bg-black/30 backdrop-blur-sm">
                <div class="flex gap-2">
                    <button class="install-btn flex-1 
                                 ${o?"bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/20":"bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/20"}
                                 border rounded-lg px-4 py-2 text-sm font-medium 
                                 transition-all duration-200 flex items-center justify-center gap-2 
                                 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed
                                 backdrop-blur-sm">
                        <i class="fas fa-download text-[10px]"></i>
                        ${u.t("common.install")}
                    </button>
                    <button class="copy-btn shrink-0 bg-white/5 hover:bg-white/10 text-white/70 
                                 border border-white/10 rounded-lg px-4 py-2 text-sm
                                 transition-all duration-200 flex items-center justify-center gap-2
                                 hover:scale-[1.02] backdrop-blur-sm" data-url="${e.url}">
                        <i class="fas fa-copy text-[10px]"></i>
                        ${u.t("common.copy")}
                    </button>
                </div>
            </div>
        </div>
    `;const r=a.querySelector(".install-btn"),d=a.querySelector(".copy-btn");return r&&r.addEventListener("click",async()=>{const x=async()=>{G(r,"loading");const y=await W(e.url,"install");if(G(r,y?"success":"rate-limited"),y){const L=encodeURIComponent(e.url);window.location.href=`hydralauncher://install-source?urls=${L}`}};e.status&&e.status.includes("Use At Your Own Risk")?N(y=>{y&&x()}):x()}),d&&d.addEventListener("click",async()=>{const x=async()=>{await W(e.url,"copy")&&(navigator.clipboard.writeText(e.url),d.innerHTML='<i class="fas fa-check text-[10px]"></i> '+u.t("sourceCard.copied"),setTimeout(()=>{d.innerHTML='<i class="fas fa-copy text-[10px]"></i> '+u.t("sourceCard.copy")},2e3))};o?N(y=>{y&&x()}):x()}),z(e.url,e.stats),a.dataset.copies=i.copies||0,a.dataset.installs=i.installs||0,a.dataset.activity=c,a}let A="wide";function K(){const e=window.innerWidth;return e>=1536?"wide":e>=1024?"desktop":e>=640?"tablet":"mobile"}let O;window.addEventListener("resize",()=>{clearTimeout(O),O=setTimeout(()=>{q();const e=K();if(A!==e){const s=R(),n=$(),o=Math.ceil(s.length/n);if(A==="wide"&&e==="desktop"){const i=(m-1)*S.desktop;m=Math.floor(i/S.desktop)+1}A=e,m=Math.min(Math.max(1,m),o),v(s),n<$()&&window.scrollTo({top:0,behavior:"smooth"})}},100)});function le(e,t){return[...e].sort((s,n)=>{var o,i,c,a,l,r;switch(t){case"hot":const d=((o=s.stats)==null?void 0:o.recentActivity)||0;return(((i=n.stats)==null?void 0:i.recentActivity)||0)-d;case"new":return new Date(n.addedDate)-new Date(s.addedDate);case"most-copies":const f=((c=s.stats)==null?void 0:c.copies)||0;return(((a=n.stats)==null?void 0:a.copies)||0)-f;case"most-installs":const C=((l=s.stats)==null?void 0:l.installs)||0;return(((r=n.stats)==null?void 0:r.installs)||0)-C;case"name-asc":return s.title.localeCompare(n.title);case"name-desc":return n.title.localeCompare(s.title);default:return 0}})}function v(e=null){const t=document.getElementById("sources-container");if(!t)return;t.innerHTML="";let s=e||R();const n=localStorage.getItem("currentSort");n&&(s=le(s,n)),console.log("Displaying sources with stats:",s),A=K();const o=$(),i=Math.ceil(s.length/o);m=Math.min(Math.max(1,m),i);const c=(m-1)*o,a=Math.min(c+o,s.length);s.slice(c,a).forEach(r=>{const d=J(r);t.appendChild(d)}),de(i),u.updatePageContent()}function $(){const e=window.innerWidth;return e>=2560?S.wide:e>=1024?S.desktop:e>=640?S.tablet:S.mobile}function de(e){const t=document.getElementById("pagination");if(!t)return;let s="";s+=`
        <button onclick="changePage(${m-1})" 
                class="px-2 py-1.5 text-sm text-white/50 hover:text-white disabled:opacity-50 
                       transition-colors duration-200 rounded-md hover:bg-white/5"
                ${m===1?"disabled":""}>
            <i class="fas fa-chevron-left"></i>
        </button>
    `;for(let n=1;n<=e;n++)n===m?s+=`
                <button class="px-3 py-1.5 text-sm bg-white/10 text-white rounded-md">
                    ${n}
                </button>
            `:s+=`
                <button onclick="changePage(${n})" 
                        class="px-3 py-1.5 text-sm text-white/50 hover:text-white hover:bg-white/5 
                               transition-colors duration-200 rounded-md">
                    ${n}
                </button>
            `;s+=`
        <button onclick="changePage(${m+1})" 
                class="px-2 py-1.5 text-sm text-white/50 hover:text-white disabled:opacity-50 
                       transition-colors duration-200 rounded-md hover:bg-white/5"
                ${m===e?"disabled":""}>
            <i class="fas fa-chevron-right"></i>
        </button>
    `,t.innerHTML=s}window.changePage=function(e){if(e<1)return;const t=R(),s=Math.ceil(t.length/$());e>s||(m=e,v(t),window.scrollTo({top:0,behavior:"smooth"}))};document.querySelectorAll(".status-filter-btn").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.status;document.querySelectorAll(".status-filter-btn").forEach(s=>{s.querySelector("div").classList.remove("bg-black/40")}),E===t?E="":(E=t,e.querySelector("div").classList.add("bg-black/40")),m=1,v(),H(),dispatchFiltersChanged()})});document.querySelectorAll(".games-filter-btn").forEach(e=>{e.addEventListener("click",()=>{const t=parseInt(e.dataset.min),s=parseInt(e.dataset.max);if(document.querySelectorAll(".games-filter-btn div").forEach(n=>{n.classList.remove("border-emerald-500/20","bg-black/40"),n.classList.add("border-white/5","bg-black/20")}),b&&b.min===t&&b.max===s)b=null;else{b={min:t,max:s};const n=e.querySelector("div");n.classList.remove("border-white/5","bg-black/20"),n.classList.add("border-emerald-500/20","bg-black/40")}m=1,v(),H(),Y(),dispatchFiltersChanged()})});function H(){const e={};g.forEach(t=>{t.status.forEach(s=>{e[s]=(e[s]||0)+1})}),document.querySelectorAll(".status-filter-btn").forEach(t=>{const s=t.dataset.status,n=t.querySelector(".text-white\\/40");n&&(n.textContent=e[s]||0)}),document.querySelectorAll(".games-filter-btn").forEach(t=>{const s=parseInt(t.dataset.min),n=parseInt(t.dataset.max),o=g.filter(a=>{const l=parseInt(a.gamesCount);return l>=s&&l<=n}).length,i=t.querySelector(".text-white\\/40");i&&(i.textContent=o);const c=t.querySelector(".bg-emerald-500\\/50");if(c){const a=Math.max(...Array.from(document.querySelectorAll(".games-filter-btn")).map(r=>{const d=parseInt(r.dataset.min),p=parseInt(r.dataset.max);return g.filter(f=>{const h=parseInt(f.gamesCount);return h>=d&&h<=p}).length})),l=a>0?o/a*100:0;c.style.width=`${l}%`}})}document.getElementById("search").addEventListener("input",e=>{const t=e.target.value.toLowerCase(),s=document.getElementById("sources-container");s.innerHTML="",g.filter(o=>(activeStatuses.size===0||o.status.some(i=>activeStatuses.has(i)))&&(o.title.toLowerCase().includes(t)||o.description.toLowerCase().includes(t)||o.url.toLowerCase().includes(t))).forEach((o,i)=>{const c=J(o);c.style.setProperty("--i",i+1),s.appendChild(c)})});const Q=document.getElementById("sort-dropdown-btn"),M=document.getElementById("sort-dropdown"),ue=document.getElementById("current-sort");Q.addEventListener("click",()=>{M.classList.toggle("hidden")});document.addEventListener("click",e=>{!Q.contains(e.target)&&!M.contains(e.target)&&M.classList.add("hidden")});document.querySelectorAll(".sort-option").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.sort;switch(ue.textContent=e.textContent.trim(),M.classList.add("hidden"),t){case"high-to-low":sortGamesFilters(!1);break;case"low-to-high":sortGamesFilters(!0);break;case"most-sources":me();break;case"most-popular":ge();break}})});function me(){const e=document.querySelector(".games-filter-btn").parentNode,t=Array.from(e.querySelectorAll(".games-filter-btn"));t.sort((s,n)=>{const o=parseInt(s.querySelector(".text-white\\/40").textContent);return parseInt(n.querySelector(".text-white\\/40").textContent)-o}),t.forEach(s=>s.remove()),t.forEach(s=>e.appendChild(s))}function ge(){const e=JSON.parse(localStorage.getItem("sourceStats")||"{}"),t=document.querySelector(".games-filter-btn").parentNode,s=Array.from(t.querySelectorAll(".games-filter-btn"));s.sort((n,o)=>{var p,f;const i=((p=g.find(h=>h.gamesCount===n.dataset.min))==null?void 0:p.url)||"",c=((f=g.find(h=>h.gamesCount===o.dataset.min))==null?void 0:f.url)||"",a=e[i]||{installs:0,copies:0},l=e[c]||{installs:0,copies:0},r=a.installs+a.copies;return l.installs+l.copies-r}),s.forEach(n=>n.remove()),s.forEach(n=>t.appendChild(n))}function fe(e){const t=new Date(e),n=Math.abs(new Date-t),o=Math.floor(n/(1e3*60*60*24)),i=u.t.bind(u);if(o===0)return i("common.date.today");if(o===1)return i("common.date.yesterday");if(o<30)return i("common.date.daysAgo",{days:o});{const c={year:"numeric",month:"short",day:"numeric"};return`${i("common.date.on")} ${t.toLocaleDateString(u.getCurrentLocale(),c)}`}}document.addEventListener("DOMContentLoaded",()=>{Z(),sortGamesFilters(!1)});se.addEventListener("click",()=>{w.classList.remove("hidden"),document.body.style.overflow="hidden"});V.addEventListener("click",()=>{w.classList.add("hidden"),document.body.style.overflow=""});w.addEventListener("click",e=>{e.target===w&&V.click()});document.addEventListener("keydown",e=>{e.key==="Escape"&&!w.classList.contains("hidden")&&(w.classList.add("hidden"),document.body.style.overflow="")});ne.addEventListener("click",()=>{k.classList.remove("hidden"),document.body.style.overflow="hidden"});oe.addEventListener("click",()=>{k.classList.add("hidden"),document.body.style.overflow=""});k.addEventListener("click",e=>{e.target===k&&(k.classList.add("hidden"),document.body.style.overflow="")});document.addEventListener("keydown",e=>{e.key==="Escape"&&(w.classList.contains("hidden")||(w.classList.add("hidden"),document.body.style.overflow=""),k.classList.contains("hidden")||(k.classList.add("hidden"),document.body.style.overflow=""))});function T(e,t,s){const n=new Date;n.setTime(n.getTime()+s*24*60*60*1e3),document.cookie=`${e}=${t};expires=${n.toUTCString()};path=/`}function X(e){const t=e+"=",s=document.cookie.split(";");for(let n=0;n<s.length;n++){let o=s[n];for(;o.charAt(0)===" ";)o=o.substring(1,o.length);if(o.indexOf(t)===0)return o.substring(t.length,o.length)}return null}async function W(e,t){try{const s=e.replace(/[^a-zA-Z0-9]/g,"_"),n=`${t}_${s}`;if(X(n))return!0;const o=P(D,`sources/${s}/stats`),c=(await F(o)).val()||{installs:0,copies:0,activity:[]},a=Date.now(),r=(Array.isArray(c.activity)?c.activity:[]).filter(f=>a-f<B);r.push(a);const d={installs:parseInt(c.installs||0)+(t==="install"?1:0),copies:parseInt(c.copies||0)+(t==="copy"?1:0),activity:r,lastUpdated:a};await U(o,d),T(n,"true",t==="install"?.003472222:347222e-9),d.recentActivity=r.length,z(e,d);const p=g.findIndex(f=>f.url===e);return p!==-1&&(g[p].stats=d),!0}catch(s){return console.error("Error tracking source usage:",s),!1}}function z(e,t=null){const s=document.querySelectorAll(".source-card"),n=Array.from(s).find(o=>o.dataset.url===e);if(n){const o=n.querySelector(".source-stats");if(o){const i=parseInt((t==null?void 0:t.installs)||0),c=parseInt((t==null?void 0:t.copies)||0),a=parseInt((t==null?void 0:t.recentActivity)||0);o.innerHTML=`
                <span class="flex items-center gap-1.5">
                    <i class="fas fa-fire text-[10px] ${a>0?"text-red-500":""}"></i>
                    ${a}
                </span>
                <span class="flex items-center gap-1.5">
                    <i class="fas fa-download text-[10px]"></i>
                    ${i}
                </span>
                <span class="flex items-center gap-1.5">
                    <i class="fas fa-copy text-[10px]"></i>
                    ${c}
                </span>
            `}n.dataset.copies=(t==null?void 0:t.copies)||0,n.dataset.installs=(t==null?void 0:t.installs)||0,n.dataset.activity=(t==null?void 0:t.recentActivity)||0}}function G(e,t){const s=e.innerHTML;switch(t){case"loading":e.disabled=!0,e.innerHTML=`
                <div class="flex items-center gap-1.5">
                <div class="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                    <span>Installing...</span>
                </div>
            `;break;case"success":e.innerHTML=`
                <div class="flex items-center gap-1.5">
                    <i class="fas fa-check text-[10px]"></i>
                    Installed
                </div>
            `,setTimeout(()=>{e.disabled=!1,e.innerHTML=s},2e3);break;case"rate-limited":e.innerHTML=`
                <div class="flex items-center gap-1.5 text-amber-400">
                    <i class="fas fa-clock text-[10px]"></i>
                    Please wait
                </div>
            `,setTimeout(()=>{e.disabled=!1,e.innerHTML=s},2e3);break;default:e.disabled=!1,e.innerHTML=s}}function R(){return g.filter(e=>{const t=!E||e.status.includes(E),s=parseInt(e.gamesCount),n=!b||s>=b.min&&s<=b.max;return t&&n})}function pe(){const e=document.getElementById("cookie-consent");X("cookie-consent")?e.style.display="none":(e.style.display="block",setTimeout(()=>{e.classList.remove("translate-y-full")},500))}document.getElementById("accept-cookies").addEventListener("click",()=>{const e=document.getElementById("cookie-consent");e.classList.add("translate-y-full"),e.addEventListener("transitionend",()=>{e.style.display="none"},{once:!0}),T("cookie-consent","accepted",365)});async function he(e){try{const t=P(D,`sources/${e}/stats`),n=(await F(t)).val();if(n&&n.activity){const o=n.activity.filter(i=>Date.now()-i<B);o.length!==n.activity.length&&await U(t,{activity:o})}}catch(t){console.error("Error cleaning up old activity:",t)}}function ye(){const e=document.getElementById("suggest-modal"),t=document.getElementById("suggest-btn"),s=document.getElementById("close-suggest");t&&t.addEventListener("click",()=>{e.classList.remove("hidden")}),s&&s.addEventListener("click",()=>{e.classList.add("hidden")}),e&&e.addEventListener("click",n=>{n.target===e&&e.classList.add("hidden")})}function be(){const e=document.getElementById("search");if(e){const t=()=>{const n=window.innerWidth<640?"header.searchMobile":"header.search";e.placeholder=u.t(n)};t(),window.addEventListener("resize",t),document.addEventListener("languageChanged",t)}}function ve(){setInterval(()=>{g.forEach(e=>{const t=e.url.replace(/[^a-zA-Z0-9]/g,"_");he(t)})},60*60*1e3)}document.addEventListener("languageChanged",()=>{v()});
