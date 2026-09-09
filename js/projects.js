const projectsData = [
    {
        id: 1,
        title: "E-Commerce Dashboard",
        description: "A modern, responsive dashboard for e-commerce platforms featuring sales charts, inventory management, and user analytics.",
        imgSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        demoLink: "#",
        githubLink: "#",
        tags: ["React", "Chart.js", "Tailwind"],
        category: "frontend"
    },
    {
        id: 2,
        title: "Task Management App",
        description: "Full-stack Kanban board application with real-time updates, drag-and-drop functionality, and team collaboration features.",
        imgSrc: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=800&q=80",
        demoLink: "#",
        githubLink: "#",
        tags: ["Next.js", "Node.js", "MongoDB", "Socket.io"],
        category: "fullstack"
    },
    {
        id: 3,
        title: "Finance App UI",
        description: "A sleek, dark-mode financial application interface focusing on clear data visualization and intuitive user experience.",
        imgSrc: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?auto=format&fit=crop&w=800&q=80",
        demoLink: "#",
        githubLink: "#",
        tags: ["Figma", "UI/UX", "Prototyping"],
        category: "ui"
    },
    {
        id: 4,
        title: "Weather Forecast Web App",
        description: "Location-based weather application providing 7-day forecasts, radar maps, and severe weather alerts using a third-party API.",
        imgSrc: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=800&q=80",
        demoLink: "#",
        githubLink: "#",
        tags: ["JavaScript", "HTML5", "CSS3", "WeatherAPI"],
        category: "frontend"
    },
    {
        id: 5,
        title: "Smart Job Portal",
        description: "A job search platform that helps candidates discover opportunities and connect with relevant employers.",
        imgSrc: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80",
        demoLink: "#",
        githubLink: "https://github.com/Surajkumarx077/Smart-Job-Portal",
        tags: ["Job Portal", "Web App", "Fullstack"],
        category: "fullstack"
    },
    {
        id: 6,
        title: "Ecommerce",
        description: "An online shopping experience with product browsing, customer-focused navigation, and an ecommerce workflow.",
        imgSrc: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
        demoLink: "#",
        githubLink: "https://github.com/Surajkumarx077/Ecommerce",
        tags: ["Ecommerce", "Web App", "Frontend"],
        category: "frontend"
    },
    {
        id: 7,
        title: "FoodBuddy",
        description: "A food discovery and ordering project designed to make finding and choosing meals simple and enjoyable.",
        imgSrc: "https://images.unsplash.com/photo-1504679900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
        demoLink: "#",
        githubLink: "https://github.com/Surajkumarx077/FoodBuddy",
        tags: ["Food App", "Web App", "UI/UX"],
        category: "ui"
    }
];

const fallbackProjectTemplate = `
<div class="project-card glass-panel slide-up">
    <div class="project-img-wrapper">
        <img src="{{imgSrc}}" alt="{{title}}" class="project-img">
        <div class="project-links-overlay">
            <a href="{{demoLink}}" target="_blank" class="btn-icon" aria-label="Live Demo">↗</a>
            <a href="{{githubLink}}" target="_blank" class="btn-icon" aria-label="GitHub Repository">GitHub</a>
        </div>
    </div>
    <div class="project-content">
        <h3 class="project-title">{{title}}</h3>
        <p class="project-desc">{{description}}</p>
        <div class="project-tags">{{tagsHtml}}</div>
    </div>
</div>`;

document.addEventListener('DOMContentLoaded', () => {
    // Only run on projects page
    if (document.getElementById('projects-container')) {
        initProjects();
    }
});

async function initProjects() {
    const container = document.getElementById('projects-container');
    const filterBtns = document.querySelectorAll('.filter-btn');
    let template = '';
    
    try {
        const rootPrefix = window.location.pathname.includes('/pages/') ? '../' : './';
        const res = await fetch(`${rootPrefix}components/project-card.html`);
        if (res.ok) {
            template = await res.text();
        } else {
            template = fallbackProjectTemplate;
        }
        renderProjects(projectsData, template, container);
    } catch (e) {
        console.error("Failed to load project card template", e);
        renderProjects(projectsData, fallbackProjectTemplate, container);
    }

    // Setup filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter data
            const filter = btn.getAttribute('data-filter');
            const filteredData = filter === 'all' 
                ? projectsData 
                : projectsData.filter(p => p.category === filter);
                
            renderProjects(filteredData, template, container);
            
            // Re-trigger animations
            setTimeout(() => {
                const animatedElements = document.querySelectorAll('.project-card');
                animatedElements.forEach((el, index) => {
                    setTimeout(() => el.classList.add('visible'), index * 100);
                });
            }, 50);
        });
    });
}

function renderProjects(projects, template, container) {
    if (!template) return;
    
    let html = '';
    projects.forEach(project => {
        let cardHtml = template;
        
        // Replace placeholders
        cardHtml = cardHtml.replace(/\{\{title\}\}/g, project.title);
        cardHtml = cardHtml.replace(/\{\{description\}\}/g, project.description);
        cardHtml = cardHtml.replace(/\{\{imgSrc\}\}/g, project.imgSrc);
        cardHtml = cardHtml.replace(/\{\{demoLink\}\}/g, project.demoLink);
        cardHtml = cardHtml.replace(/\{\{githubLink\}\}/g, project.githubLink);
        
        // Generate tags HTML
        const tagsHtml = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        cardHtml = cardHtml.replace(/\{\{tagsHtml\}\}/g, tagsHtml);
        
        html += cardHtml;
    });
    
    container.innerHTML = html;
    
    // Add visible class immediately for loaded items if observer not catching them
    setTimeout(() => {
        const cards = container.querySelectorAll('.project-card');
        cards.forEach((card, i) => {
            card.style.transitionDelay = `${i * 0.1}s`;
            setTimeout(() => card.classList.add('visible'), 50);
        });
    }, 100);
}
