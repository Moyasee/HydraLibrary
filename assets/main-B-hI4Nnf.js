import{c as Nt,i as w,r as ot,d as it,g as lt,u as wt}from"./index-DklScFds.js";const gt="https://libraryratingsdb.zxcsixx.workers.dev/api/ratings",Ht=5*60*1e3,ft={data:{},lastUpdated:{},get:function(t){const e=this.data[t],n=this.lastUpdated[t];return e&&n&&Date.now()-n<Ht?Promise.resolve(e):null},set:function(t,e){return this.data[t]=e,this.lastUpdated[t]=Date.now(),e},batchGet:function(t){const e={cached:{},uncached:[]};return t.forEach(n=>{const s=this.get(n);s?e.cached[n]=s:e.uncached.push(n)}),e},batchSet:function(t){Object.entries(t).forEach(([e,n])=>{this.set(e,n)})}};function _t(t){const e=new Date(t),s=Math.floor((new Date-e)/1e3);let a=Math.floor(s/31536e3);return a>=1?a+" year"+(a===1?"":"s")+" ago":(a=Math.floor(s/2592e3),a>=1?a+" month"+(a===1?"":"s")+" ago":(a=Math.floor(s/86400),a>=1?a+" day"+(a===1?"":"s")+" ago":(a=Math.floor(s/3600),a>=1?a+" hour"+(a===1?"":"s")+" ago":(a=Math.floor(s/60),a>=1?a+" minute"+(a===1?"":"s")+" ago":"just now"))))}function W(t){return String(t).replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}async function jt(){var t;try{const n=[navigator.userAgent,navigator.language,screen.width,screen.height,navigator.platform,new Date().getTimezoneOffset(),!!navigator.cookieEnabled,navigator.hardwareConcurrency||0,navigator.deviceMemory||0,screen.colorDepth,((t=window.screen.orientation)==null?void 0:t.type)||""].join("|"),s=new TextEncoder().encode(n),a=await crypto.subtle.digest("SHA-256",s),o=Array.from(new Uint8Array(a)).map(r=>r.toString(16).padStart(2,"0")).join("");return sessionStorage.setItem("hydra_rating_hash",o),localStorage.getItem("hydra_rating_hash")||localStorage.setItem("hydra_rating_hash",o),o}catch(e){return console.error("Error generating user hash:",e),Math.random().toString(36).slice(2)+Date.now().toString(36)}}function Ut(t){const n=`rating_submission_${t}`,s=localStorage.getItem(n);if(!s)return!0;const a=parseInt(s,10),i=Date.now(),o=60*60*1e3;return i-a>o}function Ot(t){const e=`rating_submission_${t}`;localStorage.setItem(e,Date.now().toString())}function zt(t){document.querySelectorAll(".rating-modal").forEach(l=>l.remove());const e=document.createElement("div");e.className="rating-modal fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4",e.innerHTML=`
    <div class="fixed inset-0 bg-black/90 backdrop-blur-sm animate-fade-in"></div>
    <div class="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-xl max-w-4xl w-full mx-2 sm:mx-4 my-4 max-h-[90vh] sm:max-h-[90vh] flex flex-col shadow-2xl border border-white/5 animate-fade-in transform transition-all duration-300 ease-out overflow-hidden">
      <div class="flex flex-col p-4 sm:p-6 space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex-1 pr-4">
            <h2 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 mb-1 line-clamp-2">${W(t.title)}</h2>
            <a href="${W(t.url)}" target="_blank" class="text-emerald-400/90 text-xs hover:text-emerald-300 transition-all duration-300 hover:underline hover:underline-offset-2 break-all line-clamp-1">
              <i class="fas fa-external-link-alt mr-1"></i>${W(t.url)}
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
  `,document.body.appendChild(e),document.body.style.overflow="hidden",window.onTurnstileSuccess=function(l){const d=document.querySelector('#submit-rating-form button[type="submit"]');d&&(d.disabled=!1)},window.onTurnstileExpired=function(){const l=document.querySelector('#submit-rating-form button[type="submit"]');l&&(l.disabled=!0)},window.onTurnstileError=function(){const l=document.querySelector('#submit-rating-form button[type="submit"]'),d=document.getElementById("rating-form-error");l&&(l.disabled=!0),d&&(d.textContent="Verification failed. Please try again.",d.classList.remove("hidden"))};const n=document.createElement("style");n.textContent=`
    .cf-turnstile {
      margin: 10px 0;
      max-width: 100%;
      transform: scale(0.9);
      transform-origin: 0 0;
    }
    .cf-turnstile iframe {
      max-width: 100% !important;
    }
  `,document.head.appendChild(n);const s=()=>{window.turnstile?window.turnstile.render(".cf-turnstile",{sitekey:"0x4AAAAAABgPUEsL6w8fjG-Z",callback:window.onTurnstileSuccess,"expired-callback":window.onTurnstileExpired,"error-callback":window.onTurnstileError,theme:"dark"}):setTimeout(s,100)};s(),e.querySelector(".close-rating-modal").onclick=h,e.querySelector(".fixed.inset-0").onclick=l=>{l.target===e.querySelector(".fixed.inset-0")&&h()};async function a(l,d="en"){return new Promise((f,g)=>{const m=JSON.stringify({translate:"rapidapi"}),b=new XMLHttpRequest;b.withCredentials=!0,b.addEventListener("readystatechange",function(){if(this.readyState===this.DONE)try{const y=JSON.parse(this.responseText);if(y&&y.translation)f(y.translation);else throw y&&y.status!==200?new Error(y.business_message||"Translation service error"):new Error("Invalid response from translation service")}catch(y){console.error("Translation error:",y,this.responseText),g(y)}}),b.addEventListener("error",()=>{g(new Error("Network error during translation"))});const A=`https://free-google-translator.p.rapidapi.com/external-api/free-google-translator?from=auto&to=${d}&query=${encodeURIComponent(l)}`;b.open("POST",A),b.setRequestHeader("x-rapidapi-key",""),b.setRequestHeader("x-rapidapi-host","free-google-translator.p.rapidapi.com"),b.setRequestHeader("Content-Type","application/json"),b.send(m)})}function i(l,d,f){const g=l.parentNode.querySelector(".translation-dropdown");if(g){g.remove();return}const m=document.createElement("div");m.className="translation-dropdown absolute z-10 mt-1 w-24 bg-gray-800 rounded-md shadow-lg border border-gray-700",m.style.top="100%",m.style.right="0",[{code:"en",name:"English"},{code:"ru",name:"Русский"},{code:"pt",name:"Português"}].forEach(y=>{const L=document.createElement("button");L.className="block w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-gray-700",L.textContent=y.name,L.dataset.lang=y.code,L.type="button",m.appendChild(L)}),l.parentNode.style.position="relative",l.parentNode.appendChild(m);const A=y=>{!m.contains(y.target)&&y.target!==l&&(m.remove(),document.removeEventListener("click",A))};setTimeout(()=>{document.addEventListener("click",A)},0),m.addEventListener("click",async y=>{const L=y.target.dataset.lang;L&&(m.remove(),await o(l,d,f,L))})}async function o(l,d,f,g){l.innerHTML,l.innerHTML='<i class="fas fa-spinner fa-spin text-xs"></i>',l.title="Translating...",l.disabled=!0;try{const m=await a(f,g);d.textContent=m,l.innerHTML='<i class="fas fa-undo text-xs"></i><span class="hidden sm:inline">Original</span>',l.classList.add("active"),l.title="Show original text",l.setAttribute("data-original",f)}catch(m){console.error("Translation failed:",m),d.textContent=f,l.innerHTML='<i class="fas fa-exclamation-triangle text-xs"></i><span class="hidden sm:inline">Error</span>',l.title="Error translating. Click to try again."}finally{l.disabled=!1}}function r(l){const d=l.target.closest(".translate-comment");if(!d||d.disabled)return;l.preventDefault(),l.stopPropagation();const f=d.closest(".border-b"),g=f?f.querySelector(".comment-text p"):null;if(!g){console.error("Could not find comment text element");return}let m=d.getAttribute("data-original");if(d.classList.contains("active")){m&&(g.textContent=m,d.innerHTML='<i class="fas fa-language text-xs"></i><span class="hidden sm:inline">Translate</span>',d.classList.remove("active"),d.title="Translate this review",d.removeAttribute("data-original")),d.disabled=!1;return}m=g.textContent.trim(),i(d,g,m)}const u=e.querySelector("#rating-comments-list");u&&u.addEventListener("click",r);const c=e.querySelector('textarea[name="comment"]'),p=e.querySelector(".char-count");if(c&&p){const l=()=>{p.textContent=c.value.length};c.addEventListener("input",l),l(),e._cleanupCharCounter=()=>{c.removeEventListener("input",l)}}function h(){e._cleanupCharCounter&&e._cleanupCharCounter(),e.remove(),document.body.style.overflow=""}const E=5*60*1e3;let x=1,k="recent",C=0,q=!1,$=0,S=t.title;function I(){const l=`ratings_${encodeURIComponent(S)}`,d=localStorage.getItem(l);if(!d)return null;try{const{data:f,timestamp:g}=JSON.parse(d);if(Date.now()-g<E)return f}catch(f){console.warn("Error reading cache:",f)}return null}function P(l){try{const d=`ratings_${encodeURIComponent(S)}`,f={data:l,timestamp:Date.now()};localStorage.setItem(d,JSON.stringify(f))}catch(d){console.warn("Error saving to cache:",d)}}async function z(l=1,d=!1){if(q)return;const f=e.querySelector("#rating-comments-list");if(!f)return;f.innerHTML='<div class="flex justify-center items-center py-6"><div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-400"></div></div>';const g=d?null:I();if(g){console.log("Using cached data for:",S),D(g,l),Date.now()-$>E&&G(!0);return}await G()}function D(l,d=1){const f=e.querySelector("#rating-comments-list");if(f){if(f.innerHTML="",l.avg!==void 0){const g=parseFloat(l.avg).toFixed(1),m=parseInt(l.total)||0,b=e.querySelector("#rating-modal-stars"),A=e.querySelector("#rating-modal-avg"),y=e.querySelector("#rating-modal-total");if(b){b.innerHTML="";const L=Math.round(parseFloat(l.avg));b.innerHTML="★".repeat(L)+"☆".repeat(5-L)}A&&(A.textContent=`${g} out of 5`),y&&(y.textContent=`${m} ${m===1?"review":"reviews"}`)}if(!l.comments||l.comments.length===0){f.innerHTML=`
        <div class="text-center py-6 text-gray-400">
          No reviews yet. Be the first to leave a review!
        </div>
      `;return}P(l),l.pagination&&(C=l.pagination.total||0,j()),l.comments.forEach(g=>{if(!g)return;const m=document.createElement("div");m.className="border-b border-gray-700 py-4";const b=g.timestamp?new Date(g.timestamp).getTime():Date.now();m.innerHTML=`
        <div class="flex items-start justify-between mb-2">
          <div class="flex items-center">
            <div class="text-yellow-400 text-sm">
              ${"★".repeat(Math.round(g.rating||0))}${"☆".repeat(5-Math.round(g.rating||0))}
            </div>
            <span class="ml-2 text-sm text-gray-400">${(g.rating||0).toFixed(1)}</span>
          </div>
          <span class="text-xs text-gray-500">${_t(b)}</span>
        </div>
        <div class="text-sm text-gray-300 mb-2 comment-text">
          <p>${W(g.message||g.comment||"")}</p>
        </div>
        <div class="flex justify-between items-center text-xs text-gray-500">
          <span>${g.nickname||"Anonymous"}</span>
          <button class="translate-comment text-emerald-400 hover:text-emerald-300 text-xs flex items-center gap-1" 
                  title="Translate to English">
            <i class="fas fa-language text-xs"></i>
            <span class="hidden sm:inline">Translate</span>
          </button>
        </div>
      `,f.appendChild(m)})}}function j(){const l=e.querySelector(".pagination");if(!l)return;const d=Math.ceil(C/10);let f=`
      <div class="flex justify-between items-center text-sm">
        <button 
          class="px-3 py-1 rounded ${x<=1?"text-gray-500 cursor-not-allowed":"text-emerald-400 hover:bg-gray-700"}"
          ${x<=1?"disabled":""}
          onclick="document.querySelector('.rating-modal')._vm.loadPage(${x-1})"
        >
          Previous
        </button>
        <div class="text-gray-400">
          Page ${x} of ${d}
        </div>
        <button 
          class="px-3 py-1 rounded ${x>=d?"text-gray-500 cursor-not-allowed":"text-emerald-400 hover:bg-gray-700"}"
          ${x>=d?"disabled":""}
          onclick="document.querySelector('.rating-modal')._vm.loadPage(${x+1})"
        >
          Next
        </button>
      </div>
    `;l.innerHTML=f}window.loadPage=l=>{if(!M||!M.comments)return;const d=Math.ceil(M.comments.length/10);l<1||l>d||(x=l,F())},e._vm={loadPage:window.loadPage};async function G(l=!1){var b,A;if(q)return;q=!0;const d=e.querySelector("#rating-comments-list");!l&&d&&(d.innerHTML='<div class="text-center py-4 text-gray-400">Loading comments...</div>');const f=`comments_${S}`,g=5*60*1e3,m=ft.get(f);if(m&&Date.now()-m.timestamp<g){M=m,F(),q=!1;return}try{const y=await fetch(`${gt}?source=${encodeURIComponent(S)}&all=true`);if(!y.ok)throw new Error(`Failed to fetch comments: ${y.statusText}`);const L=await y.json();M={...L,comments:L.comments||[],pagination:{total:((b=L.comments)==null?void 0:b.length)||0,page:1,totalPages:1,perPage:((A=L.comments)==null?void 0:A.length)||0}},ft.set(f,{...M,timestamp:Date.now()}),$=Date.now(),F()}catch(y){console.error("Error fetching comments:",y),m?(M=m,F()):!l&&d&&(d.innerHTML=`
          <div class="text-red-500 text-center py-4">
            Failed to load comments. Please try again later.
            ${y.message?`<div class="text-xs mt-1">${y.message}</div>`:""}
          </div>
        `)}finally{q=!1}}function F(){if(!M||!M.comments)return;const l=Mt([...M.comments],k),d=10,f=Math.ceil(l.length/d),g=(x-1)*d,m=l.slice(g,g+d);M.pagination={total:l.length,page:x,totalPages:f,perPage:d},D({...M,comments:m,pagination:M.pagination},x)}let M=null;function Mt(l,d){if(!l)return[];const f=[...l];switch(d){case"recent":return f.sort((g,m)=>{const b=g.timestamp?new Date(g.timestamp).getTime():0;return(m.timestamp?new Date(m.timestamp).getTime():0)-b});case"high":return f.sort((g,m)=>(m.rating||0)-(g.rating||0));case"low":return f.sort((g,m)=>(g.rating||0)-(m.rating||0));default:return f}}function qt(){const l=e.querySelector("#rating-sort-select");l&&l.addEventListener("change",d=>{k=d.target.value,x=1,F()})}qt(),z(),z();const Y=e.querySelector("#submit-rating-form"),J=e.querySelector("#rating-form-error"),U=Y.querySelector('button[type="submit"]');U.disabled=!0,Y.onsubmit=async l=>{var d;l.preventDefault(),J.textContent="",J.className="mt-1 text-red-400 text-xs min-h-[20px] bg-red-900/30 rounded py-1.5 px-2 border border-red-900/20";try{const f=new FormData(Y),g=(f.get("nickname")||"").trim(),m=f.get("rating"),b=(f.get("comment")||"").trim(),A=(d=document.querySelector('[name="cf-turnstile-response"]'))==null?void 0:d.value;if(!A)throw new Error("Please complete the CAPTCHA verification");if(!Ut(S)){const Bt=`rating_submission_${S}`,Dt=parseInt(localStorage.getItem(Bt)||"0",10),Rt=Date.now(),Ft=60*60*1e3,mt=Math.ceil((Dt+Ft-Rt)/6e4);throw new Error(`You can only submit one review per hour. Please try again in ${mt} minute${mt!==1?"s":""}.`)}if(!g)throw new Error("Please enter a nickname");if(!m||isNaN(m)||m<1||m>5)throw new Error("Please select a valid rating between 1 and 5");if(!b||b.split(/\s+/).length<3)throw new Error("Please enter a message with at least 3 words");U.disabled=!0,U.innerHTML='<i class="fas fa-spinner fa-spin mr-2"></i> Submitting...',J.classList.add("hidden");const y=await jt();Ot(S);const L={source:S,nickname:g,rating:Number(m),message:b,ipHash:y,turnstileResponse:A||""},ut=await fetch(gt,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(L)}),Pt=await ut.json();if(!ut.ok)throw new Error(Pt.error||"Failed to submit rating");showNotification("Rating submitted successfully! It will be visible after moderation.","success"),setTimeout(h,1500),Y.reset(),window.turnstile&&window.turnstile.reset()}catch(f){console.error("Error submitting rating:",f),J.textContent=f.message||"Failed to submit rating. Please try again.",J.classList.remove("hidden"),window.turnstile&&window.turnstile.reset()}finally{U&&(U.disabled=!1,U.innerHTML='<i class="fas fa-paper-plane mr-2"></i> Submit Review')}}}document.body.classList.add("preloading");document.addEventListener("DOMContentLoaded",async()=>{await Nt.initialize()});function Gt(){const t=document.getElementById("preloader"),e=t.querySelector(".loading-progress"),n=t.querySelector(".loading-percentage");let s=0;const a=()=>{const i=100-s,o=Math.min(i*.1,Math.max(.2,Math.random()*.8));s=Math.min(100,s+o),e.style.width=`${s}%`;const r=s<100?s.toFixed(1):Math.round(s);n.textContent=`${r}%`,s<30?n.className="loading-percentage text-sm font-medium text-white/70":s<60?n.className="loading-percentage text-sm font-medium text-emerald-400/70":n.className="loading-percentage text-sm font-medium text-emerald-400",s<100?requestAnimationFrame(a):setTimeout(()=>{t.classList.add("hiding"),t.addEventListener("transitionend",()=>{t.remove(),document.body.classList.remove("preloading"),w.updatePageContent(),nt()},{once:!0})},1e3)};setTimeout(()=>{t&&document.body.contains(t)&&(console.log("Preloader safety timeout triggered"),t.classList.add("hiding"),setTimeout(()=>{t.remove(),document.body.classList.remove("preloading"),w.updatePageContent(),nt()},400))},5e3),setTimeout(()=>{requestAnimationFrame(a)},300)}function nt(){const t=document.getElementById("language-switcher"),e=document.getElementById("language-dropdown");if(!t||!e)return;const n=t.cloneNode(!0);t.parentNode.replaceChild(n,t);const s=w.getCurrentLocale(),a=n.querySelector("span");if(a){const r={en:"English",ru:"Русский","pt-br":"Português"};a.textContent=r[s]||"English"}n.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),e.classList.contains("hidden")?(e.classList.remove("hidden"),n.classList.add("bg-white/10")):(e.classList.add("hidden"),n.classList.remove("bg-white/10"))}),e.querySelectorAll("button").forEach(r=>{r.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation();const c=r.dataset.lang;if(w.setLocale(c),e.classList.add("hidden"),n.classList.remove("bg-white/10"),a){const p={en:"English",ru:"Русский","pt-br":"Português"};a.textContent=p[c]||"English"}B()})}),document.addEventListener("click",r=>{n.contains(r.target)||(e.classList.add("hidden"),n.classList.remove("bg-white/10"))});const o=()=>{const r=t.querySelector("span"),u={en:"English",ru:"Русский","pt-br":"Português"};r.textContent=u[w.currentLocale]||"English"};document.addEventListener("languageChanged",o)}document.addEventListener("DOMContentLoaded",()=>{try{Gt()}catch(i){console.error("Error initializing preloader:",i);const o=document.getElementById("preloader");o&&o.remove(),document.body.classList.remove("preloading"),w.updatePageContent(),nt()}oe();const t=document.getElementById("accept-cookies"),e=document.getElementById("reject-cookies"),n=document.getElementById("cookie-consent");t&&t.addEventListener("click",()=>{s(),et("cookie-consent","accepted",365)}),e&&e.addEventListener("click",()=>{s(),et("cookie-consent","rejected",365)});function s(){n.classList.add("translate-y-full"),n.addEventListener("transitionend",()=>{n.style.display="none"},{once:!0})}St(),setTimeout(()=>{Ct()},300),le(),ce(),de(),st(),Kt(),initializeMobileFilters();let a;window.addEventListener("resize",()=>{clearTimeout(a),a=setTimeout(()=>{st()},100)})});function St(){try{console.log("Initializing sorting..."),document.querySelectorAll(".sort-option").forEach(e=>{e.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation();const s=e.getAttribute("data-sort");if(console.log("Sort option clicked:",s),s){at(s);const a=document.getElementById("mobile-filters");a&&!a.classList.contains("hidden")&&(a.classList.add("hidden"),document.body.style.overflow="auto"),B()}})});const t=localStorage.getItem("currentSort")||"hot";console.log("Initial sort type:",t),at(t),console.log("Sorting initialized with type:",t)}catch(t){console.error("Error initializing sorting:",t)}}let v=[],H="",R=null,T=1;const O={mobile:4,tablet:6,desktop:9,wide:15},N=document.getElementById("about-modal"),Jt=document.getElementById("about-btn"),Et=document.getElementById("close-about"),_=document.getElementById("suggest-modal"),Vt=document.getElementById("suggest-btn"),Yt=document.getElementById("close-suggest"),Q=24*60*60*1e3;document.getElementById("mobile-filters-btn");document.getElementById("mobile-filters-modal");document.getElementById("close-mobile-filters");document.getElementById("mobile-filters-content");document.getElementById("reset-filters");document.getElementById("apply-filters");const K=document.getElementById("active-filters-count"),Wt={tablet:768};function st(){var s;const t=document.getElementById("filters-sidebar"),e=(s=document.getElementById("mobile-filters-btn"))==null?void 0:s.parentElement;if(!t||!e)return;const n=window.innerWidth<Wt.tablet;t.classList.toggle("hidden",n),e.classList.toggle("hidden",!n)}function Kt(){const t=document.getElementById("mobile-filters-btn"),e=document.getElementById("mobile-filters-modal"),n=e==null?void 0:e.querySelector(".flex.flex-col.bg-\\[\\#111\\]"),s=e==null?void 0:e.querySelector(".bg-\\[\\#0A0A0A\\]");if(!t||!e||!n||!s)return;function a(){e.classList.remove("hidden"),e.offsetHeight,s.classList.add("opacity-100"),n.classList.remove("translate-y-full"),document.body.classList.add("overflow-hidden")}function i(){s.classList.remove("opacity-100"),n.classList.add("translate-y-full"),setTimeout(()=>{e.classList.add("hidden"),document.body.classList.remove("overflow-hidden")},300)}t.addEventListener("click",c=>{c.preventDefault(),a()});const o=document.getElementById("close-mobile-filters");o&&o.addEventListener("click",c=>{c.preventDefault(),i()}),e.addEventListener("click",c=>{c.target===e&&i()}),document.addEventListener("keydown",c=>{c.key==="Escape"&&!e.classList.contains("hidden")&&i()});const r=document.getElementById("reset-filters");r&&r.addEventListener("click",c=>{c.preventDefault(),Qt(),Lt()});const u=document.getElementById("apply-filters");u&&u.addEventListener("click",c=>{c.preventDefault(),i(),B()})}function Lt(){const t=Zt();K&&(t>0?(K.textContent=`${t} active`,K.classList.remove("hidden")):K.classList.add("hidden"))}function Zt(){let t=0;return H&&t++,R&&t++,localStorage.getItem("currentSort")&&t++,t}function Qt(){H="",R=null,localStorage.removeItem("currentSort"),document.querySelectorAll(".status-filter-btn div").forEach(t=>{t.classList.remove("bg-black/40")}),document.querySelectorAll(".games-filter-btn div").forEach(t=>{t.classList.remove("border-emerald-500/20","bg-black/40"),t.classList.add("border-white/5","bg-black/20")}),document.querySelectorAll(".sort-option").forEach(t=>{t.classList.remove("bg-white/10","text-white"),t.classList.add("text-white/70")}),B()}async function Ct(){try{v=(await(await fetch("data/resources.json")).json()).sources;const n="hydra_ratings_cache",s=5*60*1e3,a=()=>{try{const r=localStorage.getItem(n);if(!r)return null;const{timestamp:u,data:c}=JSON.parse(r);if(Date.now()-u<s)return c}catch(r){console.error("Error reading from cache:",r)}return null},i=r=>{try{localStorage.setItem(n,JSON.stringify({timestamp:Date.now(),data:r}))}catch(u){console.error("Error saving to cache:",u)}},o=a();if(o){console.log("Using cached ratings data"),v.forEach(r=>{const u=o[r.title]||{avg:0,total:0};r.rating={avg:parseFloat(u.avg)||0,total:parseInt(u.total)||0}});return}console.log("Fetching fresh ratings data...");try{const r=[...new Set(v.map(h=>h.title))];console.log(`Fetching ratings for ${r.length} sources`);const u=`https://libraryratingsdb.zxcsixx.workers.dev/api/ratings?batch=true&sources=${r.map(encodeURIComponent).join(",")}`;console.log("Batch API URL:",u);const c=await fetch(u);if(console.log("Batch response status:",c.status),!c.ok)throw new Error(`HTTP error! status: ${c.status}`);const p=await c.json();console.log("Received batch ratings data"),i(p),v.forEach(h=>{const E=p[h.title]||{avg:0,total:0};h.rating={avg:parseFloat(E.avg)||0,total:parseInt(E.total)||0}}),console.log("All ratings loaded via batch endpoint")}catch(r){console.error("Error in batch ratings fetch:",r),v.forEach(u=>{u.rating={avg:0,total:0}})}St(),B(),Xt()}catch(t){console.error("Error loading sources:",t);const e=document.getElementById("sources-container");e&&(e.innerHTML=`
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
            `)}finally{setTimeout(()=>{const t=document.getElementById("preloader");t&&(t.style.opacity="0",setTimeout(()=>{t.style.display="none",B()},300))},500)}}async function Xt(){try{const t=new Promise((i,o)=>setTimeout(()=>o(new Error("Firebase request timed out")),5e3)),e=ot(it,"sources"),n=lt(e),a=(await Promise.race([n,t])).val();if(a){v=v.map(i=>{var h;const o=i.url.replace(/[^a-zA-Z0-9]/g,"_"),r=((h=a[o])==null?void 0:h.stats)||{installs:0,copies:0,activity:[]},u=Array.isArray(r.activity)?r.activity:[],c=Date.now(),p=u.filter(E=>c-E<Q).length;return{...i,stats:{...r,recentActivity:p,activity:u}}}),v.forEach(i=>{dt(i.url,i.stats)});try{localStorage.setItem("sourceStats",JSON.stringify(a)),localStorage.setItem("statsLastUpdated",Date.now().toString())}catch{}return!0}return!1}catch{try{const e=localStorage.getItem("sourceStats");if(e){const n=JSON.parse(e);v=v.map(s=>{var c;const a=s.url.replace(/[^a-zA-Z0-9]/g,"_"),i=((c=n[a])==null?void 0:c.stats)||{installs:0,copies:0,activity:[]},o=Array.isArray(i.activity)?i.activity:[],r=Date.now(),u=o.filter(p=>r-p<Q).length;return{...s,stats:{...i,recentActivity:u,activity:o}}});try{const s=v.map(i=>encodeURIComponent(i.title)).join(","),a=await fetch(`https://libraryratingsdb.zxcsixx.workers.dev/api/ratings?batch=true&sources=${s}`);if(a.ok){const i=await a.json();v.forEach(o=>{const r=i[o.title]||{avg:0,total:0};ratingsMap[o.title]={avg:parseFloat(r.avg)||0,total:parseInt(r.total)||0}})}else throw new Error("Failed to fetch batch ratings")}catch(s){console.error("Error fetching batch ratings:",s),await Promise.all(v.map(async a=>{try{const o=await(await fetch(`https://libraryratingsdb.zxcsixx.workers.dev/api/ratings?source=${encodeURIComponent(a.title)}&page=1`)).json();ratingsMap[a.title]={avg:typeof o.avg=="number"?o.avg:0,total:typeof o.total=="number"?o.total:0}}catch(i){console.error(`Error fetching rating for ${a.title}:`,i),ratingsMap[a.title]={avg:0,total:0}}}))}return console.log("Using cached stats from localStorage"),!0}}catch{}return v=v.map(e=>({...e,stats:{installs:0,copies:0,recentActivity:0,activity:[]}})),!1}}function pt(t){document.querySelector("main").classList.add("blur-sm","transition-all","duration-200");const e=w.t.bind(w),n=document.createElement("div");n.className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in p-4",n.innerHTML=`
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
    `,document.body.appendChild(n);const s=()=>{document.querySelector("main").classList.remove("blur-sm"),n.remove()};n.querySelector(".cancel-btn").addEventListener("click",()=>{s(),t(!1)}),n.querySelector(".proceed-btn").addEventListener("click",()=>{s(),t(!0)}),n.querySelector(".fixed.inset-0").addEventListener("click",a=>{a.target===a.currentTarget&&(s(),t(!1))})}function ht(t){document.querySelector("main").classList.add("blur-sm","transition-all","duration-200");const e=w.t.bind(w),n=document.createElement("div");n.className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in p-4",n.innerHTML=`
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
    `,document.body.appendChild(n);const s=()=>{document.querySelector("main").classList.remove("blur-sm"),n.remove()};n.querySelector(".cancel-btn").addEventListener("click",()=>{s(),t(!1)}),n.querySelector(".proceed-btn").addEventListener("click",()=>{s(),t(!0)}),n.querySelector(".fixed.inset-0").addEventListener("click",a=>{a.target===a.currentTarget&&(s(),t(!1))})}function te(t){var E,x,k,C,q;const e=w.getCurrentLocale(),s=(((E=w.translations[e])==null?void 0:E.sources)||{})[t.title]||{title:t.title,description:t.description},a=t.status.includes("Use At Your Own Risk"),i=t.stats||{installs:0,copies:0,recentActivity:0},o=parseInt(i.recentActivity||0),r=document.createElement("div");r.className="source-card animate-fade-in rounded-xl",r.dataset.url=t.url,r.dataset.name=t.title,r.dataset.copies=((x=t.stats)==null?void 0:x.copies)||0,r.dataset.installs=((k=t.stats)==null?void 0:k.installs)||0,r.dataset.activity=((C=t.stats)==null?void 0:C.recentActivity)||0;const u=t.status.map($=>{const S=$.toLowerCase().replace(/\s+/g,"-"),I={trusted:{color:"emerald",icon:"shield",key:"trusted",customClass:"bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/30 "},"safe-for-use":{color:"blue",icon:"check-circle",key:"safeForUse",customClass:"bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/30"},"use-at-your-own-risk":{color:"red",icon:"exclamation-triangle",key:"useAtOwnRisk",customClass:"bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/30 "},"works-in-russia":{color:"teal",icon:"globe-europe",key:"worksInRussia",customClass:"bg-teal-500/10 border-teal-500/20 text-teal-400 hover:bg-teal-500/20 hover:border-teal-500/30 "},nsfw:{color:"purple",icon:"exclamation-circle",key:"nsfw",customClass:"bg-purple-500/10 border-purple-500/20 text-purple-400 hover:bg-purple-500/20 hover:border-purple-500/30 "}}[S]||{color:"gray",icon:"circle",key:S},P=`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs backdrop-blur-sm status-badge ${I.customClass||""}`,z=`bg-${I.color}-500/10 border border-${I.color}-500/20 text-${I.color}-400`,D=w.t(`status.${I.key}`);return`
            <span class="${I.customClass?P:`${P} ${z}`}">
                <i class="fas fa-${I.icon} text-[10px]"></i>
                ${D}
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
                            <span class="whitespace-nowrap">${re(t.addedDate)}</span>
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
    `;const c=(q=r.querySelector("[data-rating-stars-container]"))==null?void 0:q.parentElement;c&&(c.addEventListener("click",$=>{$.stopPropagation(),zt(t)}),$t(r,t.rating));const p=r.querySelector(".install-btn"),h=r.querySelector(".copy-btn");return h&&h.addEventListener("click",async()=>{const $=async()=>{await xt(t.url,"copy")&&(navigator.clipboard.writeText(t.url),h.innerHTML='<i class="fas fa-check text-[10px]"></i> '+w.t("sourceCard.copied"),setTimeout(()=>{h.innerHTML='<i class="fas fa-copy text-[10px]"></i> '+w.t("sourceCard.copy")},2e3))},S=t.title==="CPGRepacks";a||S?(S?ht:pt)(P=>{P&&$()}):$()}),p&&p.addEventListener("click",async()=>{const $=async()=>{bt(p,"loading");const I=await xt(t.url,"install");if(bt(p,I?"success":"rate-limited"),I){const P=encodeURIComponent(t.url);window.location.href=`hydralauncher://install-source?urls=${P}`}},S=t.title==="CPGRepacks";t.status.includes("Use At Your Own Risk")||S?(S?ht:pt)(P=>{P&&$()}):$()}),dt(t.url,t.stats),r.dataset.copies=i.copies||0,r.dataset.installs=i.installs||0,r.dataset.activity=o,r}let Z="wide";function kt(){const t=window.innerWidth;return t>=1536?"wide":t>=1024?"desktop":t>=640?"tablet":"mobile"}let vt;window.addEventListener("resize",()=>{clearTimeout(vt),vt=setTimeout(()=>{st();const t=kt();if(Z!==t){const n=ct(),s=X(),a=Math.ceil(n.length/s);if(Z==="wide"&&t==="desktop"){const i=(T-1)*O.desktop;T=Math.floor(i/O.desktop)+1}Z=t,T=Math.min(Math.max(1,T),a),B(n),s<X()&&window.scrollTo({top:0,behavior:"smooth"})}},100)});function yt(t,e){return console.log(`Sorting sources by: ${e}`),[...t].sort((n,s)=>{var a,i,o,r,u,c,p,h,E,x,k,C;try{switch(e){case"hot":const q=((a=n.stats)==null?void 0:a.recentActivity)||0;return(((i=s.stats)==null?void 0:i.recentActivity)||0)-q;case"new":return new Date(s.addedDate||0)-new Date(n.addedDate||0);case"most-copies":const S=((o=n.stats)==null?void 0:o.copies)||0;return(((r=s.stats)==null?void 0:r.copies)||0)-S;case"most-installs":const P=((u=n.stats)==null?void 0:u.installs)||0;return(((c=s.stats)==null?void 0:c.installs)||0)-P;case"top-rated":console.log(`Comparing ratings: ${n.title} (${((p=n.rating)==null?void 0:p.avg)||0}) vs ${s.title} (${((h=s.rating)==null?void 0:h.avg)||0})`),console.log(`Full rating data for ${n.title}:`,n.rating),console.log(`Full rating data for ${s.title}:`,s.rating);const D=((E=n.rating)==null?void 0:E.avg)||0,j=((x=s.rating)==null?void 0:x.avg)||0;if(D===j){const G=((k=n.rating)==null?void 0:k.total)||0,F=((C=s.rating)==null?void 0:C.total)||0;return console.log(`Ratings equal (${D}), comparing counts: ${G} vs ${F}`),F-G}return console.log(`Sorting by rating: ${j} - ${D} = ${j-D}`),j-D;case"name-asc":return(n.title||"").localeCompare(s.title||"");case"name-desc":return(s.title||"").localeCompare(n.title||"");default:return 0}}catch(q){return console.error("Error in sort function:",q),console.error("Sort type:",e),console.error("Source A:",n),console.error("Source B:",s),0}})}function at(t){var e;try{console.log("Updating active sort UI for:",t);const n=document.querySelector(".mobile-sort-button span");if(n){const a=((e=document.querySelector(`.sort-option[data-sort="${t}"]`))==null?void 0:e.textContent)||"Sort";n.textContent=a}document.querySelectorAll(".sort-option").forEach(a=>{const i=a.getAttribute("data-sort")===t;a.classList.toggle("bg-white/10",i),a.classList.toggle("text-white",i),a.classList.toggle("text-white/70",!i);const o=a.querySelector("i.fa-check");o&&(o.style.opacity=i?"1":"0")});const s=document.getElementById("sort-dropdown");s&&!s.classList.contains("hidden")&&s.classList.add("hidden"),localStorage.setItem("currentSort",t)}catch(n){console.error("Error updating sort UI:",n)}}function B(t=null){const e=document.getElementById("sources-container");if(e){e.innerHTML="";try{let n=t||ct();console.log(`Displaying ${n.length} filtered sources`);const s=localStorage.getItem("currentSort")||"hot";if(console.log("Current sort type:",s),s){console.log("Before sorting - first few sources:",n.slice(0,3).map(c=>{var p,h;return{title:c.title,rating:c.rating,hasRating:!!((p=c.rating)!=null&&p.avg||(h=c.rating)!=null&&h.total)}}));try{n=yt(n,s),console.log("After sorting - first few sources:",n.slice(0,3).map(c=>{var p,h;return{title:c.title,rating:c.rating,sortKey:s==="top-rated"?`${((p=c.rating)==null?void 0:p.avg)||0} (${((h=c.rating)==null?void 0:h.total)||0} ratings)`:c[s]||"N/A"}})),at(s)}catch(c){console.error("Error during sorting:",c),n=yt(n,"hot")}}Z=kt();const a=X(),i=Math.ceil(n.length/a);T=Math.min(Math.max(1,T),i);const o=(T-1)*a,r=Math.min(o+a,n.length);n.slice(o,r).forEach(c=>{const p=te(c);e.appendChild(p)}),ee(i),w.updatePageContent()}catch(n){console.error("Error in displaySources:",n),e.innerHTML=`
            <div class="col-span-full text-center py-10 px-4">
                <div class="text-red-400 text-4xl mb-4">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h3 class="text-xl font-semibold text-white mb-2">Error Loading Content</h3>
                <p class="text-white/70 mb-4">${n.message||"An unknown error occurred"}</p>
                <button onclick="location.reload()" class="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                    <i class="fas fa-sync-alt mr-2"></i> Try Again
                </button>
            </div>
        `}}}function X(){const t=window.innerWidth;return t>=2560?O.wide:t>=1024?O.desktop:t>=640?O.tablet:O.mobile}function ee(t){const e=document.getElementById("pagination");if(!e)return;let n="";n+=`
        <button onclick="changePage(${T-1})" 
                class="px-2 py-1.5 text-sm text-white/50 hover:text-white disabled:opacity-50 
                       transition-colors duration-200 rounded-md hover:bg-white/5"
                ${T===1?"disabled":""}>
            <i class="fas fa-chevron-left"></i>
        </button>
    `;for(let s=1;s<=t;s++)s===T?n+=`
                <button class="px-3 py-1.5 text-sm bg-white/10 text-white rounded-md">
                    ${s}
                </button>
            `:n+=`
                <button onclick="changePage(${s})" 
                        class="px-3 py-1.5 text-sm text-white/50 hover:text-white hover:bg-white/5 
                               transition-colors duration-200 rounded-md">
                    ${s}
                </button>
            `;n+=`
        <button onclick="changePage(${T+1})" 
                class="px-2 py-1.5 text-sm text-white/50 hover:text-white disabled:opacity-50 
                       transition-colors duration-200 rounded-md hover:bg-white/5"
                ${T===t?"disabled":""}>
            <i class="fas fa-chevron-right"></i>
        </button>
    `,e.innerHTML=n}window.changePage=function(t){if(t<1)return;const e=ct(),n=Math.ceil(e.length/X());t>n||(T=t,B(e),window.scrollTo({top:0,behavior:"smooth"}))};document.querySelectorAll(".status-filter-btn").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.status;document.querySelectorAll(".status-filter-btn").forEach(n=>{n.querySelector("div").classList.remove("bg-black/40")}),H===e?H="":(H=e,t.querySelector("div").classList.add("bg-black/40")),T=1,B(),It(),dispatchFiltersChanged()})});document.querySelectorAll(".games-filter-btn").forEach(t=>{t.addEventListener("click",()=>{const e=parseInt(t.dataset.min),n=parseInt(t.dataset.max);if(document.querySelectorAll(".games-filter-btn div").forEach(s=>{s.classList.remove("border-emerald-500/20","bg-black/40"),s.classList.add("border-white/5","bg-black/20")}),R&&R.min===e&&R.max===n)R=null;else{R={min:e,max:n};const s=t.querySelector("div");s.classList.remove("border-white/5","bg-black/20"),s.classList.add("border-emerald-500/20","bg-black/40")}T=1,B(),It(),Lt(),dispatchFiltersChanged()})});function It(){const t={};v.forEach(e=>{e.status.forEach(n=>{t[n]=(t[n]||0)+1})}),document.querySelectorAll(".status-filter-btn").forEach(e=>{const n=e.dataset.status,s=e.querySelector(".text-white\\/40");s&&(s.textContent=t[n]||0)}),document.querySelectorAll(".games-filter-btn").forEach(e=>{const n=parseInt(e.dataset.min),s=parseInt(e.dataset.max),a=v.filter(r=>{const u=parseInt(r.gamesCount);return u>=n&&u<=s}).length,i=e.querySelector(".text-white\\/40");i&&(i.textContent=a);const o=e.querySelector(".bg-emerald-500\\/50");if(o){const r=Math.max(...Array.from(document.querySelectorAll(".games-filter-btn")).map(c=>{const p=parseInt(c.dataset.min),h=parseInt(c.dataset.max);return v.filter(E=>{const x=parseInt(E.gamesCount);return x>=p&&x<=h}).length})),u=r>0?a/r*100:0;o.style.width=`${u}%`}})}let V="";document.getElementById("search").addEventListener("input",t=>{V=t.target.value.toLowerCase(),T=1,B()});function ct(){return v.filter(t=>{const e=!V||t.title.toLowerCase().includes(V)||t.description.toLowerCase().includes(V)||t.url.toLowerCase().includes(V),n=!H||t.status.includes(H),s=parseInt(t.gamesCount),a=!R||s>=R.min&&s<=R.max;return e&&n&&a})}const Tt=document.getElementById("sort-dropdown-btn"),tt=document.getElementById("sort-dropdown"),ne=document.getElementById("current-sort");Tt.addEventListener("click",()=>{tt.classList.toggle("hidden")});document.addEventListener("click",t=>{!Tt.contains(t.target)&&!tt.contains(t.target)&&tt.classList.add("hidden")});document.querySelectorAll(".sort-option").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.sort;switch(ne.textContent=t.textContent.trim(),tt.classList.add("hidden"),e){case"high-to-low":sortGamesFilters(!1);break;case"low-to-high":sortGamesFilters(!0);break;case"most-sources":se();break;case"most-popular":ae();break}})});function se(){const t=document.querySelector(".games-filter-btn").parentNode,e=Array.from(t.querySelectorAll(".games-filter-btn"));e.sort((n,s)=>{const a=parseInt(n.querySelector(".text-white\\/40").textContent);return parseInt(s.querySelector(".text-white\\/40").textContent)-a}),e.forEach(n=>n.remove()),e.forEach(n=>t.appendChild(n))}function ae(){const t=JSON.parse(localStorage.getItem("sourceStats")||"{}"),e=document.querySelector(".games-filter-btn").parentNode,n=Array.from(e.querySelectorAll(".games-filter-btn"));n.sort((s,a)=>{var h,E;const i=((h=v.find(x=>x.gamesCount===s.dataset.min))==null?void 0:h.url)||"",o=((E=v.find(x=>x.gamesCount===a.dataset.min))==null?void 0:E.url)||"",r=t[i]||{installs:0,copies:0},u=t[o]||{installs:0,copies:0},c=r.installs+r.copies;return u.installs+u.copies-c}),n.forEach(s=>s.remove()),n.forEach(s=>e.appendChild(s))}function re(t){const e=new Date(t),s=Math.abs(new Date-e),a=Math.floor(s/(1e3*60*60*24)),i=w.t.bind(w);if(a===0)return i("common.date.today");if(a===1)return i("common.date.yesterday");if(a<30)return i("common.date.daysAgo",{days:a});{const o={year:"numeric",month:"short",day:"numeric"};return e.toLocaleDateString(w.getCurrentLocale(),o)}}document.addEventListener("DOMContentLoaded",()=>{Ct(),sortGamesFilters(!1)});Jt.addEventListener("click",()=>{N.classList.remove("hidden"),document.body.style.overflow="hidden"});Et.addEventListener("click",()=>{N.classList.add("hidden"),document.body.style.overflow=""});N.addEventListener("click",t=>{t.target===N&&Et.click()});document.addEventListener("keydown",t=>{t.key==="Escape"&&!N.classList.contains("hidden")&&(N.classList.add("hidden"),document.body.style.overflow="")});Vt.addEventListener("click",()=>{_.classList.remove("hidden"),document.body.style.overflow="hidden"});Yt.addEventListener("click",()=>{_.classList.add("hidden"),document.body.style.overflow=""});_.addEventListener("click",t=>{t.target===_&&(_.classList.add("hidden"),document.body.style.overflow="")});document.addEventListener("keydown",t=>{t.key==="Escape"&&(N.classList.contains("hidden")||(N.classList.add("hidden"),document.body.style.overflow=""),_.classList.contains("hidden")||(_.classList.add("hidden"),document.body.style.overflow=""))});function et(t,e,n){const s=new Date;s.setTime(s.getTime()+n*24*60*60*1e3),document.cookie=`${t}=${e};expires=${s.toUTCString()};path=/`}function At(t){const e=t+"=",n=document.cookie.split(";");for(let s=0;s<n.length;s++){let a=n[s];for(;a.charAt(0)===" ";)a=a.substring(1,a.length);if(a.indexOf(e)===0)return a.substring(e.length,a.length)}return null}async function xt(t,e){try{const n=t.replace(/[^a-zA-Z0-9]/g,"_"),s=`${e}_${n}`;if(At(s))return!0;let a={installs:0,copies:0,activity:[],recentActivity:0};try{const o=new Promise((k,C)=>setTimeout(()=>C(new Error("Firebase request timed out")),3e3)),r=ot(it,`sources/${n}/stats`),u=lt(r),p=(await Promise.race([u,o])).val()||{installs:0,copies:0,activity:[]},h=Date.now(),x=(Array.isArray(p.activity)?p.activity:[]).filter(k=>h-k<Q);x.push(h),a={installs:parseInt(p.installs||0)+(e==="install"?1:0),copies:parseInt(p.copies||0)+(e==="copy"?1:0),activity:x,recentActivity:x.length,lastUpdated:h},await Promise.race([wt(r,a),new Promise((k,C)=>setTimeout(()=>C(new Error("Update timed out")),3e3))]);try{const k=localStorage.getItem("sourceStats");if(k){const C=JSON.parse(k);C[n]||(C[n]={}),C[n].stats=a,localStorage.setItem("sourceStats",JSON.stringify(C)),localStorage.setItem("statsLastUpdated",h.toString())}}catch{}}catch{console.log("Firebase update failed, continuing with local data");const r=v.find(u=>u.url===t);if(r&&r.stats){a={installs:parseInt(r.stats.installs||0)+(e==="install"?1:0),copies:parseInt(r.stats.copies||0)+(e==="copy"?1:0),activity:[],recentActivity:1,lastUpdated:Date.now()};try{const u=localStorage.getItem("sourceStats");if(u){const c=JSON.parse(u);c[n]||(c[n]={}),c[n].stats=a,localStorage.setItem("sourceStats",JSON.stringify(c)),localStorage.setItem("statsLastUpdated",Date.now().toString())}}catch{}}}et(s,"true",e==="install"?.003472222:347222e-9),dt(t,a);const i=v.findIndex(o=>o.url===t);return i!==-1&&(v[i].stats=a),!0}catch{return!1}}function dt(t,e=null){const n=document.querySelectorAll(".source-card"),s=Array.from(n).find(a=>a.dataset.url===t);if(s){const a=s.querySelector(".source-stats");if(a){const i=parseInt((e==null?void 0:e.installs)||0),o=parseInt((e==null?void 0:e.copies)||0),r=parseInt((e==null?void 0:e.recentActivity)||0);a.innerHTML=`
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
            `}s.dataset.copies=(e==null?void 0:e.copies)||0,s.dataset.installs=(e==null?void 0:e.installs)||0,s.dataset.activity=(e==null?void 0:e.recentActivity)||0}}function bt(t,e){const n=t.innerHTML;switch(e){case"loading":t.disabled=!0,t.innerHTML=`
                <div class="flex items-center gap-1.5">
                <div class="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                    <span>Installing...</span>
                </div>
            `;break;case"success":t.innerHTML=`
                <div class="flex items-center gap-1.5">
                    <i class="fas fa-check text-[10px]"></i>
                    Installed
                </div>
            `,setTimeout(()=>{t.disabled=!1,t.innerHTML=n},2e3);break;case"rate-limited":t.innerHTML=`
                <div class="flex items-center gap-1.5 text-amber-400">
                    <i class="fas fa-clock text-[10px]"></i>
                    Please wait
                </div>
            `,setTimeout(()=>{t.disabled=!1,t.innerHTML=n},2e3);break;default:t.disabled=!1,t.innerHTML=n}}function oe(){const t=document.getElementById("cookie-consent");At("cookie-consent")?t.style.display="none":(t.style.display="block",setTimeout(()=>{t.classList.remove("translate-y-full")},500))}document.getElementById("accept-cookies").addEventListener("click",()=>{const t=document.getElementById("cookie-consent");t.classList.add("translate-y-full"),t.addEventListener("transitionend",()=>{t.style.display="none"},{once:!0}),et("cookie-consent","accepted",365)});async function ie(t){try{const e=ot(it,`sources/${t}/stats`),s=(await lt(e)).val();if(s&&s.activity){const a=s.activity.filter(i=>Date.now()-i<Q);a.length!==s.activity.length&&await wt(e,{activity:a})}}catch{}}function le(){const t=document.getElementById("suggest-modal"),e=document.getElementById("suggest-btn"),n=document.getElementById("close-suggest");e&&e.addEventListener("click",()=>{t.classList.remove("hidden")}),n&&n.addEventListener("click",()=>{t.classList.add("hidden")}),t&&t.addEventListener("click",s=>{s.target===t&&t.classList.add("hidden")})}function ce(){const t=document.getElementById("search");if(t){const e=()=>{const s=window.innerWidth<640?"header.searchMobile":"header.search";t.placeholder=w.t(s)};e(),window.addEventListener("resize",e),document.addEventListener("languageChanged",e)}}function de(){setInterval(()=>{v.forEach(t=>{const e=t.url.replace(/[^a-zA-Z0-9]/g,"_");ie(e)})},60*60*1e3)}async function ue(t){const e=v.find(n=>n.title===t);if(e&&e.rating){const n={avg:parseFloat(e.rating.avg||0),total:parseInt(e.rating.total||0)};return rt(t,n),!0}return me()}async function me(){if(!v||v.length===0)return!1;const t="hydra_ratings_cache",e=5*60*1e3,n=()=>{try{const o=localStorage.getItem(t);if(!o)return null;const{timestamp:r,data:u}=JSON.parse(o);if(Date.now()-r<e)return u}catch(o){console.error("Error reading from cache:",o)}return null},s=o=>{try{localStorage.setItem(t,JSON.stringify({timestamp:Date.now(),data:o}))}catch(r){console.error("Error saving to cache:",r)}},a=n();if(a)return console.log("Using cached ratings data"),v.forEach(o=>{const r=a[o.title]||{avg:0,total:0};o.rating={avg:parseFloat(r.avg)||0,total:parseInt(r.total)||0},rt(o.title,o.rating)}),!0;console.log("Fetching fresh ratings data...");const i=[...new Set(v.map(o=>o.title))];if(i.length===0)return!1;try{const o="https://libraryratingsdb.zxcsixx.workers.dev/api/ratings/batch";console.log("Making batch API request to:",o);const r=await fetch(o,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({sources:i,fields:["avg","total"]})});if(console.log("Batch response status:",r.status),!r.ok)return console.error("Failed to fetch batch ratings:",r.status,r.statusText),!1;const u=await r.json();return console.log("Received batch ratings data for",Object.keys(u).length,"sources"),s(u),v.forEach(c=>{const p=u[c.title]||{avg:0,total:0};c.rating={avg:parseFloat(p.avg)||0,total:parseInt(p.total)||0},rt(c.title,c.rating)}),!0}catch(o){return console.error("Error in updateAllSourceRatings:",o),!1}}function rt(t,e){document.querySelectorAll(".source-card").forEach(s=>{s.dataset.name===t&&$t(s,e)})}function $t(t,e){console.log("Updating card rating display for:",t.dataset.name,"with data:",JSON.stringify(e,null,2));const n=t.querySelector("[data-rating-stars-active]"),s=t.querySelector("[data-rating-avg]"),a=t.querySelector("[data-rating-total]"),i=t.querySelector("[data-rating-comment]");if(console.log("Found elements:",{starsActive:!!n,avgEl:!!s,totalEl:!!a,commentEl:!!i}),n&&s&&a)if(e&&(typeof e.avg=="number"||e.avg===0)){const o=e.avg/5*100,r=Math.round(o/10)*10;console.log(`Setting rating: avg=${e.avg}, total=${e.total}, starPercentage=${o}%, rounded=${r}%`),n.style.width=`${r}%`,s.textContent=e.avg>0?e.avg.toFixed(1):"–",a.textContent=e.total>0?`(${e.total})`:"",i&&(i.style.display=e.total>0?"inline-block":"none",console.log(`Comment icon display set to: ${i.style.display}`))}else console.log("No valid rating data, setting default state"),n.style.width="0%",s.textContent="–",a.textContent="",i&&(i.style.display="none");else console.error("Missing required rating elements on card:",{starsActive:!!n,avgEl:!!s,totalEl:!!a})}window.updateSourceCardRating=ue;document.addEventListener("languageChanged",()=>{B()});
