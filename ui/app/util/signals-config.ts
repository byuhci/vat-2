export const SENSOR_NAMES = {
    'A' : 'accelerometer',
    'B' : 'barometer',    
    'G' : 'gyroscope',    
    'L' : 'light',
    'T' : 'temperature',
    'E' : 'error',
    'S' : 'syslog',
    'V' : 'voltage'
}

export const XYZ = {
    0: "x",
    1: "y",
    2: "z"
}

export const BAROMETER = {
    0: "altitude",
    1: "temperature"
}

/**
 * Returns the name of the specified dimension index for the specified signal.
 * This is kept in signals config since this function may be subject to change.
 */
export function SIGNAL_DIM(name: string, idx: number) {
    if (idx < 3) {
        if ("A G".includes(name)) {
            return XYZ[idx];
        }
        else if (name === 'B' && idx < 2) {
            return BAROMETER[idx];
        }
        else if (idx === 0) {
            if ("S E".includes(name)) { return "msg";}
            else return SENSOR_NAMES[name];
        }
    }
    return String(idx);
}