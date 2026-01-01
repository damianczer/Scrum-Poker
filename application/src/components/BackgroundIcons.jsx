import { useMemo, memo, useState, useEffect } from 'react';
import '../styles/_backgroundIcons.scss';

const POKER_ICONS = [
    '/assets/icons/poker-1.svg',
    '/assets/icons/poker-2.svg',
    '/assets/icons/poker-3.svg',
    '/assets/icons/poker-4.svg',
    '/assets/icons/poker-5.svg',
    '/assets/icons/poker-6.svg',
    '/assets/icons/poker-7.svg',
    '/assets/icons/poker-8.svg',
    '/assets/icons/poker-9.svg',
    '/assets/icons/poker-10.svg',
    '/assets/icons/poker-11.svg',
    '/assets/icons/poker-12.svg',
    '/assets/icons/poker-13.svg',
    '/assets/icons/poker-14.svg',
    '/assets/icons/poker-15.svg',
    '/assets/icons/poker-16.svg',
];

const BackgroundIcons = memo(function BackgroundIcons() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const icons = useMemo(() => {
        const items = [];
        const cols = isMobile ? 3 : 6;
        const rows = isMobile ? 4 : 5;
        const cellWidth = 100 / cols;
        const cellHeight = 100 / rows;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const icon = POKER_ICONS[Math.floor(Math.random() * POKER_ICONS.length)];
                const left = col * cellWidth + cellWidth * 0.2 + Math.random() * cellWidth * 0.6;
                const top = row * cellHeight + cellHeight * 0.2 + Math.random() * cellHeight * 0.6;

                items.push({
                    id: row * cols + col,
                    icon,
                    left: `${left}%`,
                    top: `${top}%`,
                    size: isMobile ? 28 + Math.random() * 15 : 35 + Math.random() * 20,
                    opacity: 0.08 + Math.random() * 0.06,
                    rotation: Math.random() * 360,
                });
            }
        }

        return items;
    }, [isMobile]);

    return (
        <div className="background-icons" aria-hidden="true">
            {icons.map((item) => (
                <img
                    key={item.id}
                    src={item.icon}
                    alt=""
                    className="background-icon"
                    style={{
                        left: item.left,
                        top: item.top,
                        width: `${item.size}px`,
                        height: `${item.size}px`,
                        opacity: item.opacity,
                        transform: `rotate(${item.rotation}deg)`,
                    }}
                />
            ))}
        </div>
    );
});

BackgroundIcons.displayName = 'BackgroundIcons';

export default BackgroundIcons;
