import { BlitJS } from './blitjs'; 

const display = BlitJS.display.setMode([1280, 720]);

const update = () => {
    display.fill();

    for (const e of BlitJS.event.get()) {
        if (e.type == BlitJS.event.EventType.KEYDOWN) {
            console.log(e.key);
        }
        if (e.type == BlitJS.event.EventType.MOUSEDOWN) {
            console.log(e.button);
        }
    }

    requestAnimationFrame(update);
}

update();