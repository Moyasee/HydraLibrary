import{i as d,r as P,d as D,g as F,u as G}from"./index-DvivCdrJ.js";document.body.classList.add("preloading");function ee(){const e=document.getElementById("preloader"),t=e.querySelector(".loading-progress");let s=0;const n=setInterval(()=>{s+=Math.random()*15,s>100?(s=100,clearInterval(n),t.style.width="100%",setTimeout(()=>{e.style.transition="opacity 0.5s ease-out",e.style.opacity="0",setTimeout(()=>{e.remove(),document.body.classList.remove("preloading"),d.updatePageContent(),_()},500)},500)):t.style.width=`${s}%`},100)}function _(){console.log("Starting language switcher initialization");const e=document.getElementById("language-switcher"),t=document.getElementById("language-dropdown");if(console.log("Initializing language switcher:",{languageSwitcher:e,languageDropdown:t}),!e||!t){console.error("Language switcher elements not found:",{languageSwitcher:e,languageDropdown:t});return}const s=e.cloneNode(!0);e.parentNode.replaceChild(s,e);const n=d.getCurrentLocale(),a=s.querySelector("span");if(console.log("Initial language setup:",{currentLang:n,langSpan:a}),a){const i={en:"English",ru:"Русский","pt-br":"Português"};a.textContent=i[n]||"English"}s.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation(),console.log("Language switcher clicked");const l=t.classList.contains("hidden");l?(t.classList.remove("hidden"),s.classList.add("bg-white/10")):(t.classList.add("hidden"),s.classList.remove("bg-white/10")),console.log("Dropdown toggled, hidden:",!l)});const o=t.querySelectorAll("button");console.log("Language buttons found:",o.length),o.forEach(i=>{i.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation();const c=i.dataset.lang;if(console.log("Language button clicked:",c),d.setLocale(c),t.classList.add("hidden"),s.classList.remove("bg-white/10"),a){const u={en:"English",ru:"Русский","pt-br":"Português"};a.textContent=u[c]||"English"}b()})}),document.addEventListener("click",i=>{s.contains(i.target)||(console.log("Clicking outside, closing dropdown"),t.classList.add("hidden"),s.classList.remove("bg-white/10"))});const r=()=>{const i=e.querySelector("span"),l={en:"English",ru:"Русский","pt-br":"Português"};i.textContent=l[d.currentLocale]||"English"};document.addEventListener("languageChanged",r)}document.addEventListener("DOMContentLoaded",()=>{ee(),pe();const e=document.getElementById("accept-cookies"),t=document.getElementById("reject-cookies"),s=document.getElementById("cookie-consent");e&&e.addEventListener("click",()=>{n(),T("cookie-consent","accepted",365)}),t&&t.addEventListener("click",()=>{n(),T("cookie-consent","rejected",365)});function n(){s.classList.add("translate-y-full"),s.addEventListener("transitionend",()=>{s.style.display="none"},{once:!0})}te(),setTimeout(()=>{Z()},300),ye(),ve(),be(),q(),oe(),initializeMobileFilters();let a;window.addEventListener("resize",()=>{clearTimeout(a),a=setTimeout(()=>{q()},100)}),d.updatePageContent(),_()});function te(){document.querySelectorAll(".sort-option").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".sort-option").forEach(n=>{n.classList.remove("bg-white/10","text-white"),n.classList.add("text-white/70")}),t.classList.remove("text-white/70"),t.classList.add("bg-white/10","text-white");const s=t.dataset.sort;localStorage.setItem("currentSort",s),b()})});const e=localStorage.getItem("currentSort");if(e){const t=document.querySelector(`.sort-option[data-sort="${e}"]`);t&&(t.classList.remove("text-white/70"),t.classList.add("bg-white/10","text-white"))}}let g=[],L="",v=null,m=1;const k={mobile:4,tablet:6,desktop:9,wide:15},w=document.getElementById("about-modal"),se=document.getElementById("about-btn"),V=document.getElementById("close-about"),E=document.getElementById("suggest-modal"),ne=document.getElementById("suggest-btn"),ae=document.getElementById("close-suggest"),B=24*60*60*1e3;document.getElementById("mobile-filters-btn");document.getElementById("mobile-filters-modal");document.getElementById("close-mobile-filters");document.getElementById("mobile-filters-content");document.getElementById("reset-filters");document.getElementById("apply-filters");const I=document.getElementById("active-filters-count"),j={tablet:768};function q(){var n;const e=document.getElementById("filters-sidebar"),t=(n=document.getElementById("mobile-filters-btn"))==null?void 0:n.parentElement;if(!e||!t){console.error("Filter elements not found:",{filtersSidebar:e,mobileFiltersBtn:t});return}const s=window.innerWidth<j.tablet;console.log("Visibility check:",{isMobile:s,width:window.innerWidth,breakpoint:j.tablet}),e.classList.toggle("hidden",s),t.classList.toggle("hidden",!s)}function oe(){const e=document.getElementById("mobile-filters-btn"),t=document.getElementById("mobile-filters-modal"),s=t==null?void 0:t.querySelector(".flex.flex-col.bg-\\[\\#111\\]"),n=t==null?void 0:t.querySelector(".bg-\\[\\#0A0A0A\\]");if(!e||!t||!s||!n){console.error("Required mobile filter elements not found");return}function a(){t.classList.remove("hidden"),t.offsetHeight,n.classList.add("opacity-100"),s.classList.remove("translate-y-full"),document.body.classList.add("overflow-hidden")}function o(){n.classList.remove("opacity-100"),s.classList.add("translate-y-full"),setTimeout(()=>{t.classList.add("hidden"),document.body.classList.remove("overflow-hidden")},300)}e.addEventListener("click",c=>{c.preventDefault(),a()});const r=document.getElementById("close-mobile-filters");r&&r.addEventListener("click",c=>{c.preventDefault(),o()}),t.addEventListener("click",c=>{c.target===t&&o()}),document.addEventListener("keydown",c=>{c.key==="Escape"&&!t.classList.contains("hidden")&&o()});const i=document.getElementById("reset-filters");i&&i.addEventListener("click",c=>{c.preventDefault(),re(),Y()});const l=document.getElementById("apply-filters");l&&l.addEventListener("click",c=>{c.preventDefault(),o(),b()})}function Y(){const e=ie();I&&(e>0?(I.textContent=`${e} active`,I.classList.remove("hidden")):I.classList.add("hidden"))}function ie(){let e=0;return L&&e++,v&&e++,localStorage.getItem("currentSort")&&e++,e}function re(){L="",v=null,localStorage.removeItem("currentSort"),document.querySelectorAll(".status-filter-btn div").forEach(e=>{e.classList.remove("bg-black/40")}),document.querySelectorAll(".games-filter-btn div").forEach(e=>{e.classList.remove("border-emerald-500/20","bg-black/40"),e.classList.add("border-white/5","bg-black/20")}),document.querySelectorAll(".sort-option").forEach(e=>{e.classList.remove("bg-white/10","text-white"),e.classList.add("text-white/70")}),b()}async function Z(){try{g=(await(await fetch("data/resources.json")).json()).sources,await ce(),b(g),H()}catch(e){console.error("Error loading sources:",e)}}async function ce(){try{const e=P(D,"sources"),s=(await F(e)).val();console.log("Raw Firebase stats:",s),s&&(g=g.map(n=>{var c;const a=n.url.replace(/[^a-zA-Z0-9]/g,"_"),o=((c=s[a])==null?void 0:c.stats)||{installs:0,copies:0,activity:[]},r=Array.isArray(o.activity)?o.activity:[],i=Date.now(),l=r.filter(u=>i-u<B).length;return console.log(`Source ${n.title} activity:`,{activity:r,recentActivity:l,now:i,window:B}),{...n,stats:{...o,recentActivity:l,activity:r}}}),g.forEach(n=>{z(n.url,n.stats)}))}catch(e){console.error("Error loading stats from Firebase:",e)}}function N(e){document.querySelector("main").classList.add("blur-sm","transition-all","duration-200");const t=d.t.bind(d),s=document.createElement("div");s.className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in p-4",s.innerHTML=`
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
    `,document.body.appendChild(s);const n=()=>{document.querySelector("main").classList.remove("blur-sm"),s.remove()};s.querySelector(".cancel-btn").addEventListener("click",()=>{n(),e(!1)}),s.querySelector(".proceed-btn").addEventListener("click",()=>{n(),e(!0)}),s.querySelector(".fixed.inset-0").addEventListener("click",a=>{a.target===a.currentTarget&&(n(),e(!1))})}function J(e){var p,f,h,C;const t=d.getCurrentLocale(),n=(((p=d.translations[t])==null?void 0:p.sources)||{})[e.title]||{title:e.title,description:e.description},a=e.status.includes("Use At Your Own Risk"),o=document.createElement("div");o.className="source-card animate-fade-in",o.dataset.url=e.url,o.dataset.name=e.title,o.dataset.copies=((f=e.stats)==null?void 0:f.copies)||0,o.dataset.installs=((h=e.stats)==null?void 0:h.installs)||0,o.dataset.activity=((C=e.stats)==null?void 0:C.recentActivity)||0;const r=e.stats||{installs:0,copies:0,recentActivity:0},i=parseInt(r.recentActivity||0);console.log("Creating card for source:",e.title,"with stats:",r);const l=e.status.map(x=>{const y=x.toLowerCase().replace(/\s+/g,"-"),S={trusted:{color:"bg-emerald-500",icon:"fa-shield",key:"trusted"},"safe-for-use":{color:"bg-blue-500",icon:"fa-check-circle",key:"safeForUse"},"use-at-your-own-risk":{color:"bg-red-500",icon:"fa-exclamation-triangle",key:"useAtOwnRisk"},russian:{color:"bg-purple-500",icon:"fa-globe",key:"russian"}}[y]||{color:"bg-gray-500",icon:"fa-circle",key:y};return`
            <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-black/20 border border-white/10 text-xs backdrop-blur-sm">
                <i class="fas ${S.icon} text-[10px] ${S.color.replace("bg-","text-")}"></i>
                ${d.t(`status.${S.key}`)}
            </span>
        `}).join("");o.innerHTML=`
        <div class="group relative h-full flex flex-col rounded-xl border ${a?"border-red-500/20":"border-white/5"} 
                    overflow-hidden backdrop-blur-sm 
                    hover:shadow-lg hover:shadow-${a?"red":"emerald"}-500/10 
                    transition-all duration-300">
            <!-- Full card background -->
            <div class="absolute inset-0 bg-gradient-to-b from-[#111]/80 to-[#111]/40"></div>
            
            <!-- Card Header -->
            <div class="p-4 relative flex-1">
                <!-- Glowing background effect -->
                <div class="absolute inset-0 bg-gradient-to-r 
                           ${a?"from-red-500/5 via-transparent to-red-500/5":"from-emerald-500/5 via-transparent to-emerald-500/5"} 
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                </div>
                
                <!-- Content -->
                <div class="relative">
                    <div class="flex items-start justify-between gap-2 mb-3">
                        <div class="flex flex-wrap gap-1">
                            ${l}
                        </div>
                        <div class="flex items-center gap-1.5 text-white/40 text-xs shrink-0 
                                  bg-black/30 px-2.5 py-1 rounded-full border border-white/5
                                  ${a?"group-hover:border-red-500/20":"group-hover:border-emerald-500/20"}
                                  transition-colors duration-300">
                            <i class="fas fa-gamepad ${a?"text-red-500/50":"text-emerald-500/50"} text-[10px]"></i>
                            <span class="text-white/70" data-i18n-params='{"count": "${e.gamesCount}"}'>
                                ${e.gamesCount} ${d.t("sourceCard.games")}
                            </span>
                        </div>
                    </div>
                    
                    <div class="flex items-start gap-3">
                        <div class="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
                            ${a?"bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/20":"bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20"} border group-hover:scale-110 transition-transform duration-300">
                            <i class="fas ${a?"fa-triangle-exclamation text-red-500/70":"fa-book-open text-emerald-500/70"} text-lg"></i>
                        </div>
                        <div class="flex-1 min-w-0">
                            <h3 class="text-base font-medium text-white group-hover:text-${a?"red":"emerald"}-400 
                                       transition-colors duration-300 mb-1.5 truncate">
                                ${n.title}
                            </h3>
                            <p class="text-white/60 text-xs leading-relaxed line-clamp-2 mb-2">${n.description}</p>
                            <div class="flex items-center gap-2 text-white/40 text-xs">
                                <span class="flex items-center gap-1">
                                    <i class="fas fa-calendar-alt text-[10px]"></i>
                                    ${d.t("common.added")} ${fe(e.addedDate)}
                                </span>
                                <span class="w-1 h-1 rounded-full bg-white/20"></span>
                                <div class="source-stats flex items-center gap-3">
                                    <span class="flex items-center gap-1">
                                        <i class="fas fa-fire text-[10px] ${i>0?"text-red-500":""}"></i>
                                        ${i}
                                    </span>
                                    <span class="flex items-center gap-1">
                                        <i class="fas fa-download text-[10px]"></i>
                                        ${r.installs||0}
                                    </span>
                                    <span class="flex items-center gap-1">
                                        <i class="fas fa-copy text-[10px]"></i>
                                        ${r.copies||0}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card Footer -->
            <div class="relative border-t ${a?"border-red-500/10":"border-white/5"} 
                        p-3 bg-black/30">
                <div class="flex gap-2">
                    <button class="install-btn flex-1 ${a?"bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/20":"bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/20"} border rounded-lg px-4 py-2 text-xs font-medium transition-all duration-200 
                       flex items-center justify-center gap-2 min-h-[36px] disabled:opacity-50 
                       disabled:cursor-not-allowed hover:scale-[1.02]">
                        <i class="fas fa-download text-[10px]"></i>
                        ${d.t("common.install")}
                    </button>
                    <button class="copy-btn shrink-0 bg-white/5 hover:bg-white/10 text-white/70 
                                 border border-white/10 rounded-lg px-4 py-2 text-xs transition-all duration-200 
                                 flex items-center justify-center gap-2 hover:scale-[1.02]" 
                            data-url="${e.url}">
                        <i class="fas fa-copy text-[10px]"></i>
                        ${d.t("common.copy")}
                    </button>
                </div>
            </div>
        </div>
    `;const c=o.querySelector(".install-btn"),u=o.querySelector(".copy-btn");return c&&c.addEventListener("click",async()=>{const x=async()=>{U(c,"loading");const y=await W(e.url,"install");if(U(c,y?"success":"rate-limited"),y){const S=encodeURIComponent(e.url);window.location.href=`hydralauncher://install-source?urls=${S}`}};e.status&&e.status.includes("Use At Your Own Risk")?N(y=>{y&&x()}):x()}),u&&u.addEventListener("click",async()=>{const x=async()=>{await W(e.url,"copy")&&(navigator.clipboard.writeText(e.url),u.innerHTML='<i class="fas fa-check text-[10px]"></i> '+d.t("sourceCard.copied"),setTimeout(()=>{u.innerHTML='<i class="fas fa-copy text-[10px]"></i> '+d.t("sourceCard.copy")},2e3))};a?N(y=>{y&&x()}):x()}),z(e.url,e.stats),o.dataset.copies=r.copies||0,o.dataset.installs=r.installs||0,o.dataset.activity=i,o}let A="wide";function K(){const e=window.innerWidth;return e>=1536?"wide":e>=1024?"desktop":e>=640?"tablet":"mobile"}let O;window.addEventListener("resize",()=>{clearTimeout(O),O=setTimeout(()=>{q();const e=K();if(A!==e){const s=R(),n=$(),a=Math.ceil(s.length/n);if(A==="wide"&&e==="desktop"){const o=(m-1)*k.desktop;m=Math.floor(o/k.desktop)+1}A=e,m=Math.min(Math.max(1,m),a),b(s),n<$()&&window.scrollTo({top:0,behavior:"smooth"})}},100)});function le(e,t){return[...e].sort((s,n)=>{var a,o,r,i,l,c;switch(t){case"hot":const u=((a=s.stats)==null?void 0:a.recentActivity)||0;return(((o=n.stats)==null?void 0:o.recentActivity)||0)-u;case"new":return new Date(n.addedDate)-new Date(s.addedDate);case"most-copies":const f=((r=s.stats)==null?void 0:r.copies)||0;return(((i=n.stats)==null?void 0:i.copies)||0)-f;case"most-installs":const C=((l=s.stats)==null?void 0:l.installs)||0;return(((c=n.stats)==null?void 0:c.installs)||0)-C;case"name-asc":return s.title.localeCompare(n.title);case"name-desc":return n.title.localeCompare(s.title);default:return 0}})}function b(e=null){const t=document.getElementById("sources-container");if(!t)return;t.innerHTML="";let s=e||R();const n=localStorage.getItem("currentSort");n&&(s=le(s,n)),console.log("Displaying sources with stats:",s),A=K();const a=$(),o=Math.ceil(s.length/a);m=Math.min(Math.max(1,m),o);const r=(m-1)*a,i=Math.min(r+a,s.length);s.slice(r,i).forEach(c=>{const u=J(c);t.appendChild(u)}),de(o),d.updatePageContent()}function $(){const e=window.innerWidth;return e>=2560?k.wide:e>=1024?k.desktop:e>=640?k.tablet:k.mobile}function de(e){const t=document.getElementById("pagination");if(!t)return;let s="";s+=`
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
    `,t.innerHTML=s}window.changePage=function(e){if(e<1)return;const t=R(),s=Math.ceil(t.length/$());e>s||(m=e,b(t),window.scrollTo({top:0,behavior:"smooth"}))};document.querySelectorAll(".status-filter-btn").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.status;document.querySelectorAll(".status-filter-btn").forEach(s=>{s.querySelector("div").classList.remove("bg-black/40")}),L===t?L="":(L=t,e.querySelector("div").classList.add("bg-black/40")),m=1,b(),H(),dispatchFiltersChanged()})});document.querySelectorAll(".games-filter-btn").forEach(e=>{e.addEventListener("click",()=>{const t=parseInt(e.dataset.min),s=parseInt(e.dataset.max);if(document.querySelectorAll(".games-filter-btn div").forEach(n=>{n.classList.remove("border-emerald-500/20","bg-black/40"),n.classList.add("border-white/5","bg-black/20")}),v&&v.min===t&&v.max===s)v=null;else{v={min:t,max:s};const n=e.querySelector("div");n.classList.remove("border-white/5","bg-black/20"),n.classList.add("border-emerald-500/20","bg-black/40")}m=1,b(),H(),Y(),dispatchFiltersChanged()})});function H(){const e={};g.forEach(t=>{t.status.forEach(s=>{e[s]=(e[s]||0)+1})}),document.querySelectorAll(".status-filter-btn").forEach(t=>{const s=t.dataset.status,n=t.querySelector(".text-white\\/40");n&&(n.textContent=e[s]||0)}),document.querySelectorAll(".games-filter-btn").forEach(t=>{const s=parseInt(t.dataset.min),n=parseInt(t.dataset.max),a=g.filter(i=>{const l=parseInt(i.gamesCount);return l>=s&&l<=n}).length,o=t.querySelector(".text-white\\/40");o&&(o.textContent=a);const r=t.querySelector(".bg-emerald-500\\/50");if(r){const i=Math.max(...Array.from(document.querySelectorAll(".games-filter-btn")).map(c=>{const u=parseInt(c.dataset.min),p=parseInt(c.dataset.max);return g.filter(f=>{const h=parseInt(f.gamesCount);return h>=u&&h<=p}).length})),l=i>0?a/i*100:0;r.style.width=`${l}%`}})}document.getElementById("search").addEventListener("input",e=>{const t=e.target.value.toLowerCase(),s=document.getElementById("sources-container");s.innerHTML="",g.filter(a=>(activeStatuses.size===0||a.status.some(o=>activeStatuses.has(o)))&&(a.title.toLowerCase().includes(t)||a.description.toLowerCase().includes(t)||a.url.toLowerCase().includes(t))).forEach((a,o)=>{const r=J(a);r.style.setProperty("--i",o+1),s.appendChild(r)})});const Q=document.getElementById("sort-dropdown-btn"),M=document.getElementById("sort-dropdown"),ue=document.getElementById("current-sort");Q.addEventListener("click",()=>{M.classList.toggle("hidden")});document.addEventListener("click",e=>{!Q.contains(e.target)&&!M.contains(e.target)&&M.classList.add("hidden")});document.querySelectorAll(".sort-option").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.sort;switch(ue.textContent=e.textContent.trim(),M.classList.add("hidden"),t){case"high-to-low":sortGamesFilters(!1);break;case"low-to-high":sortGamesFilters(!0);break;case"most-sources":me();break;case"most-popular":ge();break}})});function me(){const e=document.querySelector(".games-filter-btn").parentNode,t=Array.from(e.querySelectorAll(".games-filter-btn"));t.sort((s,n)=>{const a=parseInt(s.querySelector(".text-white\\/40").textContent);return parseInt(n.querySelector(".text-white\\/40").textContent)-a}),t.forEach(s=>s.remove()),t.forEach(s=>e.appendChild(s))}function ge(){const e=JSON.parse(localStorage.getItem("sourceStats")||"{}"),t=document.querySelector(".games-filter-btn").parentNode,s=Array.from(t.querySelectorAll(".games-filter-btn"));s.sort((n,a)=>{var p,f;const o=((p=g.find(h=>h.gamesCount===n.dataset.min))==null?void 0:p.url)||"",r=((f=g.find(h=>h.gamesCount===a.dataset.min))==null?void 0:f.url)||"",i=e[o]||{installs:0,copies:0},l=e[r]||{installs:0,copies:0},c=i.installs+i.copies;return l.installs+l.copies-c}),s.forEach(n=>n.remove()),s.forEach(n=>t.appendChild(n))}function fe(e){const t=new Date(e),n=Math.abs(new Date-t),a=Math.floor(n/(1e3*60*60*24)),o=d.t.bind(d);if(a===0)return o("common.date.today");if(a===1)return o("common.date.yesterday");if(a<30)return o("common.date.daysAgo",{days:a});{const r={year:"numeric",month:"short",day:"numeric"};return`${o("common.date.on")} ${t.toLocaleDateString(d.getCurrentLocale(),r)}`}}document.addEventListener("DOMContentLoaded",()=>{Z(),sortGamesFilters(!1)});se.addEventListener("click",()=>{w.classList.remove("hidden"),document.body.style.overflow="hidden"});V.addEventListener("click",()=>{w.classList.add("hidden"),document.body.style.overflow=""});w.addEventListener("click",e=>{e.target===w&&V.click()});document.addEventListener("keydown",e=>{e.key==="Escape"&&!w.classList.contains("hidden")&&(w.classList.add("hidden"),document.body.style.overflow="")});ne.addEventListener("click",()=>{E.classList.remove("hidden"),document.body.style.overflow="hidden"});ae.addEventListener("click",()=>{E.classList.add("hidden"),document.body.style.overflow=""});E.addEventListener("click",e=>{e.target===E&&(E.classList.add("hidden"),document.body.style.overflow="")});document.addEventListener("keydown",e=>{e.key==="Escape"&&(w.classList.contains("hidden")||(w.classList.add("hidden"),document.body.style.overflow=""),E.classList.contains("hidden")||(E.classList.add("hidden"),document.body.style.overflow=""))});function T(e,t,s){const n=new Date;n.setTime(n.getTime()+s*24*60*60*1e3),document.cookie=`${e}=${t};expires=${n.toUTCString()};path=/`}function X(e){const t=e+"=",s=document.cookie.split(";");for(let n=0;n<s.length;n++){let a=s[n];for(;a.charAt(0)===" ";)a=a.substring(1,a.length);if(a.indexOf(t)===0)return a.substring(t.length,a.length)}return null}async function W(e,t){try{const s=e.replace(/[^a-zA-Z0-9]/g,"_"),n=`${t}_${s}`;if(X(n))return!0;const a=P(D,`sources/${s}/stats`),r=(await F(a)).val()||{installs:0,copies:0,activity:[]},i=Date.now(),c=(Array.isArray(r.activity)?r.activity:[]).filter(f=>i-f<B);c.push(i);const u={installs:parseInt(r.installs||0)+(t==="install"?1:0),copies:parseInt(r.copies||0)+(t==="copy"?1:0),activity:c,lastUpdated:i};await G(a,u),T(n,"true",t==="install"?.003472222:347222e-9),u.recentActivity=c.length,z(e,u);const p=g.findIndex(f=>f.url===e);return p!==-1&&(g[p].stats=u),!0}catch(s){return console.error("Error tracking source usage:",s),!1}}function z(e,t=null){const s=document.querySelectorAll(".source-card"),n=Array.from(s).find(a=>a.dataset.url===e);if(n){const a=n.querySelector(".source-stats");if(a){const o=parseInt((t==null?void 0:t.installs)||0),r=parseInt((t==null?void 0:t.copies)||0),i=parseInt((t==null?void 0:t.recentActivity)||0);a.innerHTML=`
                <span class="flex items-center gap-1">
                    <i class="fas fa-fire text-[10px] ${i>0?"text-red-500":""}"></i>
                    ${i}
                </span>
                <span class="flex items-center gap-1">
                    <i class="fas fa-download text-[10px]"></i>
                    ${o}
                </span>
                <span class="flex items-center gap-1">
                    <i class="fas fa-copy text-[10px]"></i>
                    ${r}
                </span>
            `}n.dataset.copies=(t==null?void 0:t.copies)||0,n.dataset.installs=(t==null?void 0:t.installs)||0,n.dataset.activity=(t==null?void 0:t.recentActivity)||0}}function U(e,t){const s=e.innerHTML;switch(t){case"loading":e.disabled=!0,e.innerHTML=`
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
            `,setTimeout(()=>{e.disabled=!1,e.innerHTML=s},2e3);break;default:e.disabled=!1,e.innerHTML=s}}function R(){return g.filter(e=>{const t=!L||e.status.includes(L),s=parseInt(e.gamesCount),n=!v||s>=v.min&&s<=v.max;return t&&n})}function pe(){const e=document.getElementById("cookie-consent");X("cookie-consent")?e.style.display="none":(e.style.display="block",setTimeout(()=>{e.classList.remove("translate-y-full")},500))}document.getElementById("accept-cookies").addEventListener("click",()=>{const e=document.getElementById("cookie-consent");e.classList.add("translate-y-full"),e.addEventListener("transitionend",()=>{e.style.display="none"},{once:!0}),T("cookie-consent","accepted",365)});async function he(e){try{const t=P(D,`sources/${e}/stats`),n=(await F(t)).val();if(n&&n.activity){const a=n.activity.filter(o=>Date.now()-o<B);a.length!==n.activity.length&&await G(t,{activity:a})}}catch(t){console.error("Error cleaning up old activity:",t)}}function ye(){const e=document.getElementById("suggest-modal"),t=document.getElementById("suggest-btn"),s=document.getElementById("close-suggest");t&&t.addEventListener("click",()=>{e.classList.remove("hidden")}),s&&s.addEventListener("click",()=>{e.classList.add("hidden")}),e&&e.addEventListener("click",n=>{n.target===e&&e.classList.add("hidden")})}function ve(){const e=document.getElementById("search");if(e){const t=()=>{const n=window.innerWidth<640?"header.searchMobile":"header.search";e.placeholder=d.t(n)};t(),window.addEventListener("resize",t),document.addEventListener("languageChanged",t)}}function be(){setInterval(()=>{g.forEach(e=>{const t=e.url.replace(/[^a-zA-Z0-9]/g,"_");he(t)})},60*60*1e3)}document.addEventListener("languageChanged",()=>{b()});
