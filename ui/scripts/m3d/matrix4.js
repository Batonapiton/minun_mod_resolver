const { cos, sin } = Math;

    var _v1 = new Vector3();
    var _m1 = new Matrix4();
    var _zero = new Vector3( 0, 0, 0 );
    var _one = new Vector3( 1, 1, 1 );
    var _x = new Vector3();
    var _y = new Vector3();
    var _z = new Vector3();

const multiply = function (m, a, b) {

    let ae = a.elements;
    let be = b.elements;
    let te = m.elements;

    let a11 = ae[0]; let a12 = ae[4]; let a13 = ae[8]; let a14 = ae[12];
    let a21 = ae[1]; let a22 = ae[5]; let a23 = ae[9]; let a24 = ae[13];
    let a31 = ae[2]; let a32 = ae[6]; let a33 = ae[10]; let a34 = ae[14];
    let a41 = ae[3]; let a42 = ae[7]; let a43 = ae[11]; let a44 = ae[15];

    let b11 = be[0]; let b12 = be[4]; let b13 = be[8]; let b14 = be[12];
    let b21 = be[1]; let b22 = be[5]; let b23 = be[9]; let b24 = be[13];
    let b31 = be[2]; let b32 = be[6]; let b33 = be[10]; let b34 = be[14];
    let b41 = be[3]; let b42 = be[7]; let b43 = be[11]; let b44 = be[15];

    te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
    te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
    te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
    te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

    te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
    te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
    te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
    te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

    te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
    te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
    te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
    te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

    te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
    te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
    te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
    te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

    return this;

},


const Matrix4 = function Matrix4() {
    this.elements = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];
};

Matrix4.prototype.set = function (n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
    var te = this.elements;
    te[0] = n11; te[4] = n12; te[8] = n13; te[12] = n14;
    te[1] = n21; te[5] = n22; te[9] = n23; te[13] = n24;
    te[2] = n31; te[6] = n32; te[10] = n33; te[14] = n34;
    te[3] = n41; te[7] = n42; te[11] = n43; te[15] = n44;
    return this;
};

Matrix4.prototype.identity = function () {
    this.set(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    );
    return this;
};

Matrix4.prototype.clone = function () {
    let e = this.elements;
    return new Matrix4().set(
        e[0], e[4], e[8], e[12],
        e[1], e[5], e[9], e[13],
        e[2], e[6], e[10], e[14],
        e[3], e[7], e[11], e[15]
    );
};

Matrix4.prototype.copy = function (m) {
    let te = this.elements;
    let me = m.elements;
    te[0] = me[0]; te[1] = me[1]; te[2] = me[2]; te[3] = me[3];
    te[4] = me[4]; te[5] = me[5]; te[6] = me[6]; te[7] = me[7];
    te[8] = me[8]; te[9] = me[9]; te[10] = me[10]; te[11] = me[11];
    te[12] = me[12]; te[13] = me[13]; te[14] = me[14]; te[15] = me[15];
    return this;
};

