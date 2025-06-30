import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlayerContextProvider } from '@/lib/AudioPlayerContextProvider/AudioPlayerContextProvider';
import { useAudioPlayerContextRefs } from '@/lib/AudioPlayerContextRefsProvider/useAudioPlayerContextRefs';
import { useAudioPlayerContextTrack } from '@/lib/AudioPlayerContextTrackProvider/useAudioPlayerContextTrack';
import { useAudioPlayerContextTime } from '@/lib/AudioPlayerContextTimeProvider/useAudioPlayerContextTime';
import { useAudioPlayerContextPlayback } from '@/lib/AudioPlayerContextPlaybackProvider/useAudioPlayerContextPlayback';
import { trackData } from '@/data/trackData';

function RefsConsumer() {
  const { audioRef, progressBarRef } = useAudioPlayerContextRefs();
  return (
    <div data-testid="refs-consumer">
      {Boolean(audioRef) && Boolean(progressBarRef) ? 'Refs Available' : 'No Refs'}
    </div>
  );
}

function TrackConsumer() {
  const { currentTrack, currentTrackIndex } = useAudioPlayerContextTrack();
  return (
    <div data-testid="track-consumer">
      {currentTrack ? `Track ${currentTrackIndex}: ${currentTrack.title}` : 'No Track'}
    </div>
  );
}

function TimeConsumer() {
  const { currentTime, duration } = useAudioPlayerContextTime();
  return <div data-testid="time-consumer">{`Time: ${currentTime}/${duration}`}</div>;
}

function AudioConsumer() {
  const { isPlaying, volume, mute, shuffle, loop } = useAudioPlayerContextPlayback();
  return (
    <div data-testid="audio-consumer">
      {`Playing: ${isPlaying}, Volume: ${volume}, Mute: ${mute}, Shuffle: ${shuffle}, Loop: ${loop}`}
    </div>
  );
}

describe('AudioPlayerContextProvider', () => {
  test('should provide all contexts to children', () => {
    render(
      <AudioPlayerContextProvider tracks={trackData}>
        <RefsConsumer />
        <TrackConsumer />
        <TimeConsumer />
        <AudioConsumer />
      </AudioPlayerContextProvider>,
    );

    expect(screen.getByTestId('refs-consumer')).toHaveTextContent('Refs Available');
    expect(screen.getByTestId('track-consumer')).toHaveTextContent(
      `Track 0: ${trackData[0]!.title}`,
    );
    expect(screen.getByTestId('time-consumer')).toHaveTextContent('Time: 0/0');
    expect(screen.getByTestId('audio-consumer')).toHaveTextContent(
      'Playing: false, Volume: 50, Mute: false, Shuffle: false, Loop: false',
    );
  });

  test('should accept and apply default track index', () => {
    render(
      <AudioPlayerContextProvider
        tracks={trackData}
        defaultTrackIndex={1}
      >
        <TrackConsumer />
      </AudioPlayerContextProvider>,
    );

    expect(screen.getByTestId('track-consumer')).toHaveTextContent(
      `Track 1: ${trackData[1]!.title}`,
    );
  });

  test('should accept and apply default audio settings', () => {
    render(
      <AudioPlayerContextProvider
        tracks={trackData}
        defaultVolume={75}
        defaultMute={true}
        defaultShuffle={true}
        defaultLoop={true}
      >
        <AudioConsumer />
      </AudioPlayerContextProvider>,
    );

    const audioConsumer = screen.getByTestId('audio-consumer');
    expect(audioConsumer).toHaveTextContent('Volume: 75');
    expect(audioConsumer).toHaveTextContent('Mute: true');
    expect(audioConsumer).toHaveTextContent('Shuffle: true');
    expect(audioConsumer).toHaveTextContent('Loop: true');
  });

  test('should render children', () => {
    render(
      <AudioPlayerContextProvider tracks={trackData}>
        <div data-testid="child">Child Content</div>
      </AudioPlayerContextProvider>,
    );

    expect(screen.getByTestId('child')).toHaveTextContent('Child Content');
  });

  test('should require tracks prop', () => {
    // @ts-expect-error - Testing missing required prop
    expect(() => render(<AudioPlayerContextProvider />)).toThrow();
  });
});
