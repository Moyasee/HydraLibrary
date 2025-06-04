import{c as Tt,i as w,r as rt,d as ot,g as it,u as vt}from"./index-C1xm5zC9.js";const dt="https://libraryratingsdb.zxcsixx.workers.dev/api/ratings",At=5*60*1e3,et={data:{},lastUpdated:{},get:function(t){const e=this.data[t],a=this.lastUpdated[t];return e&&a&&Date.now()-a<At?Promise.resolve(e):null},set:function(t,e){return this.data[t]=e,this.lastUpdated[t]=Date.now(),e},batchGet:function(t){const e={cached:{},uncached:[]};return t.forEach(a=>{const s=this.get(a);s?e.cached[a]=s:e.uncached.push(a)}),e},batchSet:function(t){Object.entries(t).forEach(([e,a])=>{this.set(e,a)})}};function Mt(t){const e=new Date(t),s=Math.floor((new Date-e)/1e3);let n=Math.floor(s/31536e3);return n>=1?n+" year"+(n===1?"":"s")+" ago":(n=Math.floor(s/2592e3),n>=1?n+" month"+(n===1?"":"s")+" ago":(n=Math.floor(s/86400),n>=1?n+" day"+(n===1?"":"s")+" ago":(n=Math.floor(s/3600),n>=1?n+" hour"+(n===1?"":"s")+" ago":(n=Math.floor(s/60),n>=1?n+" minute"+(n===1?"":"s")+" ago":"just now"))))}function Y(t){return String(t).replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function qt(t){let e=localStorage.getItem("hydra_rating_hash");return e||(e=Math.random().toString(36).slice(2)+Date.now(),localStorage.setItem("hydra_rating_hash",e)),e}function Pt(t){document.querySelectorAll(".rating-modal").forEach(d=>d.remove());const e=document.createElement("div");e.className="rating-modal fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4",e.innerHTML=`
    <div class="fixed inset-0 bg-black/90 backdrop-blur-sm animate-fade-in"></div>
    <div class="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-xl max-w-4xl w-full mx-2 sm:mx-4 my-4 max-h-[90vh] sm:max-h-[90vh] flex flex-col shadow-2xl border border-white/5 animate-fade-in transform transition-all duration-300 ease-out overflow-hidden">
      <div class="flex flex-col p-4 sm:p-6 space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex-1 pr-4">
            <h2 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 mb-1 line-clamp-2">${Y(t.title)}</h2>
            <a href="${Y(t.url)}" target="_blank" class="text-emerald-400/90 text-xs hover:text-emerald-300 transition-all duration-300 hover:underline hover:underline-offset-2 break-all line-clamp-1">
              <i class="fas fa-external-link-alt mr-1"></i>${Y(t.url)}
            </a>
          </div>
          <button class="close-rating-modal text-white/60 hover:text-white hover:bg-white/5 rounded-full h-9 w-9 flex items-center justify-center transition-all duration-200 hover:rotate-90">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <div class="bg-gradient-to-r from-emerald-900/20 to-blue-900/20 rounded-xl p-4 border border-white/5 shadow-inner">
          <div class="flex items-center gap-4">
            <div class="relative">
              <div class="text-3xl text-amber-400/90" id="rating-modal-stars"></div>
            </div>
            <div class="flex flex-col">
              <span class="text-white font-bold text-lg" id="rating-modal-avg"></span>
              <span class="text-white/60 text-sm" id="rating-modal-total"></span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="flex flex-col md:flex-row gap-3 sm:gap-6 px-3 sm:px-6 pb-3 sm:pb-6 -mt-2 overflow-y-auto flex-1">
        <!-- Left Column - Reviews -->
        <div class="flex-1 flex flex-col">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-white/90 font-semibold text-base flex items-center gap-2">
              <i class="fas fa-comments text-emerald-400"></i>
              Community Reviews
            </h3>
            <div class="relative">
              <select id="rating-sort-select" class="appearance-none bg-gray-800/60 border border-gray-700/50 text-white/90 text-sm rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/70 px-3 py-1.5 pr-8 transition-all duration-200 hover:bg-gray-800/80 cursor-pointer">
                <option value="recent">Most Recent</option>
                <option value="low">Lowest Rated</option>
                <option value="high">Highest Rated</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <i class="fas fa-chevron-down text-xs"></i>
              </div>
            </div>
          </div>
          <div class="h-[220px] sm:h-[360px] overflow-y-auto custom-scrollbar rounded-xl bg-gray-900/40 border border-white/5 p-2 sm:p-4 space-y-2 sm:space-y-4 text-sm sm:text-base" id="rating-comments-list">
            <!-- Reviews will be loaded here -->
          </div>
        </div>
        
        <!-- Right Column - Review Form -->
        <div class="md:w-72 w-full flex-shrink-0 mt-3 sm:mt-4 md:mt-0">
          <div class="sticky top-6">
            <div class="bg-gradient-to-r from-emerald-900/30 to-blue-900/30 rounded-t-xl p-4 border-b border-white/5">
              <h3 class="font-medium text-white flex items-center gap-2">
                <i class="fas fa-edit text-emerald-400"></i>
                Share Your Experience
              </h3>
              <p class="mt-1 text-xs text-white/60">Your feedback helps others make better choices</p>
            </div>
            <form id="submit-rating-form" class="flex flex-col space-y-2 sm:space-y-4 bg-gray-900/60 p-3 sm:p-5 rounded-b-xl border border-white/5">
              <div class="space-y-2">
                <label class="text-xs font-medium text-white/80 flex items-center">
                  <i class="fas fa-user-edit text-emerald-400/80 mr-2 text-xs"></i>
                  Nickname
                </label>
                <div class="relative">
                  <input 
                    type="text" 
                    name="nickname" 
                    maxlength="24" 
                    required 
                    placeholder="Your name" 
                    class="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-gray-800/70 border border-gray-700/50 text-white/90 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/70 transition-all duration-200 placeholder-gray-500"
                  >
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <i class="fas fa-user text-gray-500 text-xs"></i>
                  </div>
                </div>
              </div>
              
              <div class="space-y-2">
                <label class="text-xs font-medium text-white/80 flex items-center">
                  <i class="fas fa-star text-amber-400/80 mr-2 text-xs"></i>
                  Your Rating
                </label>
                <div class="relative">
                  <select 
                    name="rating" 
                    required 
                    class="appearance-none w-full px-4 py-2.5 pr-10 rounded-lg bg-gray-800/70 border border-gray-700/50 text-amber-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/70 transition-all duration-200 cursor-pointer"
                  >
                    <option value="" disabled selected>Select your rating</option>
                  <option value="5">★★★★★ Excellent</option>
                  <option value="4">★★★★ Very Good</option>
                  <option value="3">★★★ Good</option>
                  <option value="2">★★ Fair</option>
                  <option value="1">★ Poor</option>
                </select>
              </div>
              
              <div class="space-y-2">
                <label class="text-xs font-medium text-white/80 flex items-center">
                  <i class="fas fa-comment-alt text-blue-400/80 mr-2 text-xs"></i>
                  Your Review (Optional)
                </label>
                <div class="relative">
                  <textarea 
                    name="comment" 
                    maxlength="500" 
                    rows="4" 
                    placeholder="Share your detailed experience with this source..." 
                    class="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-gray-800/70 border border-gray-700/50 text-white/90 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/70 transition-all duration-200 placeholder-gray-500 resize-none"
                  ></textarea>
                  <div class="absolute bottom-2 right-2 bg-gray-900/80 px-2 py-0.5 rounded text-xs text-white/50">
                    <span class="char-count">0</span>/500
                  </div>
                </div>
              </div>
              
              <div class="flex items-center justify-between pt-1">
                <div class="text-xs text-white/60 flex items-center">
                  <i class="fas fa-shield-alt text-emerald-400/70 mr-1.5 text-xs"></i>
                  Your review will be moderated
                </div>
                <button 
                  type="submit" 
                  class="group relative overflow-hidden px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white text-sm font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg hover:shadow-emerald-500/20"
                >
                  <span class="relative z-10 flex items-center">
                    <i class="fas fa-paper-plane mr-2 text-xs"></i>
                    Submit Review
                  </span>
                  <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                </button>
              </div>
              <div id="rating-form-error" class="mt-1 text-red-400 text-xs min-h-[20px] bg-red-900/30 rounded py-1.5 px-2 border border-red-900/20 hidden"></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,document.body.appendChild(e),document.body.style.overflow="hidden",e.querySelector(".close-rating-modal").onclick=r,e.querySelector(".fixed.inset-0").onclick=d=>{d.target===e.querySelector(".fixed.inset-0")&&r()};async function a(d,u="en"){return new Promise((f,g)=>{const y=JSON.stringify({translate:"rapidapi"}),v=new XMLHttpRequest;v.withCredentials=!0,v.addEventListener("readystatechange",function(){if(this.readyState===this.DONE)try{const x=JSON.parse(this.responseText);if(x&&x.translation)f(x.translation);else throw x&&x.status!==200?new Error(x.business_message||"Translation service error"):new Error("Invalid response from translation service")}catch(x){console.error("Translation error:",x,this.responseText),g(x)}}),v.addEventListener("error",()=>{g(new Error("Network error during translation"))});const L=`https://free-google-translator.p.rapidapi.com/external-api/free-google-translator?from=auto&to=${u}&query=${encodeURIComponent(d)}`;v.open("POST",L),v.setRequestHeader("x-rapidapi-key",""),v.setRequestHeader("x-rapidapi-host","free-google-translator.p.rapidapi.com"),v.setRequestHeader("Content-Type","application/json"),v.send(y)})}async function s(d){const u=d.target.closest(".translate-comment");if(!u||u.disabled)return;d.preventDefault(),d.stopPropagation();const f=u.closest(".border-b"),g=f?f.querySelector(".comment-text p"):null;if(!g){console.error("Could not find comment text element");return}let y=u.getAttribute("data-original");if(u.classList.contains("active")){y&&(g.textContent=y,u.innerHTML='<i class="fas fa-language text-xs"></i><span class="hidden sm:inline">Translate</span>',u.classList.remove("active"),u.title="Translate this review"),u.disabled=!1;return}y=g.textContent.trim(),u.setAttribute("data-original",y),u.innerHTML,u.innerHTML='<i class="fas fa-spinner fa-spin text-xs"></i>',u.title="Translating...",u.disabled=!0;try{const v=await a(y,"en");g.textContent=v,u.innerHTML='<i class="fas fa-undo text-xs"></i><span class="hidden sm:inline">Original</span>',u.classList.add("active"),u.title="Show original text"}catch(v){console.error("Translation failed:",v),g.textContent=y,u.innerHTML='<i class="fas fa-exclamation-triangle text-xs"></i><span class="hidden sm:inline">Error</span>',u.title="Error translating. Click to try again."}finally{u.disabled=!1}}const n=e.querySelector("#rating-comments-list");n&&n.addEventListener("click",s);const i=e.querySelector('textarea[name="comment"]'),l=e.querySelector(".char-count");if(i&&l){const d=()=>{l.textContent=i.value.length};i.addEventListener("input",d),d(),e._cleanupCharCounter=()=>{i.removeEventListener("input",d)}}function r(){e._cleanupCharCounter&&e._cleanupCharCounter(),e.remove(),document.body.style.overflow=""}const c=5*60*1e3;let o=1,m="recent",p=0,b=!1,S=0,E=t.title;function C(){const d=`ratings_${encodeURIComponent(E)}`,u=localStorage.getItem(d);if(!u)return null;try{const{data:f,timestamp:g}=JSON.parse(u);if(Date.now()-g<c)return f}catch(f){console.warn("Error reading cache:",f)}return null}function H(d){try{const u=`ratings_${encodeURIComponent(E)}`,f={data:d,timestamp:Date.now()};localStorage.setItem(u,JSON.stringify(f))}catch(u){console.warn("Error saving to cache:",u)}}async function $(d=1,u=!1){if(b)return;const f=e.querySelector("#rating-comments-list");if(!f)return;f.innerHTML='<div class="flex justify-center items-center py-6"><div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-400"></div></div>';const g=u?null:C();if(g){console.log("Using cached data for:",E),T(g,d),Date.now()-S>c&&A(!0);return}await A()}function T(d,u=1){const f=e.querySelector("#rating-comments-list");if(f){if(f.innerHTML="",d.avg!==void 0){const g=parseFloat(d.avg).toFixed(1),y=parseInt(d.total)||0,v=e.querySelector("#rating-modal-stars"),L=e.querySelector("#rating-modal-avg"),x=e.querySelector("#rating-modal-total");if(v){v.innerHTML="";const D=Math.round(parseFloat(d.avg));v.innerHTML="★".repeat(D)+"☆".repeat(5-D)}L&&(L.textContent=`${g} out of 5`),x&&(x.textContent=`${y} ${y===1?"review":"reviews"}`)}if(!d.comments||d.comments.length===0){f.innerHTML=`
        <div class="text-center py-6 text-gray-400">
          No reviews yet. Be the first to leave a review!
        </div>
      `;return}H(d),d.pagination&&(p=d.pagination.total||0,k()),d.comments.forEach(g=>{if(!g)return;const y=document.createElement("div");y.className="border-b border-gray-700 py-4";const v=g.timestamp?new Date(g.timestamp).getTime():Date.now();y.innerHTML=`
        <div class="flex items-start justify-between mb-2">
          <div class="flex items-center">
            <div class="text-yellow-400 text-sm">
              ${"★".repeat(Math.round(g.rating||0))}${"☆".repeat(5-Math.round(g.rating||0))}
            </div>
            <span class="ml-2 text-sm text-gray-400">${(g.rating||0).toFixed(1)}</span>
          </div>
          <span class="text-xs text-gray-500">${Mt(v)}</span>
        </div>
        <div class="text-sm text-gray-300 mb-2 comment-text">
          <p>${Y(g.message||g.comment||"")}</p>
        </div>
        <div class="flex justify-between items-center text-xs text-gray-500">
          <span>${g.nickname||"Anonymous"}</span>
          <button class="translate-comment text-emerald-400 hover:text-emerald-300 text-xs flex items-center gap-1" 
                  title="Translate to English">
            <i class="fas fa-language text-xs"></i>
            <span class="hidden sm:inline">Translate</span>
          </button>
        </div>
      `,f.appendChild(y)})}}function k(){const d=e.querySelector(".pagination");if(!d)return;const u=Math.ceil(p/10);let f=`
      <div class="flex justify-between items-center text-sm">
        <button 
          class="px-3 py-1 rounded ${o<=1?"text-gray-500 cursor-not-allowed":"text-emerald-400 hover:bg-gray-700"}"
          ${o<=1?"disabled":""}
          onclick="document.querySelector('.rating-modal')._vm.loadPage(${o-1})"
        >
          Previous
        </button>
        <div class="text-gray-400">
          Page ${o} of ${u}
        </div>
        <button 
          class="px-3 py-1 rounded ${o>=u?"text-gray-500 cursor-not-allowed":"text-emerald-400 hover:bg-gray-700"}"
          ${o>=u?"disabled":""}
          onclick="document.querySelector('.rating-modal')._vm.loadPage(${o+1})"
        >
          Next
        </button>
      </div>
    `;d.innerHTML=f}window.loadPage=d=>{var f;if(!q)return;const u=Math.ceil((((f=q.comments)==null?void 0:f.length)||0)/M);d<1||d>u||(o=d,B())},e._vm={loadPage:window.loadPage};async function A(d=!1){var v,L;if(b)return;b=!0;const u=e.querySelector("#rating-comments-list");!d&&u&&(u.innerHTML='<div class="text-center py-4 text-gray-400">Loading comments...</div>');const f=`comments_${E}`,g=5*60*1e3,y=et.get(f);if(y&&Date.now()-y.timestamp<g){q=y,B(),b=!1;return}try{const x=await fetch(`${dt}?source=${encodeURIComponent(E)}&all=true`);if(!x.ok)throw new Error(`Failed to fetch comments: ${x.statusText}`);const D=await x.json();q={...D,comments:D.comments||[],pagination:{total:((v=D.comments)==null?void 0:v.length)||0,page:1,limit:((L=D.comments)==null?void 0:L.length)||0,totalPages:1}},et.set(f,{...q,timestamp:Date.now()}),S=Date.now(),B()}catch(x){console.error("Error fetching comments:",x),y?(q=y,B()):!d&&u&&(u.innerHTML=`
          <div class="text-red-500 text-center py-4">
            Failed to load comments. Please try again later.
            ${x.message?`<div class="text-xs mt-1">${x.message}</div>`:""}
          </div>
        `)}finally{b=!1}}let q=null;const M=10;function B(){if(!q)return;let d=[...q.comments||[]];switch(m){case"recent":d.sort((v,L)=>{const x=v.timestamp?new Date(v.timestamp).getTime():0;return(L.timestamp?new Date(L.timestamp).getTime():0)-x});break;case"high":d.sort((v,L)=>(L.rating||0)-(v.rating||0));break;case"low":d.sort((v,L)=>(v.rating||0)-(L.rating||0));break}const u=d.length,f=Math.ceil(u/M)||1;o=Math.min(Math.max(1,o),f);const g=(o-1)*M,y=d.slice(g,g+M);T({...q,comments:y,pagination:{total:u,page:o,limit:M,totalPages:f}},o)}function J(){const d=e.querySelector("#rating-sort-select");d&&(d.value=m,d.addEventListener("change",u=>{m=u.target.value,o=1,B()}))}J(),$(),$();const _=e.querySelector("#submit-rating-form"),R=e.querySelector("#rating-form-error");_.onsubmit=async d=>{d.preventDefault(),R.textContent="",R.className="text-sm text-rose-400 mt-2";const u=new FormData(_),f=(u.get("nickname")||"").trim(),g=u.get("rating"),y=(u.get("comment")||"").trim();if(!f){R.textContent="Please enter a nickname.";return}if(!g||isNaN(g)||g<1||g>5){R.textContent="Please select a valid rating between 1 and 5.";return}if(!y){R.textContent="Please enter a message.";return}if(y.split(/\s+/).length<3){R.textContent="Message must be at least 3 words long.";return}const v=qt(),L=`hydra_rating_${t.title}_${v}`;if(localStorage.getItem(L)){R.textContent="You have already submitted a review for this source.";return}const x=_.querySelector('button[type="submit"]'),D=x.innerHTML;x.disabled=!0,x.innerHTML="Submitting...";try{const z=await fetch(dt,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({source:t.title,nickname:f,rating:Number(g),message:y,ipHash:v})});if(!z.ok){const $t=await z.json().catch(()=>({}));throw new Error($t.message||"Failed to submit. Please try again.")}_.reset(),R.className="text-sm text-emerald-400 mt-2",R.textContent="Thank you! Your review has been submitted for moderation.",localStorage.setItem(L,"1");const It=`comments_${t.title}_${o}_${m}`;et.set(It,null),window.updateSourceCardRating&&window.updateSourceCardRating(t.title),setTimeout(()=>{$(1)},1e3)}catch(z){console.error("Submission error:",z),R.textContent=z.message||"Failed to submit. Please try again.";return}finally{x.disabled=!1,x.innerHTML=D}}}document.body.classList.add("preloading");document.addEventListener("DOMContentLoaded",async()=>{await Tt.initialize()});function Bt(){const t=document.getElementById("preloader"),e=t.querySelector(".loading-progress"),a=t.querySelector(".loading-percentage");let s=0;const n=()=>{const i=100-s,l=Math.min(i*.1,Math.max(.2,Math.random()*.8));s=Math.min(100,s+l),e.style.width=`${s}%`;const r=s<100?s.toFixed(1):Math.round(s);a.textContent=`${r}%`,s<30?a.className="loading-percentage text-sm font-medium text-white/70":s<60?a.className="loading-percentage text-sm font-medium text-emerald-400/70":a.className="loading-percentage text-sm font-medium text-emerald-400",s<100?requestAnimationFrame(n):setTimeout(()=>{t.classList.add("hiding"),t.addEventListener("transitionend",()=>{t.remove(),document.body.classList.remove("preloading"),w.updatePageContent(),at()},{once:!0})},1e3)};setTimeout(()=>{t&&document.body.contains(t)&&(console.log("Preloader safety timeout triggered"),t.classList.add("hiding"),setTimeout(()=>{t.remove(),document.body.classList.remove("preloading"),w.updatePageContent(),at()},400))},5e3),setTimeout(()=>{requestAnimationFrame(n)},300)}function at(){const t=document.getElementById("language-switcher"),e=document.getElementById("language-dropdown");if(!t||!e)return;const a=t.cloneNode(!0);t.parentNode.replaceChild(a,t);const s=w.getCurrentLocale(),n=a.querySelector("span");if(n){const r={en:"English",ru:"Русский","pt-br":"Português"};n.textContent=r[s]||"English"}a.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),e.classList.contains("hidden")?(e.classList.remove("hidden"),a.classList.add("bg-white/10")):(e.classList.add("hidden"),a.classList.remove("bg-white/10"))}),e.querySelectorAll("button").forEach(r=>{r.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation();const o=r.dataset.lang;if(w.setLocale(o),e.classList.add("hidden"),a.classList.remove("bg-white/10"),n){const m={en:"English",ru:"Русский","pt-br":"Português"};n.textContent=m[o]||"English"}P()})}),document.addEventListener("click",r=>{a.contains(r.target)||(e.classList.add("hidden"),a.classList.remove("bg-white/10"))});const l=()=>{const r=t.querySelector("span"),c={en:"English",ru:"Русский","pt-br":"Português"};r.textContent=c[w.currentLocale]||"English"};document.addEventListener("languageChanged",l)}document.addEventListener("DOMContentLoaded",()=>{try{Bt()}catch(i){console.error("Error initializing preloader:",i);const l=document.getElementById("preloader");l&&l.remove(),document.body.classList.remove("preloading"),w.updatePageContent(),at()}Wt();const t=document.getElementById("accept-cookies"),e=document.getElementById("reject-cookies"),a=document.getElementById("cookie-consent");t&&t.addEventListener("click",()=>{s(),tt("cookie-consent","accepted",365)}),e&&e.addEventListener("click",()=>{s(),tt("cookie-consent","rejected",365)});function s(){a.classList.add("translate-y-full"),a.addEventListener("transitionend",()=>{a.style.display="none"},{once:!0})}xt(),setTimeout(()=>{wt()},300),Zt(),Qt(),Xt(),st(),Nt(),initializeMobileFilters();let n;window.addEventListener("resize",()=>{clearTimeout(n),n=setTimeout(()=>{st()},100)})});function xt(){try{console.log("Initializing sorting..."),document.querySelectorAll(".sort-option").forEach(e=>{e.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation();const s=e.getAttribute("data-sort");if(console.log("Sort option clicked:",s),s){nt(s);const n=document.getElementById("mobile-filters");n&&!n.classList.contains("hidden")&&(n.classList.add("hidden"),document.body.style.overflow="auto"),P()}})});const t=localStorage.getItem("currentSort")||"hot";console.log("Initial sort type:",t),nt(t),console.log("Sorting initialized with type:",t)}catch(t){console.error("Error initializing sorting:",t)}}let h=[],j="",F=null,I=1;const O={mobile:4,tablet:6,desktop:9,wide:15},N=document.getElementById("about-modal"),Rt=document.getElementById("about-btn"),yt=document.getElementById("close-about"),U=document.getElementById("suggest-modal"),Dt=document.getElementById("suggest-btn"),Ft=document.getElementById("close-suggest"),Z=24*60*60*1e3;document.getElementById("mobile-filters-btn");document.getElementById("mobile-filters-modal");document.getElementById("close-mobile-filters");document.getElementById("mobile-filters-content");document.getElementById("reset-filters");document.getElementById("apply-filters");const V=document.getElementById("active-filters-count"),Ht={tablet:768};function st(){var s;const t=document.getElementById("filters-sidebar"),e=(s=document.getElementById("mobile-filters-btn"))==null?void 0:s.parentElement;if(!t||!e)return;const a=window.innerWidth<Ht.tablet;t.classList.toggle("hidden",a),e.classList.toggle("hidden",!a)}function Nt(){const t=document.getElementById("mobile-filters-btn"),e=document.getElementById("mobile-filters-modal"),a=e==null?void 0:e.querySelector(".flex.flex-col.bg-\\[\\#111\\]"),s=e==null?void 0:e.querySelector(".bg-\\[\\#0A0A0A\\]");if(!t||!e||!a||!s)return;function n(){e.classList.remove("hidden"),e.offsetHeight,s.classList.add("opacity-100"),a.classList.remove("translate-y-full"),document.body.classList.add("overflow-hidden")}function i(){s.classList.remove("opacity-100"),a.classList.add("translate-y-full"),setTimeout(()=>{e.classList.add("hidden"),document.body.classList.remove("overflow-hidden")},300)}t.addEventListener("click",o=>{o.preventDefault(),n()});const l=document.getElementById("close-mobile-filters");l&&l.addEventListener("click",o=>{o.preventDefault(),i()}),e.addEventListener("click",o=>{o.target===e&&i()}),document.addEventListener("keydown",o=>{o.key==="Escape"&&!e.classList.contains("hidden")&&i()});const r=document.getElementById("reset-filters");r&&r.addEventListener("click",o=>{o.preventDefault(),jt(),bt()});const c=document.getElementById("apply-filters");c&&c.addEventListener("click",o=>{o.preventDefault(),i(),P()})}function bt(){const t=_t();V&&(t>0?(V.textContent=`${t} active`,V.classList.remove("hidden")):V.classList.add("hidden"))}function _t(){let t=0;return j&&t++,F&&t++,localStorage.getItem("currentSort")&&t++,t}function jt(){j="",F=null,localStorage.removeItem("currentSort"),document.querySelectorAll(".status-filter-btn div").forEach(t=>{t.classList.remove("bg-black/40")}),document.querySelectorAll(".games-filter-btn div").forEach(t=>{t.classList.remove("border-emerald-500/20","bg-black/40"),t.classList.add("border-white/5","bg-black/20")}),document.querySelectorAll(".sort-option").forEach(t=>{t.classList.remove("bg-white/10","text-white"),t.classList.add("text-white/70")}),P()}async function wt(){try{h=(await(await fetch("data/resources.json")).json()).sources;const a="hydra_ratings_cache",s=5*60*1e3,n=()=>{try{const r=localStorage.getItem(a);if(!r)return null;const{timestamp:c,data:o}=JSON.parse(r);if(Date.now()-c<s)return o}catch(r){console.error("Error reading from cache:",r)}return null},i=r=>{try{localStorage.setItem(a,JSON.stringify({timestamp:Date.now(),data:r}))}catch(c){console.error("Error saving to cache:",c)}},l=n();if(l){console.log("Using cached ratings data"),h.forEach(r=>{const c=l[r.title]||{avg:0,total:0};r.rating={avg:parseFloat(c.avg)||0,total:parseInt(c.total)||0}});return}console.log("Fetching fresh ratings data...");try{const r=[...new Set(h.map(p=>p.title))];console.log(`Fetching ratings for ${r.length} sources`);const c=`https://libraryratingsdb.zxcsixx.workers.dev/api/ratings?batch=true&sources=${r.map(encodeURIComponent).join(",")}`;console.log("Batch API URL:",c);const o=await fetch(c);if(console.log("Batch response status:",o.status),!o.ok)throw new Error(`HTTP error! status: ${o.status}`);const m=await o.json();console.log("Received batch ratings data"),i(m),h.forEach(p=>{const b=m[p.title]||{avg:0,total:0};p.rating={avg:parseFloat(b.avg)||0,total:parseInt(b.total)||0}}),console.log("All ratings loaded via batch endpoint")}catch(r){console.error("Error in batch ratings fetch:",r),h.forEach(c=>{c.rating={avg:0,total:0}})}xt(),P(),Ut()}catch(t){console.error("Error loading sources:",t);const e=document.getElementById("sources-container");e&&(e.innerHTML=`
                <div class="col-span-full text-center py-10 px-4">
                    <div class="text-red-400 text-4xl mb-4">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <h3 class="text-xl font-semibold text-white mb-2">Error Loading Sources</h3>
                    <p class="text-white/70 mb-4">${t.message}</p>
                    <button onclick="location.reload()" class="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                        <i class="fas fa-sync-alt mr-2"></i> Try Again
                    </button>
                </div>
            `)}finally{setTimeout(()=>{const t=document.getElementById("preloader");t&&(t.style.opacity="0",setTimeout(()=>{t.style.display="none",P()},300))},500)}}async function Ut(){try{const t=new Promise((i,l)=>setTimeout(()=>l(new Error("Firebase request timed out")),5e3)),e=rt(ot,"sources"),a=it(e),n=(await Promise.race([a,t])).val();if(n){h=h.map(i=>{var p;const l=i.url.replace(/[^a-zA-Z0-9]/g,"_"),r=((p=n[l])==null?void 0:p.stats)||{installs:0,copies:0,activity:[]},c=Array.isArray(r.activity)?r.activity:[],o=Date.now(),m=c.filter(b=>o-b<Z).length;return{...i,stats:{...r,recentActivity:m,activity:c}}}),h.forEach(i=>{ct(i.url,i.stats)});try{localStorage.setItem("sourceStats",JSON.stringify(n)),localStorage.setItem("statsLastUpdated",Date.now().toString())}catch{}return!0}return!1}catch{try{const e=localStorage.getItem("sourceStats");if(e){const a=JSON.parse(e);h=h.map(s=>{var o;const n=s.url.replace(/[^a-zA-Z0-9]/g,"_"),i=((o=a[n])==null?void 0:o.stats)||{installs:0,copies:0,activity:[]},l=Array.isArray(i.activity)?i.activity:[],r=Date.now(),c=l.filter(m=>r-m<Z).length;return{...s,stats:{...i,recentActivity:c,activity:l}}});try{const s=h.map(i=>encodeURIComponent(i.title)).join(","),n=await fetch(`https://libraryratingsdb.zxcsixx.workers.dev/api/ratings?batch=true&sources=${s}`);if(n.ok){const i=await n.json();h.forEach(l=>{const r=i[l.title]||{avg:0,total:0};ratingsMap[l.title]={avg:parseFloat(r.avg)||0,total:parseInt(r.total)||0}})}else throw new Error("Failed to fetch batch ratings")}catch(s){console.error("Error fetching batch ratings:",s),await Promise.all(h.map(async n=>{try{const l=await(await fetch(`https://libraryratingsdb.zxcsixx.workers.dev/api/ratings?source=${encodeURIComponent(n.title)}&page=1`)).json();ratingsMap[n.title]={avg:typeof l.avg=="number"?l.avg:0,total:typeof l.total=="number"?l.total:0}}catch(i){console.error(`Error fetching rating for ${n.title}:`,i),ratingsMap[n.title]={avg:0,total:0}}}))}return console.log("Using cached stats from localStorage"),!0}}catch{}return h=h.map(e=>({...e,stats:{installs:0,copies:0,recentActivity:0,activity:[]}})),!1}}function ut(t){document.querySelector("main").classList.add("blur-sm","transition-all","duration-200");const e=w.t.bind(w),a=document.createElement("div");a.className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in p-4",a.innerHTML=`
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
    `,document.body.appendChild(a);const s=()=>{document.querySelector("main").classList.remove("blur-sm"),a.remove()};a.querySelector(".cancel-btn").addEventListener("click",()=>{s(),t(!1)}),a.querySelector(".proceed-btn").addEventListener("click",()=>{s(),t(!0)}),a.querySelector(".fixed.inset-0").addEventListener("click",n=>{n.target===n.currentTarget&&(s(),t(!1))})}function mt(t){document.querySelector("main").classList.add("blur-sm","transition-all","duration-200");const e=w.t.bind(w),a=document.createElement("div");a.className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in p-4",a.innerHTML=`
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
                            ${e("ageVerification.title")}
                        </h3>
                        <p class="text-white/70 text-xs sm:text-sm">
                            ${e("ageVerification.message")}
                        </p>
                        <p class="text-red-400/70 text-xs mt-2">
                            ${e("ageVerification.warning")}
                        </p>
                    </div>
                </div>

                <!-- Buttons -->
                <div class="flex items-center justify-end gap-2 sm:gap-3 mt-4 sm:mt-6">
                    <button class="cancel-btn px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm 
                                 text-white/70 hover:text-white transition-colors">
                        ${e("ageVerification.cancel")}
                    </button>
                    <button class="proceed-btn px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm 
                                 bg-red-500/10 hover:bg-red-500/20 
                                 border border-red-500/20 text-red-400 hover:text-red-300
                                 rounded-lg transition-colors">
                        ${e("ageVerification.confirm")}
                    </button>
                </div>
            </div>
        </div>
    `,document.body.appendChild(a);const s=()=>{document.querySelector("main").classList.remove("blur-sm"),a.remove()};a.querySelector(".cancel-btn").addEventListener("click",()=>{s(),t(!1)}),a.querySelector(".proceed-btn").addEventListener("click",()=>{s(),t(!0)}),a.querySelector(".fixed.inset-0").addEventListener("click",n=>{n.target===n.currentTarget&&(s(),t(!1))})}function Ot(t){var b,S,E,C,H;const e=w.getCurrentLocale(),s=(((b=w.translations[e])==null?void 0:b.sources)||{})[t.title]||{title:t.title,description:t.description},n=t.status.includes("Use At Your Own Risk"),i=t.stats||{installs:0,copies:0,recentActivity:0},l=parseInt(i.recentActivity||0),r=document.createElement("div");r.className="source-card animate-fade-in rounded-xl",r.dataset.url=t.url,r.dataset.name=t.title,r.dataset.copies=((S=t.stats)==null?void 0:S.copies)||0,r.dataset.installs=((E=t.stats)==null?void 0:E.installs)||0,r.dataset.activity=((C=t.stats)==null?void 0:C.recentActivity)||0;const c=t.status.map($=>{const T=$.toLowerCase().replace(/\s+/g,"-"),k={trusted:{color:"emerald",icon:"shield",key:"trusted",customClass:"bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/30 "},"safe-for-use":{color:"blue",icon:"check-circle",key:"safeForUse",customClass:"bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/30"},"use-at-your-own-risk":{color:"red",icon:"exclamation-triangle",key:"useAtOwnRisk",customClass:"bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/30 "},"works-in-russia":{color:"teal",icon:"globe-europe",key:"worksInRussia",customClass:"bg-teal-500/10 border-teal-500/20 text-teal-400 hover:bg-teal-500/20 hover:border-teal-500/30 "},nsfw:{color:"purple",icon:"exclamation-circle",key:"nsfw",customClass:"bg-purple-500/10 border-purple-500/20 text-purple-400 hover:bg-purple-500/20 hover:border-purple-500/30 "}}[T]||{color:"gray",icon:"circle",key:T},A=`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs backdrop-blur-sm status-badge ${k.customClass||""}`,q=`bg-${k.color}-500/10 border border-${k.color}-500/20 text-${k.color}-400`,M=w.t(`status.${k.key}`);return`
            <span class="${k.customClass?A:`${A} ${q}`}">
                <i class="fas fa-${k.icon} text-[10px]"></i>
                ${M}
            </span>
        `}).join("");r.innerHTML=`
        <div class="group relative h-full flex flex-col overflow-hidden
                    ${n?"border-red-500/20":"border-white/5"} border
                    backdrop-blur-sm transition-all duration-300
                    hover:shadow-lg ${n?"hover:shadow-red-500/10":"hover:shadow-emerald-500/10"}
                    bg-[#111]/40 rounded-xl">
            
            <!-- Card background effects -->
            <div class="absolute inset-0 bg-gradient-to-b 
                        ${n?"from-red-500/5":"from-emerald-500/5"} to-transparent 
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
                    ${c}
                </div>

                <!-- Title and description -->
                <div class="flex items-start gap-3 flex-1">
                    <div class="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
                         ${n?"bg-red-500/10 border-red-500/20":"bg-emerald-500/10 border-emerald-500/20"} 
                         border group-hover:scale-110 transition-transform duration-300
                         backdrop-blur-sm">
                        <i class="fas ${n?"fa-triangle-exclamation text-red-500/70":"fa-book-open text-emerald-500/70"} 
                             text-lg"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="text-base font-medium text-white group-hover:text-${n?"red":"emerald"}-400 
                                   transition-colors duration-300 mb-1.5 truncate">
                            ${s.title}
                        </h3>
                        <p class="text-white/60 text-sm leading-relaxed line-clamp-2">
                            ${s.description}
                        </p>
                    </div>
                    
                </div>

                <!-- Stats and date (fixed at bottom) -->
                <div class="mt-2 pt-2 text-white/40 relative">
                    
                    
                    <div class="flex items-center justify-between">
                        <span class="hidden lg:flex items-center gap-1.5 text-white/40 text-[10px] sm:text-xs">
                            <i class="fas fa-calendar-alt text-[10px] hidden sm:inline"></i>
                            <span class="whitespace-nowrap">${Vt(t.addedDate)}</span>
                        </span>
                    
                        <!-- Rating display area - absolutely positioned on the right -->
                    <div class="right-0 flex items-center gap-1 px-2 py-0.5 bg-[#111] rounded-full border border-white/10 cursor-pointer group/rating transition-all duration-300 transform hover:scale-105 hover:bg-[#1a1a1a] hover:shadow-lg hover:shadow-amber-500/10 hover:border-amber-400/30" 
                         style="user-select:none; min-width: 80px;" 
                         title="View & rate this source">
                        <div class="relative inline-flex items-center" data-rating-stars-container>
                            <span class="text-gray-500/50 text-sm" data-rating-stars-bg>★★★★★</span>
                            <span class="absolute left-0 top-0 overflow-hidden text-amber-400 text-sm transition-all duration-500" 
                                  data-rating-stars-active style="width: 0%;">★★★★★</span>
                        </div>
                        <span class="text-white/70 text-xs font-medium group-hover/rating:text-amber-400 transition-colors duration-300" 
                              data-rating-avg>–</span>
                        <span class="text-white/40 text-[10px] group-hover/rating:text-white/60 transition-colors duration-300" 
                              data-rating-total></span>
                    
                    </div>
                        <div class="source-stats flex items-center gap-3 text-xs">
                            <span class="flex items-center gap-1.5 ${l>0?"text-red-400":""}
                                       transition-colors duration-300">
                                <i class="fas fa-fire text-[10px]"></i>
                                ${l}
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
            <div class="relative border-t ${n?"border-red-500/10":"border-white/5"} 
                        p-3 bg-black/30 backdrop-blur-sm">
                <div class="flex gap-2">
                    <button class="install-btn flex-1 
                                 ${n?"bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/20":"bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/20"}
                                 border rounded-lg px-4 py-2 text-sm font-medium 
                                 transition-all duration-200 flex items-center justify-center gap-2 
                                 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed
                                 backdrop-blur-sm">
                        <i class="fas fa-download text-[10px]"></i>
                        ${w.t("common.install")}
                    </button>
                    <button class="copy-btn shrink-0 bg-white/5 hover:bg-white/10 text-white/70 
                                 border border-white/10 rounded-lg px-4 py-2 text-sm
                                 transition-all duration-200 flex items-center justify-center gap-2
                                 hover:scale-[1.02] backdrop-blur-sm" data-url="${t.url}">
                        <i class="fas fa-copy text-[10px]"></i>
                        ${w.t("common.copy")}
                    </button>
                </div>
            </div>
        </div>
    `;const o=(H=r.querySelector("[data-rating-stars-container]"))==null?void 0:H.parentElement;o&&(o.addEventListener("click",$=>{$.stopPropagation(),Pt(t)}),kt(r,t.rating));const m=r.querySelector(".install-btn"),p=r.querySelector(".copy-btn");return p&&p.addEventListener("click",async()=>{const $=async()=>{await ft(t.url,"copy")&&(navigator.clipboard.writeText(t.url),p.innerHTML='<i class="fas fa-check text-[10px]"></i> '+w.t("sourceCard.copied"),setTimeout(()=>{p.innerHTML='<i class="fas fa-copy text-[10px]"></i> '+w.t("sourceCard.copy")},2e3))},T=t.title==="CPGRepacks";n||T?(T?mt:ut)(A=>{A&&$()}):$()}),m&&m.addEventListener("click",async()=>{const $=async()=>{ht(m,"loading");const k=await ft(t.url,"install");if(ht(m,k?"success":"rate-limited"),k){const A=encodeURIComponent(t.url);window.location.href=`hydralauncher://install-source?urls=${A}`}},T=t.title==="CPGRepacks";t.status.includes("Use At Your Own Risk")||T?(T?mt:ut)(A=>{A&&$()}):$()}),ct(t.url,t.stats),r.dataset.copies=i.copies||0,r.dataset.installs=i.installs||0,r.dataset.activity=l,r}let W="wide";function St(){const t=window.innerWidth;return t>=1536?"wide":t>=1024?"desktop":t>=640?"tablet":"mobile"}let gt;window.addEventListener("resize",()=>{clearTimeout(gt),gt=setTimeout(()=>{st();const t=St();if(W!==t){const a=lt(),s=Q(),n=Math.ceil(a.length/s);if(W==="wide"&&t==="desktop"){const i=(I-1)*O.desktop;I=Math.floor(i/O.desktop)+1}W=t,I=Math.min(Math.max(1,I),n),P(a),s<Q()&&window.scrollTo({top:0,behavior:"smooth"})}},100)});function pt(t,e){return console.log(`Sorting sources by: ${e}`),[...t].sort((a,s)=>{var n,i,l,r,c,o,m,p,b,S,E,C;try{switch(e){case"hot":const H=((n=a.stats)==null?void 0:n.recentActivity)||0;return(((i=s.stats)==null?void 0:i.recentActivity)||0)-H;case"new":return new Date(s.addedDate||0)-new Date(a.addedDate||0);case"most-copies":const T=((l=a.stats)==null?void 0:l.copies)||0;return(((r=s.stats)==null?void 0:r.copies)||0)-T;case"most-installs":const A=((c=a.stats)==null?void 0:c.installs)||0;return(((o=s.stats)==null?void 0:o.installs)||0)-A;case"top-rated":console.log(`Comparing ratings: ${a.title} (${((m=a.rating)==null?void 0:m.avg)||0}) vs ${s.title} (${((p=s.rating)==null?void 0:p.avg)||0})`),console.log(`Full rating data for ${a.title}:`,a.rating),console.log(`Full rating data for ${s.title}:`,s.rating);const M=((b=a.rating)==null?void 0:b.avg)||0,B=((S=s.rating)==null?void 0:S.avg)||0;if(M===B){const J=((E=a.rating)==null?void 0:E.total)||0,_=((C=s.rating)==null?void 0:C.total)||0;return console.log(`Ratings equal (${M}), comparing counts: ${J} vs ${_}`),_-J}return console.log(`Sorting by rating: ${B} - ${M} = ${B-M}`),B-M;case"name-asc":return(a.title||"").localeCompare(s.title||"");case"name-desc":return(s.title||"").localeCompare(a.title||"");default:return 0}}catch(H){return console.error("Error in sort function:",H),console.error("Sort type:",e),console.error("Source A:",a),console.error("Source B:",s),0}})}function nt(t){var e;try{console.log("Updating active sort UI for:",t);const a=document.querySelector(".mobile-sort-button span");if(a){const n=((e=document.querySelector(`.sort-option[data-sort="${t}"]`))==null?void 0:e.textContent)||"Sort";a.textContent=n}document.querySelectorAll(".sort-option").forEach(n=>{const i=n.getAttribute("data-sort")===t;n.classList.toggle("bg-white/10",i),n.classList.toggle("text-white",i),n.classList.toggle("text-white/70",!i);const l=n.querySelector("i.fa-check");l&&(l.style.opacity=i?"1":"0")});const s=document.getElementById("sort-dropdown");s&&!s.classList.contains("hidden")&&s.classList.add("hidden"),localStorage.setItem("currentSort",t)}catch(a){console.error("Error updating sort UI:",a)}}function P(t=null){const e=document.getElementById("sources-container");if(e){e.innerHTML="";try{let a=t||lt();console.log(`Displaying ${a.length} filtered sources`);const s=localStorage.getItem("currentSort")||"hot";if(console.log("Current sort type:",s),s){console.log("Before sorting - first few sources:",a.slice(0,3).map(o=>{var m,p;return{title:o.title,rating:o.rating,hasRating:!!((m=o.rating)!=null&&m.avg||(p=o.rating)!=null&&p.total)}}));try{a=pt(a,s),console.log("After sorting - first few sources:",a.slice(0,3).map(o=>{var m,p;return{title:o.title,rating:o.rating,sortKey:s==="top-rated"?`${((m=o.rating)==null?void 0:m.avg)||0} (${((p=o.rating)==null?void 0:p.total)||0} ratings)`:o[s]||"N/A"}})),nt(s)}catch(o){console.error("Error during sorting:",o),a=pt(a,"hot")}}W=St();const n=Q(),i=Math.ceil(a.length/n);I=Math.min(Math.max(1,I),i);const l=(I-1)*n,r=Math.min(l+n,a.length);a.slice(l,r).forEach(o=>{const m=Ot(o);e.appendChild(m)}),zt(i),w.updatePageContent()}catch(a){console.error("Error in displaySources:",a),e.innerHTML=`
            <div class="col-span-full text-center py-10 px-4">
                <div class="text-red-400 text-4xl mb-4">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h3 class="text-xl font-semibold text-white mb-2">Error Loading Content</h3>
                <p class="text-white/70 mb-4">${a.message||"An unknown error occurred"}</p>
                <button onclick="location.reload()" class="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                    <i class="fas fa-sync-alt mr-2"></i> Try Again
                </button>
            </div>
        `}}}function Q(){const t=window.innerWidth;return t>=2560?O.wide:t>=1024?O.desktop:t>=640?O.tablet:O.mobile}function zt(t){const e=document.getElementById("pagination");if(!e)return;let a="";a+=`
        <button onclick="changePage(${I-1})" 
                class="px-2 py-1.5 text-sm text-white/50 hover:text-white disabled:opacity-50 
                       transition-colors duration-200 rounded-md hover:bg-white/5"
                ${I===1?"disabled":""}>
            <i class="fas fa-chevron-left"></i>
        </button>
    `;for(let s=1;s<=t;s++)s===I?a+=`
                <button class="px-3 py-1.5 text-sm bg-white/10 text-white rounded-md">
                    ${s}
                </button>
            `:a+=`
                <button onclick="changePage(${s})" 
                        class="px-3 py-1.5 text-sm text-white/50 hover:text-white hover:bg-white/5 
                               transition-colors duration-200 rounded-md">
                    ${s}
                </button>
            `;a+=`
        <button onclick="changePage(${I+1})" 
                class="px-2 py-1.5 text-sm text-white/50 hover:text-white disabled:opacity-50 
                       transition-colors duration-200 rounded-md hover:bg-white/5"
                ${I===t?"disabled":""}>
            <i class="fas fa-chevron-right"></i>
        </button>
    `,e.innerHTML=a}window.changePage=function(t){if(t<1)return;const e=lt(),a=Math.ceil(e.length/Q());t>a||(I=t,P(e),window.scrollTo({top:0,behavior:"smooth"}))};document.querySelectorAll(".status-filter-btn").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.status;document.querySelectorAll(".status-filter-btn").forEach(a=>{a.querySelector("div").classList.remove("bg-black/40")}),j===e?j="":(j=e,t.querySelector("div").classList.add("bg-black/40")),I=1,P(),Et(),dispatchFiltersChanged()})});document.querySelectorAll(".games-filter-btn").forEach(t=>{t.addEventListener("click",()=>{const e=parseInt(t.dataset.min),a=parseInt(t.dataset.max);if(document.querySelectorAll(".games-filter-btn div").forEach(s=>{s.classList.remove("border-emerald-500/20","bg-black/40"),s.classList.add("border-white/5","bg-black/20")}),F&&F.min===e&&F.max===a)F=null;else{F={min:e,max:a};const s=t.querySelector("div");s.classList.remove("border-white/5","bg-black/20"),s.classList.add("border-emerald-500/20","bg-black/40")}I=1,P(),Et(),bt(),dispatchFiltersChanged()})});function Et(){const t={};h.forEach(e=>{e.status.forEach(a=>{t[a]=(t[a]||0)+1})}),document.querySelectorAll(".status-filter-btn").forEach(e=>{const a=e.dataset.status,s=e.querySelector(".text-white\\/40");s&&(s.textContent=t[a]||0)}),document.querySelectorAll(".games-filter-btn").forEach(e=>{const a=parseInt(e.dataset.min),s=parseInt(e.dataset.max),n=h.filter(r=>{const c=parseInt(r.gamesCount);return c>=a&&c<=s}).length,i=e.querySelector(".text-white\\/40");i&&(i.textContent=n);const l=e.querySelector(".bg-emerald-500\\/50");if(l){const r=Math.max(...Array.from(document.querySelectorAll(".games-filter-btn")).map(o=>{const m=parseInt(o.dataset.min),p=parseInt(o.dataset.max);return h.filter(b=>{const S=parseInt(b.gamesCount);return S>=m&&S<=p}).length})),c=r>0?n/r*100:0;l.style.width=`${c}%`}})}let G="";document.getElementById("search").addEventListener("input",t=>{G=t.target.value.toLowerCase(),I=1,P()});function lt(){return h.filter(t=>{const e=!G||t.title.toLowerCase().includes(G)||t.description.toLowerCase().includes(G)||t.url.toLowerCase().includes(G),a=!j||t.status.includes(j),s=parseInt(t.gamesCount),n=!F||s>=F.min&&s<=F.max;return e&&a&&n})}const Lt=document.getElementById("sort-dropdown-btn"),X=document.getElementById("sort-dropdown"),Gt=document.getElementById("current-sort");Lt.addEventListener("click",()=>{X.classList.toggle("hidden")});document.addEventListener("click",t=>{!Lt.contains(t.target)&&!X.contains(t.target)&&X.classList.add("hidden")});document.querySelectorAll(".sort-option").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.sort;switch(Gt.textContent=t.textContent.trim(),X.classList.add("hidden"),e){case"high-to-low":sortGamesFilters(!1);break;case"low-to-high":sortGamesFilters(!0);break;case"most-sources":Jt();break;case"most-popular":Yt();break}})});function Jt(){const t=document.querySelector(".games-filter-btn").parentNode,e=Array.from(t.querySelectorAll(".games-filter-btn"));e.sort((a,s)=>{const n=parseInt(a.querySelector(".text-white\\/40").textContent);return parseInt(s.querySelector(".text-white\\/40").textContent)-n}),e.forEach(a=>a.remove()),e.forEach(a=>t.appendChild(a))}function Yt(){const t=JSON.parse(localStorage.getItem("sourceStats")||"{}"),e=document.querySelector(".games-filter-btn").parentNode,a=Array.from(e.querySelectorAll(".games-filter-btn"));a.sort((s,n)=>{var p,b;const i=((p=h.find(S=>S.gamesCount===s.dataset.min))==null?void 0:p.url)||"",l=((b=h.find(S=>S.gamesCount===n.dataset.min))==null?void 0:b.url)||"",r=t[i]||{installs:0,copies:0},c=t[l]||{installs:0,copies:0},o=r.installs+r.copies;return c.installs+c.copies-o}),a.forEach(s=>s.remove()),a.forEach(s=>e.appendChild(s))}function Vt(t){const e=new Date(t),s=Math.abs(new Date-e),n=Math.floor(s/(1e3*60*60*24)),i=w.t.bind(w);if(n===0)return i("common.date.today");if(n===1)return i("common.date.yesterday");if(n<30)return i("common.date.daysAgo",{days:n});{const l={year:"numeric",month:"short",day:"numeric"};return e.toLocaleDateString(w.getCurrentLocale(),l)}}document.addEventListener("DOMContentLoaded",()=>{wt(),sortGamesFilters(!1)});Rt.addEventListener("click",()=>{N.classList.remove("hidden"),document.body.style.overflow="hidden"});yt.addEventListener("click",()=>{N.classList.add("hidden"),document.body.style.overflow=""});N.addEventListener("click",t=>{t.target===N&&yt.click()});document.addEventListener("keydown",t=>{t.key==="Escape"&&!N.classList.contains("hidden")&&(N.classList.add("hidden"),document.body.style.overflow="")});Dt.addEventListener("click",()=>{U.classList.remove("hidden"),document.body.style.overflow="hidden"});Ft.addEventListener("click",()=>{U.classList.add("hidden"),document.body.style.overflow=""});U.addEventListener("click",t=>{t.target===U&&(U.classList.add("hidden"),document.body.style.overflow="")});document.addEventListener("keydown",t=>{t.key==="Escape"&&(N.classList.contains("hidden")||(N.classList.add("hidden"),document.body.style.overflow=""),U.classList.contains("hidden")||(U.classList.add("hidden"),document.body.style.overflow=""))});function tt(t,e,a){const s=new Date;s.setTime(s.getTime()+a*24*60*60*1e3),document.cookie=`${t}=${e};expires=${s.toUTCString()};path=/`}function Ct(t){const e=t+"=",a=document.cookie.split(";");for(let s=0;s<a.length;s++){let n=a[s];for(;n.charAt(0)===" ";)n=n.substring(1,n.length);if(n.indexOf(e)===0)return n.substring(e.length,n.length)}return null}async function ft(t,e){try{const a=t.replace(/[^a-zA-Z0-9]/g,"_"),s=`${e}_${a}`;if(Ct(s))return!0;let n={installs:0,copies:0,activity:[],recentActivity:0};try{const l=new Promise((E,C)=>setTimeout(()=>C(new Error("Firebase request timed out")),3e3)),r=rt(ot,`sources/${a}/stats`),c=it(r),m=(await Promise.race([c,l])).val()||{installs:0,copies:0,activity:[]},p=Date.now(),S=(Array.isArray(m.activity)?m.activity:[]).filter(E=>p-E<Z);S.push(p),n={installs:parseInt(m.installs||0)+(e==="install"?1:0),copies:parseInt(m.copies||0)+(e==="copy"?1:0),activity:S,recentActivity:S.length,lastUpdated:p},await Promise.race([vt(r,n),new Promise((E,C)=>setTimeout(()=>C(new Error("Update timed out")),3e3))]);try{const E=localStorage.getItem("sourceStats");if(E){const C=JSON.parse(E);C[a]||(C[a]={}),C[a].stats=n,localStorage.setItem("sourceStats",JSON.stringify(C)),localStorage.setItem("statsLastUpdated",p.toString())}}catch{}}catch{console.log("Firebase update failed, continuing with local data");const r=h.find(c=>c.url===t);if(r&&r.stats){n={installs:parseInt(r.stats.installs||0)+(e==="install"?1:0),copies:parseInt(r.stats.copies||0)+(e==="copy"?1:0),activity:[],recentActivity:1,lastUpdated:Date.now()};try{const c=localStorage.getItem("sourceStats");if(c){const o=JSON.parse(c);o[a]||(o[a]={}),o[a].stats=n,localStorage.setItem("sourceStats",JSON.stringify(o)),localStorage.setItem("statsLastUpdated",Date.now().toString())}}catch{}}}tt(s,"true",e==="install"?.003472222:347222e-9),ct(t,n);const i=h.findIndex(l=>l.url===t);return i!==-1&&(h[i].stats=n),!0}catch{return!1}}function ct(t,e=null){const a=document.querySelectorAll(".source-card"),s=Array.from(a).find(n=>n.dataset.url===t);if(s){const n=s.querySelector(".source-stats");if(n){const i=parseInt((e==null?void 0:e.installs)||0),l=parseInt((e==null?void 0:e.copies)||0),r=parseInt((e==null?void 0:e.recentActivity)||0);n.innerHTML=`
                <span class="flex items-center gap-1.5">
                    <i class="fas fa-fire text-[10px] ${r>0?"text-red-500":""}"></i>
                    ${r}
                </span>
                <span class="flex items-center gap-1.5">
                    <i class="fas fa-download text-[10px]"></i>
                    ${i}
                </span>
                <span class="flex items-center gap-1.5">
                    <i class="fas fa-copy text-[10px]"></i>
                    ${l}
                </span>
            `}s.dataset.copies=(e==null?void 0:e.copies)||0,s.dataset.installs=(e==null?void 0:e.installs)||0,s.dataset.activity=(e==null?void 0:e.recentActivity)||0}}function ht(t,e){const a=t.innerHTML;switch(e){case"loading":t.disabled=!0,t.innerHTML=`
                <div class="flex items-center gap-1.5">
                <div class="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                    <span>Installing...</span>
                </div>
            `;break;case"success":t.innerHTML=`
                <div class="flex items-center gap-1.5">
                    <i class="fas fa-check text-[10px]"></i>
                    Installed
                </div>
            `,setTimeout(()=>{t.disabled=!1,t.innerHTML=a},2e3);break;case"rate-limited":t.innerHTML=`
                <div class="flex items-center gap-1.5 text-amber-400">
                    <i class="fas fa-clock text-[10px]"></i>
                    Please wait
                </div>
            `,setTimeout(()=>{t.disabled=!1,t.innerHTML=a},2e3);break;default:t.disabled=!1,t.innerHTML=a}}function Wt(){const t=document.getElementById("cookie-consent");Ct("cookie-consent")?t.style.display="none":(t.style.display="block",setTimeout(()=>{t.classList.remove("translate-y-full")},500))}document.getElementById("accept-cookies").addEventListener("click",()=>{const t=document.getElementById("cookie-consent");t.classList.add("translate-y-full"),t.addEventListener("transitionend",()=>{t.style.display="none"},{once:!0}),tt("cookie-consent","accepted",365)});async function Kt(t){try{const e=rt(ot,`sources/${t}/stats`),s=(await it(e)).val();if(s&&s.activity){const n=s.activity.filter(i=>Date.now()-i<Z);n.length!==s.activity.length&&await vt(e,{activity:n})}}catch{}}function Zt(){const t=document.getElementById("suggest-modal"),e=document.getElementById("suggest-btn"),a=document.getElementById("close-suggest");e&&e.addEventListener("click",()=>{t.classList.remove("hidden")}),a&&a.addEventListener("click",()=>{t.classList.add("hidden")}),t&&t.addEventListener("click",s=>{s.target===t&&t.classList.add("hidden")})}function Qt(){const t=document.getElementById("search");if(t){const e=()=>{const s=window.innerWidth<640?"header.searchMobile":"header.search";t.placeholder=w.t(s)};e(),window.addEventListener("resize",e),document.addEventListener("languageChanged",e)}}function Xt(){setInterval(()=>{h.forEach(t=>{const e=t.url.replace(/[^a-zA-Z0-9]/g,"_");Kt(e)})},60*60*1e3)}async function te(t){const e=h.find(a=>a.title===t);if(e&&e.rating){const a={avg:parseFloat(e.rating.avg||0),total:parseInt(e.rating.total||0)};return K(t,a),!0}return ee()}async function ee(t=!1){try{if(!h||h.length===0)return!1;const e="hydra_ratings_cache",a=5*60*1e3,s=()=>{try{const r=localStorage.getItem(e);if(!r)return null;const{timestamp:c,data:o}=JSON.parse(r);if(Date.now()-c<a&&!t)return o}catch(r){console.error("Error reading from cache:",r)}return null},n=r=>{try{localStorage.setItem(e,JSON.stringify({timestamp:Date.now(),data:r}))}catch(c){console.error("Error saving to cache:",c)}};if(!t){const r=s();if(r)return console.log("Using cached ratings data in updateAllSourceRatings"),h.forEach(c=>{const o=r[c.title]||{avg:0,total:0};c.rating={avg:parseFloat(o.avg)||0,total:parseInt(o.total)||0},K(c.title,c.rating)}),!0}console.log(t?"Force refreshing ratings data...":"Fetching fresh ratings data in updateAllSourceRatings...");const i=[...new Set(h.map(r=>r.title))];if(i.length===0)return!1;const l=`https://libraryratingsdb.zxcsixx.workers.dev/api/ratings?batch=true&sources=${i.map(encodeURIComponent).join(",")}`;try{const r=await fetch(l);if(console.log("Batch response status in updateAllSourceRatings:",r.status),!r.ok)throw new Error(`HTTP error! status: ${r.status}`);const c=await r.json();return console.log("Received batch ratings data in updateAllSourceRatings"),n(c),h.forEach(o=>{const m=c[o.title]||{avg:0,total:0};o.rating={avg:parseFloat(m.avg)||0,total:parseInt(m.total)||0},K(o.title,o.rating)}),!0}catch(r){throw console.error("Error fetching ratings:",r),r}}catch(e){return console.error("Error in updateAllSourceRatings:",e),h.forEach(a=>{a.rating||(a.rating={avg:0,total:0},K(a.title,a.rating))}),!1}}function K(t,e){document.querySelectorAll(".source-card").forEach(s=>{s.dataset.name===t&&kt(s,e)})}function kt(t,e){console.log("Updating card rating display for:",t.dataset.name,"with data:",JSON.stringify(e,null,2));const a=t.querySelector("[data-rating-stars-active]"),s=t.querySelector("[data-rating-avg]"),n=t.querySelector("[data-rating-total]"),i=t.querySelector("[data-rating-comment]");if(console.log("Found elements:",{starsActive:!!a,avgEl:!!s,totalEl:!!n,commentEl:!!i}),a&&s&&n)if(e&&(typeof e.avg=="number"||e.avg===0)){const l=e.avg/5*100,r=Math.round(l/10)*10;console.log(`Setting rating: avg=${e.avg}, total=${e.total}, starPercentage=${l}%, rounded=${r}%`),a.style.width=`${r}%`,s.textContent=e.avg>0?e.avg.toFixed(1):"–",n.textContent=e.total>0?`(${e.total})`:"",i&&(i.style.display=e.total>0?"inline-block":"none",console.log(`Comment icon display set to: ${i.style.display}`))}else console.log("No valid rating data, setting default state"),a.style.width="0%",s.textContent="–",n.textContent="",i&&(i.style.display="none");else console.error("Missing required rating elements on card:",{starsActive:!!a,avgEl:!!s,totalEl:!!n})}window.updateSourceCardRating=te;document.addEventListener("languageChanged",()=>{P()});
