import Plugin from 'src/plugin-system/plugin.class';

export default class ExampleTheme extends Plugin {
    static options = {
        text: 'Hello. It`s work!',
    }

    init() {
        window.addEventListener('scroll', this.onScroll.bind(this));
    }

    onScroll() {
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
            alert(this.options.text);
        }
    }
}
