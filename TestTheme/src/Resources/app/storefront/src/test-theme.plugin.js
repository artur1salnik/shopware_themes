import Plugin from 'src/plugin-system/plugin.class';
import Swiper from '@swiper/bundle';


export default class TestThemePlugin extends Plugin {
    init() {
        new Swiper('.swiper-container', {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            scrollbar: {
                el: '.swiper-scrollbar',
            },
        });
    }
}
