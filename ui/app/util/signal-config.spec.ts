import { SIGNAL_DIM } from './signals-config';

describe('Signal-Config', () => {
    it('accelerometer xyz', () => {
        expect(SIGNAL_DIM('A', 0)).toEqual('x');
        expect(SIGNAL_DIM('A', 1)).toEqual('y');
        expect(SIGNAL_DIM('A', 2)).toEqual('z');
    });
});