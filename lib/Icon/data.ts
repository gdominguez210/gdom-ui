import StarLine from '@lib/assets/svgs/star-line.svg';
import ForwardEndFill from '@lib/assets/svgs/forward-end-fill.svg';
import PauseLargeFill from '@lib/assets/svgs/pause-large-fill.svg';
import PlayLargeFill from '@lib/assets/svgs/play-large-fill.svg';
import RewindFill from '@lib/assets/svgs/rewind-fill.svg';
import RewindStartFill from '@lib/assets/svgs/rewind-start-fill.svg';
import ShuffleFill from '@lib/assets/svgs/shuffle-fill.svg';
import SpeedFill from '@lib/assets/svgs/speed-fill.svg';
import StopLargeFill from '@lib/assets/svgs/stop-large-fill.svg';
import VolumeMuteFill from '@lib/assets/svgs/volume-mute-fill.svg';
import VolumeDownFill from '@lib/assets/svgs/volume-down-fill.svg';
import VolumeUpFill from '@lib/assets/svgs/volume-up-fill.svg';
import RepeatFill from '@lib/assets/svgs/repeat-fill.svg';
import RepeatOneFill from '@lib/assets/svgs/repeat-one-fill.svg';
import Repeat2Fill from '@lib/assets/svgs/repeat-2-fill.svg';
import DiscFill from '@lib/assets/svgs/disc-fill.svg';

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
} as const;

export type IconName = keyof typeof icons;
