import { SIGNAL_DIM } from './signal-config';

describe('Signal-Config', () => {
    it('accelerometer xyz', () => {
        expect(SIGNAL_DIM('A', 0)).toEqual('x');
        expect(SIGNAL_DIM('A', 1)).toEqual('y');
        expect(SIGNAL_DIM('A', 2)).toEqual('z');
    });

    it('gyroscope xyz', () => {
        expect(SIGNAL_DIM('G', 0)).toEqual('x');
        expect(SIGNAL_DIM('G', 1)).toEqual('y');
        expect(SIGNAL_DIM('G', 2)).toEqual('z');
    });

    it('barometer', () => {
        expect(SIGNAL_DIM('B', 0)).toEqual('altitude');
        expect(SIGNAL_DIM('B', 1)).toEqual('temperature');
    });

    it('bad index', () => {
        expect(SIGNAL_DIM('A', 4)).toEqual('4');
        expect(SIGNAL_DIM('G', 5)).toEqual('5');
        expect(SIGNAL_DIM('B', 3)).toEqual('3');
        expect(SIGNAL_DIM('S', 2)).toEqual('2');
        expect(SIGNAL_DIM('E', 2)).toEqual('2');
        expect(SIGNAL_DIM('L', 1)).toEqual('1');
        expect(SIGNAL_DIM('V', 4)).toEqual('4');
    });

    it('light, temperature, and voltage', () => {
        expect(SIGNAL_DIM('L', 0)).toEqual('light');
        expect(SIGNAL_DIM('T', 0)).toEqual('temperature');
        expect(SIGNAL_DIM('V', 0)).toEqual('voltage');
    });

    it('syslog and error', () => {
        expect(SIGNAL_DIM('S', 0)).toEqual('msg');
        expect(SIGNAL_DIM('E', 0)).toEqual('msg');
    });
});