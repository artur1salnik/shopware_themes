import './component';
import './preview';


Shopware.Service('cmsService').registerCmsBlock({
    name: 'video-text',
    category: 'text-image',
    label: 'Video text',
    component: 'sw-cms-block-video-text',
    previewComponent: 'sw-cms-preview-video-text',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        sizingMode: 'boxed'
    },
    slots: {
        video_content: 'image',
        text_content: {
            type: 'text',
            default: {
                config: {
                    content: {
                        source: 'static',
                        value: `
                            <h2>Unser Ziel ist es, Tiernahrung zu entwickeln, die ohne Wenn und Aber die tatsächlichen Bedürfnisse der Tiere in den Mittelpunkt stellt.</h2>
                            <p>- Leitsatz von Claus und Jörg Lefers</p>
                        `
                    }
                }
            }
        }
    }
});
