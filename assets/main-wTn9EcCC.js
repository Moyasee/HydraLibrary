import{c as Dt,i as b,r as rt,d as ot,g as it,u as bt}from"./index-DklScFds.js";const mt="https://libraryratingsdb.zxcsixx.workers.dev/api/ratings",Ft=5*60*1e3,gt={data:{},lastUpdated:{},get:function(t){const e=this.data[t],s=this.lastUpdated[t];return e&&s&&Date.now()-s<Ft?Promise.resolve(e):null},set:function(t,e){return this.data[t]=e,this.lastUpdated[t]=Date.now(),e},batchGet:function(t){const e={cached:{},uncached:[]};return t.forEach(s=>{const n=this.get(s);n?e.cached[s]=n:e.uncached.push(s)}),e},batchSet:function(t){Object.entries(t).forEach(([e,s])=>{this.set(e,s)})}};function Ht(t){const e=new Date(t),n=Math.floor((new Date-e)/1e3);let a=Math.floor(n/31536e3);return a>=1?a+" year"+(a===1?"":"s")+" ago":(a=Math.floor(n/2592e3),a>=1?a+" month"+(a===1?"":"s")+" ago":(a=Math.floor(n/86400),a>=1?a+" day"+(a===1?"":"s")+" ago":(a=Math.floor(n/3600),a>=1?a+" hour"+(a===1?"":"s")+" ago":(a=Math.floor(n/60),a>=1?a+" minute"+(a===1?"":"s")+" ago":"just now"))))}function Y(t){return String(t).replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}async function Nt(){var t;try{const s=[navigator.userAgent,navigator.language,screen.width,screen.height,navigator.platform,new Date().getTimezoneOffset(),!!navigator.cookieEnabled,navigator.hardwareConcurrency||0,navigator.deviceMemory||0,screen.colorDepth,((t=window.screen.orientation)==null?void 0:t.type)||""].join("|"),n=new TextEncoder().encode(s),a=await crypto.subtle.digest("SHA-256",n),o=Array.from(new Uint8Array(a)).map(r=>r.toString(16).padStart(2,"0")).join("");return sessionStorage.setItem("hydra_rating_hash",o),localStorage.getItem("hydra_rating_hash")||localStorage.setItem("hydra_rating_hash",o),o}catch(e){return console.error("Error generating user hash:",e),Math.random().toString(36).slice(2)+Date.now().toString(36)}}function _t(t){const s=`rating_submission_${t}`,n=localStorage.getItem(s);if(!n)return!0;const a=parseInt(n,10),i=Date.now(),o=60*60*1e3;return i-a>o}function jt(t){const e=`rating_submission_${t}`;localStorage.setItem(e,Date.now().toString())}function Ut(t){document.querySelectorAll(".rating-modal").forEach(d=>d.remove());const e=document.createElement("div");e.className="rating-modal fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4",e.innerHTML=`
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
              
              <!-- Cloudflare Turnstile Widget -->
              <div class="cf-turnstile" data-sitekey="0x4AAAAAABgPUEsL6w8fjG-Z" data-callback="onTurnstileSuccess" data-expired-callback="onTurnstileExpired" data-error-callback="onTurnstileError" data-theme="dark"></div>
              
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
  `,document.body.appendChild(e),document.body.style.overflow="hidden",window.onTurnstileSuccess=function(d){const c=document.querySelector('#submit-rating-form button[type="submit"]');c&&(c.disabled=!1)},window.onTurnstileExpired=function(){const d=document.querySelector('#submit-rating-form button[type="submit"]');d&&(d.disabled=!0)},window.onTurnstileError=function(){const d=document.querySelector('#submit-rating-form button[type="submit"]'),c=document.getElementById("rating-form-error");d&&(d.disabled=!0),c&&(c.textContent="Verification failed. Please try again.",c.classList.remove("hidden"))};const s=document.createElement("style");s.textContent=`
    .cf-turnstile {
      margin: 10px 0;
      max-width: 100%;
      transform: scale(0.9);
      transform-origin: 0 0;
    }
    .cf-turnstile iframe {
      max-width: 100% !important;
    }
  `,document.head.appendChild(s);const n=()=>{window.turnstile?window.turnstile.render(".cf-turnstile",{sitekey:"0x4AAAAAABgPUEsL6w8fjG-Z",callback:window.onTurnstileSuccess,"expired-callback":window.onTurnstileExpired,"error-callback":window.onTurnstileError,theme:"dark"}):setTimeout(n,100)};n(),e.querySelector(".close-rating-modal").onclick=l,e.querySelector(".fixed.inset-0").onclick=d=>{d.target===e.querySelector(".fixed.inset-0")&&l()};async function a(d,c="en"){return new Promise((p,g)=>{const h=JSON.stringify({translate:"rapidapi"}),x=new XMLHttpRequest;x.withCredentials=!0,x.addEventListener("readystatechange",function(){if(this.readyState===this.DONE)try{const y=JSON.parse(this.responseText);if(y&&y.translation)p(y.translation);else throw y&&y.status!==200?new Error(y.business_message||"Translation service error"):new Error("Invalid response from translation service")}catch(y){console.error("Translation error:",y,this.responseText),g(y)}}),x.addEventListener("error",()=>{g(new Error("Network error during translation"))});const P=`https://free-google-translator.p.rapidapi.com/external-api/free-google-translator?from=auto&to=${c}&query=${encodeURIComponent(d)}`;x.open("POST",P),x.setRequestHeader("x-rapidapi-key",""),x.setRequestHeader("x-rapidapi-host","free-google-translator.p.rapidapi.com"),x.setRequestHeader("Content-Type","application/json"),x.send(h)})}async function i(d){const c=d.target.closest(".translate-comment");if(!c||c.disabled)return;d.preventDefault(),d.stopPropagation();const p=c.closest(".border-b"),g=p?p.querySelector(".comment-text p"):null;if(!g){console.error("Could not find comment text element");return}let h=c.getAttribute("data-original");if(c.classList.contains("active")){h&&(g.textContent=h,c.innerHTML='<i class="fas fa-language text-xs"></i><span class="hidden sm:inline">Translate</span>',c.classList.remove("active"),c.title="Translate this review"),c.disabled=!1;return}h=g.textContent.trim(),c.setAttribute("data-original",h),c.innerHTML,c.innerHTML='<i class="fas fa-spinner fa-spin text-xs"></i>',c.title="Translating...",c.disabled=!0;try{const x=await a(h,"en");g.textContent=x,c.innerHTML='<i class="fas fa-undo text-xs"></i><span class="hidden sm:inline">Original</span>',c.classList.add("active"),c.title="Show original text"}catch(x){console.error("Translation failed:",x),g.textContent=h,c.innerHTML='<i class="fas fa-exclamation-triangle text-xs"></i><span class="hidden sm:inline">Error</span>',c.title="Error translating. Click to try again."}finally{c.disabled=!1}}const o=e.querySelector("#rating-comments-list");o&&o.addEventListener("click",i);const r=e.querySelector('textarea[name="comment"]'),u=e.querySelector(".char-count");if(r&&u){const d=()=>{u.textContent=r.value.length};r.addEventListener("input",d),d(),e._cleanupCharCounter=()=>{r.removeEventListener("input",d)}}function l(){e._cleanupCharCounter&&e._cleanupCharCounter(),e.remove(),document.body.style.overflow=""}const f=5*60*1e3;let m=1,w="recent",S=0,E=!1,L=0,k=t.title;function $(){const d=`ratings_${encodeURIComponent(k)}`,c=localStorage.getItem(d);if(!c)return null;try{const{data:p,timestamp:g}=JSON.parse(c);if(Date.now()-g<f)return p}catch(p){console.warn("Error reading cache:",p)}return null}function M(d){try{const c=`ratings_${encodeURIComponent(k)}`,p={data:d,timestamp:Date.now()};localStorage.setItem(c,JSON.stringify(p))}catch(c){console.warn("Error saving to cache:",c)}}async function C(d=1,c=!1){if(E)return;const p=e.querySelector("#rating-comments-list");if(!p)return;p.innerHTML='<div class="flex justify-center items-center py-6"><div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-400"></div></div>';const g=c?null:$();if(g){console.log("Using cached data for:",k),A(g,d),Date.now()-L>f&&B(!0);return}await B()}function A(d,c=1){const p=e.querySelector("#rating-comments-list");if(p){if(p.innerHTML="",d.avg!==void 0){const g=parseFloat(d.avg).toFixed(1),h=parseInt(d.total)||0,x=e.querySelector("#rating-modal-stars"),P=e.querySelector("#rating-modal-avg"),y=e.querySelector("#rating-modal-total");if(x){x.innerHTML="";const F=Math.round(parseFloat(d.avg));x.innerHTML="★".repeat(F)+"☆".repeat(5-F)}P&&(P.textContent=`${g} out of 5`),y&&(y.textContent=`${h} ${h===1?"review":"reviews"}`)}if(!d.comments||d.comments.length===0){p.innerHTML=`
        <div class="text-center py-6 text-gray-400">
          No reviews yet. Be the first to leave a review!
        </div>
      `;return}M(d),d.pagination&&(S=d.pagination.total||0,G()),d.comments.forEach(g=>{if(!g)return;const h=document.createElement("div");h.className="border-b border-gray-700 py-4";const x=g.timestamp?new Date(g.timestamp).getTime():Date.now();h.innerHTML=`
        <div class="flex items-start justify-between mb-2">
          <div class="flex items-center">
            <div class="text-yellow-400 text-sm">
              ${"★".repeat(Math.round(g.rating||0))}${"☆".repeat(5-Math.round(g.rating||0))}
            </div>
            <span class="ml-2 text-sm text-gray-400">${(g.rating||0).toFixed(1)}</span>
          </div>
          <span class="text-xs text-gray-500">${Ht(x)}</span>
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
      `,p.appendChild(h)})}}function G(){const d=e.querySelector(".pagination");if(!d)return;const c=Math.ceil(S/10);let p=`
      <div class="flex justify-between items-center text-sm">
        <button 
          class="px-3 py-1 rounded ${m<=1?"text-gray-500 cursor-not-allowed":"text-emerald-400 hover:bg-gray-700"}"
          ${m<=1?"disabled":""}
          onclick="document.querySelector('.rating-modal')._vm.loadPage(${m-1})"
        >
          Previous
        </button>
        <div class="text-gray-400">
          Page ${m} of ${c}
        </div>
        <button 
          class="px-3 py-1 rounded ${m>=c?"text-gray-500 cursor-not-allowed":"text-emerald-400 hover:bg-gray-700"}"
          ${m>=c?"disabled":""}
          onclick="document.querySelector('.rating-modal')._vm.loadPage(${m+1})"
        >
          Next
        </button>
      </div>
    `;d.innerHTML=p}window.loadPage=d=>{if(!I||!I.comments)return;const c=Math.ceil(I.comments.length/10);d<1||d>c||(m=d,R())},e._vm={loadPage:window.loadPage};async function B(d=!1){var x,P;if(E)return;E=!0;const c=e.querySelector("#rating-comments-list");!d&&c&&(c.innerHTML='<div class="text-center py-4 text-gray-400">Loading comments...</div>');const p=`comments_${k}`,g=5*60*1e3,h=gt.get(p);if(h&&Date.now()-h.timestamp<g){I=h,R(),E=!1;return}try{const y=await fetch(`${mt}?source=${encodeURIComponent(k)}&all=true`);if(!y.ok)throw new Error(`Failed to fetch comments: ${y.statusText}`);const F=await y.json();I={...F,comments:F.comments||[],pagination:{total:((x=F.comments)==null?void 0:x.length)||0,page:1,totalPages:1,perPage:((P=F.comments)==null?void 0:P.length)||0}},gt.set(p,{...I,timestamp:Date.now()}),L=Date.now(),R()}catch(y){console.error("Error fetching comments:",y),h?(I=h,R()):!d&&c&&(c.innerHTML=`
          <div class="text-red-500 text-center py-4">
            Failed to load comments. Please try again later.
            ${y.message?`<div class="text-xs mt-1">${y.message}</div>`:""}
          </div>
        `)}finally{E=!1}}function R(){if(!I||!I.comments)return;const d=J([...I.comments],w),c=10,p=Math.ceil(d.length/c),g=(m-1)*c,h=d.slice(g,g+c);I.pagination={total:d.length,page:m,totalPages:p,perPage:c},A({...I,comments:h,pagination:I.pagination},m)}let I=null;function J(d,c){if(!d)return[];const p=[...d];switch(c){case"recent":return p.sort((g,h)=>{const x=g.timestamp?new Date(g.timestamp).getTime():0;return(h.timestamp?new Date(h.timestamp).getTime():0)-x});case"high":return p.sort((g,h)=>(h.rating||0)-(g.rating||0));case"low":return p.sort((g,h)=>(g.rating||0)-(h.rating||0));default:return p}}function $t(){const d=e.querySelector("#rating-sort-select");d&&d.addEventListener("change",c=>{w=c.target.value,m=1,R()})}$t(),C(),C();const V=e.querySelector("#submit-rating-form"),O=e.querySelector("#rating-form-error"),j=V.querySelector('button[type="submit"]');j.disabled=!0,V.onsubmit=async d=>{var c;d.preventDefault(),O.textContent="",O.className="mt-1 text-red-400 text-xs min-h-[20px] bg-red-900/30 rounded py-1.5 px-2 border border-red-900/20";try{const p=new FormData(V),g=(p.get("nickname")||"").trim(),h=p.get("rating"),x=(p.get("comment")||"").trim(),P=(c=document.querySelector('[name="cf-turnstile-response"]'))==null?void 0:c.value;if(!P)throw new Error("Please complete the CAPTCHA verification");if(!_t(k)){const qt=`rating_submission_${k}`,Pt=parseInt(localStorage.getItem(qt)||"0",10),Bt=Date.now(),Rt=60*60*1e3,ut=Math.ceil((Pt+Rt-Bt)/6e4);throw new Error(`You can only submit one review per hour. Please try again in ${ut} minute${ut!==1?"s":""}.`)}if(!g)throw new Error("Please enter a nickname");if(!h||isNaN(h)||h<1||h>5)throw new Error("Please select a valid rating between 1 and 5");if(!x||x.split(/\s+/).length<3)throw new Error("Please enter a message with at least 3 words");j.disabled=!0,j.innerHTML='<i class="fas fa-spinner fa-spin mr-2"></i> Submitting...',O.classList.add("hidden");const y=await Nt();jt(k);const F={source:k,nickname:g,rating:Number(h),message:x,ipHash:y,turnstileResponse:P||""},dt=await fetch(mt,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(F)}),Mt=await dt.json();if(!dt.ok)throw new Error(Mt.error||"Failed to submit rating");showNotification("Rating submitted successfully! It will be visible after moderation.","success"),setTimeout(l,1500),V.reset(),window.turnstile&&window.turnstile.reset()}catch(p){console.error("Error submitting rating:",p),O.textContent=p.message||"Failed to submit rating. Please try again.",O.classList.remove("hidden"),window.turnstile&&window.turnstile.reset()}finally{j&&(j.disabled=!1,j.innerHTML='<i class="fas fa-paper-plane mr-2"></i> Submit Review')}}}document.body.classList.add("preloading");document.addEventListener("DOMContentLoaded",async()=>{await Dt.initialize()});function Ot(){const t=document.getElementById("preloader"),e=t.querySelector(".loading-progress"),s=t.querySelector(".loading-percentage");let n=0;const a=()=>{const i=100-n,o=Math.min(i*.1,Math.max(.2,Math.random()*.8));n=Math.min(100,n+o),e.style.width=`${n}%`;const r=n<100?n.toFixed(1):Math.round(n);s.textContent=`${r}%`,n<30?s.className="loading-percentage text-sm font-medium text-white/70":n<60?s.className="loading-percentage text-sm font-medium text-emerald-400/70":s.className="loading-percentage text-sm font-medium text-emerald-400",n<100?requestAnimationFrame(a):setTimeout(()=>{t.classList.add("hiding"),t.addEventListener("transitionend",()=>{t.remove(),document.body.classList.remove("preloading"),b.updatePageContent(),et()},{once:!0})},1e3)};setTimeout(()=>{t&&document.body.contains(t)&&(console.log("Preloader safety timeout triggered"),t.classList.add("hiding"),setTimeout(()=>{t.remove(),document.body.classList.remove("preloading"),b.updatePageContent(),et()},400))},5e3),setTimeout(()=>{requestAnimationFrame(a)},300)}function et(){const t=document.getElementById("language-switcher"),e=document.getElementById("language-dropdown");if(!t||!e)return;const s=t.cloneNode(!0);t.parentNode.replaceChild(s,t);const n=b.getCurrentLocale(),a=s.querySelector("span");if(a){const r={en:"English",ru:"Русский","pt-br":"Português"};a.textContent=r[n]||"English"}s.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),e.classList.contains("hidden")?(e.classList.remove("hidden"),s.classList.add("bg-white/10")):(e.classList.add("hidden"),s.classList.remove("bg-white/10"))}),e.querySelectorAll("button").forEach(r=>{r.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation();const l=r.dataset.lang;if(b.setLocale(l),e.classList.add("hidden"),s.classList.remove("bg-white/10"),a){const f={en:"English",ru:"Русский","pt-br":"Português"};a.textContent=f[l]||"English"}q()})}),document.addEventListener("click",r=>{s.contains(r.target)||(e.classList.add("hidden"),s.classList.remove("bg-white/10"))});const o=()=>{const r=t.querySelector("span"),u={en:"English",ru:"Русский","pt-br":"Português"};r.textContent=u[b.currentLocale]||"English"};document.addEventListener("languageChanged",o)}document.addEventListener("DOMContentLoaded",()=>{try{Ot()}catch(i){console.error("Error initializing preloader:",i);const o=document.getElementById("preloader");o&&o.remove(),document.body.classList.remove("preloading"),b.updatePageContent(),et()}ae();const t=document.getElementById("accept-cookies"),e=document.getElementById("reject-cookies"),s=document.getElementById("cookie-consent");t&&t.addEventListener("click",()=>{n(),tt("cookie-consent","accepted",365)}),e&&e.addEventListener("click",()=>{n(),tt("cookie-consent","rejected",365)});function n(){s.classList.add("translate-y-full"),s.addEventListener("transitionend",()=>{s.style.display="none"},{once:!0})}wt(),setTimeout(()=>{Lt()},300),oe(),ie(),le(),st(),Yt(),initializeMobileFilters();let a;window.addEventListener("resize",()=>{clearTimeout(a),a=setTimeout(()=>{st()},100)})});function wt(){try{console.log("Initializing sorting..."),document.querySelectorAll(".sort-option").forEach(e=>{e.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation();const n=e.getAttribute("data-sort");if(console.log("Sort option clicked:",n),n){nt(n);const a=document.getElementById("mobile-filters");a&&!a.classList.contains("hidden")&&(a.classList.add("hidden"),document.body.style.overflow="auto"),q()}})});const t=localStorage.getItem("currentSort")||"hot";console.log("Initial sort type:",t),nt(t),console.log("Sorting initialized with type:",t)}catch(t){console.error("Error initializing sorting:",t)}}let v=[],N="",D=null,T=1;const U={mobile:4,tablet:6,desktop:9,wide:15},H=document.getElementById("about-modal"),zt=document.getElementById("about-btn"),St=document.getElementById("close-about"),_=document.getElementById("suggest-modal"),Gt=document.getElementById("suggest-btn"),Jt=document.getElementById("close-suggest"),Z=24*60*60*1e3;document.getElementById("mobile-filters-btn");document.getElementById("mobile-filters-modal");document.getElementById("close-mobile-filters");document.getElementById("mobile-filters-content");document.getElementById("reset-filters");document.getElementById("apply-filters");const W=document.getElementById("active-filters-count"),Vt={tablet:768};function st(){var n;const t=document.getElementById("filters-sidebar"),e=(n=document.getElementById("mobile-filters-btn"))==null?void 0:n.parentElement;if(!t||!e)return;const s=window.innerWidth<Vt.tablet;t.classList.toggle("hidden",s),e.classList.toggle("hidden",!s)}function Yt(){const t=document.getElementById("mobile-filters-btn"),e=document.getElementById("mobile-filters-modal"),s=e==null?void 0:e.querySelector(".flex.flex-col.bg-\\[\\#111\\]"),n=e==null?void 0:e.querySelector(".bg-\\[\\#0A0A0A\\]");if(!t||!e||!s||!n)return;function a(){e.classList.remove("hidden"),e.offsetHeight,n.classList.add("opacity-100"),s.classList.remove("translate-y-full"),document.body.classList.add("overflow-hidden")}function i(){n.classList.remove("opacity-100"),s.classList.add("translate-y-full"),setTimeout(()=>{e.classList.add("hidden"),document.body.classList.remove("overflow-hidden")},300)}t.addEventListener("click",l=>{l.preventDefault(),a()});const o=document.getElementById("close-mobile-filters");o&&o.addEventListener("click",l=>{l.preventDefault(),i()}),e.addEventListener("click",l=>{l.target===e&&i()}),document.addEventListener("keydown",l=>{l.key==="Escape"&&!e.classList.contains("hidden")&&i()});const r=document.getElementById("reset-filters");r&&r.addEventListener("click",l=>{l.preventDefault(),Kt(),Et()});const u=document.getElementById("apply-filters");u&&u.addEventListener("click",l=>{l.preventDefault(),i(),q()})}function Et(){const t=Wt();W&&(t>0?(W.textContent=`${t} active`,W.classList.remove("hidden")):W.classList.add("hidden"))}function Wt(){let t=0;return N&&t++,D&&t++,localStorage.getItem("currentSort")&&t++,t}function Kt(){N="",D=null,localStorage.removeItem("currentSort"),document.querySelectorAll(".status-filter-btn div").forEach(t=>{t.classList.remove("bg-black/40")}),document.querySelectorAll(".games-filter-btn div").forEach(t=>{t.classList.remove("border-emerald-500/20","bg-black/40"),t.classList.add("border-white/5","bg-black/20")}),document.querySelectorAll(".sort-option").forEach(t=>{t.classList.remove("bg-white/10","text-white"),t.classList.add("text-white/70")}),q()}async function Lt(){try{v=(await(await fetch("data/resources.json")).json()).sources;const s="hydra_ratings_cache",n=5*60*1e3,a=()=>{try{const r=localStorage.getItem(s);if(!r)return null;const{timestamp:u,data:l}=JSON.parse(r);if(Date.now()-u<n)return l}catch(r){console.error("Error reading from cache:",r)}return null},i=r=>{try{localStorage.setItem(s,JSON.stringify({timestamp:Date.now(),data:r}))}catch(u){console.error("Error saving to cache:",u)}},o=a();if(o){console.log("Using cached ratings data"),v.forEach(r=>{const u=o[r.title]||{avg:0,total:0};r.rating={avg:parseFloat(u.avg)||0,total:parseInt(u.total)||0}});return}console.log("Fetching fresh ratings data...");try{const r=[...new Set(v.map(m=>m.title))];console.log(`Fetching ratings for ${r.length} sources`);const u=`https://libraryratingsdb.zxcsixx.workers.dev/api/ratings?batch=true&sources=${r.map(encodeURIComponent).join(",")}`;console.log("Batch API URL:",u);const l=await fetch(u);if(console.log("Batch response status:",l.status),!l.ok)throw new Error(`HTTP error! status: ${l.status}`);const f=await l.json();console.log("Received batch ratings data"),i(f),v.forEach(m=>{const w=f[m.title]||{avg:0,total:0};m.rating={avg:parseFloat(w.avg)||0,total:parseInt(w.total)||0}}),console.log("All ratings loaded via batch endpoint")}catch(r){console.error("Error in batch ratings fetch:",r),v.forEach(u=>{u.rating={avg:0,total:0}})}wt(),q(),Zt()}catch(t){console.error("Error loading sources:",t);const e=document.getElementById("sources-container");e&&(e.innerHTML=`
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
            `)}finally{setTimeout(()=>{const t=document.getElementById("preloader");t&&(t.style.opacity="0",setTimeout(()=>{t.style.display="none",q()},300))},500)}}async function Zt(){try{const t=new Promise((i,o)=>setTimeout(()=>o(new Error("Firebase request timed out")),5e3)),e=rt(ot,"sources"),s=it(e),a=(await Promise.race([s,t])).val();if(a){v=v.map(i=>{var m;const o=i.url.replace(/[^a-zA-Z0-9]/g,"_"),r=((m=a[o])==null?void 0:m.stats)||{installs:0,copies:0,activity:[]},u=Array.isArray(r.activity)?r.activity:[],l=Date.now(),f=u.filter(w=>l-w<Z).length;return{...i,stats:{...r,recentActivity:f,activity:u}}}),v.forEach(i=>{ct(i.url,i.stats)});try{localStorage.setItem("sourceStats",JSON.stringify(a)),localStorage.setItem("statsLastUpdated",Date.now().toString())}catch{}return!0}return!1}catch{try{const e=localStorage.getItem("sourceStats");if(e){const s=JSON.parse(e);v=v.map(n=>{var l;const a=n.url.replace(/[^a-zA-Z0-9]/g,"_"),i=((l=s[a])==null?void 0:l.stats)||{installs:0,copies:0,activity:[]},o=Array.isArray(i.activity)?i.activity:[],r=Date.now(),u=o.filter(f=>r-f<Z).length;return{...n,stats:{...i,recentActivity:u,activity:o}}});try{const n=v.map(i=>encodeURIComponent(i.title)).join(","),a=await fetch(`https://libraryratingsdb.zxcsixx.workers.dev/api/ratings?batch=true&sources=${n}`);if(a.ok){const i=await a.json();v.forEach(o=>{const r=i[o.title]||{avg:0,total:0};ratingsMap[o.title]={avg:parseFloat(r.avg)||0,total:parseInt(r.total)||0}})}else throw new Error("Failed to fetch batch ratings")}catch(n){console.error("Error fetching batch ratings:",n),await Promise.all(v.map(async a=>{try{const o=await(await fetch(`https://libraryratingsdb.zxcsixx.workers.dev/api/ratings?source=${encodeURIComponent(a.title)}&page=1`)).json();ratingsMap[a.title]={avg:typeof o.avg=="number"?o.avg:0,total:typeof o.total=="number"?o.total:0}}catch(i){console.error(`Error fetching rating for ${a.title}:`,i),ratingsMap[a.title]={avg:0,total:0}}}))}return console.log("Using cached stats from localStorage"),!0}}catch{}return v=v.map(e=>({...e,stats:{installs:0,copies:0,recentActivity:0,activity:[]}})),!1}}function ft(t){document.querySelector("main").classList.add("blur-sm","transition-all","duration-200");const e=b.t.bind(b),s=document.createElement("div");s.className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in p-4",s.innerHTML=`
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
    `,document.body.appendChild(s);const n=()=>{document.querySelector("main").classList.remove("blur-sm"),s.remove()};s.querySelector(".cancel-btn").addEventListener("click",()=>{n(),t(!1)}),s.querySelector(".proceed-btn").addEventListener("click",()=>{n(),t(!0)}),s.querySelector(".fixed.inset-0").addEventListener("click",a=>{a.target===a.currentTarget&&(n(),t(!1))})}function pt(t){document.querySelector("main").classList.add("blur-sm","transition-all","duration-200");const e=b.t.bind(b),s=document.createElement("div");s.className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in p-4",s.innerHTML=`
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
    `,document.body.appendChild(s);const n=()=>{document.querySelector("main").classList.remove("blur-sm"),s.remove()};s.querySelector(".cancel-btn").addEventListener("click",()=>{n(),t(!1)}),s.querySelector(".proceed-btn").addEventListener("click",()=>{n(),t(!0)}),s.querySelector(".fixed.inset-0").addEventListener("click",a=>{a.target===a.currentTarget&&(n(),t(!1))})}function Qt(t){var w,S,E,L,k;const e=b.getCurrentLocale(),n=(((w=b.translations[e])==null?void 0:w.sources)||{})[t.title]||{title:t.title,description:t.description},a=t.status.includes("Use At Your Own Risk"),i=t.stats||{installs:0,copies:0,recentActivity:0},o=parseInt(i.recentActivity||0),r=document.createElement("div");r.className="source-card animate-fade-in rounded-xl",r.dataset.url=t.url,r.dataset.name=t.title,r.dataset.copies=((S=t.stats)==null?void 0:S.copies)||0,r.dataset.installs=((E=t.stats)==null?void 0:E.installs)||0,r.dataset.activity=((L=t.stats)==null?void 0:L.recentActivity)||0;const u=t.status.map($=>{const M=$.toLowerCase().replace(/\s+/g,"-"),C={trusted:{color:"emerald",icon:"shield",key:"trusted",customClass:"bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/30 "},"safe-for-use":{color:"blue",icon:"check-circle",key:"safeForUse",customClass:"bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/30"},"use-at-your-own-risk":{color:"red",icon:"exclamation-triangle",key:"useAtOwnRisk",customClass:"bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/30 "},"works-in-russia":{color:"teal",icon:"globe-europe",key:"worksInRussia",customClass:"bg-teal-500/10 border-teal-500/20 text-teal-400 hover:bg-teal-500/20 hover:border-teal-500/30 "},nsfw:{color:"purple",icon:"exclamation-circle",key:"nsfw",customClass:"bg-purple-500/10 border-purple-500/20 text-purple-400 hover:bg-purple-500/20 hover:border-purple-500/30 "}}[M]||{color:"gray",icon:"circle",key:M},A=`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs backdrop-blur-sm status-badge ${C.customClass||""}`,G=`bg-${C.color}-500/10 border border-${C.color}-500/20 text-${C.color}-400`,B=b.t(`status.${C.key}`);return`
            <span class="${C.customClass?A:`${A} ${G}`}">
                <i class="fas fa-${C.icon} text-[10px]"></i>
                ${B}
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
                            <span class="whitespace-nowrap">${ne(t.addedDate)}</span>
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
                            <span class="flex items-center gap-1.5 ${o>0?"text-red-400":""}
                                       transition-colors duration-300">
                                <i class="fas fa-fire text-[10px]"></i>
                                ${o}
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
                        ${b.t("common.install")}
                    </button>
                    <button class="copy-btn shrink-0 bg-white/5 hover:bg-white/10 text-white/70 
                                 border border-white/10 rounded-lg px-4 py-2 text-sm
                                 transition-all duration-200 flex items-center justify-center gap-2
                                 hover:scale-[1.02] backdrop-blur-sm" data-url="${t.url}">
                        <i class="fas fa-copy text-[10px]"></i>
                        ${b.t("common.copy")}
                    </button>
                </div>
            </div>
        </div>
    `;const l=(k=r.querySelector("[data-rating-stars-container]"))==null?void 0:k.parentElement;l&&(l.addEventListener("click",$=>{$.stopPropagation(),Ut(t)}),At(r,t.rating));const f=r.querySelector(".install-btn"),m=r.querySelector(".copy-btn");return m&&m.addEventListener("click",async()=>{const $=async()=>{await xt(t.url,"copy")&&(navigator.clipboard.writeText(t.url),m.innerHTML='<i class="fas fa-check text-[10px]"></i> '+b.t("sourceCard.copied"),setTimeout(()=>{m.innerHTML='<i class="fas fa-copy text-[10px]"></i> '+b.t("sourceCard.copy")},2e3))},M=t.title==="CPGRepacks";a||M?(M?pt:ft)(A=>{A&&$()}):$()}),f&&f.addEventListener("click",async()=>{const $=async()=>{yt(f,"loading");const C=await xt(t.url,"install");if(yt(f,C?"success":"rate-limited"),C){const A=encodeURIComponent(t.url);window.location.href=`hydralauncher://install-source?urls=${A}`}},M=t.title==="CPGRepacks";t.status.includes("Use At Your Own Risk")||M?(M?pt:ft)(A=>{A&&$()}):$()}),ct(t.url,t.stats),r.dataset.copies=i.copies||0,r.dataset.installs=i.installs||0,r.dataset.activity=o,r}let K="wide";function Ct(){const t=window.innerWidth;return t>=1536?"wide":t>=1024?"desktop":t>=640?"tablet":"mobile"}let ht;window.addEventListener("resize",()=>{clearTimeout(ht),ht=setTimeout(()=>{st();const t=Ct();if(K!==t){const s=lt(),n=Q(),a=Math.ceil(s.length/n);if(K==="wide"&&t==="desktop"){const i=(T-1)*U.desktop;T=Math.floor(i/U.desktop)+1}K=t,T=Math.min(Math.max(1,T),a),q(s),n<Q()&&window.scrollTo({top:0,behavior:"smooth"})}},100)});function vt(t,e){return console.log(`Sorting sources by: ${e}`),[...t].sort((s,n)=>{var a,i,o,r,u,l,f,m,w,S,E,L;try{switch(e){case"hot":const k=((a=s.stats)==null?void 0:a.recentActivity)||0;return(((i=n.stats)==null?void 0:i.recentActivity)||0)-k;case"new":return new Date(n.addedDate||0)-new Date(s.addedDate||0);case"most-copies":const M=((o=s.stats)==null?void 0:o.copies)||0;return(((r=n.stats)==null?void 0:r.copies)||0)-M;case"most-installs":const A=((u=s.stats)==null?void 0:u.installs)||0;return(((l=n.stats)==null?void 0:l.installs)||0)-A;case"top-rated":console.log(`Comparing ratings: ${s.title} (${((f=s.rating)==null?void 0:f.avg)||0}) vs ${n.title} (${((m=n.rating)==null?void 0:m.avg)||0})`),console.log(`Full rating data for ${s.title}:`,s.rating),console.log(`Full rating data for ${n.title}:`,n.rating);const B=((w=s.rating)==null?void 0:w.avg)||0,R=((S=n.rating)==null?void 0:S.avg)||0;if(B===R){const I=((E=s.rating)==null?void 0:E.total)||0,J=((L=n.rating)==null?void 0:L.total)||0;return console.log(`Ratings equal (${B}), comparing counts: ${I} vs ${J}`),J-I}return console.log(`Sorting by rating: ${R} - ${B} = ${R-B}`),R-B;case"name-asc":return(s.title||"").localeCompare(n.title||"");case"name-desc":return(n.title||"").localeCompare(s.title||"");default:return 0}}catch(k){return console.error("Error in sort function:",k),console.error("Sort type:",e),console.error("Source A:",s),console.error("Source B:",n),0}})}function nt(t){var e;try{console.log("Updating active sort UI for:",t);const s=document.querySelector(".mobile-sort-button span");if(s){const a=((e=document.querySelector(`.sort-option[data-sort="${t}"]`))==null?void 0:e.textContent)||"Sort";s.textContent=a}document.querySelectorAll(".sort-option").forEach(a=>{const i=a.getAttribute("data-sort")===t;a.classList.toggle("bg-white/10",i),a.classList.toggle("text-white",i),a.classList.toggle("text-white/70",!i);const o=a.querySelector("i.fa-check");o&&(o.style.opacity=i?"1":"0")});const n=document.getElementById("sort-dropdown");n&&!n.classList.contains("hidden")&&n.classList.add("hidden"),localStorage.setItem("currentSort",t)}catch(s){console.error("Error updating sort UI:",s)}}function q(t=null){const e=document.getElementById("sources-container");if(e){e.innerHTML="";try{let s=t||lt();console.log(`Displaying ${s.length} filtered sources`);const n=localStorage.getItem("currentSort")||"hot";if(console.log("Current sort type:",n),n){console.log("Before sorting - first few sources:",s.slice(0,3).map(l=>{var f,m;return{title:l.title,rating:l.rating,hasRating:!!((f=l.rating)!=null&&f.avg||(m=l.rating)!=null&&m.total)}}));try{s=vt(s,n),console.log("After sorting - first few sources:",s.slice(0,3).map(l=>{var f,m;return{title:l.title,rating:l.rating,sortKey:n==="top-rated"?`${((f=l.rating)==null?void 0:f.avg)||0} (${((m=l.rating)==null?void 0:m.total)||0} ratings)`:l[n]||"N/A"}})),nt(n)}catch(l){console.error("Error during sorting:",l),s=vt(s,"hot")}}K=Ct();const a=Q(),i=Math.ceil(s.length/a);T=Math.min(Math.max(1,T),i);const o=(T-1)*a,r=Math.min(o+a,s.length);s.slice(o,r).forEach(l=>{const f=Qt(l);e.appendChild(f)}),Xt(i),b.updatePageContent()}catch(s){console.error("Error in displaySources:",s),e.innerHTML=`
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
        `}}}function Q(){const t=window.innerWidth;return t>=2560?U.wide:t>=1024?U.desktop:t>=640?U.tablet:U.mobile}function Xt(t){const e=document.getElementById("pagination");if(!e)return;let s="";s+=`
        <button onclick="changePage(${T-1})" 
                class="px-2 py-1.5 text-sm text-white/50 hover:text-white disabled:opacity-50 
                       transition-colors duration-200 rounded-md hover:bg-white/5"
                ${T===1?"disabled":""}>
            <i class="fas fa-chevron-left"></i>
        </button>
    `;for(let n=1;n<=t;n++)n===T?s+=`
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
        <button onclick="changePage(${T+1})" 
                class="px-2 py-1.5 text-sm text-white/50 hover:text-white disabled:opacity-50 
                       transition-colors duration-200 rounded-md hover:bg-white/5"
                ${T===t?"disabled":""}>
            <i class="fas fa-chevron-right"></i>
        </button>
    `,e.innerHTML=s}window.changePage=function(t){if(t<1)return;const e=lt(),s=Math.ceil(e.length/Q());t>s||(T=t,q(e),window.scrollTo({top:0,behavior:"smooth"}))};document.querySelectorAll(".status-filter-btn").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.status;document.querySelectorAll(".status-filter-btn").forEach(s=>{s.querySelector("div").classList.remove("bg-black/40")}),N===e?N="":(N=e,t.querySelector("div").classList.add("bg-black/40")),T=1,q(),kt(),dispatchFiltersChanged()})});document.querySelectorAll(".games-filter-btn").forEach(t=>{t.addEventListener("click",()=>{const e=parseInt(t.dataset.min),s=parseInt(t.dataset.max);if(document.querySelectorAll(".games-filter-btn div").forEach(n=>{n.classList.remove("border-emerald-500/20","bg-black/40"),n.classList.add("border-white/5","bg-black/20")}),D&&D.min===e&&D.max===s)D=null;else{D={min:e,max:s};const n=t.querySelector("div");n.classList.remove("border-white/5","bg-black/20"),n.classList.add("border-emerald-500/20","bg-black/40")}T=1,q(),kt(),Et(),dispatchFiltersChanged()})});function kt(){const t={};v.forEach(e=>{e.status.forEach(s=>{t[s]=(t[s]||0)+1})}),document.querySelectorAll(".status-filter-btn").forEach(e=>{const s=e.dataset.status,n=e.querySelector(".text-white\\/40");n&&(n.textContent=t[s]||0)}),document.querySelectorAll(".games-filter-btn").forEach(e=>{const s=parseInt(e.dataset.min),n=parseInt(e.dataset.max),a=v.filter(r=>{const u=parseInt(r.gamesCount);return u>=s&&u<=n}).length,i=e.querySelector(".text-white\\/40");i&&(i.textContent=a);const o=e.querySelector(".bg-emerald-500\\/50");if(o){const r=Math.max(...Array.from(document.querySelectorAll(".games-filter-btn")).map(l=>{const f=parseInt(l.dataset.min),m=parseInt(l.dataset.max);return v.filter(w=>{const S=parseInt(w.gamesCount);return S>=f&&S<=m}).length})),u=r>0?a/r*100:0;o.style.width=`${u}%`}})}let z="";document.getElementById("search").addEventListener("input",t=>{z=t.target.value.toLowerCase(),T=1,q()});function lt(){return v.filter(t=>{const e=!z||t.title.toLowerCase().includes(z)||t.description.toLowerCase().includes(z)||t.url.toLowerCase().includes(z),s=!N||t.status.includes(N),n=parseInt(t.gamesCount),a=!D||n>=D.min&&n<=D.max;return e&&s&&a})}const It=document.getElementById("sort-dropdown-btn"),X=document.getElementById("sort-dropdown"),te=document.getElementById("current-sort");It.addEventListener("click",()=>{X.classList.toggle("hidden")});document.addEventListener("click",t=>{!It.contains(t.target)&&!X.contains(t.target)&&X.classList.add("hidden")});document.querySelectorAll(".sort-option").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.sort;switch(te.textContent=t.textContent.trim(),X.classList.add("hidden"),e){case"high-to-low":sortGamesFilters(!1);break;case"low-to-high":sortGamesFilters(!0);break;case"most-sources":ee();break;case"most-popular":se();break}})});function ee(){const t=document.querySelector(".games-filter-btn").parentNode,e=Array.from(t.querySelectorAll(".games-filter-btn"));e.sort((s,n)=>{const a=parseInt(s.querySelector(".text-white\\/40").textContent);return parseInt(n.querySelector(".text-white\\/40").textContent)-a}),e.forEach(s=>s.remove()),e.forEach(s=>t.appendChild(s))}function se(){const t=JSON.parse(localStorage.getItem("sourceStats")||"{}"),e=document.querySelector(".games-filter-btn").parentNode,s=Array.from(e.querySelectorAll(".games-filter-btn"));s.sort((n,a)=>{var m,w;const i=((m=v.find(S=>S.gamesCount===n.dataset.min))==null?void 0:m.url)||"",o=((w=v.find(S=>S.gamesCount===a.dataset.min))==null?void 0:w.url)||"",r=t[i]||{installs:0,copies:0},u=t[o]||{installs:0,copies:0},l=r.installs+r.copies;return u.installs+u.copies-l}),s.forEach(n=>n.remove()),s.forEach(n=>e.appendChild(n))}function ne(t){const e=new Date(t),n=Math.abs(new Date-e),a=Math.floor(n/(1e3*60*60*24)),i=b.t.bind(b);if(a===0)return i("common.date.today");if(a===1)return i("common.date.yesterday");if(a<30)return i("common.date.daysAgo",{days:a});{const o={year:"numeric",month:"short",day:"numeric"};return e.toLocaleDateString(b.getCurrentLocale(),o)}}document.addEventListener("DOMContentLoaded",()=>{Lt(),sortGamesFilters(!1)});zt.addEventListener("click",()=>{H.classList.remove("hidden"),document.body.style.overflow="hidden"});St.addEventListener("click",()=>{H.classList.add("hidden"),document.body.style.overflow=""});H.addEventListener("click",t=>{t.target===H&&St.click()});document.addEventListener("keydown",t=>{t.key==="Escape"&&!H.classList.contains("hidden")&&(H.classList.add("hidden"),document.body.style.overflow="")});Gt.addEventListener("click",()=>{_.classList.remove("hidden"),document.body.style.overflow="hidden"});Jt.addEventListener("click",()=>{_.classList.add("hidden"),document.body.style.overflow=""});_.addEventListener("click",t=>{t.target===_&&(_.classList.add("hidden"),document.body.style.overflow="")});document.addEventListener("keydown",t=>{t.key==="Escape"&&(H.classList.contains("hidden")||(H.classList.add("hidden"),document.body.style.overflow=""),_.classList.contains("hidden")||(_.classList.add("hidden"),document.body.style.overflow=""))});function tt(t,e,s){const n=new Date;n.setTime(n.getTime()+s*24*60*60*1e3),document.cookie=`${t}=${e};expires=${n.toUTCString()};path=/`}function Tt(t){const e=t+"=",s=document.cookie.split(";");for(let n=0;n<s.length;n++){let a=s[n];for(;a.charAt(0)===" ";)a=a.substring(1,a.length);if(a.indexOf(e)===0)return a.substring(e.length,a.length)}return null}async function xt(t,e){try{const s=t.replace(/[^a-zA-Z0-9]/g,"_"),n=`${e}_${s}`;if(Tt(n))return!0;let a={installs:0,copies:0,activity:[],recentActivity:0};try{const o=new Promise((E,L)=>setTimeout(()=>L(new Error("Firebase request timed out")),3e3)),r=rt(ot,`sources/${s}/stats`),u=it(r),f=(await Promise.race([u,o])).val()||{installs:0,copies:0,activity:[]},m=Date.now(),S=(Array.isArray(f.activity)?f.activity:[]).filter(E=>m-E<Z);S.push(m),a={installs:parseInt(f.installs||0)+(e==="install"?1:0),copies:parseInt(f.copies||0)+(e==="copy"?1:0),activity:S,recentActivity:S.length,lastUpdated:m},await Promise.race([bt(r,a),new Promise((E,L)=>setTimeout(()=>L(new Error("Update timed out")),3e3))]);try{const E=localStorage.getItem("sourceStats");if(E){const L=JSON.parse(E);L[s]||(L[s]={}),L[s].stats=a,localStorage.setItem("sourceStats",JSON.stringify(L)),localStorage.setItem("statsLastUpdated",m.toString())}}catch{}}catch{console.log("Firebase update failed, continuing with local data");const r=v.find(u=>u.url===t);if(r&&r.stats){a={installs:parseInt(r.stats.installs||0)+(e==="install"?1:0),copies:parseInt(r.stats.copies||0)+(e==="copy"?1:0),activity:[],recentActivity:1,lastUpdated:Date.now()};try{const u=localStorage.getItem("sourceStats");if(u){const l=JSON.parse(u);l[s]||(l[s]={}),l[s].stats=a,localStorage.setItem("sourceStats",JSON.stringify(l)),localStorage.setItem("statsLastUpdated",Date.now().toString())}}catch{}}}tt(n,"true",e==="install"?.003472222:347222e-9),ct(t,a);const i=v.findIndex(o=>o.url===t);return i!==-1&&(v[i].stats=a),!0}catch{return!1}}function ct(t,e=null){const s=document.querySelectorAll(".source-card"),n=Array.from(s).find(a=>a.dataset.url===t);if(n){const a=n.querySelector(".source-stats");if(a){const i=parseInt((e==null?void 0:e.installs)||0),o=parseInt((e==null?void 0:e.copies)||0),r=parseInt((e==null?void 0:e.recentActivity)||0);a.innerHTML=`
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
                    ${o}
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
            `,setTimeout(()=>{t.disabled=!1,t.innerHTML=s},2e3);break;default:t.disabled=!1,t.innerHTML=s}}function ae(){const t=document.getElementById("cookie-consent");Tt("cookie-consent")?t.style.display="none":(t.style.display="block",setTimeout(()=>{t.classList.remove("translate-y-full")},500))}document.getElementById("accept-cookies").addEventListener("click",()=>{const t=document.getElementById("cookie-consent");t.classList.add("translate-y-full"),t.addEventListener("transitionend",()=>{t.style.display="none"},{once:!0}),tt("cookie-consent","accepted",365)});async function re(t){try{const e=rt(ot,`sources/${t}/stats`),n=(await it(e)).val();if(n&&n.activity){const a=n.activity.filter(i=>Date.now()-i<Z);a.length!==n.activity.length&&await bt(e,{activity:a})}}catch{}}function oe(){const t=document.getElementById("suggest-modal"),e=document.getElementById("suggest-btn"),s=document.getElementById("close-suggest");e&&e.addEventListener("click",()=>{t.classList.remove("hidden")}),s&&s.addEventListener("click",()=>{t.classList.add("hidden")}),t&&t.addEventListener("click",n=>{n.target===t&&t.classList.add("hidden")})}function ie(){const t=document.getElementById("search");if(t){const e=()=>{const n=window.innerWidth<640?"header.searchMobile":"header.search";t.placeholder=b.t(n)};e(),window.addEventListener("resize",e),document.addEventListener("languageChanged",e)}}function le(){setInterval(()=>{v.forEach(t=>{const e=t.url.replace(/[^a-zA-Z0-9]/g,"_");re(e)})},60*60*1e3)}async function ce(t){const e=v.find(s=>s.title===t);if(e&&e.rating){const s={avg:parseFloat(e.rating.avg||0),total:parseInt(e.rating.total||0)};return at(t,s),!0}return de()}async function de(){if(!v||v.length===0)return!1;const t="hydra_ratings_cache",e=5*60*1e3,s=()=>{try{const o=localStorage.getItem(t);if(!o)return null;const{timestamp:r,data:u}=JSON.parse(o);if(Date.now()-r<e)return u}catch(o){console.error("Error reading from cache:",o)}return null},n=o=>{try{localStorage.setItem(t,JSON.stringify({timestamp:Date.now(),data:o}))}catch(r){console.error("Error saving to cache:",r)}},a=s();if(a)return console.log("Using cached ratings data"),v.forEach(o=>{const r=a[o.title]||{avg:0,total:0};o.rating={avg:parseFloat(r.avg)||0,total:parseInt(r.total)||0},at(o.title,o.rating)}),!0;console.log("Fetching fresh ratings data...");const i=[...new Set(v.map(o=>o.title))];if(i.length===0)return!1;try{const o="https://libraryratingsdb.zxcsixx.workers.dev/api/ratings/batch";console.log("Making batch API request to:",o);const r=await fetch(o,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({sources:i,fields:["avg","total"]})});if(console.log("Batch response status:",r.status),!r.ok)return console.error("Failed to fetch batch ratings:",r.status,r.statusText),!1;const u=await r.json();return console.log("Received batch ratings data for",Object.keys(u).length,"sources"),n(u),v.forEach(l=>{const f=u[l.title]||{avg:0,total:0};l.rating={avg:parseFloat(f.avg)||0,total:parseInt(f.total)||0},at(l.title,l.rating)}),!0}catch(o){return console.error("Error in updateAllSourceRatings:",o),!1}}function at(t,e){document.querySelectorAll(".source-card").forEach(n=>{n.dataset.name===t&&At(n,e)})}function At(t,e){console.log("Updating card rating display for:",t.dataset.name,"with data:",JSON.stringify(e,null,2));const s=t.querySelector("[data-rating-stars-active]"),n=t.querySelector("[data-rating-avg]"),a=t.querySelector("[data-rating-total]"),i=t.querySelector("[data-rating-comment]");if(console.log("Found elements:",{starsActive:!!s,avgEl:!!n,totalEl:!!a,commentEl:!!i}),s&&n&&a)if(e&&(typeof e.avg=="number"||e.avg===0)){const o=e.avg/5*100,r=Math.round(o/10)*10;console.log(`Setting rating: avg=${e.avg}, total=${e.total}, starPercentage=${o}%, rounded=${r}%`),s.style.width=`${r}%`,n.textContent=e.avg>0?e.avg.toFixed(1):"–",a.textContent=e.total>0?`(${e.total})`:"",i&&(i.style.display=e.total>0?"inline-block":"none",console.log(`Comment icon display set to: ${i.style.display}`))}else console.log("No valid rating data, setting default state"),s.style.width="0%",n.textContent="–",a.textContent="",i&&(i.style.display="none");else console.error("Missing required rating elements on card:",{starsActive:!!s,avgEl:!!n,totalEl:!!a})}window.updateSourceCardRating=ce;document.addEventListener("languageChanged",()=>{q()});
