precision mediump float;
precision mediump int;

varying vec3 gridPosition;

uniform float width;
uniform float height;
uniform float grid;
uniform float outline;

void main() {

    float x = abs(gridPosition.x + 5.0 - floor((gridPosition.x + 5.0) / grid) * grid - grid * 0.5);
    float z = abs(gridPosition.z + 5.0 - floor((gridPosition.z + 5.0) / grid) * grid - grid * 0.5);

    float alpha = 0.0;
    if ((x < outline * 0.5) || (z < outline * 0.5)) {
        alpha = 0.5;
    } else {
        float distance = (min(x, z) - outline * 0.5) / outline * 2.0;
        if (distance > 1.0) {
            alpha = 0.0;
        } else {
            alpha = (1.0 - distance) * 0.5;
        }
    }

    if ((gridPosition.x > -5.0) && (gridPosition.x < width + 5.0) &&
        (gridPosition.z > -5.0) && (gridPosition.z < height + 2.0)) {
        if ((gridPosition.x < 0.0) || (gridPosition.z < 0.0) ||
            (gridPosition.x > width) || (gridPosition.z > height)) {
            alpha = 1.0;
        }
    } else {
        alpha = 0.0;
    }

    gl_FragColor = vec4(0.5, 0.5, 0.5, alpha);
}