Matrix4.prototype.makeRotationFromEuler = function (euler) {
    let te = this.elements;
    let { x, y, z, order } = euler;
    let a = Math.cos(x); let b = Math.sin(x);
    let c = Math.cos(y); let d = Math.sin(y);
    let e = Math.cos(z); let f = Math.sin(z);
    switch (order) {
        case "XYZ": {
            let ae = a * e; let af = a * f; let be = b * e; let bf = b * f;
            te[0] = c * e; te[4] = - c * f; te[8] = d;
            te[1] = af + be * d; te[5] = ae - bf * d; te[9] = - b * c;
            te[2] = bf - ae * d; te[6] = be + af * d; te[10] = a * c;
            break; 
        };
        case "YXZ": {
            let ce = c * e; let cf = c * f; let de = d * e; let df = d * f;
            te[0] = ce + df * b; te[4] = de * b - cf; te[8] = a * d;
            te[1] = a * f; te[5] = a * e; te[9] = - b;
            te[2] = cf * b - de; te[6] = df + ce * b; te[10] = a * c;
            break;
        }
        case "ZXY": {
            let ce = c * e; let cf = c * f; let de = d * e; let df = d * f;
            te[0] = ce - df * b; te[4] = - a * f; te[8] = de + cf * b;
            te[1] = cf + de * b; te[5] = a * e; te[9] = df - ce * b;
            te[2] = - a * d; te[6] = b; te[10] = a * c;
            break;
        }
        case "ZYX": {
            let ae = a * e; let af = a * f; let be = b * e; let bf = b * f;
            te[0] = c * e; te[4] = be * d - af; te[8] = ae * d + bf;
            te[1] = c * f; te[5] = bf * d + ae; te[9] = af * d - be;
            te[2] = - d; te[6] = b * c; te[10] = a * c;
            break;
        }
        case "YZX": {
            let ac = a * c; let ad = a * d; let bc = b * c; let bd = b * d;
            te[0] = c * e; te[4] = bd - ac * f; te[8] = bc * f + ad;
            te[1] = f; te[5] = a * e; te[9] = - b * e;
            te[2] = - d * e; te[6] = ad * f + bc; te[10] = ac - bd * f;
            break;
        }
        case "XZY": {
            let ac = a * c; let ad = a * d; let bc = b * c; let bd = b * d;
            te[0] = c * e; te[4] = - f; te[8] = d * e;
            te[1] = ac * f + bd; te[5] = a * e; te[9] = ad * f - bc;
            te[2] = bc * f - ad; te[6] = b * e; te[10] = bd * f + ac;
            break;
        }
    }
    // bottom row
    te[3] = 0; te[7] = 0; te[11] = 0;
    // last column
    te[12] = 0; te[13] = 0; te[14] = 0; te[15] = 1;
    return this;
};

Matrix4.prototype.makeRotationFromQuaternion = function (q) {
    return this.compose(_zero, q, _one);
};

Matrix4.prototype.multiply = function (m) {
    return multiply(this, this, m);
};

Matrix4.prototype.premultiply = function (m) {
    return multiply(this, m ,this);
};

Matrix4.prototype.determinant = function () {
    let te = this.elements;
    let n11 = te[0]; let n12 = te[4]; let n13 = te[8]; let n14 = te[12];
    let n21 = te[1]; let n22 = te[5]; let n23 = te[9]; let n24 = te[13];
    let n31 = te[2]; let n32 = te[6]; let n33 = te[10]; let n34 = te[14];
    let n41 = te[3]; let n42 = te[7]; let n43 = te[11]; let n44 = te[15];
    return (
        n41 * (
            + n14 * n23 * n32
            - n13 * n24 * n32
            - n14 * n22 * n33
            + n12 * n24 * n33
            + n13 * n22 * n34
            - n12 * n23 * n34
        ) +
        n42 * (
            + n11 * n23 * n34
            - n11 * n24 * n33
            + n14 * n21 * n33
            - n13 * n21 * n34
            + n13 * n24 * n31
            - n14 * n23 * n31
        ) +
        n43 * (
            + n11 * n24 * n32
            - n11 * n22 * n34
            - n14 * n21 * n32
            + n12 * n21 * n34
            + n14 * n22 * n31
            - n12 * n24 * n31
        ) +
        n44 * (
            - n13 * n22 * n31
            - n11 * n23 * n32
            + n11 * n22 * n33
            + n13 * n21 * n32
            - n12 * n21 * n33
            + n12 * n23 * n31
        )
    );
};

Matrix4.prototype.transpose = function () {
    let te = this.elements;
    let tmp;
    tmp = te[1]; te[1] = te[4]; te[4] = tmp;
    tmp = te[2]; te[2] = te[8]; te[8] = tmp;
    tmp = te[6]; te[6] = te[9]; te[9] = tmp;
    tmp = te[3]; te[3] = te[12]; te[12] = tmp;
    tmp = te[7]; te[7] = te[13]; te[13] = tmp;
    tmp = te[11]; te[11] = te[14]; te[14] = tmp;
    return this;
};

