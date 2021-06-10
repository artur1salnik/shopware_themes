import './component';
import './preview';


Shopware.Service('cmsService').registerCmsBlock({
    name: 'pet-types',
    category: 'text-image',
    label: 'Pet types',
    component: 'sw-cms-block-pet-types',
    previewComponent: 'sw-cms-preview-pet-types',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        sizingMode: 'boxed'
    },
    slots: {
        left_image: 'image',
        right_text: {
            type: 'text',
            default: {
                config: {
                    content: {
                        source: 'static',
                        value: `
                            <h2>Finde das passende Futter für deinen Liebling!</h2>
                            <h3>Für welche Tierart benötigst du Futter?</h3>
                        `
                    }
                }
            }
        },
        right_image_1: 'image',
        right_text_1: {
            type: 'text',
            default: {
                config: {
                    content: {
                        source: 'static',
                        value: `
                            <p>hund</p>
                        `
                    }
                }
            }
        },
        right_image_2: 'image',
        right_text_2: {
            type: 'text',
            default: {
                config: {
                    content: {
                        source: 'static',
                        value: `
                            <p>hund</p>
                        `
                    }
                }
            }
        },
        right_image_3: 'image',
        right_text_3: {
            type: 'text',
            default: {
                config: {
                    content: {
                        source: 'static',
                        value: `
                            <p>hund</p>
                        `
                    }
                }
            }
        },
        right_image_4: 'image',
        right_text_4: {
            type: 'text',
            default: {
                config: {
                    content: {
                        source: 'static',
                        value: `
                            <p>hund</p>
                        `
                    }
                }
            }
        },
    }
});
