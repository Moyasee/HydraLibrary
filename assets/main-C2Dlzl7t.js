import{c as Pt,i as w,r as it,d as lt,g as ct,u as bt}from"./index-DklScFds.js";const mt="https://libraryratingsdb.zxcsixx.workers.dev/api/ratings",Bt=5*60*1e3,gt={data:{},lastUpdated:{},get:function(t){const e=this.data[t],s=this.lastUpdated[t];return e&&s&&Date.now()-s<Bt?Promise.resolve(e):null},set:function(t,e){return this.data[t]=e,this.lastUpdated[t]=Date.now(),e},batchGet:function(t){const e={cached:{},uncached:[]};return t.forEach(s=>{const n=this.get(s);n?e.cached[s]=n:e.uncached.push(s)}),e},batchSet:function(t){Object.entries(t).forEach(([e,s])=>{this.set(e,s)})}};function Rt(t){const e=new Date(t),n=Math.floor((new Date-e)/1e3);let a=Math.floor(n/31536e3);return a>=1?a+" year"+(a===1?"":"s")+" ago":(a=Math.floor(n/2592e3),a>=1?a+" month"+(a===1?"":"s")+" ago":(a=Math.floor(n/86400),a>=1?a+" day"+(a===1?"":"s")+" ago":(a=Math.floor(n/3600),a>=1?a+" hour"+(a===1?"":"s")+" ago":(a=Math.floor(n/60),a>=1?a+" minute"+(a===1?"":"s")+" ago":"just now"))))}function K(t){return String(t).replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Dt(t){let e=localStorage.getItem("hydra_rating_hash");return e||(e=Math.random().toString(36).slice(2)+Date.now(),localStorage.setItem("hydra_rating_hash",e)),e}function Ft(t){document.querySelectorAll(".rating-modal").forEach(d=>d.remove());const e=document.createElement("div");e.className="rating-modal fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4",e.innerHTML=`
    <div class="fixed inset-0 bg-black/90 backdrop-blur-sm animate-fade-in"></div>
    <div class="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-xl max-w-4xl w-full mx-2 sm:mx-4 my-4 max-h-[90vh] sm:max-h-[90vh] flex flex-col shadow-2xl border border-white/5 animate-fade-in transform transition-all duration-300 ease-out overflow-hidden">
      <div class="flex flex-col p-4 sm:p-6 space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex-1 pr-4">
            <h2 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 mb-1 line-clamp-2">${K(t.title)}</h2>
            <a href="${K(t.url)}" target="_blank" class="text-emerald-400/90 text-xs hover:text-emerald-300 transition-all duration-300 hover:underline hover:underline-offset-2 break-all line-clamp-1">
              <i class="fas fa-external-link-alt mr-1"></i>${K(t.url)}
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
              
              <!-- Cloudflare Turnstile Widget -->
              <div class="cf-turnstile" data-sitekey="0x4AAAAAABgPUEsL6w8fjG-Z" data-callback="onTurnstileSuccess" data-expired-callback="onTurnstileExpired" data-error-callback="onTurnstileError" data-theme="dark"></div>
              <input type="hidden" name="cf-turnstile-response" class="cf-turnstile-response">
              
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
  `;const s=function(d){const l=document.querySelector('#submit-rating-form button[type="submit"]'),g=document.querySelector(".cf-turnstile-response");l&&(l.disabled=!1),g&&(g.value=d)},n=function(){const d=document.querySelector('#submit-rating-form button[type="submit"]'),l=document.querySelector(".cf-turnstile-response");d&&(d.disabled=!0),l&&(l.value="")},a=function(){const d=document.querySelector('#submit-rating-form button[type="submit"]'),l=document.getElementById("rating-form-error"),g=document.querySelector(".cf-turnstile-response");d&&(d.disabled=!0),g&&(g.value=""),l&&(l.textContent="CAPTCHA verification failed. Please try again.",l.classList.remove("hidden"))};document.body.appendChild(e),document.body.style.overflow="hidden";const o=()=>{const d=e.querySelector(".cf-turnstile");if(window.turnstile&&d)try{turnstile.render(d,{sitekey:"0x4AAAAAABgPUEsL6w8fjG-Z",callback:s,"expired-callback":n,"error-callback":a,theme:"dark"}),console.log("Turnstile widget initialized")}catch(l){console.error("Error initializing Turnstile:",l)}else console.warn("Turnstile not available or element not found")};if(window.turnstile)o();else{const d=setInterval(()=>{window.turnstile&&(clearInterval(d),o())},100)}const i=document.createElement("style");i.textContent=`
    .cf-turnstile {
      margin: 10px 0;
      max-width: 100%;
      min-height: 65px;
      display: flex;
      justify-content: center;
    }
    .cf-turnstile iframe {
      max-width: 100% !important;
    }
  `,document.head.appendChild(i),e.querySelector(".close-rating-modal").onclick=S,e.querySelector(".fixed.inset-0").onclick=d=>{d.target===e.querySelector(".fixed.inset-0")&&S()};async function r(d,l="en"){return new Promise((g,m)=>{const h=JSON.stringify({translate:"rapidapi"}),y=new XMLHttpRequest;y.withCredentials=!0,y.addEventListener("readystatechange",function(){if(this.readyState===this.DONE)try{const b=JSON.parse(this.responseText);if(b&&b.translation)g(b.translation);else throw b&&b.status!==200?new Error(b.business_message||"Translation service error"):new Error("Invalid response from translation service")}catch(b){console.error("Translation error:",b,this.responseText),m(b)}}),y.addEventListener("error",()=>{m(new Error("Network error during translation"))});const D=`https://free-google-translator.p.rapidapi.com/external-api/free-google-translator?from=auto&to=${l}&query=${encodeURIComponent(d)}`;y.open("POST",D),y.setRequestHeader("x-rapidapi-key",""),y.setRequestHeader("x-rapidapi-host","free-google-translator.p.rapidapi.com"),y.setRequestHeader("Content-Type","application/json"),y.send(h)})}async function u(d){const l=d.target.closest(".translate-comment");if(!l||l.disabled)return;d.preventDefault(),d.stopPropagation();const g=l.closest(".border-b"),m=g?g.querySelector(".comment-text p"):null;if(!m){console.error("Could not find comment text element");return}let h=l.getAttribute("data-original");if(l.classList.contains("active")){h&&(m.textContent=h,l.innerHTML='<i class="fas fa-language text-xs"></i><span class="hidden sm:inline">Translate</span>',l.classList.remove("active"),l.title="Translate this review"),l.disabled=!1;return}h=m.textContent.trim(),l.setAttribute("data-original",h),l.innerHTML,l.innerHTML='<i class="fas fa-spinner fa-spin text-xs"></i>',l.title="Translating...",l.disabled=!0;try{const y=await r(h,"en");m.textContent=y,l.innerHTML='<i class="fas fa-undo text-xs"></i><span class="hidden sm:inline">Original</span>',l.classList.add("active"),l.title="Show original text"}catch(y){console.error("Translation failed:",y),m.textContent=h,l.innerHTML='<i class="fas fa-exclamation-triangle text-xs"></i><span class="hidden sm:inline">Error</span>',l.title="Error translating. Click to try again."}finally{l.disabled=!1}}const c=e.querySelector("#rating-comments-list");c&&c.addEventListener("click",u);const f=e.querySelector('textarea[name="comment"]'),p=e.querySelector(".char-count");if(f&&p){const d=()=>{p.textContent=f.value.length};f.addEventListener("input",d),d(),e._cleanupCharCounter=()=>{f.removeEventListener("input",d)}}function S(){e._cleanupCharCounter&&e._cleanupCharCounter(),e.remove(),document.body.style.overflow=""}const L=5*60*1e3;let x=1,C="recent",R=0,k=!1,T=0,E=t.title;function $(){const d=`ratings_${encodeURIComponent(E)}`,l=localStorage.getItem(d);if(!l)return null;try{const{data:g,timestamp:m}=JSON.parse(l);if(Date.now()-m<L)return g}catch(g){console.warn("Error reading cache:",g)}return null}function V(d){try{const l=`ratings_${encodeURIComponent(E)}`,g={data:d,timestamp:Date.now()};localStorage.setItem(l,JSON.stringify(g))}catch(l){console.warn("Error saving to cache:",l)}}async function q(d=1,l=!1){if(k)return;const g=e.querySelector("#rating-comments-list");if(!g)return;g.innerHTML='<div class="flex justify-center items-center py-6"><div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-400"></div></div>';const m=l?null:$();if(m){console.log("Using cached data for:",E),H(m,d),Date.now()-T>L&&U(!0);return}await U()}function H(d,l=1){const g=e.querySelector("#rating-comments-list");if(g){if(g.innerHTML="",d.avg!==void 0){const m=parseFloat(d.avg).toFixed(1),h=parseInt(d.total)||0,y=e.querySelector("#rating-modal-stars"),D=e.querySelector("#rating-modal-avg"),b=e.querySelector("#rating-modal-total");if(y){y.innerHTML="";const P=Math.round(parseFloat(d.avg));y.innerHTML="★".repeat(P)+"☆".repeat(5-P)}D&&(D.textContent=`${m} out of 5`),b&&(b.textContent=`${h} ${h===1?"review":"reviews"}`)}if(!d.comments||d.comments.length===0){g.innerHTML=`
        <div class="text-center py-6 text-gray-400">
          No reviews yet. Be the first to leave a review!
        </div>
      `;return}V(d),d.pagination&&(R=d.pagination.total||0,W()),d.comments.forEach(m=>{if(!m)return;const h=document.createElement("div");h.className="border-b border-gray-700 py-4";const y=m.timestamp?new Date(m.timestamp).getTime():Date.now();h.innerHTML=`
        <div class="flex items-start justify-between mb-2">
          <div class="flex items-center">
            <div class="text-yellow-400 text-sm">
              ${"★".repeat(Math.round(m.rating||0))}${"☆".repeat(5-Math.round(m.rating||0))}
            </div>
            <span class="ml-2 text-sm text-gray-400">${(m.rating||0).toFixed(1)}</span>
          </div>
          <span class="text-xs text-gray-500">${Rt(y)}</span>
        </div>
        <div class="text-sm text-gray-300 mb-2 comment-text">
          <p>${K(m.message||m.comment||"")}</p>
        </div>
        <div class="flex justify-between items-center text-xs text-gray-500">
          <span>${m.nickname||"Anonymous"}</span>
          <button class="translate-comment text-emerald-400 hover:text-emerald-300 text-xs flex items-center gap-1" 
                  title="Translate to English">
            <i class="fas fa-language text-xs"></i>
            <span class="hidden sm:inline">Translate</span>
          </button>
        </div>
      `,g.appendChild(h)})}}function W(){const d=e.querySelector(".pagination");if(!d)return;const l=Math.ceil(R/10);let g=`
      <div class="flex justify-between items-center text-sm">
        <button 
          class="px-3 py-1 rounded ${x<=1?"text-gray-500 cursor-not-allowed":"text-emerald-400 hover:bg-gray-700"}"
          ${x<=1?"disabled":""}
          onclick="document.querySelector('.rating-modal')._vm.loadPage(${x-1})"
        >
          Previous
        </button>
        <div class="text-gray-400">
          Page ${x} of ${l}
        </div>
        <button 
          class="px-3 py-1 rounded ${x>=l?"text-gray-500 cursor-not-allowed":"text-emerald-400 hover:bg-gray-700"}"
          ${x>=l?"disabled":""}
          onclick="document.querySelector('.rating-modal')._vm.loadPage(${x+1})"
        >
          Next
        </button>
      </div>
    `;d.innerHTML=g}window.loadPage=d=>{if(!A||!A.comments)return;const l=Math.ceil(A.comments.length/10);d<1||d>l||(x=d,z())},e._vm={loadPage:window.loadPage};async function U(d=!1){var y,D;if(k)return;k=!0;const l=e.querySelector("#rating-comments-list");!d&&l&&(l.innerHTML='<div class="text-center py-4 text-gray-400">Loading comments...</div>');const g=`comments_${E}`,m=5*60*1e3,h=gt.get(g);if(h&&Date.now()-h.timestamp<m){A=h,z(),k=!1;return}try{const b=await fetch(`${mt}?source=${encodeURIComponent(E)}&all=true`);if(!b.ok)throw new Error(`Failed to fetch comments: ${b.statusText}`);const P=await b.json();A={...P,comments:P.comments||[],pagination:{total:((y=P.comments)==null?void 0:y.length)||0,page:1,totalPages:1,perPage:((D=P.comments)==null?void 0:D.length)||0}},gt.set(g,{...A,timestamp:Date.now()}),T=Date.now(),z()}catch(b){console.error("Error fetching comments:",b),h?(A=h,z()):!d&&l&&(l.innerHTML=`
          <div class="text-red-500 text-center py-4">
            Failed to load comments. Please try again later.
            ${b.message?`<div class="text-xs mt-1">${b.message}</div>`:""}
          </div>
        `)}finally{k=!1}}function z(){if(!A||!A.comments)return;const d=$t([...A.comments],C),l=10,g=Math.ceil(d.length/l),m=(x-1)*l,h=d.slice(m,m+l);A.pagination={total:d.length,page:x,totalPages:g,perPage:l},H({...A,comments:h,pagination:A.pagination},x)}let A=null;function $t(d,l){if(!d)return[];const g=[...d];switch(l){case"recent":return g.sort((m,h)=>{const y=m.timestamp?new Date(m.timestamp).getTime():0;return(h.timestamp?new Date(h.timestamp).getTime():0)-y});case"high":return g.sort((m,h)=>(h.rating||0)-(m.rating||0));case"low":return g.sort((m,h)=>(m.rating||0)-(h.rating||0));default:return g}}function Mt(){const d=e.querySelector("#rating-sort-select");d&&d.addEventListener("change",l=>{C=l.target.value,x=1,z()})}Mt(),q(),q();const Y=e.querySelector("#submit-rating-form"),G=e.querySelector("#rating-form-error"),j=Y.querySelector('button[type="submit"]');j.disabled=!0,Y.onsubmit=async d=>{d.preventDefault(),G.textContent="",G.className="text-sm text-rose-400 mt-2";try{const l=new FormData(Y),g=Object.fromEntries(l.entries()),m=parseInt(g.rating,10),h=g.comment.trim();if(isNaN(m)||m<1||m>5)throw new Error("Please select a valid rating");if(h&&h.split(/\s+/).length<3)throw new Error("Message must be at least 3 words");if(!g["cf-turnstile-response"])throw new Error("Please complete the CAPTCHA");const y=await Dt(),D=`hydra_rating_${currentSourceId}_${y}`;j.disabled=!0,j.innerHTML='<i class="fas fa-spinner fa-spin mr-2"></i> Submitting...',G.classList.add("hidden");const b={source:currentSourceId,rating:m,comment:h,ipHash:y,"cf-turnstile-response":g["cf-turnstile-response"]},P=await fetch(mt,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(b)}),qt=await P.json();if(!P.ok)throw new Error(qt.error||"Failed to submit rating");showNotification("Rating submitted successfully! It will be visible after moderation.","success"),setTimeout(S,1500),Y.reset(),window.turnstile&&turnstile.reset()}catch(l){console.error("Error submitting rating:",l),G.textContent=l.message||"Failed to submit rating. Please try again.",G.classList.remove("hidden"),window.turnstile&&(window.turnstile.reset(),document.querySelector(".cf-turnstile-response").value="")}finally{j&&(j.disabled=!1,j.innerHTML='<i class="fas fa-paper-plane mr-2"></i> Submit Review')}}}document.body.classList.add("preloading");document.addEventListener("DOMContentLoaded",async()=>{await Pt.initialize()});function Ht(){const t=document.getElementById("preloader"),e=t.querySelector(".loading-progress"),s=t.querySelector(".loading-percentage");let n=0;const a=()=>{const o=100-n,i=Math.min(o*.1,Math.max(.2,Math.random()*.8));n=Math.min(100,n+i),e.style.width=`${n}%`;const r=n<100?n.toFixed(1):Math.round(n);s.textContent=`${r}%`,n<30?s.className="loading-percentage text-sm font-medium text-white/70":n<60?s.className="loading-percentage text-sm font-medium text-emerald-400/70":s.className="loading-percentage text-sm font-medium text-emerald-400",n<100?requestAnimationFrame(a):setTimeout(()=>{t.classList.add("hiding"),t.addEventListener("transitionend",()=>{t.remove(),document.body.classList.remove("preloading"),w.updatePageContent(),nt()},{once:!0})},1e3)};setTimeout(()=>{t&&document.body.contains(t)&&(console.log("Preloader safety timeout triggered"),t.classList.add("hiding"),setTimeout(()=>{t.remove(),document.body.classList.remove("preloading"),w.updatePageContent(),nt()},400))},5e3),setTimeout(()=>{requestAnimationFrame(a)},300)}function nt(){const t=document.getElementById("language-switcher"),e=document.getElementById("language-dropdown");if(!t||!e)return;const s=t.cloneNode(!0);t.parentNode.replaceChild(s,t);const n=w.getCurrentLocale(),a=s.querySelector("span");if(a){const r={en:"English",ru:"Русский","pt-br":"Português"};a.textContent=r[n]||"English"}s.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),e.classList.contains("hidden")?(e.classList.remove("hidden"),s.classList.add("bg-white/10")):(e.classList.add("hidden"),s.classList.remove("bg-white/10"))}),e.querySelectorAll("button").forEach(r=>{r.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation();const c=r.dataset.lang;if(w.setLocale(c),e.classList.add("hidden"),s.classList.remove("bg-white/10"),a){const f={en:"English",ru:"Русский","pt-br":"Português"};a.textContent=f[c]||"English"}M()})}),document.addEventListener("click",r=>{s.contains(r.target)||(e.classList.add("hidden"),s.classList.remove("bg-white/10"))});const i=()=>{const r=t.querySelector("span"),u={en:"English",ru:"Русский","pt-br":"Português"};r.textContent=u[w.currentLocale]||"English"};document.addEventListener("languageChanged",i)}document.addEventListener("DOMContentLoaded",()=>{try{Ht()}catch(o){console.error("Error initializing preloader:",o);const i=document.getElementById("preloader");i&&i.remove(),document.body.classList.remove("preloading"),w.updatePageContent(),nt()}Xt();const t=document.getElementById("accept-cookies"),e=document.getElementById("reject-cookies"),s=document.getElementById("cookie-consent");t&&t.addEventListener("click",()=>{n(),st("cookie-consent","accepted",365)}),e&&e.addEventListener("click",()=>{n(),st("cookie-consent","rejected",365)});function n(){s.classList.add("translate-y-full"),s.addEventListener("transitionend",()=>{s.style.display="none"},{once:!0})}wt(),setTimeout(()=>{Lt()},300),ee(),se(),ne(),at(),Ut(),initializeMobileFilters();let a;window.addEventListener("resize",()=>{clearTimeout(a),a=setTimeout(()=>{at()},100)})});function wt(){try{console.log("Initializing sorting..."),document.querySelectorAll(".sort-option").forEach(e=>{e.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation();const n=e.getAttribute("data-sort");if(console.log("Sort option clicked:",n),n){rt(n);const a=document.getElementById("mobile-filters");a&&!a.classList.contains("hidden")&&(a.classList.add("hidden"),document.body.style.overflow="auto"),M()}})});const t=localStorage.getItem("currentSort")||"hot";console.log("Initial sort type:",t),rt(t),console.log("Sorting initialized with type:",t)}catch(t){console.error("Error initializing sorting:",t)}}let v=[],N="",B=null,I=1;const O={mobile:4,tablet:6,desktop:9,wide:15},F=document.getElementById("about-modal"),Nt=document.getElementById("about-btn"),St=document.getElementById("close-about"),_=document.getElementById("suggest-modal"),_t=document.getElementById("suggest-btn"),jt=document.getElementById("close-suggest"),X=24*60*60*1e3;document.getElementById("mobile-filters-btn");document.getElementById("mobile-filters-modal");document.getElementById("close-mobile-filters");document.getElementById("mobile-filters-content");document.getElementById("reset-filters");document.getElementById("apply-filters");const Z=document.getElementById("active-filters-count"),Ot={tablet:768};function at(){var n;const t=document.getElementById("filters-sidebar"),e=(n=document.getElementById("mobile-filters-btn"))==null?void 0:n.parentElement;if(!t||!e)return;const s=window.innerWidth<Ot.tablet;t.classList.toggle("hidden",s),e.classList.toggle("hidden",!s)}function Ut(){const t=document.getElementById("mobile-filters-btn"),e=document.getElementById("mobile-filters-modal"),s=e==null?void 0:e.querySelector(".flex.flex-col.bg-\\[\\#111\\]"),n=e==null?void 0:e.querySelector(".bg-\\[\\#0A0A0A\\]");if(!t||!e||!s||!n)return;function a(){e.classList.remove("hidden"),e.offsetHeight,n.classList.add("opacity-100"),s.classList.remove("translate-y-full"),document.body.classList.add("overflow-hidden")}function o(){n.classList.remove("opacity-100"),s.classList.add("translate-y-full"),setTimeout(()=>{e.classList.add("hidden"),document.body.classList.remove("overflow-hidden")},300)}t.addEventListener("click",c=>{c.preventDefault(),a()});const i=document.getElementById("close-mobile-filters");i&&i.addEventListener("click",c=>{c.preventDefault(),o()}),e.addEventListener("click",c=>{c.target===e&&o()}),document.addEventListener("keydown",c=>{c.key==="Escape"&&!e.classList.contains("hidden")&&o()});const r=document.getElementById("reset-filters");r&&r.addEventListener("click",c=>{c.preventDefault(),Gt(),Et()});const u=document.getElementById("apply-filters");u&&u.addEventListener("click",c=>{c.preventDefault(),o(),M()})}function Et(){const t=zt();Z&&(t>0?(Z.textContent=`${t} active`,Z.classList.remove("hidden")):Z.classList.add("hidden"))}function zt(){let t=0;return N&&t++,B&&t++,localStorage.getItem("currentSort")&&t++,t}function Gt(){N="",B=null,localStorage.removeItem("currentSort"),document.querySelectorAll(".status-filter-btn div").forEach(t=>{t.classList.remove("bg-black/40")}),document.querySelectorAll(".games-filter-btn div").forEach(t=>{t.classList.remove("border-emerald-500/20","bg-black/40"),t.classList.add("border-white/5","bg-black/20")}),document.querySelectorAll(".sort-option").forEach(t=>{t.classList.remove("bg-white/10","text-white"),t.classList.add("text-white/70")}),M()}async function Lt(){try{v=(await(await fetch("data/resources.json")).json()).sources;const s="hydra_ratings_cache",n=5*60*1e3,a=()=>{try{const r=localStorage.getItem(s);if(!r)return null;const{timestamp:u,data:c}=JSON.parse(r);if(Date.now()-u<n)return c}catch(r){console.error("Error reading from cache:",r)}return null},o=r=>{try{localStorage.setItem(s,JSON.stringify({timestamp:Date.now(),data:r}))}catch(u){console.error("Error saving to cache:",u)}},i=a();if(i){console.log("Using cached ratings data"),v.forEach(r=>{const u=i[r.title]||{avg:0,total:0};r.rating={avg:parseFloat(u.avg)||0,total:parseInt(u.total)||0}});return}console.log("Fetching fresh ratings data...");try{const r=[...new Set(v.map(p=>p.title))];console.log(`Fetching ratings for ${r.length} sources`);const u=`https://libraryratingsdb.zxcsixx.workers.dev/api/ratings?batch=true&sources=${r.map(encodeURIComponent).join(",")}`;console.log("Batch API URL:",u);const c=await fetch(u);if(console.log("Batch response status:",c.status),!c.ok)throw new Error(`HTTP error! status: ${c.status}`);const f=await c.json();console.log("Received batch ratings data"),o(f),v.forEach(p=>{const S=f[p.title]||{avg:0,total:0};p.rating={avg:parseFloat(S.avg)||0,total:parseInt(S.total)||0}}),console.log("All ratings loaded via batch endpoint")}catch(r){console.error("Error in batch ratings fetch:",r),v.forEach(u=>{u.rating={avg:0,total:0}})}wt(),M(),Jt()}catch(t){console.error("Error loading sources:",t);const e=document.getElementById("sources-container");e&&(e.innerHTML=`
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
            `)}finally{setTimeout(()=>{const t=document.getElementById("preloader");t&&(t.style.opacity="0",setTimeout(()=>{t.style.display="none",M()},300))},500)}}async function Jt(){try{const t=new Promise((o,i)=>setTimeout(()=>i(new Error("Firebase request timed out")),5e3)),e=it(lt,"sources"),s=ct(e),a=(await Promise.race([s,t])).val();if(a){v=v.map(o=>{var p;const i=o.url.replace(/[^a-zA-Z0-9]/g,"_"),r=((p=a[i])==null?void 0:p.stats)||{installs:0,copies:0,activity:[]},u=Array.isArray(r.activity)?r.activity:[],c=Date.now(),f=u.filter(S=>c-S<X).length;return{...o,stats:{...r,recentActivity:f,activity:u}}}),v.forEach(o=>{ut(o.url,o.stats)});try{localStorage.setItem("sourceStats",JSON.stringify(a)),localStorage.setItem("statsLastUpdated",Date.now().toString())}catch{}return!0}return!1}catch{try{const e=localStorage.getItem("sourceStats");if(e){const s=JSON.parse(e);v=v.map(n=>{var c;const a=n.url.replace(/[^a-zA-Z0-9]/g,"_"),o=((c=s[a])==null?void 0:c.stats)||{installs:0,copies:0,activity:[]},i=Array.isArray(o.activity)?o.activity:[],r=Date.now(),u=i.filter(f=>r-f<X).length;return{...n,stats:{...o,recentActivity:u,activity:i}}});try{const n=v.map(o=>encodeURIComponent(o.title)).join(","),a=await fetch(`https://libraryratingsdb.zxcsixx.workers.dev/api/ratings?batch=true&sources=${n}`);if(a.ok){const o=await a.json();v.forEach(i=>{const r=o[i.title]||{avg:0,total:0};ratingsMap[i.title]={avg:parseFloat(r.avg)||0,total:parseInt(r.total)||0}})}else throw new Error("Failed to fetch batch ratings")}catch(n){console.error("Error fetching batch ratings:",n),await Promise.all(v.map(async a=>{try{const i=await(await fetch(`https://libraryratingsdb.zxcsixx.workers.dev/api/ratings?source=${encodeURIComponent(a.title)}&page=1`)).json();ratingsMap[a.title]={avg:typeof i.avg=="number"?i.avg:0,total:typeof i.total=="number"?i.total:0}}catch(o){console.error(`Error fetching rating for ${a.title}:`,o),ratingsMap[a.title]={avg:0,total:0}}}))}return console.log("Using cached stats from localStorage"),!0}}catch{}return v=v.map(e=>({...e,stats:{installs:0,copies:0,recentActivity:0,activity:[]}})),!1}}function ft(t){document.querySelector("main").classList.add("blur-sm","transition-all","duration-200");const e=w.t.bind(w),s=document.createElement("div");s.className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in p-4",s.innerHTML=`
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
    `,document.body.appendChild(s);const n=()=>{document.querySelector("main").classList.remove("blur-sm"),s.remove()};s.querySelector(".cancel-btn").addEventListener("click",()=>{n(),t(!1)}),s.querySelector(".proceed-btn").addEventListener("click",()=>{n(),t(!0)}),s.querySelector(".fixed.inset-0").addEventListener("click",a=>{a.target===a.currentTarget&&(n(),t(!1))})}function pt(t){document.querySelector("main").classList.add("blur-sm","transition-all","duration-200");const e=w.t.bind(w),s=document.createElement("div");s.className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in p-4",s.innerHTML=`
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
    `,document.body.appendChild(s);const n=()=>{document.querySelector("main").classList.remove("blur-sm"),s.remove()};s.querySelector(".cancel-btn").addEventListener("click",()=>{n(),t(!1)}),s.querySelector(".proceed-btn").addEventListener("click",()=>{n(),t(!0)}),s.querySelector(".fixed.inset-0").addEventListener("click",a=>{a.target===a.currentTarget&&(n(),t(!1))})}function Vt(t){var S,L,x,C,R;const e=w.getCurrentLocale(),n=(((S=w.translations[e])==null?void 0:S.sources)||{})[t.title]||{title:t.title,description:t.description},a=t.status.includes("Use At Your Own Risk"),o=t.stats||{installs:0,copies:0,recentActivity:0},i=parseInt(o.recentActivity||0),r=document.createElement("div");r.className="source-card animate-fade-in rounded-xl",r.dataset.url=t.url,r.dataset.name=t.title,r.dataset.copies=((L=t.stats)==null?void 0:L.copies)||0,r.dataset.installs=((x=t.stats)==null?void 0:x.installs)||0,r.dataset.activity=((C=t.stats)==null?void 0:C.recentActivity)||0;const u=t.status.map(k=>{const T=k.toLowerCase().replace(/\s+/g,"-"),E={trusted:{color:"emerald",icon:"shield",key:"trusted",customClass:"bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/30 "},"safe-for-use":{color:"blue",icon:"check-circle",key:"safeForUse",customClass:"bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/30"},"use-at-your-own-risk":{color:"red",icon:"exclamation-triangle",key:"useAtOwnRisk",customClass:"bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/30 "},"works-in-russia":{color:"teal",icon:"globe-europe",key:"worksInRussia",customClass:"bg-teal-500/10 border-teal-500/20 text-teal-400 hover:bg-teal-500/20 hover:border-teal-500/30 "},nsfw:{color:"purple",icon:"exclamation-circle",key:"nsfw",customClass:"bg-purple-500/10 border-purple-500/20 text-purple-400 hover:bg-purple-500/20 hover:border-purple-500/30 "}}[T]||{color:"gray",icon:"circle",key:T},$=`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs backdrop-blur-sm status-badge ${E.customClass||""}`,V=`bg-${E.color}-500/10 border border-${E.color}-500/20 text-${E.color}-400`,q=w.t(`status.${E.key}`);return`
            <span class="${E.customClass?$:`${$} ${V}`}">
                <i class="fas fa-${E.icon} text-[10px]"></i>
                ${q}
            </span>
        `}).join("");r.innerHTML=`
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
                    ${u}
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
                <div class="mt-2 pt-2 text-white/40 relative">
                    
                    
                    <div class="flex items-center justify-between">
                        <span class="hidden lg:flex items-center gap-1.5 text-white/40 text-[10px] sm:text-xs">
                            <i class="fas fa-calendar-alt text-[10px] hidden sm:inline"></i>
                            <span class="whitespace-nowrap">${Qt(t.addedDate)}</span>
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
                            <span class="flex items-center gap-1.5 ${i>0?"text-red-400":""}
                                       transition-colors duration-300">
                                <i class="fas fa-fire text-[10px]"></i>
                                ${i}
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
    `;const c=(R=r.querySelector("[data-rating-stars-container]"))==null?void 0:R.parentElement;c&&(c.addEventListener("click",k=>{k.stopPropagation(),Ft(t)}),At(r,t.rating));const f=r.querySelector(".install-btn"),p=r.querySelector(".copy-btn");return p&&p.addEventListener("click",async()=>{const k=async()=>{await xt(t.url,"copy")&&(navigator.clipboard.writeText(t.url),p.innerHTML='<i class="fas fa-check text-[10px]"></i> '+w.t("sourceCard.copied"),setTimeout(()=>{p.innerHTML='<i class="fas fa-copy text-[10px]"></i> '+w.t("sourceCard.copy")},2e3))},T=t.title==="CPGRepacks";a||T?(T?pt:ft)($=>{$&&k()}):k()}),f&&f.addEventListener("click",async()=>{const k=async()=>{yt(f,"loading");const E=await xt(t.url,"install");if(yt(f,E?"success":"rate-limited"),E){const $=encodeURIComponent(t.url);window.location.href=`hydralauncher://install-source?urls=${$}`}},T=t.title==="CPGRepacks";t.status.includes("Use At Your Own Risk")||T?(T?pt:ft)($=>{$&&k()}):k()}),ut(t.url,t.stats),r.dataset.copies=o.copies||0,r.dataset.installs=o.installs||0,r.dataset.activity=i,r}let Q="wide";function Ct(){const t=window.innerWidth;return t>=1536?"wide":t>=1024?"desktop":t>=640?"tablet":"mobile"}let ht;window.addEventListener("resize",()=>{clearTimeout(ht),ht=setTimeout(()=>{at();const t=Ct();if(Q!==t){const s=dt(),n=tt(),a=Math.ceil(s.length/n);if(Q==="wide"&&t==="desktop"){const o=(I-1)*O.desktop;I=Math.floor(o/O.desktop)+1}Q=t,I=Math.min(Math.max(1,I),a),M(s),n<tt()&&window.scrollTo({top:0,behavior:"smooth"})}},100)});function vt(t,e){return console.log(`Sorting sources by: ${e}`),[...t].sort((s,n)=>{var a,o,i,r,u,c,f,p,S,L,x,C;try{switch(e){case"hot":const R=((a=s.stats)==null?void 0:a.recentActivity)||0;return(((o=n.stats)==null?void 0:o.recentActivity)||0)-R;case"new":return new Date(n.addedDate||0)-new Date(s.addedDate||0);case"most-copies":const T=((i=s.stats)==null?void 0:i.copies)||0;return(((r=n.stats)==null?void 0:r.copies)||0)-T;case"most-installs":const $=((u=s.stats)==null?void 0:u.installs)||0;return(((c=n.stats)==null?void 0:c.installs)||0)-$;case"top-rated":console.log(`Comparing ratings: ${s.title} (${((f=s.rating)==null?void 0:f.avg)||0}) vs ${n.title} (${((p=n.rating)==null?void 0:p.avg)||0})`),console.log(`Full rating data for ${s.title}:`,s.rating),console.log(`Full rating data for ${n.title}:`,n.rating);const q=((S=s.rating)==null?void 0:S.avg)||0,H=((L=n.rating)==null?void 0:L.avg)||0;if(q===H){const W=((x=s.rating)==null?void 0:x.total)||0,U=((C=n.rating)==null?void 0:C.total)||0;return console.log(`Ratings equal (${q}), comparing counts: ${W} vs ${U}`),U-W}return console.log(`Sorting by rating: ${H} - ${q} = ${H-q}`),H-q;case"name-asc":return(s.title||"").localeCompare(n.title||"");case"name-desc":return(n.title||"").localeCompare(s.title||"");default:return 0}}catch(R){return console.error("Error in sort function:",R),console.error("Sort type:",e),console.error("Source A:",s),console.error("Source B:",n),0}})}function rt(t){var e;try{console.log("Updating active sort UI for:",t);const s=document.querySelector(".mobile-sort-button span");if(s){const a=((e=document.querySelector(`.sort-option[data-sort="${t}"]`))==null?void 0:e.textContent)||"Sort";s.textContent=a}document.querySelectorAll(".sort-option").forEach(a=>{const o=a.getAttribute("data-sort")===t;a.classList.toggle("bg-white/10",o),a.classList.toggle("text-white",o),a.classList.toggle("text-white/70",!o);const i=a.querySelector("i.fa-check");i&&(i.style.opacity=o?"1":"0")});const n=document.getElementById("sort-dropdown");n&&!n.classList.contains("hidden")&&n.classList.add("hidden"),localStorage.setItem("currentSort",t)}catch(s){console.error("Error updating sort UI:",s)}}function M(t=null){const e=document.getElementById("sources-container");if(e){e.innerHTML="";try{let s=t||dt();console.log(`Displaying ${s.length} filtered sources`);const n=localStorage.getItem("currentSort")||"hot";if(console.log("Current sort type:",n),n){console.log("Before sorting - first few sources:",s.slice(0,3).map(c=>{var f,p;return{title:c.title,rating:c.rating,hasRating:!!((f=c.rating)!=null&&f.avg||(p=c.rating)!=null&&p.total)}}));try{s=vt(s,n),console.log("After sorting - first few sources:",s.slice(0,3).map(c=>{var f,p;return{title:c.title,rating:c.rating,sortKey:n==="top-rated"?`${((f=c.rating)==null?void 0:f.avg)||0} (${((p=c.rating)==null?void 0:p.total)||0} ratings)`:c[n]||"N/A"}})),rt(n)}catch(c){console.error("Error during sorting:",c),s=vt(s,"hot")}}Q=Ct();const a=tt(),o=Math.ceil(s.length/a);I=Math.min(Math.max(1,I),o);const i=(I-1)*a,r=Math.min(i+a,s.length);s.slice(i,r).forEach(c=>{const f=Vt(c);e.appendChild(f)}),Wt(o),w.updatePageContent()}catch(s){console.error("Error in displaySources:",s),e.innerHTML=`
            <div class="col-span-full text-center py-10 px-4">
                <div class="text-red-400 text-4xl mb-4">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h3 class="text-xl font-semibold text-white mb-2">Error Loading Content</h3>
                <p class="text-white/70 mb-4">${s.message||"An unknown error occurred"}</p>
                <button onclick="location.reload()" class="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                    <i class="fas fa-sync-alt mr-2"></i> Try Again
                </button>
            </div>
        `}}}function tt(){const t=window.innerWidth;return t>=2560?O.wide:t>=1024?O.desktop:t>=640?O.tablet:O.mobile}function Wt(t){const e=document.getElementById("pagination");if(!e)return;let s="";s+=`
        <button onclick="changePage(${I-1})" 
                class="px-2 py-1.5 text-sm text-white/50 hover:text-white disabled:opacity-50 
                       transition-colors duration-200 rounded-md hover:bg-white/5"
                ${I===1?"disabled":""}>
            <i class="fas fa-chevron-left"></i>
        </button>
    `;for(let n=1;n<=t;n++)n===I?s+=`
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
        <button onclick="changePage(${I+1})" 
                class="px-2 py-1.5 text-sm text-white/50 hover:text-white disabled:opacity-50 
                       transition-colors duration-200 rounded-md hover:bg-white/5"
                ${I===t?"disabled":""}>
            <i class="fas fa-chevron-right"></i>
        </button>
    `,e.innerHTML=s}window.changePage=function(t){if(t<1)return;const e=dt(),s=Math.ceil(e.length/tt());t>s||(I=t,M(e),window.scrollTo({top:0,behavior:"smooth"}))};document.querySelectorAll(".status-filter-btn").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.status;document.querySelectorAll(".status-filter-btn").forEach(s=>{s.querySelector("div").classList.remove("bg-black/40")}),N===e?N="":(N=e,t.querySelector("div").classList.add("bg-black/40")),I=1,M(),kt(),dispatchFiltersChanged()})});document.querySelectorAll(".games-filter-btn").forEach(t=>{t.addEventListener("click",()=>{const e=parseInt(t.dataset.min),s=parseInt(t.dataset.max);if(document.querySelectorAll(".games-filter-btn div").forEach(n=>{n.classList.remove("border-emerald-500/20","bg-black/40"),n.classList.add("border-white/5","bg-black/20")}),B&&B.min===e&&B.max===s)B=null;else{B={min:e,max:s};const n=t.querySelector("div");n.classList.remove("border-white/5","bg-black/20"),n.classList.add("border-emerald-500/20","bg-black/40")}I=1,M(),kt(),Et(),dispatchFiltersChanged()})});function kt(){const t={};v.forEach(e=>{e.status.forEach(s=>{t[s]=(t[s]||0)+1})}),document.querySelectorAll(".status-filter-btn").forEach(e=>{const s=e.dataset.status,n=e.querySelector(".text-white\\/40");n&&(n.textContent=t[s]||0)}),document.querySelectorAll(".games-filter-btn").forEach(e=>{const s=parseInt(e.dataset.min),n=parseInt(e.dataset.max),a=v.filter(r=>{const u=parseInt(r.gamesCount);return u>=s&&u<=n}).length,o=e.querySelector(".text-white\\/40");o&&(o.textContent=a);const i=e.querySelector(".bg-emerald-500\\/50");if(i){const r=Math.max(...Array.from(document.querySelectorAll(".games-filter-btn")).map(c=>{const f=parseInt(c.dataset.min),p=parseInt(c.dataset.max);return v.filter(S=>{const L=parseInt(S.gamesCount);return L>=f&&L<=p}).length})),u=r>0?a/r*100:0;i.style.width=`${u}%`}})}let J="";document.getElementById("search").addEventListener("input",t=>{J=t.target.value.toLowerCase(),I=1,M()});function dt(){return v.filter(t=>{const e=!J||t.title.toLowerCase().includes(J)||t.description.toLowerCase().includes(J)||t.url.toLowerCase().includes(J),s=!N||t.status.includes(N),n=parseInt(t.gamesCount),a=!B||n>=B.min&&n<=B.max;return e&&s&&a})}const It=document.getElementById("sort-dropdown-btn"),et=document.getElementById("sort-dropdown"),Yt=document.getElementById("current-sort");It.addEventListener("click",()=>{et.classList.toggle("hidden")});document.addEventListener("click",t=>{!It.contains(t.target)&&!et.contains(t.target)&&et.classList.add("hidden")});document.querySelectorAll(".sort-option").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.sort;switch(Yt.textContent=t.textContent.trim(),et.classList.add("hidden"),e){case"high-to-low":sortGamesFilters(!1);break;case"low-to-high":sortGamesFilters(!0);break;case"most-sources":Kt();break;case"most-popular":Zt();break}})});function Kt(){const t=document.querySelector(".games-filter-btn").parentNode,e=Array.from(t.querySelectorAll(".games-filter-btn"));e.sort((s,n)=>{const a=parseInt(s.querySelector(".text-white\\/40").textContent);return parseInt(n.querySelector(".text-white\\/40").textContent)-a}),e.forEach(s=>s.remove()),e.forEach(s=>t.appendChild(s))}function Zt(){const t=JSON.parse(localStorage.getItem("sourceStats")||"{}"),e=document.querySelector(".games-filter-btn").parentNode,s=Array.from(e.querySelectorAll(".games-filter-btn"));s.sort((n,a)=>{var p,S;const o=((p=v.find(L=>L.gamesCount===n.dataset.min))==null?void 0:p.url)||"",i=((S=v.find(L=>L.gamesCount===a.dataset.min))==null?void 0:S.url)||"",r=t[o]||{installs:0,copies:0},u=t[i]||{installs:0,copies:0},c=r.installs+r.copies;return u.installs+u.copies-c}),s.forEach(n=>n.remove()),s.forEach(n=>e.appendChild(n))}function Qt(t){const e=new Date(t),n=Math.abs(new Date-e),a=Math.floor(n/(1e3*60*60*24)),o=w.t.bind(w);if(a===0)return o("common.date.today");if(a===1)return o("common.date.yesterday");if(a<30)return o("common.date.daysAgo",{days:a});{const i={year:"numeric",month:"short",day:"numeric"};return e.toLocaleDateString(w.getCurrentLocale(),i)}}document.addEventListener("DOMContentLoaded",()=>{Lt(),sortGamesFilters(!1)});Nt.addEventListener("click",()=>{F.classList.remove("hidden"),document.body.style.overflow="hidden"});St.addEventListener("click",()=>{F.classList.add("hidden"),document.body.style.overflow=""});F.addEventListener("click",t=>{t.target===F&&St.click()});document.addEventListener("keydown",t=>{t.key==="Escape"&&!F.classList.contains("hidden")&&(F.classList.add("hidden"),document.body.style.overflow="")});_t.addEventListener("click",()=>{_.classList.remove("hidden"),document.body.style.overflow="hidden"});jt.addEventListener("click",()=>{_.classList.add("hidden"),document.body.style.overflow=""});_.addEventListener("click",t=>{t.target===_&&(_.classList.add("hidden"),document.body.style.overflow="")});document.addEventListener("keydown",t=>{t.key==="Escape"&&(F.classList.contains("hidden")||(F.classList.add("hidden"),document.body.style.overflow=""),_.classList.contains("hidden")||(_.classList.add("hidden"),document.body.style.overflow=""))});function st(t,e,s){const n=new Date;n.setTime(n.getTime()+s*24*60*60*1e3),document.cookie=`${t}=${e};expires=${n.toUTCString()};path=/`}function Tt(t){const e=t+"=",s=document.cookie.split(";");for(let n=0;n<s.length;n++){let a=s[n];for(;a.charAt(0)===" ";)a=a.substring(1,a.length);if(a.indexOf(e)===0)return a.substring(e.length,a.length)}return null}async function xt(t,e){try{const s=t.replace(/[^a-zA-Z0-9]/g,"_"),n=`${e}_${s}`;if(Tt(n))return!0;let a={installs:0,copies:0,activity:[],recentActivity:0};try{const i=new Promise((x,C)=>setTimeout(()=>C(new Error("Firebase request timed out")),3e3)),r=it(lt,`sources/${s}/stats`),u=ct(r),f=(await Promise.race([u,i])).val()||{installs:0,copies:0,activity:[]},p=Date.now(),L=(Array.isArray(f.activity)?f.activity:[]).filter(x=>p-x<X);L.push(p),a={installs:parseInt(f.installs||0)+(e==="install"?1:0),copies:parseInt(f.copies||0)+(e==="copy"?1:0),activity:L,recentActivity:L.length,lastUpdated:p},await Promise.race([bt(r,a),new Promise((x,C)=>setTimeout(()=>C(new Error("Update timed out")),3e3))]);try{const x=localStorage.getItem("sourceStats");if(x){const C=JSON.parse(x);C[s]||(C[s]={}),C[s].stats=a,localStorage.setItem("sourceStats",JSON.stringify(C)),localStorage.setItem("statsLastUpdated",p.toString())}}catch{}}catch{console.log("Firebase update failed, continuing with local data");const r=v.find(u=>u.url===t);if(r&&r.stats){a={installs:parseInt(r.stats.installs||0)+(e==="install"?1:0),copies:parseInt(r.stats.copies||0)+(e==="copy"?1:0),activity:[],recentActivity:1,lastUpdated:Date.now()};try{const u=localStorage.getItem("sourceStats");if(u){const c=JSON.parse(u);c[s]||(c[s]={}),c[s].stats=a,localStorage.setItem("sourceStats",JSON.stringify(c)),localStorage.setItem("statsLastUpdated",Date.now().toString())}}catch{}}}st(n,"true",e==="install"?.003472222:347222e-9),ut(t,a);const o=v.findIndex(i=>i.url===t);return o!==-1&&(v[o].stats=a),!0}catch{return!1}}function ut(t,e=null){const s=document.querySelectorAll(".source-card"),n=Array.from(s).find(a=>a.dataset.url===t);if(n){const a=n.querySelector(".source-stats");if(a){const o=parseInt((e==null?void 0:e.installs)||0),i=parseInt((e==null?void 0:e.copies)||0),r=parseInt((e==null?void 0:e.recentActivity)||0);a.innerHTML=`
                <span class="flex items-center gap-1.5">
                    <i class="fas fa-fire text-[10px] ${r>0?"text-red-500":""}"></i>
                    ${r}
                </span>
                <span class="flex items-center gap-1.5">
                    <i class="fas fa-download text-[10px]"></i>
                    ${o}
                </span>
                <span class="flex items-center gap-1.5">
                    <i class="fas fa-copy text-[10px]"></i>
                    ${i}
                </span>
            `}n.dataset.copies=(e==null?void 0:e.copies)||0,n.dataset.installs=(e==null?void 0:e.installs)||0,n.dataset.activity=(e==null?void 0:e.recentActivity)||0}}function yt(t,e){const s=t.innerHTML;switch(e){case"loading":t.disabled=!0,t.innerHTML=`
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
            `,setTimeout(()=>{t.disabled=!1,t.innerHTML=s},2e3);break;default:t.disabled=!1,t.innerHTML=s}}function Xt(){const t=document.getElementById("cookie-consent");Tt("cookie-consent")?t.style.display="none":(t.style.display="block",setTimeout(()=>{t.classList.remove("translate-y-full")},500))}document.getElementById("accept-cookies").addEventListener("click",()=>{const t=document.getElementById("cookie-consent");t.classList.add("translate-y-full"),t.addEventListener("transitionend",()=>{t.style.display="none"},{once:!0}),st("cookie-consent","accepted",365)});async function te(t){try{const e=it(lt,`sources/${t}/stats`),n=(await ct(e)).val();if(n&&n.activity){const a=n.activity.filter(o=>Date.now()-o<X);a.length!==n.activity.length&&await bt(e,{activity:a})}}catch{}}function ee(){const t=document.getElementById("suggest-modal"),e=document.getElementById("suggest-btn"),s=document.getElementById("close-suggest");e&&e.addEventListener("click",()=>{t.classList.remove("hidden")}),s&&s.addEventListener("click",()=>{t.classList.add("hidden")}),t&&t.addEventListener("click",n=>{n.target===t&&t.classList.add("hidden")})}function se(){const t=document.getElementById("search");if(t){const e=()=>{const n=window.innerWidth<640?"header.searchMobile":"header.search";t.placeholder=w.t(n)};e(),window.addEventListener("resize",e),document.addEventListener("languageChanged",e)}}function ne(){setInterval(()=>{v.forEach(t=>{const e=t.url.replace(/[^a-zA-Z0-9]/g,"_");te(e)})},60*60*1e3)}async function ae(t){const e=v.find(s=>s.title===t);if(e&&e.rating){const s={avg:parseFloat(e.rating.avg||0),total:parseInt(e.rating.total||0)};return ot(t,s),!0}return re()}async function re(){if(!v||v.length===0)return!1;const t="hydra_ratings_cache",e=5*60*1e3,s=()=>{try{const i=localStorage.getItem(t);if(!i)return null;const{timestamp:r,data:u}=JSON.parse(i);if(Date.now()-r<e)return u}catch(i){console.error("Error reading from cache:",i)}return null},n=i=>{try{localStorage.setItem(t,JSON.stringify({timestamp:Date.now(),data:i}))}catch(r){console.error("Error saving to cache:",r)}},a=s();if(a)return console.log("Using cached ratings data"),v.forEach(i=>{const r=a[i.title]||{avg:0,total:0};i.rating={avg:parseFloat(r.avg)||0,total:parseInt(r.total)||0},ot(i.title,i.rating)}),!0;console.log("Fetching fresh ratings data...");const o=[...new Set(v.map(i=>i.title))];if(o.length===0)return!1;try{const i="https://libraryratingsdb.zxcsixx.workers.dev/api/ratings/batch";console.log("Making batch API request to:",i);const r=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({sources:o,fields:["avg","total"]})});if(console.log("Batch response status:",r.status),!r.ok)return console.error("Failed to fetch batch ratings:",r.status,r.statusText),!1;const u=await r.json();return console.log("Received batch ratings data for",Object.keys(u).length,"sources"),n(u),v.forEach(c=>{const f=u[c.title]||{avg:0,total:0};c.rating={avg:parseFloat(f.avg)||0,total:parseInt(f.total)||0},ot(c.title,c.rating)}),!0}catch(i){return console.error("Error in updateAllSourceRatings:",i),!1}}function ot(t,e){document.querySelectorAll(".source-card").forEach(n=>{n.dataset.name===t&&At(n,e)})}function At(t,e){console.log("Updating card rating display for:",t.dataset.name,"with data:",JSON.stringify(e,null,2));const s=t.querySelector("[data-rating-stars-active]"),n=t.querySelector("[data-rating-avg]"),a=t.querySelector("[data-rating-total]"),o=t.querySelector("[data-rating-comment]");if(console.log("Found elements:",{starsActive:!!s,avgEl:!!n,totalEl:!!a,commentEl:!!o}),s&&n&&a)if(e&&(typeof e.avg=="number"||e.avg===0)){const i=e.avg/5*100,r=Math.round(i/10)*10;console.log(`Setting rating: avg=${e.avg}, total=${e.total}, starPercentage=${i}%, rounded=${r}%`),s.style.width=`${r}%`,n.textContent=e.avg>0?e.avg.toFixed(1):"–",a.textContent=e.total>0?`(${e.total})`:"",o&&(o.style.display=e.total>0?"inline-block":"none",console.log(`Comment icon display set to: ${o.style.display}`))}else console.log("No valid rating data, setting default state"),s.style.width="0%",n.textContent="–",a.textContent="",o&&(o.style.display="none");else console.error("Missing required rating elements on card:",{starsActive:!!s,avgEl:!!n,totalEl:!!a})}window.updateSourceCardRating=ae;document.addEventListener("languageChanged",()=>{M()});
