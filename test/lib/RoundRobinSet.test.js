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

const RoundRobinSet = require('../../lib/RoundRobinSet');

describe('RoundRobinSet', () => {
  it('requires valid constructor arguments', () => {
    expect(() => new RoundRobinSet([1])).not.toThrow();
    expect(() => new RoundRobinSet([{}])).not.toThrow();
    expect(() => new RoundRobinSet()).toThrowErrorOfType('TypeError');
    expect(() => new RoundRobinSet([])).toThrowErrorOfType('Error');
  });

  describe('.obtain()', () => {
    const rrs = new RoundRobinSet([0, 1, 2]);

    it('iterates the set', () => {
      for (let x = 0; x < 3; ++x) {
        const i = rrs.obtain();

        expect(i).toBeObject();
        expect(i.data).toEqual(x);
      }
    });

    it('wraps around to the beginning at the end of the set', () => {
      const i = rrs.obtain();

      expect(i).toBeObject();
      expect(i.data).toEqual(0);
    });
  });

  describe('.next()', () => {
    it('requires an item from the set', () => {
      const rrs = new RoundRobinSet([0, 1, 2]);

      expect(() => rrs.next()).toThrowErrorOfType('TypeError');
    });

    it('requires the given item to belong to the set', () => {
      const rrs = new RoundRobinSet([0, 1, 2]);
      const rrs2 = new RoundRobinSet(['a', 'b', 'c']);
      const i = rrs.obtain();

      expect(() => rrs2.next(i)).toThrowErrorOfType('Error');
    });

    it('returns the next item in the set, when given an item from the set', () => {
      const rrs = new RoundRobinSet([0, 1, 2]);
      const i = rrs.obtain();
      const n = rrs.next(i);

      expect(n).toBeObject();
      expect(n.data).toEqual(1);
    });
  });
});
