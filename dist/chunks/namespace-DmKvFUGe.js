import { A as AudioPlaylistContextProvider } from './AudioPlaylistContextProvider-y94Gt-Ca.js';
import { jsx } from 'react/jsx-runtime';
import { t as twMerge } from './bundle-mjs-BME7zF0Z.js';
import { c as clsx } from './clsx-ChV9xqsO.js';
import { A as AudioPlaylistTracks } from './AudioPlaylistTracks-Bz6N0DiB.js';
import { A as AudioPlaylistHeader } from './AudioPlaylistHeader-DJT3IT4O.js';
import { A as AudioPlaylistDismiss } from './AudioPlaylistDismiss-Cu21FSd7.js';
import { A as AudioPlaylistControlToggle } from './AudioPlaylistControlToggle-DRt0Xnc_.js';
import { A as AudioPlaylistExpandableContainer } from './AudioPlaylistExpandableContainer-Bo5L6-Zb.js';
import { A as AudioPlaylistScrollableContainer } from './AudioPlaylistScrollableContainer-B3iTuJJ9.js';
import { A as AudioPlaylistTrack } from './AudioPlaylistTrack-CeMuWMh_.js';
import { A as AudioPlaylistTrackContextProvider } from './AudioPlaylistTrackContextProvider-DOTuxkDR.js';
import 'react';
import './useAudioPlaylistTrackContext-DJcdpyEq.js';
import { A as AudioPlaylistTrackImage } from './AudioPlaylistTrackImage-B4bKOyOM.js';
import { A as AudioPlaylistTrackTitle } from './AudioPlaylistTrackTitle-BwuA6M93.js';
import { A as AudioPlaylistTrackAuthor } from './AudioPlaylistTrackAuthor-CCrXCJ2Y.js';

function AudioPlaylist(props) {
  const { as: Element = "div", className, children, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    Element,
    {
      className: twMerge(
        clsx("flex flex-col border-slate-600 bg-slate-800 text-neutral-100", className)
      ),
      ...restProps,
      children
    }
  );
}

const AudioPlaylistTrackCompoundComponent = {
  Provider: Object.assign(AudioPlaylistTrackContextProvider, {
    displayName: "AudioPlaylistTrack.Provider"
  }),
  Root: Object.assign(AudioPlaylistTrack, {
    displayName: "AudioPlaylistTrack.Root"
  }),
  Image: Object.assign(AudioPlaylistTrackImage, {
    displayName: "AudioPlaylistTrack.Image"
  }),
  Title: Object.assign(AudioPlaylistTrackTitle, {
    displayName: "AudioPlaylistTrack.Title"
  }),
  Author: Object.assign(AudioPlaylistTrackAuthor, {
    displayName: "AudioPlaylistTrack.Author"
  })
};

const AudioPlaylistCompoundComponent = {
  Root: Object.assign(AudioPlaylist, { displayName: "AudioPlaylist.Root" }),
  Provider: Object.assign(AudioPlaylistContextProvider, { displayName: "AudioPlaylist.Provider" }),
  Header: Object.assign(AudioPlaylistHeader, { displayName: "AudioPlaylist.Header" }),
  Dismiss: Object.assign(AudioPlaylistDismiss, { displayName: "AudioPlaylist.Dismiss" }),
  Tracks: Object.assign(AudioPlaylistTracks, { displayName: "AudioPlaylist.Tracks" }),
  ControlToggle: Object.assign(AudioPlaylistControlToggle, {
    displayName: "AudioPlaylist.ControlToggle"
  }),
  Track: Object.assign(AudioPlaylistTrackCompoundComponent, { displayName: "AudioPlaylist.Track" }),
  ExpandableContainer: Object.assign(AudioPlaylistExpandableContainer, {
    displayName: "AudioPlaylist.ExpandableContainer"
  }),
  ScrollableContainer: Object.assign(AudioPlaylistScrollableContainer, {
    displayName: "AudioPlaylist.ScrollableContainer"
  })
};

export { AudioPlaylist as A, AudioPlaylistCompoundComponent as a };
