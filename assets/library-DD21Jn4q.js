import"./pt-br-C6n_y4OE.js";import{c as X,i as u,r as F,d as H,g as N,u as G}from"./index-BtZ5F46b.js";document.body.classList.add("preloading");document.addEventListener("DOMContentLoaded",async()=>{await X.initialize()});function tt(){const t=document.getElementById("preloader"),e=t.querySelector(".loading-progress");let s=0;const n=setInterval(()=>{s+=Math.random()*15,s>100?(s=100,clearInterval(n),e.style.width="100%",setTimeout(()=>{t.style.transition="opacity 0.5s ease-out",t.style.opacity="0",setTimeout(()=>{t.remove(),document.body.classList.remove("preloading"),u.updatePageContent(),W()},500)},500)):e.style.width=`${s}%`},100)}function W(){const t=document.getElementById("language-switcher"),e=document.getElementById("language-dropdown");if(!t||!e)return;const s=t.cloneNode(!0);t.parentNode.replaceChild(s,t);const n=u.getCurrentLocale(),a=s.querySelector("span");if(a){const o={en:"English",ru:"Русский","pt-br":"Português"};a.textContent=o[n]||"English"}s.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),e.classList.contains("hidden")?(e.classList.remove("hidden"),s.classList.add("bg-white/10")):(e.classList.add("hidden"),s.classList.remove("bg-white/10"))}),e.querySelectorAll("button").forEach(o=>{o.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation();const r=o.dataset.lang;if(u.setLocale(r),e.classList.add("hidden"),s.classList.remove("bg-white/10"),a){const d={en:"English",ru:"Русский","pt-br":"Português"};a.textContent=d[r]||"English"}b()})}),document.addEventListener("click",o=>{s.contains(o.target)||(e.classList.add("hidden"),s.classList.remove("bg-white/10"))});const c=()=>{const o=t.querySelector("span"),l={en:"English",ru:"Русский","pt-br":"Português"};o.textContent=l[u.currentLocale]||"English"};document.addEventListener("languageChanged",c)}document.addEventListener("DOMContentLoaded",()=>{tt(),ht();const t=document.getElementById("accept-cookies"),e=document.getElementById("reject-cookies"),s=document.getElementById("cookie-consent");t&&t.addEventListener("click",()=>{n(),P("cookie-consent","accepted",365)}),e&&e.addEventListener("click",()=>{n(),P("cookie-consent","rejected",365)});function n(){s.classList.add("translate-y-full"),s.addEventListener("transitionend",()=>{s.style.display="none"},{once:!0})}et(),setTimeout(()=>{V()},300),bt(),xt(),wt(),D(),it(),initializeMobileFilters();let a;window.addEventListener("resize",()=>{clearTimeout(a),a=setTimeout(()=>{D()},100)}),u.updatePageContent(),W()});function et(){document.querySelectorAll(".sort-option").forEach(e=>{e.addEventListener("click",()=>{document.querySelectorAll(".sort-option").forEach(n=>{n.classList.remove("bg-white/10","text-white"),n.classList.add("text-white/70")}),e.classList.remove("text-white/70"),e.classList.add("bg-white/10","text-white");const s=e.dataset.sort;localStorage.setItem("currentSort",s),b()})});const t=localStorage.getItem("currentSort");if(t){const e=document.querySelector(`.sort-option[data-sort="${t}"]`);e&&(e.classList.remove("text-white/70"),e.classList.add("bg-white/10","text-white"))}}let m=[],S="",w=null,p=1;const I={mobile:4,tablet:6,desktop:9,wide:15},L=document.getElementById("about-modal"),st=document.getElementById("about-btn"),J=document.getElementById("close-about"),k=document.getElementById("suggest-modal"),nt=document.getElementById("suggest-btn"),at=document.getElementById("close-suggest"),$=24*60*60*1e3;document.getElementById("mobile-filters-btn");document.getElementById("mobile-filters-modal");document.getElementById("close-mobile-filters");document.getElementById("mobile-filters-content");document.getElementById("reset-filters");document.getElementById("apply-filters");const A=document.getElementById("active-filters-count"),ot={tablet:768};function D(){var n;const t=document.getElementById("filters-sidebar"),e=(n=document.getElementById("mobile-filters-btn"))==null?void 0:n.parentElement;if(!t||!e)return;const s=window.innerWidth<ot.tablet;t.classList.toggle("hidden",s),e.classList.toggle("hidden",!s)}function it(){const t=document.getElementById("mobile-filters-btn"),e=document.getElementById("mobile-filters-modal"),s=e==null?void 0:e.querySelector(".flex.flex-col.bg-\\[\\#111\\]"),n=e==null?void 0:e.querySelector(".bg-\\[\\#0A0A0A\\]");if(!t||!e||!s||!n)return;function a(){e.classList.remove("hidden"),e.offsetHeight,n.classList.add("opacity-100"),s.classList.remove("translate-y-full"),document.body.classList.add("overflow-hidden")}function i(){n.classList.remove("opacity-100"),s.classList.add("translate-y-full"),setTimeout(()=>{e.classList.add("hidden"),document.body.classList.remove("overflow-hidden")},300)}t.addEventListener("click",r=>{r.preventDefault(),a()});const c=document.getElementById("close-mobile-filters");c&&c.addEventListener("click",r=>{r.preventDefault(),i()}),e.addEventListener("click",r=>{r.target===e&&i()}),document.addEventListener("keydown",r=>{r.key==="Escape"&&!e.classList.contains("hidden")&&i()});const o=document.getElementById("reset-filters");o&&o.addEventListener("click",r=>{r.preventDefault(),ct(),Z()});const l=document.getElementById("apply-filters");l&&l.addEventListener("click",r=>{r.preventDefault(),i(),b()})}function Z(){const t=rt();A&&(t>0?(A.textContent=`${t} active`,A.classList.remove("hidden")):A.classList.add("hidden"))}function rt(){let t=0;return S&&t++,w&&t++,localStorage.getItem("currentSort")&&t++,t}function ct(){S="",w=null,localStorage.removeItem("currentSort"),document.querySelectorAll(".status-filter-btn div").forEach(t=>{t.classList.remove("bg-black/40")}),document.querySelectorAll(".games-filter-btn div").forEach(t=>{t.classList.remove("border-emerald-500/20","bg-black/40"),t.classList.add("border-white/5","bg-black/20")}),document.querySelectorAll(".sort-option").forEach(t=>{t.classList.remove("bg-white/10","text-white"),t.classList.add("text-white/70")}),b()}async function V(){try{m=(await(await fetch("data/resources.json")).json()).sources,b(m),O(),lt().catch(()=>{console.log("Firebase stats loading failed, continuing with local data only")})}catch{}}async function lt(){try{const t=new Promise((i,c)=>setTimeout(()=>c(new Error("Firebase request timed out")),5e3)),e=F(H,"sources"),s=N(e),a=(await Promise.race([s,t])).val();if(a){m=m.map(i=>{var f;const c=i.url.replace(/[^a-zA-Z0-9]/g,"_"),o=((f=a[c])==null?void 0:f.stats)||{installs:0,copies:0,activity:[]},l=Array.isArray(o.activity)?o.activity:[],r=Date.now(),d=l.filter(h=>r-h<$).length;return{...i,stats:{...o,recentActivity:d,activity:l}}}),m.forEach(i=>{q(i.url,i.stats)});try{localStorage.setItem("sourceStats",JSON.stringify(a)),localStorage.setItem("statsLastUpdated",Date.now().toString())}catch{}return!0}return!1}catch{try{const e=localStorage.getItem("sourceStats");if(e){const s=JSON.parse(e);return m=m.map(n=>{var r;const a=n.url.replace(/[^a-zA-Z0-9]/g,"_"),i=((r=s[a])==null?void 0:r.stats)||{installs:0,copies:0,activity:[]},c=Array.isArray(i.activity)?i.activity:[],o=Date.now(),l=c.filter(d=>o-d<$).length;return{...n,stats:{...i,recentActivity:l,activity:c}}}),m.forEach(n=>{q(n.url,n.stats)}),console.log("Using cached stats from localStorage"),!0}}catch{}return m=m.map(e=>({...e,stats:{installs:0,copies:0,recentActivity:0,activity:[]}})),!1}}function j(t){document.querySelector("main").classList.add("blur-sm","transition-all","duration-200");const e=u.t.bind(u),s=document.createElement("div");s.className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in p-4",s.innerHTML=`
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
                        <h3 class="text-base sm:text-lg font-medium text-white mb-2">${e("modal.warning.title")}</h3>
                        <p class="text-white/70 text-xs sm:text-sm">
                            ${e("modal.warning.message")}
                        </p>
                    </div>
                </div>

                <!-- Buttons -->
                <div class="flex items-center justify-end gap-2 sm:gap-3 mt-4 sm:mt-6">
                    <button class="cancel-btn px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm 
                                 text-white/70 hover:text-white transition-colors">
                        ${e("modal.warning.cancel")}
                    </button>
                    <button class="proceed-btn px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm 
                                 bg-red-500/10 hover:bg-red-500/20 
                                 border border-red-500/20 text-red-400 hover:text-red-300
                                 rounded-lg transition-colors">
                        ${e("modal.warning.confirm")}
                    </button>
                </div>
            </div>
        </div>
    `,document.body.appendChild(s);const n=()=>{document.querySelector("main").classList.remove("blur-sm"),s.remove()};s.querySelector(".cancel-btn").addEventListener("click",()=>{n(),t(!1)}),s.querySelector(".proceed-btn").addEventListener("click",()=>{n(),t(!0)}),s.querySelector(".fixed.inset-0").addEventListener("click",a=>{a.target===a.currentTarget&&(n(),t(!1))})}function dt(t){var f,h,y,v;const e=u.getCurrentLocale(),n=(((f=u.translations[e])==null?void 0:f.sources)||{})[t.title]||{title:t.title,description:t.description},a=t.status.includes("Use At Your Own Risk"),i=t.stats||{installs:0,copies:0,recentActivity:0},c=parseInt(i.recentActivity||0),o=document.createElement("div");o.className="source-card animate-fade-in rounded-xl",o.dataset.url=t.url,o.dataset.name=t.title,o.dataset.copies=((h=t.stats)==null?void 0:h.copies)||0,o.dataset.installs=((y=t.stats)==null?void 0:y.installs)||0,o.dataset.activity=((v=t.stats)==null?void 0:v.recentActivity)||0;const l=t.status.map(g=>{const x=g.toLowerCase().replace(/\s+/g,"-"),E={trusted:{color:"emerald",icon:"shield",key:"trusted"},"safe-for-use":{color:"teal",icon:"check-circle",key:"safeForUse"},"use-at-your-own-risk":{color:"red",icon:"exclamation-triangle",key:"useAtOwnRisk"},russian:{color:"indigo",icon:"globe",key:"russian"}}[x]||{color:"gray",icon:"circle",key:x};return`
            <span class="inline-flex items-center gap-1.5 px-2 py-1 rounded-md 
                         bg-${E.color}-500/10 border border-${E.color}-500/20 
                         text-${E.color}-400 text-xs backdrop-blur-sm status-badge">
                <i class="fas fa-${E.icon} text-[10px]"></i>
                ${u.t(`status.${E.key}`)}
            </span>
        `}).join("");o.innerHTML=`
        <div class="group relative h-full flex flex-col overflow-hidden
                    ${a?"border-red-500/20":"border-white/5"} border
                    backdrop-blur-sm transition-all duration-300
                    hover:shadow-lg ${a?"hover:shadow-red-500/10":"hover:shadow-emerald-500/10"}
                    bg-[#111]/40 rounded-xl">
            
            <!-- Card background effects -->
            <div class="absolute inset-0 bg-gradient-to-b 
                        ${a?"from-red-500/5":"from-emerald-500/5"} to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <!-- Glass effect overlay - Moved before the games count -->
            <div class="absolute inset-0 backdrop-blur-sm bg-black/10"></div>
            
            <!-- Games count badge -->
            <div class="absolute mt-4 right-4 inline-flex items-center gap-1.5 px-2 py-1 z-10
                        rounded-md bg-emerald-500/10 border border-emerald-500/20 
                        text-emerald-400 text-xs">
                <i class="fas fa-gamepad text-[10px]"></i>
                <span>${t.gamesCount}</span>
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
                         ${a?"bg-red-500/10 border-red-500/20":"bg-emerald-500/10 border-emerald-500/20"} 
                         border group-hover:scale-110 transition-transform duration-300
                         backdrop-blur-sm">
                        <i class="fas ${a?"fa-triangle-exclamation text-red-500/70":"fa-book-open text-emerald-500/70"} 
                             text-lg"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="text-base font-medium text-white group-hover:text-${a?"red":"emerald"}-400 
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
                            ${u.t("common.added")} ${yt(t.addedDate)}
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
            <div class="relative border-t ${a?"border-red-500/10":"border-white/5"} 
                        p-3 bg-black/30 backdrop-blur-sm">
                <div class="flex gap-2">
                    <button class="install-btn flex-1 
                                 ${a?"bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/20":"bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/20"}
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
                                 hover:scale-[1.02] backdrop-blur-sm" data-url="${t.url}">
                        <i class="fas fa-copy text-[10px]"></i>
                        ${u.t("common.copy")}
                    </button>
                </div>
            </div>
        </div>
    `;const r=o.querySelector(".install-btn"),d=o.querySelector(".copy-btn");return r&&r.addEventListener("click",async()=>{const g=async()=>{_(r,"loading");const x=await U(t.url,"install");if(_(r,x?"success":"rate-limited"),x){const E=encodeURIComponent(t.url);window.location.href=`hydralauncher://install-source?urls=${E}`}};t.status&&t.status.includes("Use At Your Own Risk")?j(x=>{x&&g()}):g()}),d&&d.addEventListener("click",async()=>{const g=async()=>{await U(t.url,"copy")&&(navigator.clipboard.writeText(t.url),d.innerHTML='<i class="fas fa-check text-[10px]"></i> '+u.t("sourceCard.copied"),setTimeout(()=>{d.innerHTML='<i class="fas fa-copy text-[10px]"></i> '+u.t("sourceCard.copy")},2e3))};a?j(x=>{x&&g()}):g()}),q(t.url,t.stats),o.dataset.copies=i.copies||0,o.dataset.installs=i.installs||0,o.dataset.activity=c,o}let B="wide";function Y(){const t=window.innerWidth;return t>=1536?"wide":t>=1024?"desktop":t>=640?"tablet":"mobile"}let R;window.addEventListener("resize",()=>{clearTimeout(R),R=setTimeout(()=>{D();const t=Y();if(B!==t){const s=z(),n=M(),a=Math.ceil(s.length/n);if(B==="wide"&&t==="desktop"){const i=(p-1)*I.desktop;p=Math.floor(i/I.desktop)+1}B=t,p=Math.min(Math.max(1,p),a),b(s),n<M()&&window.scrollTo({top:0,behavior:"smooth"})}},100)});function ut(t,e){return[...t].sort((s,n)=>{var a,i,c,o,l,r;switch(e){case"hot":const d=((a=s.stats)==null?void 0:a.recentActivity)||0;return(((i=n.stats)==null?void 0:i.recentActivity)||0)-d;case"new":return new Date(n.addedDate)-new Date(s.addedDate);case"most-copies":const h=((c=s.stats)==null?void 0:c.copies)||0;return(((o=n.stats)==null?void 0:o.copies)||0)-h;case"most-installs":const v=((l=s.stats)==null?void 0:l.installs)||0;return(((r=n.stats)==null?void 0:r.installs)||0)-v;case"name-asc":return s.title.localeCompare(n.title);case"name-desc":return n.title.localeCompare(s.title);default:return 0}})}function b(t=null){const e=document.getElementById("sources-container");if(!e)return;e.innerHTML="";let s=t||z();const n=localStorage.getItem("currentSort");n&&(s=ut(s,n)),console.log("Displaying sources with stats:",s),B=Y();const a=M(),i=Math.ceil(s.length/a);p=Math.min(Math.max(1,p),i);const c=(p-1)*a,o=Math.min(c+a,s.length);s.slice(c,o).forEach(r=>{const d=dt(r);e.appendChild(d)}),mt(i),u.updatePageContent()}function M(){const t=window.innerWidth;return t>=2560?I.wide:t>=1024?I.desktop:t>=640?I.tablet:I.mobile}function mt(t){const e=document.getElementById("pagination");if(!e)return;let s="";s+=`
        <button onclick="changePage(${p-1})" 
                class="px-2 py-1.5 text-sm text-white/50 hover:text-white disabled:opacity-50 
                       transition-colors duration-200 rounded-md hover:bg-white/5"
                ${p===1?"disabled":""}>
            <i class="fas fa-chevron-left"></i>
        </button>
    `;for(let n=1;n<=t;n++)n===p?s+=`
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
        <button onclick="changePage(${p+1})" 
                class="px-2 py-1.5 text-sm text-white/50 hover:text-white disabled:opacity-50 
                       transition-colors duration-200 rounded-md hover:bg-white/5"
                ${p===t?"disabled":""}>
            <i class="fas fa-chevron-right"></i>
        </button>
    `,e.innerHTML=s}window.changePage=function(t){if(t<1)return;const e=z(),s=Math.ceil(e.length/M());t>s||(p=t,b(e),window.scrollTo({top:0,behavior:"smooth"}))};document.querySelectorAll(".status-filter-btn").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.status;document.querySelectorAll(".status-filter-btn").forEach(s=>{s.querySelector("div").classList.remove("bg-black/40")}),S===e?S="":(S=e,t.querySelector("div").classList.add("bg-black/40")),p=1,b(),O(),dispatchFiltersChanged()})});document.querySelectorAll(".games-filter-btn").forEach(t=>{t.addEventListener("click",()=>{const e=parseInt(t.dataset.min),s=parseInt(t.dataset.max);if(document.querySelectorAll(".games-filter-btn div").forEach(n=>{n.classList.remove("border-emerald-500/20","bg-black/40"),n.classList.add("border-white/5","bg-black/20")}),w&&w.min===e&&w.max===s)w=null;else{w={min:e,max:s};const n=t.querySelector("div");n.classList.remove("border-white/5","bg-black/20"),n.classList.add("border-emerald-500/20","bg-black/40")}p=1,b(),O(),Z(),dispatchFiltersChanged()})});function O(){const t={};m.forEach(e=>{e.status.forEach(s=>{t[s]=(t[s]||0)+1})}),document.querySelectorAll(".status-filter-btn").forEach(e=>{const s=e.dataset.status,n=e.querySelector(".text-white\\/40");n&&(n.textContent=t[s]||0)}),document.querySelectorAll(".games-filter-btn").forEach(e=>{const s=parseInt(e.dataset.min),n=parseInt(e.dataset.max),a=m.filter(o=>{const l=parseInt(o.gamesCount);return l>=s&&l<=n}).length,i=e.querySelector(".text-white\\/40");i&&(i.textContent=a);const c=e.querySelector(".bg-emerald-500\\/50");if(c){const o=Math.max(...Array.from(document.querySelectorAll(".games-filter-btn")).map(r=>{const d=parseInt(r.dataset.min),f=parseInt(r.dataset.max);return m.filter(h=>{const y=parseInt(h.gamesCount);return y>=d&&y<=f}).length})),l=o>0?a/o*100:0;c.style.width=`${l}%`}})}let C="";document.getElementById("search").addEventListener("input",t=>{C=t.target.value.toLowerCase(),p=1,b()});function z(){return m.filter(t=>{const e=!C||t.title.toLowerCase().includes(C)||t.description.toLowerCase().includes(C)||t.url.toLowerCase().includes(C),s=!S||t.status.includes(S),n=parseInt(t.gamesCount),a=!w||n>=w.min&&n<=w.max;return e&&s&&a})}const K=document.getElementById("sort-dropdown-btn"),T=document.getElementById("sort-dropdown"),gt=document.getElementById("current-sort");K.addEventListener("click",()=>{T.classList.toggle("hidden")});document.addEventListener("click",t=>{!K.contains(t.target)&&!T.contains(t.target)&&T.classList.add("hidden")});document.querySelectorAll(".sort-option").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.sort;switch(gt.textContent=t.textContent.trim(),T.classList.add("hidden"),e){case"high-to-low":sortGamesFilters(!1);break;case"low-to-high":sortGamesFilters(!0);break;case"most-sources":ft();break;case"most-popular":pt();break}})});function ft(){const t=document.querySelector(".games-filter-btn").parentNode,e=Array.from(t.querySelectorAll(".games-filter-btn"));e.sort((s,n)=>{const a=parseInt(s.querySelector(".text-white\\/40").textContent);return parseInt(n.querySelector(".text-white\\/40").textContent)-a}),e.forEach(s=>s.remove()),e.forEach(s=>t.appendChild(s))}function pt(){const t=JSON.parse(localStorage.getItem("sourceStats")||"{}"),e=document.querySelector(".games-filter-btn").parentNode,s=Array.from(e.querySelectorAll(".games-filter-btn"));s.sort((n,a)=>{var f,h;const i=((f=m.find(y=>y.gamesCount===n.dataset.min))==null?void 0:f.url)||"",c=((h=m.find(y=>y.gamesCount===a.dataset.min))==null?void 0:h.url)||"",o=t[i]||{installs:0,copies:0},l=t[c]||{installs:0,copies:0},r=o.installs+o.copies;return l.installs+l.copies-r}),s.forEach(n=>n.remove()),s.forEach(n=>e.appendChild(n))}function yt(t){const e=new Date(t),n=Math.abs(new Date-e),a=Math.floor(n/(1e3*60*60*24)),i=u.t.bind(u);if(a===0)return i("common.date.today");if(a===1)return i("common.date.yesterday");if(a<30)return i("common.date.daysAgo",{days:a});{const c={year:"numeric",month:"short",day:"numeric"};return`${i("common.date.on")} ${e.toLocaleDateString(u.getCurrentLocale(),c)}`}}document.addEventListener("DOMContentLoaded",()=>{V(),sortGamesFilters(!1)});st.addEventListener("click",()=>{L.classList.remove("hidden"),document.body.style.overflow="hidden"});J.addEventListener("click",()=>{L.classList.add("hidden"),document.body.style.overflow=""});L.addEventListener("click",t=>{t.target===L&&J.click()});document.addEventListener("keydown",t=>{t.key==="Escape"&&!L.classList.contains("hidden")&&(L.classList.add("hidden"),document.body.style.overflow="")});nt.addEventListener("click",()=>{k.classList.remove("hidden"),document.body.style.overflow="hidden"});at.addEventListener("click",()=>{k.classList.add("hidden"),document.body.style.overflow=""});k.addEventListener("click",t=>{t.target===k&&(k.classList.add("hidden"),document.body.style.overflow="")});document.addEventListener("keydown",t=>{t.key==="Escape"&&(L.classList.contains("hidden")||(L.classList.add("hidden"),document.body.style.overflow=""),k.classList.contains("hidden")||(k.classList.add("hidden"),document.body.style.overflow=""))});function P(t,e,s){const n=new Date;n.setTime(n.getTime()+s*24*60*60*1e3),document.cookie=`${t}=${e};expires=${n.toUTCString()};path=/`}function Q(t){const e=t+"=",s=document.cookie.split(";");for(let n=0;n<s.length;n++){let a=s[n];for(;a.charAt(0)===" ";)a=a.substring(1,a.length);if(a.indexOf(e)===0)return a.substring(e.length,a.length)}return null}async function U(t,e){try{const s=t.replace(/[^a-zA-Z0-9]/g,"_"),n=`${e}_${s}`;if(Q(n))return!0;let a={installs:0,copies:0,activity:[],recentActivity:0};try{const c=new Promise((v,g)=>setTimeout(()=>g(new Error("Firebase request timed out")),3e3)),o=F(H,`sources/${s}/stats`),l=N(o),d=(await Promise.race([l,c])).val()||{installs:0,copies:0,activity:[]},f=Date.now(),y=(Array.isArray(d.activity)?d.activity:[]).filter(v=>f-v<$);y.push(f),a={installs:parseInt(d.installs||0)+(e==="install"?1:0),copies:parseInt(d.copies||0)+(e==="copy"?1:0),activity:y,recentActivity:y.length,lastUpdated:f},await Promise.race([G(o,a),new Promise((v,g)=>setTimeout(()=>g(new Error("Update timed out")),3e3))]);try{const v=localStorage.getItem("sourceStats");if(v){const g=JSON.parse(v);g[s]||(g[s]={}),g[s].stats=a,localStorage.setItem("sourceStats",JSON.stringify(g)),localStorage.setItem("statsLastUpdated",f.toString())}}catch{}}catch{console.log("Firebase update failed, continuing with local data");const o=m.find(l=>l.url===t);if(o&&o.stats){a={installs:parseInt(o.stats.installs||0)+(e==="install"?1:0),copies:parseInt(o.stats.copies||0)+(e==="copy"?1:0),activity:[],recentActivity:1,lastUpdated:Date.now()};try{const l=localStorage.getItem("sourceStats");if(l){const r=JSON.parse(l);r[s]||(r[s]={}),r[s].stats=a,localStorage.setItem("sourceStats",JSON.stringify(r)),localStorage.setItem("statsLastUpdated",Date.now().toString())}}catch{}}}P(n,"true",e==="install"?.003472222:347222e-9),q(t,a);const i=m.findIndex(c=>c.url===t);return i!==-1&&(m[i].stats=a),!0}catch{return!1}}function q(t,e=null){const s=document.querySelectorAll(".source-card"),n=Array.from(s).find(a=>a.dataset.url===t);if(n){const a=n.querySelector(".source-stats");if(a){const i=parseInt((e==null?void 0:e.installs)||0),c=parseInt((e==null?void 0:e.copies)||0),o=parseInt((e==null?void 0:e.recentActivity)||0);a.innerHTML=`
                <span class="flex items-center gap-1.5">
                    <i class="fas fa-fire text-[10px] ${o>0?"text-red-500":""}"></i>
                    ${o}
                </span>
                <span class="flex items-center gap-1.5">
                    <i class="fas fa-download text-[10px]"></i>
                    ${i}
                </span>
                <span class="flex items-center gap-1.5">
                    <i class="fas fa-copy text-[10px]"></i>
                    ${c}
                </span>
            `}n.dataset.copies=(e==null?void 0:e.copies)||0,n.dataset.installs=(e==null?void 0:e.installs)||0,n.dataset.activity=(e==null?void 0:e.recentActivity)||0}}function _(t,e){const s=t.innerHTML;switch(e){case"loading":t.disabled=!0,t.innerHTML=`
                <div class="flex items-center gap-1.5">
                <div class="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                    <span>Installing...</span>
                </div>
            `;break;case"success":t.innerHTML=`
                <div class="flex items-center gap-1.5">
                    <i class="fas fa-check text-[10px]"></i>
                    Installed
                </div>
            `,setTimeout(()=>{t.disabled=!1,t.innerHTML=s},2e3);break;case"rate-limited":t.innerHTML=`
                <div class="flex items-center gap-1.5 text-amber-400">
                    <i class="fas fa-clock text-[10px]"></i>
                    Please wait
                </div>
            `,setTimeout(()=>{t.disabled=!1,t.innerHTML=s},2e3);break;default:t.disabled=!1,t.innerHTML=s}}function ht(){const t=document.getElementById("cookie-consent");Q("cookie-consent")?t.style.display="none":(t.style.display="block",setTimeout(()=>{t.classList.remove("translate-y-full")},500))}document.getElementById("accept-cookies").addEventListener("click",()=>{const t=document.getElementById("cookie-consent");t.classList.add("translate-y-full"),t.addEventListener("transitionend",()=>{t.style.display="none"},{once:!0}),P("cookie-consent","accepted",365)});async function vt(t){try{const e=F(H,`sources/${t}/stats`),n=(await N(e)).val();if(n&&n.activity){const a=n.activity.filter(i=>Date.now()-i<$);a.length!==n.activity.length&&await G(e,{activity:a})}}catch{}}function bt(){const t=document.getElementById("suggest-modal"),e=document.getElementById("suggest-btn"),s=document.getElementById("close-suggest");e&&e.addEventListener("click",()=>{t.classList.remove("hidden")}),s&&s.addEventListener("click",()=>{t.classList.add("hidden")}),t&&t.addEventListener("click",n=>{n.target===t&&t.classList.add("hidden")})}function xt(){const t=document.getElementById("search");if(t){const e=()=>{const n=window.innerWidth<640?"header.searchMobile":"header.search";t.placeholder=u.t(n)};e(),window.addEventListener("resize",e),document.addEventListener("languageChanged",e)}}function wt(){setInterval(()=>{m.forEach(t=>{const e=t.url.replace(/[^a-zA-Z0-9]/g,"_");vt(e)})},60*60*1e3)}document.addEventListener("languageChanged",()=>{b()});
