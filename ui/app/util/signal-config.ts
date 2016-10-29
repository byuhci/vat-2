export const SENSOR_NAMES = {
    'A': 'accelerometer',
    'B': 'barometer',
    'G': 'gyroscope',
    'L': 'light',
    'T': 'temperature',
    'E': 'error',
    'S': 'syslog',
    'V': 'voltage'
}

const XYZ = {
    0: "x",
    1: "y",
    2: "z"
}

const BAROMETER = {
    0: "altitude",
    1: "temperature"
}

const sig_dim = {
    'A': XYZ,
    'B': BAROMETER,
    'G': XYZ,
    'L': { 0: 'light' },
    'T': { 0: 'temperature' },
    'E': { 0: 'msg' },
    'S': { 0: 'msg', 1:'flashes'},
    'V': { 0: 'voltage' }
}

/**
 * Returns the name of the specified dimension index for the specified signal.
 */
export function SIGNAL_DIM(name: string, idx: number): string {
    return sig_dim[name][idx] || String(idx);
}