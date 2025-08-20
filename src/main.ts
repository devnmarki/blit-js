import { BlitJS } from './blitjs'; 

const screen = BlitJS.display.setMode([1280, 720]);
const clock = new BlitJS.time.Clock();
const display = new BlitJS.Surface([BlitJS.display.getWidth() / 2, BlitJS.display.getHeight() / 2]);

const blueBox = new BlitJS.Surface([32, 64]);
const blueBoxRect = blueBox.getRect([16 * 8, 16 * 5]);
blueBox.fill('blue');

const playerSurf = await BlitJS.image.load("./images/player.png");
const playerRect = playerSurf.getRect([200, 100]);

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
    playerRect.left += frameMovement * 3;

    if (frameMovement < 0)
        flip = true;    
    if (frameMovement > 0)
        flip = false;

    if (playerRect.colliderect(blueBoxRect)) {
        console.log("collision is happening!");
    }

    let mpos: [number, number] = [BlitJS.mouse.getPos()[0] / 2, BlitJS.mouse.getPos()[1] / 2];
    if (blueBoxRect.collidepoint(mpos)) {
        console.log("point collision is happening!");
    }
    
    display.blit(blueBox, blueBoxRect.pos);
    display.blit(BlitJS.transform.flip(playerSurf, [flip, false]), playerRect.pos);
    
    screen.blit(BlitJS.transform.scale(display, BlitJS.display.getSize()), [0, 0]);
    
    //screen.blit(display, [0, 0]);

    screen.update();

    requestAnimationFrame(loop);
}

loop();