import { ReactComponent as StarLine } from '@lib/assets/svgs/star-line.svg';
import { ReactComponent as ForwardEndFill } from '@lib/assets/svgs/forward-end-fill.svg';
import { ReactComponent as PauseLargeFill } from '@lib/assets/svgs/pause-large-fill.svg';
import { ReactComponent as PlayLargeFill } from '@lib/assets/svgs/play-large-fill.svg';
import { ReactComponent as RewindFill } from '@lib/assets/svgs/rewind-fill.svg';
import { ReactComponent as RewindStartFill } from '@lib/assets/svgs/rewind-start-fill.svg';
import { ReactComponent as ShuffleFill } from '@lib/assets/svgs/shuffle-fill.svg';
import { ReactComponent as SpeedFill } from '@lib/assets/svgs/speed-fill.svg';
import { ReactComponent as StopLargeFill } from '@lib/assets/svgs/stop-large-fill.svg';
import { ReactComponent as VolumeMuteFill } from '@lib/assets/svgs/volume-mute-fill.svg';
import { ReactComponent as VolumeDownFill } from '@lib/assets/svgs/volume-down-fill.svg';
import { ReactComponent as VolumeUpFill } from '@lib/assets/svgs/volume-up-fill.svg';
import { ReactComponent as RepeatFill } from '@lib/assets/svgs/repeat-fill.svg';
import { ReactComponent as RepeatOneFill } from '@lib/assets/svgs/repeat-one-fill.svg';
import { ReactComponent as Repeat2Fill } from '@lib/assets/svgs/repeat-2-fill.svg';
import { ReactComponent as DiscFill } from '@lib/assets/svgs/disc-fill.svg';
import { ReactComponent as Playlist2Fill } from '@lib/assets/svgs/play-list-2-fill.svg';
import { ReactComponent as PlaylistAddFill } from '@lib/assets/svgs/play-list-add-fill.svg';
import { ReactComponent as CloseFill } from '@lib/assets/svgs/close-fill.svg';
import { ReactComponent as CursorLine } from '@lib/assets/svgs/cursor-line.svg';
import { ReactComponent as EqualizerLine } from '@lib/assets/svgs/equalizer-line.svg';
import { ReactComponent as PaletteLine } from '@lib/assets/svgs/palette-line.svg';
import { ReactComponent as PlayCircleLine } from '@lib/assets/svgs/play-circle-line.svg';
import { ReactComponent as PulseLine } from '@lib/assets/svgs/pulse-line.svg';
import { ReactComponent as RhythmLine } from '@lib/assets/svgs/rhythm-line.svg';
import { ReactComponent as SpeedUpLine } from '@lib/assets/svgs/speed-up-line.svg';
import { ReactComponent as VoicePrintLine } from '@lib/assets/svgs/voiceprint-line.svg';
import { ReactComponent as AccessibilityLine } from '@lib/assets/svgs/accessibility-line.svg';
import { ReactComponent as CodeLine } from '@lib/assets/svgs/code-line.svg';
import { ReactComponent as FontSize } from '@lib/assets/svgs/font-size.svg';
import { ReactComponent as ColorFilterLine } from '@lib/assets/svgs/color-filter-line.svg';
import { ReactComponent as LayoutMasonryLine } from '@lib/assets/svgs/layout-masonry-line.svg';
import { ReactComponent as ExternalLinkLine } from '@lib/assets/svgs/external-link-line.svg';

export const icons = {
  'star-line': StarLine,
  'forward-end-fill': ForwardEndFill,
  'pause-large-fill': PauseLargeFill,
  'play-large-fill': PlayLargeFill,
  'repeat-fill': RepeatFill,
  'repeat-one-fill': RepeatOneFill,
  'repeat-2-fill': Repeat2Fill,
  'rewind-fill': RewindFill,
  'rewind-start-fill': RewindStartFill,
  'shuffle-fill': ShuffleFill,
  'speed-fill': SpeedFill,
  'stop-large-fill': StopLargeFill,
  'volume-mute-fill': VolumeMuteFill,
  'volume-down-fill': VolumeDownFill,
  'volume-up-fill': VolumeUpFill,
  'disc-fill': DiscFill,
  'play-list-2-fill': Playlist2Fill,
  'play-list-add-line': PlaylistAddFill,
  'close-fill': CloseFill,
  'cursor-line': CursorLine,
  'equalizer-line': EqualizerLine,
  'palette-line': PaletteLine,
  'play-circle-line': PlayCircleLine,
  'pulse-line': PulseLine,
  'rhythm-line': RhythmLine,
  'speed-up-line': SpeedUpLine,
  'voice-print-line': VoicePrintLine,
  'accessibility-line': AccessibilityLine,
  'code-line': CodeLine,
  'font-size': FontSize,
  'color-filter-line': ColorFilterLine,
  'layout-masonry-line': LayoutMasonryLine,
  'external-link-line': ExternalLinkLine,
} as const;

export type IconName = keyof typeof icons;

export type IconSubset<T extends IconName> = keyof Pick<typeof icons, T>;

export type VolumeIconName = IconSubset<'volume-mute-fill' | 'volume-down-fill' | 'volume-up-fill'>;
