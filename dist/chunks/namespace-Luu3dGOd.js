'use strict';

const AudioPlaylistContextProvider = require('./AudioPlaylistContextProvider-rfWIRsS8.js');
const jsxRuntime = require('react/jsx-runtime');
const bundleMjs = require('./bundle-mjs-CqGQhiOy.js');
const clsx = require('./clsx-BtxeOLZW.js');
const AudioPlaylistTracks = require('./AudioPlaylistTracks-DJ5QYHN3.js');
const AudioPlaylistHeader = require('./AudioPlaylistHeader-I65xdYFC.js');
const AudioPlaylistDismiss = require('./AudioPlaylistDismiss-Cq0y7kG8.js');
const AudioPlaylistControlToggle = require('./AudioPlaylistControlToggle-1lWx1dFC.js');
const AudioPlaylistExpandableContainer = require('./AudioPlaylistExpandableContainer-CRLn_o3e.js');
const AudioPlaylistScrollableContainer = require('./AudioPlaylistScrollableContainer-GXUkcK3q.js');
const AudioPlaylistTrack = require('./AudioPlaylistTrack-D2j0aura.js');
const AudioPlaylistTrackContextProvider = require('./AudioPlaylistTrackContextProvider-DCxwkBVn.js');
require('react');
require('./useAudioPlaylistTrackContext-CIWKsUBJ.js');
const AudioPlaylistTrackImage = require('./AudioPlaylistTrackImage-BeeIeaVU.js');
const AudioPlaylistTrackTitle = require('./AudioPlaylistTrackTitle-BOsTDed1.js');
const AudioPlaylistTrackAuthor = require('./AudioPlaylistTrackAuthor-CBkEKwQ0.js');

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
