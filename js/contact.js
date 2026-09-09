document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        initContactForm(contactForm);
    }
});

function initContactForm(form) {
    const statusDiv = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');
    const originalBtnText = submitBtn.innerHTML;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show loading state
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        statusDiv.textContent = '';
        statusDiv.className = 'form-status';

        // Simulate API call
        setTimeout(() => {
            // Reset button
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            
            // Show success message
            statusDiv.textContent = 'Message sent successfully! I will get back to you soon.';
            statusDiv.className = 'form-status status-success';
            
            // Reset form
            form.reset();
            
            // Clear message after 5 seconds
            setTimeout(() => {
                statusDiv.textContent = '';
                statusDiv.className = 'form-status';
            }, 5000);
        }, 1500);
    });
}
