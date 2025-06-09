import{c as Ne,i as w,r as oe,d as ie,g as le,u as Se}from"./index-CmcAeWeb.js";import{c as _e}from"./changelog-notification-8kuqAdG1.js";const fe="https://libraryratingsdb.zxcsixx.workers.dev/api/ratings",je=5*60*1e3,pe={data:{},lastUpdated:{},get:function(e){const t=this.data[e],n=this.lastUpdated[e];return t&&n&&Date.now()-n<je?Promise.resolve(t):null},set:function(e,t){return this.data[e]=t,this.lastUpdated[e]=Date.now(),t},batchGet:function(e){const t={cached:{},uncached:[]};return e.forEach(n=>{const s=this.get(n);s?t.cached[n]=s:t.uncached.push(n)}),t},batchSet:function(e){Object.entries(e).forEach(([t,n])=>{this.set(t,n)})}};function Ue(e){const t=new Date(e),s=Math.floor((new Date-t)/1e3);let a=Math.floor(s/31536e3);return a>=1?a+" year"+(a===1?"":"s")+" ago":(a=Math.floor(s/2592e3),a>=1?a+" month"+(a===1?"":"s")+" ago":(a=Math.floor(s/86400),a>=1?a+" day"+(a===1?"":"s")+" ago":(a=Math.floor(s/3600),a>=1?a+" hour"+(a===1?"":"s")+" ago":(a=Math.floor(s/60),a>=1?a+" minute"+(a===1?"":"s")+" ago":"just now"))))}function W(e){return String(e).replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}async function Oe(){var e;try{const n=[navigator.userAgent,navigator.language,screen.width,screen.height,navigator.platform,new Date().getTimezoneOffset(),!!navigator.cookieEnabled,navigator.hardwareConcurrency||0,navigator.deviceMemory||0,screen.colorDepth,((e=window.screen.orientation)==null?void 0:e.type)||""].join("|"),s=new TextEncoder().encode(n),a=await crypto.subtle.digest("SHA-256",s),o=Array.from(new Uint8Array(a)).map(r=>r.toString(16).padStart(2,"0")).join("");return sessionStorage.setItem("hydra_rating_hash",o),localStorage.getItem("hydra_rating_hash")||localStorage.setItem("hydra_rating_hash",o),o}catch(t){return console.error("Error generating user hash:",t),Math.random().toString(36).slice(2)+Date.now().toString(36)}}function ze(e){const n=`rating_submission_${e}`,s=localStorage.getItem(n);if(!s)return!0;const a=parseInt(s,10),i=Date.now(),o=60*60*1e3;return i-a>o}function Ge(e){const t=`rating_submission_${e}`;localStorage.setItem(t,Date.now().toString())}function Je(e){document.querySelectorAll(".rating-modal").forEach(l=>l.remove());const t=document.createElement("div");t.className="rating-modal fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4",t.innerHTML=`
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
  `,document.head.appendChild(n);const s=()=>{window.turnstile?window.turnstile.render(".cf-turnstile",{sitekey:"0x4AAAAAABgPUEsL6w8fjG-Z",callback:window.onTurnstileSuccess,"expired-callback":window.onTurnstileExpired,"error-callback":window.onTurnstileError,theme:"dark"}):setTimeout(s,100)};s(),t.querySelector(".close-rating-modal").onclick=h,t.querySelector(".fixed.inset-0").onclick=l=>{l.target===t.querySelector(".fixed.inset-0")&&h()};async function a(l,u="en"){return new Promise((f,g)=>{const m=JSON.stringify({translate:"rapidapi"}),b=new XMLHttpRequest;b.withCredentials=!0,b.addEventListener("readystatechange",function(){if(this.readyState===this.DONE)try{const v=JSON.parse(this.responseText);if(v&&v.translation)f(v.translation);else throw v&&v.status!==200?new Error(v.business_message||"Translation service error"):new Error("Invalid response from translation service")}catch(v){console.error("Translation error:",v,this.responseText),g(v)}}),b.addEventListener("error",()=>{g(new Error("Network error during translation"))});const A=`https://free-google-translator.p.rapidapi.com/external-api/free-google-translator?from=auto&to=${u}&query=${encodeURIComponent(l)}`;b.open("POST",A),b.setRequestHeader("x-rapidapi-key",""),b.setRequestHeader("x-rapidapi-host","free-google-translator.p.rapidapi.com"),b.setRequestHeader("Content-Type","application/json"),b.send(m)})}function i(l,u,f){const g=l.parentNode.querySelector(".translation-dropdown");if(g){g.remove();return}const m=document.createElement("div");m.className="translation-dropdown absolute z-10 mt-1 w-24 bg-gray-800 rounded-md shadow-lg border border-gray-700",m.style.top="100%",m.style.right="0",[{code:"en",name:"English"},{code:"ru",name:"Русский"},{code:"pt",name:"Português"}].forEach(v=>{const L=document.createElement("button");L.className="block w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-gray-700",L.textContent=v.name,L.dataset.lang=v.code,L.type="button",m.appendChild(L)}),l.parentNode.style.position="relative",l.parentNode.appendChild(m);const A=v=>{!m.contains(v.target)&&v.target!==l&&(m.remove(),document.removeEventListener("click",A))};setTimeout(()=>{document.addEventListener("click",A)},0),m.addEventListener("click",async v=>{const L=v.target.dataset.lang;L&&(m.remove(),await o(l,u,f,L))})}async function o(l,u,f,g){l.innerHTML,l.innerHTML='<i class="fas fa-spinner fa-spin text-xs"></i>',l.title="Translating...",l.disabled=!0;try{const m=await a(f,g);u.textContent=m,l.innerHTML='<i class="fas fa-undo text-xs"></i><span class="hidden sm:inline">Original</span>',l.classList.add("active"),l.title="Show original text",l.setAttribute("data-original",f)}catch(m){console.error("Translation failed:",m),u.textContent=f,l.innerHTML='<i class="fas fa-exclamation-triangle text-xs"></i><span class="hidden sm:inline">Error</span>',l.title="Error translating. Click to try again."}finally{l.disabled=!1}}function r(l){const u=l.target.closest(".translate-comment");if(!u||u.disabled)return;l.preventDefault(),l.stopPropagation();const f=u.closest(".border-b"),g=f?f.querySelector(".comment-text p"):null;if(!g){console.error("Could not find comment text element");return}let m=u.getAttribute("data-original");if(u.classList.contains("active")){m&&(g.textContent=m,u.innerHTML='<i class="fas fa-language text-xs"></i><span class="hidden sm:inline">Translate</span>',u.classList.remove("active"),u.title="Translate this review",u.removeAttribute("data-original")),u.disabled=!1;return}m=g.textContent.trim(),i(u,g,m)}const d=t.querySelector("#rating-comments-list");d&&d.addEventListener("click",r);const c=t.querySelector('textarea[name="comment"]'),p=t.querySelector(".char-count");if(c&&p){const l=()=>{p.textContent=c.value.length};c.addEventListener("input",l),l(),t._cleanupCharCounter=()=>{c.removeEventListener("input",l)}}function h(){t._cleanupCharCounter&&t._cleanupCharCounter(),t.remove(),document.body.style.overflow=""}const E=5*60*1e3;let x=1,k="recent",C=0,q=!1,$=0,S=e.title;function T(){const l=`ratings_${encodeURIComponent(S)}`,u=localStorage.getItem(l);if(!u)return null;try{const{data:f,timestamp:g}=JSON.parse(u);if(Date.now()-g<E)return f}catch(f){console.warn("Error reading cache:",f)}return null}function P(l){try{const u=`ratings_${encodeURIComponent(S)}`,f={data:l,timestamp:Date.now()};localStorage.setItem(u,JSON.stringify(f))}catch(u){console.warn("Error saving to cache:",u)}}async function z(l=1,u=!1){if(q)return;const f=t.querySelector("#rating-comments-list");if(!f)return;f.innerHTML='<div class="flex justify-center items-center py-6"><div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-400"></div></div>';const g=u?null:T();if(g){console.log("Using cached data for:",S),B(g,l),Date.now()-$>E&&G(!0);return}await G()}function B(l,u=1){const f=t.querySelector("#rating-comments-list");if(f){if(f.innerHTML="",l.avg!==void 0){const g=parseFloat(l.avg).toFixed(1),m=parseInt(l.total)||0,b=t.querySelector("#rating-modal-stars"),A=t.querySelector("#rating-modal-avg"),v=t.querySelector("#rating-modal-total");if(b){b.innerHTML="";const L=Math.round(parseFloat(l.avg));b.innerHTML="★".repeat(L)+"☆".repeat(5-L)}A&&(A.textContent=`${g} out of 5`),v&&(v.textContent=`${m} ${m===1?"review":"reviews"}`)}if(!l.comments||l.comments.length===0){f.innerHTML=`
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
          <span class="text-xs text-gray-500">${Ue(b)}</span>
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
      `,f.appendChild(m)})}}function j(){const l=t.querySelector(".pagination");if(!l)return;const u=Math.ceil(C/10);let f=`
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
    `;l.innerHTML=f}window.loadPage=l=>{if(!M||!M.comments)return;const u=Math.ceil(M.comments.length/10);l<1||l>u||(x=l,H())},t._vm={loadPage:window.loadPage};async function G(l=!1){var b,A;if(q)return;q=!0;const u=t.querySelector("#rating-comments-list");!l&&u&&(u.innerHTML='<div class="text-center py-4 text-gray-400">Loading comments...</div>');const f=`comments_${S}`,g=5*60*1e3,m=pe.get(f);if(m&&Date.now()-m.timestamp<g){M=m,H(),q=!1;return}try{const v=await fetch(`${fe}?source=${encodeURIComponent(S)}&all=true`);if(!v.ok)throw new Error(`Failed to fetch comments: ${v.statusText}`);const L=await v.json();M={...L,comments:L.comments||[],pagination:{total:((b=L.comments)==null?void 0:b.length)||0,page:1,totalPages:1,perPage:((A=L.comments)==null?void 0:A.length)||0}},pe.set(f,{...M,timestamp:Date.now()}),$=Date.now(),H()}catch(v){console.error("Error fetching comments:",v),m?(M=m,H()):!l&&u&&(u.innerHTML=`
          <div class="text-red-500 text-center py-4">
            Failed to load comments. Please try again later.
            ${v.message?`<div class="text-xs mt-1">${v.message}</div>`:""}
          </div>
        `)}finally{q=!1}}function H(){if(!M||!M.comments)return;const l=qe([...M.comments],k),u=10,f=Math.ceil(l.length/u),g=(x-1)*u,m=l.slice(g,g+u);M.pagination={total:l.length,page:x,totalPages:f,perPage:u},B({...M,comments:m,pagination:M.pagination},x)}let M=null;function qe(l,u){if(!l)return[];const f=[...l];switch(u){case"recent":return f.sort((g,m)=>{const b=g.timestamp?new Date(g.timestamp).getTime():0;return(m.timestamp?new Date(m.timestamp).getTime():0)-b});case"high":return f.sort((g,m)=>(m.rating||0)-(g.rating||0));case"low":return f.sort((g,m)=>(g.rating||0)-(m.rating||0));default:return f}}function Pe(){const l=t.querySelector("#rating-sort-select");l&&l.addEventListener("change",u=>{k=u.target.value,x=1,H()})}Pe(),z(),z();const Y=t.querySelector("#submit-rating-form"),J=t.querySelector("#rating-form-error"),U=Y.querySelector('button[type="submit"]');U.disabled=!1,Y.onsubmit=async l=>{var u;l.preventDefault(),J.textContent="",J.className="mt-1 text-red-400 text-xs min-h-[20px] bg-red-900/30 rounded py-1.5 px-2 border border-red-900/20";try{const f=new FormData(Y),g=(f.get("nickname")||"").trim(),m=f.get("rating"),b=(f.get("comment")||"").trim(),A=(u=document.querySelector('[name="cf-turnstile-response"]'))==null?void 0:u.value;if(!A)throw new Error("Please complete the CAPTCHA verification");if(!ze(S)){const Be=`rating_submission_${S}`,Re=parseInt(localStorage.getItem(Be)||"0",10),He=Date.now(),Fe=60*60*1e3,ge=Math.ceil((Re+Fe-He)/6e4);throw new Error(`You can only submit one review per hour. Please try again in ${ge} minute${ge!==1?"s":""}.`)}if(!g)throw new Error("Please enter a nickname");if(!m||isNaN(m)||m<1||m>5)throw new Error("Please select a valid rating between 1 and 5");if(!b||b.split(/\s+/).length<3)throw new Error("Please enter a message with at least 3 words");U.disabled=!0,U.innerHTML='<i class="fas fa-spinner fa-spin mr-2"></i> Submitting...',J.classList.add("hidden");const v=await Oe();Ge(S);const L={source:S,nickname:g,rating:Number(m),message:b,ipHash:v,turnstileResponse:A||""},me=await fetch(fe,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(L)}),De=await me.json();if(!me.ok)throw new Error(De.error||"Failed to submit rating");Ve("Rating submitted successfully! It will be visible after moderation.","success"),setTimeout(h,1500),Y.reset(),window.turnstile&&window.turnstile.reset()}catch(f){console.error("Error submitting rating:",f),J.textContent=f.message||"Failed to submit rating. Please try again.",J.classList.remove("hidden"),window.turnstile&&window.turnstile.reset()}finally{U&&(U.disabled=!1,U.innerHTML='<i class="fas fa-paper-plane mr-2"></i> Submit Review')}}}function Ve(e,t="success"){const n=document.createElement("div");n.className="fixed top-4 right-4 bg-emerald-500/90 text-white px-4 py-3 rounded-lg text-sm font-medium shadow-lg z-[10001] animate-fade-in flex items-center gap-2",n.innerHTML=`
    <i class="fas fa-check-circle"></i>
    <span>${e}</span>
  `;const s=document.querySelector(".rating-modal");s?s.appendChild(n):document.body.appendChild(n),setTimeout(()=>{n.remove()},3e3)}console.log("Changelog notification system loaded:",_e);document.body.classList.add("preloading");document.addEventListener("DOMContentLoaded",async()=>{await Ne.initialize()});function Ye(){const e=document.getElementById("preloader"),t=e.querySelector(".loading-progress"),n=e.querySelector(".loading-percentage");let s=0;const a=()=>{const i=100-s,o=Math.min(i*.1,Math.max(.2,Math.random()*.8));s=Math.min(100,s+o),t.style.width=`${s}%`;const r=s<100?s.toFixed(1):Math.round(s);n.textContent=`${r}%`,s<30?n.className="loading-percentage text-sm font-medium text-white/70":s<60?n.className="loading-percentage text-sm font-medium text-emerald-400/70":n.className="loading-percentage text-sm font-medium text-emerald-400",s<100?requestAnimationFrame(a):setTimeout(()=>{e.classList.add("hiding"),e.addEventListener("transitionend",()=>{e.remove(),document.body.classList.remove("preloading"),w.updatePageContent(),ne()},{once:!0})},1e3)};w.updatePageContent(),ne(),setTimeout(()=>{e&&document.body.contains(e)&&(console.log("Preloader safety timeout triggered"),e.classList.add("hiding"),setTimeout(()=>{e.remove(),document.body.classList.remove("preloading")},400))},4e3),setTimeout(()=>{requestAnimationFrame(a)},300)}function ne(){const e=document.getElementById("language-switcher"),t=document.getElementById("language-dropdown");if(!e||!t)return;const n=e.cloneNode(!0);e.parentNode.replaceChild(n,e);const s=w.getCurrentLocale(),a=n.querySelector("span");if(a){const r={en:"English",ru:"Русский","pt-br":"Português"};a.textContent=r[s]||"English"}n.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),t.classList.contains("hidden")?(t.classList.remove("hidden"),n.classList.add("bg-white/10")):(t.classList.add("hidden"),n.classList.remove("bg-white/10"))}),t.querySelectorAll("button").forEach(r=>{r.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation();const c=r.dataset.lang;if(w.setLocale(c),t.classList.add("hidden"),n.classList.remove("bg-white/10"),a){const p={en:"English",ru:"Русский","pt-br":"Português"};a.textContent=p[c]||"English"}D()})}),document.addEventListener("click",r=>{n.contains(r.target)||(t.classList.add("hidden"),n.classList.remove("bg-white/10"))});const o=()=>{const r=e.querySelector("span"),d={en:"English",ru:"Русский","pt-br":"Português"};r.textContent=d[w.currentLocale]||"English"};document.addEventListener("languageChanged",o)}document.addEventListener("DOMContentLoaded",()=>{try{Ye()}catch(i){console.error("Error initializing preloader:",i);const o=document.getElementById("preloader");o&&o.remove(),document.body.classList.remove("preloading"),w.updatePageContent(),ne()}ct();const e=document.getElementById("accept-cookies"),t=document.getElementById("reject-cookies"),n=document.getElementById("cookie-consent");e&&e.addEventListener("click",()=>{s(),te("cookie-consent","accepted",365)}),t&&t.addEventListener("click",()=>{s(),te("cookie-consent","rejected",365)});function s(){n.classList.add("translate-y-full"),n.addEventListener("transitionend",()=>{n.style.display="none"},{once:!0})}Ee(),Ae(),setTimeout(()=>{ke()},300),ut(),mt(),gt(),se(),Xe(),initializeMobileFilters();let a;window.addEventListener("resize",()=>{clearTimeout(a),a=setTimeout(()=>{se()},100)})});function Ee(){try{console.log("Initializing sorting..."),document.querySelectorAll(".sort-option").forEach(t=>{t.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation();const s=t.getAttribute("data-sort");if(console.log("Sort option clicked:",s),s){ae(s);const a=document.getElementById("mobile-filters");a&&!a.classList.contains("hidden")&&(a.classList.add("hidden"),document.body.style.overflow="auto"),D()}})});const e=localStorage.getItem("currentSort")||"hot";console.log("Initial sort type:",e),ae(e),console.log("Sorting initialized with type:",e)}catch(e){console.error("Error initializing sorting:",e)}}let y=[],N="",R=null,I=1;const O={mobile:4,tablet:6,desktop:9,wide:15},F=document.getElementById("about-modal"),We=document.getElementById("about-btn"),Le=document.getElementById("close-about"),_=document.getElementById("suggest-modal"),Ke=document.getElementById("suggest-btn"),Ze=document.getElementById("close-suggest"),Q=24*60*60*1e3;document.getElementById("mobile-filters-btn");document.getElementById("mobile-filters-modal");document.getElementById("close-mobile-filters");document.getElementById("mobile-filters-content");document.getElementById("reset-filters");document.getElementById("apply-filters");const K=document.getElementById("active-filters-count"),Qe={tablet:768};function se(){var s;const e=document.getElementById("filters-sidebar"),t=(s=document.getElementById("mobile-filters-btn"))==null?void 0:s.parentElement;if(!e||!t)return;const n=window.innerWidth<Qe.tablet;e.classList.toggle("hidden",n),t.classList.toggle("hidden",!n)}function Xe(){const e=document.getElementById("mobile-filters-btn"),t=document.getElementById("mobile-filters-modal"),n=t==null?void 0:t.querySelector(".flex.flex-col.bg-\\[\\#111\\]"),s=t==null?void 0:t.querySelector(".bg-\\[\\#0A0A0A\\]");if(!e||!t||!n||!s)return;function a(){t.classList.remove("hidden"),t.offsetHeight,s.classList.add("opacity-100"),n.classList.remove("translate-y-full"),document.body.classList.add("overflow-hidden")}function i(){s.classList.remove("opacity-100"),n.classList.add("translate-y-full"),setTimeout(()=>{t.classList.add("hidden"),document.body.classList.remove("overflow-hidden")},300)}e.addEventListener("click",c=>{c.preventDefault(),a()});const o=document.getElementById("close-mobile-filters");o&&o.addEventListener("click",c=>{c.preventDefault(),i()}),t.addEventListener("click",c=>{c.target===t&&i()}),document.addEventListener("keydown",c=>{c.key==="Escape"&&!t.classList.contains("hidden")&&i()});const r=document.getElementById("reset-filters");r&&r.addEventListener("click",c=>{c.preventDefault(),tt(),Ce()});const d=document.getElementById("apply-filters");d&&d.addEventListener("click",c=>{c.preventDefault(),i(),D()})}function Ce(){const e=et();K&&(e>0?(K.textContent=`${e} active`,K.classList.remove("hidden")):K.classList.add("hidden"))}function et(){let e=0;return N&&e++,R&&e++,localStorage.getItem("currentSort")&&e++,e}function tt(){N="",R=null,localStorage.removeItem("currentSort"),document.querySelectorAll(".status-filter-btn div").forEach(e=>{e.classList.remove("bg-black/40")}),document.querySelectorAll(".games-filter-btn div").forEach(e=>{e.classList.remove("border-emerald-500/20","bg-black/40"),e.classList.add("border-white/5","bg-black/20")}),document.querySelectorAll(".sort-option").forEach(e=>{e.classList.remove("bg-white/10","text-white"),e.classList.add("text-white/70")}),D()}async function ke(){try{y=(await(await fetch("data/resources.json")).json()).sources;const n="hydra_ratings_cache",s=5*60*1e3,a=()=>{try{const r=localStorage.getItem(n);if(!r)return null;const{timestamp:d,data:c}=JSON.parse(r);if(Date.now()-d<s)return c}catch(r){console.error("Error reading from cache:",r)}return null},i=r=>{try{localStorage.setItem(n,JSON.stringify({timestamp:Date.now(),data:r}))}catch(d){console.error("Error saving to cache:",d)}},o=a();if(o)console.log("Using cached ratings data"),y.forEach(r=>{const d=o[r.title]||{avg:0,total:0};r.rating={avg:parseFloat(d.avg)||0,total:parseInt(d.total)||0}});else{console.log("Fetching fresh ratings data...");try{const r=[...new Set(y.map(h=>h.title))];console.log(`Fetching ratings for ${r.length} sources`);const d=`https://libraryratingsdb.zxcsixx.workers.dev/api/ratings?batch=true&sources=${r.map(encodeURIComponent).join(",")}`;console.log("Batch API URL:",d);const c=await fetch(d);if(console.log("Batch response status:",c.status),!c.ok)throw new Error(`HTTP error! status: ${c.status}`);const p=await c.json();console.log("Received batch ratings data"),i(p),y.forEach(h=>{const E=p[h.title]||{avg:0,total:0};h.rating={avg:parseFloat(E.avg)||0,total:parseInt(E.total)||0}}),console.log("All ratings loaded via batch endpoint")}catch(r){console.error("Error in batch ratings fetch:",r),y.forEach(d=>{d.rating={avg:0,total:0}})}}Ee(),ce(),D();try{await nt()}finally{setTimeout(()=>{const r=document.getElementById("preloader");r&&(r.style.opacity="0",setTimeout(()=>{r.style.display="none",D()},300))},500)}}catch(e){console.error("Error loading sources:",e);const t=document.getElementById("sources-container");t&&(t.innerHTML=`
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
            `);const n=document.getElementById("preloader");n&&(n.style.opacity="0",setTimeout(()=>{n.style.display="none"},300))}}async function nt(){try{const e=new Promise((i,o)=>setTimeout(()=>o(new Error("Firebase request timed out")),5e3)),t=oe(ie,"sources"),n=le(t),a=(await Promise.race([n,e])).val();if(a){y=y.map(i=>{var h;const o=i.url.replace(/[^a-zA-Z0-9]/g,"_"),r=((h=a[o])==null?void 0:h.stats)||{installs:0,copies:0,activity:[]},d=Array.isArray(r.activity)?r.activity:[],c=Date.now(),p=d.filter(E=>c-E<Q).length;return{...i,stats:{...r,recentActivity:p,activity:d}}}),y.forEach(i=>{ue(i.url,i.stats)});try{localStorage.setItem("sourceStats",JSON.stringify(a)),localStorage.setItem("statsLastUpdated",Date.now().toString())}catch{}return!0}return!1}catch{try{const t=localStorage.getItem("sourceStats");if(t){const n=JSON.parse(t);y=y.map(s=>{var c;const a=s.url.replace(/[^a-zA-Z0-9]/g,"_"),i=((c=n[a])==null?void 0:c.stats)||{installs:0,copies:0,activity:[]},o=Array.isArray(i.activity)?i.activity:[],r=Date.now(),d=o.filter(p=>r-p<Q).length;return{...s,stats:{...i,recentActivity:d,activity:o}}});try{const s=y.map(i=>encodeURIComponent(i.title)).join(","),a=await fetch(`https://libraryratingsdb.zxcsixx.workers.dev/api/ratings?batch=true&sources=${s}`);if(a.ok){const i=await a.json();y.forEach(o=>{const r=i[o.title]||{avg:0,total:0};ratingsMap[o.title]={avg:parseFloat(r.avg)||0,total:parseInt(r.total)||0}})}else throw new Error("Failed to fetch batch ratings")}catch(s){console.error("Error fetching batch ratings:",s),await Promise.all(y.map(async a=>{try{const o=await(await fetch(`https://libraryratingsdb.zxcsixx.workers.dev/api/ratings?source=${encodeURIComponent(a.title)}&page=1`)).json();ratingsMap[a.title]={avg:typeof o.avg=="number"?o.avg:0,total:typeof o.total=="number"?o.total:0}}catch(i){console.error(`Error fetching rating for ${a.title}:`,i),ratingsMap[a.title]={avg:0,total:0}}}))}return console.log("Using cached stats from localStorage"),!0}}catch{}return y=y.map(t=>({...t,stats:{installs:0,copies:0,recentActivity:0,activity:[]}})),!1}}function he(e){document.querySelector("main").classList.add("blur-sm","transition-all","duration-200");const t=w.t.bind(w),n=document.createElement("div");n.className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in p-4",n.innerHTML=`
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
    `,document.body.appendChild(n);const s=()=>{document.querySelector("main").classList.remove("blur-sm"),n.remove()};n.querySelector(".cancel-btn").addEventListener("click",()=>{s(),e(!1)}),n.querySelector(".proceed-btn").addEventListener("click",()=>{s(),e(!0)}),n.querySelector(".fixed.inset-0").addEventListener("click",a=>{a.target===a.currentTarget&&(s(),e(!1))})}function ye(e){document.querySelector("main").classList.add("blur-sm","transition-all","duration-200");const t=w.t.bind(w),n=document.createElement("div");n.className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in p-4",n.innerHTML=`
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
    `,document.body.appendChild(n);const s=()=>{document.querySelector("main").classList.remove("blur-sm"),n.remove()};n.querySelector(".cancel-btn").addEventListener("click",()=>{s(),e(!1)}),n.querySelector(".proceed-btn").addEventListener("click",()=>{s(),e(!0)}),n.querySelector(".fixed.inset-0").addEventListener("click",a=>{a.target===a.currentTarget&&(s(),e(!1))})}function st(e){var E,x,k,C,q;const t=w.getCurrentLocale(),s=(((E=w.translations[t])==null?void 0:E.sources)||{})[e.title]||{title:e.title,description:e.description},a=e.status.includes("Use At Your Own Risk"),i=e.stats||{installs:0,copies:0,recentActivity:0},o=parseInt(i.recentActivity||0),r=document.createElement("div");r.className="source-card animate-fade-in rounded-xl",r.dataset.url=e.url,r.dataset.name=e.title,r.dataset.copies=((x=e.stats)==null?void 0:x.copies)||0,r.dataset.installs=((k=e.stats)==null?void 0:k.installs)||0,r.dataset.activity=((C=e.stats)==null?void 0:C.recentActivity)||0;const d=e.status.map($=>{const S=$.toLowerCase().replace(/\s+/g,"-"),T={trusted:{color:"emerald",icon:"shield",key:"trusted",customClass:"bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/30 "},"safe-for-use":{color:"blue",icon:"check-circle",key:"safeForUse",customClass:"bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/30"},"use-at-your-own-risk":{color:"red",icon:"exclamation-triangle",key:"useAtOwnRisk",customClass:"bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/30 "},"works-in-russia":{color:"teal",icon:"globe-europe",key:"worksInRussia",customClass:"bg-teal-500/10 border-teal-500/20 text-teal-400 hover:bg-teal-500/20 hover:border-teal-500/30 "},nsfw:{color:"purple",icon:"exclamation-circle",key:"nsfw",customClass:"bg-purple-500/10 border-purple-500/20 text-purple-400 hover:bg-purple-500/20 hover:border-purple-500/30 "}}[S]||{color:"gray",icon:"circle",key:S},P=`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs backdrop-blur-sm status-badge ${T.customClass||""}`,z=`bg-${T.color}-500/10 border border-${T.color}-500/20 text-${T.color}-400`,B=w.t(`status.${T.key}`);return`
            <span class="${T.customClass?P:`${P} ${z}`}">
                <i class="fas fa-${T.icon} text-[10px]"></i>
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
                            <span class="whitespace-nowrap">${lt(e.addedDate)}</span>
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
                                 hover:scale-[1.02] backdrop-blur-sm" data-url="${e.url}">
                        <i class="fas fa-copy text-[10px]"></i>
                        ${w.t("common.copy")}
                    </button>
                </div>
            </div>
        </div>
    `;const c=(q=r.querySelector("[data-rating-stars-container]"))==null?void 0:q.parentElement;c&&(c.addEventListener("click",$=>{$.stopPropagation(),Je(e)}),Me(r,e.rating));const p=r.querySelector(".install-btn"),h=r.querySelector(".copy-btn");return h&&h.addEventListener("click",async()=>{const $=async()=>{await be(e.url,"copy")&&(navigator.clipboard.writeText(e.url),h.innerHTML='<i class="fas fa-check text-[10px]"></i> '+w.t("sourceCard.copied"),setTimeout(()=>{h.innerHTML='<i class="fas fa-copy text-[10px]"></i> '+w.t("sourceCard.copy")},2e3))},S=e.title==="CPGRepacks";a||S?(S?ye:he)(P=>{P&&$()}):$()}),p&&p.addEventListener("click",async()=>{const $=async()=>{we(p,"loading");const T=await be(e.url,"install");if(we(p,T?"success":"rate-limited"),T){const P=encodeURIComponent(e.url);window.location.href=`hydralauncher://install-source?urls=${P}`}},S=e.title==="CPGRepacks";e.status.includes("Use At Your Own Risk")||S?(S?ye:he)(P=>{P&&$()}):$()}),ue(e.url,e.stats),r.dataset.copies=i.copies||0,r.dataset.installs=i.installs||0,r.dataset.activity=o,r}let Z="wide";function Te(){const e=window.innerWidth;return e>=1536?"wide":e>=1024?"desktop":e>=640?"tablet":"mobile"}let ve;window.addEventListener("resize",()=>{clearTimeout(ve),ve=setTimeout(()=>{se();const e=Te();if(Z!==e){const n=de(),s=X(),a=Math.ceil(n.length/s);if(Z==="wide"&&e==="desktop"){const i=(I-1)*O.desktop;I=Math.floor(i/O.desktop)+1}Z=e,I=Math.min(Math.max(1,I),a),D(n),s<X()&&window.scrollTo({top:0,behavior:"smooth"})}},100)});function xe(e,t){return console.log(`Sorting sources by: ${t}`),[...e].sort((n,s)=>{var a,i,o,r,d,c,p,h,E,x,k,C;try{switch(t){case"hot":const q=((a=n.stats)==null?void 0:a.recentActivity)||0;return(((i=s.stats)==null?void 0:i.recentActivity)||0)-q;case"new":return new Date(s.addedDate||0)-new Date(n.addedDate||0);case"most-copies":const S=((o=n.stats)==null?void 0:o.copies)||0;return(((r=s.stats)==null?void 0:r.copies)||0)-S;case"most-installs":const P=((d=n.stats)==null?void 0:d.installs)||0;return(((c=s.stats)==null?void 0:c.installs)||0)-P;case"top-rated":console.log(`Comparing ratings: ${n.title} (${((p=n.rating)==null?void 0:p.avg)||0}) vs ${s.title} (${((h=s.rating)==null?void 0:h.avg)||0})`),console.log(`Full rating data for ${n.title}:`,n.rating),console.log(`Full rating data for ${s.title}:`,s.rating);const B=((E=n.rating)==null?void 0:E.avg)||0,j=((x=s.rating)==null?void 0:x.avg)||0;if(B===j){const G=((k=n.rating)==null?void 0:k.total)||0,H=((C=s.rating)==null?void 0:C.total)||0;return console.log(`Ratings equal (${B}), comparing counts: ${G} vs ${H}`),H-G}return console.log(`Sorting by rating: ${j} - ${B} = ${j-B}`),j-B;case"name-asc":return(n.title||"").localeCompare(s.title||"");case"name-desc":return(s.title||"").localeCompare(n.title||"");default:return 0}}catch(q){return console.error("Error in sort function:",q),console.error("Sort type:",t),console.error("Source A:",n),console.error("Source B:",s),0}})}function ae(e){var t;try{console.log("Updating active sort UI for:",e);const n=document.querySelector(".mobile-sort-button span");if(n){const a=((t=document.querySelector(`.sort-option[data-sort="${e}"]`))==null?void 0:t.textContent)||"Sort";n.textContent=a}document.querySelectorAll(".sort-option").forEach(a=>{const i=a.getAttribute("data-sort")===e;a.classList.toggle("bg-white/10",i),a.classList.toggle("text-white",i),a.classList.toggle("text-white/70",!i);const o=a.querySelector("i.fa-check");o&&(o.style.opacity=i?"1":"0")});const s=document.getElementById("sort-dropdown");s&&!s.classList.contains("hidden")&&s.classList.add("hidden"),localStorage.setItem("currentSort",e)}catch(n){console.error("Error updating sort UI:",n)}}function D(e=null){const t=document.getElementById("sources-container");if(t){t.innerHTML="";try{let n=e||de();console.log(`Displaying ${n.length} filtered sources`);const s=localStorage.getItem("currentSort")||"hot";if(console.log("Current sort type:",s),s){console.log("Before sorting - first few sources:",n.slice(0,3).map(c=>{var p,h;return{title:c.title,rating:c.rating,hasRating:!!((p=c.rating)!=null&&p.avg||(h=c.rating)!=null&&h.total)}}));try{n=xe(n,s),console.log("After sorting - first few sources:",n.slice(0,3).map(c=>{var p,h;return{title:c.title,rating:c.rating,sortKey:s==="top-rated"?`${((p=c.rating)==null?void 0:p.avg)||0} (${((h=c.rating)==null?void 0:h.total)||0} ratings)`:c[s]||"N/A"}})),ae(s)}catch(c){console.error("Error during sorting:",c),n=xe(n,"hot")}}Z=Te();const a=X(),i=Math.ceil(n.length/a);I=Math.min(Math.max(1,I),i);const o=(I-1)*a,r=Math.min(o+a,n.length);n.slice(o,r).forEach(c=>{const p=st(c);t.appendChild(p)}),at(i),w.updatePageContent()}catch(n){console.error("Error in displaySources:",n),t.innerHTML=`
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
        `}}}function X(){const e=window.innerWidth;return e>=2560?O.wide:e>=1024?O.desktop:e>=640?O.tablet:O.mobile}function at(e){const t=document.getElementById("pagination");if(!t)return;let n="";n+=`
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
    `,t.innerHTML=n}window.changePage=function(e){if(e<1)return;const t=de(),n=Math.ceil(t.length/X());e>n||(I=e,D(t),window.scrollTo({top:0,behavior:"smooth"}))};document.querySelectorAll(".status-filter-btn").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.status;document.querySelectorAll(".status-filter-btn").forEach(n=>{n.querySelector("div").classList.remove("bg-black/40")}),N===t?N="":(N=t,e.querySelector("div").classList.add("bg-black/40")),I=1,D(),ce(),dispatchFiltersChanged()})});document.querySelectorAll(".games-filter-btn").forEach(e=>{e.addEventListener("click",()=>{const t=parseInt(e.dataset.min),n=parseInt(e.dataset.max);if(document.querySelectorAll(".games-filter-btn div").forEach(s=>{s.classList.remove("border-emerald-500/20","bg-black/40"),s.classList.add("border-white/5","bg-black/20")}),R&&R.min===t&&R.max===n)R=null;else{R={min:t,max:n};const s=e.querySelector("div");s.classList.remove("border-white/5","bg-black/20"),s.classList.add("border-emerald-500/20","bg-black/40")}I=1,D(),ce(),Ce(),dispatchFiltersChanged()})});function ce(){const e={};y.forEach(t=>{t.status.forEach(n=>{e[n]=(e[n]||0)+1})}),document.querySelectorAll(".status-filter-btn").forEach(t=>{const n=t.dataset.status,s=t.querySelector(".text-white\\/40");s&&(s.textContent=e[n]||0)}),document.querySelectorAll(".games-filter-btn").forEach(t=>{const n=parseInt(t.dataset.min),s=parseInt(t.dataset.max),a=y.filter(r=>{const d=parseInt(r.gamesCount);return d>=n&&d<=s}).length,i=t.querySelector(".text-white\\/40");i&&(i.textContent=a);const o=t.querySelector(".bg-emerald-500\\/50");if(o){const r=Math.max(...Array.from(document.querySelectorAll(".games-filter-btn")).map(c=>{const p=parseInt(c.dataset.min),h=parseInt(c.dataset.max);return y.filter(E=>{const x=parseInt(E.gamesCount);return x>=p&&x<=h}).length})),d=r>0?a/r*100:0;o.style.width=`${d}%`}})}let V="";document.getElementById("search").addEventListener("input",e=>{V=e.target.value.toLowerCase(),I=1,D()});function de(){return y.filter(e=>{const t=!V||e.title.toLowerCase().includes(V)||e.description.toLowerCase().includes(V)||e.url.toLowerCase().includes(V),n=!N||e.status.includes(N),s=parseInt(e.gamesCount),a=!R||s>=R.min&&s<=R.max;return t&&n&&a})}const Ie=document.getElementById("sort-dropdown-btn"),ee=document.getElementById("sort-dropdown"),rt=document.getElementById("current-sort");Ie.addEventListener("click",()=>{ee.classList.toggle("hidden")});document.addEventListener("click",e=>{!Ie.contains(e.target)&&!ee.contains(e.target)&&ee.classList.add("hidden")});document.querySelectorAll(".sort-option").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.sort;switch(rt.textContent=e.textContent.trim(),ee.classList.add("hidden"),t){case"high-to-low":sortGamesFilters(!1);break;case"low-to-high":sortGamesFilters(!0);break;case"most-sources":ot();break;case"most-popular":it();break}})});function ot(){const e=document.querySelector(".games-filter-btn").parentNode,t=Array.from(e.querySelectorAll(".games-filter-btn"));t.sort((n,s)=>{const a=parseInt(n.querySelector(".text-white\\/40").textContent);return parseInt(s.querySelector(".text-white\\/40").textContent)-a}),t.forEach(n=>n.remove()),t.forEach(n=>e.appendChild(n))}function it(){const e=JSON.parse(localStorage.getItem("sourceStats")||"{}"),t=document.querySelector(".games-filter-btn").parentNode,n=Array.from(t.querySelectorAll(".games-filter-btn"));n.sort((s,a)=>{var h,E;const i=((h=y.find(x=>x.gamesCount===s.dataset.min))==null?void 0:h.url)||"",o=((E=y.find(x=>x.gamesCount===a.dataset.min))==null?void 0:E.url)||"",r=e[i]||{installs:0,copies:0},d=e[o]||{installs:0,copies:0},c=r.installs+r.copies;return d.installs+d.copies-c}),n.forEach(s=>s.remove()),n.forEach(s=>t.appendChild(s))}function lt(e){const t=new Date(e),s=Math.abs(new Date-t),a=Math.floor(s/(1e3*60*60*24)),i=w.t.bind(w);if(a===0)return i("common.date.today");if(a===1)return i("common.date.yesterday");if(a<30)return i("common.date.daysAgo",{days:a});{const o={year:"numeric",month:"short",day:"numeric"};return t.toLocaleDateString(w.getCurrentLocale(),o)}}function Ae(){var n;document.querySelectorAll(".filter-section").forEach(s=>{const a=s.querySelector("button[data-section]"),i=s.querySelector(".filter-content");i.style.maxHeight="0",i.style.display="none",a.setAttribute("aria-expanded","false"),a.removeAttribute("data-expanded")});const e=(n=document.querySelector('.filter-section button[data-section="status"]'))==null?void 0:n.closest(".filter-section");if(e){const s=e.querySelector("button[data-section]"),a=e.querySelector(".filter-content"),i=s.querySelector("i.fa-chevron-down");a.style.display="flex";const o=a.scrollHeight+"px";a.style.maxHeight="0",a.offsetHeight,a.style.maxHeight=o,s.setAttribute("aria-expanded","true"),s.setAttribute("data-expanded","true"),i&&(i.style.transform="rotate(180deg)")}document.querySelectorAll(".filter-section button[data-section]").forEach(s=>{s.addEventListener("click",a=>{a.preventDefault();const o=s.closest(".filter-section").querySelector(".filter-content"),r=s.getAttribute("aria-expanded")==="true";s.setAttribute("aria-expanded",!r);const d=s.querySelector("i.fa-chevron-down");if(r){o.style.maxHeight="0",o.style.opacity="0",s.setAttribute("data-expanded","false");const c=s.querySelector("i.fa-chevron-down");c&&(c.style.transform="rotate(0deg)");const p=()=>{o.style.maxHeight==="0px"&&(o.style.display="none"),o.removeEventListener("transitionend",p)};o.addEventListener("transitionend",p,{once:!0})}else{(o.style.display==="none"||!o.style.display)&&(o.style.display="flex",o.offsetHeight);const c=o.scrollHeight+"px";o.style.maxHeight=c,o.style.opacity="1",s.setAttribute("data-expanded","true"),d&&(d.style.transform="rotate(180deg)")}}),s.addEventListener("keydown",a=>{(a.key==="Enter"||a.key===" ")&&(a.preventDefault(),s.click())})});let t;window.addEventListener("resize",()=>{clearTimeout(t),t=setTimeout(()=>{document.querySelectorAll('.filter-section button[aria-expanded="true"]').forEach(s=>{const a=s.nextElementSibling;a&&a.style.display!=="none"&&(a.style.maxHeight=a.scrollHeight+"px")})},100)})}document.addEventListener("DOMContentLoaded",()=>{ke(),sortGamesFilters(!1),Ae()});We.addEventListener("click",()=>{F.classList.remove("hidden"),document.body.style.overflow="hidden"});Le.addEventListener("click",()=>{F.classList.add("hidden"),document.body.style.overflow=""});F.addEventListener("click",e=>{e.target===F&&Le.click()});document.addEventListener("keydown",e=>{e.key==="Escape"&&!F.classList.contains("hidden")&&(F.classList.add("hidden"),document.body.style.overflow="")});Ke.addEventListener("click",()=>{_.classList.remove("hidden"),document.body.style.overflow="hidden"});Ze.addEventListener("click",()=>{_.classList.add("hidden"),document.body.style.overflow=""});_.addEventListener("click",e=>{e.target===_&&(_.classList.add("hidden"),document.body.style.overflow="")});document.addEventListener("keydown",e=>{e.key==="Escape"&&(F.classList.contains("hidden")||(F.classList.add("hidden"),document.body.style.overflow=""),_.classList.contains("hidden")||(_.classList.add("hidden"),document.body.style.overflow=""))});function te(e,t,n){const s=new Date;s.setTime(s.getTime()+n*24*60*60*1e3),document.cookie=`${e}=${t};expires=${s.toUTCString()};path=/`}function $e(e){const t=e+"=",n=document.cookie.split(";");for(let s=0;s<n.length;s++){let a=n[s];for(;a.charAt(0)===" ";)a=a.substring(1,a.length);if(a.indexOf(t)===0)return a.substring(t.length,a.length)}return null}async function be(e,t){try{const n=e.replace(/[^a-zA-Z0-9]/g,"_"),s=`${t}_${n}`;if($e(s))return!0;let a={installs:0,copies:0,activity:[],recentActivity:0};try{const o=new Promise((k,C)=>setTimeout(()=>C(new Error("Firebase request timed out")),3e3)),r=oe(ie,`sources/${n}/stats`),d=le(r),p=(await Promise.race([d,o])).val()||{installs:0,copies:0,activity:[]},h=Date.now(),x=(Array.isArray(p.activity)?p.activity:[]).filter(k=>h-k<Q);x.push(h),a={installs:parseInt(p.installs||0)+(t==="install"?1:0),copies:parseInt(p.copies||0)+(t==="copy"?1:0),activity:x,recentActivity:x.length,lastUpdated:h},await Promise.race([Se(r,a),new Promise((k,C)=>setTimeout(()=>C(new Error("Update timed out")),3e3))]);try{const k=localStorage.getItem("sourceStats");if(k){const C=JSON.parse(k);C[n]||(C[n]={}),C[n].stats=a,localStorage.setItem("sourceStats",JSON.stringify(C)),localStorage.setItem("statsLastUpdated",h.toString())}}catch{}}catch{console.log("Firebase update failed, continuing with local data");const r=y.find(d=>d.url===e);if(r&&r.stats){a={installs:parseInt(r.stats.installs||0)+(t==="install"?1:0),copies:parseInt(r.stats.copies||0)+(t==="copy"?1:0),activity:[],recentActivity:1,lastUpdated:Date.now()};try{const d=localStorage.getItem("sourceStats");if(d){const c=JSON.parse(d);c[n]||(c[n]={}),c[n].stats=a,localStorage.setItem("sourceStats",JSON.stringify(c)),localStorage.setItem("statsLastUpdated",Date.now().toString())}}catch{}}}te(s,"true",t==="install"?.003472222:347222e-9),ue(e,a);const i=y.findIndex(o=>o.url===e);return i!==-1&&(y[i].stats=a),!0}catch{return!1}}function ue(e,t=null){const n=document.querySelectorAll(".source-card"),s=Array.from(n).find(a=>a.dataset.url===e);if(s){const a=s.querySelector(".source-stats");if(a){const i=parseInt((t==null?void 0:t.installs)||0),o=parseInt((t==null?void 0:t.copies)||0),r=parseInt((t==null?void 0:t.recentActivity)||0);a.innerHTML=`
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
            `}s.dataset.copies=(t==null?void 0:t.copies)||0,s.dataset.installs=(t==null?void 0:t.installs)||0,s.dataset.activity=(t==null?void 0:t.recentActivity)||0}}function we(e,t){const n=e.innerHTML;switch(t){case"loading":e.disabled=!0,e.innerHTML=`
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
            `,setTimeout(()=>{e.disabled=!1,e.innerHTML=n},2e3);break;default:e.disabled=!1,e.innerHTML=n}}function ct(){const e=document.getElementById("cookie-consent");$e("cookie-consent")?e.style.display="none":(e.style.display="block",setTimeout(()=>{e.classList.remove("translate-y-full")},500))}document.getElementById("accept-cookies").addEventListener("click",()=>{const e=document.getElementById("cookie-consent");e.classList.add("translate-y-full"),e.addEventListener("transitionend",()=>{e.style.display="none"},{once:!0}),te("cookie-consent","accepted",365)});async function dt(e){try{const t=oe(ie,`sources/${e}/stats`),s=(await le(t)).val();if(s&&s.activity){const a=s.activity.filter(i=>Date.now()-i<Q);a.length!==s.activity.length&&await Se(t,{activity:a})}}catch{}}function ut(){const e=document.getElementById("suggest-modal"),t=document.getElementById("suggest-btn"),n=document.getElementById("close-suggest");t&&t.addEventListener("click",()=>{e.classList.remove("hidden")}),n&&n.addEventListener("click",()=>{e.classList.add("hidden")}),e&&e.addEventListener("click",s=>{s.target===e&&e.classList.add("hidden")})}function mt(){const e=document.getElementById("search");if(e){const t=()=>{const s=window.innerWidth<640?"header.searchMobile":"header.search";e.placeholder=w.t(s)};t(),window.addEventListener("resize",t),document.addEventListener("languageChanged",t)}}function gt(){setInterval(()=>{y.forEach(e=>{const t=e.url.replace(/[^a-zA-Z0-9]/g,"_");dt(t)})},60*60*1e3)}async function ft(e){const t=y.find(n=>n.title===e);if(t&&t.rating){const n={avg:parseFloat(t.rating.avg||0),total:parseInt(t.rating.total||0)};return re(e,n),!0}return pt()}async function pt(){if(!y||y.length===0)return!1;const e="hydra_ratings_cache",t=5*60*1e3,n=()=>{try{const o=localStorage.getItem(e);if(!o)return null;const{timestamp:r,data:d}=JSON.parse(o);if(Date.now()-r<t)return d}catch(o){console.error("Error reading from cache:",o)}return null},s=o=>{try{localStorage.setItem(e,JSON.stringify({timestamp:Date.now(),data:o}))}catch(r){console.error("Error saving to cache:",r)}},a=n();if(a)return console.log("Using cached ratings data"),y.forEach(o=>{const r=a[o.title]||{avg:0,total:0};o.rating={avg:parseFloat(r.avg)||0,total:parseInt(r.total)||0},re(o.title,o.rating)}),!0;console.log("Fetching fresh ratings data...");const i=[...new Set(y.map(o=>o.title))];if(i.length===0)return!1;try{const o="https://libraryratingsdb.zxcsixx.workers.dev/api/ratings/batch";console.log("Making batch API request to:",o);const r=await fetch(o,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({sources:i,fields:["avg","total"]})});if(console.log("Batch response status:",r.status),!r.ok)return console.error("Failed to fetch batch ratings:",r.status,r.statusText),!1;const d=await r.json();return console.log("Received batch ratings data for",Object.keys(d).length,"sources"),s(d),y.forEach(c=>{const p=d[c.title]||{avg:0,total:0};c.rating={avg:parseFloat(p.avg)||0,total:parseInt(p.total)||0},re(c.title,c.rating)}),!0}catch(o){return console.error("Error in updateAllSourceRatings:",o),!1}}function re(e,t){document.querySelectorAll(".source-card").forEach(s=>{s.dataset.name===e&&Me(s,t)})}function Me(e,t){console.log("Updating card rating display for:",e.dataset.name,"with data:",JSON.stringify(t,null,2));const n=e.querySelector("[data-rating-stars-active]"),s=e.querySelector("[data-rating-avg]"),a=e.querySelector("[data-rating-total]"),i=e.querySelector("[data-rating-comment]");if(console.log("Found elements:",{starsActive:!!n,avgEl:!!s,totalEl:!!a,commentEl:!!i}),n&&s&&a)if(t&&(typeof t.avg=="number"||t.avg===0)){const o=t.avg/5*100,r=Math.round(o/10)*10;console.log(`Setting rating: avg=${t.avg}, total=${t.total}, starPercentage=${o}%, rounded=${r}%`),n.style.width=`${r}%`,s.textContent=t.avg>0?t.avg.toFixed(1):"–",a.textContent=t.total>0?`(${t.total})`:"",i&&(i.style.display=t.total>0?"inline-block":"none",console.log(`Comment icon display set to: ${i.style.display}`))}else console.log("No valid rating data, setting default state"),n.style.width="0%",s.textContent="–",a.textContent="",i&&(i.style.display="none");else console.error("Missing required rating elements on card:",{starsActive:!!n,avgEl:!!s,totalEl:!!a})}window.updateSourceCardRating=ft;document.addEventListener("languageChanged",()=>{D()});
