import"./pt-br-x9OdUgem.js";import{i as u,r as q,d as P,g as D,u as U}from"./index-BmrlxUBi.js";document.body.classList.add("preloading");function X(){const e=document.getElementById("preloader"),t=e.querySelector(".loading-progress");let s=0;const n=setInterval(()=>{s+=Math.random()*15,s>100?(s=100,clearInterval(n),t.style.width="100%",setTimeout(()=>{e.style.transition="opacity 0.5s ease-out",e.style.opacity="0",setTimeout(()=>{e.remove(),document.body.classList.remove("preloading"),u.updatePageContent(),W()},500)},500)):t.style.width=`${s}%`},100)}function W(){const e=document.getElementById("language-switcher"),t=document.getElementById("language-dropdown");if(!e||!t)return;const s=e.cloneNode(!0);e.parentNode.replaceChild(s,e);const n=u.getCurrentLocale(),a=s.querySelector("span");if(a){const o={en:"English",ru:"Русский","pt-br":"Português"};a.textContent=o[n]||"English"}s.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),t.classList.contains("hidden")?(t.classList.remove("hidden"),s.classList.add("bg-white/10")):(t.classList.add("hidden"),s.classList.remove("bg-white/10"))}),t.querySelectorAll("button").forEach(o=>{o.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation();const r=o.dataset.lang;if(u.setLocale(r),t.classList.add("hidden"),s.classList.remove("bg-white/10"),a){const d={en:"English",ru:"Русский","pt-br":"Português"};a.textContent=d[r]||"English"}b()})}),document.addEventListener("click",o=>{s.contains(o.target)||(t.classList.add("hidden"),s.classList.remove("bg-white/10"))});const c=()=>{const o=e.querySelector("span"),l={en:"English",ru:"Русский","pt-br":"Português"};o.textContent=l[u.currentLocale]||"English"};document.addEventListener("languageChanged",c)}document.addEventListener("DOMContentLoaded",()=>{X(),pe();const e=document.getElementById("accept-cookies"),t=document.getElementById("reject-cookies"),s=document.getElementById("cookie-consent");e&&e.addEventListener("click",()=>{n(),M("cookie-consent","accepted",365)}),t&&t.addEventListener("click",()=>{n(),M("cookie-consent","rejected",365)});function n(){s.classList.add("translate-y-full"),s.addEventListener("transitionend",()=>{s.style.display="none"},{once:!0})}ee(),setTimeout(()=>{Y()},300),ye(),ve(),be(),T(),oe(),initializeMobileFilters();let a;window.addEventListener("resize",()=>{clearTimeout(a),a=setTimeout(()=>{T()},100)}),u.updatePageContent(),W()});function ee(){document.querySelectorAll(".sort-option").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".sort-option").forEach(n=>{n.classList.remove("bg-white/10","text-white"),n.classList.add("text-white/70")}),t.classList.remove("text-white/70"),t.classList.add("bg-white/10","text-white");const s=t.dataset.sort;localStorage.setItem("currentSort",s),b()})});const e=localStorage.getItem("currentSort");if(e){const t=document.querySelector(`.sort-option[data-sort="${e}"]`);t&&(t.classList.remove("text-white/70"),t.classList.add("bg-white/10","text-white"))}}let f=[],E="",v=null,m=1;const S={mobile:4,tablet:6,desktop:9,wide:15},w=document.getElementById("about-modal"),te=document.getElementById("about-btn"),_=document.getElementById("close-about"),k=document.getElementById("suggest-modal"),se=document.getElementById("suggest-btn"),ne=document.getElementById("close-suggest"),F=24*60*60*1e3;document.getElementById("mobile-filters-btn");document.getElementById("mobile-filters-modal");document.getElementById("close-mobile-filters");document.getElementById("mobile-filters-content");document.getElementById("reset-filters");document.getElementById("apply-filters");const I=document.getElementById("active-filters-count"),ae={tablet:768};function T(){var n;const e=document.getElementById("filters-sidebar"),t=(n=document.getElementById("mobile-filters-btn"))==null?void 0:n.parentElement;if(!e||!t)return;const s=window.innerWidth<ae.tablet;e.classList.toggle("hidden",s),t.classList.toggle("hidden",!s)}function oe(){const e=document.getElementById("mobile-filters-btn"),t=document.getElementById("mobile-filters-modal"),s=t==null?void 0:t.querySelector(".flex.flex-col.bg-\\[\\#111\\]"),n=t==null?void 0:t.querySelector(".bg-\\[\\#0A0A0A\\]");if(!e||!t||!s||!n)return;function a(){t.classList.remove("hidden"),t.offsetHeight,n.classList.add("opacity-100"),s.classList.remove("translate-y-full"),document.body.classList.add("overflow-hidden")}function i(){n.classList.remove("opacity-100"),s.classList.add("translate-y-full"),setTimeout(()=>{t.classList.add("hidden"),document.body.classList.remove("overflow-hidden")},300)}e.addEventListener("click",r=>{r.preventDefault(),a()});const c=document.getElementById("close-mobile-filters");c&&c.addEventListener("click",r=>{r.preventDefault(),i()}),t.addEventListener("click",r=>{r.target===t&&i()}),document.addEventListener("keydown",r=>{r.key==="Escape"&&!t.classList.contains("hidden")&&i()});const o=document.getElementById("reset-filters");o&&o.addEventListener("click",r=>{r.preventDefault(),re(),V()});const l=document.getElementById("apply-filters");l&&l.addEventListener("click",r=>{r.preventDefault(),i(),b()})}function V(){const e=ie();I&&(e>0?(I.textContent=`${e} active`,I.classList.remove("hidden")):I.classList.add("hidden"))}function ie(){let e=0;return E&&e++,v&&e++,localStorage.getItem("currentSort")&&e++,e}function re(){E="",v=null,localStorage.removeItem("currentSort"),document.querySelectorAll(".status-filter-btn div").forEach(e=>{e.classList.remove("bg-black/40")}),document.querySelectorAll(".games-filter-btn div").forEach(e=>{e.classList.remove("border-emerald-500/20","bg-black/40"),e.classList.add("border-white/5","bg-black/20")}),document.querySelectorAll(".sort-option").forEach(e=>{e.classList.remove("bg-white/10","text-white"),e.classList.add("text-white/70")}),b()}async function Y(){try{f=(await(await fetch("data/resources.json")).json()).sources,await ce(),b(f),H()}catch{}}async function ce(){try{const e=q(P,"sources"),s=(await D(e)).val();s&&(f=f.map(n=>{var r;const a=n.url.replace(/[^a-zA-Z0-9]/g,"_"),i=((r=s[a])==null?void 0:r.stats)||{installs:0,copies:0,activity:[]},c=Array.isArray(i.activity)?i.activity:[],o=Date.now(),l=c.filter(d=>o-d<F).length;return{...n,stats:{...i,recentActivity:l,activity:c}}}),f.forEach(n=>{z(n.url,n.stats)}))}catch{}}function N(e){document.querySelector("main").classList.add("blur-sm","transition-all","duration-200");const t=u.t.bind(u),s=document.createElement("div");s.className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in p-4",s.innerHTML=`
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
    `,document.body.appendChild(s);const n=()=>{document.querySelector("main").classList.remove("blur-sm"),s.remove()};s.querySelector(".cancel-btn").addEventListener("click",()=>{n(),e(!1)}),s.querySelector(".proceed-btn").addEventListener("click",()=>{n(),e(!0)}),s.querySelector(".fixed.inset-0").addEventListener("click",a=>{a.target===a.currentTarget&&(n(),e(!1))})}function Z(e){var p,g,h,C;const t=u.getCurrentLocale(),n=(((p=u.translations[t])==null?void 0:p.sources)||{})[e.title]||{title:e.title,description:e.description},a=e.status.includes("Use At Your Own Risk"),i=e.stats||{installs:0,copies:0,recentActivity:0},c=parseInt(i.recentActivity||0),o=document.createElement("div");o.className="source-card animate-fade-in rounded-xl",o.dataset.url=e.url,o.dataset.name=e.title,o.dataset.copies=((g=e.stats)==null?void 0:g.copies)||0,o.dataset.installs=((h=e.stats)==null?void 0:h.installs)||0,o.dataset.activity=((C=e.stats)==null?void 0:C.recentActivity)||0;const l=e.status.map(x=>{const y=x.toLowerCase().replace(/\s+/g,"-"),L={trusted:{color:"emerald",icon:"shield",key:"trusted"},"safe-for-use":{color:"teal",icon:"check-circle",key:"safeForUse"},"use-at-your-own-risk":{color:"red",icon:"exclamation-triangle",key:"useAtOwnRisk"},russian:{color:"indigo",icon:"globe",key:"russian"}}[y]||{color:"gray",icon:"circle",key:y};return`
            <span class="inline-flex items-center gap-1.5 px-2 py-1 rounded-md 
                         bg-${L.color}-500/10 border border-${L.color}-500/20 
                         text-${L.color}-400 text-xs backdrop-blur-sm status-badge">
                <i class="fas fa-${L.icon} text-[10px]"></i>
                ${u.t(`status.${L.key}`)}
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
                            ${u.t("common.added")} ${ge(e.addedDate)}
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
                                 hover:scale-[1.02] backdrop-blur-sm" data-url="${e.url}">
                        <i class="fas fa-copy text-[10px]"></i>
                        ${u.t("common.copy")}
                    </button>
                </div>
            </div>
        </div>
    `;const r=o.querySelector(".install-btn"),d=o.querySelector(".copy-btn");return r&&r.addEventListener("click",async()=>{const x=async()=>{G(r,"loading");const y=await O(e.url,"install");if(G(r,y?"success":"rate-limited"),y){const L=encodeURIComponent(e.url);window.location.href=`hydralauncher://install-source?urls=${L}`}};e.status&&e.status.includes("Use At Your Own Risk")?N(y=>{y&&x()}):x()}),d&&d.addEventListener("click",async()=>{const x=async()=>{await O(e.url,"copy")&&(navigator.clipboard.writeText(e.url),d.innerHTML='<i class="fas fa-check text-[10px]"></i> '+u.t("sourceCard.copied"),setTimeout(()=>{d.innerHTML='<i class="fas fa-copy text-[10px]"></i> '+u.t("sourceCard.copy")},2e3))};a?N(y=>{y&&x()}):x()}),z(e.url,e.stats),o.dataset.copies=i.copies||0,o.dataset.installs=i.installs||0,o.dataset.activity=c,o}let A="wide";function J(){const e=window.innerWidth;return e>=1536?"wide":e>=1024?"desktop":e>=640?"tablet":"mobile"}let R;window.addEventListener("resize",()=>{clearTimeout(R),R=setTimeout(()=>{T();const e=J();if(A!==e){const s=j(),n=B(),a=Math.ceil(s.length/n);if(A==="wide"&&e==="desktop"){const i=(m-1)*S.desktop;m=Math.floor(i/S.desktop)+1}A=e,m=Math.min(Math.max(1,m),a),b(s),n<B()&&window.scrollTo({top:0,behavior:"smooth"})}},100)});function le(e,t){return[...e].sort((s,n)=>{var a,i,c,o,l,r;switch(t){case"hot":const d=((a=s.stats)==null?void 0:a.recentActivity)||0;return(((i=n.stats)==null?void 0:i.recentActivity)||0)-d;case"new":return new Date(n.addedDate)-new Date(s.addedDate);case"most-copies":const g=((c=s.stats)==null?void 0:c.copies)||0;return(((o=n.stats)==null?void 0:o.copies)||0)-g;case"most-installs":const C=((l=s.stats)==null?void 0:l.installs)||0;return(((r=n.stats)==null?void 0:r.installs)||0)-C;case"name-asc":return s.title.localeCompare(n.title);case"name-desc":return n.title.localeCompare(s.title);default:return 0}})}function b(e=null){const t=document.getElementById("sources-container");if(!t)return;t.innerHTML="";let s=e||j();const n=localStorage.getItem("currentSort");n&&(s=le(s,n)),console.log("Displaying sources with stats:",s),A=J();const a=B(),i=Math.ceil(s.length/a);m=Math.min(Math.max(1,m),i);const c=(m-1)*a,o=Math.min(c+a,s.length);s.slice(c,o).forEach(r=>{const d=Z(r);t.appendChild(d)}),de(i),u.updatePageContent()}function B(){const e=window.innerWidth;return e>=2560?S.wide:e>=1024?S.desktop:e>=640?S.tablet:S.mobile}function de(e){const t=document.getElementById("pagination");if(!t)return;let s="";s+=`
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
    `,t.innerHTML=s}window.changePage=function(e){if(e<1)return;const t=j(),s=Math.ceil(t.length/B());e>s||(m=e,b(t),window.scrollTo({top:0,behavior:"smooth"}))};document.querySelectorAll(".status-filter-btn").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.status;document.querySelectorAll(".status-filter-btn").forEach(s=>{s.querySelector("div").classList.remove("bg-black/40")}),E===t?E="":(E=t,e.querySelector("div").classList.add("bg-black/40")),m=1,b(),H(),dispatchFiltersChanged()})});document.querySelectorAll(".games-filter-btn").forEach(e=>{e.addEventListener("click",()=>{const t=parseInt(e.dataset.min),s=parseInt(e.dataset.max);if(document.querySelectorAll(".games-filter-btn div").forEach(n=>{n.classList.remove("border-emerald-500/20","bg-black/40"),n.classList.add("border-white/5","bg-black/20")}),v&&v.min===t&&v.max===s)v=null;else{v={min:t,max:s};const n=e.querySelector("div");n.classList.remove("border-white/5","bg-black/20"),n.classList.add("border-emerald-500/20","bg-black/40")}m=1,b(),H(),V(),dispatchFiltersChanged()})});function H(){const e={};f.forEach(t=>{t.status.forEach(s=>{e[s]=(e[s]||0)+1})}),document.querySelectorAll(".status-filter-btn").forEach(t=>{const s=t.dataset.status,n=t.querySelector(".text-white\\/40");n&&(n.textContent=e[s]||0)}),document.querySelectorAll(".games-filter-btn").forEach(t=>{const s=parseInt(t.dataset.min),n=parseInt(t.dataset.max),a=f.filter(o=>{const l=parseInt(o.gamesCount);return l>=s&&l<=n}).length,i=t.querySelector(".text-white\\/40");i&&(i.textContent=a);const c=t.querySelector(".bg-emerald-500\\/50");if(c){const o=Math.max(...Array.from(document.querySelectorAll(".games-filter-btn")).map(r=>{const d=parseInt(r.dataset.min),p=parseInt(r.dataset.max);return f.filter(g=>{const h=parseInt(g.gamesCount);return h>=d&&h<=p}).length})),l=o>0?a/o*100:0;c.style.width=`${l}%`}})}document.getElementById("search").addEventListener("input",e=>{const t=e.target.value.toLowerCase(),s=document.getElementById("sources-container");s.innerHTML="",f.filter(a=>(activeStatuses.size===0||a.status.some(i=>activeStatuses.has(i)))&&(a.title.toLowerCase().includes(t)||a.description.toLowerCase().includes(t)||a.url.toLowerCase().includes(t))).forEach((a,i)=>{const c=Z(a);c.style.setProperty("--i",i+1),s.appendChild(c)})});const K=document.getElementById("sort-dropdown-btn"),$=document.getElementById("sort-dropdown"),ue=document.getElementById("current-sort");K.addEventListener("click",()=>{$.classList.toggle("hidden")});document.addEventListener("click",e=>{!K.contains(e.target)&&!$.contains(e.target)&&$.classList.add("hidden")});document.querySelectorAll(".sort-option").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.sort;switch(ue.textContent=e.textContent.trim(),$.classList.add("hidden"),t){case"high-to-low":sortGamesFilters(!1);break;case"low-to-high":sortGamesFilters(!0);break;case"most-sources":me();break;case"most-popular":fe();break}})});function me(){const e=document.querySelector(".games-filter-btn").parentNode,t=Array.from(e.querySelectorAll(".games-filter-btn"));t.sort((s,n)=>{const a=parseInt(s.querySelector(".text-white\\/40").textContent);return parseInt(n.querySelector(".text-white\\/40").textContent)-a}),t.forEach(s=>s.remove()),t.forEach(s=>e.appendChild(s))}function fe(){const e=JSON.parse(localStorage.getItem("sourceStats")||"{}"),t=document.querySelector(".games-filter-btn").parentNode,s=Array.from(t.querySelectorAll(".games-filter-btn"));s.sort((n,a)=>{var p,g;const i=((p=f.find(h=>h.gamesCount===n.dataset.min))==null?void 0:p.url)||"",c=((g=f.find(h=>h.gamesCount===a.dataset.min))==null?void 0:g.url)||"",o=e[i]||{installs:0,copies:0},l=e[c]||{installs:0,copies:0},r=o.installs+o.copies;return l.installs+l.copies-r}),s.forEach(n=>n.remove()),s.forEach(n=>t.appendChild(n))}function ge(e){const t=new Date(e),n=Math.abs(new Date-t),a=Math.floor(n/(1e3*60*60*24)),i=u.t.bind(u);if(a===0)return i("common.date.today");if(a===1)return i("common.date.yesterday");if(a<30)return i("common.date.daysAgo",{days:a});{const c={year:"numeric",month:"short",day:"numeric"};return`${i("common.date.on")} ${t.toLocaleDateString(u.getCurrentLocale(),c)}`}}document.addEventListener("DOMContentLoaded",()=>{Y(),sortGamesFilters(!1)});te.addEventListener("click",()=>{w.classList.remove("hidden"),document.body.style.overflow="hidden"});_.addEventListener("click",()=>{w.classList.add("hidden"),document.body.style.overflow=""});w.addEventListener("click",e=>{e.target===w&&_.click()});document.addEventListener("keydown",e=>{e.key==="Escape"&&!w.classList.contains("hidden")&&(w.classList.add("hidden"),document.body.style.overflow="")});se.addEventListener("click",()=>{k.classList.remove("hidden"),document.body.style.overflow="hidden"});ne.addEventListener("click",()=>{k.classList.add("hidden"),document.body.style.overflow=""});k.addEventListener("click",e=>{e.target===k&&(k.classList.add("hidden"),document.body.style.overflow="")});document.addEventListener("keydown",e=>{e.key==="Escape"&&(w.classList.contains("hidden")||(w.classList.add("hidden"),document.body.style.overflow=""),k.classList.contains("hidden")||(k.classList.add("hidden"),document.body.style.overflow=""))});function M(e,t,s){const n=new Date;n.setTime(n.getTime()+s*24*60*60*1e3),document.cookie=`${e}=${t};expires=${n.toUTCString()};path=/`}function Q(e){const t=e+"=",s=document.cookie.split(";");for(let n=0;n<s.length;n++){let a=s[n];for(;a.charAt(0)===" ";)a=a.substring(1,a.length);if(a.indexOf(t)===0)return a.substring(t.length,a.length)}return null}async function O(e,t){try{const s=e.replace(/[^a-zA-Z0-9]/g,"_"),n=`${t}_${s}`;if(Q(n))return!0;const a=q(P,`sources/${s}/stats`),c=(await D(a)).val()||{installs:0,copies:0,activity:[]},o=Date.now(),r=(Array.isArray(c.activity)?c.activity:[]).filter(g=>o-g<F);r.push(o);const d={installs:parseInt(c.installs||0)+(t==="install"?1:0),copies:parseInt(c.copies||0)+(t==="copy"?1:0),activity:r,lastUpdated:o};await U(a,d),M(n,"true",t==="install"?.003472222:347222e-9),d.recentActivity=r.length,z(e,d);const p=f.findIndex(g=>g.url===e);return p!==-1&&(f[p].stats=d),!0}catch{return!1}}function z(e,t=null){const s=document.querySelectorAll(".source-card"),n=Array.from(s).find(a=>a.dataset.url===e);if(n){const a=n.querySelector(".source-stats");if(a){const i=parseInt((t==null?void 0:t.installs)||0),c=parseInt((t==null?void 0:t.copies)||0),o=parseInt((t==null?void 0:t.recentActivity)||0);a.innerHTML=`
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
            `,setTimeout(()=>{e.disabled=!1,e.innerHTML=s},2e3);break;default:e.disabled=!1,e.innerHTML=s}}function j(){return f.filter(e=>{const t=!E||e.status.includes(E),s=parseInt(e.gamesCount),n=!v||s>=v.min&&s<=v.max;return t&&n})}function pe(){const e=document.getElementById("cookie-consent");Q("cookie-consent")?e.style.display="none":(e.style.display="block",setTimeout(()=>{e.classList.remove("translate-y-full")},500))}document.getElementById("accept-cookies").addEventListener("click",()=>{const e=document.getElementById("cookie-consent");e.classList.add("translate-y-full"),e.addEventListener("transitionend",()=>{e.style.display="none"},{once:!0}),M("cookie-consent","accepted",365)});async function he(e){try{const t=q(P,`sources/${e}/stats`),n=(await D(t)).val();if(n&&n.activity){const a=n.activity.filter(i=>Date.now()-i<F);a.length!==n.activity.length&&await U(t,{activity:a})}}catch{}}function ye(){const e=document.getElementById("suggest-modal"),t=document.getElementById("suggest-btn"),s=document.getElementById("close-suggest");t&&t.addEventListener("click",()=>{e.classList.remove("hidden")}),s&&s.addEventListener("click",()=>{e.classList.add("hidden")}),e&&e.addEventListener("click",n=>{n.target===e&&e.classList.add("hidden")})}function ve(){const e=document.getElementById("search");if(e){const t=()=>{const n=window.innerWidth<640?"header.searchMobile":"header.search";e.placeholder=u.t(n)};t(),window.addEventListener("resize",t),document.addEventListener("languageChanged",t)}}function be(){setInterval(()=>{f.forEach(e=>{const t=e.url.replace(/[^a-zA-Z0-9]/g,"_");he(t)})},60*60*1e3)}document.addEventListener("languageChanged",()=>{b()});
