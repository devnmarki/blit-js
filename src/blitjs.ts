export namespace BlitJS {

    export class Surface {
        canvas: HTMLCanvasElement = document.createElement('canvas');
        ctx: CanvasRenderingContext2D = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        size: [number, number];

        constructor(size: [number, number]) {
            this.size = size;
            this.canvas.width = size[0];
            this.canvas.height = size[1];
        }

        fill(color: string = "black"): void {
            this.ctx.save();
            this.ctx.fillStyle = color;
            this.ctx.fillRect(0, 0, this.size[0], this.size[1]);
            this.ctx.restore();
        }

        blit(surface: Surface, pos: [number, number]): void {
            this.ctx.drawImage(surface.canvas, pos[0], pos[1]);
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
                this.update();
            }

            blit(surf: Surface, pos: [number, number]): void {
                this.surface.blit(surf, pos);
                this.update();
            }

            private update(): void {
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