document.querySelector('.btn-download').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Add visual feedback
    this.style.pointerEvents = 'none';
    const originalText = this.textContent;
    this.textContent = 'Preparing Download...';
    
    // Show toast notification
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--neon-green);
        color: #000;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    toast.textContent = 'Starting download...';
    document.body.appendChild(toast);
    
    // Trigger download
    const link = document.createElement('a');
    link.href = 'assets/Deepu KC_Resume.pdf';
    link.download = 'Deepu KC_Resume.pdf';
    
    // Check if file exists first
    fetch(link.href)
        .then(response => {
            if (!response.ok) throw new Error('Resume file not found');
            return response.blob();
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            link.href = url;
            link.click();
            window.URL.revokeObjectURL(url);
            
            // Success feedback
            toast.textContent = 'Download started!';
            toast.style.opacity = '1';
            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 300);
            }, 2000);
        })
        .catch(err => {
            console.error('Download error:', err);
            toast.textContent = 'Error: Resume file not found';
            toast.style.background = '#ff3333';
            toast.style.opacity = '1';
            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        })
        .finally(() => {
            // Reset button
            setTimeout(() => {
                this.textContent = originalText;
                this.style.pointerEvents = 'auto';
            }, 1000);
        });
});