Matrix4.prototype.setForMatrixInverse = function (m) {
    let te = this.elements;
    let me = m.elements;
    let n11 = me[0]; let n21 = me[1]; let n31 = me[2]; let n41 = me[3];
    let n12 = me[4]; let n22 = me[5]; let n32 = me[6]; let n42 = me[7];
    let n13 = me[8]; let n23 = me[9]; let n33 = me[10]; let n43 = me[11];
    let n14 = me[12]; let n24 = me[13]; let n34 = me[14]; let n44 = me[15];
    let t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44;
    let t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44;
    let t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44;
    let t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
    let det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;
    if ( det === 0 ) {
        return this.identity();
    }
    let detInv = 1 / det;
    te[0] = t11 * detInv;
    te[1] = (n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44) * detInv;
    te[2] = (n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44) * detInv;
    te[3] = (n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43) * detInv;
    te[4] = t12 * detInv;
    te[5] = (n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44) * detInv;
    te[6] = (n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44) * detInv;
    te[7] = (n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43) * detInv;
    te[8] = t13 * detInv;
    te[9] = (n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44) * detInv;
    te[10] = (n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44) * detInv;
    te[11] = (n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43) * detInv;
    te[12] = t14 * detInv;
    te[13] = (n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34) * detInv;
    te[14] = (n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34) * detInv;
    te[15] = (n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33) * detInv;
    return this;
};

Matrix4.prototype.scale = function (v) {
    let te = this.elements;
    let { x, y, z } = v;
    te[0] *= x; te[4] *= y; te[8] *= z;
    te[1] *= x; te[5] *= y; te[9] *= z;
    te[2] *= x; te[6] *= y; te[10] *= z;
    te[3] *= x; te[7] *= y; te[11] *= z;
    return this;
};

Matrix4.prototype.makeTranslation = function (x, y, z) {
    this.set(
        1, 0, 0, x,
        0, 1, 0, y,
        0, 0, 1, z,
        0, 0, 0, 1
    );
    return this;
};

Matrix4.prototype.makeRotationX = function (theta) {
    let c = cos(theta); let s = sin(theta);
    this.set(
        1, 0, 0, 0,
        0, c, - s, 0,
        0, s, c, 0,
        0, 0, 0, 1
    );
    return this;
};

Matrix4.prototype.makeRotationY = function (theta) {
    let c = cos(theta); let s = sin(theta);
    this.set(
        c, 0, s, 0,
        0, 1, 0, 0,
        - s, 0, c, 0,
        0, 0, 0, 1
    );
    return this;
};

Matrix4.prototype.makeRotationZ = function (theta) {
    let c = cos(theta); let s = sin(theta);
    this.set(
        c, - s, 0, 0,
        s, c, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    );
    return this;
};

Matrix4.prototype.makeRotationAxis = function (axis, angle) {
    let c = cos(angle);
    let s = sin(angle);
    let t = 1 - c;
    let { x, y, z } = axis;
    let tx = t * x; let ty = t * y;
    this.set(
        tx * x + c, tx * y - s * z, tx * z + s * y, 0,
        tx * y + s * z, ty * y + c, ty * z - s * x, 0,
        tx * z - s * y, ty * z + s * x, t * z * z + c, 0,
        0, 0, 0, 1
    );
    return this;
};

Matrix4.prototype.makeScale = function (x, y, z) {
    this.set(
        x, 0, 0, 0,
        0, y, 0, 0,
        0, 0, z, 0,
        0, 0, 0, 1
    );
    return this;
};

Matrix4.prototype.makeShear = function (x, y, z) {
    this.set(
        1, y, z, 0,
        x, 1, z, 0,
        x, y, 1, 0,
        0, 0, 0, 1
    );
    return this;
};

