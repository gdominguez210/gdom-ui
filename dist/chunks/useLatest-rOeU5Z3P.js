'use strict';

const React = require('react');

function useLatest(value) {
  const ref = React.useRef(value);
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref;
}

exports.useLatest = useLatest;
