import './component';
import './preview';


Shopware.Service('cmsService').registerCmsBlock({
    name: 'image-cover-test',
    category: 'image',
    label: 'Image cover test',
    component: 'sw-cms-block-image-cover-test',
    previewComponent: 'sw-cms-preview-image-cover-test',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        sizingMode: 'boxed'
    },
    slots: {
        desktop: 'image',
        mobile: 'image'
    }
});

