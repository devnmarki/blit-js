import { BlitJS } from './blitjs'; 

const screen = BlitJS.display.setMode([1280, 720]);
const clock = new BlitJS.time.Clock();
const display = new BlitJS.Surface([BlitJS.display.getWidth() / 2, BlitJS.display.getHeight() / 2]);

const blueBox = new BlitJS.Surface([32, 32]);
blueBox.fill('blue');

const playerSurf = await BlitJS.image.load("./images/player.png");

const rect = new BlitJS.Rect([200, 200], [50, 50]);

let x: number = 50;
let movement = [false, false];
let flip: boolean = false;

const loop = () => {
    clock.tick();

    display.fill('green');

    for (const e of BlitJS.event.get()) {
        if (e.type == BlitJS.event.EventType.KEYDOWN) {
            if (e.key == "a")
                movement[0] = true;
            if (e.key == "d")
                movement[1] = true;
        }
        if (e.type == BlitJS.event.EventType.KEYUP) {
            if (e.key == "a")
                movement[0] = false;
            if (e.key == "d")
                movement[1] = false;
        }
    }

    let frameMovement: number = (Number(movement[1]) - Number(movement[0]));
    x += frameMovement * 3;

    if (frameMovement < 0)
        flip = true;    
    if (frameMovement > 0)
        flip = false;
    
    display.blit(blueBox, [16 * 8, 16 * 10]);
    display.blit(BlitJS.transform.flip(playerSurf, [flip, false]), [x, 16 * 13]);
    
    screen.blit(BlitJS.transform.scale(display, BlitJS.display.getSize()), [0, 0]);
    
    //screen.blit(display, [0, 0]);

    screen.update();

    requestAnimationFrame(loop);
}

loop();