'use strict';

function calculateMaxSegmentsInView(displayWidth, minSegmentWidth, gapWidth = 0) {
  const effectiveDisplayWidth = Math.max(0, displayWidth);
  const effectiveMinSegmentWidth = Math.max(1, minSegmentWidth);
  const effectiveGapWidth = Math.max(0, gapWidth);
  return Math.floor(
    (effectiveDisplayWidth + effectiveGapWidth) / (effectiveMinSegmentWidth + effectiveGapWidth)
  );
}

exports.calculateMaxSegmentsInView = calculateMaxSegmentsInView;
