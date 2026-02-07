import React, { useEffect, useRef } from 'react';

const CyberBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        let mouseX = -1000;
        let mouseY = -1000;

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        handleResize();

        // Dot grid configuration
        const spacing = 24; // Denser grid to avoid "empty" feel
        const hoverRadius = 250;

        // Colors
        // Base: Slate-500/Whiteish (visible but subtle)
        // Hover: Emerald-500 (Security Green)

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            const cols = Math.ceil(width / spacing);
            const rows = Math.ceil(height / spacing);

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * spacing;
                    const y = j * spacing;

                    // Calculate distance to mouse
                    const dx = mouseX - x;
                    const dy = mouseY - y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    // Interaction effect
                    let size = 1.0;
                    let r = 148, g = 163, b = 184; // Default Slate-400 (visible gray/white)
                    let alpha = 0.18; // Always visible

                    if (dist < hoverRadius) {
                        const intensity = 1 - (dist / hoverRadius);

                        // Interpolate color from Slate-400 to Emerald-500 (16, 185, 129)
                        // Slate-400: 148, 163, 184
                        // Emerald-500: 16, 185, 129
                        r = 148 - (132 * intensity); // 148 -> 16
                        g = 163 + (22 * intensity);  // 163 -> 185
                        b = 184 - (55 * intensity);  // 184 -> 129

                        size = 1.0 + (intensity * 1.5);
                        alpha = 0.15 + (intensity * 0.5); // Brighten significantly
                    }

                    ctx.beginPath();
                    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
                    ctx.arc(x, y, size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ background: 'transparent' }}
        />
    );
};

export default CyberBackground;
