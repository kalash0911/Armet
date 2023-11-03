import lottie from 'lottie-web';

document.addEventListener('DOMContentLoaded', () => {

    const animationsData = [
        { animationName: 'icon_1', jsonPath: '../files/icon_1.json', elementId: 'icon_1' },
        { animationName: 'icon_2', jsonPath: '../files/icon_2.json', elementId: 'icon_2' },
        { animationName: 'icon_3', jsonPath: '../files/icon_3.json', elementId: 'icon_3' },
        { animationName: 'icon_4', jsonPath: '../files/icon_4.json', elementId: 'icon_4' },
    ];

    const animations = animationsData.map(animationData => {
        const iconContainer = document.getElementById(animationData.elementId) as HTMLDivElement;

        if (iconContainer) {
            const anim = lottie.loadAnimation({
                container: iconContainer,
                renderer: 'svg',
                loop: true,
                autoplay: false,
                path: animationData.jsonPath,
                name: animationData.animationName
            });

            return anim;
        }

        return null;
    });

    const itemCards = document.querySelectorAll('.item-card');

    itemCards.forEach((itemCard, index) => {
        itemCard.addEventListener('mouseenter', () => {
            if (animations[index]) {
                animations[index].play();
            }
        });

        itemCard.addEventListener('mouseleave', () => {
            if (animations[index]) {
                animations[index].stop();
            }
        });
    });
});
