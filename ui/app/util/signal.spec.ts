import { Sensor, Syslog } from './signal';

describe('Sensor', () => {

    let accelerometer: Sensor;
    let gyroscope: Sensor;
    let barometer: Sensor;
    let syslog: Syslog;
    let voltage: Sensor;

    beforeEach(() => {
        accelerometer = new Sensor('A');
        gyroscope = new Sensor('G');
        barometer = new Sensor('B');
        syslog = new Syslog();
        voltage = new Sensor('V');
    });
    it('isMessage', () => {
        expect(accelerometer.isMessage).toBe(false);
        expect(gyroscope.isMessage).toBe(false);
        expect(barometer.isMessage).toBe(false);
        expect(voltage.isMessage).toBe(false);
        expect(syslog.isMessage).toBe(true);
    });
});