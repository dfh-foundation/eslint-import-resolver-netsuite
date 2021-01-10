import { resolve } from './index';

describe("resolve()", () => {
  it('should resolve SuiteScript module', () => {
    // given
    const params = {
      config: {},
      source: 'N/search',
      file: __filename,
    }

    // when
    const result = resolve(params.source, params.file, params.config);

    // then
    expect(result).toEqual({ found: true, path: null });
  });
  it('should resolve non-relative directory import', () => {
    // given
    const params = {
      config: {},
      source: 'resolve', // use dependency required by package
      file: __filename,
    }

    // when
    const result = resolve(params.source, params.file, params.config);

    // then
    expect(result.found).toBe(true);
    expect(result.path).toContain("resolve/index.js");
  });
  it('should resolve relative file import', () => {
    // given
    const params = {
      config: {},
      source: './index',
      file: __filename,
    }

    // when
    const result = resolve(params.source, params.file, params.config);

    // then
    expect(result.found).toBe(true);
    expect(result.path).toContain("/index.ts");
  });
  it('should throw error resolving relative directory import', () => {
    // given
    const params = {
      config: {},
      source: './',
      file: __filename,
    }

    // when
    const shouldThrow = () => resolve(params.source, params.file, params.config);

    // then
    expect(shouldThrow).toThrow('Found relative directory import');
  });
});
