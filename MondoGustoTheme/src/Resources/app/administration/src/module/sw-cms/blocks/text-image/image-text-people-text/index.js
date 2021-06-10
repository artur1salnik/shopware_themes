import './component';
import './preview';


Shopware.Service('cmsService').registerCmsBlock({
    name: 'image-text-people-text',
    category: 'text-image',
    label: 'Image text people text',
    component: 'sw-cms-block-image-text-people-text',
    previewComponent: 'sw-cms-preview-image-text-people-text',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        sizingMode: 'boxed'
    },
    slots: {
        image_first: 'image',
        text_first: {
            type: 'text',
            default: {
                config: {
                    content: {
                        source: 'static',
                        value: `
                            <div class="person-information">
                                <h3 class="person-information-header">Geschäftsführung</h3>
                                <div class="person-information-content">
                                    <p class="person-information-name">Jörg Lefers</p>
                                    <p class="person-information-phone">+49 (0)4233 93 20 0</p>
                                    <p class="person-information-mail">j.lefers@allco.de</p>
                                </div>
                            </div>
                        `
                    }
                }
            }
        },
        image_second: 'image',
        text_third: {
            type: 'text',
            default: {
                config: {
                    content: {
                        source: 'static',
                        value: `
                                <div class="card-career">
                                    <h3 class="card-career-header">Kolleg*innen gesucht!</h3>
                                    <p class="card-career-text">Wir suchen Verstärkung für unser Team. Interesse?</p>
                                    <a class="btn card-career-button" href="#">Stellenangebote</a>
                                </div>
                        `
                    }
                }
            }
        }
    }
})
