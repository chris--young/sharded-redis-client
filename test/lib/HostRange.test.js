/**
 * Copyright © 2013 - 2017 Tinder, Inc.
 *
 * Permission to use, copy, modify, and distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

'use strict';

const HostRange = require('../../lib/HostRange');

describe('HostRange', () => {

  it('requires valid constructor arguments', () => {
    expect(() => new HostRange('localhost', 6379)).not.toThrow();
    expect(() => new HostRange('localhost', 6379, 6380, ['foo.bar'], 'slave')).not.toThrow();

    expect(() => new HostRange(123, 'foo')).toThrowErrorOfType('TypeError');
    expect(() => new HostRange('localhost', 1.5)).toThrowErrorOfType('TypeError');
    expect(() => new HostRange('localhost', 6379, 1.5)).toThrowErrorOfType('TypeError');
    expect(() => new HostRange('localhost', 6379, 6378)).toThrowErrorOfType('RangeError');
    expect(() => new HostRange('localhost', 6379, 6380, 'foo')).toThrowErrorOfType('TypeError');
    expect(() => new HostRange('localhost', 6379, 6380, [], true)).toThrowErrorOfType('TypeError');
    expect(() => new HostRange('localhost', 6379, 6380, [123], true)).toThrowErrorOfType('TypeError');
  });

  describe('.toArray()', () => {
    it('returns a set of hosts', () => {
      let hr = new HostRange('localhost', 6379);
      let a = hr.toArray();

      expect(a).toBeArray();
      expect(a.length).toEqual(1);
      expect(a[0]).toBeObject();
      expect(a[0].host).toBeString();
      expect(a[0].port).toBeNumber();
      expect(a[0].slaves).toBeArray();
      expect(a[0].readPreference).toBeUndefined();

      hr = new HostRange('localhost', 6379, 6380, ['foo.bar'], 'slave');
      a = hr.toArray();

      expect(a).toBeArray();
      expect(a.length).toEqual(2);

      for (let x = 0; x < 2; ++x) {
        expect(a[x].host).toEqual('localhost');
        expect(a[x].port).toEqual(6379 + x);
        expect(a[x].slaves).toEqual(['foo.bar']);
        expect(a[x].readPreference).toEqual('slave');
      }
    });
  });

});
