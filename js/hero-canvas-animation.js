document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('hero-canvas');
    // Only run this script if the canvas element exists on the page
    if (!canvas) {
        // console.log('Hero canvas element not found, skipping animation setup.');
        return;
    }

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Adjust canvas size to fit parent and handle responsiveness
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Initial resize

    // Particle properties
    const particles = [];
    const numParticles = 100; // Number of particles for the animation
    const particleSize = 2; // Size of each particle
    const particleSpeed = 0.5; // Speed of particles
    const connectionDistance = 150; // Max distance for lines between particles

    // Color palette for particles, matching the logo's blue gradient
    const colors = [
        'rgba(0, 128, 179, 0.8)', // --primary-blue-dark
        'rgba(0, 150, 200, 0.8)',
        'rgba(0, 170, 220, 0.8)',
        'rgba(0, 204, 255, 0.8)'  // --primary-blue-light
    ];

    // Create particles
    function createParticles() {
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * particleSpeed * 2, // -speed to +speed
                vy: (Math.random() - 0.5) * particleSpeed * 2,
                radius: particleSize,
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }
    }

    // Update particle positions
    function updateParticles() {
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            // Bounce off edges
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        });
    }

    // Draw particles and lines
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas each frame

        particles.forEach(p => {
            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();

            // Draw lines to other particles
            particles.forEach(p2 => {
                const distance = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2));
                if (distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    // Line opacity decreases with distance
                    ctx.strokeStyle = `rgba(255, 255, 255, ${1 - (distance / connectionDistance) * 0.7})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });
    }

    // Animation loop
    function animate() {
        updateParticles();
        drawParticles();
        animationFrameId = requestAnimationFrame(animate);
    }

    // Initialize and start animation
    createParticles();
    animate();

    // Clean up on component unmount (if this were a React component, for example)
    window.addEventListener('beforeunload', () => {
        cancelAnimationFrame(animationFrameId);
    });
});