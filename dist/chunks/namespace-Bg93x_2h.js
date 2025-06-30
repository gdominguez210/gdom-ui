'use strict';

const AudioPlaylistContextProvider = require('./AudioPlaylistContextProvider-rfWIRsS8.js');
const jsxRuntime = require('react/jsx-runtime');
const bundleMjs = require('./bundle-mjs-BqLi5MZM.js');
const clsx = require('./clsx-BtxeOLZW.js');
const AudioPlaylistTracks = require('./AudioPlaylistTracks-OV0Uxzqz.js');
const AudioPlaylistHeader = require('./AudioPlaylistHeader-DO8WWXDs.js');
const AudioPlaylistDismiss = require('./AudioPlaylistDismiss-CYQDZhBv.js');
const AudioPlaylistControlToggle = require('./AudioPlaylistControlToggle-C4cnR45e.js');
const AudioPlaylistExpandableContainer = require('./AudioPlaylistExpandableContainer-D4pM67V5.js');
const AudioPlaylistScrollableContainer = require('./AudioPlaylistScrollableContainer-BUCPYl0K.js');
const AudioPlaylistTrack = require('./AudioPlaylistTrack-CjUDNEEH.js');
const AudioPlaylistTrackContextProvider = require('./AudioPlaylistTrackContextProvider-DCxwkBVn.js');
require('react');
require('./useAudioPlaylistTrackContext-CIWKsUBJ.js');
const AudioPlaylistTrackImage = require('./AudioPlaylistTrackImage-CI_6mXXk.js');
const AudioPlaylistTrackTitle = require('./AudioPlaylistTrackTitle-CJxJ5Y2w.js');
const AudioPlaylistTrackAuthor = require('./AudioPlaylistTrackAuthor-ZC3znJUi.js');

function AudioPlaylist(props) {
  const { as: Element = "div", className, children, ...restProps } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    Element,
    {
      className: bundleMjs.twMerge(
        clsx.clsx("flex flex-col border-slate-600 bg-slate-800 text-neutral-100", className)
      ),
      ...restProps,
      children
    }
  );
}

const AudioPlaylistTrackCompoundComponent = {
  Provider: Object.assign(AudioPlaylistTrackContextProvider.AudioPlaylistTrackContextProvider, {
    displayName: "AudioPlaylistTrack.Provider"
  }),
  Root: Object.assign(AudioPlaylistTrack.AudioPlaylistTrack, {
    displayName: "AudioPlaylistTrack.Root"
  }),
  Image: Object.assign(AudioPlaylistTrackImage.AudioPlaylistTrackImage, {
    displayName: "AudioPlaylistTrack.Image"
  }),
  Title: Object.assign(AudioPlaylistTrackTitle.AudioPlaylistTrackTitle, {
    displayName: "AudioPlaylistTrack.Title"
  }),
  Author: Object.assign(AudioPlaylistTrackAuthor.AudioPlaylistTrackAuthor, {
    displayName: "AudioPlaylistTrack.Author"
  })
};

const AudioPlaylistCompoundComponent = {
  Root: Object.assign(AudioPlaylist, { displayName: "AudioPlaylist.Root" }),
  Provider: Object.assign(AudioPlaylistContextProvider.AudioPlaylistContextProvider, { displayName: "AudioPlaylist.Provider" }),
  Header: Object.assign(AudioPlaylistHeader.AudioPlaylistHeader, { displayName: "AudioPlaylist.Header" }),
  Dismiss: Object.assign(AudioPlaylistDismiss.AudioPlaylistDismiss, { displayName: "AudioPlaylist.Dismiss" }),
  Tracks: Object.assign(AudioPlaylistTracks.AudioPlaylistTracks, { displayName: "AudioPlaylist.Tracks" }),
  ControlToggle: Object.assign(AudioPlaylistControlToggle.AudioPlaylistControlToggle, {
    displayName: "AudioPlaylist.ControlToggle"
  }),
  Track: Object.assign(AudioPlaylistTrackCompoundComponent, { displayName: "AudioPlaylist.Track" }),
  ExpandableContainer: Object.assign(AudioPlaylistExpandableContainer.AudioPlaylistExpandableContainer, {
    displayName: "AudioPlaylist.ExpandableContainer"
  }),
  ScrollableContainer: Object.assign(AudioPlaylistScrollableContainer.AudioPlaylistScrollableContainer, {
    displayName: "AudioPlaylist.ScrollableContainer"
  })
};

exports.AudioPlaylist = AudioPlaylist;
exports.AudioPlaylistCompoundComponent = AudioPlaylistCompoundComponent;
