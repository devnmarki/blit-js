export namespace BlitJS {

    export type Color = {
        r: number,
        g: number,
        b: number,
        a: number
    }

    export class Rect {
        private _x: number;
        private _y: number;
        private _w: number;
        private _h: number;

        constructor(pos: [number, number], size: [number, number]) {
            this._x = pos[0];
            this._y = pos[1];
            this._w = size[0];
            this._h = size[1];
        }

        get width() { return this._w; }
        set width(value: number) { this._w = value; }

        get height() { return this._h; }
        set height(value: number) { this._h = value; }

        get x() { return this._x; }
        set x(value: number) { this._x = value; }

        get y() { return this._y; }
        set y(value: number) { this._y = value; }

        get pos(): [number, number] { return [this._x, this._y]; }
        get size(): [number, number] { return [this._w, this._h]; }

        get left() { return this._x; }
        set left(value: number) { this._x = value; }

        get right() { return this._x + this._w; }
        set right(value: number) { this._x = value - this._w }

        get top() { return this._y; }
        set top(value: number) { this._y = value; }

        get bottom() { return this._y + this._h; }
        set bottom(value: number) { this._y = value - this._h }
    }

    export class Surface {
        canvas: HTMLCanvasElement = document.createElement('canvas');
        ctx: CanvasRenderingContext2D = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        size: [number, number];
        image: HTMLImageElement | null = null;
        
        private _rect: Rect;

        constructor(size: [number, number]) {
            this.size = size;
            this.canvas.width = size[0];
            this.canvas.height = size[1];
            this._rect = new Rect([0, 0], size);
        }

        fill(color: string = "black"): void {
            this.ctx.save();
            this.ctx.fillStyle = color;
            this.ctx.fillRect(0, 0, this.size[0], this.size[1]);
            this.ctx.restore();
        }

        blit(surface: Surface, pos: [number, number]): void {
            this._rect.x = pos[0];
            this._rect.y = pos[1];
            this.ctx.drawImage(surface.canvas, this._rect.x, this._rect.y);
        }

        copy(): Surface {
            return new Surface(this.size);
        }

        getRect(pos?: [number, number]) { 
            if (pos) {
                this._rect.x = pos[0];
                this._rect.y = pos[1];
            }
            return this._rect;
        }
    }

    export namespace image {

        export const load = (filename: string): Promise<Surface> => {
            return new Promise((res, rej) => {
                const imageElement = new Image();
                imageElement.src = filename;
                imageElement.onload = () => {
                    const surf = new Surface([imageElement.width, imageElement.height]);
                    surf.ctx.imageSmoothingEnabled = false;
                    surf.ctx.drawImage(imageElement, 0, 0);
                    surf.image = imageElement;
                    res(surf);
                }
                imageElement.onerror = (err) => rej(err);
            });
        }
    }

    export namespace transform {

        export const scale = (surf: Surface, size: [number, number]): Surface => {
            const scaled = new Surface(size);
            scaled.ctx.imageSmoothingEnabled = false;
            scaled.ctx.drawImage(surf.canvas, 0, 0, size[0], size[1]);
            return scaled;
        }

        export const flip = (surf: Surface, flip: [boolean, boolean]): Surface => {
            const w = surf.size[0];
            const h = surf.size[1];

            const flipped = new Surface([w, h]);
            flipped.ctx.imageSmoothingEnabled = false;

            flipped.ctx.translate(flip[0] ? w : 0, flip[1] ? h : 0);
            flipped.ctx.scale(flip[0] ? -1 : 1, flip[1] ? -1 : 1);
            flipped.ctx.drawImage(surf.canvas, 0, 0);

            return flipped;
        }
    }

    export namespace display {

        class Display
        {
            canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
            ctx: CanvasRenderingContext2D = this.canvas.getContext('2d') as CanvasRenderingContext2D;
            surface: Surface;

            constructor(size: [number, number]) {
                this.canvas.width = size[0];
                this.canvas.height = size[1];
                this.surface = new Surface([this.canvas.width, this.canvas.height]);
            }

            fill(color: string = "black") {
                this.surface.fill(color);
            }

            blit(surf: Surface, pos: [number, number]): void {
                this.surface.blit(surf, pos);
            }

            update(): void {
                this.ctx.drawImage(this.surface.canvas, 0, 0);
            }
        }
        
        let display: Display | null = null;

        export const setMode = (size: [number, number]): Display => {
            display = new Display(size);
            return display;
        }

        export const getSurface = (): Surface | null => {
            return display ? display.surface : null;
        }

        export const getSize = (): [number, number] => {
            return display ? [display.surface.size[0], display.surface.size[1]] : [0, 0];
        }

        export const getWidth = (): number => {
            return display ? display.surface.size[0] : 0;
        }

        export const getHeight = (): number => {
            return display ? display.surface.size[1] : 0;
        }
    }

    export namespace time {

        export class Clock {
            private _last = performance.now();

            private _rawDelta = 0;
            private _delta = 0;

            private _fps = 0;
            private _smoothing = 0.9;

            private _maxDeltaMs = 250;

            tick(): number {
                const now = performance.now();
                this._rawDelta = now - this._last;

                this._delta = Math.min(this._rawDelta, this._maxDeltaMs);

                const instFps = 1000 / (this._delta || 1);
                this._fps = this._fps
                ? this._smoothing * this._fps + (1 - this._smoothing) * instFps
                : instFps;

                this._last = now;
                return this._delta;
            }

            getTime(): number {
                return this._delta;
            }

            getRawTime(): number {
                return this._rawDelta;
            }

            getFPS(): number {
                return this._fps;
            }
        }
    }

    export namespace event {
        export enum EventType {
            KEYDOWN,
            KEYUP,
            MOUSEDOWN,
            MOUSEUP
        }

        export interface Event {
            type: EventType;
            key?: string;
            button?: number;
        }

        const eventQueue: Event[] = [];
        const pressedKeys = new Set<string>();

        window.addEventListener("keydown", (e) => {
            if (!pressedKeys.has(e.key)) {
                pressedKeys.add(e.key);
                eventQueue.push({ type: EventType.KEYDOWN, key: e.key })
            }
        });
        window.addEventListener("keyup", (e) => {
            pressedKeys.delete(e.key);
            eventQueue.push({ type: EventType.KEYUP, key: e.key })
        });
        window.addEventListener("mousedown", (e) => eventQueue.push({ type: EventType.MOUSEDOWN, button: e.button }));
        window.addEventListener("mouseup", (e) => eventQueue.push({ type: EventType.MOUSEUP, button: e.button }));
        window.addEventListener("contextmenu", (e) => e.preventDefault());

        export const get = () => {
            const events = [...eventQueue];
            eventQueue.length = 0;
            return events;
        }
    }
}