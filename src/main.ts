import { BlitJS } from './blitjs'; 

const screen = BlitJS.display.setMode([1280, 720]);
const clock = new BlitJS.time.Clock();
const display = new BlitJS.Surface([BlitJS.display.getWidth() / 2, BlitJS.display.getHeight() / 2]);

const blueBox = new BlitJS.Surface([32, 64]);
const blueBoxRect = blueBox.getRect([16 * 8, 16 * 5]);
blueBox.fill('blue');

const playerSurf = await BlitJS.image.load("./images/player.png");
const playerRect = playerSurf.getRect([200, 100]);

const testFont = new BlitJS.font.Font("MedodicaRegular", 128);

const jumpSfx = new BlitJS.audio.Sound("./sfx/jump.wav");
const music = new BlitJS.audio.Music("./music/rosalia.mp3");

let movement = [false, false];
let flip: boolean = false;

const loop = () => {
    clock.tick();

    display.fill('green');

    for (const e of BlitJS.event.get()) {
        if (e.type == BlitJS.event.EventType.KeyDown) {
            if (e.key == BlitJS.Keys.A)
                movement[0] = true;
            if (e.key == BlitJS.Keys.D)
                movement[1] = true;
            if (e.key == BlitJS.Keys.Space)
                jumpSfx.play();
            if (e.key == BlitJS.Keys.O)
                music.play();
            if (e.key == BlitJS.Keys.P)
                music.pause();
        }
        if (e.type == BlitJS.event.EventType.KeyUp) {
            if (e.key == BlitJS.Keys.A)
                movement[0] = false;
            if (e.key == BlitJS.Keys.D)
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

    BlitJS.draw.rect(display, playerRect, { r: 255, g: 0, b: 0 });
    BlitJS.draw.fillCircle(display, [300, 100], 20, { r: 0, g: 0, b: 255, });
    BlitJS.draw.line(display, [10, 10], [100, 80], { b: 255 });
    BlitJS.draw.arc(display, [100, 100], 50, 0, Math.PI, { r: 255, g: 0, b: 0, a: 1 }, 2);
    BlitJS.draw.ellipse(display, [200, 200], [80, 40], 0, 0, 2 * Math.PI, { r: 0, g: 255, b: 0, a: 1 }, 3);
    BlitJS.draw.fillEllipse(display, [150, 150],[ 60, 30], 0, 0, 2 * Math.PI, { r: 0, g: 0, b: 255, a: 1 });

    let textSurf = testFont.render("Hello, World!");
    
    display.blit(blueBox, blueBoxRect.pos);
    display.blit(BlitJS.transform.flip(playerSurf, [flip, false]), playerRect.pos);
    
    screen.blit(BlitJS.transform.scale(display, BlitJS.display.getSize()), [0, 0]);
    //screen.blit(display, [0, 0]);
    
    screen.blit(textSurf, [200, 200]);

    screen.update();

    requestAnimationFrame(loop);
}

loop();