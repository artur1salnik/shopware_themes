import Plugin from 'src/plugin-system/plugin.class';
import {fabric} from '@fabric';

let canvas = new fabric.Canvas('canvas');

let rect = new fabric.Rect({
    top : 100,
    left : 100,
    width : 60,
    height : 70,
    fill : 'red'
});

export default class FabricPlugin extends Plugin {
    init() {
        canvas.add(rect);
    }
}
