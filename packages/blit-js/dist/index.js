// src/index.ts
var BlitJS;
((BlitJS2) => {
  let math;
  ((math2) => {
    class Vector2 {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }
      // ------------------------
      // Basic operations
      // ------------------------
      add(v) {
        if (v instanceof Vector2)
          return new Vector2(this.x + v.x, this.y + v.y);
        return new Vector2(this.x + v, this.y + v);
      }
      sub(v) {
        if (v instanceof Vector2)
          return new Vector2(this.x - v.x, this.y - v.y);
        return new Vector2(this.x - v, this.y - v);
      }
      mul(v) {
        if (v instanceof Vector2)
          return new Vector2(this.x * v.x, this.y * v.y);
        return new Vector2(this.x * v, this.y * v);
      }
      div(v) {
        if (v instanceof Vector2)
          return new Vector2(this.x / v.x, this.y / v.y);
        return new Vector2(this.x / v, this.y / v);
      }
      // ------------------------
      // Magnitude & normalization
      // ------------------------
      magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      }
      magnitudeSqr() {
        return this.x * this.x + this.y * this.y;
      }
      normalize() {
        const mag = this.magnitude();
        return mag === 0 ? new Vector2(0, 0) : this.div(mag);
      }
      normalized() {
        return this.normalize();
      }
      // ------------------------
      // Dot / Cross products
      // ------------------------
      dot(v) {
        return this.x * v.x + this.y * v.y;
      }
      cross(v) {
        return this.x * v.y - this.y * v.x;
      }
      // ------------------------
      // Angle
      // ------------------------
      angle() {
        return Math.atan2(this.y, this.x);
      }
      angleTo(v) {
        return Math.atan2(v.y - this.y, v.x - this.x);
      }
      // ------------------------
      // Utility
      // ------------------------
      copy() {
        return new Vector2(this.x, this.y);
      }
      equals(v) {
        return this.x === v.x && this.y === v.y;
      }
      toString() {
        return `X: ${this.x}, Y: ${this.y}`;
      }
      // ------------------------
      // Static constants
      // ------------------------
      static zero = new Vector2(0, 0);
      static one = new Vector2(1, 1);
      static up = new Vector2(0, -1);
      static down = new Vector2(0, 1);
      static left = new Vector2(-1, 0);
      static right = new Vector2(1, 0);
      // ------------------------
      // Static helpers
      // ------------------------
      static fromAngle(angle, length = 1) {
        return new Vector2(Math.cos(angle) * length, Math.sin(angle) * length);
      }
      static lerp(a, b, t) {
        return new Vector2(
          a.x + (b.x - a.x) * t,
          a.y + (b.y - a.y) * t
        );
      }
      static distance(a, b) {
        return a.sub(b).magnitude();
      }
      static dot(a, b) {
        return a.dot(b);
      }
    }
    math2.Vector2 = Vector2;
    class Vector3 {
      constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
      }
      // ------------------------
      // Basic operations
      // ------------------------
      add(v) {
        if (v instanceof Vector3)
          return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
        return new Vector3(this.x + v, this.y + v, this.z + v);
      }
      sub(v) {
        if (v instanceof Vector3)
          return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
        return new Vector3(this.x - v, this.y - v, this.z - v);
      }
      mul(v) {
        if (v instanceof Vector3)
          return new Vector3(this.x * v.x, this.y * v.y, this.z * v.z);
        return new Vector3(this.x * v, this.y * v, this.z * v);
      }
      div(v) {
        if (v instanceof Vector3)
          return new Vector3(this.x / v.x, this.y / v.y, this.z / v.z);
        return new Vector3(this.x / v, this.y / v, this.z / v);
      }
      // ------------------------
      // Magnitude & normalization
      // ------------------------
      magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
      }
      magnitudeSqr() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
      }
      normalize() {
        const mag = this.magnitude();
        return mag === 0 ? new Vector3(0, 0, 0) : this.div(mag);
      }
      normalized() {
        return this.normalize();
      }
      // ------------------------
      // Dot / Cross products
      // ------------------------
      dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
      }
      cross(v) {
        return new Vector3(
          this.y * v.z - this.z * v.y,
          this.z * v.x - this.x * v.z,
          this.x * v.y - this.y * v.x
        );
      }
      // ------------------------
      // Angle
      // ------------------------
      angle() {
        return Math.acos(this.dot(Vector3.forward) / this.magnitude());
      }
      angleTo(v) {
        const diff = v.sub(this);
        return Math.acos(diff.dot(Vector3.forward) / diff.magnitude());
      }
      // ------------------------
      // Utility
      // ------------------------
      copy() {
        return new Vector3(this.x, this.y, this.z);
      }
      equals(v) {
        return this.x === v.x && this.y === v.y && this.z === v.z;
      }
      toString() {
        return `X: ${this.x}, Y: ${this.y}, Z: ${this.z}`;
      }
      // ------------------------
      // Static constants
      // ------------------------
      static zero = new Vector3(0, 0, 0);
      static one = new Vector3(1, 1, 1);
      static up = new Vector3(0, 1, 0);
      static down = new Vector3(0, -1, 0);
      static left = new Vector3(-1, 0, 0);
      static right = new Vector3(1, 0, 0);
      static forward = new Vector3(0, 0, 1);
      static back = new Vector3(0, 0, -1);
      // ------------------------
      // Static helpers
      // ------------------------
      static fromAngle(theta, phi, length = 1) {
        const sinPhi = Math.sin(phi);
        return new Vector3(
          Math.cos(theta) * sinPhi * length,
          Math.sin(theta) * sinPhi * length,
          Math.cos(phi) * length
        );
      }
      static lerp(a, b, t) {
        return new Vector3(
          a.x + (b.x - a.x) * t,
          a.y + (b.y - a.y) * t,
          a.z + (b.z - a.z) * t
        );
      }
      static distance(a, b) {
        return a.sub(b).magnitude();
      }
      static dot(a, b) {
        return a.dot(b);
      }
    }
    math2.Vector3 = Vector3;
    math2.lerp = (a, b, t) => a + (b - a) * t;
    math2.clamp = (value, min, max) => Math.max(min, Math.min(max, value));
    math2.randRange = (min, max) => Math.random() * (max - min) + min;
    math2.deg2rad = (deg) => deg * Math.PI / 180;
    math2.rad2deg = (rad) => rad * 180 / Math.PI;
  })(math = BlitJS2.math || (BlitJS2.math = {}));
  class Rect {
    _x;
    _y;
    _w;
    _h;
    constructor(pos, size) {
      this._x = pos[0];
      this._y = pos[1];
      this._w = size[0];
      this._h = size[1];
    }
    copy() {
      return new Rect([this._x, this._y], [this._w, this._h]);
    }
    // ------------------------
    // Collision detection
    // ------------------------
    colliderect(other) {
      return !(this.left > other.right || this.right < other.left || this.bottom < other.top || this.top > other.bottom);
    }
    collidepoint(point) {
      return point[0] >= this.left && point[0] <= this.right && point[1] >= this.top && point[1] <= this.bottom;
    }
    // ------------------------
    // Getters & setters
    // ------------------------
    get width() {
      return this._w;
    }
    set width(value) {
      this._w = value;
    }
    get height() {
      return this._h;
    }
    set height(value) {
      this._h = value;
    }
    get x() {
      return this._x;
    }
    set x(value) {
      this._x = value;
    }
    get y() {
      return this._y;
    }
    set y(value) {
      this._y = value;
    }
    get pos() {
      return [this._x, this._y];
    }
    get size() {
      return [this._w, this._h];
    }
    get left() {
      return this._x;
    }
    set left(value) {
      this._x = value;
    }
    get right() {
      return this._x + this._w;
    }
    set right(value) {
      this._x = value - this._w;
    }
    get top() {
      return this._y;
    }
    set top(value) {
      this._y = value;
    }
    get bottom() {
      return this._y + this._h;
    }
    set bottom(value) {
      this._y = value - this._h;
    }
  }
  BlitJS2.Rect = Rect;
  class Surface {
    canvas = document.createElement("canvas");
    ctx = this.canvas.getContext("2d");
    size;
    image = null;
    _rect;
    _colorkey = null;
    constructor(size) {
      this.size = size;
      this.canvas.width = size[0];
      this.canvas.height = size[1];
      this._rect = new Rect([0, 0], size);
    }
    // ------------------------
    // Rendering
    // ------------------------
    fill(color = "black") {
      this.ctx.save();
      this.ctx.fillStyle = color;
      this.ctx.fillRect(0, 0, this.size[0], this.size[1]);
      this.ctx.restore();
    }
    blit(surface, pos) {
      this._rect.x = pos[0];
      this._rect.y = pos[1];
      this.ctx.drawImage(surface.canvas, this._rect.x, this._rect.y);
    }
    // ------------------------
    // Utility
    // ------------------------
    copy() {
      return new Surface(this.size);
    }
    // Get rect from surface
    getRect(pos) {
      if (pos) {
        this._rect.x = pos[0];
        this._rect.y = pos[1];
      }
      return this._rect;
    }
    getAt(pos) {
      const id = this.ctx.getImageData(pos[0], pos[1], 1, 1);
      const d = id.data;
      return [d[0], d[1], d[2], d[3]];
    }
    setAt(pos, color) {
      let r, g, b, a = 255;
      if (typeof color === "string") {
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = 1;
        tempCanvas.height = 1;
        const tempCtx = tempCanvas.getContext("2d");
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
    setColorKey(color = null) {
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
    }
    getColorKey() {
      return this._colorkey;
    }
  }
  BlitJS2.Surface = Surface;
  let image;
  ((image2) => {
    image2.load = (filename) => {
      return new Promise((res, rej) => {
        const imageElement = new Image();
        imageElement.src = filename;
        imageElement.onload = () => {
          const surf = new Surface([imageElement.width, imageElement.height]);
          surf.ctx.imageSmoothingEnabled = false;
          surf.ctx.drawImage(imageElement, 0, 0);
          surf.image = imageElement;
          res(surf);
        };
        imageElement.onerror = (err) => rej(err);
      });
    };
  })(image = BlitJS2.image || (BlitJS2.image = {}));
  let transform;
  ((transform2) => {
    transform2.scale = (surf, size) => {
      const scaled = new Surface(size);
      scaled.ctx.imageSmoothingEnabled = false;
      scaled.ctx.drawImage(surf.canvas, 0, 0, size[0], size[1]);
      return scaled;
    };
    transform2.rotate = (surf, angle) => {
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
    };
    transform2.flip = (surf, flip2) => {
      const w = surf.size[0];
      const h = surf.size[1];
      const flipped = new Surface([w, h]);
      flipped.ctx.imageSmoothingEnabled = false;
      flipped.ctx.translate(flip2[0] ? w : 0, flip2[1] ? h : 0);
      flipped.ctx.scale(flip2[0] ? -1 : 1, flip2[1] ? -1 : 1);
      flipped.ctx.drawImage(surf.canvas, 0, 0);
      return flipped;
    };
  })(transform = BlitJS2.transform || (BlitJS2.transform = {}));
  let draw;
  ((draw2) => {
    draw2.rect = (surface, rect2, color = { a: 1 }, lineWidth = 1) => {
      surface.ctx.save();
      surface.ctx.strokeStyle = `rgba(${color.r ?? 0}, ${color.g ?? 0}, ${color.b ?? 0}, ${color.a ?? 1})`;
      surface.ctx.lineWidth = lineWidth;
      surface.ctx.strokeRect(rect2.x, rect2.y, rect2.width, rect2.height);
      surface.ctx.restore();
    };
    draw2.fillRect = (surface, rect2, color = { a: 1 }) => {
      surface.ctx.save();
      surface.ctx.fillStyle = `rgba(${color.r ?? 0}, ${color.g ?? 0}, ${color.b ?? 0}, ${color.a ?? 1})`;
      surface.ctx.fillRect(rect2.x, rect2.y, rect2.width, rect2.height);
      surface.ctx.restore();
    };
    draw2.circle = (surface, pos, radius, color = { a: 1 }, lineWidth = 1) => {
      surface.ctx.save();
      surface.ctx.strokeStyle = `rgba(${color.r ?? 0}, ${color.g ?? 0}, ${color.b ?? 0}, ${color.a ?? 1})`;
      surface.ctx.lineWidth = lineWidth;
      surface.ctx.beginPath();
      surface.ctx.arc(pos[0], pos[1], radius, 0, 2 * Math.PI, false);
      surface.ctx.stroke();
      surface.ctx.restore();
    };
    draw2.fillCircle = (surface, pos, radius, color = { a: 1 }) => {
      surface.ctx.save();
      surface.ctx.fillStyle = `rgba(${color.r ?? 0}, ${color.g ?? 0}, ${color.b ?? 0}, ${color.a ?? 1})`;
      surface.ctx.beginPath();
      surface.ctx.arc(pos[0], pos[1], radius, 0, 2 * Math.PI, false);
      surface.ctx.fill();
      surface.ctx.restore();
    };
    draw2.line = (surface, start, end, color = { a: 1 }, lineWidth = 1) => {
      surface.ctx.save();
      surface.ctx.strokeStyle = `rgba(${color.r ?? 0}, ${color.g ?? 0}, ${color.b ?? 0}, ${color.a ?? 1})`;
      surface.ctx.lineWidth = lineWidth;
      surface.ctx.beginPath();
      surface.ctx.moveTo(start[0], start[1]);
      surface.ctx.lineTo(end[0], end[1]);
      surface.ctx.stroke();
      surface.ctx.restore();
    };
    draw2.arc = (surface, pos, radius, startAngle, endAngle, color = { a: 1 }, lineWidth = 1) => {
      surface.ctx.save();
      surface.ctx.strokeStyle = `rgba(${color.r ?? 0}, ${color.g ?? 0}, ${color.b ?? 0}, ${color.a ?? 1})`;
      surface.ctx.lineWidth = lineWidth;
      surface.ctx.beginPath();
      surface.ctx.arc(pos[0], pos[1], radius, startAngle, endAngle);
      surface.ctx.stroke();
      surface.ctx.restore();
    };
    draw2.ellipse = (surface, pos, radius, rotation = 0, startAngle = 0, endAngle = 2 * Math.PI, color = { a: 1 }, lineWidth = 1) => {
      surface.ctx.save();
      surface.ctx.strokeStyle = `rgba(${color.r ?? 0}, ${color.g ?? 0}, ${color.b ?? 0}, ${color.a ?? 1})`;
      surface.ctx.lineWidth = lineWidth;
      surface.ctx.beginPath();
      surface.ctx.ellipse(pos[0], pos[1], radius[0], radius[1], rotation, startAngle, endAngle);
      surface.ctx.stroke();
      surface.ctx.restore();
    };
    draw2.fillEllipse = (surface, pos, radius, rotation = 0, startAngle = 0, endAngle = 2 * Math.PI, color = { a: 1 }) => {
      surface.ctx.save();
      surface.ctx.fillStyle = `rgba(${color.r ?? 0}, ${color.g ?? 0}, ${color.b ?? 0}, ${color.a ?? 1})`;
      surface.ctx.beginPath();
      surface.ctx.ellipse(pos[0], pos[1], radius[0], radius[1], rotation, startAngle, endAngle);
      surface.ctx.fill();
      surface.ctx.restore();
    };
  })(draw = BlitJS2.draw || (BlitJS2.draw = {}));
  let font;
  ((font2) => {
    class Font {
      font;
      constructor(font3, size) {
        this.font = `${size}px ${font3 ?? "Arial"}`;
      }
      // Returns text as new surface
      render(text, color = { r: 255, g: 255, b: 255, a: 1 }) {
        const tempCanvas = document.createElement("canvas");
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.font = this.font;
        const metrics = tempCtx.measureText(text);
        const width = Math.ceil(metrics.width);
        const fontSizeMatch = this.font.match(/(\d+)px/);
        const fontSize = fontSizeMatch ? parseInt(fontSizeMatch[1], 10) : 16;
        const height = fontSize * 1.3;
        const surf = new Surface([width, height]);
        surf.ctx.imageSmoothingEnabled = true;
        surf.ctx.font = this.font;
        surf.ctx.fillStyle = `rgba(${color.r ?? 0}, ${color.g ?? 0}, ${color.b ?? 0}, ${color.a ?? 1})`;
        surf.ctx.textBaseline = "alphabetic";
        surf.ctx.fillText(text, 0, fontSize);
        return surf;
      }
    }
    font2.Font = Font;
  })(font = BlitJS2.font || (BlitJS2.font = {}));
  let audio;
  ((audio2) => {
    class Sound {
      _filename;
      _players = [];
      constructor(filename) {
        this._filename = filename;
      }
      play() {
        const player = new SoundPlayer(this._filename);
        this._players.push(player);
        player.play();
        player.audio.onended = () => {
          this._players = this._players.filter((p) => p !== player);
        };
        return player;
      }
      stop() {
        this._players.forEach((p) => p.stop());
        this._players = [];
      }
      pause() {
        this._players.forEach((p) => p.pause());
      }
    }
    audio2.Sound = Sound;
    class SoundPlayer {
      audio;
      constructor(filename) {
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
      set volume(volume) {
        this.audio.volume = volume;
      }
      get volume() {
        return this.audio.volume;
      }
      get duration() {
        return this.audio.duration;
      }
    }
    class Music {
      _audio;
      constructor(filename) {
        this._audio = new Audio(filename);
        this._audio.load();
      }
      play(loop = true) {
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
      set volume(volume) {
        this._audio.volume = volume;
      }
      get volume() {
        return this._audio.volume;
      }
      get duration() {
        return this._audio.duration;
      }
    }
    audio2.Music = Music;
  })(audio = BlitJS2.audio || (BlitJS2.audio = {}));
  let mask;
  ((mask2) => {
    class Mask {
      _width;
      _height;
      _data;
      constructor(width, height) {
        this._width = width;
        this._height = height;
        this._data = new Uint8Array(width * height);
      }
      getSize() {
        return [this._width, this._height];
      }
      getAt(x, y) {
        if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
          throw new Error("Index out of bounds");
        }
        return this._data[y * this._width + x] === 1;
      }
      setAt(x, y, value) {
        if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
          throw new Error("Index out of bounds");
        }
        this._data[y * this._width + x] = value ? 1 : 0;
      }
      count() {
        return this._data.reduce((acc, val) => acc + val, 0);
      }
      overlap(other, offset) {
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
    mask2.Mask = Mask;
    mask2.fromSurface = (surf, threshold = 127) => {
      const [w, h] = surf.size;
      const m = new Mask(w, h);
      const imageData = surf.ctx.getImageData(0, 0, w, h);
      const pixels = imageData.data;
      for (let i = 0; i < pixels.length; i += 4) {
        const alpha = pixels[i + 3];
        if (alpha > threshold) {
          const px = i / 4 % w;
          const py = Math.floor(i / 4 / w);
          m.setAt(px, py, true);
        }
      }
      return m;
    };
    mask2.toSurface = (mask3, setcolor = { r: 255, g: 255, b: 255, a: 1 }, unsetcolor = { r: 0, g: 0, b: 0, a: 1 }) => {
      const [w, h] = mask3.getSize();
      const surf = new Surface([w, h]);
      const id = surf.ctx.createImageData(w, h);
      const d = id.data;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const idx = (y * w + x) * 4;
          const col = mask3.getAt(x, y) ? setcolor : unsetcolor;
          d[idx] = col.r ?? 0;
          d[idx + 1] = col.g ?? 0;
          d[idx + 2] = col.b ?? 0;
          d[idx + 3] = Math.round((col.a ?? 1) * 255);
        }
      }
      surf.ctx.putImageData(id, 0, 0);
      return surf;
    };
  })(mask = BlitJS2.mask || (BlitJS2.mask = {}));
  let display;
  ((_display) => {
    class Display {
      canvas = document.getElementById("canvas");
      ctx = this.canvas.getContext("2d");
      surface;
      cursorVisible = true;
      constructor(size) {
        this.canvas.width = size[0];
        this.canvas.height = size[1];
        this.surface = new Surface([this.canvas.width, this.canvas.height]);
      }
      // ------------------------
      // Render with display surface
      // ------------------------
      fill(color = "black") {
        this.surface.fill(color);
      }
      blit(surf, pos) {
        this.surface.blit(surf, pos);
      }
      // Update display canvas
      update() {
        this.canvas.style.cursor = this.cursorVisible ? "default" : "none";
        this.ctx.drawImage(this.surface.canvas, 0, 0);
      }
    }
    _display.display = null;
    _display.setMode = (size) => {
      _display.display = new Display(size);
      return _display.display;
    };
    _display.getSurface = () => {
      return _display.display ? _display.display.surface : null;
    };
    _display.getSize = () => {
      return _display.display ? [_display.display.surface.size[0], _display.display.surface.size[1]] : [0, 0];
    };
    _display.getWidth = () => {
      return _display.display ? _display.display.surface.size[0] : 0;
    };
    _display.getHeight = () => {
      return _display.display ? _display.display.surface.size[1] : 0;
    };
  })(display = BlitJS2.display || (BlitJS2.display = {}));
  let time;
  ((time2) => {
    class Clock {
      _last = performance.now();
      _rawDelta = 0;
      _delta = 0;
      _times = [];
      _maxDeltaMs = 250;
      tick(fps = 0) {
        let now = performance.now();
        this._rawDelta = now - this._last;
        this._delta = this._rawDelta;
        if (fps > 0) {
          const target = 1e3 / fps;
          const delay = target - this._delta;
          if (delay > 0) {
            const start = performance.now();
            while (performance.now() - start < delay) {
            }
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
      getTime() {
        return this._delta;
      }
      getRawTime() {
        return this._rawDelta;
      }
      getFPS() {
        if (this._times.length === 0) return 0;
        const avg = this._times.reduce((a, b) => a + b, 0) / this._times.length;
        return 1e3 / avg;
      }
    }
    time2.Clock = Clock;
  })(time = BlitJS2.time || (BlitJS2.time = {}));
  let mouse;
  ((mouse2) => {
    let _pos = [0, 0];
    let _lastPos = [0, 0];
    const canvas = document.getElementById("canvas");
    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      _pos[0] = (e.clientX - rect.left) * scaleX;
      _pos[1] = (e.clientY - rect.top) * scaleY;
    });
    mouse2.getPos = () => {
      return [..._pos];
    };
    mouse2.getRel = () => {
      const deltaX = _pos[0] - _lastPos[0];
      const deltaY = _pos[1] - _lastPos[1];
      _lastPos = [..._pos];
      return [deltaX, deltaY];
    };
    mouse2.setVisible = (visible) => {
      if (display.display) {
        display.display.cursorVisible = visible;
      }
    };
    mouse2.getVisible = () => {
      if (display.display)
        return display.display?.cursorVisible;
      return true;
    };
  })(mouse = BlitJS2.mouse || (BlitJS2.mouse = {}));
  let Keys;
  ((Keys2) => {
    Keys2["A"] = "a";
    Keys2["B"] = "b";
    Keys2["C"] = "c";
    Keys2["D"] = "d";
    Keys2["E"] = "e";
    Keys2["F"] = "f";
    Keys2["G"] = "g";
    Keys2["H"] = "h";
    Keys2["I"] = "i";
    Keys2["J"] = "j";
    Keys2["K"] = "k";
    Keys2["L"] = "l";
    Keys2["M"] = "m";
    Keys2["N"] = "n";
    Keys2["O"] = "o";
    Keys2["P"] = "p";
    Keys2["Q"] = "q";
    Keys2["R"] = "r";
    Keys2["S"] = "s";
    Keys2["T"] = "t";
    Keys2["U"] = "u";
    Keys2["V"] = "v";
    Keys2["W"] = "w";
    Keys2["X"] = "x";
    Keys2["Y"] = "y";
    Keys2["Z"] = "z";
    Keys2["Num0"] = "0";
    Keys2["Num1"] = "1";
    Keys2["Num2"] = "2";
    Keys2["Num3"] = "3";
    Keys2["Num4"] = "4";
    Keys2["Num5"] = "5";
    Keys2["Num6"] = "6";
    Keys2["Num7"] = "7";
    Keys2["Num8"] = "8";
    Keys2["Num9"] = "9";
    Keys2["Shift"] = "Shift";
    Keys2["Ctrl"] = "Control";
    Keys2["Alt"] = "Alt";
    Keys2["Meta"] = "Meta";
    Keys2["CapsLock"] = "CapsLock";
    Keys2["Enter"] = "Enter";
    Keys2["Space"] = " ";
    Keys2["Backspace"] = "Backspace";
    Keys2["Tab"] = "Tab";
    Keys2["Escape"] = "Escape";
    Keys2["Delete"] = "Delete";
    Keys2["Home"] = "Home";
    Keys2["End"] = "End";
    Keys2["PageUp"] = "PageUp";
    Keys2["PageDown"] = "PageDown";
    Keys2["Up"] = "ArrowUp";
    Keys2["Down"] = "ArrowDown";
    Keys2["Left"] = "ArrowLeft";
    Keys2["Right"] = "ArrowRight";
    Keys2["F1"] = "F1";
    Keys2["F2"] = "F2";
    Keys2["F3"] = "F3";
    Keys2["F4"] = "F4";
    Keys2["F5"] = "F5";
    Keys2["F6"] = "F6";
    Keys2["F7"] = "F7";
    Keys2["F8"] = "F8";
    Keys2["F9"] = "F9";
    Keys2["F10"] = "F10";
    Keys2["F11"] = "F11";
    Keys2["F12"] = "F12";
  })(Keys = BlitJS2.Keys || (BlitJS2.Keys = {}));
  let Buttons;
  ((Buttons2) => {
    Buttons2[Buttons2["Left"] = 0] = "Left";
    Buttons2[Buttons2["Middle"] = 1] = "Middle";
    Buttons2[Buttons2["Right"] = 2] = "Right";
    Buttons2[Buttons2["Back"] = 3] = "Back";
    Buttons2[Buttons2["Forward"] = 4] = "Forward";
  })(Buttons = BlitJS2.Buttons || (BlitJS2.Buttons = {}));
  let event;
  ((event2) => {
    let EventType;
    ((EventType2) => {
      EventType2[EventType2["KeyDown"] = 0] = "KeyDown";
      EventType2[EventType2["KeyUp"] = 1] = "KeyUp";
      EventType2[EventType2["MouseDown"] = 2] = "MouseDown";
      EventType2[EventType2["MouseUp"] = 3] = "MouseUp";
      EventType2[EventType2["WindowFocusGained"] = 4] = "WindowFocusGained";
      EventType2[EventType2["WindowFocusLost"] = 5] = "WindowFocusLost";
    })(EventType = event2.EventType || (event2.EventType = {}));
    const eventQueue = [];
    const pressedKeys = /* @__PURE__ */ new Set();
    window.addEventListener("keydown", (e) => {
      if (!pressedKeys.has(e.key)) {
        pressedKeys.add(e.key);
        eventQueue.push({ type: 0 /* KeyDown */, key: e.key });
      }
    });
    window.addEventListener("keyup", (e) => {
      pressedKeys.delete(e.key);
      eventQueue.push({ type: 1 /* KeyUp */, key: e.key });
    });
    window.addEventListener("mousedown", (e) => eventQueue.push({ type: 2 /* MouseDown */, button: e.button }));
    window.addEventListener("mouseup", (e) => eventQueue.push({ type: 3 /* MouseUp */, button: e.button }));
    window.addEventListener("contextmenu", (e) => e.preventDefault());
    window.addEventListener("blur", () => eventQueue.push({ type: 5 /* WindowFocusLost */ }));
    window.addEventListener("focus", () => eventQueue.push({ type: 4 /* WindowFocusGained */ }));
    event2.get = () => {
      const events = [...eventQueue];
      eventQueue.length = 0;
      return events;
    };
  })(event = BlitJS2.event || (BlitJS2.event = {}));
})(BlitJS || (BlitJS = {}));
export {
  BlitJS
};
