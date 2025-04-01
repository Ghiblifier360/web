document.addEventListener('DOMContentLoaded', function() {
    const imageUpload = document.getElementById('imageUpload');
    const originalImg = document.getElementById('originalImg');
    const resultSection = document.getElementById('resultSection');
    const generateBtn = document.getElementById('generateBtn');
    const processing = document.getElementById('processing');
    const downloadContainer = document.getElementById('downloadContainer');
    const downloadBtn = document.getElementById('downloadBtn');
    const progressBar = document.getElementById('progressBar');
    const currentStep = document.getElementById('currentStep');
    const styleBtns = document.querySelectorAll('.style-btn');
    
    // New navbar elements
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const themeToggle = document.querySelector('.theme-toggle');
    const loginBtn = document.querySelector('.login-btn');
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Nav links click event (non-functional but closes mobile menu)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Theme toggle and login button (non-functional but with feedback)
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            alert('Dark mode is already enabled by default.');
        });
    }
    
    // The login button now has an href pointing to login.html, 
    // so we don't need the click handler for it anymore
    
    // Predefined Ghibli image for the prank
    const ghibliImage = 'assets/download.jpg';
    
    // Processing simulation steps
    const processingSteps = [
        "Analyzing image composition...",
        "Detecting main subjects...",
        "Applying Ghibli color palette...",
        "Generating brush strokes...",
        "Adding magical elements...",
        "Enhancing lighting effects...",
        "Applying final touches..."
    ];
    
    // Style button click event
    styleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            styleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Handle image upload
    imageUpload.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            // Validate file size (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                alert('File size exceeds 10MB limit. Please choose a smaller file.');
                return;
            }
            
            const reader = new FileReader();
            
            reader.onload = function(e) {
                originalImg.src = e.target.result;
                resultSection.style.display = 'block';
                generateBtn.style.display = 'inline-block';
                processing.style.display = 'none';
                downloadContainer.style.display = 'none';
                
                // Scroll to result section
                resultSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            };
            
            reader.readAsDataURL(file);
        }
    });
    
    // Handle generate button click
    generateBtn.addEventListener('click', function() {
        generateBtn.style.display = 'none';
        processing.style.display = 'block';
        
        // Reset progress bar
        progressBar.style.width = '0%';
        
        // Simulate processing with steps and progress bar
        let currentStepIndex = 0;
        let progress = 0;
        
        const processingInterval = setInterval(function() {
            if (progress >= 100) {
                clearInterval(processingInterval);
                
                // Show download container after processing is complete
                setTimeout(function() {
                    processing.style.display = 'none';
                    downloadContainer.style.display = 'block';
                }, 500);
                
                return;
            }
            
            progress += Math.floor(Math.random() * 5) + 1;
            progress = Math.min(progress, 100);
            progressBar.style.width = progress + '%';
            
            if (progress > (currentStepIndex + 1) * (100 / processingSteps.length)) {
                currentStepIndex = Math.min(currentStepIndex + 1, processingSteps.length - 1);
                currentStep.textContent = processingSteps[currentStepIndex];
                
                // Add typewriter effect to the current step
                typeWriter(currentStep, processingSteps[currentStepIndex]);
            }
        }, 200);
    });
    
    // Typewriter effect for processing steps
    function typeWriter(element, text, i = 0, speed = 30) {
        if (i === 0) {
            element.textContent = '';
        }
        
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(function() {
                typeWriter(element, text, i, speed);
            }, speed);
        }
    }
    
    // Handle download button click (the prank)
    downloadBtn.addEventListener('click', function() {
        // Add a small delay to make it feel like it's preparing the download
        downloadBtn.disabled = true;
        downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing...';
        
        setTimeout(function() {
            // Create a temporary link to download the predefined Ghibli image
            const link = document.createElement('a');
            link.href = ghibliImage;
            link.download = 'your-ghibli-artwork.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Reset button state
            downloadBtn.disabled = false;
            downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download Artwork';
            
            // Show a success message
            alert('Download started! We hope you enjoy your Ghibli artwork!');
        }, 1500);
    });
    
    // Add click handlers for social share buttons (updated to share to actual platforms)
    document.getElementById('facebook-share')?.addEventListener('click', function(e) {
        e.preventDefault();
        const shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href);
        window.open(shareUrl, 'facebook-share', 'width=580,height=520');
    });

    document.getElementById('twitter-share')?.addEventListener('click', function(e) {
        e.preventDefault();
        const shareText = 'I just transformed my photo with GhibliAI! Check it out:';
        const shareUrl = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(shareText) + '&url=' + encodeURIComponent(window.location.href);
        window.open(shareUrl, 'twitter-share', 'width=580,height=520');
    });

    document.getElementById('whatsapp-share')?.addEventListener('click', function(e) {
        e.preventDefault();
        const shareText = 'I just transformed my photo with GhibliAI! Check it out: ';
        const shareUrl = 'https://wa.me/?text=' + encodeURIComponent(shareText + window.location.href);
        window.open(shareUrl, 'whatsapp-share', 'width=580,height=520');
    });

    document.getElementById('instagram-share')?.addEventListener('click', function(e) {
        e.preventDefault();
        // Instagram doesn't support direct sharing via URL
        // Instead, we'll let users know they can save and share manually
        alert('To share on Instagram: save the image to your device, then upload it to Instagram manually.');
        // Optionally open Instagram
        window.open('https://www.instagram.com', 'instagram', 'width=580,height=520');
    });

    // Remove the old general handler for social buttons
    
    // Add click handlers for footer links
    document.querySelectorAll('footer a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('This is just a demo - page navigation is not implemented.');
        });
    });
    
    // Handle pricing buttons
    const pricingButtons = document.querySelectorAll('.pricing-btn');
    if (pricingButtons.length > 0) {
        pricingButtons.forEach(button => {
            button.addEventListener('click', function() {
                alert('This is a demo - subscription plans are not available.');
            });
        });
    }
    
    // Handle smooth scrolling for navbar links with hash
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if it's open
                if (hamburger && hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
                
                // Smooth scroll to the target element
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active class in navbar
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
});
