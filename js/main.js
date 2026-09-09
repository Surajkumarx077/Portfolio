document.addEventListener('DOMContentLoaded', () => {
    loadComponents();
});

async function loadComponents() {
    try {
        // Calculate root path relative to current page
        // If we are in /pages/about.html, depth is 1
        const pathDepth = window.location.pathname.split('/').filter(p => p).length;
        const inPagesDir = window.location.pathname.includes('/pages/');
        const rootPrefix = inPagesDir ? '../' : './';
        
        // Fetch and load Navbar
        const navbarRes = await fetch(`${rootPrefix}components/navbar.html`);
        if (navbarRes.ok) {
            let navbarHtml = await navbarRes.text();
            
            // Adjust paths in navbar html based on current depth
            if (inPagesDir) {
                navbarHtml = navbarHtml.replace(/href="\//g, 'href="../');
                navbarHtml = navbarHtml.replace(/href="\/pages\//g, 'href="./');
            } else {
                navbarHtml = navbarHtml.replace(/href="\//g, 'href="./');
                navbarHtml = navbarHtml.replace(/href="\/pages\//g, 'href="./pages/');
            }
            
            document.getElementById('navbar-placeholder').innerHTML = navbarHtml;
            // Initialize navbar logic after loading
            if (typeof initNavbar === 'function') initNavbar();
            if (typeof initTheme === 'function') initTheme();
            setActiveNavLink();
        }

        // Fetch and load Footer
        const footerRes = await fetch(`${rootPrefix}components/footer.html`);
        if (footerRes.ok) {
            let footerHtml = await footerRes.text();
            
             // Adjust paths in footer html
             if (inPagesDir) {
                footerHtml = footerHtml.replace(/href="\//g, 'href="../');
                footerHtml = footerHtml.replace(/href="\/pages\//g, 'href="./');
            } else {
                footerHtml = footerHtml.replace(/href="\//g, 'href="./');
                footerHtml = footerHtml.replace(/href="\/pages\//g, 'href="./pages/');
            }

            document.getElementById('footer-placeholder').innerHTML = footerHtml;
            // Set current year
            const yearElement = document.getElementById('current-year');
            if (yearElement) {
                yearElement.textContent = new Date().getFullYear();
            }
        }
    } catch (error) {
        console.error('Error loading components:', error);
    }
}

function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    // Default to home if on root or index.html
    let activeKey = 'home';
    if (currentPath.includes('about.html')) activeKey = 'about';
    else if (currentPath.includes('projects.html')) activeKey = 'projects';
    else if (currentPath.includes('skills.html')) activeKey = 'skills';
    else if (currentPath.includes('education.html')) activeKey = 'education';
    else if (currentPath.includes('contact.html')) activeKey = 'contact';
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-link') === activeKey) {
            link.classList.add('active');
        }
    });
}
