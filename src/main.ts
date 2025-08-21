import { BlitJS } from './blitjs'; 

const screen = BlitJS.display.setMode([1280, 720]);
const clock = new BlitJS.time.Clock();
const display = new BlitJS.Surface([BlitJS.display.getWidth() / 2, BlitJS.display.getHeight() / 2]);

const blueBox = new BlitJS.Surface([32, 64]);
const blueBoxRect = blueBox.getRect([16 * 8, 16 * 5]);
blueBox.fill('blue');

const playerSurf = await BlitJS.image.load("./images/player.png");
const playerRect = playerSurf.getRect([200, 100]);
const playerMask = BlitJS.mask.fromSurface(playerSurf);

const newPlayerSurf = BlitJS.mask.toSurface(playerMask);
newPlayerSurf.setColorKey({ r: 0, g: 0, b: 0, a: 1 })

const surfSize = newPlayerSurf.size;
for (let x = 0; x < surfSize[0]; x++) {
    for (let y = 0; y < surfSize[1]; y++) {
        if (newPlayerSurf.getAt([x, y])[0] != 0) {
            newPlayerSurf.setAt([x, y], [255, 255, 255, 255]);
        }
    }
}

const testFont = new BlitJS.font.Font("MedodicaRegular", 128);

const jumpSfx = new BlitJS.audio.Sound("./sfx/jump.wav");
const music = new BlitJS.audio.Music("./music/rosalia.mp3");

const vec2 = new BlitJS.math.Vector2(10, 20);
const vec3 = new BlitJS.math.Vector3(20, 30, 64);

console.log(vec2);
console.log(vec3);

let movement = [false, false];
let flip: boolean = false;
let rot = 0;

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
                music.play(true);
            if (e.key == BlitJS.Keys.P)
                music.pause();
        }
        if (e.type == BlitJS.event.EventType.KeyUp) {
            if (e.key == BlitJS.Keys.A)
                movement[0] = false;
            if (e.key == BlitJS.Keys.D)
                movement[1] = false;
        }
        if (e.type == BlitJS.event.EventType.MouseDown) {
            if (e.button == BlitJS.Buttons.Right)
                BlitJS.mouse.setVisible(false)
            if (e.button == BlitJS.Buttons.Left)
                BlitJS.mouse.setVisible(true)
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
    
    rot++;

    let blueBoxCopy = BlitJS.transform.rotate(blueBox, rot);
    display.blit(blueBoxCopy, [blueBoxRect.pos[0] - blueBoxCopy.size[0] / 2, blueBoxRect.pos[1] - blueBoxCopy.size[1] / 2]);

    let offset = 1;

    // Outline
    display.blit(newPlayerSurf, [playerRect.pos[0] + offset, playerRect.pos[1]]);
    display.blit(newPlayerSurf, [playerRect.pos[0] - offset, playerRect.pos[1]]);
    display.blit(newPlayerSurf, [playerRect.pos[0], playerRect.pos[1] + offset]);
    display.blit(newPlayerSurf, [playerRect.pos[0], playerRect.pos[1] - offset]);
    display.blit(newPlayerSurf, [playerRect.pos[0] + offset, playerRect.pos[1] - offset]);
    display.blit(newPlayerSurf, [playerRect.pos[0] + offset, playerRect.pos[1] + offset]);
    display.blit(newPlayerSurf, [playerRect.pos[0] - offset, playerRect.pos[1] + offset]);
    display.blit(newPlayerSurf, [playerRect.pos[0] - offset, playerRect.pos[1] - offset]);

    display.blit(BlitJS.transform.flip(playerSurf, [flip, false]), playerRect.pos);

    screen.blit(BlitJS.transform.scale(display, BlitJS.display.getSize()), [0, 0]);
    //screen.blit(display, [0, 0]);
    
    screen.blit(textSurf, [200, 200]);

    screen.update();

    requestAnimationFrame(loop);
}

loop();