Matrix4.prototype.compose = function (position, quaternion, scale) {
    let te = this.elements;
    let { x, y, z, w } = quaternion;
    let x2 = x + x; let y2 = y + y; let z2 = z + z;
    let xx = x * x2; let xy = x * y2; let xz = x * z2;
    let yy = y * y2; let yz = y * z2; let zz = z * z2;
    let wx = w * x2; let wy = w * y2; let wz = w * z2;
    let sx = scale.x; let sy = scale.y; let sz = scale.z;
    te[0] = (1 - (yy + zz)) * sx;
    te[1] = (xy + wz) * sx;
    te[2] = (xz - wy) * sx;
    te[3] = 0;
    te[4] = (xy - wz) * sy;
    te[5] = (1 - (xx + zz)) * sy;
    te[6] = (yz + wx) * sy;
    te[7] = 0;
    te[8] = (xz + wy) * sz;
    te[9] = (yz - wx) * sz;
    te[10] = (1 - (xx + yy)) * sz;
    te[11] = 0;
    te[12] = position.x;
    te[13] = position.y;
    te[14] = position.z;
    te[15] = 1;
    return this;
};

Matrix4.prototype.decompose = function (position, quaternion, scale) {
    let te = this.elements;
    let sx = _v1.set(te[0], te[1], te[2]).length;
    let sy = _v1.set(te[4], te[5], te[6]).length;
    let sz = _v1.set(te[8], te[9], te[10]).length;
    var det = this.determinant();
    if (det < 0) { sx = - sx; }
    position.x = te[12];
    position.y = te[13];
    position.z = te[14];
    _m1.copy(this);
    let invSX = 1 / sx;
    let invSY = 1 / sy;
    let invSZ = 1 / sz;
    _m1.elements[0] *= invSX;
    _m1.elements[1] *= invSX;
    _m1.elements[2] *= invSX;
    _m1.elements[4] *= invSY;
    _m1.elements[5] *= invSY;
    _m1.elements[6] *= invSY;
    _m1.elements[8] *= invSZ;
    _m1.elements[9] *= invSZ;
    _m1.elements[10] *= invSZ;
    quaternion.setFromRotationMatrix(_m1);
    scale.x = sx;
    scale.y = sy;
    scale.z = sz;
    return this;
};

Matrix4.prototype.makePerspective = function (left, right, top, bottom, near, far) {
    let te = this.elements;
    let x = 2 * near / (right - left);
    let y = 2 * near / (top - bottom);
    let a = (right + left) / (right - left);
    let b = (top + bottom) / (top - bottom);
    let c = - (far + near) / (far - near);
    let d = - 2 * far * near / (far - near);
    te[0] = x; te[4] = 0; te[8] = a; te[12] = 0;
    te[1] = 0; te[5] = y; te[9] = b; te[13] = 0;
    te[2] = 0; te[6] = 0; te[10] = c; te[14] = d;
    te[3] = 0; te[7] = 0; te[11] = -1; te[15] = 0;
    return this;
};

Matrix4.prototype.makeOrthographic = function (left, right, top, bottom, near, far) {
    let te = this.elements;
    let w = 1.0 / (right - left);
    let h = 1.0 / (top - bottom);
    let p = 1.0 / (far - near);
    let x = (right + left) * w;
    let y = (top + bottom) * h;
    let z = (far + near) * p;
    te[0] = 2 * w; te[4] = 0; te[8] = 0; te[12] = -x;
    te[1] = 0; te[5] = 2 * h; te[9] = 0; te[13] = -y;
    te[2] = 0; te[6] = 0; te[10] = -2 * p; te[14] = -z;
    te[3] = 0; te[7] = 0; te[11] = 0; te[15] = 1;
    return this;
};

Matrix4.prototype.equals = function (matrix) {
    let te = this.elements;
    let me = matrix.elements;
    for (let i = 0; i < 16; ++i) {
        if (te[i] !== me[i]) { return false; }
    }
    return true;
};

module.exports.Matrix4 = Matrix4;