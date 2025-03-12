export class Vector {
    readonly x: number;
    readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(v: Vector): Vector {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    subtract(v: Vector): Vector {
        return new Vector(this.x - v.x, this.y - v.y);
    }

    multiply(scalar: number): Vector {
        return new Vector(this.x * scalar, this.y * scalar);
    }

    divide(scalar: number): Vector {
        return new Vector(this.x / scalar, this.y / scalar);
    }

    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize(): Vector {
        return this.divide(this.length());
    }

    dot(v: Vector): number {
        return this.x * v.x + this.y * v.y;
    }

    angle(v: Vector): number {
        return Math.acos(this.dot(v) / (this.length() * v.length()));
    }

    rotate(angle: number): Vector {
        return new Vector(
            this.x * Math.cos(angle) - this.y * Math.sin(angle),
            this.x * Math.sin(angle) + this.y * Math.cos(angle)
        );
    }

    mul(multiplier: number): Vector {
        return new Vector(this.x * multiplier, this.y * multiplier);
    }
}