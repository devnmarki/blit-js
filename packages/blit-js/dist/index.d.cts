declare namespace BlitJS {
    type Color = {
        r?: number;
        g?: number;
        b?: number;
        a?: number;
    };
    namespace math {
        class Vector2 {
            x: number;
            y: number;
            constructor(x: number, y: number);
            add(v: Vector2 | number): Vector2;
            sub(v: Vector2 | number): Vector2;
            mul(v: Vector2 | number): Vector2;
            div(v: Vector2 | number): Vector2;
            magnitude(): number;
            magnitudeSqr(): number;
            normalize(): Vector2;
            normalized(): Vector2;
            dot(v: Vector2): number;
            cross(v: Vector2): number;
            angle(): number;
            angleTo(v: Vector2): number;
            copy(): Vector2;
            equals(v: Vector2): boolean;
            toString(): string;
            static readonly zero: Vector2;
            static readonly one: Vector2;
            static readonly up: Vector2;
            static readonly down: Vector2;
            static readonly left: Vector2;
            static readonly right: Vector2;
            static fromAngle(angle: number, length?: number): Vector2;
            static lerp(a: Vector2, b: Vector2, t: number): Vector2;
            static distance(a: Vector2, b: Vector2): number;
            static dot(a: Vector2, b: Vector2): number;
        }
        class Vector3 {
            x: number;
            y: number;
            z: number;
            constructor(x: number, y: number, z: number);
            add(v: Vector3 | number): Vector3;
            sub(v: Vector3 | number): Vector3;
            mul(v: Vector3 | number): Vector3;
            div(v: Vector3 | number): Vector3;
            magnitude(): number;
            magnitudeSqr(): number;
            normalize(): Vector3;
            normalized(): Vector3;
            dot(v: Vector3): number;
            cross(v: Vector3): Vector3;
            angle(): number;
            angleTo(v: Vector3): number;
            copy(): Vector3;
            equals(v: Vector3): boolean;
            toString(): string;
            static readonly zero: Vector3;
            static readonly one: Vector3;
            static readonly up: Vector3;
            static readonly down: Vector3;
            static readonly left: Vector3;
            static readonly right: Vector3;
            static readonly forward: Vector3;
            static readonly back: Vector3;
            static fromAngle(theta: number, phi: number, length?: number): Vector3;
            static lerp(a: Vector3, b: Vector3, t: number): Vector3;
            static distance(a: Vector3, b: Vector3): number;
            static dot(a: Vector3, b: Vector3): number;
        }
        const lerp: (a: number, b: number, t: number) => number;
        const clamp: (value: number, min: number, max: number) => number;
        const randRange: (min: number, max: number) => number;
        const deg2rad: (deg: number) => number;
        const rad2deg: (rad: number) => number;
    }
    class Rect {
        private _x;
        private _y;
        private _w;
        private _h;
        constructor(pos: [number, number], size: [number, number]);
        copy(): Rect;
        colliderect(other: Rect): boolean;
        collidepoint(point: [number, number]): boolean;
        get width(): number;
        set width(value: number);
        get height(): number;
        set height(value: number);
        get x(): number;
        set x(value: number);
        get y(): number;
        set y(value: number);
        get pos(): [number, number];
        get size(): [number, number];
        get left(): number;
        set left(value: number);
        get right(): number;
        set right(value: number);
        get top(): number;
        set top(value: number);
        get bottom(): number;
        set bottom(value: number);
    }
    class Surface {
        canvas: HTMLCanvasElement;
        ctx: CanvasRenderingContext2D;
        size: [number, number];
        image: HTMLImageElement | null;
        private _rect;
        private _colorkey;
        constructor(size: [number, number]);
        fill(color: Color): void;
        blit(surface: Surface, pos: [number, number]): void;
        copy(): Surface;
        getRect(pos?: [number, number]): Rect;
        getAt(pos: [number, number]): [number, number, number, number];
        setAt(pos: [number, number], color: string | [number, number, number] | [number, number, number, number]): void;
        setColorKey(color?: Color | null): void;
        getColorKey(): Color | null;
    }
    namespace image {
        const load: (filename: string) => Promise<Surface>;
    }
    namespace transform {
        const scale: (surf: Surface, size: [number, number]) => Surface;
        const rotate: (surf: Surface, angle: number) => Surface;
        const flip: (surf: Surface, flip: [boolean, boolean]) => Surface;
    }
    namespace draw {
        const rect: (surface: Surface, rect: Rect, color?: Color, lineWidth?: number) => void;
        const fillRect: (surface: Surface, rect: Rect, color?: Color) => void;
        const circle: (surface: Surface, pos: [number, number], radius: number, color?: Color, lineWidth?: number) => void;
        const fillCircle: (surface: Surface, pos: [number, number], radius: number, color?: Color) => void;
        const line: (surface: Surface, start: [number, number], end: [number, number], color?: Color, lineWidth?: number) => void;
        const arc: (surface: Surface, pos: [number, number], radius: number, startAngle: number, endAngle: number, color?: Color, lineWidth?: number) => void;
        const ellipse: (surface: Surface, pos: [number, number], radius: [number, number], rotation?: number, startAngle?: number, endAngle?: number, color?: Color, lineWidth?: number) => void;
        const fillEllipse: (surface: Surface, pos: [number, number], radius: [number, number], rotation?: number, startAngle?: number, endAngle?: number, color?: Color) => void;
    }
    namespace font {
        class Font {
            private font;
            constructor(font: string | null, size: number);
            render(text: string, color?: Color): Surface;
        }
    }
    namespace audio {
        export class Sound {
            private _filename;
            private _players;
            constructor(filename: string);
            play(): SoundPlayer;
            stop(): void;
            pause(): void;
        }
        class SoundPlayer {
            audio: HTMLAudioElement;
            constructor(filename: string);
            play(): void;
            pause(): void;
            stop(): void;
            set volume(volume: number);
            get volume(): number;
            get duration(): number;
        }
        export class Music {
            private _audio;
            constructor(filename: string);
            play(loop?: boolean): void;
            pause(): void;
            stop(): void;
            set volume(volume: number);
            get volume(): number;
            get duration(): number;
        }
        export {  };
    }
    namespace mask {
        class Mask {
            private _width;
            private _height;
            private _data;
            constructor(width: number, height: number);
            getSize(): [number, number];
            getAt(x: number, y: number): boolean;
            setAt(x: number, y: number, value: boolean): void;
            count(): number;
            overlap(other: Mask, offset: [number, number]): [number, number] | null;
            fill(): void;
            clear(): void;
        }
        const fromSurface: (surf: Surface, threshold?: number) => Mask;
        const toSurface: (mask: Mask, setcolor?: Color, unsetcolor?: Color) => Surface;
    }
    namespace display {
        class Display {
            canvas: HTMLCanvasElement;
            ctx: CanvasRenderingContext2D;
            surface: Surface;
            cursorVisible: boolean;
            constructor(size: [number, number]);
            fill(color: Color): void;
            blit(surf: Surface, pos: [number, number]): void;
            update(): void;
        }
        export let display: Display | null;
        export const setMode: (size: [number, number]) => Display;
        export const getSurface: () => Surface | null;
        export const getSize: () => [number, number];
        export const getWidth: () => number;
        export const getHeight: () => number;
        export {  };
    }
    namespace time {
        class Clock {
            private _last;
            private _rawDelta;
            private _delta;
            private _times;
            private _maxDeltaMs;
            tick(fps?: number): number;
            getTime(): number;
            getRawTime(): number;
            getFPS(): number;
        }
    }
    namespace mouse {
        const getPos: () => [number, number];
        const getRel: () => [number, number];
        const setVisible: (visible: boolean) => void;
        const getVisible: () => boolean;
    }
    enum Keys {
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
    enum Buttons {
        Left = 0,
        Middle = 1,
        Right = 2,
        Back = 3,
        Forward = 4
    }
    namespace event {
        enum EventType {
            KeyDown = 0,
            KeyUp = 1,
            MouseDown = 2,
            MouseUp = 3,
            WindowFocusGained = 4,
            WindowFocusLost = 5
        }
        interface Event {
            type: EventType;
            key?: Keys;
            button?: Buttons;
        }
        const get: () => Event[];
    }
}

export { BlitJS };
