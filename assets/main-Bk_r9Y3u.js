import{r as I,d as A,g as $,u as F}from"./firebase-9b0dQzRQ.js";document.body.classList.add("preloading");function N(){const e=document.getElementById("preloader"),t=e.querySelector(".loading-progress");let s=0;const n=setInterval(()=>{s+=Math.random()*15,s>100?(s=100,clearInterval(n),t.style.width="100%",setTimeout(()=>{e.style.transition="opacity 0.5s ease-out",e.style.opacity="0",setTimeout(()=>{e.remove(),document.body.classList.remove("preloading")},500)},500)):t.style.width=`${s}%`},100)}document.addEventListener("DOMContentLoaded",()=>{N(),ne();const e=document.getElementById("accept-cookies"),t=document.getElementById("reject-cookies"),s=document.getElementById("cookie-consent");e&&e.addEventListener("click",()=>{n(),C("cookie-consent","accepted",365)}),t&&t.addEventListener("click",()=>{n(),C("cookie-consent","rejected",365)});function n(){s.classList.add("translate-y-full"),s.addEventListener("transitionend",()=>{s.style.display="none"},{once:!0})}_(),setTimeout(()=>{z()},300),re(),oe(),ie()});function _(){document.querySelectorAll(".sort-option").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".sort-option").forEach(n=>{n.classList.remove("bg-white/10","text-white"),n.classList.add("text-white/70")}),t.classList.remove("text-white/70"),t.classList.add("bg-white/10","text-white");const s=t.dataset.sort;localStorage.setItem("currentSort",s),x()})});const e=localStorage.getItem("currentSort");if(e){const t=document.querySelector(`.sort-option[data-sort="${e}"]`);t&&(t.classList.remove("text-white/70"),t.classList.add("bg-white/10","text-white"))}}let p=[],w="",h=null,l=1;const v={mobile:4,tablet:6,desktop:9,wide:12},y=document.getElementById("about-modal"),Y=document.getElementById("about-btn"),R=document.getElementById("close-about"),b=document.getElementById("suggest-modal"),Z=document.getElementById("suggest-btn"),V=document.getElementById("close-suggest"),L=24*60*60*1e3;async function z(){try{p=(await(await fetch("data/resources.json")).json()).sources,await J(),x(p),T()}catch(e){console.error("Error loading sources:",e)}}async function J(){try{const e=I(A,"sources"),s=(await $(e)).val();console.log("Raw Firebase stats:",s),s&&(p=p.map(n=>{var d;const a=n.url.replace(/[^a-zA-Z0-9]/g,"_"),r=((d=s[a])==null?void 0:d.stats)||{installs:0,copies:0,activity:[]},o=Array.isArray(r.activity)?r.activity:[],i=Date.now(),u=o.filter(f=>i-f<L).length;return console.log(`Source ${n.title} activity:`,{activity:o,recentActivity:u,now:i,window:L}),{...n,stats:{...r,recentActivity:u,activity:o}}}),p.forEach(n=>{M(n.url,n.stats)}))}catch(e){console.error("Error loading stats from Firebase:",e)}}function P(e){document.querySelector("main").classList.add("blur-sm","transition-all","duration-200");const t=document.createElement("div");t.className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in p-4",t.innerHTML=`
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
                        <h3 class="text-base sm:text-lg font-medium text-white mb-2">Warning</h3>
                        <p class="text-white/70 text-xs sm:text-sm">
                            This source is marked as "Use At Your Own Risk". It may contain untested or potentially harmful content. 
                            Are you sure you want to proceed?
                        </p>
                    </div>
                </div>

                <!-- Buttons -->
                <div class="flex items-center justify-end gap-2 sm:gap-3 mt-4 sm:mt-6">
                    <button class="cancel-btn px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm 
                                 text-white/70 hover:text-white transition-colors">
                        Cancel
                    </button>
                    <button class="proceed-btn px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm 
                                 bg-red-500/10 hover:bg-red-500/20 
                                 border border-red-500/20 text-red-400 hover:text-red-300
                                 rounded-lg transition-colors">
                        Proceed Anyway
                    </button>
                </div>
            </div>
        </div>
    `,document.body.appendChild(t);const s=()=>{document.querySelector("main").classList.remove("blur-sm"),t.remove()};t.querySelector(".cancel-btn").addEventListener("click",()=>{s(),e(!1)}),t.querySelector(".proceed-btn").addEventListener("click",()=>{s(),e(!0)}),t.querySelector(".fixed.inset-0").addEventListener("click",n=>{n.target===n.currentTarget&&(s(),e(!1))})}function O(e){var u,d,f;const t=e.status.includes("Use At Your Own Risk"),s=document.createElement("div");s.className="source-card animate-fade-in",s.dataset.url=e.url,s.dataset.name=e.title,s.dataset.copies=((u=e.stats)==null?void 0:u.copies)||0,s.dataset.installs=((d=e.stats)==null?void 0:d.installs)||0,s.dataset.activity=((f=e.stats)==null?void 0:f.recentActivity)||0;const n=e.stats||{installs:0,copies:0,recentActivity:0},a=parseInt(n.recentActivity||0);console.log("Creating card for source:",e.title,"with stats:",n);const r=e.status.map(m=>{const c=m.toLowerCase().replace(/\s+/g,"-"),g={trusted:"bg-emerald-500","safe-for-use":"bg-blue-500","use-at-your-own-risk":"bg-red-500",new:"bg-amber-500",russian:"bg-purple-500"}[c];return`
            <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-black/20 border border-white/10 text-xs backdrop-blur-sm">
                <i class="fas ${{trusted:"fa-shield","safe-for-use":"fa-check-circle","use-at-your-own-risk":"fa-exclamation-triangle",new:"fa-star",russian:"fa-globe"}[c]} text-[10px] ${g.replace("bg-","text-")}"></i>
                ${m}
            </span>
        `}).join("");s.innerHTML=`
        <div class="group relative h-full flex flex-col rounded-xl border ${t?"border-red-500/20":"border-white/5"} 
                    overflow-hidden backdrop-blur-sm 
                    hover:shadow-lg hover:shadow-${t?"red":"emerald"}-500/10 
                    transition-all duration-300">
            <!-- Full card background -->
            <div class="absolute inset-0 bg-gradient-to-b from-[#111]/80 to-[#111]/40"></div>
            
            <!-- Card Header -->
            <div class="p-4 relative flex-1">
                <!-- Glowing background effect -->
                <div class="absolute inset-0 bg-gradient-to-r 
                           ${t?"from-red-500/5 via-transparent to-red-500/5":"from-emerald-500/5 via-transparent to-emerald-500/5"} 
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                </div>
                
                <!-- Content -->
                <div class="relative">
                    <div class="flex items-start justify-between gap-2 mb-3">
                        <div class="flex flex-wrap gap-1">
                            ${r}
                        </div>
                        <div class="flex items-center gap-1.5 text-white/40 text-xs shrink-0 
                                  bg-black/30 px-2.5 py-1 rounded-full border border-white/5
                                  ${t?"group-hover:border-red-500/20":"group-hover:border-emerald-500/20"}
                                  transition-colors duration-300">
                            <i class="fas fa-gamepad ${t?"text-red-500/50":"text-emerald-500/50"} text-[10px]"></i>
                            <span>${e.gamesCount} games</span>
                        </div>
                    </div>
                    
                    <div class="flex items-start gap-3">
                        <div class="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
                            ${t?"bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/20":"bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20"} border group-hover:scale-110 transition-transform duration-300">
                            <i class="fas ${t?"fa-triangle-exclamation text-red-500/70":"fa-book-open text-emerald-500/70"} text-lg"></i>
                        </div>
                        <div class="flex-1 min-w-0">
                            <h3 class="text-base font-medium text-white group-hover:text-${t?"red":"emerald"}-400 
                                       transition-colors duration-300 mb-1.5 truncate">
                                ${e.title}
                            </h3>
                            <p class="text-white/60 text-xs leading-relaxed line-clamp-2 mb-2">${e.description}</p>
                            <div class="flex items-center gap-2 text-white/40 text-xs">
                                <span class="flex items-center gap-1">
                                    <i class="fas fa-calendar-alt text-[10px]"></i>
                                    Added ${se(e.addedDate)}
                                </span>
                                <span class="w-1 h-1 rounded-full bg-white/20"></span>
                                <div class="source-stats flex items-center gap-3">
                                    <span class="flex items-center gap-1">
                                        <i class="fas fa-fire text-[10px] ${a>0?"text-red-500":""}"></i>
                                        ${a}
                                    </span>
                                    <span class="flex items-center gap-1">
                                        <i class="fas fa-download text-[10px]"></i>
                                        ${n.installs||0}
                                    </span>
                                    <span class="flex items-center gap-1">
                                        <i class="fas fa-copy text-[10px]"></i>
                                        ${n.copies||0}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card Footer -->
            <div class="relative border-t ${t?"border-red-500/10":"border-white/5"} 
                        p-3 bg-black/30">
                <div class="flex gap-2">
                    <button class="install-btn flex-1 ${t?"bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/20":"bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/20"} border rounded-lg px-4 py-2 text-xs font-medium transition-all duration-200 
                       flex items-center justify-center gap-2 min-h-[36px] disabled:opacity-50 
                       disabled:cursor-not-allowed hover:scale-[1.02]">
                        <i class="fas fa-download text-[10px]"></i>
                        Install On Hydra
                    </button>
                    <button class="copy-btn shrink-0 bg-white/5 hover:bg-white/10 text-white/70 
                                 border border-white/10 rounded-lg px-4 py-2 text-xs transition-all duration-200 
                                 flex items-center justify-center gap-2 hover:scale-[1.02]" 
                            data-url="${e.url}">
                        <i class="fas fa-copy text-[10px]"></i>
                        Copy
                    </button>
                </div>
            </div>
        </div>
    `;const o=s.querySelector(".install-btn"),i=s.querySelector(".copy-btn");return o&&o.addEventListener("click",async()=>{const m=async()=>{j(o,"loading");const c=await H(e.url,"install");if(j(o,c?"success":"rate-limited"),c){const g=encodeURIComponent(e.url);window.location.href=`hydralauncher://install-source?urls=${g}`}};t?P(c=>{c&&m()}):m()}),i&&i.addEventListener("click",async()=>{const m=async()=>{await H(e.url,"copy")&&(navigator.clipboard.writeText(e.url),i.innerHTML='<i class="fas fa-check text-[10px]"></i> Copied!',setTimeout(()=>{i.innerHTML='<i class="fas fa-copy text-[10px]"></i> Copy URL'},2e3))};t?P(c=>{c&&m()}):m()}),M(e.url,e.stats),s.dataset.copies=n.copies||0,s.dataset.installs=n.installs||0,s.dataset.activity=a,s}let k="wide";function U(){const e=window.innerWidth;return e>=1536?"wide":e>=1024?"desktop":e>=640?"tablet":"mobile"}let D;window.addEventListener("resize",()=>{clearTimeout(D),D=setTimeout(()=>{const e=U();if(k!==e){const s=B(),n=E(),a=Math.ceil(s.length/n);if(k==="wide"&&e==="desktop"){const r=(l-1)*v.wide;l=Math.floor(r/v.desktop)+1}k=e,l=Math.min(Math.max(1,l),a),x(s),n<E()&&window.scrollTo({top:0,behavior:"smooth"})}},100)});function Q(e,t){return[...e].sort((s,n)=>{var a,r,o,i,u,d;switch(t){case"hot":const f=((a=s.stats)==null?void 0:a.recentActivity)||0;return(((r=n.stats)==null?void 0:r.recentActivity)||0)-f;case"new":return new Date(n.addedDate)-new Date(s.addedDate);case"most-copies":const c=((o=s.stats)==null?void 0:o.copies)||0;return(((i=n.stats)==null?void 0:i.copies)||0)-c;case"most-installs":const q=((u=s.stats)==null?void 0:u.installs)||0;return(((d=n.stats)==null?void 0:d.installs)||0)-q;case"name-asc":return s.title.localeCompare(n.title);case"name-desc":return n.title.localeCompare(s.title);default:return 0}})}function x(e=null){const t=document.getElementById("sources-container");if(!t)return;t.innerHTML="";let s=e||B();const n=localStorage.getItem("currentSort");n&&(s=Q(s,n)),console.log("Displaying sources with stats:",s),k=U();const a=E(),r=Math.ceil(s.length/a);l=Math.min(Math.max(1,l),r);const o=(l-1)*a,i=Math.min(o+a,s.length);s.slice(o,i).forEach(d=>{const f=O(d);t.appendChild(f)}),K(s.length,a)}function E(){const e=window.innerWidth;return e>=1536?v.wide:e>=1024?v.desktop:e>=640?v.tablet:v.mobile}function K(e,t){const s=document.getElementById("pagination");if(!s)return;const n=Math.ceil(e/t);if(n<=1){s.innerHTML="";return}let a=`
        <div class="flex items-center justify-center gap-2">
            <button onclick="changePage(${l-1})" 
                    class="pagination-btn w-9 h-9 flex items-center justify-center rounded-lg
                           bg-black/20 border border-white/5 text-white/70 hover:text-white
                           hover:bg-black/40 transition-colors ${l===1?"opacity-50 cursor-not-allowed":""}"
                    ${l===1?"disabled":""}>
                <i class="fas fa-chevron-left text-xs"></i>
            </button>
    `;for(let r=1;r<=n;r++)r===1||r===n||r>=l-2&&r<=l+2?a+=`
                <button onclick="changePage(${r})" 
                        class="pagination-btn w-9 h-9 flex items-center justify-center rounded-lg
                               text-sm font-medium transition-colors
                               ${r===l?"bg-emerald-500/10 border-emerald-500/20 text-emerald-400":"bg-black/20 border-white/5 text-white/70 hover:text-white hover:bg-black/40"} 
                               border">
                ${r}
            </button>
        `:(r===l-3||r===l+3)&&(a+=`
                <span class="w-9 h-9 flex items-center justify-center text-white/40">...</span>
            `);a+=`
            <button onclick="changePage(${l+1})" 
                    class="pagination-btn w-9 h-9 flex items-center justify-center rounded-lg
                           bg-black/20 border border-white/5 text-white/70 hover:text-white
                           hover:bg-black/40 transition-colors ${l===n?"opacity-50 cursor-not-allowed":""}"
                    ${l===n?"disabled":""}>
                <i class="fas fa-chevron-right text-xs"></i>
        </button>
    </div>
    `,s.innerHTML=a}window.changePage=function(e){if(e<1)return;const t=B(),s=Math.ceil(t.length/E());e>s||(l=e,x(t),window.scrollTo({top:0,behavior:"smooth"}))};document.querySelectorAll(".status-filter-btn").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.status;document.querySelectorAll(".status-filter-btn").forEach(s=>{s.querySelector("div").classList.remove("bg-black/40")}),w===t?w="":(w=t,e.querySelector("div").classList.add("bg-black/40")),x(),T()})});document.querySelectorAll(".games-filter-btn").forEach(e=>{e.addEventListener("click",()=>{const t=parseInt(e.dataset.min),s=parseInt(e.dataset.max),n=e.querySelector("div");document.querySelectorAll(".games-filter-btn").forEach(a=>{const r=a.querySelector("div");r.classList.remove("border-emerald-500/20","bg-black/40"),r.classList.add("border-white/5","bg-black/20")}),h&&h.min===t&&h.max===s?h=null:(h={min:t,max:s},n.classList.remove("border-white/5","bg-black/20"),n.classList.add("border-emerald-500/20","bg-black/40")),l=1,x(),T()})});function T(){const e={};p.forEach(t=>{t.status.forEach(s=>{e[s]=(e[s]||0)+1})}),document.querySelectorAll(".status-filter-btn").forEach(t=>{const s=t.dataset.status,n=t.querySelector(".text-white\\/40");n&&(n.textContent=e[s]||0)}),document.querySelectorAll(".games-filter-btn").forEach(t=>{const s=parseInt(t.dataset.min),n=parseInt(t.dataset.max),a=p.filter(i=>{const u=parseInt(i.gamesCount);return u>=s&&u<=n}).length,r=t.querySelector(".text-white\\/40");r&&(r.textContent=a);const o=t.querySelector(".bg-emerald-500\\/50");if(o){const i=Math.max(...Array.from(document.querySelectorAll(".games-filter-btn")).map(d=>{const f=parseInt(d.dataset.min),m=parseInt(d.dataset.max);return p.filter(c=>{const g=parseInt(c.gamesCount);return g>=f&&g<=m}).length})),u=i>0?a/i*100:0;o.style.width=`${u}%`}})}document.getElementById("search").addEventListener("input",e=>{const t=e.target.value.toLowerCase(),s=document.getElementById("sources-container");s.innerHTML="",p.filter(a=>(activeStatuses.size===0||a.status.some(r=>activeStatuses.has(r)))&&(a.title.toLowerCase().includes(t)||a.description.toLowerCase().includes(t)||a.url.toLowerCase().includes(t))).forEach((a,r)=>{const o=O(a);o.style.setProperty("--i",r+1),s.appendChild(o)})});const W=document.getElementById("sort-dropdown-btn"),S=document.getElementById("sort-dropdown"),X=document.getElementById("current-sort");W.addEventListener("click",()=>{S.classList.toggle("hidden")});document.addEventListener("click",e=>{!W.contains(e.target)&&!S.contains(e.target)&&S.classList.add("hidden")});document.querySelectorAll(".sort-option").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.sort;switch(X.textContent=e.textContent.trim(),S.classList.add("hidden"),t){case"high-to-low":sortGamesFilters(!1);break;case"low-to-high":sortGamesFilters(!0);break;case"most-sources":ee();break;case"most-popular":te();break}})});function ee(){const e=document.querySelector(".games-filter-btn").parentNode,t=Array.from(e.querySelectorAll(".games-filter-btn"));t.sort((s,n)=>{const a=parseInt(s.querySelector(".text-white\\/40").textContent);return parseInt(n.querySelector(".text-white\\/40").textContent)-a}),t.forEach(s=>s.remove()),t.forEach(s=>e.appendChild(s))}function te(){const e=JSON.parse(localStorage.getItem("sourceStats")||"{}"),t=document.querySelector(".games-filter-btn").parentNode,s=Array.from(t.querySelectorAll(".games-filter-btn"));s.sort((n,a)=>{var m,c;const r=((m=p.find(g=>g.gamesCount===n.dataset.min))==null?void 0:m.url)||"",o=((c=p.find(g=>g.gamesCount===a.dataset.min))==null?void 0:c.url)||"",i=e[r]||{installs:0,copies:0},u=e[o]||{installs:0,copies:0},d=i.installs+i.copies;return u.installs+u.copies-d}),s.forEach(n=>n.remove()),s.forEach(n=>t.appendChild(n))}function se(e){const t={year:"numeric",month:"short",day:"numeric"};return new Date(e).toLocaleDateString("en-US",t)}document.addEventListener("DOMContentLoaded",()=>{z(),sortGamesFilters(!1)});Y.addEventListener("click",()=>{y.classList.remove("hidden"),document.body.style.overflow="hidden"});R.addEventListener("click",()=>{y.classList.add("hidden"),document.body.style.overflow=""});y.addEventListener("click",e=>{e.target===y&&R.click()});document.addEventListener("keydown",e=>{e.key==="Escape"&&!y.classList.contains("hidden")&&(y.classList.add("hidden"),document.body.style.overflow="")});Z.addEventListener("click",()=>{b.classList.remove("hidden"),document.body.style.overflow="hidden"});V.addEventListener("click",()=>{b.classList.add("hidden"),document.body.style.overflow=""});b.addEventListener("click",e=>{e.target===b&&(b.classList.add("hidden"),document.body.style.overflow="")});document.addEventListener("keydown",e=>{e.key==="Escape"&&(y.classList.contains("hidden")||(y.classList.add("hidden"),document.body.style.overflow=""),b.classList.contains("hidden")||(b.classList.add("hidden"),document.body.style.overflow=""))});function C(e,t,s){const n=new Date;n.setTime(n.getTime()+s*24*60*60*1e3),document.cookie=`${e}=${t};expires=${n.toUTCString()};path=/`}function G(e){const t=e+"=",s=document.cookie.split(";");for(let n=0;n<s.length;n++){let a=s[n];for(;a.charAt(0)===" ";)a=a.substring(1,a.length);if(a.indexOf(t)===0)return a.substring(t.length,a.length)}return null}async function H(e,t){try{const s=e.replace(/[^a-zA-Z0-9]/g,"_"),n=`${t}_${s}`;if(G(n))return!0;const a=I(A,`sources/${s}/stats`),o=(await $(a)).val()||{installs:0,copies:0,activity:[]},i=Date.now(),d=(Array.isArray(o.activity)?o.activity:[]).filter(c=>i-c<L);d.push(i);const f={installs:parseInt(o.installs||0)+(t==="install"?1:0),copies:parseInt(o.copies||0)+(t==="copy"?1:0),activity:d,lastUpdated:i};await F(a,f),C(n,"true",t==="install"?.003472222:347222e-9),f.recentActivity=d.length,M(e,f);const m=p.findIndex(c=>c.url===e);return m!==-1&&(p[m].stats=f),!0}catch(s){return console.error("Error tracking source usage:",s),!1}}function M(e,t=null){const s=document.querySelectorAll(".source-card"),n=Array.from(s).find(a=>a.dataset.url===e);if(n){const a=n.querySelector(".source-stats");if(a){const r=parseInt((t==null?void 0:t.installs)||0),o=parseInt((t==null?void 0:t.copies)||0),i=parseInt((t==null?void 0:t.recentActivity)||0);a.innerHTML=`
                <span class="flex items-center gap-1">
                    <i class="fas fa-fire text-[10px] ${i>0?"text-red-500":""}"></i>
                    ${i}
                </span>
                <span class="flex items-center gap-1">
                    <i class="fas fa-download text-[10px]"></i>
                    ${r}
                </span>
                <span class="flex items-center gap-1">
                    <i class="fas fa-copy text-[10px]"></i>
                    ${o}
                </span>
            `}n.dataset.copies=(t==null?void 0:t.copies)||0,n.dataset.installs=(t==null?void 0:t.installs)||0,n.dataset.activity=(t==null?void 0:t.recentActivity)||0}}function j(e,t){const s=e.innerHTML;switch(t){case"loading":e.disabled=!0,e.innerHTML=`
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
            `,setTimeout(()=>{e.disabled=!1,e.innerHTML=s},2e3);break;default:e.disabled=!1,e.innerHTML=s}}function B(){return p.filter(e=>{const t=!w||e.status.includes(w),s=parseInt(e.gamesCount),n=!h||s>=h.min&&s<=h.max;return t&&n})}function ne(){const e=document.getElementById("cookie-consent");G("cookie-consent")?e.style.display="none":(e.style.display="block",setTimeout(()=>{e.classList.remove("translate-y-full")},500))}document.getElementById("accept-cookies").addEventListener("click",()=>{const e=document.getElementById("cookie-consent");e.classList.add("translate-y-full"),e.addEventListener("transitionend",()=>{e.style.display="none"},{once:!0}),C("cookie-consent","accepted",365)});async function ae(e){try{const t=I(A,`sources/${e}/stats`),n=(await $(t)).val();if(n&&n.activity){const a=n.activity.filter(r=>Date.now()-r<L);a.length!==n.activity.length&&await F(t,{activity:a})}}catch(t){console.error("Error cleaning up old activity:",t)}}function re(){const e=document.getElementById("suggest-modal"),t=document.getElementById("suggest-btn"),s=document.getElementById("close-suggest");t&&t.addEventListener("click",()=>{e.classList.remove("hidden")}),s&&s.addEventListener("click",()=>{e.classList.add("hidden")}),e&&e.addEventListener("click",n=>{n.target===e&&e.classList.add("hidden")})}function oe(){const e=document.getElementById("search");if(e){const t=()=>{e.placeholder=window.innerWidth<640?"Search":"Search sources..."};t(),window.addEventListener("resize",t)}}function ie(){setInterval(()=>{p.forEach(e=>{const t=e.url.replace(/[^a-zA-Z0-9]/g,"_");ae(t)})},60*60*1e3)}
