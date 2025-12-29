import{d as f}from"./firebase-config-m-BJ8Ik1.js";import{collection as v,query as h,orderBy as b,getDocs as y}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";import"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";import"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";document.addEventListener("DOMContentLoaded",function(){const e=document.getElementById("navbar"),t=document.querySelectorAll(".nav-link"),o=document.getElementById("mobile-menu-toggle"),n=document.querySelector(".nav-menu");window.addEventListener("scroll",()=>{window.scrollY>50?e.classList.add("scrolled"):e.classList.remove("scrolled"),a()}),o.addEventListener("click",()=>{o.classList.toggle("active"),n.classList.toggle("active")}),t.forEach(s=>{s.addEventListener("click",()=>{o.classList.remove("active"),n.classList.remove("active")})}),t.forEach(s=>{s.addEventListener("click",function(r){r.preventDefault();const i=this.getAttribute("href"),c=document.querySelector(i);if(c){const d=c.offsetTop-80;window.scrollTo({top:d,behavior:"smooth"})}})});function a(){const s=document.querySelectorAll("section[id]"),r=window.scrollY+100;s.forEach(i=>{const c=i.offsetTop,d=i.offsetHeight,p=i.getAttribute("id");r>=c&&r<c+d&&t.forEach(m=>{m.classList.remove("active"),m.getAttribute("href")===`#${p}`&&m.classList.add("active")})})}L()});async function L(){const e=document.getElementById("blog-container");if(e)try{const t=v(f,"blogs"),o=h(t,b("createdAt","desc")),n=await y(o);if(e.innerHTML="",n.empty){e.innerHTML=`
                <div class="blog-loading">
                    <p>No posts yet. Stay tuned!</p>
                </div>
            `;return}let a=0;n.forEach(r=>{const i=r.data(),c=`
                <article class="blog-card" data-aos="fade-up" data-aos-delay="${a}">
                    <div class="blog-card-header">
                        <div class="blog-category">${i.category||"General"}</div>
                        <div class="blog-date">${i.date||""}</div>
                    </div>
                    <h3 class="blog-title">${i.title}</h3>
                    <p class="blog-excerpt">${i.excerpt}</p>
                    <div class="blog-footer">
                        <div class="blog-read-time">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="8" cy="8" r="6" />
                                <path d="M8 4v4l3 2" />
                            </svg>
                            <span>${i.readTime||"5 min read"}</span>
                        </div>
                        <a href="${i.link||"#"}" class="blog-read-more" ${i.link?'target="_blank"':""}>
                            Read More
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </a>
                    </div>
                </article>
            `;e.insertAdjacentHTML("beforeend",c),a+=100});const s=`
            <article class="blog-card blog-card-add" data-aos="fade-up" data-aos-delay="${a}">
                <div class="blog-add-content">
                    <div class="blog-add-icon">✍️</div>
                    <h3 class="blog-add-title">More Coming Soon</h3>
                    <p class="blog-add-text">
                        I regularly share insights about engineering, product management, and leadership.
                    </p>
                </div>
            </article>
        `;e.insertAdjacentHTML("beforeend",s),typeof l=="function"&&l()}catch(t){console.error("Error loading blogs: ",t),e.innerHTML=`
            <div class="blog-loading">
                <p>Failed to load blogs. Please try again later.</p>
            </div>
        `}}const w={threshold:.1,rootMargin:"0px 0px -50px 0px"},u=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&(t.target.style.opacity="1",t.target.style.transform="translateY(0)")})},w);document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelectorAll(".timeline-item"),t=document.querySelectorAll(".skill-category");e.forEach(o=>{u.observe(o)}),t.forEach(o=>{u.observe(o)})});document.addEventListener("mousemove",e=>{const t=document.querySelectorAll(".gradient-orb"),o=e.clientX/window.innerWidth,n=e.clientY/window.innerHeight;t.forEach((a,s)=>{const r=(s+1)*20,i=(o-.5)*r,c=(n-.5)*r;a.style.transform=`translate(${i}px, ${c}px)`})});function l(){document.querySelectorAll("[data-aos]").forEach(t=>{const o=window.innerHeight;t.getBoundingClientRect().top<o-150&&t.classList.add("aos-animate")})}window.addEventListener("scroll",l);document.addEventListener("DOMContentLoaded",l);document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".profile-card");e&&(e.addEventListener("mousemove",t=>{const o=e.getBoundingClientRect(),n=t.clientX-o.left,a=t.clientY-o.top,s=o.width/2,r=o.height/2,i=(a-r)/20,c=(s-n)/20;e.style.transform=`perspective(1000px) rotateX(${i}deg) rotateY(${c}deg) translateY(-8px)`}),e.addEventListener("mouseleave",()=>{e.style.transform="perspective(1000px) rotateX(0) rotateY(0) translateY(0)"}))});document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll(".skill-badge").forEach((t,o)=>{t.style.animationDelay=`${o*.05}s`})});document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll('a[href^="mailto:"]').forEach(t=>{t.addEventListener("click",o=>{const n=t.getAttribute("href").replace("mailto:",""),a=document.createElement("input");a.value=n,document.body.appendChild(a),a.select();try{document.execCommand("copy"),E("Email copied to clipboard!")}catch(s){console.error("Failed to copy email:",s)}document.body.removeChild(a)})})});function E(e,t=3e3){const o=document.querySelector(".notification");o&&o.remove();const n=document.createElement("div");n.className="notification",n.textContent=e,Object.assign(n.style,{position:"fixed",bottom:"2rem",right:"2rem",padding:"1rem 2rem",background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",color:"white",borderRadius:"12px",boxShadow:"0 8px 32px rgba(0, 0, 0, 0.3)",zIndex:"9999",animation:"slideInRight 0.3s ease-out",fontWeight:"600",fontSize:"0.95rem"}),document.body.appendChild(n),setTimeout(()=>{n.style.animation="slideOutRight 0.3s ease-out",setTimeout(()=>n.remove(),300)},t)}const g=document.createElement("style");g.textContent=`
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
`;document.head.appendChild(g);function x(e,t=10){let o;return function(...a){const s=()=>{clearTimeout(o),e(...a)};clearTimeout(o),o=setTimeout(s,t)}}window.addEventListener("scroll",x(()=>{l()},10));console.log("%c👋 Hello, curious developer!","font-size: 20px; font-weight: bold; color: #667eea;");console.log("%cLike what you see? Let's connect!","font-size: 14px; color: #b4b8d4;");console.log("%chttps://www.linkedin.com/in/malekziad/","font-size: 12px; color: #00f2fe;");
