// import { render, screen, act } from '@testing-library/react';
// import { describe, expect, test } from 'vitest';
// import { AudioPlayerContextProvider } from './AudioPlayerContextProvider';
// import { useAudioPlayerContextState } from './useAudioPlayerContextState';
// import { useAudioPlayerContextDispatch } from './useAudioPlayerContextDispatch';
// import { trackData } from '@lib/AudioPlayer/data';

// // Test component that uses both contexts
// function TestComponent() {
//   const state = useAudioPlayerContextState();
//   const { actions, dispatch } = useAudioPlayerContextDispatch();

//   return (
//     <div>
//       <span data-testid="current-track">{state.currentTrack?.title}</span>
//       <button
//         data-testid="next-track"
//         onClick={() =>
//           dispatch({
//             type: actions.SET_CURRENT_TRACK_INDEX,
//             payload: {
//               currentTrackIndex: state.currentTrackIndex + 1,
//             },
//           })
//         }
//       >
//         Next
//       </button>
//     </div>
//   );
// }

// describe('AudioPlayerContextProvider', () => {
//   test('should provide initial state with first track', () => {
//     render(
//       <AudioPlayerContextProvider tracks={trackData}>
//         <TestComponent />
//       </AudioPlayerContextProvider>,
//     );

//     const currentTrack = screen.getByTestId('current-track');
//     expect(currentTrack).toHaveTextContent(trackData[0]!.title);
//   });

//   test('should initialize with specified track index', () => {
//     const defaultTrackIndex = 1;

//     render(
//       <AudioPlayerContextProvider
//         tracks={trackData}
//         defaultTrackIndex={defaultTrackIndex}
//       >
//         <TestComponent />
//       </AudioPlayerContextProvider>,
//     );

//     const currentTrack = screen.getByTestId('current-track');
//     expect(currentTrack).toHaveTextContent(trackData[defaultTrackIndex]!.title);
//   });

//   test('should update state when dispatch is called', () => {
//     render(
//       <AudioPlayerContextProvider tracks={trackData}>
//         <TestComponent />
//       </AudioPlayerContextProvider>,
//     );

//     const nextButton = screen.getByTestId('next-track');
//     act(() => {
//       nextButton.click();
//     });

//     const currentTrack = screen.getByTestId('current-track');
//     expect(currentTrack).toHaveTextContent(trackData[1]!.title);
//   });

//   test('should initialize with paused state', () => {
//     function TestPlayingState() {
//       const { isPlaying } = useAudioPlayerContextState();
//       return <div data-testid="playing-state">{isPlaying ? 'playing' : 'paused'}</div>;
//     }

//     render(
//       <AudioPlayerContextProvider tracks={trackData}>
//         <TestPlayingState />
//       </AudioPlayerContextProvider>,
//     );

//     const playingState = screen.getByTestId('playing-state');
//     expect(playingState).toHaveTextContent('paused');
//   });

//   test('should initialize with 0 duration', () => {
//     function TestDuration() {
//       const { duration } = useAudioPlayerContextState();
//       return <div data-testid="duration">{duration}</div>;
//     }

//     render(
//       <AudioPlayerContextProvider tracks={trackData}>
//         <TestDuration />
//       </AudioPlayerContextProvider>,
//     );

//     const duration = screen.getByTestId('duration');
//     expect(duration).toHaveTextContent('0');
//   });
// });
