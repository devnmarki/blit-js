export namespace BlitJS {

    export type Color = {
        r?: number,
        g?: number,
        b?: number,
        a?: number
    }

    export namespace math {

        export class Vector2 {
            constructor(public x: number, public y: number) { }

            // ------------------------
            // Basic operations
            // ------------------------
            add(v: Vector2 | number): Vector2 {
                if (v instanceof Vector2)
                    return new Vector2(this.x + v.x, this.y + v.y);

                return new Vector2(this.x + v, this.y + v);
            }

            sub(v: Vector2 | number): Vector2 {
                if (v instanceof Vector2)
                    return new Vector2(this.x - v.x, this.y - v.y);

                return new Vector2(this.x - v, this.y - v);
            }

            mul(v: Vector2 | number): Vector2 {
                if (v instanceof Vector2)
                    return new Vector2(this.x * v.x, this.y * v.y);

                return new Vector2(this.x * v, this.y * v);
            }

            div(v: Vector2 | number): Vector2 {
                if (v instanceof Vector2)
                    return new Vector2(this.x / v.x, this.y / v.y);

                return new Vector2(this.x / v, this.y / v);
            }
        
            // ------------------------
            // Magnitude & normalization
            // ------------------------
            magnitude(): number {
                return Math.sqrt(this.x * this.x + this.y * this.y);
            }

            magnitudeSqr(): number {
                return this.x * this.x + this.y * this.y;
            }

            normalize(): Vector2 {
                const mag = this.magnitude();
                return mag === 0 ? new Vector2(0, 0) : this.div(mag);
            }

            normalized(): Vector2 {
                return this.normalize();
            }

            // ------------------------
            // Dot / Cross products
            // ------------------------
            dot(v: Vector2): number {
                return this.x * v.x + this.y * v.y;
            }

            cross(v: Vector2): number {
                return this.x * v.y - this.y * v.x;
            }

            // ------------------------
            // Angle
            // ------------------------
            angle(): number {
                return Math.atan2(this.y, this.x);
            }

            angleTo(v: Vector2): number {
                return Math.atan2(v.y - this.y, v.x - this.x);
            }

            // ------------------------
            // Utility
            // ------------------------
            copy(): Vector2 {
                return new Vector2(this.x, this.y);
            }

            equals(v: Vector2): boolean {
                return this.x === v.x && this.y === v.y;
            }

            toString(): string {
                return `X: ${this.x}, Y: ${this.y}`;
            }

            // ------------------------
            // Static constants
            // ------------------------
            static readonly zero = new Vector2(0, 0);
            static readonly one = new Vector2(1, 1);
            static readonly up = new Vector2(0, -1);
            static readonly down = new Vector2(0, 1);
            static readonly left = new Vector2(-1, 0);
            static readonly right = new Vector2(1, 0);

            // ------------------------
            // Static helpers
            // ------------------------
            static fromAngle(angle: number, length: number = 1): Vector2 {
                return new Vector2(Math.cos(angle) * length, Math.sin(angle) * length);
            }

            static lerp(a: Vector2, b: Vector2, t: number): Vector2 {
                return new Vector2(
                    a.x + (b.x - a.x) * t,
                    a.y + (b.y - a.y) * t
                );
            }

            static distance(a: Vector2, b: Vector2): number {
                return a.sub(b).magnitude();
            }

            static dot(a: Vector2, b: Vector2): number {
                return a.dot(b);
            }
        }

        export class Vector3 {
            constructor(public x: number, public y: number, public z: number) { }

            // ------------------------
            // Basic operations
            // ------------------------
            add(v: Vector3 | number): Vector3 {
                if (v instanceof Vector3)
                    return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);

                return new Vector3(this.x + v, this.y + v, this.z + v);
            }

            sub(v: Vector3 | number): Vector3 {
                if (v instanceof Vector3)
                    return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);

                return new Vector3(this.x - v, this.y - v, this.z - v);
            }

            mul(v: Vector3 | number): Vector3 {
                if (v instanceof Vector3)
                    return new Vector3(this.x * v.x, this.y * v.y, this.z * v.z);

                return new Vector3(this.x * v, this.y * v, this.z * v);
            }

            div(v: Vector3 | number): Vector3 {
                if (v instanceof Vector3)
                    return new Vector3(this.x / v.x, this.y / v.y, this.z / v.z);

                return new Vector3(this.x / v, this.y / v, this.z / v);
            }

            // ------------------------
            // Magnitude & normalization
            // ------------------------
            magnitude(): number {
                return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
            }

            magnitudeSqr(): number {
                return this.x * this.x + this.y * this.y + this.z * this.z;
            }

            normalize(): Vector3 {
                const mag = this.magnitude();
                return mag === 0 ? new Vector3(0, 0, 0) : this.div(mag);
            }

            normalized(): Vector3 {
                return this.normalize();
            }

            // ------------------------
            // Dot / Cross products
            // ------------------------
            dot(v: Vector3): number {
                return this.x * v.x + this.y * v.y + this.z * v.z;
            }

            cross(v: Vector3): Vector3 {
                return new Vector3(
                    this.y * v.z - this.z * v.y,
                    this.z * v.x - this.x * v.z,
                    this.x * v.y - this.y * v.x
                );
            }

            // ------------------------
            // Angle
            // ------------------------
            angle(): number {
                return Math.acos(this.dot(Vector3.forward) / this.magnitude());
            }

            angleTo(v: Vector3): number {
                const diff = v.sub(this);
                return Math.acos(diff.dot(Vector3.forward) / diff.magnitude());
            }

            // ------------------------
            // Utility
            // ------------------------
            copy(): Vector3 {
                return new Vector3(this.x, this.y, this.z);
            }

            equals(v: Vector3): boolean {
                return this.x === v.x && this.y === v.y && this.z === v.z;
            }

            toString(): string {
                return `X: ${this.x}, Y: ${this.y}, Z: ${this.z}`;
            }

            // ------------------------
            // Static constants
            // ------------------------
            static readonly zero = new Vector3(0, 0, 0);
            static readonly one = new Vector3(1, 1, 1);
            static readonly up = new Vector3(0, 1, 0);
            static readonly down = new Vector3(0, -1, 0);
            static readonly left = new Vector3(-1, 0, 0);
            static readonly right = new Vector3(1, 0, 0);
            static readonly forward = new Vector3(0, 0, 1);
            static readonly back = new Vector3(0, 0, -1);

            // ------------------------
            // Static helpers
            // ------------------------
            static fromAngle(theta: number, phi: number, length: number = 1): Vector3 {
                const sinPhi = Math.sin(phi);
                return new Vector3(
                    Math.cos(theta) * sinPhi * length,
                    Math.sin(theta) * sinPhi * length,
                    Math.cos(phi) * length
                );
            }

            static lerp(a: Vector3, b: Vector3, t: number): Vector3 {
                return new Vector3(
                    a.x + (b.x - a.x) * t,
                    a.y + (b.y - a.y) * t,
                    a.z + (b.z - a.z) * t
                );
            }

            static distance(a: Vector3, b: Vector3): number {
                return a.sub(b).magnitude();
            }

            static dot(a: Vector3, b: Vector3): number {
                return a.dot(b);
            }
        }

        export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
        export const clamp = (value: number, min: number, max: number): number => Math.max(min, Math.min(max, value));
        export const randRange = (min: number, max: number) => Math.random() * (max - min) + min;
        export const deg2rad = (deg: number) => deg * Math.PI / 180;
        export const rad2deg = (rad: number) => rad * 180 / Math.PI;
        
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

        copy(): Rect {
            return new Rect([this._x, this._y], [this._w, this._h]);
        }

        // ------------------------
        // Collision detection
        // ------------------------
        colliderect(other: Rect): boolean {
            return !(this.left > other.right || this.right < other.left || this.bottom < other.top || this.top > other.bottom)
        }

        collidepoint(point: [number, number]) {
            return point[0] >= this.left && point[0] <= this.right && point[1] >= this.top && point[1] <= this.bottom;
        }

        // ------------------------
        // Getters & setters
        // ------------------------
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
        private _colorkey: Color | null = null;

        constructor(size: [number, number]) {
            this.size = size;
            this.canvas.width = size[0];
            this.canvas.height = size[1];
            this._rect = new Rect([0, 0], size);
        }

        // ------------------------
        // Rendering
        // ------------------------
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

        // ------------------------
        // Utility
        // ------------------------
        copy(): Surface {
            return new Surface(this.size);
        }

        // Get rect from surface
        getRect(pos?: [number, number]) { 
            if (pos) {
                this._rect.x = pos[0];
                this._rect.y = pos[1];
            }
            return this._rect;
        }

        getAt(pos: [number, number]): [number, number, number, number] {
            const id = this.ctx.getImageData(pos[0], pos[1], 1, 1);
            const d = id.data;
            return [d[0], d[1], d[2], d[3]];
        }

        setAt(pos: [number, number], color: string | [number, number, number] | [number, number, number, number]) {
            let r: number, g: number, b: number, a: number = 255;
            if (typeof color === 'string') {
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = 1;
                tempCanvas.height = 1;
                const tempCtx = tempCanvas.getContext('2d')!;
                tempCtx.fillStyle = color;
                tempCtx.fillRect(0, 0, 1, 1);
                const data = tempCtx.getImageData(0, 0, 1, 1).data;
                r = data[0];
                g = data[1];
                b = data[2];
                a = data[3];
            } else if (color.length === 3) {
                [r, g, b] = color;
            } else if (color.length === 4) {
                [r, g, b, a] = color;
            } else {
                throw new Error("Invalid color format");
            }
            const id = this.ctx.createImageData(1, 1);
            id.data[0] = r;
            id.data[1] = g;
            id.data[2] = b;
            id.data[3] = a;
            this.ctx.putImageData(id, pos[0], pos[1]);
        }

        setColorKey(color: Color | null = null): void {
            this._colorkey = color;
            if (color !== null) {
                const id = this.ctx.getImageData(0, 0, this.size[0], this.size[1]);
                const d = id.data;
                const r = color.r ?? 0;
                const g = color.g ?? 0;
                const b = color.b ?? 0;
                for (let i = 0; i < d.length; i += 4) {
                    if (d[i] === r && d[i + 1] === g && d[i + 2] === b) {
                        d[i + 3] = 0;
                    }
                }
                this.ctx.putImageData(id, 0, 0);
            }
            // Note: Setting to null disables colorkey but does not restore original alphas
        }

        getColorKey(): Color | null {
            return this._colorkey;
        }
    }

    export namespace image {

        // Load image and display loading error
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

        // Returns new scaled surface
        export const scale = (surf: Surface, size: [number, number]): Surface => {
            const scaled = new Surface(size);
            scaled.ctx.imageSmoothingEnabled = false;
            scaled.ctx.drawImage(surf.canvas, 0, 0, size[0], size[1]);
            return scaled;
        }

        // Returns new rotated surface
        export const rotate = (surf: Surface, angle: number): Surface => {
            const rad = angle * Math.PI / 180;
            const w = surf.size[0];
            const h = surf.size[1];
            const cos = Math.abs(Math.cos(rad));
            const sin = Math.abs(Math.sin(rad));
            const newW = Math.ceil(w * cos + h * sin);
            const newH = Math.ceil(w * sin + h * cos);

            const rotated = new Surface([newW, newH]);

            rotated.ctx.imageSmoothingEnabled = false;
            rotated.ctx.translate(newW / 2, newH / 2);
            rotated.ctx.rotate(rad);
            rotated.ctx.drawImage(surf.canvas, -w / 2, -h / 2);

            return rotated;
        }

        // Returns new flipped surface
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

    export namespace draw {

        // ------------------------
        // Draw stroke and filled rect
        // ------------------------
        export const rect = (
            surface: Surface, 
            rect: Rect, 
            color: Color = { a: 1 }, 
            lineWidth: number = 1
        ) => {
            surface.ctx.save();
            surface.ctx.strokeStyle = `rgba(${color.r ?? 0}, ${color.g ?? 0}, ${color.b ?? 0}, ${color.a ?? 1})`;
            surface.ctx.lineWidth = lineWidth;
            surface.ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
            surface.ctx.restore();
        }

        export const fillRect = (
            surface: Surface, 
            rect: Rect, 
            color: Color = { a: 1 }
        ) => {
            surface.ctx.save();
            surface.ctx.fillStyle = `rgba(${color.r ?? 0}, ${color.g ?? 0}, ${color.b ?? 0}, ${color.a ?? 1})`;
            surface.ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
            surface.ctx.restore();
        }

        // ------------------------
        // Draw stroke and filled circle
        // ------------------------
        export const circle = (
            surface: Surface, 
            pos: [number, number], 
            radius: number, 
            color: Color = { a: 1 },
            lineWidth: number = 1
        ) => {
            surface.ctx.save();
            surface.ctx.strokeStyle = `rgba(${color.r ?? 0}, ${color.g ?? 0}, ${color.b ?? 0}, ${color.a ?? 1})`;
            surface.ctx.lineWidth = lineWidth;
            surface.ctx.beginPath();
            surface.ctx.arc(pos[0], pos[1], radius, 0, 2 * Math.PI, false);
            surface.ctx.stroke();
            surface.ctx.restore();
        }

        export const fillCircle = (
            surface: Surface, 
            pos: [number, number], 
            radius: number, 
            color: Color = { a: 1 },
        ) => {
            surface.ctx.save();
            surface.ctx.fillStyle = `rgba(${color.r ?? 0}, ${color.g ?? 0}, ${color.b ?? 0}, ${color.a ?? 1})`;
            surface.ctx.beginPath();
            surface.ctx.arc(pos[0], pos[1], radius, 0, 2 * Math.PI, false);
            surface.ctx.fill();
            surface.ctx.restore();
        }

        // ------------------------
        // Draw line and arc
        // ------------------------
        export const line = (
            surface: Surface,
            start: [number, number],
            end: [number, number],
            color: Color = { a: 1 },
            lineWidth: number = 1
        ) => {
            surface.ctx.save();
            surface.ctx.strokeStyle = `rgba(${color.r ?? 0}, ${color.g ?? 0}, ${color.b ?? 0}, ${color.a ?? 1})`;
            surface.ctx.lineWidth = lineWidth;
            surface.ctx.beginPath();
            surface.ctx.moveTo(start[0], start[1]);
            surface.ctx.lineTo(end[0], end[1]);
            surface.ctx.stroke();
            surface.ctx.restore();
        };

        export const arc = (
            surface: Surface,
            pos: [number, number],
            radius: number,
            startAngle: number,
            endAngle: number,
            color: Color = { a: 1 },
            lineWidth: number = 1
        ) => {
            surface.ctx.save();
            surface.ctx.strokeStyle = `rgba(${color.r ?? 0}, ${color.g ?? 0}, ${color.b ?? 0}, ${color.a ?? 1})`;
            surface.ctx.lineWidth = lineWidth;
            surface.ctx.beginPath();
            surface.ctx.arc(pos[0], pos[1], radius, startAngle, endAngle);
            surface.ctx.stroke();
            surface.ctx.restore();
        };

        // ------------------------
        // Draw stroke and filled ellipse
        // ------------------------
        export const ellipse = (
            surface: Surface,
            pos: [number, number],
            radius: [number, number],
            rotation: number = 0,
            startAngle: number = 0,
            endAngle: number = 2 * Math.PI,
            color: Color = { a: 1 },
            lineWidth: number = 1
        ) => {
            surface.ctx.save();
            surface.ctx.strokeStyle = `rgba(${color.r ?? 0}, ${color.g ?? 0}, ${color.b ?? 0}, ${color.a ?? 1})`;
            surface.ctx.lineWidth = lineWidth;
            surface.ctx.beginPath();
            surface.ctx.ellipse(pos[0], pos[1], radius[0], radius[1], rotation, startAngle, endAngle);
            surface.ctx.stroke();
            surface.ctx.restore();
        };

        export const fillEllipse = (
            surface: Surface,
            pos: [number, number],
            radius: [number, number],
            rotation: number = 0,
            startAngle: number = 0,
            endAngle: number = 2 * Math.PI,
            color: Color = { a: 1 }
        ) => {
            surface.ctx.save();
            surface.ctx.fillStyle = `rgba(${color.r ?? 0}, ${color.g ?? 0}, ${color.b ?? 0}, ${color.a ?? 1})`;
            surface.ctx.beginPath();
            surface.ctx.ellipse(pos[0], pos[1], radius[0], radius[1], rotation, startAngle, endAngle);
            surface.ctx.fill();
            surface.ctx.restore();
        };
    }

    export namespace font {

        export class Font {
            private font: string;

            constructor(font: string | null, size: number) {
                this.font = `${size}px ${font ?? "Arial"}`;
            }

            // Returns text as new surface
            render(text: string, color: Color = { r: 255, g: 255, b: 255, a: 1 }) : Surface {
                // Create temporary canvas
                const tempCanvas = document.createElement("canvas");
                const tempCtx = tempCanvas.getContext("2d") as CanvasRenderingContext2D;
                tempCtx.font = this.font;

                // Measure size of the temporary canvas
                const metrics = tempCtx.measureText(text);
                const width = Math.ceil(metrics.width);

                // Make sure that text is not cut off
                const fontSizeMatch = this.font.match(/(\d+)px/);
                const fontSize = fontSizeMatch ? parseInt(fontSizeMatch[1], 10) : 16;
                const height = fontSize * 1.3;

                // Create text surface
                const surf = new Surface([width, height]);

                // Apply style to the text surface
                surf.ctx.imageSmoothingEnabled = true;
                surf.ctx.font = this.font;
                surf.ctx.fillStyle = `rgba(${color.r ?? 0}, ${color.g ?? 0}, ${color.b ?? 0}, ${color.a ?? 1})`;
                surf.ctx.textBaseline = "alphabetic";
                surf.ctx.fillText(text, 0, fontSize); 

                return surf;
            }
        }

    }

    export namespace audio {

        export class Sound {
            private _filename: string;
            private _players: SoundPlayer[] = [];

            constructor(filename: string) {
                this._filename = filename;
            }

            play(): SoundPlayer {
                const player = new SoundPlayer(this._filename);
                this._players.push(player);
                player.play();

                player.audio.onended = () => {
                    this._players = this._players.filter(p => p !== player);
                }

                return player;
            }

            stop() {
                this._players.forEach(p => p.stop());
                this._players = [];
            }

            pause() {
                this._players.forEach(p => p.pause());
            }
        }


        class SoundPlayer {
            public audio: HTMLAudioElement;

            constructor(filename: string) {
                this.audio = new Audio(filename);
                this.audio.load();
                this.audio.loop = false;
            }

            play() {
                this.audio.play();
            }

            pause() {
                this.audio.pause();
            }

            stop() {
                this.audio.pause();
                this.audio.currentTime = 0;
            }

            set volume(volume: number) { 
                this.audio.volume = volume;
            }

            get volume() {
                return this.audio.volume;
            }

            get duration() {
                return this.audio.duration;
            }
        }

        export class Music {
            private _audio: HTMLAudioElement;

            constructor(filename: string) {
                this._audio = new Audio(filename);
                this._audio.load();
            }

            play(loop: boolean = true) {
                this._audio.loop = loop;
                this._audio.play();
            }

            pause() {
                this._audio.pause();
            }

            stop() {
                this._audio.pause();
                this._audio.currentTime = 0;
            }

            set volume(volume: number) { 
                this._audio.volume = volume;
            }

            get volume() {
                return this._audio.volume;
            }

            get duration() {
                return this._audio.duration;
            }
        }

    }

    export namespace mask {

        export class Mask {
            private _width: number;
            private _height: number;
            private _data: Uint8Array;

            constructor(width: number, height: number) {
                this._width = width;
                this._height = height;
                this._data = new Uint8Array(width * height);
            }

            getSize(): [number, number] {
                return [this._width, this._height];
            }

            getAt(x: number, y: number): boolean {
                if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
                    throw new Error("Index out of bounds");
                }
                return this._data[y * this._width + x] === 1;
            }

            setAt(x: number, y: number, value: boolean) {
                if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
                    throw new Error("Index out of bounds");
                }
                this._data[y * this._width + x] = value ? 1 : 0;
            }

            count(): number {
                return this._data.reduce((acc, val) => acc + val, 0);
            }

            overlap(other: Mask, offset: [number, number]): [number, number] | null {
                const ox = Math.floor(offset[0]);
                const oy = Math.floor(offset[1]);

                const x0 = Math.max(0, ox);
                const y0 = Math.max(0, oy);
                const x1 = Math.min(this._width, ox + other._width);
                const y1 = Math.min(this._height, oy + other._height);

                if (x0 >= x1 || y0 >= y1) {
                    return null;
                }

                for (let y = y0; y < y1; y++) {
                    for (let x = x0; x < x1; x++) {
                        const thisVal = this.getAt(x, y);
                        const otherX = x - ox;
                        const otherY = y - oy;
                        const otherVal = other.getAt(otherX, otherY);

                        if (thisVal && otherVal) {
                            return [x, y];
                        }
                    }
                }

                return null;
            }

            fill() {
                this._data.fill(1);
            }

            clear() {
                this._data.fill(0);
            }
        }

        export const fromSurface = (surf: Surface, threshold: number = 127): Mask => {
            const [w, h] = surf.size;
            const m = new Mask(w, h);
            const imageData = surf.ctx.getImageData(0, 0, w, h);
            const pixels = imageData.data;

            for (let i = 0; i < pixels.length; i += 4) {
                const alpha = pixels[i + 3];
                if (alpha > threshold) {
                    const px = (i / 4) % w;
                    const py = Math.floor((i / 4) / w);
                    m.setAt(px, py, true);
                }
            }

            return m;
        }

        export const toSurface = (mask: Mask, setcolor: Color = { r: 255, g: 255, b: 255, a: 1 }, unsetcolor: Color = { r: 0, g: 0, b: 0, a: 1 }): Surface => {
            const [w, h] = mask.getSize();
            const surf = new Surface([w, h]);
            const id = surf.ctx.createImageData(w, h);
            const d = id.data;

            for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                    const idx = (y * w + x) * 4;
                    const col = mask.getAt(x, y) ? setcolor : unsetcolor;
                    d[idx] = col.r ?? 0;
                    d[idx + 1] = col.g ?? 0;
                    d[idx + 2] = col.b ?? 0;
                    d[idx + 3] = Math.round((col.a ?? 1) * 255);
                }
            }

            surf.ctx.putImageData(id, 0, 0);
            return surf;
        }

    }

    export namespace display {

        class Display
        {
            canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
            ctx: CanvasRenderingContext2D = this.canvas.getContext('2d') as CanvasRenderingContext2D;
            surface: Surface;
            cursorVisible: boolean = true;

            constructor(size: [number, number]) {
                this.canvas.width = size[0];
                this.canvas.height = size[1];
                this.surface = new Surface([this.canvas.width, this.canvas.height]);
            }

            // ------------------------
            // Render with display surface
            // ------------------------
            fill(color: string = "black") {
                this.surface.fill(color);
            }

            blit(surf: Surface, pos: [number, number]): void {
                this.surface.blit(surf, pos);
            }

            // Update display canvas
            update(): void {
                this.canvas.style.cursor = this.cursorVisible ? 'default' : 'none';
                this.ctx.drawImage(this.surface.canvas, 0, 0);
            }
        }
        
        export let display: Display | null = null;

        // Returns new display with given size
        export const setMode = (size: [number, number]): Display => {
            display = new Display(size);
            return display;
        }

        // ------------------------
        // Display properties
        // ------------------------
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

            private _times: number[] = [];

            private _maxDeltaMs = 250;

            tick(fps: number = 0): number {
                let now = performance.now();
                this._rawDelta = now - this._last;
                this._delta = this._rawDelta;

                if (fps > 0) {
                    const target = 1000 / fps;
                    const delay = target - this._delta;
                    if (delay > 0) {
                        const start = performance.now();
                        while (performance.now() - start < delay) {}
                    }
                    now = performance.now();
                    this._delta = now - this._last;
                    this._rawDelta = this._delta;
                }

                this._delta = Math.min(this._delta, this._maxDeltaMs);

                this._times.push(this._delta);
                if (this._times.length > 10) {
                    this._times.shift();
                }

                this._last = now;
                return this._delta;
            }

            // ------------------------
            // Getters
            // ------------------------
            getTime(): number {
                return this._delta;
            }

            getRawTime(): number {
                return this._rawDelta;
            }

            getFPS(): number {
                if (this._times.length === 0) return 0;
                const avg = this._times.reduce((a, b) => a + b, 0) / this._times.length;
                return 1000 / avg;
            }
        }
    }

    export namespace mouse {
        
        let _pos: [number, number] = [0, 0];
        let _lastPos: [number, number] = [0, 0];
        
        // Calculate mouse position when moving mouse
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        canvas.addEventListener("mousemove", (e) => {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;

            _pos[0] = (e.clientX - rect.left) * scaleX;
            _pos[1] = (e.clientY - rect.top) * scaleY;
        });
        
        // Get current mouse position
        export const getPos = (): [number, number] => {
            return [..._pos];
        }

        // Get amount of mouse movement
        export const getRel = (): [number, number] => {
            const deltaX = _pos[0] - _lastPos[0]; 
            const deltaY = _pos[1] - _lastPos[1];
            
            _lastPos = [..._pos];
            
            return [deltaX, deltaY]; 
        }

        // Set cursor visiblity
        export const setVisible = (visible: boolean) => {
            if (display.display) {
                display.display.cursorVisible = visible;
            }
        }

        // Get cursor visiblity
        export const getVisible = (): boolean => {
            if (display.display)
                return display.display?.cursorVisible;

            return true;
        }
    }

    export enum Keys {
        A = "a", 
        B = "b", 
        C = "c", 
        D = "d", 
        E = "e", 
        F = "f", 
        G = "g",
        H = "h", 
        I = "i", 
        J = "j", 
        K = "k", 
        L = "l",
        M = "m", 
        N = "n",
        O = "o", 
        P = "p",
        Q = "q", 
        R = "r", 
        S = "s", 
        T = "t", 
        U = "u",
        V = "v", 
        W = "w", 
        X = "x", 
        Y = "y", 
        Z = "z",

        Num0 = "0", 
        Num1 = "1", 
        Num2 = "2", 
        Num3 = "3", 
        Num4 = "4",
        Num5 = "5", 
        Num6 = "6", 
        Num7 = "7", 
        Num8 = "8", 
        Num9 = "9",

        Shift = "Shift", 
        Ctrl = "Control", 
        Alt = "Alt", 
        Meta = "Meta",
        CapsLock = "CapsLock",
        Enter = "Enter", 
        Space = " ", 
        Backspace = "Backspace", 
        Tab = "Tab",
        Escape = "Escape", 
        Delete = "Delete", 
        Home = "Home", 
        End = "End",
        PageUp = "PageUp", 
        PageDown = "PageDown",

        Up = "ArrowUp", 
        Down = "ArrowDown",
        Left = "ArrowLeft", 
        Right = "ArrowRight",

        F1 = "F1", 
        F2 = "F2", 
        F3 = "F3", 
        F4 = "F4", 
        F5 = "F5", 
        F6 = "F6",
        F7 = "F7", 
        F8 = "F8", 
        F9 = "F9", 
        F10 = "F10",
        F11 = "F11", 
        F12 = "F12"
    }

    export enum Buttons {
        Left,
        Middle,
        Right,
        Back,
        Forward
    }

    export namespace event {
        export enum EventType {
            KeyDown,
            KeyUp,
            MouseDown,
            MouseUp,
            WindowFocusGained,
            WindowFocusLost
        }

        export interface Event {
            type: EventType;
            key?: Keys;
            button?: Buttons;
        }

        const eventQueue: Event[] = [];
        const pressedKeys = new Set<string>();

        // ------------------------
        // Events
        // ------------------------
        window.addEventListener("keydown", (e) => {
            if (!pressedKeys.has(e.key)) {
                pressedKeys.add(e.key);
                eventQueue.push({ type: EventType.KeyDown, key: e.key as Keys })
            }
        });
        window.addEventListener("keyup", (e) => {
            pressedKeys.delete(e.key);
            eventQueue.push({ type: EventType.KeyUp, key: e.key as Keys })
        });
        window.addEventListener("mousedown", (e) => eventQueue.push({ type: EventType.MouseDown, button: e.button as Buttons }));
        window.addEventListener("mouseup", (e) => eventQueue.push({ type: EventType.MouseUp, button: e.button as Buttons }));
        window.addEventListener("contextmenu", (e) => e.preventDefault());
        window.addEventListener("blur", () => eventQueue.push({ type: EventType.WindowFocusLost }))
        window.addEventListener("focus", () => eventQueue.push({ type: EventType.WindowFocusGained }))

        // Get all current events
        export const get = () => {
            const events = [...eventQueue];
            eventQueue.length = 0;
            return events;
        }
    }
}