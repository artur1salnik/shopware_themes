import ChangeButtonIcon from './script/change-button-icon';
import Plugin from 'src/plugin-system/plugin.class';
import AnimePlugin from './script/anime.plugin';
import AosPlugin from "./script/aos.plugin";


window.PluginManager.register('AnimePlugin', AnimePlugin, '[data-anime-plugin]');
window.PluginManager.override('AddToCart', ChangeButtonIcon, '[data-add-to-cart]');
window.PluginManager.register('AosPlugin', AosPlugin, '[data-aos]');


let categoryLinks = document.querySelectorAll(".category-navigation-link");
for (let i = 0; i < categoryLinks.length; i++) {
    categoryLinks[i].addEventListener('click', (event) => {
        event.target.classList.toggle('is-active')
    })
}

let personInfoButtons = document.querySelectorAll('.person-information-header');
for (let i = 0; i < personInfoButtons.length; i++) {
    personInfoButtons[i].addEventListener('click', (event) => {
        event.target.parentNode.parentNode.classList.toggle('open');
    })
}
