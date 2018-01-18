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

class RoundRobinSetItem {
  constructor(index, data, set) {
    this.index = index;
    this.data = data;
    this.set = set;

    Object.freeze(this);
  }
}

module.exports = class RoundRobinSet {
  
  constructor(arr) {
    if (!Array.isArray(arr))
      throw new TypeError('arr must be array');

    if (!arr.length)
      throw new Error('arr must not be empty');

    this._current = 0;
    this._items = arr.map((data, index) => new RoundRobinSetItem(index, data, this));
  }

  obtain() {
    const item = this._items[this._current];

    this._current = (this._current + 1) % this._items.length;

    return item;
  }

  next(item) {
    if (item instanceof RoundRobinSetItem !== true)
      throw new TypeError();

    if (item.set !== this)
      throw new Error();

    return this._items[(item.index + 1) % this._items.length];
  }

};
