import Plugin from 'src/plugin-system/plugin.class.js';
import anime from '@animejs/lib/anime.es.js';


export default class AnimePlugin extends Plugin {
    init() {
        let headerTopBlockText = document.querySelector('.header-top-block-text');
        headerTopBlockText.innerHTML = headerTopBlockText.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

        anime.timeline({loop: true})
            .add({
                targets: '.header-top-block-text .letter',
                scale: [4, 1],
                opacity: [0, 1],
                translateZ: 0,
                easing: "easeOutExpo",
                duration: 950,
                delay: (el, i) => 70 * i
            }).add({
            targets: '.header-top-block-text',
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000
        });
    }
}
