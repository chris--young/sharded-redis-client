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

module.exports = class HostRange {
  
  constructor(host, startPort, endPort, slaveHosts, readPreference) {
    if (!host || typeof host !== 'string')
      throw new TypeError('host must be string');

    if (!startPort || !Number.isInteger(startPort))
      throw new TypeError('startPort must be integer');

    if (endPort !== undefined) {
      if (!Number.isInteger(endPort))
        throw new TypeError('endPort must be integer');

      if (endPort < startPort)
        throw new RangeError('endPort must be greater than startPort');
    }

    if (slaveHosts !== undefined) {
      if (!Array.isArray(slaveHosts))
        throw new TypeError('slaveHosts must be array of strings');

      slaveHosts.forEach(slave => {
        if (!slave || typeof slave !== 'string')
          throw new TypeError('slaveHosts must be array of strings');
      });
    }

    if (readPreference !== undefined && !/^slave$/.test(readPreference))
      throw new TypeError('readPreference must be one of ["slave"]');

    this.host = host;
    this.startPort = startPort;
    this.endPort = endPort || startPort;
    this.slaveHosts = slaveHosts || [];
    this.readPreference = readPreference;
  }

  toArray() {
    const set = [];

    for (let i = this.startPort; i <= this.endPort; ++i)
      set.push({ host: this.host, port: i, slaves: this.slaveHosts, readPreference: this.readPreference });

    return set;
  }

};
