document.addEventListener('DOMContentLoaded', function() {
    const backgroundShapesContainer = document.createElement('div');
    backgroundShapesContainer.classList.add('background-shapes');
    document.body.appendChild(backgroundShapesContainer);

    const colorCircles = [
        'circle-red', 'circle-blue', 'circle-green', 
        'circle-purple', 'circle-orange', 'circle-cyan', 
        'circle-magenta', 'circle-yellow'
    ];
    const animationTypes = ['wave-float', 'subtle-drift', 'orbital-motion'];
    const numShapes = 150;

    function createShape() {
        const shape = document.createElement('div');
        
        // Randomly select circle color and animation
        const circleClass = colorCircles[Math.floor(Math.random() * colorCircles.length)];
        const animationName = animationTypes[Math.floor(Math.random() * animationTypes.length)];
        shape.classList.add('background-shape', circleClass);

        // Smaller size range with more variation
        const size = Math.random() * 15 + 5; // 5-20px
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;

        // Random position with extended spread
        shape.style.top = `${Math.random() * 150 - 25}%`;
        shape.style.left = `${Math.random() * 150 - 25}%`;

        // Synchronized animation parameters
        const animationDuration = Math.random() * 8 + 6; // 6-14 seconds
        const animationDelay = Math.random() * 3; // 0-3 seconds delay
        
        // Explicitly set animation with fallback
        shape.style.animationName = animationName;
        shape.style.animationDuration = `${animationDuration}s`;
        shape.style.animationDelay = `${animationDelay}s`;
        shape.style.animationIterationCount = 'infinite';
        shape.style.animationTimingFunction = 'ease-in-out';

        return shape;
    }

    // Create and add shapes
    function generateShapes() {
        backgroundShapesContainer.innerHTML = ''; // Clear existing shapes
        for (let i = 0; i < numShapes; i++) {
            backgroundShapesContainer.appendChild(createShape());
        }
    }

    // Initial generation
    generateShapes();

    // Responsive resizing
    window.addEventListener('resize', generateShapes);
});
