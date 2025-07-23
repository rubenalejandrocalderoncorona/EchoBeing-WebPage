document.addEventListener('DOMContentLoaded', () => {
    const typingTextElement = document.getElementById('typing-text');
    // Only run this script if the typing text element exists on the page
    if (!typingTextElement) {
        // console.log('Typing text element not found, skipping animation setup.');
        return;
    }

    const phrases = ["Collaborative.", "Innovative.", "Human-Centric."];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100; // milliseconds per character
    const deletingSpeed = 50; // milliseconds per character
    const pauseBeforeDelete = 1500; // milliseconds to pause before deleting
    const pauseBeforeType = 500; // milliseconds to pause before typing next phrase

    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];
        if (isDeleting) {
            // Deleting text
            typingTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Typing text
            typingTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Finished typing, pause then start deleting
            currentSpeed = pauseBeforeDelete;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting, move to next phrase, pause then start typing
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            currentSpeed = pauseBeforeType;
        }

        setTimeout(typeWriter, currentSpeed);
    }

    // Start the typing animation after a small delay to allow other page elements to load
    setTimeout(typeWriter, 1000);
});