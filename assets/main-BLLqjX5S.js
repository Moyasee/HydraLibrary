import{c as Ae,i as y,r as ne,d as re,g as oe,u as ve}from"./index-CIMvWUqK.js";const de="https://libraryratingsdb.zxcsixx.workers.dev/api/ratings";function Te(e){const t=new Date(e),a=Math.floor((new Date-t)/1e3);let n=Math.floor(a/31536e3);return n>=1?n+" year"+(n===1?"":"s")+" ago":(n=Math.floor(a/2592e3),n>=1?n+" month"+(n===1?"":"s")+" ago":(n=Math.floor(a/86400),n>=1?n+" day"+(n===1?"":"s")+" ago":(n=Math.floor(a/3600),n>=1?n+" hour"+(n===1?"":"s")+" ago":(n=Math.floor(a/60),n>=1?n+" minute"+(n===1?"":"s")+" ago":"just now"))))}function F(e){return String(e).replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Me(e){let t=localStorage.getItem("hydra_rating_hash");return t||(t=Math.random().toString(36).slice(2)+Date.now(),localStorage.setItem("hydra_rating_hash",t)),t}function qe(e){document.querySelectorAll(".rating-modal").forEach(d=>d.remove());const t=document.createElement("div");t.className="rating-modal fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4",t.innerHTML=`
    <div class="fixed inset-0 bg-black/90 backdrop-blur-sm animate-fade-in"></div>
    <div class="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-xl max-w-4xl w-full mx-2 sm:mx-4 my-4 max-h-[90vh] sm:max-h-[90vh] flex flex-col shadow-2xl border border-white/5 animate-fade-in transform transition-all duration-300 ease-out overflow-hidden">
      <div class="flex flex-col p-4 sm:p-6 space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex-1 pr-4">
            <h2 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 mb-1 line-clamp-2">${F(e.title)}</h2>
            <a href="${F(e.url)}" target="_blank" class="text-emerald-400/90 text-xs hover:text-emerald-300 transition-all duration-300 hover:underline hover:underline-offset-2 break-all line-clamp-1">
              <i class="fas fa-external-link-alt mr-1"></i>${F(e.url)}
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
  `,document.body.appendChild(t),document.body.style.overflow="hidden",t.querySelector(".close-rating-modal").onclick=r,t.querySelector(".fixed.inset-0").onclick=d=>{d.target===t.querySelector(".fixed.inset-0")&&r()};async function s(d,c="en"){return new Promise((m,h)=>{const x=JSON.stringify({translate:"rapidapi"}),w=new XMLHttpRequest;w.withCredentials=!0,w.addEventListener("readystatechange",function(){if(this.readyState===this.DONE)try{const b=JSON.parse(this.responseText);if(b&&b.translation)m(b.translation);else throw b&&b.status!==200?new Error(b.business_message||"Translation service error"):new Error("Invalid response from translation service")}catch(b){console.error("Translation error:",b,this.responseText),h(b)}}),w.addEventListener("error",()=>{h(new Error("Network error during translation"))});const T=`https://free-google-translator.p.rapidapi.com/external-api/free-google-translator?from=auto&to=${c}&query=${encodeURIComponent(d)}`;w.open("POST",T),w.setRequestHeader("x-rapidapi-key",""),w.setRequestHeader("x-rapidapi-host","free-google-translator.p.rapidapi.com"),w.setRequestHeader("Content-Type","application/json"),w.send(x)})}t.addEventListener("click",async d=>{const c=d.target.closest(".translate-comment");if(!c||c.disabled)return;d.preventDefault();const m=c.closest('div[class*="group relative"]'),h=m?m.querySelector(".comment-text p"):null;if(!h){console.error("Could not find comment text element");return}let x=c.getAttribute("data-original");if(c.classList.contains("active")){x&&(h.textContent=`"${x}"`,c.innerHTML='<i class="fas fa-language text-xs"></i><span class="hidden sm:inline">Translate</span>',c.classList.remove("active"),c.title="Translate this review"),c.disabled=!1;return}x=h.textContent.trim().replace(/^"/,"").replace(/"$/,""),c.setAttribute("data-original",x);const w=c.innerHTML;c.innerHTML='<i class="fas fa-spinner fa-spin text-xs"></i>',c.title="Translating...",c.disabled=!0;try{const T=await s(x,"en");h.textContent=`"${T}"`,c.innerHTML='<i class="fas fa-undo text-xs"></i><span class="hidden sm:inline">Original</span>',c.classList.add("active"),c.title="Show original text",c.disabled=!1}catch(T){console.error("Translation failed:",T),h.textContent=`"${x}"`,c.innerHTML=w,c.title="Error translating. Click to try again."}});const a=t.querySelector('textarea[name="comment"]'),n=t.querySelector(".char-count");if(a&&n){const d=()=>{n.textContent=a.value.length};a.addEventListener("input",d),d(),t._cleanupCharCounter=()=>{a.removeEventListener("input",d)}}function r(){t._cleanupCharCounter&&t._cleanupCharCounter(),t.remove(),document.body.style.overflow=""}const i=5*60*1e3;let o=1,u="recent",l=[],g=!1,f=0,S=e.title;function L(){const d=`ratings_${encodeURIComponent(S)}`,c=localStorage.getItem(d);if(!c)return null;try{const{data:m,timestamp:h}=JSON.parse(c);if(Date.now()-h<i)return m}catch(m){console.warn("Error reading cache:",m)}return null}function $(d){try{const c=`ratings_${encodeURIComponent(S)}`,m={data:d,timestamp:Date.now()};localStorage.setItem(c,JSON.stringify(m))}catch(c){console.warn("Error saving to cache:",c)}}async function E(d=1,c=!1){if(g)return;const m=t.querySelector("#rating-comments-list");if(!m)return;m.innerHTML='<div class="flex justify-center items-center py-6"><div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-400"></div></div>';const h=c?null:L();if(h){console.log("Using cached data for:",S),M(h,d),Date.now()-f>i&&R(!0);return}await R()}async function R(d=!1){if(g)return;g=!0;const c=t.querySelector("#rating-comments-list");try{const m=`${de}?source=${encodeURIComponent(S)}`;console.log("Fetching ratings from:",m);const h=await fetch(m,{headers:{"Cache-Control":"no-cache",Pragma:"no-cache"}});if(!h.ok)throw new Error(`HTTP error! status: ${h.status}`);const x=await h.json();console.log("Received ratings data:",x),$(x),f=Date.now(),M(x,o)}catch(m){console.error("Error loading comments:",m),!d&&c&&(c.innerHTML=`
          <div class="text-red-400 text-sm py-4 text-center">
            Failed to load reviews. ${m.message}
          </div>`)}finally{g=!1}}function M(d,c){l=Array.isArray(d.comments)?d.comments:[],d.total;const m=parseFloat(d.avg)||0;q(m);const h=m%1===0?m.toFixed(0):m.toFixed(m*10%1===0?1:2),x=t.querySelector("#rating-modal-avg"),w=t.querySelector("#rating-modal-total");x&&(x.textContent=d.avg?`${h} / 5`:"No ratings yet"),w&&(w.textContent=d.total?`(${d.total} ${d.total===1?"review":"reviews"})`:""),A(c)}function A(d=1){var ce;const c=document.getElementById("rating-comments-list");if(!c)return;const m=Array.isArray(l)?[...l]:[],h=((ce=document.getElementById("rating-sort-select"))==null?void 0:ce.value)||"recent",x=[...m].sort((p,P)=>h==="recent"?new Date(P.timestamp||0)-new Date(p.timestamp||0):h==="low"?(p.rating||0)-(P.rating||0)||new Date(P.timestamp||0)-new Date(p.timestamp||0):h==="high"?(P.rating||0)-(p.rating||0)||new Date(P.timestamp||0)-new Date(p.timestamp||0):0),w=10,T=Math.ceil(x.length/w),b=Math.min(Math.max(1,d),T||1),J=x.slice((b-1)*w,b*w);if(c.innerHTML=J.length>0?J.map(p=>`
        <div class="group relative p-4 rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-900/30 border border-white/5 hover:border-white/10 transition-all duration-300 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="relative">
            <!-- Header with user info and rating -->
            <div class="flex items-start justify-between mb-2">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-sm font-medium">
                  ${p.nickname?F(p.nickname.charAt(0).toUpperCase()):"?"}
                </div>
                <div>
                  <div class="font-medium text-white/90">${p.nickname?F(p.nickname):"Anonymous"}</div>
                  <div class="flex items-center gap-1 mt-0.5">
                    <div class="text-amber-400 text-xs flex">
                      ${"★".repeat(p.rating||0)}${"☆".repeat(5-(p.rating||0))}
                    </div>
                    <span class="text-xs text-white/40">•</span>
                    <span class="text-xs text-white/50" title="${F(new Date(p.timestamp||Date.now()).toLocaleString())}">
                      ${F(Te(p.timestamp||Date.now()))} 
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="flex items-center gap-2">
                <button 
                  class="translate-comment text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 px-2 py-1 rounded-md hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
                  data-comment="${p.message?encodeURIComponent(p.message):""}"
                  title="Translate this review"
                  ${p.message?"":"disabled"}
                >
                  <i class="fas fa-language text-xs"></i>
                  <span class="hidden sm:inline">Translate</span>
                </button>
                <div class="w-2 h-2 rounded-full ${(p.rating||0)>=3?"bg-emerald-500":"bg-amber-500"} shadow-pulse"></div>
                <span class="text-xs ${(p.rating||0)>=3?"text-emerald-400":"text-amber-400"}">
                  ${(p.rating||0)>=3?"Positive":"Needs Improvement"}
                </span>
              </div>
            </div>
            
            <!-- Comment text -->
            <div class="comment-container">
              <div class="pl-2 border-l-2 border-emerald-500/30 comment-text">
                <p class="text-sm text-white/80 leading-relaxed whitespace-pre-wrap" data-original="${p.message?F(p.message):""}">
                  "${p.message?F(p.message).replace(/\n/g,"<br>"):"No comment provided"}" 
                </p>
              </div>
            </div>
            
           
          </div>
        </div>
      `).join(""):`
      <div class="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div class="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
          <i class="far fa-comment-alt text-2xl text-emerald-400/60"></i>
        </div>
        <h4 class="text-white/90 font-medium mb-1">No Reviews Yet</h4>
        <p class="text-white/60 text-sm max-w-xs">Be the first to share your experience with this source!</p>
      </div>
      `,T>1){let p='<div class="flex flex-wrap gap-2 justify-center mt-6 pt-4 border-t border-white/5">';b>1&&(p+=`
          <button class="px-3 py-1.5 text-xs rounded-md bg-black/40 text-white/70 border border-white/5 hover:bg-black/60 hover:text-white transition-colors" 
                  data-page="${b-1}">
            <i class="fas fa-chevron-left mr-1"></i> Previous
          </button>`);const P=5;let G=Math.max(1,b-Math.floor(P/2)),ee=Math.min(T,G+P-1);ee-G+1<P&&(G=Math.max(1,ee-P+1));for(let N=G;N<=ee;N++)p+=`
          <button class="px-3 py-1.5 min-w-[2.25rem] text-xs rounded-md transition-all duration-200 ${N===b?"bg-emerald-500/90 text-white font-medium shadow-lg shadow-emerald-500/20":"bg-black/40 text-white/70 border border-white/5 hover:bg-black/60 hover:text-white"}" data-page="${N}">
            ${N}
          </button>`;b<T&&(p+=`
          <button class="px-3 py-1.5 text-xs rounded-md bg-black/40 text-white/70 border border-white/5 hover:bg-black/60 hover:text-white transition-colors" 
                  data-page="${b+1}">
            Next <i class="fas fa-chevron-right ml-1"></i>
          </button>`),p+="</div>",c.insertAdjacentHTML("afterend",p),document.querySelectorAll("#rating-comments-list + div [data-page]").forEach(N=>{N.addEventListener("click",$e=>{$e.preventDefault();const V=parseInt(N.dataset.page);!isNaN(V)&&V>=1&&V<=T&&(A(V),window.scrollTo({top:c.offsetTop-20,behavior:"smooth"}))})})}}function C(){const d=t.querySelector("#rating-sort-select");d&&(d.value=u,d.onchange=c=>{u=c.target.value,o=1,A(o)})}C(),E();function q(d){const c=t.querySelector("#rating-modal-stars");c.innerHTML="";for(let m=1;m<=5;++m)m<=Math.round(d)?c.innerHTML+='<svg class="inline-block w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" /></svg>':c.innerHTML+='<svg class="inline-block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>'}E();const U=t.querySelector("#submit-rating-form"),k=t.querySelector("#rating-form-error");U.onsubmit=async d=>{d.preventDefault(),k.textContent="",k.className="text-sm text-rose-400 mt-2";const c=new FormData(U),m=(c.get("nickname")||"").trim(),h=c.get("rating"),x=(c.get("comment")||"").trim();if(!m){k.textContent="Please enter a nickname.";return}if(!h||isNaN(h)||h<1||h>5){k.textContent="Please select a valid rating between 1 and 5.";return}if(!x){k.textContent="Please enter a message.";return}if(x.split(/\s+/).length<3){k.textContent="Message must be at least 3 words long.";return}const w=Me(),T=`hydra_rating_${e.title}_${w}`;if(localStorage.getItem(T)){k.textContent="You have already submitted a review for this source.";return}try{const b=await fetch(de,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({source:e.title,nickname:m,rating:Number(h),message:x,ipHash:w})});if(!b.ok){const J=await b.text();k.textContent=J||"Failed to submit.";return}localStorage.setItem(T,"1"),U.reset(),k.textContent="Submitted for moderation!",window.updateSourceCardRating&&await window.updateSourceCardRating(e.title),E(o)}catch{k.textContent="Failed to submit."}}}document.body.classList.add("preloading");document.addEventListener("DOMContentLoaded",async()=>{await Ae.initialize()});function Be(){const e=document.getElementById("preloader"),t=e.querySelector(".loading-progress"),s=e.querySelector(".loading-percentage");let a=0;const n=()=>{const r=100-a,i=Math.min(r*.1,Math.max(.2,Math.random()*.8));a=Math.min(100,a+i),t.style.width=`${a}%`;const o=a<100?a.toFixed(1):Math.round(a);s.textContent=`${o}%`,a<30?s.className="loading-percentage text-sm font-medium text-white/70":a<60?s.className="loading-percentage text-sm font-medium text-emerald-400/70":s.className="loading-percentage text-sm font-medium text-emerald-400",a<100?requestAnimationFrame(n):setTimeout(()=>{e.classList.add("hiding"),e.addEventListener("transitionend",()=>{e.remove(),document.body.classList.remove("preloading"),y.updatePageContent(),te()},{once:!0})},1e3)};setTimeout(()=>{e&&document.body.contains(e)&&(console.log("Preloader safety timeout triggered"),e.classList.add("hiding"),setTimeout(()=>{e.remove(),document.body.classList.remove("preloading"),y.updatePageContent(),te()},400))},5e3),setTimeout(()=>{requestAnimationFrame(n)},300)}function te(){const e=document.getElementById("language-switcher"),t=document.getElementById("language-dropdown");if(!e||!t)return;const s=e.cloneNode(!0);e.parentNode.replaceChild(s,e);const a=y.getCurrentLocale(),n=s.querySelector("span");if(n){const o={en:"English",ru:"Русский","pt-br":"Português"};n.textContent=o[a]||"English"}s.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),t.classList.contains("hidden")?(t.classList.remove("hidden"),s.classList.add("bg-white/10")):(t.classList.add("hidden"),s.classList.remove("bg-white/10"))}),t.querySelectorAll("button").forEach(o=>{o.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation();const l=o.dataset.lang;if(y.setLocale(l),t.classList.add("hidden"),s.classList.remove("bg-white/10"),n){const g={en:"English",ru:"Русский","pt-br":"Português"};n.textContent=g[l]||"English"}B()})}),document.addEventListener("click",o=>{s.contains(o.target)||(t.classList.add("hidden"),s.classList.remove("bg-white/10"))});const i=()=>{const o=e.querySelector("span"),u={en:"English",ru:"Русский","pt-br":"Português"};o.textContent=u[y.currentLocale]||"English"};document.addEventListener("languageChanged",i)}document.addEventListener("DOMContentLoaded",()=>{try{Be()}catch(r){console.error("Error initializing preloader:",r);const i=document.getElementById("preloader");i&&i.remove(),document.body.classList.remove("preloading"),y.updatePageContent(),te()}Ye();const e=document.getElementById("accept-cookies"),t=document.getElementById("reject-cookies"),s=document.getElementById("cookie-consent");e&&e.addEventListener("click",()=>{a(),X("cookie-consent","accepted",365)}),t&&t.addEventListener("click",()=>{a(),X("cookie-consent","rejected",365)});function a(){s.classList.add("translate-y-full"),s.addEventListener("transitionend",()=>{s.style.display="none"},{once:!0})}xe(),setTimeout(()=>{we()},300),Ke(),Ze(),Qe(),se(),Ne(),initializeMobileFilters();let n;window.addEventListener("resize",()=>{clearTimeout(n),n=setTimeout(()=>{se()},100)})});function xe(){try{console.log("Initializing sorting..."),document.querySelectorAll(".sort-option").forEach(t=>{t.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation();const a=t.getAttribute("data-sort");if(console.log("Sort option clicked:",a),a){ae(a);const n=document.getElementById("mobile-filters");n&&!n.classList.contains("hidden")&&(n.classList.add("hidden"),document.body.style.overflow="auto"),B()}})});const e=localStorage.getItem("currentSort")||"hot";console.log("Initial sort type:",e),ae(e),console.log("Sorting initialized with type:",e)}catch(e){console.error("Error initializing sorting:",e)}}let v=[],j="",D=null,I=1;const O={mobile:4,tablet:6,desktop:9,wide:15},H=document.getElementById("about-modal"),Pe=document.getElementById("about-btn"),be=document.getElementById("close-about"),z=document.getElementById("suggest-modal"),De=document.getElementById("suggest-btn"),Re=document.getElementById("close-suggest"),K=24*60*60*1e3;document.getElementById("mobile-filters-btn");document.getElementById("mobile-filters-modal");document.getElementById("close-mobile-filters");document.getElementById("mobile-filters-content");document.getElementById("reset-filters");document.getElementById("apply-filters");const Y=document.getElementById("active-filters-count"),Fe={tablet:768};function se(){var a;const e=document.getElementById("filters-sidebar"),t=(a=document.getElementById("mobile-filters-btn"))==null?void 0:a.parentElement;if(!e||!t)return;const s=window.innerWidth<Fe.tablet;e.classList.toggle("hidden",s),t.classList.toggle("hidden",!s)}function Ne(){const e=document.getElementById("mobile-filters-btn"),t=document.getElementById("mobile-filters-modal"),s=t==null?void 0:t.querySelector(".flex.flex-col.bg-\\[\\#111\\]"),a=t==null?void 0:t.querySelector(".bg-\\[\\#0A0A0A\\]");if(!e||!t||!s||!a)return;function n(){t.classList.remove("hidden"),t.offsetHeight,a.classList.add("opacity-100"),s.classList.remove("translate-y-full"),document.body.classList.add("overflow-hidden")}function r(){a.classList.remove("opacity-100"),s.classList.add("translate-y-full"),setTimeout(()=>{t.classList.add("hidden"),document.body.classList.remove("overflow-hidden")},300)}e.addEventListener("click",l=>{l.preventDefault(),n()});const i=document.getElementById("close-mobile-filters");i&&i.addEventListener("click",l=>{l.preventDefault(),r()}),t.addEventListener("click",l=>{l.target===t&&r()}),document.addEventListener("keydown",l=>{l.key==="Escape"&&!t.classList.contains("hidden")&&r()});const o=document.getElementById("reset-filters");o&&o.addEventListener("click",l=>{l.preventDefault(),je(),ye()});const u=document.getElementById("apply-filters");u&&u.addEventListener("click",l=>{l.preventDefault(),r(),B()})}function ye(){const e=He();Y&&(e>0?(Y.textContent=`${e} active`,Y.classList.remove("hidden")):Y.classList.add("hidden"))}function He(){let e=0;return j&&e++,D&&e++,localStorage.getItem("currentSort")&&e++,e}function je(){j="",D=null,localStorage.removeItem("currentSort"),document.querySelectorAll(".status-filter-btn div").forEach(e=>{e.classList.remove("bg-black/40")}),document.querySelectorAll(".games-filter-btn div").forEach(e=>{e.classList.remove("border-emerald-500/20","bg-black/40"),e.classList.add("border-white/5","bg-black/20")}),document.querySelectorAll(".sort-option").forEach(e=>{e.classList.remove("bg-white/10","text-white"),e.classList.add("text-white/70")}),B()}async function we(){try{v=(await(await fetch("data/resources.json")).json()).sources,console.log("Fetching ratings for all sources using batch endpoint...");try{const s=v.map(i=>i.title);console.log(`Fetching ratings for ${s.length} sources`);const a=`https://libraryratingsdb.zxcsixx.workers.dev/api/ratings?batch=true&sources=${s.map(encodeURIComponent).join(",")}`;console.log("Batch API URL:",a);const n=await fetch(a);if(console.log("Batch response status:",n.status),!n.ok)throw new Error(`HTTP error! status: ${n.status}`);const r=await n.json();console.log("Received batch ratings data:",JSON.stringify(r,null,2)),v.forEach(i=>{const o=r[i.title]||{avg:0,total:0};i.rating={avg:parseFloat(o.avg)||0,total:parseInt(o.total)||0},console.log(`Set rating for ${i.title}:`,JSON.stringify(i.rating,null,2))}),console.log("All ratings loaded via batch endpoint")}catch(s){console.error("Error in batch ratings fetch:",s),v.forEach(a=>{a.rating={avg:0,total:0}})}xe(),B(),ze()}catch(e){console.error("Error loading sources:",e);const t=document.getElementById("sources-container");t&&(t.innerHTML=`
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
            `)}finally{setTimeout(()=>{const e=document.getElementById("preloader");e&&(e.style.opacity="0",setTimeout(()=>{e.style.display="none",B()},300))},500)}}async function ze(){try{const e=new Promise((r,i)=>setTimeout(()=>i(new Error("Firebase request timed out")),5e3)),t=ne(re,"sources"),s=oe(t),n=(await Promise.race([s,e])).val();if(n){v=v.map(r=>{var f;const i=r.url.replace(/[^a-zA-Z0-9]/g,"_"),o=((f=n[i])==null?void 0:f.stats)||{installs:0,copies:0,activity:[]},u=Array.isArray(o.activity)?o.activity:[],l=Date.now(),g=u.filter(S=>l-S<K).length;return{...r,stats:{...o,recentActivity:g,activity:u}}}),v.forEach(r=>{le(r.url,r.stats)});try{localStorage.setItem("sourceStats",JSON.stringify(n)),localStorage.setItem("statsLastUpdated",Date.now().toString())}catch{}return!0}return!1}catch{try{const t=localStorage.getItem("sourceStats");if(t){const s=JSON.parse(t);v=v.map(a=>{var l;const n=a.url.replace(/[^a-zA-Z0-9]/g,"_"),r=((l=s[n])==null?void 0:l.stats)||{installs:0,copies:0,activity:[]},i=Array.isArray(r.activity)?r.activity:[],o=Date.now(),u=i.filter(g=>o-g<K).length;return{...a,stats:{...r,recentActivity:u,activity:i}}});try{const a=v.map(r=>encodeURIComponent(r.title)).join(","),n=await fetch(`https://libraryratingsdb.zxcsixx.workers.dev/api/ratings?batch=true&sources=${a}`);if(n.ok){const r=await n.json();v.forEach(i=>{const o=r[i.title]||{avg:0,total:0};ratingsMap[i.title]={avg:parseFloat(o.avg)||0,total:parseInt(o.total)||0}})}else throw new Error("Failed to fetch batch ratings")}catch(a){console.error("Error fetching batch ratings:",a),await Promise.all(v.map(async n=>{try{const i=await(await fetch(`https://libraryratingsdb.zxcsixx.workers.dev/api/ratings?source=${encodeURIComponent(n.title)}&page=1`)).json();ratingsMap[n.title]={avg:typeof i.avg=="number"?i.avg:0,total:typeof i.total=="number"?i.total:0}}catch(r){console.error(`Error fetching rating for ${n.title}:`,r),ratingsMap[n.title]={avg:0,total:0}}}))}return console.log("Using cached stats from localStorage"),!0}}catch{}return v=v.map(t=>({...t,stats:{installs:0,copies:0,recentActivity:0,activity:[]}})),!1}}function ue(e){document.querySelector("main").classList.add("blur-sm","transition-all","duration-200");const t=y.t.bind(y),s=document.createElement("div");s.className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in p-4",s.innerHTML=`
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
    `,document.body.appendChild(s);const a=()=>{document.querySelector("main").classList.remove("blur-sm"),s.remove()};s.querySelector(".cancel-btn").addEventListener("click",()=>{a(),e(!1)}),s.querySelector(".proceed-btn").addEventListener("click",()=>{a(),e(!0)}),s.querySelector(".fixed.inset-0").addEventListener("click",n=>{n.target===n.currentTarget&&(a(),e(!1))})}function me(e){document.querySelector("main").classList.add("blur-sm","transition-all","duration-200");const t=y.t.bind(y),s=document.createElement("div");s.className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in p-4",s.innerHTML=`
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
    `,document.body.appendChild(s);const a=()=>{document.querySelector("main").classList.remove("blur-sm"),s.remove()};s.querySelector(".cancel-btn").addEventListener("click",()=>{a(),e(!1)}),s.querySelector(".proceed-btn").addEventListener("click",()=>{a(),e(!0)}),s.querySelector(".fixed.inset-0").addEventListener("click",n=>{n.target===n.currentTarget&&(a(),e(!1))})}function Ue(e){var S,L,$,E,R;const t=y.getCurrentLocale(),a=(((S=y.translations[t])==null?void 0:S.sources)||{})[e.title]||{title:e.title,description:e.description},n=e.status.includes("Use At Your Own Risk"),r=e.stats||{installs:0,copies:0,recentActivity:0},i=parseInt(r.recentActivity||0),o=document.createElement("div");o.className="source-card animate-fade-in rounded-xl",o.dataset.url=e.url,o.dataset.name=e.title,o.dataset.copies=((L=e.stats)==null?void 0:L.copies)||0,o.dataset.installs=(($=e.stats)==null?void 0:$.installs)||0,o.dataset.activity=((E=e.stats)==null?void 0:E.recentActivity)||0;const u=e.status.map(M=>{const A=M.toLowerCase().replace(/\s+/g,"-"),C={trusted:{color:"emerald",icon:"shield",key:"trusted",customClass:"bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/30 "},"safe-for-use":{color:"blue",icon:"check-circle",key:"safeForUse",customClass:"bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/30"},"use-at-your-own-risk":{color:"red",icon:"exclamation-triangle",key:"useAtOwnRisk",customClass:"bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/30 "},"works-in-russia":{color:"teal",icon:"globe-europe",key:"worksInRussia",customClass:"bg-teal-500/10 border-teal-500/20 text-teal-400 hover:bg-teal-500/20 hover:border-teal-500/30 "},nsfw:{color:"purple",icon:"exclamation-circle",key:"nsfw",customClass:"bg-purple-500/10 border-purple-500/20 text-purple-400 hover:bg-purple-500/20 hover:border-purple-500/30 "}}[A]||{color:"gray",icon:"circle",key:A},q=`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs backdrop-blur-sm status-badge ${C.customClass||""}`,U=`bg-${C.color}-500/10 border border-${C.color}-500/20 text-${C.color}-400`,k=y.t(`status.${C.key}`);return`
            <span class="${C.customClass?q:`${q} ${U}`}">
                <i class="fas fa-${C.icon} text-[10px]"></i>
                ${k}
            </span>
        `}).join("");o.innerHTML=`
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
                <span>${e.gamesCount}</span>
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
                         ${n?"bg-red-500/10 border-red-500/20":"bg-emerald-500/10 border-emerald-500/20"} 
                         border group-hover:scale-110 transition-transform duration-300
                         backdrop-blur-sm">
                        <i class="fas ${n?"fa-triangle-exclamation text-red-500/70":"fa-book-open text-emerald-500/70"} 
                             text-lg"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="text-base font-medium text-white group-hover:text-${n?"red":"emerald"}-400 
                                   transition-colors duration-300 mb-1.5 truncate">
                            ${a.title}
                        </h3>
                        <p class="text-white/60 text-sm leading-relaxed line-clamp-2">
                            ${a.description}
                        </p>
                    </div>
                    
                </div>

                <!-- Stats and date (fixed at bottom) -->
                <div class="mt-2 pt-2 text-white/40 relative">
                    
                    
                    <div class="flex items-center justify-between">
                        <span class="hidden lg:flex items-center gap-1.5 text-white/40 text-[10px] sm:text-xs">
                            <i class="fas fa-calendar-alt text-[10px] hidden sm:inline"></i>
                            <span class="whitespace-nowrap">${Ve(e.addedDate)}</span>
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
                        ${y.t("common.install")}
                    </button>
                    <button class="copy-btn shrink-0 bg-white/5 hover:bg-white/10 text-white/70 
                                 border border-white/10 rounded-lg px-4 py-2 text-sm
                                 transition-all duration-200 flex items-center justify-center gap-2
                                 hover:scale-[1.02] backdrop-blur-sm" data-url="${e.url}">
                        <i class="fas fa-copy text-[10px]"></i>
                        ${y.t("common.copy")}
                    </button>
                </div>
            </div>
        </div>
    `;const l=(R=o.querySelector("[data-rating-stars-container]"))==null?void 0:R.parentElement;l&&(l.addEventListener("click",M=>{M.stopPropagation(),qe(e)}),Ie(o,e.rating));const g=o.querySelector(".install-btn"),f=o.querySelector(".copy-btn");return f&&f.addEventListener("click",async()=>{const M=async()=>{await fe(e.url,"copy")&&(navigator.clipboard.writeText(e.url),f.innerHTML='<i class="fas fa-check text-[10px]"></i> '+y.t("sourceCard.copied"),setTimeout(()=>{f.innerHTML='<i class="fas fa-copy text-[10px]"></i> '+y.t("sourceCard.copy")},2e3))},A=e.title==="CPGRepacks";n||A?(A?me:ue)(q=>{q&&M()}):M()}),g&&g.addEventListener("click",async()=>{const M=async()=>{he(g,"loading");const C=await fe(e.url,"install");if(he(g,C?"success":"rate-limited"),C){const q=encodeURIComponent(e.url);window.location.href=`hydralauncher://install-source?urls=${q}`}},A=e.title==="CPGRepacks";e.status.includes("Use At Your Own Risk")||A?(A?me:ue)(q=>{q&&M()}):M()}),le(e.url,e.stats),o.dataset.copies=r.copies||0,o.dataset.installs=r.installs||0,o.dataset.activity=i,o}let W="wide";function Se(){const e=window.innerWidth;return e>=1536?"wide":e>=1024?"desktop":e>=640?"tablet":"mobile"}let ge;window.addEventListener("resize",()=>{clearTimeout(ge),ge=setTimeout(()=>{se();const e=Se();if(W!==e){const s=ie(),a=Z(),n=Math.ceil(s.length/a);if(W==="wide"&&e==="desktop"){const r=(I-1)*O.desktop;I=Math.floor(r/O.desktop)+1}W=e,I=Math.min(Math.max(1,I),n),B(s),a<Z()&&window.scrollTo({top:0,behavior:"smooth"})}},100)});function pe(e,t){return console.log(`Sorting sources by: ${t}`),[...e].sort((s,a)=>{var n,r,i,o,u,l,g,f,S,L,$,E;try{switch(t){case"hot":const R=((n=s.stats)==null?void 0:n.recentActivity)||0;return(((r=a.stats)==null?void 0:r.recentActivity)||0)-R;case"new":return new Date(a.addedDate||0)-new Date(s.addedDate||0);case"most-copies":const A=((i=s.stats)==null?void 0:i.copies)||0;return(((o=a.stats)==null?void 0:o.copies)||0)-A;case"most-installs":const q=((u=s.stats)==null?void 0:u.installs)||0;return(((l=a.stats)==null?void 0:l.installs)||0)-q;case"top-rated":console.log(`Comparing ratings: ${s.title} (${((g=s.rating)==null?void 0:g.avg)||0}) vs ${a.title} (${((f=a.rating)==null?void 0:f.avg)||0})`),console.log(`Full rating data for ${s.title}:`,s.rating),console.log(`Full rating data for ${a.title}:`,a.rating);const k=((S=s.rating)==null?void 0:S.avg)||0,d=((L=a.rating)==null?void 0:L.avg)||0;if(k===d){const c=(($=s.rating)==null?void 0:$.total)||0,m=((E=a.rating)==null?void 0:E.total)||0;return console.log(`Ratings equal (${k}), comparing counts: ${c} vs ${m}`),m-c}return console.log(`Sorting by rating: ${d} - ${k} = ${d-k}`),d-k;case"name-asc":return(s.title||"").localeCompare(a.title||"");case"name-desc":return(a.title||"").localeCompare(s.title||"");default:return 0}}catch(R){return console.error("Error in sort function:",R),console.error("Sort type:",t),console.error("Source A:",s),console.error("Source B:",a),0}})}function ae(e){var t;try{console.log("Updating active sort UI for:",e);const s=document.querySelector(".mobile-sort-button span");if(s){const n=((t=document.querySelector(`.sort-option[data-sort="${e}"]`))==null?void 0:t.textContent)||"Sort";s.textContent=n}document.querySelectorAll(".sort-option").forEach(n=>{const r=n.getAttribute("data-sort")===e;n.classList.toggle("bg-white/10",r),n.classList.toggle("text-white",r),n.classList.toggle("text-white/70",!r);const i=n.querySelector("i.fa-check");i&&(i.style.opacity=r?"1":"0")});const a=document.getElementById("sort-dropdown");a&&!a.classList.contains("hidden")&&a.classList.add("hidden"),localStorage.setItem("currentSort",e)}catch(s){console.error("Error updating sort UI:",s)}}function B(e=null){const t=document.getElementById("sources-container");if(t){t.innerHTML="";try{let s=e||ie();console.log(`Displaying ${s.length} filtered sources`);const a=localStorage.getItem("currentSort")||"hot";if(console.log("Current sort type:",a),a){console.log("Before sorting - first few sources:",s.slice(0,3).map(l=>{var g,f;return{title:l.title,rating:l.rating,hasRating:!!((g=l.rating)!=null&&g.avg||(f=l.rating)!=null&&f.total)}}));try{s=pe(s,a),console.log("After sorting - first few sources:",s.slice(0,3).map(l=>{var g,f;return{title:l.title,rating:l.rating,sortKey:a==="top-rated"?`${((g=l.rating)==null?void 0:g.avg)||0} (${((f=l.rating)==null?void 0:f.total)||0} ratings)`:l[a]||"N/A"}})),ae(a)}catch(l){console.error("Error during sorting:",l),s=pe(s,"hot")}}W=Se();const n=Z(),r=Math.ceil(s.length/n);I=Math.min(Math.max(1,I),r);const i=(I-1)*n,o=Math.min(i+n,s.length);s.slice(i,o).forEach(l=>{const g=Ue(l);t.appendChild(g)}),Oe(r),y.updatePageContent()}catch(s){console.error("Error in displaySources:",s),t.innerHTML=`
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
        `}}}function Z(){const e=window.innerWidth;return e>=2560?O.wide:e>=1024?O.desktop:e>=640?O.tablet:O.mobile}function Oe(e){const t=document.getElementById("pagination");if(!t)return;let s="";s+=`
        <button onclick="changePage(${I-1})" 
                class="px-2 py-1.5 text-sm text-white/50 hover:text-white disabled:opacity-50 
                       transition-colors duration-200 rounded-md hover:bg-white/5"
                ${I===1?"disabled":""}>
            <i class="fas fa-chevron-left"></i>
        </button>
    `;for(let a=1;a<=e;a++)a===I?s+=`
                <button class="px-3 py-1.5 text-sm bg-white/10 text-white rounded-md">
                    ${a}
                </button>
            `:s+=`
                <button onclick="changePage(${a})" 
                        class="px-3 py-1.5 text-sm text-white/50 hover:text-white hover:bg-white/5 
                               transition-colors duration-200 rounded-md">
                    ${a}
                </button>
            `;s+=`
        <button onclick="changePage(${I+1})" 
                class="px-2 py-1.5 text-sm text-white/50 hover:text-white disabled:opacity-50 
                       transition-colors duration-200 rounded-md hover:bg-white/5"
                ${I===e?"disabled":""}>
            <i class="fas fa-chevron-right"></i>
        </button>
    `,t.innerHTML=s}window.changePage=function(e){if(e<1)return;const t=ie(),s=Math.ceil(t.length/Z());e>s||(I=e,B(t),window.scrollTo({top:0,behavior:"smooth"}))};document.querySelectorAll(".status-filter-btn").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.status;document.querySelectorAll(".status-filter-btn").forEach(s=>{s.querySelector("div").classList.remove("bg-black/40")}),j===t?j="":(j=t,e.querySelector("div").classList.add("bg-black/40")),I=1,B(),Le(),dispatchFiltersChanged()})});document.querySelectorAll(".games-filter-btn").forEach(e=>{e.addEventListener("click",()=>{const t=parseInt(e.dataset.min),s=parseInt(e.dataset.max);if(document.querySelectorAll(".games-filter-btn div").forEach(a=>{a.classList.remove("border-emerald-500/20","bg-black/40"),a.classList.add("border-white/5","bg-black/20")}),D&&D.min===t&&D.max===s)D=null;else{D={min:t,max:s};const a=e.querySelector("div");a.classList.remove("border-white/5","bg-black/20"),a.classList.add("border-emerald-500/20","bg-black/40")}I=1,B(),Le(),ye(),dispatchFiltersChanged()})});function Le(){const e={};v.forEach(t=>{t.status.forEach(s=>{e[s]=(e[s]||0)+1})}),document.querySelectorAll(".status-filter-btn").forEach(t=>{const s=t.dataset.status,a=t.querySelector(".text-white\\/40");a&&(a.textContent=e[s]||0)}),document.querySelectorAll(".games-filter-btn").forEach(t=>{const s=parseInt(t.dataset.min),a=parseInt(t.dataset.max),n=v.filter(o=>{const u=parseInt(o.gamesCount);return u>=s&&u<=a}).length,r=t.querySelector(".text-white\\/40");r&&(r.textContent=n);const i=t.querySelector(".bg-emerald-500\\/50");if(i){const o=Math.max(...Array.from(document.querySelectorAll(".games-filter-btn")).map(l=>{const g=parseInt(l.dataset.min),f=parseInt(l.dataset.max);return v.filter(S=>{const L=parseInt(S.gamesCount);return L>=g&&L<=f}).length})),u=o>0?n/o*100:0;i.style.width=`${u}%`}})}let _="";document.getElementById("search").addEventListener("input",e=>{_=e.target.value.toLowerCase(),I=1,B()});function ie(){return v.filter(e=>{const t=!_||e.title.toLowerCase().includes(_)||e.description.toLowerCase().includes(_)||e.url.toLowerCase().includes(_),s=!j||e.status.includes(j),a=parseInt(e.gamesCount),n=!D||a>=D.min&&a<=D.max;return t&&s&&n})}const Ee=document.getElementById("sort-dropdown-btn"),Q=document.getElementById("sort-dropdown"),_e=document.getElementById("current-sort");Ee.addEventListener("click",()=>{Q.classList.toggle("hidden")});document.addEventListener("click",e=>{!Ee.contains(e.target)&&!Q.contains(e.target)&&Q.classList.add("hidden")});document.querySelectorAll(".sort-option").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.sort;switch(_e.textContent=e.textContent.trim(),Q.classList.add("hidden"),t){case"high-to-low":sortGamesFilters(!1);break;case"low-to-high":sortGamesFilters(!0);break;case"most-sources":Je();break;case"most-popular":Ge();break}})});function Je(){const e=document.querySelector(".games-filter-btn").parentNode,t=Array.from(e.querySelectorAll(".games-filter-btn"));t.sort((s,a)=>{const n=parseInt(s.querySelector(".text-white\\/40").textContent);return parseInt(a.querySelector(".text-white\\/40").textContent)-n}),t.forEach(s=>s.remove()),t.forEach(s=>e.appendChild(s))}function Ge(){const e=JSON.parse(localStorage.getItem("sourceStats")||"{}"),t=document.querySelector(".games-filter-btn").parentNode,s=Array.from(t.querySelectorAll(".games-filter-btn"));s.sort((a,n)=>{var f,S;const r=((f=v.find(L=>L.gamesCount===a.dataset.min))==null?void 0:f.url)||"",i=((S=v.find(L=>L.gamesCount===n.dataset.min))==null?void 0:S.url)||"",o=e[r]||{installs:0,copies:0},u=e[i]||{installs:0,copies:0},l=o.installs+o.copies;return u.installs+u.copies-l}),s.forEach(a=>a.remove()),s.forEach(a=>t.appendChild(a))}function Ve(e){const t=new Date(e),a=Math.abs(new Date-t),n=Math.floor(a/(1e3*60*60*24)),r=y.t.bind(y);if(n===0)return r("common.date.today");if(n===1)return r("common.date.yesterday");if(n<30)return r("common.date.daysAgo",{days:n});{const i={year:"numeric",month:"short",day:"numeric"};return t.toLocaleDateString(y.getCurrentLocale(),i)}}document.addEventListener("DOMContentLoaded",()=>{we(),sortGamesFilters(!1)});Pe.addEventListener("click",()=>{H.classList.remove("hidden"),document.body.style.overflow="hidden"});be.addEventListener("click",()=>{H.classList.add("hidden"),document.body.style.overflow=""});H.addEventListener("click",e=>{e.target===H&&be.click()});document.addEventListener("keydown",e=>{e.key==="Escape"&&!H.classList.contains("hidden")&&(H.classList.add("hidden"),document.body.style.overflow="")});De.addEventListener("click",()=>{z.classList.remove("hidden"),document.body.style.overflow="hidden"});Re.addEventListener("click",()=>{z.classList.add("hidden"),document.body.style.overflow=""});z.addEventListener("click",e=>{e.target===z&&(z.classList.add("hidden"),document.body.style.overflow="")});document.addEventListener("keydown",e=>{e.key==="Escape"&&(H.classList.contains("hidden")||(H.classList.add("hidden"),document.body.style.overflow=""),z.classList.contains("hidden")||(z.classList.add("hidden"),document.body.style.overflow=""))});function X(e,t,s){const a=new Date;a.setTime(a.getTime()+s*24*60*60*1e3),document.cookie=`${e}=${t};expires=${a.toUTCString()};path=/`}function ke(e){const t=e+"=",s=document.cookie.split(";");for(let a=0;a<s.length;a++){let n=s[a];for(;n.charAt(0)===" ";)n=n.substring(1,n.length);if(n.indexOf(t)===0)return n.substring(t.length,n.length)}return null}async function fe(e,t){try{const s=e.replace(/[^a-zA-Z0-9]/g,"_"),a=`${t}_${s}`;if(ke(a))return!0;let n={installs:0,copies:0,activity:[],recentActivity:0};try{const i=new Promise(($,E)=>setTimeout(()=>E(new Error("Firebase request timed out")),3e3)),o=ne(re,`sources/${s}/stats`),u=oe(o),g=(await Promise.race([u,i])).val()||{installs:0,copies:0,activity:[]},f=Date.now(),L=(Array.isArray(g.activity)?g.activity:[]).filter($=>f-$<K);L.push(f),n={installs:parseInt(g.installs||0)+(t==="install"?1:0),copies:parseInt(g.copies||0)+(t==="copy"?1:0),activity:L,recentActivity:L.length,lastUpdated:f},await Promise.race([ve(o,n),new Promise(($,E)=>setTimeout(()=>E(new Error("Update timed out")),3e3))]);try{const $=localStorage.getItem("sourceStats");if($){const E=JSON.parse($);E[s]||(E[s]={}),E[s].stats=n,localStorage.setItem("sourceStats",JSON.stringify(E)),localStorage.setItem("statsLastUpdated",f.toString())}}catch{}}catch{console.log("Firebase update failed, continuing with local data");const o=v.find(u=>u.url===e);if(o&&o.stats){n={installs:parseInt(o.stats.installs||0)+(t==="install"?1:0),copies:parseInt(o.stats.copies||0)+(t==="copy"?1:0),activity:[],recentActivity:1,lastUpdated:Date.now()};try{const u=localStorage.getItem("sourceStats");if(u){const l=JSON.parse(u);l[s]||(l[s]={}),l[s].stats=n,localStorage.setItem("sourceStats",JSON.stringify(l)),localStorage.setItem("statsLastUpdated",Date.now().toString())}}catch{}}}X(a,"true",t==="install"?.003472222:347222e-9),le(e,n);const r=v.findIndex(i=>i.url===e);return r!==-1&&(v[r].stats=n),!0}catch{return!1}}function le(e,t=null){const s=document.querySelectorAll(".source-card"),a=Array.from(s).find(n=>n.dataset.url===e);if(a){const n=a.querySelector(".source-stats");if(n){const r=parseInt((t==null?void 0:t.installs)||0),i=parseInt((t==null?void 0:t.copies)||0),o=parseInt((t==null?void 0:t.recentActivity)||0);n.innerHTML=`
                <span class="flex items-center gap-1.5">
                    <i class="fas fa-fire text-[10px] ${o>0?"text-red-500":""}"></i>
                    ${o}
                </span>
                <span class="flex items-center gap-1.5">
                    <i class="fas fa-download text-[10px]"></i>
                    ${r}
                </span>
                <span class="flex items-center gap-1.5">
                    <i class="fas fa-copy text-[10px]"></i>
                    ${i}
                </span>
            `}a.dataset.copies=(t==null?void 0:t.copies)||0,a.dataset.installs=(t==null?void 0:t.installs)||0,a.dataset.activity=(t==null?void 0:t.recentActivity)||0}}function he(e,t){const s=e.innerHTML;switch(t){case"loading":e.disabled=!0,e.innerHTML=`
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
            `,setTimeout(()=>{e.disabled=!1,e.innerHTML=s},2e3);break;default:e.disabled=!1,e.innerHTML=s}}function Ye(){const e=document.getElementById("cookie-consent");ke("cookie-consent")?e.style.display="none":(e.style.display="block",setTimeout(()=>{e.classList.remove("translate-y-full")},500))}document.getElementById("accept-cookies").addEventListener("click",()=>{const e=document.getElementById("cookie-consent");e.classList.add("translate-y-full"),e.addEventListener("transitionend",()=>{e.style.display="none"},{once:!0}),X("cookie-consent","accepted",365)});async function We(e){try{const t=ne(re,`sources/${e}/stats`),a=(await oe(t)).val();if(a&&a.activity){const n=a.activity.filter(r=>Date.now()-r<K);n.length!==a.activity.length&&await ve(t,{activity:n})}}catch{}}function Ke(){const e=document.getElementById("suggest-modal"),t=document.getElementById("suggest-btn"),s=document.getElementById("close-suggest");t&&t.addEventListener("click",()=>{e.classList.remove("hidden")}),s&&s.addEventListener("click",()=>{e.classList.add("hidden")}),e&&e.addEventListener("click",a=>{a.target===e&&e.classList.add("hidden")})}function Ze(){const e=document.getElementById("search");if(e){const t=()=>{const a=window.innerWidth<640?"header.searchMobile":"header.search";e.placeholder=y.t(a)};t(),window.addEventListener("resize",t),document.addEventListener("languageChanged",t)}}function Qe(){setInterval(()=>{v.forEach(e=>{const t=e.url.replace(/[^a-zA-Z0-9]/g,"_");We(t)})},60*60*1e3)}async function Xe(e){const t=v.find(s=>s.title===e);if(t&&t.rating){const s={avg:parseFloat(t.rating.avg||0),total:parseInt(t.rating.total||0)};return Ce(e,s),!0}return et()}async function et(){try{if(!v||v.length===0)return!1;const e=[...new Set(v.map(n=>n.title))];if(e.length===0)return!1;const t=`https://libraryratingsdb.zxcsixx.workers.dev/api/ratings?batch=true&sources=${e.map(encodeURIComponent).join(",")}`,s=await fetch(t);if(!s.ok)throw new Error("Failed to fetch batch rating data");const a=await s.json();return v.forEach(n=>{const r=a[n.title]||{avg:0,total:0};n.rating={avg:parseFloat(r.avg)||0,total:parseInt(r.total)||0},Ce(n.title,n.rating)}),!0}catch(e){return console.error("Error updating all source ratings:",e),!1}}function Ce(e,t){document.querySelectorAll(".source-card").forEach(a=>{a.dataset.name===e&&Ie(a,t)})}function Ie(e,t){console.log("Updating card rating display for:",e.dataset.name,"with data:",JSON.stringify(t,null,2));const s=e.querySelector("[data-rating-stars-active]"),a=e.querySelector("[data-rating-avg]"),n=e.querySelector("[data-rating-total]"),r=e.querySelector("[data-rating-comment]");if(console.log("Found elements:",{starsActive:!!s,avgEl:!!a,totalEl:!!n,commentEl:!!r}),s&&a&&n)if(t&&(typeof t.avg=="number"||t.avg===0)){const i=t.avg/5*100,o=Math.round(i/10)*10;console.log(`Setting rating: avg=${t.avg}, total=${t.total}, starPercentage=${i}%, rounded=${o}%`),s.style.width=`${o}%`,a.textContent=t.avg>0?t.avg.toFixed(1):"–",n.textContent=t.total>0?`(${t.total})`:"",r&&(r.style.display=t.total>0?"inline-block":"none",console.log(`Comment icon display set to: ${r.style.display}`))}else console.log("No valid rating data, setting default state"),s.style.width="0%",a.textContent="–",n.textContent="",r&&(r.style.display="none");else console.error("Missing required rating elements on card:",{starsActive:!!s,avgEl:!!a,totalEl:!!n})}window.updateSourceCardRating=Xe;document.addEventListener("languageChanged",()=>{B()});
