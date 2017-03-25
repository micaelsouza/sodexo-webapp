'use strict';

export default function IdGenerator () {
  return () => {
    return `_${Math.random().toString(36).substr(2, 9)}`;
  }
}
