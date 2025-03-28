import type { Meta, StoryObj } from '@storybook/react';
import { AudioPlayer } from '@lib/AudioPlayer';
import { trackData } from './data';

export default {
  title: 'components/AudioPlayer',
  component: AudioPlayer.Root,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'A customizable audio player component',
    docs: {
      source: {
        type: 'dynamic',
        // Custom transformer to hide trackData array contents
        transform: (code: string) => {
          // Replace any array literal in the tracks prop with 'trackData'
          return code.replace(/tracks=\{\[[\s\S]*?\]\}/g, 'tracks={trackData}');
        },
      },
    },
  },
  // List all subcomponents to show in the docs
  subcomponents: {
    'AudioPlayer.Root': AudioPlayer.Root,
    'AudioPlayer.Provider': AudioPlayer.Provider,
    'AudioPlayer.Author': AudioPlayer.Author,
    'AudioPlayer.Controls': AudioPlayer.Controls,
    'AudioPlayer.Image': AudioPlayer.Image,
    'AudioPlayer.Info': AudioPlayer.Info,
    'AudioPlayer.ProgressBar': AudioPlayer.ProgressBar,
    'AudioPlayer.Time': AudioPlayer.Time,
    'AudioPlayer.Title': AudioPlayer.Title,
    'AudioPlayer.Volume': AudioPlayer.Volume,
    'AudioPlayer.VolumeButton': AudioPlayer.VolumeButton,
    'AudioPlayer.VolumeSlider': AudioPlayer.VolumeSlider,
    'AudioPlayer.ControlPlay': AudioPlayer.ControlPlay,
    'AudioPlayer.ControlNext': AudioPlayer.ControlNext,
    'AudioPlayer.ControlPrevious': AudioPlayer.ControlPrevious,
    'AudioPlayer.ControlShuffle': AudioPlayer.ControlShuffle,
    'AudioPlayer.ControlLoop': AudioPlayer.ControlLoop,
    'AudioPlayer.ControlAudio': AudioPlayer.ControlAudio,
  },
} as Meta<typeof AudioPlayer.Root>;

export const Example: StoryObj<typeof AudioPlayer.Root> = {
  parameters: {
    docs: {
      description: {
        story: 'An example layout with all available components',
      },
      source: {
        type: 'dynamic',
      },
    },
  },
  render: () => (
    <AudioPlayer.Provider tracks={trackData}>
      <AudioPlayer.Root>
        <div className="justify-space-between flex flex-grow gap-4">
          <AudioPlayer.Info className="basis-1/3">
            <AudioPlayer.Image />
            <div className="py-2">
              <AudioPlayer.Title />
              <AudioPlayer.Author />
              <AudioPlayer.Time />
            </div>
          </AudioPlayer.Info>
          <AudioPlayer.Controls className="basis-1/3">
            <AudioPlayer.ControlAudio />
            <AudioPlayer.ControlPrevious />
            <AudioPlayer.ControlPlay />
            <AudioPlayer.ControlNext />
            <AudioPlayer.ControlShuffle />
            <AudioPlayer.ControlLoop />
          </AudioPlayer.Controls>
          <AudioPlayer.Volume className="ml-auto pr-4">
            <AudioPlayer.VolumeButton />
            <AudioPlayer.VolumeSlider />
          </AudioPlayer.Volume>
        </div>
        <AudioPlayer.ProgressBar />
      </AudioPlayer.Root>
    </AudioPlayer.Provider>
  ),
};

export const Compact: StoryObj<typeof AudioPlayer.Root> = {
  parameters: {
    docs: {
      description: {
        story: 'A more compact layout with less stacked elements ',
      },
      source: {
        type: 'dynamic',
      },
    },
  },
  render: () => (
    <AudioPlayer.Provider tracks={trackData}>
      <AudioPlayer.Root>
        <div className="flex flex-grow items-center justify-between gap-4">
          <AudioPlayer.Controls className="py-2">
            <AudioPlayer.ControlAudio />
            <AudioPlayer.ControlPrevious />
            <AudioPlayer.ControlPlay />
            <AudioPlayer.ControlNext />
            <AudioPlayer.Time />
          </AudioPlayer.Controls>
          <AudioPlayer.Info className="grow justify-center">
            <AudioPlayer.Image
              width={64}
              height={64}
              className="h-16 w-16"
            />
            <div className="py-2">
              <AudioPlayer.Title />
              <AudioPlayer.Author />
            </div>
          </AudioPlayer.Info>
          <AudioPlayer.Volume className="flex basis-[165px]">
            <AudioPlayer.VolumeButton />
            <AudioPlayer.VolumeSlider />
          </AudioPlayer.Volume>
          <AudioPlayer.Controls className="py-2">
            <AudioPlayer.ControlShuffle className="text-2xl" />
            <AudioPlayer.ControlLoop className="text-2xl" />
          </AudioPlayer.Controls>
        </div>
        <AudioPlayer.ProgressBar className="before:bg-red-600" />
      </AudioPlayer.Root>
    </AudioPlayer.Provider>
  ),
};

// export const WithCollapsiblePlaylist: StoryObj<typeof AudioPlayer.Root> = {
//   parameters: {
//     docs: {
//       description: {
//         story:
//           'A player with a collapsible playlist that can be toggled with a button or dismissed with the close button in the header',
//       },
//       source: {
//         type: 'dynamic',
//       },
//     },
//   },
//   render: () => (
//     <AudioPlayer.Provider tracks={trackData}>
//       <AudioPlaylistCompoundComponent.Provider tracks={trackData}>
//         <AudioPlayer.Root className="flex flex-col">
//           {/* Collapsible Playlist that appears above */}
//           <AudioPlaylistCompoundComponent.ExpandableContainer>
//             <AudioPlaylistCompoundComponent.Root>
//               <AudioPlaylistCompoundComponent.Header>
//                 <span>Playlist</span>
//                 <AudioPlaylistCompoundComponent.Dismiss />
//               </AudioPlaylistCompoundComponent.Header>
//               <AudioPlaylistCompoundComponent.Tracks className="max-h-[227px] overflow-y-auto" />
//             </AudioPlaylistCompoundComponent.Root>
//           </AudioPlaylistCompoundComponent.ExpandableContainer>
//           <div className="flex flex-grow justify-between gap-4">
//             {/* Main Player UI */}
//             <AudioPlayer.Info className="basis-1/3">
//               <AudioPlayer.Image />
//               <div className="py-2">
//                 <AudioPlayer.Title />
//                 <AudioPlayer.Author />
//                 <AudioPlayer.Time />
//               </div>
//             </AudioPlayer.Info>
//             <AudioPlayer.Controls>
//               <AudioPlayer.ControlAudio />
//               <AudioPlayer.ControlPrevious />
//               <AudioPlayer.ControlPlay />
//               <AudioPlayer.ControlNext />
//               <AudioPlayer.ControlShuffle />
//               <AudioPlayer.ControlLoop />
//             </AudioPlayer.Controls>
//             <div className="flex basis-1/3 items-center justify-end gap-2 px-2">
//               <AudioPlayer.Volume>
//                 <AudioPlayer.VolumeButton />
//                 <AudioPlayer.VolumeSlider />
//               </AudioPlayer.Volume>
//               <AudioPlaylistCompoundComponent.ControlToggle className="text-2xl" />
//             </div>
//           </div>
//           <AudioPlayer.ProgressBar />
//         </AudioPlayer.Root>
//       </AudioPlaylistCompoundComponent.Provider>
//     </AudioPlayer.Provider>
//   ),
// };
