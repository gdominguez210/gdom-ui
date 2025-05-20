import { jsx } from 'react/jsx-runtime';
import { t as twMerge, c as clsx } from './bundle-mjs-Cl353mOg.js';
import { I as Icon } from './Icon-DonY0k_x.js';
import { F as ForwardRef$w } from './star-line-DRvctLf7.js';
import { F as ForwardRef$v } from './forward-end-fill-VyYAEIY7.js';
import { F as ForwardRef$u } from './pause-large-fill-BsM4mRFm.js';
import { F as ForwardRef$t } from './play-large-fill-Brckd8tM.js';
import { F as ForwardRef$p } from './rewind-fill-CxpznxkL.js';
import { F as ForwardRef$o } from './rewind-start-fill-DTPJBL50.js';
import { F as ForwardRef$n } from './shuffle-fill-Cp-zfRc0.js';
import { F as ForwardRef$m } from './speed-fill-BD-j22bx.js';
import { F as ForwardRef$l } from './stop-large-fill-DNt8BMH1.js';
import { F as ForwardRef$k } from './volume-mute-fill-D_PQyG5V.js';
import { F as ForwardRef$j } from './volume-down-fill-6XHy6mbq.js';
import { F as ForwardRef$i } from './volume-up-fill-B4NWU3gC.js';
import { F as ForwardRef$s } from './repeat-fill-C-L3bVEL.js';
import { F as ForwardRef$r } from './repeat-one-fill-C7-VNaTz.js';
import { F as ForwardRef$q } from './repeat-2-fill-_JJM4rae.js';
import { F as ForwardRef$h } from './disc-fill-DrtiTdqw.js';
import { F as ForwardRef$g } from './play-list-2-fill-CBFikuQu.js';
import { F as ForwardRef$f } from './play-list-add-fill-CPFfRIsj.js';
import { F as ForwardRef$e } from './close-fill-BgxsgjiX.js';
import { F as ForwardRef$d } from './cursor-line-DBaHS73J.js';
import { F as ForwardRef$c } from './equalizer-line-B--KX0PN.js';
import { F as ForwardRef$b } from './palette-line-C1E6bZzI.js';
import { F as ForwardRef$a } from './play-circle-line-C5F93_IV.js';
import { F as ForwardRef$9 } from './pulse-line-CPIM73TO.js';
import { F as ForwardRef$8 } from './rhythm-line-Csp8ES0u.js';
import { F as ForwardRef$7 } from './speed-up-line-t0gKcnb2.js';
import { F as ForwardRef$6 } from './voiceprint-line-DfBr49Ed.js';
import { F as ForwardRef$5 } from './accessibility-line-B59NGirg.js';
import { F as ForwardRef$4 } from './code-line-CkY9jetj.js';
import { F as ForwardRef$3 } from './font-size-KL4pYRq8.js';
import { F as ForwardRef$2 } from './color-filter-line-q6QP8JLG.js';
import { F as ForwardRef$1 } from './layout-masonry-line-CaRWD2IN.js';
import { F as ForwardRef } from './external-link-line-BaNWw5AU.js';

const icons = {
  "star-line": ForwardRef$w,
  "forward-end-fill": ForwardRef$v,
  "pause-large-fill": ForwardRef$u,
  "play-large-fill": ForwardRef$t,
  "repeat-fill": ForwardRef$s,
  "repeat-one-fill": ForwardRef$r,
  "repeat-2-fill": ForwardRef$q,
  "rewind-fill": ForwardRef$p,
  "rewind-start-fill": ForwardRef$o,
  "shuffle-fill": ForwardRef$n,
  "speed-fill": ForwardRef$m,
  "stop-large-fill": ForwardRef$l,
  "volume-mute-fill": ForwardRef$k,
  "volume-down-fill": ForwardRef$j,
  "volume-up-fill": ForwardRef$i,
  "disc-fill": ForwardRef$h,
  "play-list-2-fill": ForwardRef$g,
  "play-list-add-line": ForwardRef$f,
  "close-fill": ForwardRef$e,
  "cursor-line": ForwardRef$d,
  "equalizer-line": ForwardRef$c,
  "palette-line": ForwardRef$b,
  "play-circle-line": ForwardRef$a,
  "pulse-line": ForwardRef$9,
  "rhythm-line": ForwardRef$8,
  "speed-up-line": ForwardRef$7,
  "voice-print-line": ForwardRef$6,
  "accessibility-line": ForwardRef$5,
  "code-line": ForwardRef$4,
  "font-size": ForwardRef$3,
  "color-filter-line": ForwardRef$2,
  "layout-masonry-line": ForwardRef$1,
  "external-link-line": ForwardRef
};

function IconLibrary(props) {
  const { name, className, ...restProps } = props;
  const IconComponent = icons[name];
  if (!IconComponent) {
    console.error(`IconLibrary: Icon with name "${name}" not found`);
    return null;
  }
  return /* @__PURE__ */ jsx(
    Icon,
    {
      as: IconComponent,
      className: twMerge(clsx("h-[1em] fill-current", className)),
      ...restProps
    }
  );
}

export { IconLibrary as I };
