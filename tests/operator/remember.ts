import xs from '../../src/index';
import {emptyObserver} from '../../src/utils/emptyObserver';
import * as assert from 'assert';

describe('Stream.prototype.remember', () => {
  it('should replay the second event to a new observer', (done) => {
    const stream = xs.interval(50).take(4).remember();

    stream.subscribe(emptyObserver);

    let expected = [1, 2, 3];
    setTimeout(() => {
      stream.subscribe({
        next(x) {
          assert.strictEqual(x, expected.shift());
        },
        error: done.fail,
        end: () => {
          assert.strictEqual(expected.length, 0);
          done();
        }
      });
    }, 125);
  });

  it('should allow use like a subject', (done) => {
    const stream = xs.MemoryStream()

    stream.next(1);

    stream.subscribe({
      next(x: any) {
        assert.strictEqual(x, 1);
      },
      error: done.fail,
      end: done,
    });

    stream.end();
  });
});
