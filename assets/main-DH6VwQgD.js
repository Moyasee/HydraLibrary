import{c as $t,i as w,r as rt,d as ot,g as it,u as vt}from"./index-DklScFds.js";const dt="https://libraryratingsdb.zxcsixx.workers.dev/api/ratings",At=5*60*1e3,tt={data:{},lastUpdated:{},get:function(t){const e=this.data[t],a=this.lastUpdated[t];return e&&a&&Date.now()-a<At?Promise.resolve(e):null},set:function(t,e){return this.data[t]=e,this.lastUpdated[t]=Date.now(),e},batchGet:function(t){const e={cached:{},uncached:[]};return t.forEach(a=>{const s=this.get(a);s?e.cached[a]=s:e.uncached.push(a)}),e},batchSet:function(t){Object.entries(t).forEach(([e,a])=>{this.set(e,a)})}};function Mt(t){const e=new Date(t),s=Math.floor((new Date-e)/1e3);let n=Math.floor(s/31536e3);return n>=1?n+" year"+(n===1?"":"s")+" ago":(n=Math.floor(s/2592e3),n>=1?n+" month"+(n===1?"":"s")+" ago":(n=Math.floor(s/86400),n>=1?n+" day"+(n===1?"":"s")+" ago":(n=Math.floor(s/3600),n>=1?n+" hour"+(n===1?"":"s")+" ago":(n=Math.floor(s/60),n>=1?n+" minute"+(n===1?"":"s")+" ago":"just now"))))}function Y(t){return String(t).replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function qt(t){let e=localStorage.getItem("hydra_rating_hash");return e||(e=Math.random().toString(36).slice(2)+Date.now(),localStorage.setItem("hydra_rating_hash",e)),e}function Pt(t){document.querySelectorAll(".rating-modal").forEach(u=>u.remove());const e=document.createElement("div");e.className="rating-modal fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4",e.innerHTML=`
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
  `,document.body.appendChild(e),document.body.style.overflow="hidden",e.querySelector(".close-rating-modal").onclick=r,e.querySelector(".fixed.inset-0").onclick=u=>{u.target===e.querySelector(".fixed.inset-0")&&r()};async function a(u,d="en"){return new Promise((h,m)=>{const f=JSON.stringify({translate:"rapidapi"}),x=new XMLHttpRequest;x.withCredentials=!0,x.addEventListener("readystatechange",function(){if(this.readyState===this.DONE)try{const y=JSON.parse(this.responseText);if(y&&y.translation)h(y.translation);else throw y&&y.status!==200?new Error(y.business_message||"Translation service error"):new Error("Invalid response from translation service")}catch(y){console.error("Translation error:",y,this.responseText),m(y)}}),x.addEventListener("error",()=>{m(new Error("Network error during translation"))});const q=`https://free-google-translator.p.rapidapi.com/external-api/free-google-translator?from=auto&to=${d}&query=${encodeURIComponent(u)}`;x.open("POST",q),x.setRequestHeader("x-rapidapi-key",""),x.setRequestHeader("x-rapidapi-host","free-google-translator.p.rapidapi.com"),x.setRequestHeader("Content-Type","application/json"),x.send(f)})}async function s(u){const d=u.target.closest(".translate-comment");if(!d||d.disabled)return;u.preventDefault(),u.stopPropagation();const h=d.closest(".border-b"),m=h?h.querySelector(".comment-text p"):null;if(!m){console.error("Could not find comment text element");return}let f=d.getAttribute("data-original");if(d.classList.contains("active")){f&&(m.textContent=f,d.innerHTML='<i class="fas fa-language text-xs"></i><span class="hidden sm:inline">Translate</span>',d.classList.remove("active"),d.title="Translate this review"),d.disabled=!1;return}f=m.textContent.trim(),d.setAttribute("data-original",f),d.innerHTML,d.innerHTML='<i class="fas fa-spinner fa-spin text-xs"></i>',d.title="Translating...",d.disabled=!0;try{const x=await a(f,"en");m.textContent=x,d.innerHTML='<i class="fas fa-undo text-xs"></i><span class="hidden sm:inline">Original</span>',d.classList.add("active"),d.title="Show original text"}catch(x){console.error("Translation failed:",x),m.textContent=f,d.innerHTML='<i class="fas fa-exclamation-triangle text-xs"></i><span class="hidden sm:inline">Error</span>',d.title="Error translating. Click to try again."}finally{d.disabled=!1}}const n=e.querySelector("#rating-comments-list");n&&n.addEventListener("click",s);const o=e.querySelector('textarea[name="comment"]'),i=e.querySelector(".char-count");if(o&&i){const u=()=>{i.textContent=o.value.length};o.addEventListener("input",u),u(),e._cleanupCharCounter=()=>{o.removeEventListener("input",u)}}function r(){e._cleanupCharCounter&&e._cleanupCharCounter(),e.remove(),document.body.style.overflow=""}const c=5*60*1e3;let l=1,g="recent",p=0,b=!1,E=0,L=t.title;function C(){const u=`ratings_${encodeURIComponent(L)}`,d=localStorage.getItem(u);if(!d)return null;try{const{data:h,timestamp:m}=JSON.parse(d);if(Date.now()-m<c)return h}catch(h){console.warn("Error reading cache:",h)}return null}function D(u){try{const d=`ratings_${encodeURIComponent(L)}`,h={data:u,timestamp:Date.now()};localStorage.setItem(d,JSON.stringify(h))}catch(d){console.warn("Error saving to cache:",d)}}async function T(u=1,d=!1){if(b)return;const h=e.querySelector("#rating-comments-list");if(!h)return;h.innerHTML='<div class="flex justify-center items-center py-6"><div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-400"></div></div>';const m=d?null:C();if(m){console.log("Using cached data for:",L),$(m,u),Date.now()-E>c&&A(!0);return}await A()}function $(u,d=1){const h=e.querySelector("#rating-comments-list");if(h){if(h.innerHTML="",u.avg!==void 0){const m=parseFloat(u.avg).toFixed(1),f=parseInt(u.total)||0,x=e.querySelector("#rating-modal-stars"),q=e.querySelector("#rating-modal-avg"),y=e.querySelector("#rating-modal-total");if(x){x.innerHTML="";const R=Math.round(parseFloat(u.avg));x.innerHTML="★".repeat(R)+"☆".repeat(5-R)}q&&(q.textContent=`${m} out of 5`),y&&(y.textContent=`${f} ${f===1?"review":"reviews"}`)}if(!u.comments||u.comments.length===0){h.innerHTML=`
        <div class="text-center py-6 text-gray-400">
          No reviews yet. Be the first to leave a review!
        </div>
      `;return}D(u),u.pagination&&(p=u.pagination.total||0,k()),u.comments.forEach(m=>{if(!m)return;const f=document.createElement("div");f.className="border-b border-gray-700 py-4";const x=m.timestamp?new Date(m.timestamp).getTime():Date.now();f.innerHTML=`
        <div class="flex items-start justify-between mb-2">
          <div class="flex items-center">
            <div class="text-yellow-400 text-sm">
              ${"★".repeat(Math.round(m.rating||0))}${"☆".repeat(5-Math.round(m.rating||0))}
            </div>
            <span class="ml-2 text-sm text-gray-400">${(m.rating||0).toFixed(1)}</span>
          </div>
          <span class="text-xs text-gray-500">${Mt(x)}</span>
        </div>
        <div class="text-sm text-gray-300 mb-2 comment-text">
          <p>${Y(m.message||m.comment||"")}</p>
        </div>
        <div class="flex justify-between items-center text-xs text-gray-500">
          <span>${m.nickname||"Anonymous"}</span>
          <button class="translate-comment text-emerald-400 hover:text-emerald-300 text-xs flex items-center gap-1" 
                  title="Translate to English">
            <i class="fas fa-language text-xs"></i>
            <span class="hidden sm:inline">Translate</span>
          </button>
        </div>
      `,h.appendChild(f)})}}function k(){const u=e.querySelector(".pagination");if(!u)return;const d=Math.ceil(p/10);let h=`
      <div class="flex justify-between items-center text-sm">
        <button 
          class="px-3 py-1 rounded ${l<=1?"text-gray-500 cursor-not-allowed":"text-emerald-400 hover:bg-gray-700"}"
          ${l<=1?"disabled":""}
          onclick="document.querySelector('.rating-modal')._vm.loadPage(${l-1})"
        >
          Previous
        </button>
        <div class="text-gray-400">
          Page ${l} of ${d}
        </div>
        <button 
          class="px-3 py-1 rounded ${l>=d?"text-gray-500 cursor-not-allowed":"text-emerald-400 hover:bg-gray-700"}"
          ${l>=d?"disabled":""}
          onclick="document.querySelector('.rating-modal')._vm.loadPage(${l+1})"
        >
          Next
        </button>
      </div>
    `;u.innerHTML=h}window.loadPage=u=>{if(!S||!S.comments)return;const d=Math.ceil(S.comments.length/10);u<1||u>d||(l=u,F())},e._vm={loadPage:window.loadPage};async function A(u=!1){var x,q;if(b)return;b=!0;const d=e.querySelector("#rating-comments-list");!u&&d&&(d.innerHTML='<div class="text-center py-4 text-gray-400">Loading comments...</div>');const h=`comments_${L}`,m=5*60*1e3,f=tt.get(h);if(f&&Date.now()-f.timestamp<m){S=f,F(),b=!1;return}try{const y=await fetch(`${dt}?source=${encodeURIComponent(L)}&all=true`);if(!y.ok)throw new Error(`Failed to fetch comments: ${y.statusText}`);const R=await y.json();S={...R,comments:R.comments||[],pagination:{total:((x=R.comments)==null?void 0:x.length)||0,page:1,totalPages:1,perPage:((q=R.comments)==null?void 0:q.length)||0}},tt.set(h,{...S,timestamp:Date.now()}),E=Date.now(),F()}catch(y){console.error("Error fetching comments:",y),f?(S=f,F()):!u&&d&&(d.innerHTML=`
          <div class="text-red-500 text-center py-4">
            Failed to load comments. Please try again later.
            ${y.message?`<div class="text-xs mt-1">${y.message}</div>`:""}
          </div>
        `)}finally{b=!1}}function F(){if(!S||!S.comments)return;const u=O([...S.comments],g),d=10,h=Math.ceil(u.length/d),m=(l-1)*d,f=u.slice(m,m+d);S.pagination={total:u.length,page:l,totalPages:h,perPage:d},$({...S,comments:f,pagination:S.pagination},l)}let S=null;function O(u,d){if(!u)return[];const h=[...u];switch(d){case"recent":return h.sort((m,f)=>{const x=m.timestamp?new Date(m.timestamp).getTime():0;return(f.timestamp?new Date(f.timestamp).getTime():0)-x});case"high":return h.sort((m,f)=>(f.rating||0)-(m.rating||0));case"low":return h.sort((m,f)=>(m.rating||0)-(f.rating||0));default:return h}}function J(){const u=e.querySelector("#rating-sort-select");u&&u.addEventListener("change",d=>{g=d.target.value,l=1,F()})}J(),T(),T();const N=e.querySelector("#submit-rating-form"),P=e.querySelector("#rating-form-error");N.onsubmit=async u=>{u.preventDefault(),P.textContent="",P.className="text-sm text-rose-400 mt-2";const d=new FormData(N),h=(d.get("nickname")||"").trim(),m=d.get("rating"),f=(d.get("comment")||"").trim();if(!h){P.textContent="Please enter a nickname.";return}if(!m||isNaN(m)||m<1||m>5){P.textContent="Please select a valid rating between 1 and 5.";return}if(!f){P.textContent="Please enter a message.";return}if(f.split(/\s+/).length<3){P.textContent="Message must be at least 3 words long.";return}const x=qt(),q=`hydra_rating_${t.title}_${x}`;if(localStorage.getItem(q)){P.textContent="You have already submitted a review for this source.";return}const y=N.querySelector('button[type="submit"]'),R=y.innerHTML;y.disabled=!0,y.innerHTML="Submitting...";try{const z=await fetch(dt,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({source:t.title,nickname:h,rating:Number(m),message:f,ipHash:x})});if(!z.ok){const Tt=await z.json().catch(()=>({}));throw new Error(Tt.message||"Failed to submit. Please try again.")}N.reset(),P.className="text-sm text-emerald-400 mt-2",P.textContent="Thank you! Your review has been submitted for moderation.",localStorage.setItem(q,"1");const It=`comments_${t.title}_${l}_${g}`;tt.set(It,null),window.updateSourceCardRating&&window.updateSourceCardRating(t.title),setTimeout(()=>{T(1)},1e3)}catch(z){console.error("Submission error:",z),P.textContent=z.message||"Failed to submit. Please try again.";return}finally{y.disabled=!1,y.innerHTML=R}}}document.body.classList.add("preloading");document.addEventListener("DOMContentLoaded",async()=>{await $t.initialize()});function Bt(){const t=document.getElementById("preloader"),e=t.querySelector(".loading-progress"),a=t.querySelector(".loading-percentage");let s=0;const n=()=>{const o=100-s,i=Math.min(o*.1,Math.max(.2,Math.random()*.8));s=Math.min(100,s+i),e.style.width=`${s}%`;const r=s<100?s.toFixed(1):Math.round(s);a.textContent=`${r}%`,s<30?a.className="loading-percentage text-sm font-medium text-white/70":s<60?a.className="loading-percentage text-sm font-medium text-emerald-400/70":a.className="loading-percentage text-sm font-medium text-emerald-400",s<100?requestAnimationFrame(n):setTimeout(()=>{t.classList.add("hiding"),t.addEventListener("transitionend",()=>{t.remove(),document.body.classList.remove("preloading"),w.updatePageContent(),et()},{once:!0})},1e3)};setTimeout(()=>{t&&document.body.contains(t)&&(console.log("Preloader safety timeout triggered"),t.classList.add("hiding"),setTimeout(()=>{t.remove(),document.body.classList.remove("preloading"),w.updatePageContent(),et()},400))},5e3),setTimeout(()=>{requestAnimationFrame(n)},300)}function et(){const t=document.getElementById("language-switcher"),e=document.getElementById("language-dropdown");if(!t||!e)return;const a=t.cloneNode(!0);t.parentNode.replaceChild(a,t);const s=w.getCurrentLocale(),n=a.querySelector("span");if(n){const r={en:"English",ru:"Русский","pt-br":"Português"};n.textContent=r[s]||"English"}a.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),e.classList.contains("hidden")?(e.classList.remove("hidden"),a.classList.add("bg-white/10")):(e.classList.add("hidden"),a.classList.remove("bg-white/10"))}),e.querySelectorAll("button").forEach(r=>{r.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation();const l=r.dataset.lang;if(w.setLocale(l),e.classList.add("hidden"),a.classList.remove("bg-white/10"),n){const g={en:"English",ru:"Русский","pt-br":"Português"};n.textContent=g[l]||"English"}M()})}),document.addEventListener("click",r=>{a.contains(r.target)||(e.classList.add("hidden"),a.classList.remove("bg-white/10"))});const i=()=>{const r=t.querySelector("span"),c={en:"English",ru:"Русский","pt-br":"Português"};r.textContent=c[w.currentLocale]||"English"};document.addEventListener("languageChanged",i)}document.addEventListener("DOMContentLoaded",()=>{try{Bt()}catch(o){console.error("Error initializing preloader:",o);const i=document.getElementById("preloader");i&&i.remove(),document.body.classList.remove("preloading"),w.updatePageContent(),et()}Wt();const t=document.getElementById("accept-cookies"),e=document.getElementById("reject-cookies"),a=document.getElementById("cookie-consent");t&&t.addEventListener("click",()=>{s(),X("cookie-consent","accepted",365)}),e&&e.addEventListener("click",()=>{s(),X("cookie-consent","rejected",365)});function s(){a.classList.add("translate-y-full"),a.addEventListener("transitionend",()=>{a.style.display="none"},{once:!0})}xt(),setTimeout(()=>{wt()},300),Zt(),Qt(),Xt(),at(),Nt(),initializeMobileFilters();let n;window.addEventListener("resize",()=>{clearTimeout(n),n=setTimeout(()=>{at()},100)})});function xt(){try{console.log("Initializing sorting..."),document.querySelectorAll(".sort-option").forEach(e=>{e.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation();const s=e.getAttribute("data-sort");if(console.log("Sort option clicked:",s),s){st(s);const n=document.getElementById("mobile-filters");n&&!n.classList.contains("hidden")&&(n.classList.add("hidden"),document.body.style.overflow="auto"),M()}})});const t=localStorage.getItem("currentSort")||"hot";console.log("Initial sort type:",t),st(t),console.log("Sorting initialized with type:",t)}catch(t){console.error("Error initializing sorting:",t)}}let v=[],_="",B=null,I=1;const U={mobile:4,tablet:6,desktop:9,wide:15},H=document.getElementById("about-modal"),Rt=document.getElementById("about-btn"),yt=document.getElementById("close-about"),j=document.getElementById("suggest-modal"),Dt=document.getElementById("suggest-btn"),Ft=document.getElementById("close-suggest"),K=24*60*60*1e3;document.getElementById("mobile-filters-btn");document.getElementById("mobile-filters-modal");document.getElementById("close-mobile-filters");document.getElementById("mobile-filters-content");document.getElementById("reset-filters");document.getElementById("apply-filters");const V=document.getElementById("active-filters-count"),Ht={tablet:768};function at(){var s;const t=document.getElementById("filters-sidebar"),e=(s=document.getElementById("mobile-filters-btn"))==null?void 0:s.parentElement;if(!t||!e)return;const a=window.innerWidth<Ht.tablet;t.classList.toggle("hidden",a),e.classList.toggle("hidden",!a)}function Nt(){const t=document.getElementById("mobile-filters-btn"),e=document.getElementById("mobile-filters-modal"),a=e==null?void 0:e.querySelector(".flex.flex-col.bg-\\[\\#111\\]"),s=e==null?void 0:e.querySelector(".bg-\\[\\#0A0A0A\\]");if(!t||!e||!a||!s)return;function n(){e.classList.remove("hidden"),e.offsetHeight,s.classList.add("opacity-100"),a.classList.remove("translate-y-full"),document.body.classList.add("overflow-hidden")}function o(){s.classList.remove("opacity-100"),a.classList.add("translate-y-full"),setTimeout(()=>{e.classList.add("hidden"),document.body.classList.remove("overflow-hidden")},300)}t.addEventListener("click",l=>{l.preventDefault(),n()});const i=document.getElementById("close-mobile-filters");i&&i.addEventListener("click",l=>{l.preventDefault(),o()}),e.addEventListener("click",l=>{l.target===e&&o()}),document.addEventListener("keydown",l=>{l.key==="Escape"&&!e.classList.contains("hidden")&&o()});const r=document.getElementById("reset-filters");r&&r.addEventListener("click",l=>{l.preventDefault(),jt(),bt()});const c=document.getElementById("apply-filters");c&&c.addEventListener("click",l=>{l.preventDefault(),o(),M()})}function bt(){const t=_t();V&&(t>0?(V.textContent=`${t} active`,V.classList.remove("hidden")):V.classList.add("hidden"))}function _t(){let t=0;return _&&t++,B&&t++,localStorage.getItem("currentSort")&&t++,t}function jt(){_="",B=null,localStorage.removeItem("currentSort"),document.querySelectorAll(".status-filter-btn div").forEach(t=>{t.classList.remove("bg-black/40")}),document.querySelectorAll(".games-filter-btn div").forEach(t=>{t.classList.remove("border-emerald-500/20","bg-black/40"),t.classList.add("border-white/5","bg-black/20")}),document.querySelectorAll(".sort-option").forEach(t=>{t.classList.remove("bg-white/10","text-white"),t.classList.add("text-white/70")}),M()}async function wt(){try{v=(await(await fetch("data/resources.json")).json()).sources;const a="hydra_ratings_cache",s=5*60*1e3,n=()=>{try{const r=localStorage.getItem(a);if(!r)return null;const{timestamp:c,data:l}=JSON.parse(r);if(Date.now()-c<s)return l}catch(r){console.error("Error reading from cache:",r)}return null},o=r=>{try{localStorage.setItem(a,JSON.stringify({timestamp:Date.now(),data:r}))}catch(c){console.error("Error saving to cache:",c)}},i=n();if(i){console.log("Using cached ratings data"),v.forEach(r=>{const c=i[r.title]||{avg:0,total:0};r.rating={avg:parseFloat(c.avg)||0,total:parseInt(c.total)||0}});return}console.log("Fetching fresh ratings data...");try{const r=[...new Set(v.map(p=>p.title))];console.log(`Fetching ratings for ${r.length} sources`);const c=`https://libraryratingsdb.zxcsixx.workers.dev/api/ratings?batch=true&sources=${r.map(encodeURIComponent).join(",")}`;console.log("Batch API URL:",c);const l=await fetch(c);if(console.log("Batch response status:",l.status),!l.ok)throw new Error(`HTTP error! status: ${l.status}`);const g=await l.json();console.log("Received batch ratings data"),o(g),v.forEach(p=>{const b=g[p.title]||{avg:0,total:0};p.rating={avg:parseFloat(b.avg)||0,total:parseInt(b.total)||0}}),console.log("All ratings loaded via batch endpoint")}catch(r){console.error("Error in batch ratings fetch:",r),v.forEach(c=>{c.rating={avg:0,total:0}})}xt(),M(),Ot()}catch(t){console.error("Error loading sources:",t);const e=document.getElementById("sources-container");e&&(e.innerHTML=`
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
            `)}finally{setTimeout(()=>{const t=document.getElementById("preloader");t&&(t.style.opacity="0",setTimeout(()=>{t.style.display="none",M()},300))},500)}}async function Ot(){try{const t=new Promise((o,i)=>setTimeout(()=>i(new Error("Firebase request timed out")),5e3)),e=rt(ot,"sources"),a=it(e),n=(await Promise.race([a,t])).val();if(n){v=v.map(o=>{var p;const i=o.url.replace(/[^a-zA-Z0-9]/g,"_"),r=((p=n[i])==null?void 0:p.stats)||{installs:0,copies:0,activity:[]},c=Array.isArray(r.activity)?r.activity:[],l=Date.now(),g=c.filter(b=>l-b<K).length;return{...o,stats:{...r,recentActivity:g,activity:c}}}),v.forEach(o=>{ct(o.url,o.stats)});try{localStorage.setItem("sourceStats",JSON.stringify(n)),localStorage.setItem("statsLastUpdated",Date.now().toString())}catch{}return!0}return!1}catch{try{const e=localStorage.getItem("sourceStats");if(e){const a=JSON.parse(e);v=v.map(s=>{var l;const n=s.url.replace(/[^a-zA-Z0-9]/g,"_"),o=((l=a[n])==null?void 0:l.stats)||{installs:0,copies:0,activity:[]},i=Array.isArray(o.activity)?o.activity:[],r=Date.now(),c=i.filter(g=>r-g<K).length;return{...s,stats:{...o,recentActivity:c,activity:i}}});try{const s=v.map(o=>encodeURIComponent(o.title)).join(","),n=await fetch(`https://libraryratingsdb.zxcsixx.workers.dev/api/ratings?batch=true&sources=${s}`);if(n.ok){const o=await n.json();v.forEach(i=>{const r=o[i.title]||{avg:0,total:0};ratingsMap[i.title]={avg:parseFloat(r.avg)||0,total:parseInt(r.total)||0}})}else throw new Error("Failed to fetch batch ratings")}catch(s){console.error("Error fetching batch ratings:",s),await Promise.all(v.map(async n=>{try{const i=await(await fetch(`https://libraryratingsdb.zxcsixx.workers.dev/api/ratings?source=${encodeURIComponent(n.title)}&page=1`)).json();ratingsMap[n.title]={avg:typeof i.avg=="number"?i.avg:0,total:typeof i.total=="number"?i.total:0}}catch(o){console.error(`Error fetching rating for ${n.title}:`,o),ratingsMap[n.title]={avg:0,total:0}}}))}return console.log("Using cached stats from localStorage"),!0}}catch{}return v=v.map(e=>({...e,stats:{installs:0,copies:0,recentActivity:0,activity:[]}})),!1}}function ut(t){document.querySelector("main").classList.add("blur-sm","transition-all","duration-200");const e=w.t.bind(w),a=document.createElement("div");a.className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in p-4",a.innerHTML=`
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
    `,document.body.appendChild(a);const s=()=>{document.querySelector("main").classList.remove("blur-sm"),a.remove()};a.querySelector(".cancel-btn").addEventListener("click",()=>{s(),t(!1)}),a.querySelector(".proceed-btn").addEventListener("click",()=>{s(),t(!0)}),a.querySelector(".fixed.inset-0").addEventListener("click",n=>{n.target===n.currentTarget&&(s(),t(!1))})}function Ut(t){var b,E,L,C,D;const e=w.getCurrentLocale(),s=(((b=w.translations[e])==null?void 0:b.sources)||{})[t.title]||{title:t.title,description:t.description},n=t.status.includes("Use At Your Own Risk"),o=t.stats||{installs:0,copies:0,recentActivity:0},i=parseInt(o.recentActivity||0),r=document.createElement("div");r.className="source-card animate-fade-in rounded-xl",r.dataset.url=t.url,r.dataset.name=t.title,r.dataset.copies=((E=t.stats)==null?void 0:E.copies)||0,r.dataset.installs=((L=t.stats)==null?void 0:L.installs)||0,r.dataset.activity=((C=t.stats)==null?void 0:C.recentActivity)||0;const c=t.status.map(T=>{const $=T.toLowerCase().replace(/\s+/g,"-"),k={trusted:{color:"emerald",icon:"shield",key:"trusted",customClass:"bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/30 "},"safe-for-use":{color:"blue",icon:"check-circle",key:"safeForUse",customClass:"bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/30"},"use-at-your-own-risk":{color:"red",icon:"exclamation-triangle",key:"useAtOwnRisk",customClass:"bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/30 "},"works-in-russia":{color:"teal",icon:"globe-europe",key:"worksInRussia",customClass:"bg-teal-500/10 border-teal-500/20 text-teal-400 hover:bg-teal-500/20 hover:border-teal-500/30 "},nsfw:{color:"purple",icon:"exclamation-circle",key:"nsfw",customClass:"bg-purple-500/10 border-purple-500/20 text-purple-400 hover:bg-purple-500/20 hover:border-purple-500/30 "}}[$]||{color:"gray",icon:"circle",key:$},A=`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs backdrop-blur-sm status-badge ${k.customClass||""}`,F=`bg-${k.color}-500/10 border border-${k.color}-500/20 text-${k.color}-400`,S=w.t(`status.${k.key}`);return`
            <span class="${k.customClass?A:`${A} ${F}`}">
                <i class="fas fa-${k.icon} text-[10px]"></i>
                ${S}
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
    `;const l=(D=r.querySelector("[data-rating-stars-container]"))==null?void 0:D.parentElement;l&&(l.addEventListener("click",T=>{T.stopPropagation(),Pt(t)}),kt(r,t.rating));const g=r.querySelector(".install-btn"),p=r.querySelector(".copy-btn");return p&&p.addEventListener("click",async()=>{const T=async()=>{await ft(t.url,"copy")&&(navigator.clipboard.writeText(t.url),p.innerHTML='<i class="fas fa-check text-[10px]"></i> '+w.t("sourceCard.copied"),setTimeout(()=>{p.innerHTML='<i class="fas fa-copy text-[10px]"></i> '+w.t("sourceCard.copy")},2e3))},$=t.title==="CPGRepacks";n||$?($?mt:ut)(A=>{A&&T()}):T()}),g&&g.addEventListener("click",async()=>{const T=async()=>{ht(g,"loading");const k=await ft(t.url,"install");if(ht(g,k?"success":"rate-limited"),k){const A=encodeURIComponent(t.url);window.location.href=`hydralauncher://install-source?urls=${A}`}},$=t.title==="CPGRepacks";t.status.includes("Use At Your Own Risk")||$?($?mt:ut)(A=>{A&&T()}):T()}),ct(t.url,t.stats),r.dataset.copies=o.copies||0,r.dataset.installs=o.installs||0,r.dataset.activity=i,r}let W="wide";function St(){const t=window.innerWidth;return t>=1536?"wide":t>=1024?"desktop":t>=640?"tablet":"mobile"}let gt;window.addEventListener("resize",()=>{clearTimeout(gt),gt=setTimeout(()=>{at();const t=St();if(W!==t){const a=lt(),s=Z(),n=Math.ceil(a.length/s);if(W==="wide"&&t==="desktop"){const o=(I-1)*U.desktop;I=Math.floor(o/U.desktop)+1}W=t,I=Math.min(Math.max(1,I),n),M(a),s<Z()&&window.scrollTo({top:0,behavior:"smooth"})}},100)});function pt(t,e){return console.log(`Sorting sources by: ${e}`),[...t].sort((a,s)=>{var n,o,i,r,c,l,g,p,b,E,L,C;try{switch(e){case"hot":const D=((n=a.stats)==null?void 0:n.recentActivity)||0;return(((o=s.stats)==null?void 0:o.recentActivity)||0)-D;case"new":return new Date(s.addedDate||0)-new Date(a.addedDate||0);case"most-copies":const $=((i=a.stats)==null?void 0:i.copies)||0;return(((r=s.stats)==null?void 0:r.copies)||0)-$;case"most-installs":const A=((c=a.stats)==null?void 0:c.installs)||0;return(((l=s.stats)==null?void 0:l.installs)||0)-A;case"top-rated":console.log(`Comparing ratings: ${a.title} (${((g=a.rating)==null?void 0:g.avg)||0}) vs ${s.title} (${((p=s.rating)==null?void 0:p.avg)||0})`),console.log(`Full rating data for ${a.title}:`,a.rating),console.log(`Full rating data for ${s.title}:`,s.rating);const S=((b=a.rating)==null?void 0:b.avg)||0,O=((E=s.rating)==null?void 0:E.avg)||0;if(S===O){const J=((L=a.rating)==null?void 0:L.total)||0,N=((C=s.rating)==null?void 0:C.total)||0;return console.log(`Ratings equal (${S}), comparing counts: ${J} vs ${N}`),N-J}return console.log(`Sorting by rating: ${O} - ${S} = ${O-S}`),O-S;case"name-asc":return(a.title||"").localeCompare(s.title||"");case"name-desc":return(s.title||"").localeCompare(a.title||"");default:return 0}}catch(D){return console.error("Error in sort function:",D),console.error("Sort type:",e),console.error("Source A:",a),console.error("Source B:",s),0}})}function st(t){var e;try{console.log("Updating active sort UI for:",t);const a=document.querySelector(".mobile-sort-button span");if(a){const n=((e=document.querySelector(`.sort-option[data-sort="${t}"]`))==null?void 0:e.textContent)||"Sort";a.textContent=n}document.querySelectorAll(".sort-option").forEach(n=>{const o=n.getAttribute("data-sort")===t;n.classList.toggle("bg-white/10",o),n.classList.toggle("text-white",o),n.classList.toggle("text-white/70",!o);const i=n.querySelector("i.fa-check");i&&(i.style.opacity=o?"1":"0")});const s=document.getElementById("sort-dropdown");s&&!s.classList.contains("hidden")&&s.classList.add("hidden"),localStorage.setItem("currentSort",t)}catch(a){console.error("Error updating sort UI:",a)}}function M(t=null){const e=document.getElementById("sources-container");if(e){e.innerHTML="";try{let a=t||lt();console.log(`Displaying ${a.length} filtered sources`);const s=localStorage.getItem("currentSort")||"hot";if(console.log("Current sort type:",s),s){console.log("Before sorting - first few sources:",a.slice(0,3).map(l=>{var g,p;return{title:l.title,rating:l.rating,hasRating:!!((g=l.rating)!=null&&g.avg||(p=l.rating)!=null&&p.total)}}));try{a=pt(a,s),console.log("After sorting - first few sources:",a.slice(0,3).map(l=>{var g,p;return{title:l.title,rating:l.rating,sortKey:s==="top-rated"?`${((g=l.rating)==null?void 0:g.avg)||0} (${((p=l.rating)==null?void 0:p.total)||0} ratings)`:l[s]||"N/A"}})),st(s)}catch(l){console.error("Error during sorting:",l),a=pt(a,"hot")}}W=St();const n=Z(),o=Math.ceil(a.length/n);I=Math.min(Math.max(1,I),o);const i=(I-1)*n,r=Math.min(i+n,a.length);a.slice(i,r).forEach(l=>{const g=Ut(l);e.appendChild(g)}),zt(o),w.updatePageContent()}catch(a){console.error("Error in displaySources:",a),e.innerHTML=`
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
        `}}}function Z(){const t=window.innerWidth;return t>=2560?U.wide:t>=1024?U.desktop:t>=640?U.tablet:U.mobile}function zt(t){const e=document.getElementById("pagination");if(!e)return;let a="";a+=`
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
    `,e.innerHTML=a}window.changePage=function(t){if(t<1)return;const e=lt(),a=Math.ceil(e.length/Z());t>a||(I=t,M(e),window.scrollTo({top:0,behavior:"smooth"}))};document.querySelectorAll(".status-filter-btn").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.status;document.querySelectorAll(".status-filter-btn").forEach(a=>{a.querySelector("div").classList.remove("bg-black/40")}),_===e?_="":(_=e,t.querySelector("div").classList.add("bg-black/40")),I=1,M(),Et(),dispatchFiltersChanged()})});document.querySelectorAll(".games-filter-btn").forEach(t=>{t.addEventListener("click",()=>{const e=parseInt(t.dataset.min),a=parseInt(t.dataset.max);if(document.querySelectorAll(".games-filter-btn div").forEach(s=>{s.classList.remove("border-emerald-500/20","bg-black/40"),s.classList.add("border-white/5","bg-black/20")}),B&&B.min===e&&B.max===a)B=null;else{B={min:e,max:a};const s=t.querySelector("div");s.classList.remove("border-white/5","bg-black/20"),s.classList.add("border-emerald-500/20","bg-black/40")}I=1,M(),Et(),bt(),dispatchFiltersChanged()})});function Et(){const t={};v.forEach(e=>{e.status.forEach(a=>{t[a]=(t[a]||0)+1})}),document.querySelectorAll(".status-filter-btn").forEach(e=>{const a=e.dataset.status,s=e.querySelector(".text-white\\/40");s&&(s.textContent=t[a]||0)}),document.querySelectorAll(".games-filter-btn").forEach(e=>{const a=parseInt(e.dataset.min),s=parseInt(e.dataset.max),n=v.filter(r=>{const c=parseInt(r.gamesCount);return c>=a&&c<=s}).length,o=e.querySelector(".text-white\\/40");o&&(o.textContent=n);const i=e.querySelector(".bg-emerald-500\\/50");if(i){const r=Math.max(...Array.from(document.querySelectorAll(".games-filter-btn")).map(l=>{const g=parseInt(l.dataset.min),p=parseInt(l.dataset.max);return v.filter(b=>{const E=parseInt(b.gamesCount);return E>=g&&E<=p}).length})),c=r>0?n/r*100:0;i.style.width=`${c}%`}})}let G="";document.getElementById("search").addEventListener("input",t=>{G=t.target.value.toLowerCase(),I=1,M()});function lt(){return v.filter(t=>{const e=!G||t.title.toLowerCase().includes(G)||t.description.toLowerCase().includes(G)||t.url.toLowerCase().includes(G),a=!_||t.status.includes(_),s=parseInt(t.gamesCount),n=!B||s>=B.min&&s<=B.max;return e&&a&&n})}const Lt=document.getElementById("sort-dropdown-btn"),Q=document.getElementById("sort-dropdown"),Gt=document.getElementById("current-sort");Lt.addEventListener("click",()=>{Q.classList.toggle("hidden")});document.addEventListener("click",t=>{!Lt.contains(t.target)&&!Q.contains(t.target)&&Q.classList.add("hidden")});document.querySelectorAll(".sort-option").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.sort;switch(Gt.textContent=t.textContent.trim(),Q.classList.add("hidden"),e){case"high-to-low":sortGamesFilters(!1);break;case"low-to-high":sortGamesFilters(!0);break;case"most-sources":Jt();break;case"most-popular":Yt();break}})});function Jt(){const t=document.querySelector(".games-filter-btn").parentNode,e=Array.from(t.querySelectorAll(".games-filter-btn"));e.sort((a,s)=>{const n=parseInt(a.querySelector(".text-white\\/40").textContent);return parseInt(s.querySelector(".text-white\\/40").textContent)-n}),e.forEach(a=>a.remove()),e.forEach(a=>t.appendChild(a))}function Yt(){const t=JSON.parse(localStorage.getItem("sourceStats")||"{}"),e=document.querySelector(".games-filter-btn").parentNode,a=Array.from(e.querySelectorAll(".games-filter-btn"));a.sort((s,n)=>{var p,b;const o=((p=v.find(E=>E.gamesCount===s.dataset.min))==null?void 0:p.url)||"",i=((b=v.find(E=>E.gamesCount===n.dataset.min))==null?void 0:b.url)||"",r=t[o]||{installs:0,copies:0},c=t[i]||{installs:0,copies:0},l=r.installs+r.copies;return c.installs+c.copies-l}),a.forEach(s=>s.remove()),a.forEach(s=>e.appendChild(s))}function Vt(t){const e=new Date(t),s=Math.abs(new Date-e),n=Math.floor(s/(1e3*60*60*24)),o=w.t.bind(w);if(n===0)return o("common.date.today");if(n===1)return o("common.date.yesterday");if(n<30)return o("common.date.daysAgo",{days:n});{const i={year:"numeric",month:"short",day:"numeric"};return e.toLocaleDateString(w.getCurrentLocale(),i)}}document.addEventListener("DOMContentLoaded",()=>{wt(),sortGamesFilters(!1)});Rt.addEventListener("click",()=>{H.classList.remove("hidden"),document.body.style.overflow="hidden"});yt.addEventListener("click",()=>{H.classList.add("hidden"),document.body.style.overflow=""});H.addEventListener("click",t=>{t.target===H&&yt.click()});document.addEventListener("keydown",t=>{t.key==="Escape"&&!H.classList.contains("hidden")&&(H.classList.add("hidden"),document.body.style.overflow="")});Dt.addEventListener("click",()=>{j.classList.remove("hidden"),document.body.style.overflow="hidden"});Ft.addEventListener("click",()=>{j.classList.add("hidden"),document.body.style.overflow=""});j.addEventListener("click",t=>{t.target===j&&(j.classList.add("hidden"),document.body.style.overflow="")});document.addEventListener("keydown",t=>{t.key==="Escape"&&(H.classList.contains("hidden")||(H.classList.add("hidden"),document.body.style.overflow=""),j.classList.contains("hidden")||(j.classList.add("hidden"),document.body.style.overflow=""))});function X(t,e,a){const s=new Date;s.setTime(s.getTime()+a*24*60*60*1e3),document.cookie=`${t}=${e};expires=${s.toUTCString()};path=/`}function Ct(t){const e=t+"=",a=document.cookie.split(";");for(let s=0;s<a.length;s++){let n=a[s];for(;n.charAt(0)===" ";)n=n.substring(1,n.length);if(n.indexOf(e)===0)return n.substring(e.length,n.length)}return null}async function ft(t,e){try{const a=t.replace(/[^a-zA-Z0-9]/g,"_"),s=`${e}_${a}`;if(Ct(s))return!0;let n={installs:0,copies:0,activity:[],recentActivity:0};try{const i=new Promise((L,C)=>setTimeout(()=>C(new Error("Firebase request timed out")),3e3)),r=rt(ot,`sources/${a}/stats`),c=it(r),g=(await Promise.race([c,i])).val()||{installs:0,copies:0,activity:[]},p=Date.now(),E=(Array.isArray(g.activity)?g.activity:[]).filter(L=>p-L<K);E.push(p),n={installs:parseInt(g.installs||0)+(e==="install"?1:0),copies:parseInt(g.copies||0)+(e==="copy"?1:0),activity:E,recentActivity:E.length,lastUpdated:p},await Promise.race([vt(r,n),new Promise((L,C)=>setTimeout(()=>C(new Error("Update timed out")),3e3))]);try{const L=localStorage.getItem("sourceStats");if(L){const C=JSON.parse(L);C[a]||(C[a]={}),C[a].stats=n,localStorage.setItem("sourceStats",JSON.stringify(C)),localStorage.setItem("statsLastUpdated",p.toString())}}catch{}}catch{console.log("Firebase update failed, continuing with local data");const r=v.find(c=>c.url===t);if(r&&r.stats){n={installs:parseInt(r.stats.installs||0)+(e==="install"?1:0),copies:parseInt(r.stats.copies||0)+(e==="copy"?1:0),activity:[],recentActivity:1,lastUpdated:Date.now()};try{const c=localStorage.getItem("sourceStats");if(c){const l=JSON.parse(c);l[a]||(l[a]={}),l[a].stats=n,localStorage.setItem("sourceStats",JSON.stringify(l)),localStorage.setItem("statsLastUpdated",Date.now().toString())}}catch{}}}X(s,"true",e==="install"?.003472222:347222e-9),ct(t,n);const o=v.findIndex(i=>i.url===t);return o!==-1&&(v[o].stats=n),!0}catch{return!1}}function ct(t,e=null){const a=document.querySelectorAll(".source-card"),s=Array.from(a).find(n=>n.dataset.url===t);if(s){const n=s.querySelector(".source-stats");if(n){const o=parseInt((e==null?void 0:e.installs)||0),i=parseInt((e==null?void 0:e.copies)||0),r=parseInt((e==null?void 0:e.recentActivity)||0);n.innerHTML=`
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
            `,setTimeout(()=>{t.disabled=!1,t.innerHTML=a},2e3);break;default:t.disabled=!1,t.innerHTML=a}}function Wt(){const t=document.getElementById("cookie-consent");Ct("cookie-consent")?t.style.display="none":(t.style.display="block",setTimeout(()=>{t.classList.remove("translate-y-full")},500))}document.getElementById("accept-cookies").addEventListener("click",()=>{const t=document.getElementById("cookie-consent");t.classList.add("translate-y-full"),t.addEventListener("transitionend",()=>{t.style.display="none"},{once:!0}),X("cookie-consent","accepted",365)});async function Kt(t){try{const e=rt(ot,`sources/${t}/stats`),s=(await it(e)).val();if(s&&s.activity){const n=s.activity.filter(o=>Date.now()-o<K);n.length!==s.activity.length&&await vt(e,{activity:n})}}catch{}}function Zt(){const t=document.getElementById("suggest-modal"),e=document.getElementById("suggest-btn"),a=document.getElementById("close-suggest");e&&e.addEventListener("click",()=>{t.classList.remove("hidden")}),a&&a.addEventListener("click",()=>{t.classList.add("hidden")}),t&&t.addEventListener("click",s=>{s.target===t&&t.classList.add("hidden")})}function Qt(){const t=document.getElementById("search");if(t){const e=()=>{const s=window.innerWidth<640?"header.searchMobile":"header.search";t.placeholder=w.t(s)};e(),window.addEventListener("resize",e),document.addEventListener("languageChanged",e)}}function Xt(){setInterval(()=>{v.forEach(t=>{const e=t.url.replace(/[^a-zA-Z0-9]/g,"_");Kt(e)})},60*60*1e3)}async function te(t){const e=v.find(a=>a.title===t);if(e&&e.rating){const a={avg:parseFloat(e.rating.avg||0),total:parseInt(e.rating.total||0)};return nt(t,a),!0}return ee()}async function ee(){if(!v||v.length===0)return!1;const t="hydra_ratings_cache",e=5*60*1e3,a=()=>{try{const i=localStorage.getItem(t);if(!i)return null;const{timestamp:r,data:c}=JSON.parse(i);if(Date.now()-r<e)return c}catch(i){console.error("Error reading from cache:",i)}return null},s=i=>{try{localStorage.setItem(t,JSON.stringify({timestamp:Date.now(),data:i}))}catch(r){console.error("Error saving to cache:",r)}},n=a();if(n)return console.log("Using cached ratings data"),v.forEach(i=>{const r=n[i.title]||{avg:0,total:0};i.rating={avg:parseFloat(r.avg)||0,total:parseInt(r.total)||0},nt(i.title,i.rating)}),!0;console.log("Fetching fresh ratings data...");const o=[...new Set(v.map(i=>i.title))];if(o.length===0)return!1;try{const i="https://libraryratingsdb.zxcsixx.workers.dev/api/ratings/batch";console.log("Making batch API request to:",i);const r=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({sources:o,fields:["avg","total"]})});if(console.log("Batch response status:",r.status),!r.ok)return console.error("Failed to fetch batch ratings:",r.status,r.statusText),!1;const c=await r.json();return console.log("Received batch ratings data for",Object.keys(c).length,"sources"),s(c),v.forEach(l=>{const g=c[l.title]||{avg:0,total:0};l.rating={avg:parseFloat(g.avg)||0,total:parseInt(g.total)||0},nt(l.title,l.rating)}),!0}catch(i){return console.error("Error in updateAllSourceRatings:",i),!1}}function nt(t,e){document.querySelectorAll(".source-card").forEach(s=>{s.dataset.name===t&&kt(s,e)})}function kt(t,e){console.log("Updating card rating display for:",t.dataset.name,"with data:",JSON.stringify(e,null,2));const a=t.querySelector("[data-rating-stars-active]"),s=t.querySelector("[data-rating-avg]"),n=t.querySelector("[data-rating-total]"),o=t.querySelector("[data-rating-comment]");if(console.log("Found elements:",{starsActive:!!a,avgEl:!!s,totalEl:!!n,commentEl:!!o}),a&&s&&n)if(e&&(typeof e.avg=="number"||e.avg===0)){const i=e.avg/5*100,r=Math.round(i/10)*10;console.log(`Setting rating: avg=${e.avg}, total=${e.total}, starPercentage=${i}%, rounded=${r}%`),a.style.width=`${r}%`,s.textContent=e.avg>0?e.avg.toFixed(1):"–",n.textContent=e.total>0?`(${e.total})`:"",o&&(o.style.display=e.total>0?"inline-block":"none",console.log(`Comment icon display set to: ${o.style.display}`))}else console.log("No valid rating data, setting default state"),a.style.width="0%",s.textContent="–",n.textContent="",o&&(o.style.display="none");else console.error("Missing required rating elements on card:",{starsActive:!!a,avgEl:!!s,totalEl:!!n})}window.updateSourceCardRating=te;document.addEventListener("languageChanged",()=>{M()});
