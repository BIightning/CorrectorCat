import { CountryFromIsoPipe } from './country-from-iso.pipe';

describe('CountryFromIsoPipe', () => {
  it('create an instance', () => {
    const pipe = new CountryFromIsoPipe();
    expect(pipe).toBeTruthy();
  });
});
