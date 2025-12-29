import{initializeApp as v}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";import{getFirestore as h,collection as b,query as y,orderBy as L,getDocs as w}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";import{getAuth as E,GoogleAuthProvider as x}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();const k={apiKey:"AIzaSyAu9ywoXU9ay-umRkOABqj5abLNhhcp_U8",authDomain:"personal-blog-f3a4d.firebaseapp.com",projectId:"personal-blog-f3a4d",storageBucket:"personal-blog-f3a4d.firebasestorage.app",messagingSenderId:"124020519186",appId:"1:124020519186:web:2e56317df325efc6bd83cb",measurementId:"G-1M4HNPWMMH"},f=v(k),A=h(f);E(f);new x;document.addEventListener("DOMContentLoaded",function(){const o=document.getElementById("navbar"),e=document.querySelectorAll(".nav-link"),n=document.getElementById("mobile-menu-toggle"),i=document.querySelector(".nav-menu");window.addEventListener("scroll",()=>{window.scrollY>50?o.classList.add("scrolled"):o.classList.remove("scrolled"),t()}),n.addEventListener("click",()=>{n.classList.toggle("active"),i.classList.toggle("active")}),e.forEach(r=>{r.addEventListener("click",()=>{n.classList.remove("active"),i.classList.remove("active")})}),e.forEach(r=>{r.addEventListener("click",function(a){a.preventDefault();const s=this.getAttribute("href"),c=document.querySelector(s);if(c){const d=c.offsetTop-80;window.scrollTo({top:d,behavior:"smooth"})}})});function t(){const r=document.querySelectorAll("section[id]"),a=window.scrollY+100;r.forEach(s=>{const c=s.offsetTop,d=s.offsetHeight,p=s.getAttribute("id");a>=c&&a<c+d&&e.forEach(m=>{m.classList.remove("active"),m.getAttribute("href")===`#${p}`&&m.classList.add("active")})})}S()});async function S(){const o=document.getElementById("blog-container");if(o)try{const e=b(A,"blogs"),n=y(e,L("createdAt","desc")),i=await w(n);if(o.innerHTML="",i.empty){o.innerHTML=`
                <div class="blog-loading">
                    <p>No posts yet. Stay tuned!</p>
                </div>
            `;return}let t=0;i.forEach(a=>{const s=a.data(),c=`
                <article class="blog-card" data-aos="fade-up" data-aos-delay="${t}">
                    <div class="blog-card-header">
                        <div class="blog-category">${s.category||"General"}</div>
                        <div class="blog-date">${s.date||""}</div>
                    </div>
                    <h3 class="blog-title">${s.title}</h3>
                    <p class="blog-excerpt">${s.excerpt}</p>
                    <div class="blog-footer">
                        <div class="blog-read-time">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="8" cy="8" r="6" />
                                <path d="M8 4v4l3 2" />
                            </svg>
                            <span>${s.readTime||"5 min read"}</span>
                        </div>
                        <a href="${s.link||"#"}" class="blog-read-more" ${s.link?'target="_blank"':""}>
                            Read More
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </a>
                    </div>
                </article>
            `;o.insertAdjacentHTML("beforeend",c),t+=100});const r=`
            <article class="blog-card blog-card-add" data-aos="fade-up" data-aos-delay="${t}">
                <div class="blog-add-content">
                    <div class="blog-add-icon">✍️</div>
                    <h3 class="blog-add-title">More Coming Soon</h3>
                    <p class="blog-add-text">
                        I regularly share insights about engineering, product management, and leadership.
                    </p>
                </div>
            </article>
        `;o.insertAdjacentHTML("beforeend",r),typeof l=="function"&&l()}catch(e){console.error("Error loading blogs: ",e),o.innerHTML=`
            <div class="blog-loading">
                <p>Failed to load blogs. Please try again later.</p>
            </div>
        `}}const C={threshold:.1,rootMargin:"0px 0px -50px 0px"},u=new IntersectionObserver(o=>{o.forEach(e=>{e.isIntersecting&&(e.target.style.opacity="1",e.target.style.transform="translateY(0)")})},C);document.addEventListener("DOMContentLoaded",()=>{const o=document.querySelectorAll(".timeline-item"),e=document.querySelectorAll(".skill-category");o.forEach(n=>{u.observe(n)}),e.forEach(n=>{u.observe(n)})});document.addEventListener("mousemove",o=>{const e=document.querySelectorAll(".gradient-orb"),n=o.clientX/window.innerWidth,i=o.clientY/window.innerHeight;e.forEach((t,r)=>{const a=(r+1)*20,s=(n-.5)*a,c=(i-.5)*a;t.style.transform=`translate(${s}px, ${c}px)`})});function l(){document.querySelectorAll("[data-aos]").forEach(e=>{const n=window.innerHeight;e.getBoundingClientRect().top<n-150&&e.classList.add("aos-animate")})}window.addEventListener("scroll",l);document.addEventListener("DOMContentLoaded",l);document.addEventListener("DOMContentLoaded",()=>{const o=document.querySelector(".profile-card");o&&(o.addEventListener("mousemove",e=>{const n=o.getBoundingClientRect(),i=e.clientX-n.left,t=e.clientY-n.top,r=n.width/2,a=n.height/2,s=(t-a)/20,c=(r-i)/20;o.style.transform=`perspective(1000px) rotateX(${s}deg) rotateY(${c}deg) translateY(-8px)`}),o.addEventListener("mouseleave",()=>{o.style.transform="perspective(1000px) rotateX(0) rotateY(0) translateY(0)"}))});document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll(".skill-badge").forEach((e,n)=>{e.style.animationDelay=`${n*.05}s`})});document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll('a[href^="mailto:"]').forEach(e=>{e.addEventListener("click",n=>{const i=e.getAttribute("href").replace("mailto:",""),t=document.createElement("input");t.value=i,document.body.appendChild(t),t.select();try{document.execCommand("copy"),M("Email copied to clipboard!")}catch(r){console.error("Failed to copy email:",r)}document.body.removeChild(t)})})});function M(o,e=3e3){const n=document.querySelector(".notification");n&&n.remove();const i=document.createElement("div");i.className="notification",i.textContent=o,Object.assign(i.style,{position:"fixed",bottom:"2rem",right:"2rem",padding:"1rem 2rem",background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",color:"white",borderRadius:"12px",boxShadow:"0 8px 32px rgba(0, 0, 0, 0.3)",zIndex:"9999",animation:"slideInRight 0.3s ease-out",fontWeight:"600",fontSize:"0.95rem"}),document.body.appendChild(i),setTimeout(()=>{i.style.animation="slideOutRight 0.3s ease-out",setTimeout(()=>i.remove(),300)},e)}const g=document.createElement("style");g.textContent=`
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .aos-animate {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;document.head.appendChild(g);function I(o,e=10){let n;return function(...t){const r=()=>{clearTimeout(n),o(...t)};clearTimeout(n),n=setTimeout(r,e)}}window.addEventListener("scroll",I(()=>{l()},10));console.log("%c👋 Hello, curious developer!","font-size: 20px; font-weight: bold; color: #667eea;");console.log("%cLike what you see? Let's connect!","font-size: 14px; color: #b4b8d4;");console.log("%chttps://www.linkedin.com/in/malekziad/","font-size: 12px; color: #00f2fe;");
