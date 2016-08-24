import { CapitalizePipe } from './capitalize.pipe';
describe('CapitalizePipe', () => {
  let pipe: CapitalizePipe;
  beforeEach(() => {
    pipe = new CapitalizePipe();
  });
  it('transforms "abc" to "Abc"', () => {
    expect(pipe.transform('abc')).toEqual('Abc');
  });
  it('transforms "abc def" to "Abc def"', () => {
    expect(pipe.transform('abc def')).toEqual('Abc def');
  });
  it('leaves "ABC DEF" unchanged', () => {
    expect(pipe.transform('ABC DEF')).toEqual('ABC DEF');
  });
});