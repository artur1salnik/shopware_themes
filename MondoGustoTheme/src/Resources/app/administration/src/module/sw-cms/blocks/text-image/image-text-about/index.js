import './component';
import './preview';


Shopware.Service('cmsService').registerCmsBlock({
    name: 'image-text-about',
    category: 'text-image',
    label: 'Image Text About',
    component: 'sw-cms-block-image-text-about',
    previewComponent: 'sw-cms-preview-image-text-about',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        sizingMode: 'boxed'
    },
    slots: {
        left: {
            type: 'image',
            default: {
                config: {
                    displayMode: { source: 'static', value: 'standard' },
                },
                data: {
                    media: {
                        url: '/mondogustotheme/static/img/cms/about_dog.jpg'
                    }
                }
            }
        },
        right: {
            type: 'text',
            default: {
                config: {
                    content: {
                        source: 'static',
                        value: `
                            <h2 class="cms-block-about-text-header">Tiernahrung mit Leidenschaft und Know-how.</h2>
                            <p class="cms-block-about-text-content">Das Fundament von Allco und unserem Erfolg ist unsere Produktqualität. Unser Versprechen: Ob Hund, Katze, Pferd, Fisch oder Nager - unser Futter entspricht den Bedürfnissen der jeweiligen Tierart, abgestimmt auf ihr Alter und ihre Lebensbedingungen. Unsere  über 30 tierbegeisterten Mitarbeiter geben dabei täglich alles, für gesunde Tiere und zufriedene Kunden. Allco gehört zur tschechischen <a class="cms-block-about-text-content-link" href="#">VAFO-Gruppe</a>, einem der führenden Heimtierfutterhersteller in Europa. Neben unserer  Kernmarke <a class="cms-block-about-text-content-link" href="#">Christopherus</a> vertreiben wir exklusiv in den Regionen Deutschland, Schweiz und Österreich alle Sortimente der Brit-Family - u.a. die Super-Premium-Futter <a class="cms-block-about-text-content-link" href="#">Brit Care Cat</a> und <a class="cms-block-about-text-content-link" href="#">Brit Care Dog</a> - sowie die beiden Spitzensortimente <a class="cms-block-about-text-content-link" href="#">Carnilove</a> und <a class="cms-block-about-text-content-link" href="#">Carnilove True Fresh</a>.</p>
                            <a class="btn btn-primary cms-block-about-text-btn" href="#">MEHR ÜBER UNS</a>
                        `
                    }
                }
            }
        }
    }
});
