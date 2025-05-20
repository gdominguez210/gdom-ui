'use strict';

const jsxRuntime = require('react/jsx-runtime');
const bundleMjs = require('./bundle-mjs-BaFtyl1I.js');
const Icon = require('./Icon-DwP7VsOV.js');
const starLine = require('./star-line-ExREWdoL.js');
const forwardEndFill = require('./forward-end-fill-CzVIzQuJ.js');
const pauseLargeFill = require('./pause-large-fill-9Rv5rxj7.js');
const playLargeFill = require('./play-large-fill-CQA14Zrd.js');
const rewindFill = require('./rewind-fill-AVJ308ss.js');
const rewindStartFill = require('./rewind-start-fill-oo2u_T64.js');
const shuffleFill = require('./shuffle-fill-TsQjoy8-.js');
const speedFill = require('./speed-fill-BzP-1dXL.js');
const stopLargeFill = require('./stop-large-fill-C8MOWCm7.js');
const volumeMuteFill = require('./volume-mute-fill-z1AhzVjB.js');
const volumeDownFill = require('./volume-down-fill-CSghfwq8.js');
const volumeUpFill = require('./volume-up-fill-CNLeWF9u.js');
const repeatFill = require('./repeat-fill-D-EYEzjp.js');
const repeatOneFill = require('./repeat-one-fill-LddgrqxJ.js');
const repeat2Fill = require('./repeat-2-fill-DXU8uA0f.js');
const discFill = require('./disc-fill-BibpUVNc.js');
const playList2Fill = require('./play-list-2-fill-BKD67hhm.js');
const playListAddFill = require('./play-list-add-fill-DfeCyrSQ.js');
const closeFill = require('./close-fill-CknXOjCr.js');
const cursorLine = require('./cursor-line-B0dsistR.js');
const equalizerLine = require('./equalizer-line-BDC5yzCd.js');
const paletteLine = require('./palette-line-PRlIJix9.js');
const playCircleLine = require('./play-circle-line-CyCDjxB2.js');
const pulseLine = require('./pulse-line-EA3bhgHH.js');
const rhythmLine = require('./rhythm-line-CkJdzGqQ.js');
const speedUpLine = require('./speed-up-line-DlbZLymm.js');
const voiceprintLine = require('./voiceprint-line-BRZ9DG00.js');
const accessibilityLine = require('./accessibility-line-sFx6HnuX.js');
const codeLine = require('./code-line-D7t0ovjs.js');
const fontSize = require('./font-size-B4cjrhFe.js');
const colorFilterLine = require('./color-filter-line-cwLELFTP.js');
const layoutMasonryLine = require('./layout-masonry-line-D37yZBIQ.js');
const externalLinkLine = require('./external-link-line-DWZJ0X1-.js');

const icons = {
  "star-line": starLine.ForwardRef,
  "forward-end-fill": forwardEndFill.ForwardRef,
  "pause-large-fill": pauseLargeFill.ForwardRef,
  "play-large-fill": playLargeFill.ForwardRef,
  "repeat-fill": repeatFill.ForwardRef,
  "repeat-one-fill": repeatOneFill.ForwardRef,
  "repeat-2-fill": repeat2Fill.ForwardRef,
  "rewind-fill": rewindFill.ForwardRef,
  "rewind-start-fill": rewindStartFill.ForwardRef,
  "shuffle-fill": shuffleFill.ForwardRef,
  "speed-fill": speedFill.ForwardRef,
  "stop-large-fill": stopLargeFill.ForwardRef,
  "volume-mute-fill": volumeMuteFill.ForwardRef,
  "volume-down-fill": volumeDownFill.ForwardRef,
  "volume-up-fill": volumeUpFill.ForwardRef,
  "disc-fill": discFill.ForwardRef,
  "play-list-2-fill": playList2Fill.ForwardRef,
  "play-list-add-line": playListAddFill.ForwardRef,
  "close-fill": closeFill.ForwardRef,
  "cursor-line": cursorLine.ForwardRef,
  "equalizer-line": equalizerLine.ForwardRef,
  "palette-line": paletteLine.ForwardRef,
  "play-circle-line": playCircleLine.ForwardRef,
  "pulse-line": pulseLine.ForwardRef,
  "rhythm-line": rhythmLine.ForwardRef,
  "speed-up-line": speedUpLine.ForwardRef,
  "voice-print-line": voiceprintLine.ForwardRef,
  "accessibility-line": accessibilityLine.ForwardRef,
  "code-line": codeLine.ForwardRef,
  "font-size": fontSize.ForwardRef,
  "color-filter-line": colorFilterLine.ForwardRef,
  "layout-masonry-line": layoutMasonryLine.ForwardRef,
  "external-link-line": externalLinkLine.ForwardRef
};

function IconLibrary(props) {
  const { name, className, ...restProps } = props;
  const IconComponent = icons[name];
  if (!IconComponent) {
    console.error(`IconLibrary: Icon with name "${name}" not found`);
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    Icon.Icon,
    {
      as: IconComponent,
      className: bundleMjs.twMerge(bundleMjs.clsx("h-[1em] fill-current", className)),
      ...restProps
    }
  );
}

exports.IconLibrary = IconLibrary;
