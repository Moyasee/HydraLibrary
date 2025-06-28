import"./index-ciVfDTdS.js";/* empty css                         */class h{constructor(){this.games=[],this.sources=[],this.isLoading=!1,this.currentPage=1,this.gamesPerPage=12,this.searchResults=[],this.lastFetchTime=null,this.fetchInterval=10*60*1e3,this.init()}async init(){this.setupEventListeners(),this.hideSearchResults(),await this.loadSources(),await this.loadGamesData(),setInterval(()=>{this.isLoading||this.loadGamesData()},this.fetchInterval),this.hideSearchResults(),this.showRecentAdditions(),this.initCountdownTimer()}initCountdownTimer(){const e=document.getElementById("update-countdown");e&&(e.classList.remove("loading-hidden"),e.classList.add("content-visible")),this.updateCountdown(),setInterval(()=>{this.updateCountdown()},1e3)}getNextUpdateTime(){const e=new Date,t=e.getUTCMinutes();e.getUTCSeconds();let o;t<9?o=9:t<39?o=39:(o=9,e.setUTCHours(e.getUTCHours()+1));const s=new Date(e);return s.setUTCMinutes(o),s.setUTCSeconds(0),s.setUTCMilliseconds(0),s}updateCountdown(){const e=this.getNextUpdateTime(),t=new Date,o=e.getTime()-t.getTime();if(o<=0){this.updateCountdown();return}const s=Math.floor(o/(1e3*60*60)),a=Math.floor(o%(1e3*60*60)/(1e3*60)),r=Math.floor(o%(1e3*60)/1e3),n=`${s.toString().padStart(2,"0")}:${a.toString().padStart(2,"0")}:${r.toString().padStart(2,"0")}`,d=document.getElementById("countdown-timer"),l=document.getElementById("next-update-time");if(d&&(d.textContent=n),l){const c={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",timeZone:"UTC",timeZoneName:"short"};l.textContent=`${e.toLocaleString("en-US",c)}`}}async loadSources(){try{const t=await(await fetch("/data/resources.json")).json();this.sources=t.sources||[],console.log(`Loaded ${this.sources.length} sources`)}catch(e){console.error("Error loading sources:",e),this.sources=[]}}async loadGamesData(){if(!this.isLoading){this.isLoading=!0,this.updateLoadingState(!0);try{const e=new AbortController,t=setTimeout(()=>e.abort(),3e4),o=await fetch("https://libraryratingsdb.zxcsixx.workers.dev/api/games",{signal:e.signal});if(clearTimeout(t),!o.ok)throw new Error(`HTTP ${o.status}: ${o.statusText}`);const s=await o.json();if(s.success){this.games=s.data||[],this.lastUpdated=s.lastUpdated||Date.now(),this.lastFetchTime=Date.now();const a=s.cached?`cached (${Math.floor(s.cacheAge/60)}m old)`:"fresh data";console.log(`Loaded ${s.totalGames||this.games.length} games from ${s.sourcesProcessed||"unknown"} sources (${a})`),this.updateStats(s),this.hideError(),this.hideSearchResults(),this.showRecentAdditions()}else throw new Error(s.error||"Failed to fetch games data")}catch(e){console.error("Error loading games data:",e),e.name==="AbortError"?this.showError("Request timed out. The server might be processing data. Please try again in a few minutes."):this.showError(`Failed to load games data: ${e.message}. Please try again later.`)}finally{this.isLoading=!1,this.updateLoadingState(!1)}}}updateLoadingState(e){const t=document.getElementById("loading-state"),o=document.getElementById("search-results");e?(t.classList.remove("hidden"),o.classList.add("hidden"),this.hideAllContent(),this.updateSearchInputState(!1)):(t.classList.add("hidden"),o.classList.remove("hidden"),this.showAllContentWithAnimation(),this.updateSearchInputState(!0))}hideAllContent(){["hero-section","search-section","stats-section","recent-additions"].forEach(t=>{const o=document.getElementById(t);o&&(o.classList.add("loading-hidden"),o.classList.remove("content-visible"),o.classList.remove("animate-fade-in-up","animate-slide-in-left","animate-slide-in-right","animate-scale-in","animate-delay-100","animate-delay-200","animate-delay-300","animate-delay-400","animate-delay-500","animate-delay-600","animate-delay-700"))})}showAllContentWithAnimation(){[{id:"hero-section",animation:"animate-fade-in-up",delay:"animate-delay-100"},{id:"search-section",animation:"animate-slide-in-left",delay:"animate-delay-100"},{id:"stats-section",animation:"animate-scale-in",delay:"animate-delay-100"},{id:"recent-additions",animation:"animate-slide-in-right",delay:"animate-delay-100"}].forEach(({id:t,animation:o,delay:s})=>{const a=document.getElementById(t);a&&setTimeout(()=>{a.classList.remove("loading-hidden"),a.classList.add("content-visible",o,s)})})}updateSearchInputState(e){const t=document.getElementById("game-search"),o=document.getElementById("source-filter"),s=document.getElementById("sort-filter");e&&this.games.length>0?(t.disabled=!1,t.placeholder="Search for games...",o.disabled=!1,s.disabled=!1,t.classList.remove("opacity-50","cursor-not-allowed")):(t.disabled=!0,t.placeholder="Loading games...",o.disabled=!0,s.disabled=!0,t.classList.add("opacity-50","cursor-not-allowed"))}updateProgress(e){console.log(`Loading progress: ${e}%`)}setupEventListeners(){const e=document.getElementById("game-search"),t=document.getElementById("source-filter"),o=document.getElementById("sort-filter");let s;e.addEventListener("input",a=>{clearTimeout(s),s=setTimeout(()=>{this.performSearch(a.target.value)},300)}),t.addEventListener("change",()=>this.applyFilters()),o.addEventListener("change",()=>this.applyFilters()),e.addEventListener("keypress",a=>{a.key==="Enter"&&(clearTimeout(s),this.performSearch(a.target.value))}),this.updateSearchInputState(!1)}setupAutoRefresh(){setInterval(()=>{this.isLoading||this.loadGamesData()},this.fetchInterval)}performSearch(e){if(this.isLoading||this.games.length===0)return;if(e.trim()===""){this.hideSearchResults(),this.showRecentAdditions();return}const t=this.searchGames(e);this.searchResults=t,this.currentPage=1,this.applyFilters(),this.hideRecentAdditions()}searchGames(e){const t=e.toLowerCase().split(" ").filter(s=>s.length>0),o=e.toLowerCase();return this.games.filter(s=>{const a=s.title.toLowerCase(),r=(s.description||"").toLowerCase(),n=(s.tags?s.tags.join(" "):"").toLowerCase();return t.every(d=>a.includes(d)||r.includes(d)||n.includes(d))}).map(s=>{s.title.toLowerCase();const a=this.calculateRelevanceScore(s,o,t);return{...s,relevanceScore:a}}).sort((s,a)=>a.relevanceScore-s.relevanceScore)}calculateRelevanceScore(e,t,o){const s=e.title.toLowerCase(),a=(e.description||"").toLowerCase(),r=(e.tags?e.tags.join(" "):"").toLowerCase();let n=0;if(s===t?n+=1e3:s.startsWith(t)?n+=800:s.includes(t)&&(n+=600),o.forEach(d=>{new RegExp(`\\b${this.escapeRegex(d)}\\b`,"i").test(e.title)?n+=400:s.includes(d)&&(n+=200)}),o.forEach(d=>{a.includes(d)&&(n+=50)}),o.forEach(d=>{r.includes(d)&&(n+=30)}),e.uploadDate){const d=new Date(e.uploadDate);(Date.now()-d.getTime())/(1e3*60*60*24)<30&&(n+=20)}return n}escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}applyFilters(){if(this.isLoading||this.games.length===0)return;const e=document.getElementById("source-filter").value,t=document.getElementById("sort-filter").value;let o;if(this.searchResults&&this.searchResults.length>0)o=[...this.searchResults];else{const s=document.getElementById("search-input");if((s?s.value.trim():"")==="")o=[...this.games],this.hideRecentAdditions(),document.getElementById("search-results").classList.remove("hidden");else return}switch(e&&(o=o.filter(s=>s.source===e)),t){case"name":o.sort((s,a)=>s.title.localeCompare(a.title));break;case"date":o.sort((s,a)=>{const r=new Date(s.uploadDate||s.addedDate||0);return new Date(a.uploadDate||a.addedDate||0)-r});break;case"relevance":default:!this.searchResults||this.searchResults.length===0?o.sort((s,a)=>{const r=new Date(s.uploadDate||s.addedDate||0);return new Date(a.uploadDate||a.addedDate||0)-r}):o.sort((s,a)=>(a.relevanceScore||0)-(s.relevanceScore||0));break}this.searchResults=o,this.currentPage=1,this.displaySearchResults()}displaySearchResults(){const e=document.getElementById("search-results"),t=document.getElementById("results-grid"),o=document.getElementById("results-count"),s=document.getElementById("no-results");if(this.searchResults.length===0){e.classList.add("hidden"),s.classList.remove("hidden");return}s.classList.add("hidden"),e.classList.remove("hidden"),o.textContent=`${this.searchResults.length} games found`;const a=(this.currentPage-1)*this.gamesPerPage,r=a+this.gamesPerPage,n=this.searchResults.slice(a,r);t.innerHTML=n.map(d=>this.createGameCard(d)).join(""),this.updatePagination()}createGameCard(e){const t=e.description&&e.description.length>120?e.description.substring(0,120)+"...":e.description||"";return`
            <div class="card-hover glass-effect rounded-2xl p-0 group relative overflow-hidden">
                <!-- Enhanced gradient border effect with animation -->
                <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-emerald-400/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-2xl"></div>
                
                
                <!-- Content with improved padding structure -->
                <div class="relative z-10 p-6">
                    <!-- Enhanced Header with larger title -->
                    <div class="flex items-start justify-between mb-5">
                        <h3 class="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300 line-clamp-2 flex-1 pr-3" title="${this.escapeHtml(e.title)}">
                            ${this.escapeHtml(e.title)}
                        </h3>
                        <div class="relative ml-2">
                            <span class="text-xs px-3 py-1.5 bg-gradient-to-r from-emerald-500/30 to-emerald-400/20 text-emerald-400 rounded-full border border-emerald-500/40 font-medium shrink-0 shadow-sm shadow-emerald-500/10">
                                ${this.escapeHtml(e.source)}
                            </span>
                            <div class="absolute inset-0 bg-emerald-500/30 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    </div>
                    
                    <!-- Enhanced Description with better contrast -->
                    ${e.description?`
                        <p class="text-white/80 text-sm mb-5 line-clamp-3 leading-relaxed">
                            ${this.escapeHtml(t)}
                        </p>
                    `:'<div class="mb-5"></div>'}
                    
                    <!-- Enhanced Metadata with icons -->
                    <div class="flex items-center justify-between text-xs text-white/60 mb-5 bg-white/5 rounded-lg p-2.5">
                        ${e.size?`
                            <div class="flex items-center gap-2">
                                <div class="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                    <i class="fas fa-hdd text-emerald-400"></i>
                                </div>
                                <span class="font-medium">${this.escapeHtml(e.size)}</span>
                            </div>
                        `:"<div></div>"}
                        ${e.addedDate?`
                            <div class="flex items-center gap-2">
                                <div class="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                    <i class="fas fa-calendar text-emerald-400"></i>
                                </div>
                                <span class="font-medium">${this.formatDate(e.addedDate)}</span>
                            </div>
                        `:"<div></div>"}
                    </div>
                    
                    <!-- Enhanced Tags with better styling -->
                    ${e.tags&&e.tags.length>0?`
                        <div class="flex flex-wrap gap-2 mb-6">
                            ${e.tags.slice(0,3).map(o=>`
                                <span class="text-xs px-3 py-1.5 bg-gradient-to-r from-white/10 to-white/5 text-white/80 rounded-full border border-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                                    ${this.escapeHtml(o)}
                                </span>
                            `).join("")}
                            ${e.tags.length>3?`
                                <span class="text-xs text-white/60 px-3 py-1.5 flex items-center">
                                    <i class="fas fa-plus text-emerald-400 mr-1.5"></i>
                                    ${e.tags.length-3} more
                                </span>
                            `:""}
                        </div>
                    `:'<div class="mb-6"></div>'}
                    
                    <!-- Enhanced Actions with better buttons -->
                    <div class="flex gap-3 mt-auto">
                        ${e.downloadUrl?`
                            <a href="${this.escapeHtml(e.downloadUrl)}" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               class="flex-1 bg-gradient-to-r from-emerald-500/30 to-emerald-400/20 hover:from-emerald-500/40 hover:to-emerald-400/30 
                                      text-emerald-400 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 
                                      flex items-center justify-center gap-2.5 border border-emerald-500/40 hover:border-emerald-500/60
                                      hover:shadow-lg hover:shadow-emerald-500/30 group-hover:translate-y-0 translate-y-1">
                                <i class="fas fa-download"></i>
                                <span>Download</span>
                            </a>
                        `:""}
                        <button onclick="copySourceUrlWithFeedback(this, '${this.escapeHtml(e.source)}')"
                                class="copy-button px-4 py-3.5 glass-effect hover:bg-white/20 text-white/70 hover:text-white
                                       rounded-xl text-sm transition-all duration-300 border border-white/10 hover:border-white/30
                                       hover:shadow-lg hover:shadow-black/20 group/btn group-hover:translate-y-0 translate-y-1"
                                title="Copy source URL">
                            <i class="fas fa-copy group-hover/btn:scale-110 transition-transform duration-200"></i>
                        </button>
                    </div>
                </div>
                
                <!-- Enhanced hover glow effect -->
                <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl pointer-events-none blur-sm"></div>
            </div>
        `}updatePagination(){const e=document.getElementById("pagination"),t=Math.ceil(this.searchResults.length/this.gamesPerPage);if(t<=1){e.innerHTML="";return}let o="";this.currentPage>1&&(o+=`
                <button onclick="gameSearch.goToPage(${this.currentPage-1})" 
                        class="px-4 py-3 glass-effect hover:bg-white/20 text-white/70 hover:text-white rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20 group">
                    <i class="fas fa-chevron-left group-hover:scale-110 transition-transform duration-200"></i>
                </button>
            `);const s=Math.max(1,this.currentPage-2),a=Math.min(t,this.currentPage+2);s>1&&(o+=`
                <button onclick="gameSearch.goToPage(1)" 
                        class="px-4 py-3 glass-effect hover:bg-white/20 text-white/70 hover:text-white rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20 font-medium">
                    1
                </button>
            `,s>2&&(o+='<span class="px-2 text-white/50">...</span>'));for(let r=s;r<=a;r++){const n=r===this.currentPage;o+=`
                <button onclick="gameSearch.goToPage(${r})" 
                        class="px-4 py-3 ${n?"bg-gradient-to-r from-emerald-500/20 to-emerald-400/10 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/20":"glass-effect hover:bg-white/20 text-white/70 hover:text-white border border-white/10 hover:border-white/20"} 
                               rounded-xl transition-all duration-300 font-medium min-w-[48px]">
                    ${r}
                </button>
            `}a<t&&(a<t-1&&(o+='<span class="px-2 text-white/50">...</span>'),o+=`
                <button onclick="gameSearch.goToPage(${t})" 
                        class="px-4 py-3 glass-effect hover:bg-white/20 text-white/70 hover:text-white rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20 font-medium">
                    ${t}
                </button>
            `),this.currentPage<t&&(o+=`
                <button onclick="gameSearch.goToPage(${this.currentPage+1})" 
                        class="px-4 py-3 glass-effect hover:bg-white/20 text-white/70 hover:text-white rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20 group">
                    <i class="fas fa-chevron-right group-hover:scale-110 transition-transform duration-200"></i>
                </button>
            `),e.innerHTML=`
            <div class="flex items-center justify-center gap-3 flex-wrap">
                ${o}
            </div>
            <div class="text-center mt-4 text-white/60 text-sm">
                Page ${this.currentPage} of ${t} • ${this.searchResults.length} games total
            </div>
        `}goToPage(e){this.currentPage=e,this.displaySearchResults(),document.getElementById("search-results").scrollIntoView({behavior:"smooth",block:"start"})}showRecentAdditions(){const e=document.getElementById("recent-additions"),t=document.getElementById("recent-grid"),o=this.games.filter(r=>{if(!r.addedDate)return!1;const n=new Date(r.addedDate),d=new Date(Date.now()-30*24*60*60*1e3);return n>d}).sort((r,n)=>new Date(n.addedDate)-new Date(r.addedDate)).slice(0,12);if(o.length===0){e.classList.add("hidden");return}e.classList.remove("hidden");const s=o.map((r,n)=>{const d=this.createGameCard(r);return`<div class="animate-fade-in-up" style="animation-delay: ${n*100}ms">${d}</div>`}).join("");t.innerHTML=s;const a=e.querySelector("h2");a&&(a.innerHTML=`
                <i class="fas fa-clock text-emerald-400 mr-3"></i>
                Recently Added Games
                <span class="ml-3 px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium">
                    ${o.length} games
                </span>
            `)}hideRecentAdditions(){document.getElementById("recent-additions").classList.add("hidden")}hideSearchResults(){document.getElementById("search-results").classList.add("hidden"),document.getElementById("no-results").classList.add("hidden")}populateSourceFilter(){const e=document.getElementById("source-filter");if(!e)return;const t=[...new Set(this.games.map(s=>s.source).filter(Boolean))];e.innerHTML='<option value="">All Sources</option>',t.sort().forEach(s=>{const a=document.createElement("option");a.value=s,a.textContent=s,e.appendChild(a)});const o=e.parentElement.querySelector(".custom-dropdown-menu");if(o){o.innerHTML=`
                <div class="custom-dropdown-option px-3 py-2 text-white/90 cursor-pointer transition-all duration-200 border-b border-white/5" data-value="">
                    <i class="fas fa-globe text-emerald-400/70 mr-3"></i>All Sources
                </div>
            `,t.sort().forEach(a=>{const r=document.createElement("div");r.className="custom-dropdown-option px-3 py-2 text-white/90 cursor-pointer transition-all duration-200 border-b border-white/5",r.setAttribute("data-value",a),r.innerHTML=`<i class="fas fa-server text-emerald-400/70 mr-3"></i>${a}`,o.appendChild(r)});const s=o.querySelectorAll(".custom-dropdown-option");s.forEach(a=>{a.addEventListener("click",function(){const r=this.dataset.value,n=this.textContent.trim();e.value=r;const d=e.parentElement.querySelector(".dropdown-text");d&&(d.textContent=n),s.forEach(l=>l.classList.remove("selected")),this.classList.add("selected"),o.classList.add("hidden"),e.dispatchEvent(new Event("change"))})})}}updateStats(e=null){const t=document.getElementById("total-games"),o=document.getElementById("total-sources"),s=document.getElementById("last-updated");if(t){const a=(e==null?void 0:e.totalGames)||this.games.length;t.textContent=a.toLocaleString()}if(o){const a=(e==null?void 0:e.sourcesProcessed)||this.sources.length;o.textContent=a.toLocaleString()}if(s&&this.lastUpdated){const a=new Date(this.lastUpdated),r=e!=null&&e.cached?" (cached)":"";s.textContent=this.formatDate(a)+r}this.populateSourceFilter()}showError(e){const t=document.getElementById("error-message");t&&(t.textContent=e,t.classList.remove("hidden")),console.error(e)}hideError(){const e=document.getElementById("error-message");e&&e.classList.add("hidden")}escapeHtml(e){if(!e)return"";const t=document.createElement("div");return t.textContent=e,t.innerHTML}formatDate(e){if(!e)return"Unknown";try{return new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})}catch{return"Unknown"}}}window.copyToClipboard=async function(i){try{await navigator.clipboard.writeText(i),typeof Swal<"u"&&Swal.fire({icon:"success",title:"📋 Download Link Copied!",html:`<div style="color: #10b981; font-weight: 500; margin-top: 8px;">
                         Download link successfully copied to clipboard
                         <br><small style="color: #9ca3af; margin-top: 4px; display: block;">Ready to paste anywhere</small>
                       </div>`,timer:2500,showConfirmButton:!1,position:"top-end",toast:!0,background:"linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",color:"#fff",customClass:{popup:"copy-download-popup",title:"copy-download-title",htmlContainer:"copy-download-content"},didOpen:()=>{const e=Swal.getPopup();e&&(e.style.border="1px solid #10b981",e.style.boxShadow="0 20px 25px -5px rgba(16, 185, 129, 0.1), 0 10px 10px -5px rgba(16, 185, 129, 0.04)",e.style.borderRadius="16px",e.style.width="350px",e.style.maxWidth="90vw")}})}catch(e){console.error("Failed to copy to clipboard:",e)}};window.copySourceUrlWithFeedback=async function(i,e){const t=i.querySelector("i"),o=t.className;t.className="fas fa-spinner fa-spin",i.disabled=!0;try{await copySourceUrl(e),t.className="fas fa-check",i.classList.add("copy-success"),i.style.borderColor="#10b981",i.style.backgroundColor="rgba(16, 185, 129, 0.1)",setTimeout(()=>{t.className=o,i.classList.remove("copy-success"),i.style.borderColor="",i.style.backgroundColor="",i.disabled=!1},1500)}catch{t.className="fas fa-times",i.classList.add("copy-error"),i.style.borderColor="#ef4444",i.style.backgroundColor="rgba(239, 68, 68, 0.1)",setTimeout(()=>{t.className=o,i.classList.remove("copy-error"),i.style.borderColor="",i.style.backgroundColor="",i.disabled=!1},1500)}};window.copySourceUrl=async function(i){try{let e=window.gameSearch.sources.find(t=>t.title===i);if(e||(e=window.gameSearch.sources.find(t=>t.title.toLowerCase().includes(i.toLowerCase())||i.toLowerCase().includes(t.title.toLowerCase()))),!e){const t=i.replace(/\(RU\)|\[.*?\]/g,"").trim();e=window.gameSearch.sources.find(o=>o.title.replace(/\(RU\)|\[.*?\]/g,"").trim().toLowerCase()===t.toLowerCase())}if(!e){console.error("Source not found:",i),console.log("Available sources:",window.gameSearch.sources.map(t=>t.title)),console.log("Searching for source name:",i),typeof Swal<"u"&&Swal.fire({icon:"error",title:"❌ Source Not Found",html:`<div style="color: #ef4444; font-weight: 500; margin-top: 8px;">
                             Could not find URL for source: <strong style="color: #fff;">${i}</strong>
                             <br><small style="color: #9ca3af; margin-top: 4px; display: block;">Check console for available sources</small>
                           </div>`,timer:4e3,showConfirmButton:!1,position:"top-end",toast:!0,background:"linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",color:"#fff",customClass:{popup:"copy-error-popup",title:"copy-error-title",htmlContainer:"copy-error-content"},didOpen:()=>{const t=Swal.getPopup();t&&(t.style.border="1px solid #ef4444",t.style.boxShadow="0 20px 25px -5px rgba(239, 68, 68, 0.1), 0 10px 10px -5px rgba(239, 68, 68, 0.04)",t.style.borderRadius="16px",t.style.width="350px",t.style.maxWidth="90vw")}});return}await navigator.clipboard.writeText(e.url),typeof Swal<"u"&&Swal.fire({icon:"success",title:"✨ Successfully Copied!",html:`<div style="color: #10b981; font-weight: 500; margin-top: 8px;">
                         Source URL for <strong style="color: #fff;">${e.title}</strong> copied to clipboard
                       </div>`,timer:2500,showConfirmButton:!1,position:"top-end",toast:!0,background:"linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",color:"#fff",customClass:{popup:"copy-success-popup",title:"copy-success-title",htmlContainer:"copy-success-content"},didOpen:()=>{const t=Swal.getPopup();t&&(t.style.border="1px solid #10b981",t.style.boxShadow="0 20px 25px -5px rgba(16, 185, 129, 0.1), 0 10px 10px -5px rgba(16, 185, 129, 0.04)",t.style.borderRadius="16px",t.style.width="350px",t.style.maxWidth="90vw")}})}catch(e){console.error("Failed to copy source URL to clipboard:",e),typeof Swal<"u"&&Swal.fire({icon:"error",title:"⚠️ Copy Failed",html:`<div style="color: #f59e0b; font-weight: 500; margin-top: 8px;">
                         Failed to copy to clipboard
                         <br><small style="color: #9ca3af; margin-top: 4px; display: block;">Please try again or copy manually</small>
                       </div>`,timer:3e3,showConfirmButton:!1,position:"top-end",toast:!0,background:"linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",color:"#fff",customClass:{popup:"copy-fail-popup",title:"copy-fail-title",htmlContainer:"copy-fail-content"},didOpen:()=>{const t=Swal.getPopup();t&&(t.style.border="1px solid #f59e0b",t.style.boxShadow="0 20px 25px -5px rgba(245, 158, 11, 0.1), 0 10px 10px -5px rgba(245, 158, 11, 0.04)",t.style.borderRadius="16px",t.style.width="350px",t.style.maxWidth="90vw")}})}};const u=new h;window.gameSearch=u;
