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
} as const;

export type IconName = keyof typeof icons;

export type IconSubset<T extends IconName> = keyof Pick<typeof icons, T>;

export type VolumeIconName = IconSubset<'volume-mute-fill' | 'volume-down-fill' | 'volume-up-fill'>;
