import"./index-C2MPDDHe.js";/* empty css                         */class u{constructor(){this.games=[],this.sources=[],this.isLoading=!1,this.currentPage=1,this.gamesPerPage=12,this.searchResults=[],this.lastFetchTime=null,this.fetchInterval=10*60*1e3,this.init()}async init(){this.setupEventListeners(),this.hideSearchResults(),await this.loadSources(),await this.loadGamesData(),setInterval(()=>{this.isLoading||this.loadGamesData()},this.fetchInterval),this.hideSearchResults(),this.showRecentAdditions(),this.initCountdownTimer()}initCountdownTimer(){const e=document.getElementById("update-countdown");e&&(e.classList.remove("loading-hidden"),e.classList.add("content-visible")),this.updateCountdown(),setInterval(()=>{this.updateCountdown()},1e3)}getNextUpdateTime(){const e=new Date,s=e.getUTCMinutes();e.getUTCSeconds();let a;s<9?a=9:s<39?a=39:(a=9,e.setUTCHours(e.getUTCHours()+1));const t=new Date(e);return t.setUTCMinutes(a),t.setUTCSeconds(0),t.setUTCMilliseconds(0),t}updateCountdown(){const e=this.getNextUpdateTime(),s=new Date,a=e.getTime()-s.getTime();if(a<=0){this.updateCountdown();return}const t=Math.floor(a/(1e3*60*60)),o=Math.floor(a%(1e3*60*60)/(1e3*60)),i=Math.floor(a%(1e3*60)/1e3),r=`${t.toString().padStart(2,"0")}:${o.toString().padStart(2,"0")}:${i.toString().padStart(2,"0")}`,n=document.getElementById("countdown-timer"),d=document.getElementById("next-update-time");if(n&&(n.textContent=r),d){const c={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",timeZone:"UTC",timeZoneName:"short"};d.textContent=`${e.toLocaleString("en-US",c)}`}}async loadSources(){try{const s=await(await fetch("/data/resources.json")).json();this.sources=s.sources||[],console.log(`Loaded ${this.sources.length} sources`)}catch(e){console.error("Error loading sources:",e),this.sources=[]}}async loadGamesData(){if(!this.isLoading){this.isLoading=!0,this.updateLoadingState(!0);try{const e=new AbortController,s=setTimeout(()=>e.abort(),3e4),a=await fetch("https://api.hydralibrary.com/games",{signal:e.signal});if(clearTimeout(s),!a.ok)throw new Error(`HTTP ${a.status}: ${a.statusText}`);const t=await a.json();if(t.games||t.success){let o=t.games||t.data||[];this.games=o.map(r=>({...r,addedDate:r.addedDate||r.uploadDate,size:r.size||r.fileSize})),this.lastUpdated=t.lastProcessed||t.lastUpdated||Date.now(),this.lastFetchTime=Date.now();const i=t.cached?`cached (${Math.floor(t.cacheAge/60)}m old)`:"fresh data";console.log(`Loaded ${t.totalGames||this.games.length} games from ${t.sourcesCount||t.sourcesProcessed||"unknown"} sources (${i})`),this.updateStats(t),this.hideError(),this.hideSearchResults(),this.showRecentAdditions()}else throw new Error(t.error||"Failed to fetch games data")}catch(e){console.error("Error loading games data:",e),e.name==="AbortError"?this.showError("Request timed out. The server might be processing data. Please try again in a few minutes."):this.showError(`Failed to load games data: ${e.message}. Please try again later.`)}finally{this.isLoading=!1,this.updateLoadingState(!1)}}}updateLoadingState(e){const s=document.getElementById("loading-state"),a=document.getElementById("search-results");e?(s.classList.remove("hidden"),a.classList.add("hidden"),this.hideAllContent(),this.updateSearchInputState(!1)):(s.classList.add("hidden"),a.classList.remove("hidden"),this.showAllContentWithAnimation(),this.updateSearchInputState(!0))}hideAllContent(){["hero-section","search-section","stats-section","recent-additions"].forEach(s=>{const a=document.getElementById(s);a&&(a.classList.add("loading-hidden"),a.classList.remove("content-visible"),a.classList.remove("animate-fade-in-up","animate-slide-in-left","animate-slide-in-right","animate-scale-in","animate-delay-100","animate-delay-200","animate-delay-300","animate-delay-400","animate-delay-500","animate-delay-600","animate-delay-700"))})}showAllContentWithAnimation(){[{id:"hero-section",animation:"animate-fade-in-up",delay:"animate-delay-100"},{id:"search-section",animation:"animate-slide-in-left",delay:"animate-delay-100"},{id:"stats-section",animation:"animate-scale-in",delay:"animate-delay-100"},{id:"recent-additions",animation:"animate-slide-in-right",delay:"animate-delay-100"}].forEach(({id:s,animation:a,delay:t})=>{const o=document.getElementById(s);o&&setTimeout(()=>{o.classList.remove("loading-hidden"),o.classList.add("content-visible",a,t)})})}updateSearchInputState(e){const s=document.getElementById("game-search"),a=document.getElementById("source-filter"),t=document.getElementById("sort-filter");e&&this.games.length>0?(s.disabled=!1,s.placeholder="Search for games...",a.disabled=!1,t.disabled=!1,s.classList.remove("opacity-50","cursor-not-allowed")):(s.disabled=!0,s.placeholder="Loading games...",a.disabled=!0,t.disabled=!0,s.classList.add("opacity-50","cursor-not-allowed"))}updateProgress(e){console.log(`Loading progress: ${e}%`)}setupEventListeners(){const e=document.getElementById("game-search"),s=document.getElementById("source-filter"),a=document.getElementById("sort-filter");let t;e.addEventListener("input",r=>{clearTimeout(t);const n=r.target.value.trim();if(n===""){this.searchResults=[],this.hideSearchResults(),this.showRecentAdditions();return}t=setTimeout(()=>{n.length>=3&&this.performSearch(n)},300)}),s.addEventListener("change",()=>this.applyFilters()),a.addEventListener("change",()=>this.applyFilters()),e.addEventListener("keypress",r=>{if(r.key==="Enter"){clearTimeout(t);const n=r.target.value.trim();n.length>=3?this.performSearch(n):n===""&&(this.searchResults=[],this.hideSearchResults(),this.showRecentAdditions())}});const o=document.getElementById("results-grid"),i=document.getElementById("recent-grid");[o,i].forEach(r=>{r&&r.addEventListener("click",async n=>{const d=n.target.closest(".copy-source-button");if(d){const c=d.getAttribute("data-source-url"),h=d.getAttribute("data-source-name");c&&await this.copySourceUrlDirect(d,c,h)}})}),this.updateSearchInputState(!1)}setupAutoRefresh(){setInterval(()=>{this.isLoading||this.loadGamesData()},this.fetchInterval)}async performSearch(e){if(!this.isLoading){if(e.trim()===""){this.searchResults=[],this.hideSearchResults(),this.showRecentAdditions();return}this.showSearchLoading(),this.hideRecentAdditions();try{const s=await fetch(`https://api.hydralibrary.com/games?q=${encodeURIComponent(e)}`);if(!s.ok)throw new Error(`HTTP ${s.status}: ${s.statusText}`);const a=await s.json();this.hideSearchLoading();let t=a.games||[];this.searchResults=t.map(o=>({...o,addedDate:o.addedDate||o.uploadDate,size:o.size||o.fileSize})),this.currentPage=1,this.applyFilters()}catch(s){console.error("Search error:",s),this.hideSearchLoading(),this.searchResults=[],this.displaySearchResults()}}}showSearchLoading(){const e=document.getElementById("search-results"),s=document.getElementById("no-results"),a=document.getElementById("results-grid");e.classList.remove("hidden"),s.classList.add("hidden"),a.innerHTML=`
            <div class="col-span-full flex flex-col items-center justify-center py-20">
                <div class="relative mb-6">
                    <div class="animate-spin rounded-full h-16 w-16 border-4 border-emerald-500/30 border-t-emerald-500"></div>
                    <div class="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse"></div>
                </div>
                <div class="text-center">
                    <div class="text-white text-xl font-semibold mb-2">Searching Games...</div>
                    <div class="text-white/70 text-base">Please wait while we find matching games</div>
                </div>
            </div>
        `}hideSearchLoading(){}searchGames(e){const s=e.toLowerCase().split(" ").filter(t=>t.length>0),a=e.toLowerCase();return this.games.filter(t=>{const o=t.title.toLowerCase(),i=(t.description||"").toLowerCase(),r=(t.tags?t.tags.join(" "):"").toLowerCase();return s.every(n=>o.includes(n)||i.includes(n)||r.includes(n))}).map(t=>{t.title.toLowerCase();const o=this.calculateRelevanceScore(t,a,s);return{...t,relevanceScore:o}}).sort((t,o)=>o.relevanceScore-t.relevanceScore)}calculateRelevanceScore(e,s,a){const t=e.title.toLowerCase(),o=(e.description||"").toLowerCase(),i=(e.tags?e.tags.join(" "):"").toLowerCase();let r=0;if(t===s?r+=1e3:t.startsWith(s)?r+=800:t.includes(s)&&(r+=600),a.forEach(n=>{new RegExp(`\\b${this.escapeRegex(n)}\\b`,"i").test(e.title)?r+=400:t.includes(n)&&(r+=200)}),a.forEach(n=>{o.includes(n)&&(r+=50)}),a.forEach(n=>{i.includes(n)&&(r+=30)}),e.uploadDate){const n=new Date(e.uploadDate);(Date.now()-n.getTime())/(1e3*60*60*24)<30&&(r+=20)}return r}escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}applyFilters(){if(this.isLoading)return;const e=document.getElementById("source-filter").value,s=document.getElementById("sort-filter").value,a=document.getElementById("game-search"),t=a?a.value.trim():"";let o;switch(this.searchResults&&this.searchResults.length>0?o=[...this.searchResults]:t===""?o=[...this.games]:o=[],e&&(o=o.filter(i=>i.source===e)),s){case"name":o.sort((i,r)=>i.title.localeCompare(r.title));break;case"date":o.sort((i,r)=>{const n=new Date(i.uploadDate||i.addedDate||0);return new Date(r.uploadDate||r.addedDate||0)-n});break;case"relevance":default:t===""?o.sort((i,r)=>{const n=new Date(i.uploadDate||i.addedDate||0);return new Date(r.uploadDate||r.addedDate||0)-n}):o.sort((i,r)=>(r.relevanceScore||0)-(i.relevanceScore||0));break}this.searchResults=o,this.currentPage=1,t!==""||e?(this.displaySearchResults(),document.getElementById("search-results").classList.remove("hidden"),this.hideRecentAdditions()):(this.hideSearchResults(),this.showRecentAdditions())}displaySearchResults(){const e=document.getElementById("search-results"),s=document.getElementById("results-grid"),a=document.getElementById("results-count"),t=document.getElementById("no-results");if(this.searchResults.length===0){e.classList.add("hidden"),t.classList.remove("hidden");return}t.classList.add("hidden"),e.classList.remove("hidden"),a.textContent=`${this.searchResults.length} games found`;const o=(this.currentPage-1)*this.gamesPerPage,i=o+this.gamesPerPage,r=this.searchResults.slice(o,i);s.innerHTML=r.map(n=>this.createGameCard(n)).join(""),this.updatePagination()}createGameCard(e){return`
            <div class="group relative bg-[#111]/40 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 flex flex-col h-full">
                
                <!-- Card Content -->
                <div class="p-5 flex flex-col h-full relative z-10">
                    
                    <!-- Top Row: Source Badge -->
                    <div class="flex justify-between mb-3 gap-2">
                        ${e.sourceTag?this.renderStatusBadge(e.sourceTag):""}
                        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <i class="fas fa-server text-[10px]"></i>
                            ${this.escapeHtml(e.source)}
                        </span>
                    </div>

                    <!-- Title -->
                    <h3 class="text-lg font-bold text-white mb-2 line-clamp-2 leading-tight group-hover:text-emerald-400 transition-colors duration-300" title="${this.escapeHtml(e.title)}">
                        ${this.escapeHtml(e.title)}
                    </h3>

                    <!-- Metadata Grid -->
                    <div class="grid grid-cols-2 gap-3 mt-auto mb-4">
                        <div class="flex flex-col">
                            <span class="text-[10px] text-white/40 uppercase tracking-wider font-medium">Size</span>
                            <div class="flex items-center gap-1.5 text-white/80 text-sm">
                                <i class="fas fa-hdd text-emerald-500/70 text-xs"></i>
                                <span>${e.size?this.escapeHtml(e.size):"Unknown"}</span>
                            </div>
                        </div>
                        <div class="flex flex-col">
                            <span class="text-[10px] text-white/40 uppercase tracking-wider font-medium">Date</span>
                            <div class="flex items-center gap-1.5 text-white/80 text-sm">
                                <i class="fas fa-calendar text-emerald-500/70 text-xs"></i>
                                <span>${this.formatDate(e.addedDate)}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex gap-2 mt-2 pt-4 border-t border-white/5">
                        ${e.downloadUrl?`
                            <a href="${this.escapeHtml(e.downloadUrl)}" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               class="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-white hover:text-emerald-400 border border-white/5 hover:border-emerald-500/30 transition-all duration-300 text-sm font-medium group/btn">
                                <i class="fas fa-download group-hover/btn:scale-110 transition-transform"></i>
                                <span>Download</span>
                            </a>
                        `:""}
                        
                        <button data-source-url="${this.escapeHtml(e.sourceUrl||"")}"
                                data-source-name="${this.escapeHtml(e.source)}"
                                class="copy-source-button ${e.downloadUrl?"w-10":"w-full flex-1"} flex items-center justify-center gap-2 px-0 py-2.5 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-white hover:text-emerald-400 border border-white/5 hover:border-emerald-500/30 transition-all duration-300 text-sm font-medium group/btn"
                                title="Copy source URL">
                            <i class="fas fa-copy group-hover/btn:scale-101 transition-transform"></i>
                            ${e.downloadUrl?"":"<span>Copy Source</span>"}
                        </button>
                    </div>
                </div>
                
                <!-- Hover Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
        `}renderStatusBadge(e){if(!e)return"";const s=e.toLowerCase().replace(/\s+/g,"-"),t={trusted:{color:"emerald",icon:"shield",customClass:"bg-emerald-500/10 border-emerald-500/20 text-emerald-400"},"safe-for-use":{color:"blue",icon:"check-circle",customClass:"bg-blue-500/10 border-blue-500/20 text-blue-400"},"use-at-your-own-risk":{color:"red",icon:"exclamation-triangle",customClass:"bg-red-500/10 border-red-500/20 text-red-400"},abandoned:{color:"gray",icon:"times-circle",customClass:"bg-gray-500/10 border-gray-500/20 text-gray-400"},nsfw:{color:"purple",icon:"exclamation-circle",customClass:"bg-purple-500/10 border-purple-500/20 text-purple-400"}}[s]||{color:"gray",icon:"circle",customClass:"bg-gray-500/10 border-gray-500/20 text-gray-400"};return`
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${t.customClass}">
                <i class="fas fa-${t.icon} text-[10px]"></i>
                ${this.escapeHtml(e)}
            </span>
        `}async copySourceUrlDirect(e,s,a){const t=e.querySelector("i"),o=t.className;t.className="fas fa-spinner fa-spin",e.disabled=!0;try{await navigator.clipboard.writeText(s),t.className="fas fa-check",e.classList.add("copy-success"),e.style.borderColor="#10b981",e.style.backgroundColor="rgba(16, 185, 129, 0.1)",setTimeout(()=>{t.className=o,e.classList.remove("copy-success"),e.style.borderColor="",e.style.backgroundColor="",e.disabled=!1},1500)}catch(i){console.error("Failed to copy source URL:",i),t.className="fas fa-times",e.classList.add("copy-error"),e.style.borderColor="#ef4444",e.style.backgroundColor="rgba(239, 68, 68, 0.1)",setTimeout(()=>{t.className=o,e.classList.remove("copy-error"),e.style.borderColor="",e.style.backgroundColor="",e.disabled=!1},1500)}}updatePagination(){const e=document.getElementById("pagination"),s=Math.ceil(this.searchResults.length/this.gamesPerPage);if(s<=1){e.innerHTML="";return}let a="";this.currentPage>1&&(a+=`
                <button onclick="gameSearch.goToPage(${this.currentPage-1})" 
                        class="px-4 py-3 glass-effect hover:bg-white/20 text-white/70 hover:text-white rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20 group">
                    <i class="fas fa-chevron-left group-hover:scale-110 transition-transform duration-200"></i>
                </button>
            `);const t=Math.max(1,this.currentPage-2),o=Math.min(s,this.currentPage+2);t>1&&(a+=`
                <button onclick="gameSearch.goToPage(1)" 
                        class="px-4 py-3 glass-effect hover:bg-white/20 text-white/70 hover:text-white rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20 font-medium">
                    1
                </button>
            `,t>2&&(a+='<span class="px-2 text-white/50">...</span>'));for(let i=t;i<=o;i++){const r=i===this.currentPage;a+=`
                <button onclick="gameSearch.goToPage(${i})" 
                        class="px-4 py-3 ${r?"bg-gradient-to-r from-emerald-500/20 to-emerald-400/10 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/20":"glass-effect hover:bg-white/20 text-white/70 hover:text-white border border-white/10 hover:border-white/20"} 
                               rounded-xl transition-all duration-300 font-medium min-w-[48px]">
                    ${i}
                </button>
            `}o<s&&(o<s-1&&(a+='<span class="px-2 text-white/50">...</span>'),a+=`
                <button onclick="gameSearch.goToPage(${s})" 
                        class="px-4 py-3 glass-effect hover:bg-white/20 text-white/70 hover:text-white rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20 font-medium">
                    ${s}
                </button>
            `),this.currentPage<s&&(a+=`
                <button onclick="gameSearch.goToPage(${this.currentPage+1})" 
                        class="px-4 py-3 glass-effect hover:bg-white/20 text-white/70 hover:text-white rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20 group">
                    <i class="fas fa-chevron-right group-hover:scale-110 transition-transform duration-200"></i>
                </button>
            `),e.innerHTML=`
            <div class="flex items-center justify-center gap-3 flex-wrap">
                ${a}
            </div>
            <div class="text-center mt-4 text-white/60 text-sm">
                Page ${this.currentPage} of ${s} • ${this.searchResults.length} games total
            </div>
        `}goToPage(e){this.currentPage=e,this.displaySearchResults(),document.getElementById("search-results").scrollIntoView({behavior:"smooth",block:"start"})}showRecentAdditions(){const e=document.getElementById("recent-additions"),s=document.getElementById("recent-grid"),a=this.games.filter(i=>{if(!i.addedDate)return!1;const r=new Date(i.addedDate),n=new Date(Date.now()-30*24*60*60*1e3);return r>n}).sort((i,r)=>new Date(r.addedDate)-new Date(i.addedDate)).slice(0,12);if(a.length===0){e.classList.add("hidden");return}e.classList.remove("hidden");const t=a.map((i,r)=>{const n=this.createGameCard(i);return`<div class="animate-fade-in-up" style="animation-delay: ${r*100}ms">${n}</div>`}).join("");s.innerHTML=t;const o=e.querySelector("h2");o&&(o.innerHTML=`
                <i class="fas fa-clock text-emerald-400 mr-3"></i>
                Recently Added Games
                <span class="ml-3 px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium">
                    ${a.length} games
                </span>
            `)}hideRecentAdditions(){document.getElementById("recent-additions").classList.add("hidden")}hideSearchResults(){document.getElementById("search-results").classList.add("hidden"),document.getElementById("no-results").classList.add("hidden")}populateSourceFilter(){const e=document.getElementById("source-filter");if(!e)return;const s=[...new Set(this.games.map(t=>t.source).filter(Boolean))];e.innerHTML='<option value="">All Sources</option>',s.sort().forEach(t=>{const o=document.createElement("option");o.value=t,o.textContent=t,e.appendChild(o)});const a=e.parentElement.querySelector(".custom-dropdown-menu");if(a){a.innerHTML=`
                <div class="custom-dropdown-option px-3 py-2 text-white/90 cursor-pointer transition-all duration-200 border-b border-white/5" data-value="">
                    <i class="fas fa-globe text-emerald-400/70 mr-3"></i>All Sources
                </div>
            `,s.sort().forEach(o=>{const i=document.createElement("div");i.className="custom-dropdown-option px-3 py-2 text-white/90 cursor-pointer transition-all duration-200 border-b border-white/5",i.setAttribute("data-value",o),i.innerHTML=`<i class="fas fa-server text-emerald-400/70 mr-3"></i>${o}`,a.appendChild(i)});const t=a.querySelectorAll(".custom-dropdown-option");t.forEach(o=>{o.addEventListener("click",function(){const i=this.dataset.value,r=this.textContent.trim();e.value=i;const n=e.parentElement.querySelector(".dropdown-text");n&&(n.textContent=r),t.forEach(d=>d.classList.remove("selected")),this.classList.add("selected"),a.classList.add("hidden"),e.dispatchEvent(new Event("change"))})})}}updateStats(e=null){const s=document.getElementById("total-games"),a=document.getElementById("total-sources"),t=document.getElementById("last-updated");if(s){const o=(e==null?void 0:e.totalGames)||this.games.length;s.textContent=o.toLocaleString()}if(a){const o=(e==null?void 0:e.sourcesCount)||(e==null?void 0:e.sourcesProcessed)||this.sources.length;a.textContent=o.toLocaleString()}if(t&&this.lastUpdated){const o=new Date(this.lastUpdated),i=e!=null&&e.cached?" (cached)":"";t.textContent=this.formatDate(o)+i}this.populateSourceFilter()}showError(e){const s=document.getElementById("error-message");s&&(s.textContent=e,s.classList.remove("hidden")),console.error(e)}hideError(){const e=document.getElementById("error-message");e&&e.classList.add("hidden")}escapeHtml(e){if(!e)return"";const s=document.createElement("div");return s.textContent=e,s.innerHTML}formatDate(e){if(!e)return"Unknown";try{return new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})}catch{return"Unknown"}}}window.copyToClipboard=async function(l){try{await navigator.clipboard.writeText(l),typeof Swal<"u"&&Swal.fire({icon:"success",title:"📋 Download Link Copied!",html:`<div style="color: #10b981; font-weight: 500; margin-top: 8px;">
                         Download link successfully copied to clipboard
                         <br><small style="color: #9ca3af; margin-top: 4px; display: block;">Ready to paste anywhere</small>
                       </div>`,timer:2500,showConfirmButton:!1,position:"top-end",toast:!0,background:"linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",color:"#fff",customClass:{popup:"copy-download-popup",title:"copy-download-title",htmlContainer:"copy-download-content"},didOpen:()=>{const e=Swal.getPopup();e&&(e.style.border="1px solid #10b981",e.style.boxShadow="0 20px 25px -5px rgba(16, 185, 129, 0.1), 0 10px 10px -5px rgba(16, 185, 129, 0.04)",e.style.borderRadius="16px",e.style.width="350px",e.style.maxWidth="90vw")}})}catch(e){console.error("Failed to copy to clipboard:",e)}};const m=new u;window.gameSearch=m;
