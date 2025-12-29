import { db, auth, provider, signInWithPopup, signOut, onAuthStateChanged, ADMIN_EMAILS } from './firebase-config.js';
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDocs,
    query,
    orderBy,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard-section');
const postList = document.getElementById('admin-post-list');
const postModal = document.getElementById('post-modal');
const postForm = document.getElementById('post-form');
const modalTitle = document.getElementById('modal-title');

let currentUser = null;

// ===================================
// AUTHENTICATION
// ===================================

onAuthStateChanged(auth, (user) => {
    if (user && ADMIN_EMAILS.includes(user.email)) {
        currentUser = user;
        showDashboard();
    } else {
        if (user) {
            alert('Access denied. You are not an admin.');
            signOut(auth);
        }
        showLogin();
    }
});

document.getElementById('login-btn').addEventListener('click', async () => {
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed: ' + error.message);
    }
});

document.getElementById('logout-btn').addEventListener('click', () => {
    signOut(auth);
});

function showDashboard() {
    loginSection.style.display = 'none';
    dashboardSection.style.display = 'block';

    document.getElementById('user-photo').src = currentUser.photoURL;
    document.getElementById('user-name').textContent = currentUser.displayName;

    loadPosts();
}

function showLogin() {
    loginSection.style.display = 'flex';
    dashboardSection.style.display = 'none';
}

// ===================================
// BLOG CRUD
// ===================================

async function loadPosts() {
    postList.innerHTML = '<div class="blog-loading"><div class="spinner"></div><p>Loading posts...</p></div>';

    try {
        const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        postList.innerHTML = '';

        if (querySnapshot.empty) {
            postList.innerHTML = '<p style="text-align: center; color: var(--text-muted);">No posts found. Create your first one!</p>';
            return;
        }

        querySnapshot.forEach((docSnap) => {
            const post = docSnap.data();
            const id = docSnap.id;

            const card = document.createElement('div');
            card.className = 'admin-post-card';
            card.innerHTML = `
                <div class="post-info">
                    <h3>${post.title}</h3>
                    <p>${post.category} • ${post.date}</p>
                </div>
                <div class="actions">
                    <button class="btn btn-secondary edit-btn" data-id="${id}">Edit</button>
                    <button class="btn btn-danger delete-btn" data-id="${id}">Delete</button>
                </div>
            `;

            postList.appendChild(card);

            // Attach listeners
            card.querySelector('.edit-btn').addEventListener('click', () => openModal(id, post));
            card.querySelector('.delete-btn').addEventListener('click', () => deletePost(id));
        });
    } catch (error) {
        console.error("Error loading posts:", error);
        postList.innerHTML = '<p>Error loading posts.</p>';
    }
}

async function deletePost(id) {
    if (confirm('Are you sure you want to delete this post?')) {
        try {
            await deleteDoc(doc(db, "blogs", id));
            loadPosts();
        } catch (error) {
            alert('Delete failed: ' + error.message);
        }
    }
}

// ===================================
// MODAL LOGIC
// ===================================

document.getElementById('new-post-btn').addEventListener('click', () => openModal());
document.getElementById('cancel-btn').addEventListener('click', closeModal);

function openModal(id = null, post = null) {
    postForm.reset();
    document.getElementById('post-id').value = id || '';

    if (id && post) {
        modalTitle.textContent = 'Edit Post';
        document.getElementById('title').value = post.title;
        document.getElementById('category').value = post.category;
        document.getElementById('date').value = post.date;
        document.getElementById('excerpt').value = post.excerpt;
        document.getElementById('readTime').value = post.readTime || '';
        document.getElementById('link').value = post.link || '';
    } else {
        modalTitle.textContent = 'Add New Post';
        // Auto-fill current date as placeholder
        const now = new Date();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        document.getElementById('date').value = `${months[now.getMonth()]} ${now.getFullYear()}`;
    }

    postModal.style.display = 'flex';
}

function closeModal() {
    postModal.style.display = 'none';
}

postForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('post-id').value;
    const postData = {
        title: document.getElementById('title').value,
        category: document.getElementById('category').value,
        date: document.getElementById('date').value,
        excerpt: document.getElementById('excerpt').value,
        readTime: document.getElementById('readTime').value,
        link: document.getElementById('link').value,
        updatedAt: serverTimestamp()
    };

    try {
        if (id) {
            await updateDoc(doc(db, "blogs", id), postData);
        } else {
            postData.createdAt = serverTimestamp();
            await addDoc(collection(db, "blogs"), postData);
        }
        closeModal();
        loadPosts();
    } catch (error) {
        alert('Save failed: ' + error.message);
    }
});
// ===================================
// THEME TOGGLE
// ===================================
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
} else {
    document.documentElement.setAttribute('data-theme', 'dark');
}

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let newTheme = theme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});
