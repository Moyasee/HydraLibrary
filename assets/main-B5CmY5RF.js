import{c as te,i as u,r as N,d as H,g as O,u as V}from"./index-BPLH9hGV.js";document.body.classList.add("preloading");document.addEventListener("DOMContentLoaded",async()=>{await te.initialize()});function se(){const e=document.getElementById("preloader"),t=e.querySelector(".loading-progress");let s=0;const n=setInterval(()=>{s+=Math.random()*15,s>100?(s=100,clearInterval(n),t.style.width="100%",setTimeout(()=>{e.style.transition="opacity 0.5s ease-out",e.style.opacity="0",setTimeout(()=>{e.remove(),document.body.classList.remove("preloading"),u.updatePageContent(),J()},500)},500)):t.style.width=`${s}%`},100)}function J(){const e=document.getElementById("language-switcher"),t=document.getElementById("language-dropdown");if(!e||!t)return;const s=e.cloneNode(!0);e.parentNode.replaceChild(s,e);const n=u.getCurrentLocale(),a=s.querySelector("span");if(a){const i={en:"English",ru:"Русский","pt-br":"Português"};a.textContent=i[n]||"English"}s.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation(),t.classList.contains("hidden")?(t.classList.remove("hidden"),s.classList.add("bg-white/10")):(t.classList.add("hidden"),s.classList.remove("bg-white/10"))}),t.querySelectorAll("button").forEach(i=>{i.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation();const r=i.dataset.lang;if(u.setLocale(r),t.classList.add("hidden"),s.classList.remove("bg-white/10"),a){const d={en:"English",ru:"Русский","pt-br":"Português"};a.textContent=d[r]||"English"}x()})}),document.addEventListener("click",i=>{s.contains(i.target)||(t.classList.add("hidden"),s.classList.remove("bg-white/10"))});const c=()=>{const i=e.querySelector("span"),l={en:"English",ru:"Русский","pt-br":"Português"};i.textContent=l[u.currentLocale]||"English"};document.addEventListener("languageChanged",c)}document.addEventListener("DOMContentLoaded",()=>{se(),be();const e=document.getElementById("accept-cookies"),t=document.getElementById("reject-cookies"),s=document.getElementById("cookie-consent");e&&e.addEventListener("click",()=>{n(),P("cookie-consent","accepted",365)}),t&&t.addEventListener("click",()=>{n(),P("cookie-consent","rejected",365)});function n(){s.classList.add("translate-y-full"),s.addEventListener("transitionend",()=>{s.style.display="none"},{once:!0})}ne(),setTimeout(()=>{K()},300),we(),Le(),Ee(),F(),ce(),initializeMobileFilters();let a;window.addEventListener("resize",()=>{clearTimeout(a),a=setTimeout(()=>{F()},100)}),u.updatePageContent(),J()});function ne(){document.querySelectorAll(".sort-option").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".sort-option").forEach(n=>{n.classList.remove("bg-white/10","text-white"),n.classList.add("text-white/70")}),t.classList.remove("text-white/70"),t.classList.add("bg-white/10","text-white");const s=t.dataset.sort;localStorage.setItem("currentSort",s),x()})});const e=localStorage.getItem("currentSort");if(e){const t=document.querySelector(`.sort-option[data-sort="${e}"]`);t&&(t.classList.remove("text-white/70"),t.classList.add("bg-white/10","text-white"))}}let m=[],S="",w=null,p=1;const I={mobile:4,tablet:6,desktop:9,wide:15},E=document.getElementById("about-modal"),ae=document.getElementById("about-btn"),Z=document.getElementById("close-about"),k=document.getElementById("suggest-modal"),ie=document.getElementById("suggest-btn"),oe=document.getElementById("close-suggest"),M=24*60*60*1e3;document.getElementById("mobile-filters-btn");document.getElementById("mobile-filters-modal");document.getElementById("close-mobile-filters");document.getElementById("mobile-filters-content");document.getElementById("reset-filters");document.getElementById("apply-filters");const B=document.getElementById("active-filters-count"),re={tablet:768};function F(){var n;const e=document.getElementById("filters-sidebar"),t=(n=document.getElementById("mobile-filters-btn"))==null?void 0:n.parentElement;if(!e||!t)return;const s=window.innerWidth<re.tablet;e.classList.toggle("hidden",s),t.classList.toggle("hidden",!s)}function ce(){const e=document.getElementById("mobile-filters-btn"),t=document.getElementById("mobile-filters-modal"),s=t==null?void 0:t.querySelector(".flex.flex-col.bg-\\[\\#111\\]"),n=t==null?void 0:t.querySelector(".bg-\\[\\#0A0A0A\\]");if(!e||!t||!s||!n)return;function a(){t.classList.remove("hidden"),t.offsetHeight,n.classList.add("opacity-100"),s.classList.remove("translate-y-full"),document.body.classList.add("overflow-hidden")}function o(){n.classList.remove("opacity-100"),s.classList.add("translate-y-full"),setTimeout(()=>{t.classList.add("hidden"),document.body.classList.remove("overflow-hidden")},300)}e.addEventListener("click",r=>{r.preventDefault(),a()});const c=document.getElementById("close-mobile-filters");c&&c.addEventListener("click",r=>{r.preventDefault(),o()}),t.addEventListener("click",r=>{r.target===t&&o()}),document.addEventListener("keydown",r=>{r.key==="Escape"&&!t.classList.contains("hidden")&&o()});const i=document.getElementById("reset-filters");i&&i.addEventListener("click",r=>{r.preventDefault(),de(),Y()});const l=document.getElementById("apply-filters");l&&l.addEventListener("click",r=>{r.preventDefault(),o(),x()})}function Y(){const e=le();B&&(e>0?(B.textContent=`${e} active`,B.classList.remove("hidden")):B.classList.add("hidden"))}function le(){let e=0;return S&&e++,w&&e++,localStorage.getItem("currentSort")&&e++,e}function de(){S="",w=null,localStorage.removeItem("currentSort"),document.querySelectorAll(".status-filter-btn div").forEach(e=>{e.classList.remove("bg-black/40")}),document.querySelectorAll(".games-filter-btn div").forEach(e=>{e.classList.remove("border-emerald-500/20","bg-black/40"),e.classList.add("border-white/5","bg-black/20")}),document.querySelectorAll(".sort-option").forEach(e=>{e.classList.remove("bg-white/10","text-white"),e.classList.add("text-white/70")}),x()}async function K(){try{m=(await(await fetch("data/resources.json")).json()).sources,x(m),j(),ue().catch(()=>{console.log("Firebase stats loading failed, continuing with local data only")})}catch{}}async function ue(){try{const e=new Promise((o,c)=>setTimeout(()=>c(new Error("Firebase request timed out")),5e3)),t=N(H,"sources"),s=O(t),a=(await Promise.race([s,e])).val();if(a){m=m.map(o=>{var f;const c=o.url.replace(/[^a-zA-Z0-9]/g,"_"),i=((f=a[c])==null?void 0:f.stats)||{installs:0,copies:0,activity:[]},l=Array.isArray(i.activity)?i.activity:[],r=Date.now(),d=l.filter(y=>r-y<M).length;return{...o,stats:{...i,recentActivity:d,activity:l}}}),m.forEach(o=>{D(o.url,o.stats)});try{localStorage.setItem("sourceStats",JSON.stringify(a)),localStorage.setItem("statsLastUpdated",Date.now().toString())}catch{}return!0}return!1}catch{try{const t=localStorage.getItem("sourceStats");if(t){const s=JSON.parse(t);return m=m.map(n=>{var r;const a=n.url.replace(/[^a-zA-Z0-9]/g,"_"),o=((r=s[a])==null?void 0:r.stats)||{installs:0,copies:0,activity:[]},c=Array.isArray(o.activity)?o.activity:[],i=Date.now(),l=c.filter(d=>i-d<M).length;return{...n,stats:{...o,recentActivity:l,activity:c}}}),m.forEach(n=>{D(n.url,n.stats)}),console.log("Using cached stats from localStorage"),!0}}catch{}return m=m.map(t=>({...t,stats:{installs:0,copies:0,recentActivity:0,activity:[]}})),!1}}function R(e){document.querySelector("main").classList.add("blur-sm","transition-all","duration-200");const t=u.t.bind(u),s=document.createElement("div");s.className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in p-4",s.innerHTML=`
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
    `,document.body.appendChild(s);const n=()=>{document.querySelector("main").classList.remove("blur-sm"),s.remove()};s.querySelector(".cancel-btn").addEventListener("click",()=>{n(),e(!1)}),s.querySelector(".proceed-btn").addEventListener("click",()=>{n(),e(!0)}),s.querySelector(".fixed.inset-0").addEventListener("click",a=>{a.target===a.currentTarget&&(n(),e(!1))})}function U(e){document.querySelector("main").classList.add("blur-sm","transition-all","duration-200");const t=u.t.bind(u),s=document.createElement("div");s.className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in p-4",s.innerHTML=`
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
                        <h3 class="text-base sm:text-lg font-medium text-white mb-2">
                            ${t("ageVerification.title")}
                        </h3>
                        <p class="text-white/70 text-xs sm:text-sm">
                            ${t("ageVerification.message")}
                        </p>
                        <p class="text-red-400/70 text-xs mt-2">
                            ${t("ageVerification.warning")}
                        </p>
                    </div>
                </div>

                <!-- Buttons -->
                <div class="flex items-center justify-end gap-2 sm:gap-3 mt-4 sm:mt-6">
                    <button class="cancel-btn px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm 
                                 text-white/70 hover:text-white transition-colors">
                        ${t("ageVerification.cancel")}
                    </button>
                    <button class="proceed-btn px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm 
                                 bg-red-500/10 hover:bg-red-500/20 
                                 border border-red-500/20 text-red-400 hover:text-red-300
                                 rounded-lg transition-colors">
                        ${t("ageVerification.confirm")}
                    </button>
                </div>
            </div>
        </div>
    `,document.body.appendChild(s);const n=()=>{document.querySelector("main").classList.remove("blur-sm"),s.remove()};s.querySelector(".cancel-btn").addEventListener("click",()=>{n(),e(!1)}),s.querySelector(".proceed-btn").addEventListener("click",()=>{n(),e(!0)}),s.querySelector(".fixed.inset-0").addEventListener("click",a=>{a.target===a.currentTarget&&(n(),e(!1))})}function me(e){var f,y,h,v;const t=u.getCurrentLocale(),n=(((f=u.translations[t])==null?void 0:f.sources)||{})[e.title]||{title:e.title,description:e.description},a=e.status.includes("Use At Your Own Risk"),o=e.stats||{installs:0,copies:0,recentActivity:0},c=parseInt(o.recentActivity||0),i=document.createElement("div");i.className="source-card animate-fade-in rounded-xl",i.dataset.url=e.url,i.dataset.name=e.title,i.dataset.copies=((y=e.stats)==null?void 0:y.copies)||0,i.dataset.installs=((h=e.stats)==null?void 0:h.installs)||0,i.dataset.activity=((v=e.stats)==null?void 0:v.recentActivity)||0;const l=e.status.map(g=>{const L=g.toLowerCase().replace(/\s+/g,"-"),b={trusted:{color:"emerald",icon:"shield",key:"trusted"},"safe-for-use":{color:"teal",icon:"check-circle",key:"safeForUse"},"use-at-your-own-risk":{color:"red",icon:"exclamation-triangle",key:"useAtOwnRisk"},russian:{color:"indigo",icon:"globe",key:"russian"},nsfw:{color:"pink",icon:"exclamation-circle",text:"NSFW"}}[L]||{color:"gray",icon:"circle",key:L};return`
            <span class="inline-flex items-center gap-1.5 px-2 py-1 rounded-md 
                         bg-${b.color}-500/10 border border-${b.color}-500/20 
                         text-${b.color}-400 text-xs backdrop-blur-sm status-badge">
                <i class="fas fa-${b.icon} text-[10px]"></i>
                ${b.text||u.t(`status.${b.key}`)}
            </span>
        `}).join("");i.innerHTML=`
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
                            ${u.t("common.added")} ${ve(e.addedDate)}
                        </span>
                        <div class="source-stats flex items-center gap-3">
                            <span class="flex items-center gap-1.5 ${c>0?"text-red-400":""}
                                       transition-colors duration-300">
                                <i class="fas fa-fire text-[10px]"></i>
                                ${c}
                            </span>
                            <span class="flex items-center gap-1.5">
                                <i class="fas fa-download text-[10px]"></i>
                                ${o.installs||0}
                            </span>
                            <span class="flex items-center gap-1.5">
                                <i class="fas fa-copy text-[10px]"></i>
                                ${o.copies||0}
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
    `;const r=i.querySelector(".install-btn"),d=i.querySelector(".copy-btn");return d&&d.addEventListener("click",async()=>{const g=async()=>{await _(e.url,"copy")&&(navigator.clipboard.writeText(e.url),d.innerHTML='<i class="fas fa-check text-[10px]"></i> '+u.t("sourceCard.copied"),setTimeout(()=>{d.innerHTML='<i class="fas fa-copy text-[10px]"></i> '+u.t("sourceCard.copy")},2e3))},L=e.title==="CPGRepacks";a||L?(L?U:R)(C=>{C&&g()}):g()}),r&&r.addEventListener("click",async()=>{const g=async()=>{G(r,"loading");const b=await _(e.url,"install");if(G(r,b?"success":"rate-limited"),b){const C=encodeURIComponent(e.url);window.location.href=`hydralauncher://install-source?urls=${C}`}},L=e.title==="CPGRepacks";e.status.includes("Use At Your Own Risk")||L?(L?U:R)(C=>{C&&g()}):g()}),D(e.url,e.stats),i.dataset.copies=o.copies||0,i.dataset.installs=o.installs||0,i.dataset.activity=c,i}let $="wide";function Q(){const e=window.innerWidth;return e>=1536?"wide":e>=1024?"desktop":e>=640?"tablet":"mobile"}let W;window.addEventListener("resize",()=>{clearTimeout(W),W=setTimeout(()=>{F();const e=Q();if($!==e){const s=z(),n=T(),a=Math.ceil(s.length/n);if($==="wide"&&e==="desktop"){const o=(p-1)*I.desktop;p=Math.floor(o/I.desktop)+1}$=e,p=Math.min(Math.max(1,p),a),x(s),n<T()&&window.scrollTo({top:0,behavior:"smooth"})}},100)});function ge(e,t){return[...e].sort((s,n)=>{var a,o,c,i,l,r;switch(t){case"hot":const d=((a=s.stats)==null?void 0:a.recentActivity)||0;return(((o=n.stats)==null?void 0:o.recentActivity)||0)-d;case"new":return new Date(n.addedDate)-new Date(s.addedDate);case"most-copies":const y=((c=s.stats)==null?void 0:c.copies)||0;return(((i=n.stats)==null?void 0:i.copies)||0)-y;case"most-installs":const v=((l=s.stats)==null?void 0:l.installs)||0;return(((r=n.stats)==null?void 0:r.installs)||0)-v;case"name-asc":return s.title.localeCompare(n.title);case"name-desc":return n.title.localeCompare(s.title);default:return 0}})}function x(e=null){const t=document.getElementById("sources-container");if(!t)return;t.innerHTML="";let s=e||z();const n=localStorage.getItem("currentSort");n&&(s=ge(s,n)),console.log("Displaying sources with stats:",s),$=Q();const a=T(),o=Math.ceil(s.length/a);p=Math.min(Math.max(1,p),o);const c=(p-1)*a,i=Math.min(c+a,s.length);s.slice(c,i).forEach(r=>{const d=me(r);t.appendChild(d)}),fe(o),u.updatePageContent()}function T(){const e=window.innerWidth;return e>=2560?I.wide:e>=1024?I.desktop:e>=640?I.tablet:I.mobile}function fe(e){const t=document.getElementById("pagination");if(!t)return;let s="";s+=`
        <button onclick="changePage(${p-1})" 
                class="px-2 py-1.5 text-sm text-white/50 hover:text-white disabled:opacity-50 
                       transition-colors duration-200 rounded-md hover:bg-white/5"
                ${p===1?"disabled":""}>
            <i class="fas fa-chevron-left"></i>
        </button>
    `;for(let n=1;n<=e;n++)n===p?s+=`
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
                ${p===e?"disabled":""}>
            <i class="fas fa-chevron-right"></i>
        </button>
    `,t.innerHTML=s}window.changePage=function(e){if(e<1)return;const t=z(),s=Math.ceil(t.length/T());e>s||(p=e,x(t),window.scrollTo({top:0,behavior:"smooth"}))};document.querySelectorAll(".status-filter-btn").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.status;document.querySelectorAll(".status-filter-btn").forEach(s=>{s.querySelector("div").classList.remove("bg-black/40")}),S===t?S="":(S=t,e.querySelector("div").classList.add("bg-black/40")),p=1,x(),j(),dispatchFiltersChanged()})});document.querySelectorAll(".games-filter-btn").forEach(e=>{e.addEventListener("click",()=>{const t=parseInt(e.dataset.min),s=parseInt(e.dataset.max);if(document.querySelectorAll(".games-filter-btn div").forEach(n=>{n.classList.remove("border-emerald-500/20","bg-black/40"),n.classList.add("border-white/5","bg-black/20")}),w&&w.min===t&&w.max===s)w=null;else{w={min:t,max:s};const n=e.querySelector("div");n.classList.remove("border-white/5","bg-black/20"),n.classList.add("border-emerald-500/20","bg-black/40")}p=1,x(),j(),Y(),dispatchFiltersChanged()})});function j(){const e={};m.forEach(t=>{t.status.forEach(s=>{e[s]=(e[s]||0)+1})}),document.querySelectorAll(".status-filter-btn").forEach(t=>{const s=t.dataset.status,n=t.querySelector(".text-white\\/40");n&&(n.textContent=e[s]||0)}),document.querySelectorAll(".games-filter-btn").forEach(t=>{const s=parseInt(t.dataset.min),n=parseInt(t.dataset.max),a=m.filter(i=>{const l=parseInt(i.gamesCount);return l>=s&&l<=n}).length,o=t.querySelector(".text-white\\/40");o&&(o.textContent=a);const c=t.querySelector(".bg-emerald-500\\/50");if(c){const i=Math.max(...Array.from(document.querySelectorAll(".games-filter-btn")).map(r=>{const d=parseInt(r.dataset.min),f=parseInt(r.dataset.max);return m.filter(y=>{const h=parseInt(y.gamesCount);return h>=d&&h<=f}).length})),l=i>0?a/i*100:0;c.style.width=`${l}%`}})}let A="";document.getElementById("search").addEventListener("input",e=>{A=e.target.value.toLowerCase(),p=1,x()});function z(){return m.filter(e=>{const t=!A||e.title.toLowerCase().includes(A)||e.description.toLowerCase().includes(A)||e.url.toLowerCase().includes(A),s=!S||e.status.includes(S),n=parseInt(e.gamesCount),a=!w||n>=w.min&&n<=w.max;return t&&s&&a})}const X=document.getElementById("sort-dropdown-btn"),q=document.getElementById("sort-dropdown"),pe=document.getElementById("current-sort");X.addEventListener("click",()=>{q.classList.toggle("hidden")});document.addEventListener("click",e=>{!X.contains(e.target)&&!q.contains(e.target)&&q.classList.add("hidden")});document.querySelectorAll(".sort-option").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.sort;switch(pe.textContent=e.textContent.trim(),q.classList.add("hidden"),t){case"high-to-low":sortGamesFilters(!1);break;case"low-to-high":sortGamesFilters(!0);break;case"most-sources":he();break;case"most-popular":ye();break}})});function he(){const e=document.querySelector(".games-filter-btn").parentNode,t=Array.from(e.querySelectorAll(".games-filter-btn"));t.sort((s,n)=>{const a=parseInt(s.querySelector(".text-white\\/40").textContent);return parseInt(n.querySelector(".text-white\\/40").textContent)-a}),t.forEach(s=>s.remove()),t.forEach(s=>e.appendChild(s))}function ye(){const e=JSON.parse(localStorage.getItem("sourceStats")||"{}"),t=document.querySelector(".games-filter-btn").parentNode,s=Array.from(t.querySelectorAll(".games-filter-btn"));s.sort((n,a)=>{var f,y;const o=((f=m.find(h=>h.gamesCount===n.dataset.min))==null?void 0:f.url)||"",c=((y=m.find(h=>h.gamesCount===a.dataset.min))==null?void 0:y.url)||"",i=e[o]||{installs:0,copies:0},l=e[c]||{installs:0,copies:0},r=i.installs+i.copies;return l.installs+l.copies-r}),s.forEach(n=>n.remove()),s.forEach(n=>t.appendChild(n))}function ve(e){const t=new Date(e),n=Math.abs(new Date-t),a=Math.floor(n/(1e3*60*60*24)),o=u.t.bind(u);if(a===0)return o("common.date.today");if(a===1)return o("common.date.yesterday");if(a<30)return o("common.date.daysAgo",{days:a});{const c={year:"numeric",month:"short",day:"numeric"};return`${o("common.date.on")} ${t.toLocaleDateString(u.getCurrentLocale(),c)}`}}document.addEventListener("DOMContentLoaded",()=>{K(),sortGamesFilters(!1)});ae.addEventListener("click",()=>{E.classList.remove("hidden"),document.body.style.overflow="hidden"});Z.addEventListener("click",()=>{E.classList.add("hidden"),document.body.style.overflow=""});E.addEventListener("click",e=>{e.target===E&&Z.click()});document.addEventListener("keydown",e=>{e.key==="Escape"&&!E.classList.contains("hidden")&&(E.classList.add("hidden"),document.body.style.overflow="")});ie.addEventListener("click",()=>{k.classList.remove("hidden"),document.body.style.overflow="hidden"});oe.addEventListener("click",()=>{k.classList.add("hidden"),document.body.style.overflow=""});k.addEventListener("click",e=>{e.target===k&&(k.classList.add("hidden"),document.body.style.overflow="")});document.addEventListener("keydown",e=>{e.key==="Escape"&&(E.classList.contains("hidden")||(E.classList.add("hidden"),document.body.style.overflow=""),k.classList.contains("hidden")||(k.classList.add("hidden"),document.body.style.overflow=""))});function P(e,t,s){const n=new Date;n.setTime(n.getTime()+s*24*60*60*1e3),document.cookie=`${e}=${t};expires=${n.toUTCString()};path=/`}function ee(e){const t=e+"=",s=document.cookie.split(";");for(let n=0;n<s.length;n++){let a=s[n];for(;a.charAt(0)===" ";)a=a.substring(1,a.length);if(a.indexOf(t)===0)return a.substring(t.length,a.length)}return null}async function _(e,t){try{const s=e.replace(/[^a-zA-Z0-9]/g,"_"),n=`${t}_${s}`;if(ee(n))return!0;let a={installs:0,copies:0,activity:[],recentActivity:0};try{const c=new Promise((v,g)=>setTimeout(()=>g(new Error("Firebase request timed out")),3e3)),i=N(H,`sources/${s}/stats`),l=O(i),d=(await Promise.race([l,c])).val()||{installs:0,copies:0,activity:[]},f=Date.now(),h=(Array.isArray(d.activity)?d.activity:[]).filter(v=>f-v<M);h.push(f),a={installs:parseInt(d.installs||0)+(t==="install"?1:0),copies:parseInt(d.copies||0)+(t==="copy"?1:0),activity:h,recentActivity:h.length,lastUpdated:f},await Promise.race([V(i,a),new Promise((v,g)=>setTimeout(()=>g(new Error("Update timed out")),3e3))]);try{const v=localStorage.getItem("sourceStats");if(v){const g=JSON.parse(v);g[s]||(g[s]={}),g[s].stats=a,localStorage.setItem("sourceStats",JSON.stringify(g)),localStorage.setItem("statsLastUpdated",f.toString())}}catch{}}catch{console.log("Firebase update failed, continuing with local data");const i=m.find(l=>l.url===e);if(i&&i.stats){a={installs:parseInt(i.stats.installs||0)+(t==="install"?1:0),copies:parseInt(i.stats.copies||0)+(t==="copy"?1:0),activity:[],recentActivity:1,lastUpdated:Date.now()};try{const l=localStorage.getItem("sourceStats");if(l){const r=JSON.parse(l);r[s]||(r[s]={}),r[s].stats=a,localStorage.setItem("sourceStats",JSON.stringify(r)),localStorage.setItem("statsLastUpdated",Date.now().toString())}}catch{}}}P(n,"true",t==="install"?.003472222:347222e-9),D(e,a);const o=m.findIndex(c=>c.url===e);return o!==-1&&(m[o].stats=a),!0}catch{return!1}}function D(e,t=null){const s=document.querySelectorAll(".source-card"),n=Array.from(s).find(a=>a.dataset.url===e);if(n){const a=n.querySelector(".source-stats");if(a){const o=parseInt((t==null?void 0:t.installs)||0),c=parseInt((t==null?void 0:t.copies)||0),i=parseInt((t==null?void 0:t.recentActivity)||0);a.innerHTML=`
                <span class="flex items-center gap-1.5">
                    <i class="fas fa-fire text-[10px] ${i>0?"text-red-500":""}"></i>
                    ${i}
                </span>
                <span class="flex items-center gap-1.5">
                    <i class="fas fa-download text-[10px]"></i>
                    ${o}
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
            `,setTimeout(()=>{e.disabled=!1,e.innerHTML=s},2e3);break;default:e.disabled=!1,e.innerHTML=s}}function be(){const e=document.getElementById("cookie-consent");ee("cookie-consent")?e.style.display="none":(e.style.display="block",setTimeout(()=>{e.classList.remove("translate-y-full")},500))}document.getElementById("accept-cookies").addEventListener("click",()=>{const e=document.getElementById("cookie-consent");e.classList.add("translate-y-full"),e.addEventListener("transitionend",()=>{e.style.display="none"},{once:!0}),P("cookie-consent","accepted",365)});async function xe(e){try{const t=N(H,`sources/${e}/stats`),n=(await O(t)).val();if(n&&n.activity){const a=n.activity.filter(o=>Date.now()-o<M);a.length!==n.activity.length&&await V(t,{activity:a})}}catch{}}function we(){const e=document.getElementById("suggest-modal"),t=document.getElementById("suggest-btn"),s=document.getElementById("close-suggest");t&&t.addEventListener("click",()=>{e.classList.remove("hidden")}),s&&s.addEventListener("click",()=>{e.classList.add("hidden")}),e&&e.addEventListener("click",n=>{n.target===e&&e.classList.add("hidden")})}function Le(){const e=document.getElementById("search");if(e){const t=()=>{const n=window.innerWidth<640?"header.searchMobile":"header.search";e.placeholder=u.t(n)};t(),window.addEventListener("resize",t),document.addEventListener("languageChanged",t)}}function Ee(){setInterval(()=>{m.forEach(e=>{const t=e.url.replace(/[^a-zA-Z0-9]/g,"_");xe(t)})},60*60*1e3)}document.addEventListener("languageChanged",()=>{x()});
