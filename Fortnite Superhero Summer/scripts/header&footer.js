function moveButtons() {
    const desktopButtons = document.getElementById('desktopButtons');
    const mobileContainer = document.getElementById('mobileButtonsContainer');
    
    if (!desktopButtons || !mobileContainer) return;
    
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
        if (desktopButtons.children.length > 0) {
            while (desktopButtons.children.length > 0) {
                mobileContainer.appendChild(desktopButtons.children[0]);
            }
        }
    } 
    
    else {
        if (mobileContainer.children.length > 0) {
            while (mobileContainer.children.length > 0) {
                desktopButtons.appendChild(mobileContainer.children[0]);
            }
        }
    }

}

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('desktopButtons') && document.getElementById('mobileButtonsContainer')) {
        moveButtons();
        window.addEventListener('resize', moveButtons);
    }
    
    if (burger) {
        burger.addEventListener('click', toggleMobileMenu);
    }
    
    if (overlay) {
        overlay.addEventListener('click', toggleMobileMenu);
    }

    if (mobileMenu) {
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', toggleMobileMenu);
        });
    }

});

function toggleMobileMenu() {
    if (!mobileMenu || !overlay || !burger) return;
    
    const isActive = mobileMenu.classList.contains('active');
    
    if (isActive) {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        burger.classList.remove('active');
        document.body.style.overflow = '';
    } else {
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        burger.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

}

burger.addEventListener('click', toggleMobileMenu);
overlay.addEventListener('click', toggleMobileMenu);

const menuLinks = mobileMenu.querySelectorAll('a, button');

menuLinks.forEach(link => {
    link.addEventListener('click', toggleMobileMenu);

});