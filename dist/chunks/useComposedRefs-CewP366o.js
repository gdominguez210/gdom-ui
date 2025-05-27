'use strict';

const React = require('react');

function setRef(ref, instance) {
  if (!ref) return void 0;
  if (typeof ref === "function") {
    const result = ref(instance);
    if (typeof result === "function") {
      return result;
    }
  } else if ("current" in ref) {
    ref.current = instance;
  }
  return void 0;
}
function composeRefs(...refs) {
  return (instance) => {
    const evaluatedRefs = refs.map((ref) => setRef(ref, instance));
    return () => {
      evaluatedRefs.forEach((value, index) => {
        if (typeof value === "function") {
          value();
        } else {
          setRef(refs[index], null);
        }
      });
    };
  };
}
function useComposedRefs(...refs) {
  return React.useCallback(composeRefs(...refs), refs);
}

exports.composeRefs = composeRefs;
exports.useComposedRefs = useComposedRefs;
