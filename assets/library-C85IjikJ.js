import{i as w}from"./index-C2MPDDHe.js";import{c as _e,r as oe,d as ie,g as le,u as Ee}from"./firebase-connection-D9-JVH6U.js";import{c as je}from"./changelog-notification-DE8L6ccS.js";const fe="https://libraryratingsdb.zxcsixx.workers.dev/api/ratings",Ue=5*60*1e3,pe={data:{},lastUpdated:{},get:function(e){const t=this.data[e],n=this.lastUpdated[e];return t&&n&&Date.now()-n<Ue?Promise.resolve(t):null},set:function(e,t){return this.data[e]=t,this.lastUpdated[e]=Date.now(),t},batchGet:function(e){const t={cached:{},uncached:[]};return e.forEach(n=>{const s=this.get(n);s?t.cached[n]=s:t.uncached.push(n)}),t},batchSet:function(e){Object.entries(e).forEach(([t,n])=>{this.set(t,n)})}};function Oe(e){const t=new Date(e),s=Math.floor((new Date-t)/1e3);let a=Math.floor(s/31536e3);return a>=1?a+" year"+(a===1?"":"s")+" ago":(a=Math.floor(s/2592e3),a>=1?a+" month"+(a===1?"":"s")+" ago":(a=Math.floor(s/86400),a>=1?a+" day"+(a===1?"":"s")+" ago":(a=Math.floor(s/3600),a>=1?a+" hour"+(a===1?"":"s")+" ago":(a=Math.floor(s/60),a>=1?a+" minute"+(a===1?"":"s")+" ago":"just now"))))}function W(e){return String(e).replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}async function ze(){var e;try{const n=[navigator.userAgent,navigator.language,screen.width,screen.height,navigator.platform,new Date().getTimezoneOffset(),!!navigator.cookieEnabled,navigator.hardwareConcurrency||0,navigator.deviceMemory||0,screen.colorDepth,((e=window.screen.orientation)==null?void 0:e.type)||""].join("|"),s=new TextEncoder().encode(n),a=await crypto.subtle.digest("SHA-256",s),r=Array.from(new Uint8Array(a)).map(o=>o.toString(16).padStart(2,"0")).join("");return sessionStorage.setItem("hydra_rating_hash",r),localStorage.getItem("hydra_rating_hash")||localStorage.setItem("hydra_rating_hash",r),r}catch(t){return console.error("Error generating user hash:",t),Math.random().toString(36).slice(2)+Date.now().toString(36)}}function Ge(e){const n=`rating_submission_${e}`,s=localStorage.getItem(n);if(!s)return!0;const a=parseInt(s,10),i=Date.now(),r=60*60*1e3;return i-a>r}function Je(e){const t=`rating_submission_${e}`;localStorage.setItem(t,Date.now().toString())}function Ve(e){document.querySelectorAll(".rating-modal").forEach(l=>l.remove());const t=document.createElement("div");t.className="rating-modal fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4",t.innerHTML=`
    <div class="fixed inset-0 bg-black/90 backdrop-blur-sm animate-fade-in"></div>
    <div class="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-xl max-w-4xl w-full mx-2 sm:mx-4 my-4 max-h-[90vh] sm:max-h-[90vh] flex flex-col shadow-2xl border border-white/5 animate-fade-in transform transition-all duration-300 ease-out overflow-hidden">
      <div class="flex flex-col p-4 sm:p-6 space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex-1 pr-4">
            <h2 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 mb-1 line-clamp-2">${W(e.title)}</h2>
            <a href="${W(e.url)}" target="_blank" class="text-emerald-400/90 text-xs hover:text-emerald-300 transition-all duration-300 hover:underline hover:underline-offset-2 break-all line-clamp-1">
              <i class="fas fa-external-link-alt mr-1"></i>${W(e.url)}
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
  `,document.body.appendChild(t),document.body.style.overflow="hidden",window.onTurnstileSuccess=function(l){const u=document.querySelector('#submit-rating-form button[type="submit"]');u&&(u.disabled=!1)},window.onTurnstileExpired=function(){const l=document.querySelector('#submit-rating-form button[type="submit"]');l&&(l.disabled=!0)},window.onTurnstileError=function(){const l=document.querySelector('#submit-rating-form button[type="submit"]'),u=document.getElementById("rating-form-error");l&&(l.disabled=!0),u&&(u.textContent="Verification failed. Please try again.",u.classList.remove("hidden"))};const n=document.createElement("style");n.textContent=`
    .cf-turnstile {
      margin: 10px 0;
      max-width: 100%;
      transform: scale(0.9);
      transform-origin: 0 0;
    }
    .cf-turnstile iframe {
      max-width: 100% !important;
    }
  `,document.head.appendChild(n);const s=()=>{window.turnstile?window.turnstile.render(".cf-turnstile",{sitekey:"0x4AAAAAABgPUEsL6w8fjG-Z",callback:window.onTurnstileSuccess,"expired-callback":window.onTurnstileExpired,"error-callback":window.onTurnstileError,theme:"dark"}):setTimeout(s,100)};s(),t.querySelector(".close-rating-modal").onclick=h,t.querySelector(".fixed.inset-0").onclick=l=>{l.target===t.querySelector(".fixed.inset-0")&&h()};async function a(l,u="en"){return new Promise((f,g)=>{const m=JSON.stringify({translate:"rapidapi"}),b=new XMLHttpRequest;b.withCredentials=!0,b.addEventListener("readystatechange",function(){if(this.readyState===this.DONE)try{const v=JSON.parse(this.responseText);if(v&&v.translation)f(v.translation);else throw v&&v.status!==200?new Error(v.business_message||"Translation service error"):new Error("Invalid response from translation service")}catch(v){console.error("Translation error:",v,this.responseText),g(v)}}),b.addEventListener("error",()=>{g(new Error("Network error during translation"))});const A=`https://free-google-translator.p.rapidapi.com/external-api/free-google-translator?from=auto&to=${u}&query=${encodeURIComponent(l)}`;b.open("POST",A),b.setRequestHeader("x-rapidapi-key",""),b.setRequestHeader("x-rapidapi-host","free-google-translator.p.rapidapi.com"),b.setRequestHeader("Content-Type","application/json"),b.send(m)})}function i(l,u,f){const g=l.parentNode.querySelector(".translation-dropdown");if(g){g.remove();return}const m=document.createElement("div");m.className="translation-dropdown absolute z-10 mt-1 w-24 bg-gray-800 rounded-md shadow-lg border border-gray-700",m.style.top="100%",m.style.right="0",[{code:"en",name:"English"},{code:"ru",name:"Русский"},{code:"pt",name:"Português"}].forEach(v=>{const L=document.createElement("button");L.className="block w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-gray-700",L.textContent=v.name,L.dataset.lang=v.code,L.type="button",m.appendChild(L)}),l.parentNode.style.position="relative",l.parentNode.appendChild(m);const A=v=>{!m.contains(v.target)&&v.target!==l&&(m.remove(),document.removeEventListener("click",A))};setTimeout(()=>{document.addEventListener("click",A)},0),m.addEventListener("click",async v=>{const L=v.target.dataset.lang;L&&(m.remove(),await r(l,u,f,L))})}async function r(l,u,f,g){l.innerHTML,l.innerHTML='<i class="fas fa-spinner fa-spin text-xs"></i>',l.title="Translating...",l.disabled=!0;try{const m=await a(f,g);u.textContent=m,l.innerHTML='<i class="fas fa-undo text-xs"></i><span class="hidden sm:inline">Original</span>',l.classList.add("active"),l.title="Show original text",l.setAttribute("data-original",f)}catch(m){console.error("Translation failed:",m),u.textContent=f,l.innerHTML='<i class="fas fa-exclamation-triangle text-xs"></i><span class="hidden sm:inline">Error</span>',l.title="Error translating. Click to try again."}finally{l.disabled=!1}}function o(l){const u=l.target.closest(".translate-comment");if(!u||u.disabled)return;l.preventDefault(),l.stopPropagation();const f=u.closest(".border-b"),g=f?f.querySelector(".comment-text p"):null;if(!g){console.error("Could not find comment text element");return}let m=u.getAttribute("data-original");if(u.classList.contains("active")){m&&(g.textContent=m,u.innerHTML='<i class="fas fa-language text-xs"></i><span class="hidden sm:inline">Translate</span>',u.classList.remove("active"),u.title="Translate this review",u.removeAttribute("data-original")),u.disabled=!1;return}m=g.textContent.trim(),i(u,g,m)}const c=t.querySelector("#rating-comments-list");c&&c.addEventListener("click",o);const d=t.querySelector('textarea[name="comment"]'),p=t.querySelector(".char-count");if(d&&p){const l=()=>{p.textContent=d.value.length};d.addEventListener("input",l),l(),t._cleanupCharCounter=()=>{d.removeEventListener("input",l)}}function h(){t._cleanupCharCounter&&t._cleanupCharCounter(),t.remove(),document.body.style.overflow=""}const S=5*60*1e3;let x=1,T="recent",C=0,M=!1,U=0,E=e.title;function B(){const l=`ratings_${encodeURIComponent(E)}`,u=localStorage.getItem(l);if(!u)return null;try{const{data:f,timestamp:g}=JSON.parse(u);if(Date.now()-g<S)return f}catch(f){console.warn("Error reading cache:",f)}return null}function k(l){try{const u=`ratings_${encodeURIComponent(E)}`,f={data:l,timestamp:Date.now()};localStorage.setItem(u,JSON.stringify(f))}catch(u){console.warn("Error saving to cache:",u)}}async function q(l=1,u=!1){if(M)return;const f=t.querySelector("#rating-comments-list");if(!f)return;f.innerHTML='<div class="flex justify-center items-center py-6"><div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-400"></div></div>';const g=u?null:B();if(g){console.log("Using cached data for:",E),D(g,l),Date.now()-U>S&&G(!0);return}await G()}function D(l,u=1){const f=t.querySelector("#rating-comments-list");if(f){if(f.innerHTML="",l.avg!==void 0){const g=parseFloat(l.avg).toFixed(1),m=parseInt(l.total)||0,b=t.querySelector("#rating-modal-stars"),A=t.querySelector("#rating-modal-avg"),v=t.querySelector("#rating-modal-total");if(b){b.innerHTML="";const L=Math.round(parseFloat(l.avg));b.innerHTML="★".repeat(L)+"☆".repeat(5-L)}A&&(A.textContent=`${g} out of 5`),v&&(v.textContent=`${m} ${m===1?"review":"reviews"}`)}if(!l.comments||l.comments.length===0){f.innerHTML=`
        <div class="text-center py-6 text-gray-400">
          No reviews yet. Be the first to leave a review!
        </div>
      `;return}k(l),l.pagination&&(C=l.pagination.total||0,H()),l.comments.forEach(g=>{if(!g)return;const m=document.createElement("div");m.className="border-b border-gray-700 py-4";const b=g.timestamp?new Date(g.timestamp).getTime():Date.now();m.innerHTML=`
        <div class="flex items-start justify-between mb-2">
          <div class="flex items-center">
            <div class="text-yellow-400 text-sm">
              ${"★".repeat(Math.round(g.rating||0))}${"☆".repeat(5-Math.round(g.rating||0))}
            </div>
            <span class="ml-2 text-sm text-gray-400">${(g.rating||0).toFixed(1)}</span>
          </div>
          <span class="text-xs text-gray-500">${Oe(b)}</span>
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
      `,f.appendChild(m)})}}function H(){const l=t.querySelector(".pagination");if(!l)return;const u=Math.ceil(C/10);let f=`
      <div class="flex justify-between items-center text-sm">
        <button 
          class="px-3 py-1 rounded ${x<=1?"text-gray-500 cursor-not-allowed":"text-emerald-400 hover:bg-gray-700"}"
          ${x<=1?"disabled":""}
          onclick="document.querySelector('.rating-modal')._vm.loadPage(${x-1})"
        >
          Previous
        </button>
        <div class="text-gray-400">
          Page ${x} of ${u}
        </div>
        <button 
          class="px-3 py-1 rounded ${x>=u?"text-gray-500 cursor-not-allowed":"text-emerald-400 hover:bg-gray-700"}"
          ${x>=u?"disabled":""}
          onclick="document.querySelector('.rating-modal')._vm.loadPage(${x+1})"
        >
          Next
        </button>
      </div>
    `;l.innerHTML=f}window.loadPage=l=>{if(!$||!$.comments)return;const u=Math.ceil($.comments.length/10);l<1||l>u||(x=l,F())},t._vm={loadPage:window.loadPage};async function G(l=!1){var b,A;if(M)return;M=!0;const u=t.querySelector("#rating-comments-list");!l&&u&&(u.innerHTML='<div class="text-center py-4 text-gray-400">Loading comments...</div>');const f=`comments_${E}`,g=5*60*1e3,m=pe.get(f);if(m&&Date.now()-m.timestamp<g){$=m,F(),M=!1;return}try{const v=await fetch(`${fe}?source=${encodeURIComponent(E)}&all=true`);if(!v.ok)throw new Error(`Failed to fetch comments: ${v.statusText}`);const L=await v.json();$={...L,comments:L.comments||[],pagination:{total:((b=L.comments)==null?void 0:b.length)||0,page:1,totalPages:1,perPage:((A=L.comments)==null?void 0:A.length)||0}},pe.set(f,{...$,timestamp:Date.now()}),U=Date.now(),F()}catch(v){console.error("Error fetching comments:",v),m?($=m,F()):!l&&u&&(u.innerHTML=`
          <div class="text-red-500 text-center py-4">
            Failed to load comments. Please try again later.
            ${v.message?`<div class="text-xs mt-1">${v.message}</div>`:""}
          </div>
        `)}finally{M=!1}}function F(){if(!$||!$.comments)return;const l=Pe([...$.comments],T),u=10,f=Math.ceil(l.length/u),g=(x-1)*u,m=l.slice(g,g+u);$.pagination={total:l.length,page:x,totalPages:f,perPage:u},D({...$,comments:m,pagination:$.pagination},x)}let $=null;function Pe(l,u){if(!l)return[];const f=[...l];switch(u){case"recent":return f.sort((g,m)=>{const b=g.timestamp?new Date(g.timestamp).getTime():0;return(m.timestamp?new Date(m.timestamp).getTime():0)-b});case"high":return f.sort((g,m)=>(m.rating||0)-(g.rating||0));case"low":return f.sort((g,m)=>(g.rating||0)-(m.rating||0));default:return f}}function Be(){const l=t.querySelector("#rating-sort-select");l&&l.addEventListener("change",u=>{T=u.target.value,x=1,F()})}Be(),q(),q();const Y=t.querySelector("#submit-rating-form"),J=t.querySelector("#rating-form-error"),O=Y.querySelector('button[type="submit"]');O.disabled=!1,Y.onsubmit=async l=>{var u;l.preventDefault(),J.textContent="",J.className="mt-1 text-red-400 text-xs min-h-[20px] bg-red-900/30 rounded py-1.5 px-2 border border-red-900/20";try{const f=new FormData(Y),g=(f.get("nickname")||"").trim(),m=f.get("rating"),b=(f.get("comment")||"").trim(),A=(u=document.querySelector('[name="cf-turnstile-response"]'))==null?void 0:u.value;if(!A)throw new Error("Please complete the CAPTCHA verification");if(!Ge(E)){const Re=`rating_submission_${E}`,He=parseInt(localStorage.getItem(Re)||"0",10),Fe=Date.now(),Ne=60*60*1e3,ge=Math.ceil((He+Ne-Fe)/6e4);throw new Error(`You can only submit one review per hour. Please try again in ${ge} minute${ge!==1?"s":""}.`)}if(!g)throw new Error("Please enter a nickname");if(!m||isNaN(m)||m<1||m>5)throw new Error("Please select a valid rating between 1 and 5");if(!b||b.split(/\s+/).length<3)throw new Error("Please enter a message with at least 3 words");O.disabled=!0,O.innerHTML='<i class="fas fa-spinner fa-spin mr-2"></i> Submitting...',J.classList.add("hidden");const v=await ze();Je(E);const L={source:E,nickname:g,rating:Number(m),message:b,ipHash:v,turnstileResponse:A||""},me=await fetch(fe,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(L)}),De=await me.json();if(!me.ok)throw new Error(De.error||"Failed to submit rating");Ye("Rating submitted successfully! It will be visible after moderation.","success"),setTimeout(h,1500),Y.reset(),window.turnstile&&window.turnstile.reset()}catch(f){console.error("Error submitting rating:",f),J.textContent=f.message||"Failed to submit rating. Please try again.",J.classList.remove("hidden"),window.turnstile&&window.turnstile.reset()}finally{O&&(O.disabled=!1,O.innerHTML='<i class="fas fa-paper-plane mr-2"></i> Submit Review')}}}function Ye(e,t="success"){const n=document.createElement("div");n.className="fixed top-4 right-4 bg-emerald-500/90 text-white px-4 py-3 rounded-lg text-sm font-medium shadow-lg z-[10001] animate-fade-in flex items-center gap-2",n.innerHTML=`
    <i class="fas fa-check-circle"></i>
    <span>${e}</span>
  `;const s=document.querySelector(".rating-modal");s?s.appendChild(n):document.body.appendChild(n),setTimeout(()=>{n.remove()},15e3)}console.log("Changelog notification system loaded:",je);document.body.classList.add("preloading");document.addEventListener("DOMContentLoaded",async()=>{await _e.initialize()});function We(){const e=document.getElementById("preloader"),t=e.querySelector(".loading-progress"),n=e.querySelector(".loading-percentage");let s=0;const a=()=>{const i=100-s,r=Math.min(i*.1,Math.max(.2,Math.random()*.8));s=Math.min(100,s+r),t.style.width=`${s}%`;const o=s<100?s.toFixed(1):Math.round(s);n.textContent=`${o}%`,s<30?n.className="loading-percentage text-sm font-medium text-white/70":s<60?n.className="loading-percentage text-sm font-medium text-emerald-400/70":n.className="loading-percentage text-sm font-medium text-emerald-400",s<100?requestAnimationFrame(a):setTimeout(()=>{e.classList.add("hiding"),e.addEventListener("transitionend",()=>{e.remove(),document.body.classList.remove("preloading"),w.updatePageContent(),ne()},{once:!0})},1e3)};w.updatePageContent(),ne(),setTimeout(()=>{e&&document.body.contains(e)&&(console.log("Preloader safety timeout triggered"),e.classList.add("hiding"),setTimeout(()=>{e.remove(),document.body.classList.remove("preloading")},400))},4e3),setTimeout(()=>{requestAnimationFrame(a)},300)}function ne(){const e=document.getElementById("language-switcher"),t=document.getElementById("language-dropdown");if(!e||!t)return;const n=e.cloneNode(!0);e.parentNode.replaceChild(n,e);const s=w.getCurrentLocale(),a=n.querySelector("span");if(a){const o={en:"English",ru:"Русский","pt-br":"Português"};a.textContent=o[s]||"English"}n.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),t.classList.contains("hidden")?(t.classList.remove("hidden"),n.classList.add("bg-white/10")):(t.classList.add("hidden"),n.classList.remove("bg-white/10"))}),t.querySelectorAll("button").forEach(o=>{o.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation();const d=o.dataset.lang;if(w.setLocale(d),t.classList.add("hidden"),n.classList.remove("bg-white/10"),a){const p={en:"English",ru:"Русский","pt-br":"Português"};a.textContent=p[d]||"English"}P(),he(d)})}),document.addEventListener("click",o=>{n.contains(o.target)||(t.classList.add("hidden"),n.classList.remove("bg-white/10"))});const r=()=>{const o=e.querySelector("span"),c={en:"English",ru:"Русский","pt-br":"Português"};o.textContent=c[w.currentLocale]||"English"};document.addEventListener("languageChanged",r),he(w.currentLocale)}function he(e){const t=document.getElementById("vpn-banner");t&&(e==="ru"?t.classList.remove("hidden"):t.classList.add("hidden"))}document.addEventListener("DOMContentLoaded",()=>{try{We()}catch(i){console.error("Error initializing preloader:",i);const r=document.getElementById("preloader");r&&r.remove(),document.body.classList.remove("preloading"),w.updatePageContent(),ne()}dt();const e=document.getElementById("accept-cookies"),t=document.getElementById("reject-cookies"),n=document.getElementById("cookie-consent");e&&e.addEventListener("click",()=>{s(),te("cookie-consent","accepted",365)}),t&&t.addEventListener("click",()=>{s(),te("cookie-consent","rejected",365)});function s(){n.classList.add("translate-y-full"),n.addEventListener("transitionend",()=>{n.style.display="none"},{once:!0})}Le(),$e(),setTimeout(()=>{Te()},300),mt(),gt(),ft(),se(),et(),initializeMobileFilters();let a;window.addEventListener("resize",()=>{clearTimeout(a),a=setTimeout(()=>{se()},100)})});function Le(){try{console.log("Initializing sorting..."),document.querySelectorAll(".sort-option").forEach(t=>{t.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation();const s=t.getAttribute("data-sort");if(console.log("Sort option clicked:",s),s){ae(s);const a=document.getElementById("mobile-filters");a&&!a.classList.contains("hidden")&&(a.classList.add("hidden"),document.body.style.overflow="auto"),P()}})});const e=localStorage.getItem("currentSort")||"hot";console.log("Initial sort type:",e),ae(e),console.log("Sorting initialized with type:",e)}catch(e){console.error("Error initializing sorting:",e)}}let y=[],_="",R=null,I=1;const z={mobile:4,tablet:6,desktop:9,wide:15},N=document.getElementById("about-modal"),Ke=document.getElementById("about-btn"),Ce=document.getElementById("close-about"),j=document.getElementById("suggest-modal"),Ze=document.getElementById("suggest-btn"),Qe=document.getElementById("close-suggest"),Q=24*60*60*1e3;document.getElementById("mobile-filters-btn");document.getElementById("mobile-filters-modal");document.getElementById("close-mobile-filters");document.getElementById("mobile-filters-content");document.getElementById("reset-filters");document.getElementById("apply-filters");const K=document.getElementById("active-filters-count"),Xe={tablet:768};function se(){var s;const e=document.getElementById("filters-sidebar"),t=(s=document.getElementById("mobile-filters-btn"))==null?void 0:s.parentElement;if(!e||!t)return;const n=window.innerWidth<Xe.tablet;e.classList.toggle("hidden",n),t.classList.toggle("hidden",!n)}function et(){const e=document.getElementById("mobile-filters-btn"),t=document.getElementById("mobile-filters-modal"),n=t==null?void 0:t.querySelector(".flex.flex-col.bg-\\[\\#111\\]"),s=t==null?void 0:t.querySelector(".bg-\\[\\#0A0A0A\\]");if(!e||!t||!n||!s)return;function a(){t.classList.remove("hidden"),t.offsetHeight,s.classList.add("opacity-100"),n.classList.remove("translate-y-full"),document.body.classList.add("overflow-hidden")}function i(){s.classList.remove("opacity-100"),n.classList.add("translate-y-full"),setTimeout(()=>{t.classList.add("hidden"),document.body.classList.remove("overflow-hidden")},300)}e.addEventListener("click",d=>{d.preventDefault(),a()});const r=document.getElementById("close-mobile-filters");r&&r.addEventListener("click",d=>{d.preventDefault(),i()}),t.addEventListener("click",d=>{d.target===t&&i()}),document.addEventListener("keydown",d=>{d.key==="Escape"&&!t.classList.contains("hidden")&&i()});const o=document.getElementById("reset-filters");o&&o.addEventListener("click",d=>{d.preventDefault(),nt(),ke()});const c=document.getElementById("apply-filters");c&&c.addEventListener("click",d=>{d.preventDefault(),i(),P()})}function ke(){const e=tt();K&&(e>0?(K.textContent=`${e} active`,K.classList.remove("hidden")):K.classList.add("hidden"))}function tt(){let e=0;return _&&e++,R&&e++,localStorage.getItem("currentSort")&&e++,e}function nt(){_="",R=null,localStorage.removeItem("currentSort"),document.querySelectorAll(".status-filter-btn div").forEach(e=>{e.classList.remove("bg-black/40")}),document.querySelectorAll(".games-filter-btn div").forEach(e=>{e.classList.remove("border-emerald-500/20","bg-black/40"),e.classList.add("border-white/5","bg-black/20")}),document.querySelectorAll(".sort-option").forEach(e=>{e.classList.remove("bg-white/10","text-white"),e.classList.add("text-white/70")}),P()}async function Te(){try{y=(await(await fetch("data/resources.json")).json()).sources;const n="hydra_ratings_cache",s=5*60*1e3,a=()=>{try{const o=localStorage.getItem(n);if(!o)return null;const{timestamp:c,data:d}=JSON.parse(o);if(Date.now()-c<s)return d}catch(o){console.error("Error reading from cache:",o)}return null},i=o=>{try{localStorage.setItem(n,JSON.stringify({timestamp:Date.now(),data:o}))}catch(c){console.error("Error saving to cache:",c)}},r=a();if(r)console.log("Using cached ratings data"),y.forEach(o=>{const c=r[o.title]||{avg:0,total:0};o.rating={avg:parseFloat(c.avg)||0,total:parseInt(c.total)||0}});else{console.log("Fetching fresh ratings data...");try{const o=[...new Set(y.map(h=>h.title))];console.log(`Fetching ratings for ${o.length} sources`);const c=`https://libraryratingsdb.zxcsixx.workers.dev/api/ratings?batch=true&sources=${o.map(encodeURIComponent).join(",")}`;console.log("Batch API URL:",c);const d=await fetch(c);if(console.log("Batch response status:",d.status),!d.ok)throw new Error(`HTTP error! status: ${d.status}`);const p=await d.json();console.log("Received batch ratings data"),i(p),y.forEach(h=>{const S=p[h.title]||{avg:0,total:0};h.rating={avg:parseFloat(S.avg)||0,total:parseInt(S.total)||0}}),console.log("All ratings loaded via batch endpoint")}catch(o){console.error("Error in batch ratings fetch:",o),y.forEach(c=>{c.rating={avg:0,total:0}})}}Le(),ce(),P();try{await st()}finally{setTimeout(()=>{const o=document.getElementById("preloader");o&&(o.style.opacity="0",setTimeout(()=>{o.style.display="none",P()},300))},500)}}catch(e){console.error("Error loading sources:",e);const t=document.getElementById("sources-container");t&&(t.innerHTML=`
                <div class="col-span-full text-center py-10 px-4">
                    <div class="text-red-400 text-4xl mb-4">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <h3 class="text-xl font-semibold text-white mb-2">Error Loading Sources</h3>
                    <p class="text-white/70 mb-4">${e.message}</p>
                    <button onclick="location.reload()" class="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                        <i class="fas fa-sync-alt mr-2"></i> Try Again
                    </button>
                </div>
            `);const n=document.getElementById("preloader");n&&(n.style.opacity="0",setTimeout(()=>{n.style.display="none"},300))}}async function st(){try{const e=new Promise((i,r)=>setTimeout(()=>r(new Error("Firebase request timed out")),5e3)),t=oe(ie,"sources"),n=le(t),a=(await Promise.race([n,e])).val();if(a){y=y.map(i=>{var h;const r=i.url.replace(/[^a-zA-Z0-9]/g,"_"),o=((h=a[r])==null?void 0:h.stats)||{installs:0,copies:0,activity:[]},c=Array.isArray(o.activity)?o.activity:[],d=Date.now(),p=c.filter(S=>d-S<Q).length;return{...i,stats:{...o,recentActivity:p,activity:c}}}),y.forEach(i=>{ue(i.url,i.stats)});try{localStorage.setItem("sourceStats",JSON.stringify(a)),localStorage.setItem("statsLastUpdated",Date.now().toString())}catch{}return!0}return!1}catch{try{const t=localStorage.getItem("sourceStats");if(t){const n=JSON.parse(t);y=y.map(s=>{var d;const a=s.url.replace(/[^a-zA-Z0-9]/g,"_"),i=((d=n[a])==null?void 0:d.stats)||{installs:0,copies:0,activity:[]},r=Array.isArray(i.activity)?i.activity:[],o=Date.now(),c=r.filter(p=>o-p<Q).length;return{...s,stats:{...i,recentActivity:c,activity:r}}});try{const s=y.map(i=>encodeURIComponent(i.title)).join(","),a=await fetch(`https://libraryratingsdb.zxcsixx.workers.dev/api/ratings?batch=true&sources=${s}`);if(a.ok){const i=await a.json();y.forEach(r=>{const o=i[r.title]||{avg:0,total:0};ratingsMap[r.title]={avg:parseFloat(o.avg)||0,total:parseInt(o.total)||0}})}else throw new Error("Failed to fetch batch ratings")}catch(s){console.error("Error fetching batch ratings:",s),await Promise.all(y.map(async a=>{try{const r=await(await fetch(`https://libraryratingsdb.zxcsixx.workers.dev/api/ratings?source=${encodeURIComponent(a.title)}&page=1`)).json();ratingsMap[a.title]={avg:typeof r.avg=="number"?r.avg:0,total:typeof r.total=="number"?r.total:0}}catch(i){console.error(`Error fetching rating for ${a.title}:`,i),ratingsMap[a.title]={avg:0,total:0}}}))}return console.log("Using cached stats from localStorage"),!0}}catch{}return y=y.map(t=>({...t,stats:{installs:0,copies:0,recentActivity:0,activity:[]}})),!1}}function ye(e){document.querySelector("main").classList.add("blur-sm","transition-all","duration-200");const t=w.t.bind(w),n=document.createElement("div");n.className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in p-4",n.innerHTML=`
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
    `,document.body.appendChild(n);const s=()=>{document.querySelector("main").classList.remove("blur-sm"),n.remove()};n.querySelector(".cancel-btn").addEventListener("click",()=>{s(),e(!1)}),n.querySelector(".proceed-btn").addEventListener("click",()=>{s(),e(!0)}),n.querySelector(".fixed.inset-0").addEventListener("click",a=>{a.target===a.currentTarget&&(s(),e(!1))})}function ve(e){document.querySelector("main").classList.add("blur-sm","transition-all","duration-200");const t=w.t.bind(w),n=document.createElement("div");n.className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in p-4",n.innerHTML=`
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
    `,document.body.appendChild(n);const s=()=>{document.querySelector("main").classList.remove("blur-sm"),n.remove()};n.querySelector(".cancel-btn").addEventListener("click",()=>{s(),e(!1)}),n.querySelector(".proceed-btn").addEventListener("click",()=>{s(),e(!0)}),n.querySelector(".fixed.inset-0").addEventListener("click",a=>{a.target===a.currentTarget&&(s(),e(!1))})}function at(e){var x,T,C,M,U;const t=w.getCurrentLocale(),s=(((x=w.translations[t])==null?void 0:x.sources)||{})[e.title]||{title:e.title,description:e.description},a=e.status.includes("Use At Your Own Risk"),i=e.status.includes("Abandoned"),r=e.stats||{installs:0,copies:0,recentActivity:0},o=parseInt(r.recentActivity||0),c=document.createElement("div");c.className="source-card animate-fade-in rounded-xl",c.dataset.url=e.url,c.dataset.name=e.title,c.dataset.copies=((T=e.stats)==null?void 0:T.copies)||0,c.dataset.installs=((C=e.stats)==null?void 0:C.installs)||0,c.dataset.activity=((M=e.stats)==null?void 0:M.recentActivity)||0;const d=e.status.map(E=>{const B=E.toLowerCase().replace(/\s+/g,"-"),k={trusted:{color:"emerald",icon:"shield",key:"trusted",customClass:"bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/30 "},"safe-for-use":{color:"blue",icon:"check-circle",key:"safeForUse",customClass:"bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/30"},"use-at-your-own-risk":{color:"red",icon:"exclamation-triangle",key:"useAtOwnRisk",customClass:"bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/30 "},abandoned:{color:"gray",icon:"times-circle",key:"abandoned",customClass:"bg-gray-500/10 border-gray-500/20 text-gray-400 hover:bg-gray-500/20 hover:border-gray-500/30 "},nsfw:{color:"purple",icon:"exclamation-circle",key:"nsfw",customClass:"bg-purple-500/10 border-purple-500/20 text-purple-400 hover:bg-purple-500/20 hover:border-purple-500/30 "},software:{color:"indigo",icon:"code",key:"software",customClass:"bg-purple-500/10 border-purple-500/20 text-purple-400 hover:bg-purple-500/20 hover:border-purple-500/30 "}}[B]||{color:"gray",icon:"circle",key:B},q=`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs backdrop-blur-sm status-badge ${k.customClass||""}`,D=`bg-${k.color}-500/10 border border-${k.color}-500/20 text-${k.color}-400`,H=w.t(`status.${k.key}`);return`
            <span class="${k.customClass?q:`${q} ${D}`}">
                <i class="fas fa-${k.icon} text-[10px]"></i>
                ${H}
            </span>
        `}).join("");c.innerHTML=`
        <div class="group relative h-full flex flex-col overflow-hidden
                    ${i?"border-gray-500/20":a?"border-red-500/20":"border-white/5"} border
                    backdrop-blur-sm transition-all duration-300
                    hover:shadow-lg ${i?"hover:shadow-gray-500/10":a?"hover:shadow-red-500/10":"hover:shadow-emerald-500/10"}
                    bg-[#111]/40 rounded-xl ${i?"opacity-75":""}">
            
            <!-- Card background effects -->
            <div class="absolute inset-0 bg-gradient-to-b 
                        ${i?"from-gray-400/5":a?"from-red-500/5":"from-emerald-500/5"} to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <!-- Glass effect overlay - Moved before the games count -->
            <div class="absolute inset-0 backdrop-blur-sm bg-black/10"></div>
            
            <!-- Games count badge -->
            <div class="absolute mt-4 right-4 inline-flex items-center gap-1.5 px-2 py-1 z-10
                        rounded-md ${i?"bg-gray-500/10 border-gray-500/20 text-gray-400":"bg-emerald-500/10 border-emerald-500/20 text-emerald-400"} text-xs">
                <i class="fas fa-gamepad text-[10px]"></i>
                <span>${e.gamesCount}</span>
            </div>
            
            <!-- Card content -->
            <div class="relative p-4 flex-1 flex flex-col">
                <!-- Status badges -->
                <div class="flex flex-wrap gap-1.5 mb-4">
                    ${d}
                </div>

                <!-- Title and description -->
                <div class="flex items-start gap-3 flex-1">
                    <div class="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
                         ${i?"bg-gray-500/10 border-gray-500/20":a?"bg-red-500/10 border-red-500/20":"bg-emerald-500/10 border-emerald-500/20"} 
                         border group-hover:scale-110 transition-transform duration-300
                         backdrop-blur-sm">
                        <i class="fas ${i?"fa-times-circle text-gray-500/70":a?"fa-triangle-exclamation text-red-500/70":"fa-book-open text-emerald-500/70"} 
                             text-lg"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="text-base font-medium text-white group-hover:text-${i?"gray":a?"red":"emerald"}-400 
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
                            <span class="whitespace-nowrap">${ct(e.addedDate)}</span>
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
                                ${r.installs||0}
                            </span>
                            <span class="flex items-center gap-1.5">
                                <i class="fas fa-copy text-[10px]"></i>
                                ${r.copies||0}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card actions -->
            <div class="relative border-t ${i?"border-gray-400/10":a?"border-red-500/10":"border-white/5"} 
                        p-3 bg-black/30 backdrop-blur-sm">
                <div class="flex gap-2">
                    <button class="install-btn flex-1 
                                 ${i?"bg-gray-500/10 hover:bg-gray-500/20 text-gray-400 border-gray-500/20":a?"bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/20":"bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/20"}
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
                                 hover:scale-[1.02] backdrop-blur-sm" data-url="${e.url}">
                        <i class="fas fa-copy text-[10px]"></i>
                        ${w.t("common.copy")}
                    </button>
                </div>
            </div>
        </div>
    `;const p=(U=c.querySelector("[data-rating-stars-container]"))==null?void 0:U.parentElement;p&&(p.addEventListener("click",E=>{E.stopPropagation(),Ve(e)}),qe(c,e.rating));const h=c.querySelector(".install-btn"),S=c.querySelector(".copy-btn");return S&&S.addEventListener("click",async()=>{const E=async()=>{await we(e.url,"copy")&&(navigator.clipboard.writeText(e.url),S.innerHTML='<i class="fas fa-check text-[10px]"></i> '+w.t("sourceCard.copied"),setTimeout(()=>{S.innerHTML='<i class="fas fa-copy text-[10px]"></i> '+w.t("sourceCard.copy")},2e3))},B=e.title==="CPGRepacks";a||B?(B?ve:ye)(q=>{q&&E()}):E()}),h&&h.addEventListener("click",async()=>{const E=async()=>{Se(h,"loading");const k=await we(e.url,"install");if(Se(h,k?"success":"rate-limited"),k){const q=encodeURIComponent(e.url);window.location.href=`hydralauncher://install-source?urls=${q}`}},B=e.title==="CPGRepacks";e.status.includes("Use At Your Own Risk")||B?(B?ve:ye)(q=>{q&&E()}):E()}),ue(e.url,e.stats),c.dataset.copies=r.copies||0,c.dataset.installs=r.installs||0,c.dataset.activity=o,c}let Z="wide";function Ie(){const e=window.innerWidth;return e>=1536?"wide":e>=1024?"desktop":e>=640?"tablet":"mobile"}let xe;window.addEventListener("resize",()=>{clearTimeout(xe),xe=setTimeout(()=>{se();const e=Ie();if(Z!==e){const n=de(),s=X(),a=Math.ceil(n.length/s);if(Z==="wide"&&e==="desktop"){const i=(I-1)*z.desktop;I=Math.floor(i/z.desktop)+1}Z=e,I=Math.min(Math.max(1,I),a),P(n),s<X()&&window.scrollTo({top:0,behavior:"smooth"})}},100)});function be(e,t){return console.log(`Sorting sources by: ${t}`),[...e].sort((n,s)=>{var a,i,r,o,c,d,p,h,S,x,T,C;try{switch(t){case"hot":const M=((a=n.stats)==null?void 0:a.recentActivity)||0;return(((i=s.stats)==null?void 0:i.recentActivity)||0)-M;case"new":return new Date(s.addedDate||0)-new Date(n.addedDate||0);case"most-copies":const E=((r=n.stats)==null?void 0:r.copies)||0;return(((o=s.stats)==null?void 0:o.copies)||0)-E;case"most-installs":const k=((c=n.stats)==null?void 0:c.installs)||0;return(((d=s.stats)==null?void 0:d.installs)||0)-k;case"top-rated":console.log(`Comparing ratings: ${n.title} (${((p=n.rating)==null?void 0:p.avg)||0}) vs ${s.title} (${((h=s.rating)==null?void 0:h.avg)||0})`),console.log(`Full rating data for ${n.title}:`,n.rating),console.log(`Full rating data for ${s.title}:`,s.rating);const D=((S=n.rating)==null?void 0:S.avg)||0,H=((x=s.rating)==null?void 0:x.avg)||0;if(D===H){const G=((T=n.rating)==null?void 0:T.total)||0,F=((C=s.rating)==null?void 0:C.total)||0;return console.log(`Ratings equal (${D}), comparing counts: ${G} vs ${F}`),F-G}return console.log(`Sorting by rating: ${H} - ${D} = ${H-D}`),H-D;case"name-asc":return(n.title||"").localeCompare(s.title||"");case"name-desc":return(s.title||"").localeCompare(n.title||"");default:return 0}}catch(M){return console.error("Error in sort function:",M),console.error("Sort type:",t),console.error("Source A:",n),console.error("Source B:",s),0}})}function ae(e){var t;try{console.log("Updating active sort UI for:",e);const n=document.querySelector(".mobile-sort-button span");if(n){const a=((t=document.querySelector(`.sort-option[data-sort="${e}"]`))==null?void 0:t.textContent)||"Sort";n.textContent=a}document.querySelectorAll(".sort-option").forEach(a=>{const i=a.getAttribute("data-sort")===e;a.classList.toggle("bg-white/10",i),a.classList.toggle("text-white",i),a.classList.toggle("text-white/70",!i);const r=a.querySelector("i.fa-check");r&&(r.style.opacity=i?"1":"0")});const s=document.getElementById("sort-dropdown");s&&!s.classList.contains("hidden")&&s.classList.add("hidden"),localStorage.setItem("currentSort",e)}catch(n){console.error("Error updating sort UI:",n)}}function P(e=null){const t=document.getElementById("sources-container");if(t){t.innerHTML="";try{let n=e||de();console.log(`Displaying ${n.length} filtered sources`);const s=localStorage.getItem("currentSort")||"hot";if(console.log("Current sort type:",s),s){console.log("Before sorting - first few sources:",n.slice(0,3).map(d=>{var p,h;return{title:d.title,rating:d.rating,hasRating:!!((p=d.rating)!=null&&p.avg||(h=d.rating)!=null&&h.total)}}));try{n=be(n,s),console.log("After sorting - first few sources:",n.slice(0,3).map(d=>{var p,h;return{title:d.title,rating:d.rating,sortKey:s==="top-rated"?`${((p=d.rating)==null?void 0:p.avg)||0} (${((h=d.rating)==null?void 0:h.total)||0} ratings)`:d[s]||"N/A"}})),ae(s)}catch(d){console.error("Error during sorting:",d),n=be(n,"hot")}}Z=Ie();const a=X(),i=Math.ceil(n.length/a);I=Math.min(Math.max(1,I),i);const r=(I-1)*a,o=Math.min(r+a,n.length);n.slice(r,o).forEach(d=>{const p=at(d);t.appendChild(p)}),rt(i),w.updatePageContent()}catch(n){console.error("Error in displaySources:",n),t.innerHTML=`
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
        `}}}function X(){const e=window.innerWidth;return e>=2560?z.wide:e>=1024?z.desktop:e>=640?z.tablet:z.mobile}function rt(e){const t=document.getElementById("pagination");if(!t)return;let n="";n+=`
        <button onclick="changePage(${I-1})" 
                class="px-2 py-1.5 text-sm text-white/50 hover:text-white disabled:opacity-50 
                       transition-colors duration-200 rounded-md hover:bg-white/5"
                ${I===1?"disabled":""}>
            <i class="fas fa-chevron-left"></i>
        </button>
    `;for(let s=1;s<=e;s++)s===I?n+=`
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
        <button onclick="changePage(${I+1})" 
                class="px-2 py-1.5 text-sm text-white/50 hover:text-white disabled:opacity-50 
                       transition-colors duration-200 rounded-md hover:bg-white/5"
                ${I===e?"disabled":""}>
            <i class="fas fa-chevron-right"></i>
        </button>
    `,t.innerHTML=n}window.changePage=function(e){if(e<1)return;const t=de(),n=Math.ceil(t.length/X());e>n||(I=e,P(t),window.scrollTo({top:0,behavior:"smooth"}))};document.querySelectorAll(".status-filter-btn").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.status;document.querySelectorAll(".status-filter-btn").forEach(n=>{n.querySelector("div").classList.remove("bg-black/40")}),_===t?_="":(_=t,e.querySelector("div").classList.add("bg-black/40")),I=1,P(),ce(),dispatchFiltersChanged()})});document.querySelectorAll(".games-filter-btn").forEach(e=>{e.addEventListener("click",()=>{const t=parseInt(e.dataset.min),n=parseInt(e.dataset.max);if(document.querySelectorAll(".games-filter-btn div").forEach(s=>{s.classList.remove("border-emerald-500/20","bg-black/40"),s.classList.add("border-white/5","bg-black/20")}),R&&R.min===t&&R.max===n)R=null;else{R={min:t,max:n};const s=e.querySelector("div");s.classList.remove("border-white/5","bg-black/20"),s.classList.add("border-emerald-500/20","bg-black/40")}I=1,P(),ce(),ke(),dispatchFiltersChanged()})});function ce(){const e={};y.forEach(t=>{t.status.forEach(n=>{e[n]=(e[n]||0)+1})}),document.querySelectorAll(".status-filter-btn").forEach(t=>{const n=t.dataset.status,s=t.querySelector(".text-white\\/40");s&&(s.textContent=e[n]||0)}),document.querySelectorAll(".games-filter-btn").forEach(t=>{const n=parseInt(t.dataset.min),s=parseInt(t.dataset.max),a=y.filter(o=>{const c=parseInt(o.gamesCount);return c>=n&&c<=s}).length,i=t.querySelector(".text-white\\/40");i&&(i.textContent=a);const r=t.querySelector(".bg-emerald-500\\/50");if(r){const o=Math.max(...Array.from(document.querySelectorAll(".games-filter-btn")).map(d=>{const p=parseInt(d.dataset.min),h=parseInt(d.dataset.max);return y.filter(S=>{const x=parseInt(S.gamesCount);return x>=p&&x<=h}).length})),c=o>0?a/o*100:0;r.style.width=`${c}%`}})}let V="";document.getElementById("search").addEventListener("input",e=>{V=e.target.value.toLowerCase(),I=1,P()});function de(){return y.filter(e=>{const t=!V||e.title.toLowerCase().includes(V)||e.description.toLowerCase().includes(V)||e.url.toLowerCase().includes(V),n=!_||e.status.includes(_),s=parseInt(e.gamesCount),a=!R||s>=R.min&&s<=R.max;return t&&n&&a})}const Ae=document.getElementById("sort-dropdown-btn"),ee=document.getElementById("sort-dropdown"),ot=document.getElementById("current-sort");Ae.addEventListener("click",()=>{ee.classList.toggle("hidden")});document.addEventListener("click",e=>{!Ae.contains(e.target)&&!ee.contains(e.target)&&ee.classList.add("hidden")});document.querySelectorAll(".sort-option").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.sort;switch(ot.textContent=e.textContent.trim(),ee.classList.add("hidden"),t){case"high-to-low":sortGamesFilters(!1);break;case"low-to-high":sortGamesFilters(!0);break;case"most-sources":it();break;case"most-popular":lt();break}})});function it(){const e=document.querySelector(".games-filter-btn").parentNode,t=Array.from(e.querySelectorAll(".games-filter-btn"));t.sort((n,s)=>{const a=parseInt(n.querySelector(".text-white\\/40").textContent);return parseInt(s.querySelector(".text-white\\/40").textContent)-a}),t.forEach(n=>n.remove()),t.forEach(n=>e.appendChild(n))}function lt(){const e=JSON.parse(localStorage.getItem("sourceStats")||"{}"),t=document.querySelector(".games-filter-btn").parentNode,n=Array.from(t.querySelectorAll(".games-filter-btn"));n.sort((s,a)=>{var h,S;const i=((h=y.find(x=>x.gamesCount===s.dataset.min))==null?void 0:h.url)||"",r=((S=y.find(x=>x.gamesCount===a.dataset.min))==null?void 0:S.url)||"",o=e[i]||{installs:0,copies:0},c=e[r]||{installs:0,copies:0},d=o.installs+o.copies;return c.installs+c.copies-d}),n.forEach(s=>s.remove()),n.forEach(s=>t.appendChild(s))}function ct(e){const t=new Date(e),s=Math.abs(new Date-t),a=Math.floor(s/(1e3*60*60*24)),i=w.t.bind(w);if(a===0)return i("common.date.today");if(a===1)return i("common.date.yesterday");if(a<30)return i("common.date.daysAgo",{days:a});{const r={year:"numeric",month:"short",day:"numeric"};return t.toLocaleDateString(w.getCurrentLocale(),r)}}function $e(){var n;document.querySelectorAll(".filter-section").forEach(s=>{const a=s.querySelector("button[data-section]"),i=s.querySelector(".filter-content");i.style.maxHeight="0",i.style.display="none",a.setAttribute("aria-expanded","false"),a.removeAttribute("data-expanded")});const e=(n=document.querySelector('.filter-section button[data-section="status"]'))==null?void 0:n.closest(".filter-section");if(e){const s=e.querySelector("button[data-section]"),a=e.querySelector(".filter-content"),i=s.querySelector("i.fa-chevron-down");a.style.display="flex";const r=a.scrollHeight+"px";a.style.maxHeight="0",a.offsetHeight,a.style.maxHeight=r,s.setAttribute("aria-expanded","true"),s.setAttribute("data-expanded","true"),i&&(i.style.transform="rotate(180deg)")}document.querySelectorAll(".filter-section button[data-section]").forEach(s=>{s.addEventListener("click",a=>{a.preventDefault();const r=s.closest(".filter-section").querySelector(".filter-content"),o=s.getAttribute("aria-expanded")==="true";s.setAttribute("aria-expanded",!o);const c=s.querySelector("i.fa-chevron-down");if(o){r.style.maxHeight="0",r.style.opacity="0",s.setAttribute("data-expanded","false");const d=s.querySelector("i.fa-chevron-down");d&&(d.style.transform="rotate(0deg)");const p=()=>{r.style.maxHeight==="0px"&&(r.style.display="none"),r.removeEventListener("transitionend",p)};r.addEventListener("transitionend",p,{once:!0})}else{(r.style.display==="none"||!r.style.display)&&(r.style.display="flex",r.offsetHeight);const d=r.scrollHeight+"px";r.style.maxHeight=d,r.style.opacity="1",s.setAttribute("data-expanded","true"),c&&(c.style.transform="rotate(180deg)")}}),s.addEventListener("keydown",a=>{(a.key==="Enter"||a.key===" ")&&(a.preventDefault(),s.click())})});let t;window.addEventListener("resize",()=>{clearTimeout(t),t=setTimeout(()=>{document.querySelectorAll('.filter-section button[aria-expanded="true"]').forEach(s=>{const a=s.nextElementSibling;a&&a.style.display!=="none"&&(a.style.maxHeight=a.scrollHeight+"px")})},100)})}document.addEventListener("DOMContentLoaded",()=>{Te(),sortGamesFilters(!1),$e()});Ke.addEventListener("click",()=>{N.classList.remove("hidden"),document.body.style.overflow="hidden"});Ce.addEventListener("click",()=>{N.classList.add("hidden"),document.body.style.overflow=""});N.addEventListener("click",e=>{e.target===N&&Ce.click()});document.addEventListener("keydown",e=>{e.key==="Escape"&&!N.classList.contains("hidden")&&(N.classList.add("hidden"),document.body.style.overflow="")});Ze.addEventListener("click",()=>{j.classList.remove("hidden"),document.body.style.overflow="hidden"});Qe.addEventListener("click",()=>{j.classList.add("hidden"),document.body.style.overflow=""});j.addEventListener("click",e=>{e.target===j&&(j.classList.add("hidden"),document.body.style.overflow="")});document.addEventListener("keydown",e=>{e.key==="Escape"&&(N.classList.contains("hidden")||(N.classList.add("hidden"),document.body.style.overflow=""),j.classList.contains("hidden")||(j.classList.add("hidden"),document.body.style.overflow=""))});function te(e,t,n){const s=new Date;s.setTime(s.getTime()+n*24*60*60*1e3),document.cookie=`${e}=${t};expires=${s.toUTCString()};path=/`}function Me(e){const t=e+"=",n=document.cookie.split(";");for(let s=0;s<n.length;s++){let a=n[s];for(;a.charAt(0)===" ";)a=a.substring(1,a.length);if(a.indexOf(t)===0)return a.substring(t.length,a.length)}return null}async function we(e,t){try{const n=e.replace(/[^a-zA-Z0-9]/g,"_"),s=`${t}_${n}`;if(Me(s))return!0;let a={installs:0,copies:0,activity:[],recentActivity:0};try{const r=new Promise((T,C)=>setTimeout(()=>C(new Error("Firebase request timed out")),3e3)),o=oe(ie,`sources/${n}/stats`),c=le(o),p=(await Promise.race([c,r])).val()||{installs:0,copies:0,activity:[]},h=Date.now(),x=(Array.isArray(p.activity)?p.activity:[]).filter(T=>h-T<Q);x.push(h),a={installs:parseInt(p.installs||0)+(t==="install"?1:0),copies:parseInt(p.copies||0)+(t==="copy"?1:0),activity:x,recentActivity:x.length,lastUpdated:h},await Promise.race([Ee(o,a),new Promise((T,C)=>setTimeout(()=>C(new Error("Update timed out")),3e3))]);try{const T=localStorage.getItem("sourceStats");if(T){const C=JSON.parse(T);C[n]||(C[n]={}),C[n].stats=a,localStorage.setItem("sourceStats",JSON.stringify(C)),localStorage.setItem("statsLastUpdated",h.toString())}}catch{}}catch{console.log("Firebase update failed, continuing with local data");const o=y.find(c=>c.url===e);if(o&&o.stats){a={installs:parseInt(o.stats.installs||0)+(t==="install"?1:0),copies:parseInt(o.stats.copies||0)+(t==="copy"?1:0),activity:[],recentActivity:1,lastUpdated:Date.now()};try{const c=localStorage.getItem("sourceStats");if(c){const d=JSON.parse(c);d[n]||(d[n]={}),d[n].stats=a,localStorage.setItem("sourceStats",JSON.stringify(d)),localStorage.setItem("statsLastUpdated",Date.now().toString())}}catch{}}}te(s,"true",t==="install"?.003472222:347222e-9),ue(e,a);const i=y.findIndex(r=>r.url===e);return i!==-1&&(y[i].stats=a),!0}catch{return!1}}function ue(e,t=null){const n=document.querySelectorAll(".source-card"),s=Array.from(n).find(a=>a.dataset.url===e);if(s){const a=s.querySelector(".source-stats");if(a){const i=parseInt((t==null?void 0:t.installs)||0),r=parseInt((t==null?void 0:t.copies)||0),o=parseInt((t==null?void 0:t.recentActivity)||0);a.innerHTML=`
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
                    ${r}
                </span>
            `}s.dataset.copies=(t==null?void 0:t.copies)||0,s.dataset.installs=(t==null?void 0:t.installs)||0,s.dataset.activity=(t==null?void 0:t.recentActivity)||0}}function Se(e,t){const n=e.innerHTML;switch(t){case"loading":e.disabled=!0,e.innerHTML=`
                <div class="flex items-center gap-1.5">
                <div class="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                    <span>Installing...</span>
                </div>
            `;break;case"success":e.innerHTML=`
                <div class="flex items-center gap-1.5">
                    <i class="fas fa-check text-[10px]"></i>
                    Installed
                </div>
            `,setTimeout(()=>{e.disabled=!1,e.innerHTML=n},2e3);break;case"rate-limited":e.innerHTML=`
                <div class="flex items-center gap-1.5 text-amber-400">
                    <i class="fas fa-clock text-[10px]"></i>
                    Please wait
                </div>
            `,setTimeout(()=>{e.disabled=!1,e.innerHTML=n},2e3);break;default:e.disabled=!1,e.innerHTML=n}}function dt(){const e=document.getElementById("cookie-consent");Me("cookie-consent")?e.style.display="none":(e.style.display="block",setTimeout(()=>{e.classList.remove("translate-y-full")},500))}document.getElementById("accept-cookies").addEventListener("click",()=>{const e=document.getElementById("cookie-consent");e.classList.add("translate-y-full"),e.addEventListener("transitionend",()=>{e.style.display="none"},{once:!0}),te("cookie-consent","accepted",365)});async function ut(e){try{const t=oe(ie,`sources/${e}/stats`),s=(await le(t)).val();if(s&&s.activity){const a=s.activity.filter(i=>Date.now()-i<Q);a.length!==s.activity.length&&await Ee(t,{activity:a})}}catch{}}function mt(){const e=document.getElementById("suggest-modal"),t=document.getElementById("suggest-btn"),n=document.getElementById("close-suggest");t&&t.addEventListener("click",()=>{e.classList.remove("hidden")}),n&&n.addEventListener("click",()=>{e.classList.add("hidden")}),e&&e.addEventListener("click",s=>{s.target===e&&e.classList.add("hidden")})}function gt(){const e=document.getElementById("search");if(e){const t=()=>{const s=window.innerWidth<640?"header.searchMobile":"header.search";e.placeholder=w.t(s)};t(),window.addEventListener("resize",t),document.addEventListener("languageChanged",t)}}function ft(){setInterval(()=>{y.forEach(e=>{const t=e.url.replace(/[^a-zA-Z0-9]/g,"_");ut(t)})},60*60*1e3)}async function pt(e){const t=y.find(n=>n.title===e);if(t&&t.rating){const n={avg:parseFloat(t.rating.avg||0),total:parseInt(t.rating.total||0)};return re(e,n),!0}return ht()}async function ht(){if(!y||y.length===0)return!1;const e="hydra_ratings_cache",t=5*60*1e3,n=()=>{try{const r=localStorage.getItem(e);if(!r)return null;const{timestamp:o,data:c}=JSON.parse(r);if(Date.now()-o<t)return c}catch(r){console.error("Error reading from cache:",r)}return null},s=r=>{try{localStorage.setItem(e,JSON.stringify({timestamp:Date.now(),data:r}))}catch(o){console.error("Error saving to cache:",o)}},a=n();if(a)return console.log("Using cached ratings data"),y.forEach(r=>{const o=a[r.title]||{avg:0,total:0};r.rating={avg:parseFloat(o.avg)||0,total:parseInt(o.total)||0},re(r.title,r.rating)}),!0;console.log("Fetching fresh ratings data...");const i=[...new Set(y.map(r=>r.title))];if(i.length===0)return!1;try{const r="https://libraryratingsdb.zxcsixx.workers.dev/api/ratings/batch";console.log("Making batch API request to:",r);const o=await fetch(r,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({sources:i,fields:["avg","total"]})});if(console.log("Batch response status:",o.status),!o.ok)return console.error("Failed to fetch batch ratings:",o.status,o.statusText),!1;const c=await o.json();return console.log("Received batch ratings data for",Object.keys(c).length,"sources"),s(c),y.forEach(d=>{const p=c[d.title]||{avg:0,total:0};d.rating={avg:parseFloat(p.avg)||0,total:parseInt(p.total)||0},re(d.title,d.rating)}),!0}catch(r){return console.error("Error in updateAllSourceRatings:",r),!1}}function re(e,t){document.querySelectorAll(".source-card").forEach(s=>{s.dataset.name===e&&qe(s,t)})}function qe(e,t){console.log("Updating card rating display for:",e.dataset.name,"with data:",JSON.stringify(t,null,2));const n=e.querySelector("[data-rating-stars-active]"),s=e.querySelector("[data-rating-avg]"),a=e.querySelector("[data-rating-total]"),i=e.querySelector("[data-rating-comment]");if(console.log("Found elements:",{starsActive:!!n,avgEl:!!s,totalEl:!!a,commentEl:!!i}),n&&s&&a)if(t&&(typeof t.avg=="number"||t.avg===0)){const r=t.avg/5*100,o=Math.round(r/10)*10;console.log(`Setting rating: avg=${t.avg}, total=${t.total}, starPercentage=${r}%, rounded=${o}%`),n.style.width=`${o}%`,s.textContent=t.avg>0?t.avg.toFixed(1):"–",a.textContent=t.total>0?`(${t.total})`:"",i&&(i.style.display=t.total>0?"inline-block":"none",console.log(`Comment icon display set to: ${i.style.display}`))}else console.log("No valid rating data, setting default state"),n.style.width="0%",s.textContent="–",a.textContent="",i&&(i.style.display="none");else console.error("Missing required rating elements on card:",{starsActive:!!n,avgEl:!!s,totalEl:!!a})}window.updateSourceCardRating=pt;document.addEventListener("languageChanged",()=>{P()});
