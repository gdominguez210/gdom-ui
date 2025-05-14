# [1.37.0](https://github.com/gdominguez210/gdom-ui/compare/v1.36.0...v1.37.0) (2025-05-14)


### Bug Fixes

* **lib/useIntersectionObserver:** properly start observing node set in setRef if we lazy initialize the observerRef, ie. in SSR scenarios ([3724fbc](https://github.com/gdominguez210/gdom-ui/commit/3724fbc99f74ee0e98c435ca2e088d5f49378516))
* **lib/useResizeObserver:** properly start observing node set in setRef if we lazy initialize the observerRef, ie. in SSR scenarios ([f6f48cf](https://github.com/gdominguez210/gdom-ui/commit/f6f48cfa0533fa309b8b9022757ef814d103b295))


### Features

* **lib/assets/svgs:** add accessibility-line icon ([5cf577b](https://github.com/gdominguez210/gdom-ui/commit/5cf577be3d2d09b0e64d728133b2f386e8c75a35))
* **lib/assets/svgs:** add code-line icon ([3a083e8](https://github.com/gdominguez210/gdom-ui/commit/3a083e8a843a2304d5cb4711a07f86a1c9d4e60d))
* **lib/assets/svgs:** add color-filter-line icon ([9224310](https://github.com/gdominguez210/gdom-ui/commit/9224310195e42e54cc9d7dbd098c66b95d267e5b))
* **lib/assets/svgs:** add cursor-line icon ([451ddb3](https://github.com/gdominguez210/gdom-ui/commit/451ddb3f933361b2128a15c0ddeb2ed1083bb8ae))
* **lib/assets/svgs:** add equalizer-line icon ([70f322b](https://github.com/gdominguez210/gdom-ui/commit/70f322b80c7b10b99908ea5591ba836590b03485))
* **lib/assets/svgs:** add external-link-line ([c64cf48](https://github.com/gdominguez210/gdom-ui/commit/c64cf48219c0538ac773d68cc39150f2c1511000))
* **lib/assets/svgs:** add font-size icon ([c8482db](https://github.com/gdominguez210/gdom-ui/commit/c8482db32afc38a128142a023f4d72e629c77f93))
* **lib/assets/svgs:** add layout-masonry-line ([8b8a3d9](https://github.com/gdominguez210/gdom-ui/commit/8b8a3d977c757ac3e7069b9cbc3093f37db69f41))
* **lib/assets/svgs:** add palette-line icon ([401b447](https://github.com/gdominguez210/gdom-ui/commit/401b4472fd6b9a7a5d63eaf88e426f9925b558cc))
* **lib/assets/svgs:** add play-circle-line icon ([9feafbc](https://github.com/gdominguez210/gdom-ui/commit/9feafbca2bee2440f575ae30bd1300723805a36a))
* **lib/assets/svgs:** add pulse-line icon ([4224f40](https://github.com/gdominguez210/gdom-ui/commit/4224f40fc4cb9ea69a8cdcfd2081793484acaf06))
* **lib/assets/svgs:** add rhythm-line icon ([4c9bae9](https://github.com/gdominguez210/gdom-ui/commit/4c9bae9074f7bf5b1b455afd14ab49227fcfc8e6))
* **lib/assets/svgs:** add speed-up-line icon ([ebe2fae](https://github.com/gdominguez210/gdom-ui/commit/ebe2fae7112eaf03436e9af7597eaa06d34dbda7))
* **lib/assets/svgs:** add voiceprint-line icon ([3e0d515](https://github.com/gdominguez210/gdom-ui/commit/3e0d515f01a904c88b7706472f1a3da7ed8ba3f9))
* **lib/Button:** add polymorphic functionality, allowing Button to render as different elements, ie. Link components from other frameworks ([ccdf94f](https://github.com/gdominguez210/gdom-ui/commit/ccdf94f31a26c5d5444719ebd854dba90bddba26))
* **lib/Icon/data:** add external-link-line ([bac9692](https://github.com/gdominguez210/gdom-ui/commit/bac9692ca50dd373e6c23c45a53b4d7dc365fcab))
* **lib/Icon/data:** add LayoutMasonryLine ([a1dec9c](https://github.com/gdominguez210/gdom-ui/commit/a1dec9c306593ecbb3fa0dae36e026e7010ee442))
* **lib/Icon/data:** add new icons ([b89c428](https://github.com/gdominguez210/gdom-ui/commit/b89c428f9d920bf78a1288cc04ab5979840c87d7))
* **lib/IconAccessibilityLine:** add IconAccessibilityLine ([fd13d4a](https://github.com/gdominguez210/gdom-ui/commit/fd13d4ab1cecc48f4f4845702f4cfa6d5bf7784a))
* **lib/IconCloseFill:** add IconCloseFill ([575337a](https://github.com/gdominguez210/gdom-ui/commit/575337accaf92f906916c6c3f877a2f61d988d1a))
* **lib/IconCloseFill:** add IconDiscFill ([23eb9db](https://github.com/gdominguez210/gdom-ui/commit/23eb9db2d4052cf51d3ba3a76d176152fc6a9d14))
* **lib/IconCodeLine:** add IconCodeLine ([09310a3](https://github.com/gdominguez210/gdom-ui/commit/09310a3aebfe3e71db1b495a8d375ed3becf786a))
* **lib/IconColorFilterLine:** add IconColorFilterLine ([ab2a645](https://github.com/gdominguez210/gdom-ui/commit/ab2a6456e580ac7d62401026c1d930d33523242f))
* **lib/Icon:** create tree-shakeable base Icon component ([5791aa5](https://github.com/gdominguez210/gdom-ui/commit/5791aa567b0dbfd3365a181d674d20c7368a7944))
* **lib/IconCursorLine:** add IconCursorLine ([e36a8e5](https://github.com/gdominguez210/gdom-ui/commit/e36a8e5fc7dc176c334f8f5bb7b7a9fb4908733d))
* **lib/IconEqualizerLine:** add IconEqualizerLine ([8196a58](https://github.com/gdominguez210/gdom-ui/commit/8196a58bb77c43cbadc71d313dfaccba095f0e67))
* **lib/IconExternalLinkLine:** add IconExternalLinkLine ([a2d6aef](https://github.com/gdominguez210/gdom-ui/commit/a2d6aef754e39f635a932cb53642494ae738c389))
* **lib/IconFontSize:** add IconFontSize ([221fcdf](https://github.com/gdominguez210/gdom-ui/commit/221fcdf4e9957bfeebe6faf910991833c8bb00aa))
* **lib/IconForwardEndFill:** add IconForwardEndFill ([08acddd](https://github.com/gdominguez210/gdom-ui/commit/08acddd7bbad43e0df43defbe1ba3308915e1843))
* **lib/IconLayoutMasonryLine:** add IconLayoutMasonryLine ([436d765](https://github.com/gdominguez210/gdom-ui/commit/436d765ccaa0478dedf02f90bf5cda1cfee2f0c8))
* **lib/IconLibrary:** add IconLibrary ([7929a98](https://github.com/gdominguez210/gdom-ui/commit/7929a98b7523e5e61bf10c9848e0b6ad55c962ab))
* **lib/IconPaletteLine:** add IconPaletteLine ([93e51d1](https://github.com/gdominguez210/gdom-ui/commit/93e51d10a93148bf9833d785b83cfe00aed3295e))
* **lib/IconPauseLargeFill:** add IconPauseLargeFill ([58156c0](https://github.com/gdominguez210/gdom-ui/commit/58156c0dfd0e915493db73d93097a6ac71712583))
* **lib/IconPlayCircleLine:** add IconPlayCircleLine ([435d5c9](https://github.com/gdominguez210/gdom-ui/commit/435d5c963ea3ab37e80a7256890170ac1bfecd30))
* **lib/IconPlayLargeFill:** add IconPlayLargeFill ([6ac0ffd](https://github.com/gdominguez210/gdom-ui/commit/6ac0ffdfb8dcae299670c10221b1ab4f1e5275ce))
* **lib/IconPlayList2Fill:** add IconPlayList2Fill ([333d018](https://github.com/gdominguez210/gdom-ui/commit/333d018fff51c88826726148ecfa65a355b95f37))
* **lib/IconPlaylist:** add IconPlaylist ([7959930](https://github.com/gdominguez210/gdom-ui/commit/795993001c414e6aef1cd4df36d47930f4b35e59))
* **lib/IconPlayListAddFill:** add IconPlayListAddFill ([a7f6a1c](https://github.com/gdominguez210/gdom-ui/commit/a7f6a1c42de86cb25e4af689fbf793bc1a9249e8))
* **lib/IconPlaylistClose:** add IconPlaylistClose ([f524d50](https://github.com/gdominguez210/gdom-ui/commit/f524d501c5a4edebb56b45d8b21530e19d9b6ad7))
* **lib/IconPulseLine:** add IconPulseLine ([cafb843](https://github.com/gdominguez210/gdom-ui/commit/cafb84320c83a5ad258f7e942eb1f9fdd7262dee))
* **lib/IconRepeat2Fill:** add IconRepeat2Fill ([4bb148a](https://github.com/gdominguez210/gdom-ui/commit/4bb148a76cecce2699ee1ff8518ff58c6d831df4))
* **lib/IconRepeatFill:** add IconRepeatFill ([f3b67ef](https://github.com/gdominguez210/gdom-ui/commit/f3b67ef0177d308f54e6641a74cb9a363d65d5ee))
* **lib/IconRepeatOneFill:** add IconRepeatOneFill ([7092b29](https://github.com/gdominguez210/gdom-ui/commit/7092b291bd9f66fd1ae3adad9ee9f7cf956b0f5f))
* **lib/IconRewindFill:** add IconRewindFill ([fac1687](https://github.com/gdominguez210/gdom-ui/commit/fac1687475bdea0ff01f2a4f9f9549fc76ddfe76))
* **lib/IconRewindStartFill:** add IconRewindStartFill ([fd65d93](https://github.com/gdominguez210/gdom-ui/commit/fd65d93b0090b7d16d4743604cc28ea7fd35ece6))
* **lib/IconRhythmLine:** add IconRhythmLine ([a1ba1db](https://github.com/gdominguez210/gdom-ui/commit/a1ba1db7df6fc8fcb3ad4b6a4e54a98179a30dc0))
* **lib/IconShuffleFill:** add IconShuffleFill ([28afbb8](https://github.com/gdominguez210/gdom-ui/commit/28afbb8babfa63085c46538b5aa50361faf43cbc))
* **lib/IconSpeedFill:** add IconSpeedFill ([1208f09](https://github.com/gdominguez210/gdom-ui/commit/1208f099870ce021f5c63e3dd10f6d2cb7cc8728))
* **lib/IconSpeedUpLine:** add IconSpeedUpLine ([ccb3cec](https://github.com/gdominguez210/gdom-ui/commit/ccb3cec2b8c10404df4df07b152dacd1f1caff0e))
* **lib/IconStarLine:** add IconStarLine ([e0f3c61](https://github.com/gdominguez210/gdom-ui/commit/e0f3c616c0a757308b20a8b9a1ebedd6f0fcdfab))
* **lib/IconStopLargeFill:** add IconStopLargeFill ([8c96823](https://github.com/gdominguez210/gdom-ui/commit/8c968233fb7601a55a7e845a566b60ab0d7d1d96))
* **lib/IconVoiceprintLine:** add IconVoiceprintLine ([8d75924](https://github.com/gdominguez210/gdom-ui/commit/8d75924bf27627a0e22fcc64c1f2f235f4239f7d))
* **lib/IconVolumeDownFill:** add IconVolumeDownFill ([02597fd](https://github.com/gdominguez210/gdom-ui/commit/02597fd1fe24f26c31966bfa5fc89ce52eca5ca7))
* **lib/IconVolumeMuteFill:** add IconVolumeMuteFill ([f8e99bd](https://github.com/gdominguez210/gdom-ui/commit/f8e99bdb678346233c9db44ed4ebff62806df914))
* **lib/IconVolumeUpFill:** add IconVolumeUpFill ([cc0dc8c](https://github.com/gdominguez210/gdom-ui/commit/cc0dc8cae6967f773a143db7e3b42751dfd0c8ce))

# [1.36.0](https://github.com/gdominguez210/gdom-ui/compare/v1.35.1...v1.36.0) (2025-05-08)


### Features

* **lib/AudioProgressWaveform/useAudioProgressWaveformColor:** interpolate barColor into each gradient colorStop if color mode is gradient ([7bbd35c](https://github.com/gdominguez210/gdom-ui/commit/7bbd35cde7f62bd2c51bdf220b94aef534fb3ff3))

## [1.35.1](https://github.com/gdominguez210/gdom-ui/compare/v1.35.0...v1.35.1) (2025-05-06)


### Bug Fixes

* **lib/AudioProgressWaveform/drawingUtils:** normalize return value of calculateBarCoverage ([33be681](https://github.com/gdominguez210/gdom-ui/commit/33be681a5bee30b7f8075965abddaa9887a0a507))

# [1.35.0](https://github.com/gdominguez210/gdom-ui/compare/v1.34.0...v1.35.0) (2025-05-06)


### Features

* **lib/AudioPlayerProgressBar:** add hover seek functionality ([ce39703](https://github.com/gdominguez210/gdom-ui/commit/ce3970354f96cb18f879f85ccae1a9e382e96681))
* **lib/AudioProgressWaveform:** add keyboard seeking functionality ([8f6c34f](https://github.com/gdominguez210/gdom-ui/commit/8f6c34fe55d014a67b27248be4721aacf65bdb32))
* **lib/useDelayedMouseMove:** add useDelayedMouseMove ([18e4164](https://github.com/gdominguez210/gdom-ui/commit/18e416406d7420ebfbfa70a19cd57f18dcfde1d8))
* **lib/useKeyboardSeek:** add useKeyboardSeek hook ([f8dda4f](https://github.com/gdominguez210/gdom-ui/commit/f8dda4f3723e59204de65e1e21bf508a5d5432e6))
* **lib/utils/formatDurationForDisplay:** add formatDurationForDisplay ([f61ce2e](https://github.com/gdominguez210/gdom-ui/commit/f61ce2e6c8479b768fa23b9753e75b17b08bc584))

# [1.34.0](https://github.com/gdominguez210/gdom-ui/compare/v1.33.4...v1.34.0) (2025-05-03)


### Bug Fixes

* **lib/useMousePositionRef:** accept event argument in handleMouseLeave ([5226e6b](https://github.com/gdominguez210/gdom-ui/commit/5226e6be7e2f304f9c1fc9b6bb73c588dd7c09a1))


### Features

* **lib/AudioPlayerContextTime:** add support for previewTime ([2949a3e](https://github.com/gdominguez210/gdom-ui/commit/2949a3ec1a314e2da59f5dc384d2dbf65f9e092f))
* **lib/AudioPlayerTime:** render previewTime with precendent if it exists ([5f015fc](https://github.com/gdominguez210/gdom-ui/commit/5f015fc69566be5e85a7d542530ecc2284ae69a6))
* **lib/AudioProgressWaveform:** add support for hovered preview time while seeking ([f7d898a](https://github.com/gdominguez210/gdom-ui/commit/f7d898a38e2d17d3de0921597fd68ced5d490ac8))

## [1.33.4](https://github.com/gdominguez210/gdom-ui/compare/v1.33.3...v1.33.4) (2025-05-01)


### Bug Fixes

* **lib/AudioProgressWaveform:** pass minBarGapPercent to useAudioWaveform ([de43c31](https://github.com/gdominguez210/gdom-ui/commit/de43c31709cf29185dd382a234ea82ac77cf5a0b))
* **lib/useElementDimensions:** add support for when window resizes, and changes the left/right values of the element observed ([07fdb5b](https://github.com/gdominguez210/gdom-ui/commit/07fdb5bc6b60ae566ad4abd2ed0dc68fff0c4fc5))
* **lib/useIntersectionObserver:** initialize IntersectionObserver immediately ([4f57263](https://github.com/gdominguez210/gdom-ui/commit/4f57263a890a9b0c433c48c91c752adcf159a4a4))

## [1.33.3](https://github.com/gdominguez210/gdom-ui/compare/v1.33.2...v1.33.3) (2025-04-30)


### Bug Fixes

* **lib/useResizeObserver:** initialize observerRef in initial useRef call ([19d5de1](https://github.com/gdominguez210/gdom-ui/commit/19d5de16b0de34a047aa26f622896ce3fe8cccb5))

## [1.33.2](https://github.com/gdominguez210/gdom-ui/compare/v1.33.1...v1.33.2) (2025-04-30)


### Bug Fixes

* **lib/useComposedRefs:** fix dependency array ([f3aafb5](https://github.com/gdominguez210/gdom-ui/commit/f3aafb55719953b9bdd7ca7e9272b09566acbfdc))

## [1.33.1](https://github.com/gdominguez210/gdom-ui/compare/v1.33.0...v1.33.1) (2025-04-30)


### Bug Fixes

* **lib/AudioWaveform:** allow 0 gap-width waveforms ([8ac9687](https://github.com/gdominguez210/gdom-ui/commit/8ac968769e860288e0f75b73cce8b9cc3c57fdb7))

# [1.33.0](https://github.com/gdominguez210/gdom-ui/compare/v1.32.0...v1.33.0) (2025-04-29)


### Features

* **lib/AudioPlayer:** add ProgressWaveform subcomponent ([6c3d1b3](https://github.com/gdominguez210/gdom-ui/commit/6c3d1b373ca584f284f013c1cbceee5667444b57))
* **lib/AudioPlayerProgressWaveform:** add AudioPlayerProgressWaveform component ([9d80840](https://github.com/gdominguez210/gdom-ui/commit/9d80840a01469d18eeb7db4bb8fe9482cd90b72d))
* **lib/AudioProgressWaveform/useAudioProgressWaveform:** add hook for managing progress updating ([cdf8a66](https://github.com/gdominguez210/gdom-ui/commit/cdf8a66ee5cce07ceba5d5913ae050ee4d50d3dd))
* **lib/AudioProgressWaveform/useAudioProgressWaveformColor:** add hook for creating custom barColors based on progress for AudioWaveform ([a050b76](https://github.com/gdominguez210/gdom-ui/commit/a050b76049f384708ed448c0335924922cf712a4))
* **lib/AudioProgressWaveform:** add AudioProgressWaveform component ([bfedaeb](https://github.com/gdominguez210/gdom-ui/commit/bfedaebfe6ae4e6b6fd17e82f86e9907953be3e3))
* **lib/AudioWaveform/useAudioWaveform:** add support for gradient colors ([21fd8a4](https://github.com/gdominguez210/gdom-ui/commit/21fd8a4e5b82600639219e658109c76c18430318))
* **lib/useElementDimensions:** add useElementDimensions ([86f739f](https://github.com/gdominguez210/gdom-ui/commit/86f739f7cf0bf0f3a6563fe57cef71bf6b7485cf))
* **lib/useIntersectionObserver:** add useIntersectionObserver hook ([fa8a5e5](https://github.com/gdominguez210/gdom-ui/commit/fa8a5e5e3d0ea9bec323b2da0240aa2fb6347197))
* **lib/useLatest:** add useLatest hook ([d601db0](https://github.com/gdominguez210/gdom-ui/commit/d601db078e8a57ba8b04c48cb7f654f6d1258318))
* **lib/useMousePositionRef:** add useMousePositionRef hook ([da38ef5](https://github.com/gdominguez210/gdom-ui/commit/da38ef58939d803e02f70209b7d7c8af5e866d48))
* **lib/useMousePositionState:** add useMousePositionState ([9442d97](https://github.com/gdominguez210/gdom-ui/commit/9442d97411b16e8f77fec6d2f7b085620debaa9e))
* **lib/useResizeObserver:** add useResizeObserver hook ([2202c8c](https://github.com/gdominguez210/gdom-ui/commit/2202c8cfeeb665c4dfb236f510d91867ce530eb7))
* **lib/utils/interpolateOKLCH:** add interpolateOKLCH util ([2868564](https://github.com/gdominguez210/gdom-ui/commit/2868564058d227072213348cbd1042b826c80d61))

# [1.32.0](https://github.com/gdominguez210/gdom-ui/compare/v1.31.1...v1.32.0) (2025-04-25)


### Features

* **lib/AudioPlayer/data:** add hardcoded waveform data for tracks ([a713c4e](https://github.com/gdominguez210/gdom-ui/commit/a713c4e063e87ab1935da63caa22dc8005128af1))
* **lib/AudioWaveform/useAudioWaveform:** add useAudioWaveform ([686155b](https://github.com/gdominguez210/gdom-ui/commit/686155b73a019234992a17da0c5b70b628ccec77))
* **lib/AudioWaveform:** add AudioWaveform component ([28a913b](https://github.com/gdominguez210/gdom-ui/commit/28a913b37edfbf392e592f3027ce0c9a3c25cef9))
* **lib/utils/getWaveformData:** add getWaveformData function ([cacf872](https://github.com/gdominguez210/gdom-ui/commit/cacf87252fc02e31dc2a2754d5ba952ee3bd98aa))
* **lib/utils/processAudioBuffer:** add processAudioBuffer function ([3adce81](https://github.com/gdominguez210/gdom-ui/commit/3adce81433ee90cc61ef4cdd794763a974488af5))
* **lib/utils/processAudioFile:** add processAudioFile function ([bb4986c](https://github.com/gdominguez210/gdom-ui/commit/bb4986c9f2202f1491c54d8865d8e60aba447165))

## [1.31.1](https://github.com/gdominguez210/gdom-ui/compare/v1.31.0...v1.31.1) (2025-04-21)


### Bug Fixes

* **lib/utils/getReactiveColor:** round to the thousands decimal place ([5593575](https://github.com/gdominguez210/gdom-ui/commit/559357525fca7d32aadbd8acab8db8d81510775a))

# [1.31.0](https://github.com/gdominguez210/gdom-ui/compare/v1.30.0...v1.31.0) (2025-04-20)


### Bug Fixes

* **lib/AudioVisualizerFrequencyBars/useAudioVisualizerFrequencyBars:** clear canvas if currentTrack changes while paused ([ba48007](https://github.com/gdominguez210/gdom-ui/commit/ba48007edf885fd5a4b134fb9efc1e97ebf14986))


### Features

* **lib/AudioVisualizerWaveform:** add support for color transitions ([aac046d](https://github.com/gdominguez210/gdom-ui/commit/aac046d512bd94c4b0ed83b2f41ce2550746fa5e))

# [1.30.0](https://github.com/gdominguez210/gdom-ui/compare/v1.29.0...v1.30.0) (2025-04-19)


### Features

* **lib/AudioVisualizerFrequencyBars:** add support for smooth transitions between colors when barColor changes ([757d596](https://github.com/gdominguez210/gdom-ui/commit/757d5969eaca62eaa4efc2cbf1a8b9ac86474532))
* **lib/useColorTransition:** add useColorTransition hook ([03ade15](https://github.com/gdominguez210/gdom-ui/commit/03ade15dca4883efde8ba9bda64d8e9c8aa17092))

# [1.29.0](https://github.com/gdominguez210/gdom-ui/compare/v1.28.0...v1.29.0) (2025-04-18)


### Bug Fixes

* **lib/AudioVisualizerFrequencyBars:** omit onResize from ComponentPropsWithRef<‘canvas’> ([b088f26](https://github.com/gdominguez210/gdom-ui/commit/b088f263f232a1063f508bf7be2d98126ee59170))
* **lib/AudioVisualizerVisualizerWaveform:** omit onResize from ComponentPropsWithRef<‘canvas’> ([c8bcf3e](https://github.com/gdominguez210/gdom-ui/commit/c8bcf3e98bad0c5a4905e52482a509b0ce79fbc0))


### Features

* **lib/CanvasResponsive/useCanvasResponsive:** add support for static drawings ([82492fc](https://github.com/gdominguez210/gdom-ui/commit/82492fce8279e5168edc694232ba2b6fd2096c5f))

# [1.28.0](https://github.com/gdominguez210/gdom-ui/compare/v1.27.0...v1.28.0) (2025-04-17)


### Bug Fixes

* **lib/AudioVisualizerFrequency:** pass frameFrate to AudioVisualizerCanvas ([8559131](https://github.com/gdominguez210/gdom-ui/commit/85591314a58015bbf80023cc19617a0b158ffa9e))


### Features

* **lib/AudioVisualizerCanvas:** add AudioVisualizerCanvas, styled wrapper around CanvasResponsive ([7ead672](https://github.com/gdominguez210/gdom-ui/commit/7ead672ff48fb44ed8dedae26a223b746f8b1844))
* **lib/AudioVisualizerWaveform/drawingUtils:** add drawingUtils ([5aa700e](https://github.com/gdominguez210/gdom-ui/commit/5aa700eeca83eb9fbcf71250d4e9c074c5b38ea5))
* **lib/AudioVisualizerWaveform/useAudioVisualizerWaveform:** add support for dynamic colors ([14c3574](https://github.com/gdominguez210/gdom-ui/commit/14c35745817a16ef37ac8bc82f161aef334745cb))
* **lib/AudioVisualizerWaveform/waveformUtils:** add waveformUtils ([b723c64](https://github.com/gdominguez210/gdom-ui/commit/b723c646414bb5725d1a5ac56ad9e92d32230c05))
* **lib/utils/getColorByAudioIntensity:** add getColorByAudioIntensity ([2546f96](https://github.com/gdominguez210/gdom-ui/commit/2546f96f775b5f628be258374dcb9457ddfcde71))
* **lib/utils/getColorByDynamicIntensity:** add getColorByDynamicIntensity ([a0f0565](https://github.com/gdominguez210/gdom-ui/commit/a0f0565dfc5f0173c4670a847e25643decc47b08))
* **lib/utils/getColorByFrequencyPosition:** add getColorByFrequencyPosition ([7c7e7ce](https://github.com/gdominguez210/gdom-ui/commit/7c7e7ce8a226b6c6e54d6427384b0d96e80310a1))
* **lib/utils/getColorBySpectrum:** add getColorBySpectrum ([1b81f54](https://github.com/gdominguez210/gdom-ui/commit/1b81f54ed1e5cf05a8c2cfbfa6657c6fa008d7d6))

# [1.27.0](https://github.com/gdominguez210/gdom-ui/compare/v1.26.0...v1.27.0) (2025-04-15)


### Features

* **lib/AudioVisualizerFrequencyBars:** add support for dynamic colors based on different audio settings ([92b7038](https://github.com/gdominguez210/gdom-ui/commit/92b70385b5cfe33adba7eec4639b041f772a3e72))
* **lib/utils/convertColorToOKLCH:** add convertColorToOKLCH ([2a67b88](https://github.com/gdominguez210/gdom-ui/commit/2a67b8807fb7f540450f6aae000f7351ffe8ead0))
* **lib/utils/getReactiveColor:** add getReactiveColor utility ([a387014](https://github.com/gdominguez210/gdom-ui/commit/a3870149db25c05216c63fc7f71f44c03db7d3c7))
* **lib/utils/OKLCHToCSS:** add OKLCHToRGB utility ([bdb0da9](https://github.com/gdominguez210/gdom-ui/commit/bdb0da9e389c44e3d828e0b5dfcb852aa441633e))
* **lib/utils/OKLCHToRGB:** add OKLCHToRGB utility ([d194100](https://github.com/gdominguez210/gdom-ui/commit/d194100fc3032e32d124aca5317189ddbac78ef9))

# [1.26.0](https://github.com/gdominguez210/gdom-ui/compare/v1.25.0...v1.26.0) (2025-04-15)


### Features

* **lib/CanvasResponsive/useCanvasResponsive:** add useCanvasResponsive hook ([71acbc0](https://github.com/gdominguez210/gdom-ui/commit/71acbc04c1b0aa5dd274ed2ff9fd36170d03a84d))
* **lib/CanvasResponsive:** add CanvasResponsive component ([3cdc5fb](https://github.com/gdominguez210/gdom-ui/commit/3cdc5fb77244054d76f0b253f3ec62523a672d50))
* **lib/utils/rafToggle:** add requestAnimationFrame throttle function ([71e1d8a](https://github.com/gdominguez210/gdom-ui/commit/71e1d8ad35de8a976222af1a2df5f2a9c3a97cb2))

# [1.25.0](https://github.com/gdominguez210/gdom-ui/compare/v1.24.0...v1.25.0) (2025-04-11)


### Features

* **lib/AudioContextProvider:** add AudioContextProvider ([d3dd8de](https://github.com/gdominguez210/gdom-ui/commit/d3dd8de2f64f6767c29dcae15da8a36cc9f3841a))
* **lib/AudioPlayer:** add visualizer subcomponents ([85122cd](https://github.com/gdominguez210/gdom-ui/commit/85122cd840cdc41825213825628448034958b0da))
* **lib/AudioPlayerContextAudioProvider:** add wrapped AudioContextProvider that hooks into AudioPlayerContextPlayback ([5d4f3b2](https://github.com/gdominguez210/gdom-ui/commit/5d4f3b2f866e382c253919ecd82912dca7b8ae6b))
* **lib/AudioPlayerFrequencyBars:** add AudioPlayerFrequencyBars that hooks into various context slices ([c7d2f8c](https://github.com/gdominguez210/gdom-ui/commit/c7d2f8ce74e4ea59d6eabc5dbe5c8fe623c0c155))
* **lib/AudioPlayerVisualizerWaveform:** add AudioPlayerVisualizerWaveform that hooks into various context slices ([27a2b9f](https://github.com/gdominguez210/gdom-ui/commit/27a2b9fa5454ff4ac4e7d2a0bcfec7c9dc111893))
* **lib/AudioVisualizerFrequencyBars/useAudioVisualizerFrequencyBars:** add useAudioVisualizerFrequencyBars ([c60e2df](https://github.com/gdominguez210/gdom-ui/commit/c60e2dfd9cfab1ecdf806f052f6078df57b2f2ad))
* **lib/AudioVisualizerFrequencyBars:** add AudioVisualizerFrequencyBars ([a95de52](https://github.com/gdominguez210/gdom-ui/commit/a95de5224c661543e3a95abd929b9f630ed9b3c3))
* **lib/AudioVisualizerWaveform/useAudioVisualizerWaveform:** add useAudioVisualizerWaveform ([a9ba321](https://github.com/gdominguez210/gdom-ui/commit/a9ba321d0bed1f4c389573f43b6eda714e857825))
* **lib/AudioVisualizerWaveform:** add AudioVisualizerWaveform ([4f8c1c3](https://github.com/gdominguez210/gdom-ui/commit/4f8c1c33d53b02af089abc1cfb1177b1f8a231fd))
* **lib/useAnalyzerNode:** add useAnalyzerNode hook ([8652179](https://github.com/gdominguez210/gdom-ui/commit/8652179fbdd4960cdfb1767f0147228f86a9f93e))
* **lib/useAnimationFrame:** add useAnimationFrame hook ([ca9395d](https://github.com/gdominguez210/gdom-ui/commit/ca9395dbe3461d3edd5e6d553c5878ab7f868b8b))
* **lib/useAudioAnalyzer:** add useAudioAnalyzer ([f1c8bac](https://github.com/gdominguez210/gdom-ui/commit/f1c8bac99fec7b8a52d9db3b12c86a53daa65c3d))
* **lib/useAudioConnection:** add useAudioConnection ([e335195](https://github.com/gdominguez210/gdom-ui/commit/e335195944106684a3c5ffb182a76610c04d1c21))
* **lib/useAudioContextWebAPI:** add useAudioContextWebAPI hook ([2bde3d0](https://github.com/gdominguez210/gdom-ui/commit/2bde3d0ea1bbd065a900b360f33a599d53759464))
* **lib/useRefReady:** add useRefReady hook ([0a449af](https://github.com/gdominguez210/gdom-ui/commit/0a449af6838fa3de04fdd684edeeaf0eab8a19b2))

# [1.24.0](https://github.com/gdominguez210/gdom-ui/compare/v1.23.0...v1.24.0) (2025-04-03)


### Bug Fixes

* **lib/AudioPlaylistExpandableContainer/useAudioPlaylistExpandableContainer:** remove onOutsideClick ([c87ef3d](https://github.com/gdominguez210/gdom-ui/commit/c87ef3d83ec9db296a9c191482c43330b51c790e))


### Features

* **lib/AudioPlaylistTrack:** add AudioPlaylistTrack compound component ([7725fff](https://github.com/gdominguez210/gdom-ui/commit/7725fff67431fb67e48e05a9f105988481e06903))
* **lib/AudioPlaylistTrackContextProvider:** add AudioPlaylistTrackContextProvider ([4a5d036](https://github.com/gdominguez210/gdom-ui/commit/4a5d0363623772b30083b78aedc16ebb40e8cdbd))
* **lib/AudioPlaylistTrackContextProvider:** add AudioPlaylistTrackContextProvider ([460a870](https://github.com/gdominguez210/gdom-ui/commit/460a870118acb57abaadc10dbe9985c6af4661ad))

# [1.23.0](https://github.com/gdominguez210/gdom-ui/compare/v1.22.0...v1.23.0) (2025-04-01)


### Features

* **lib/AudioPlaylistScrollableContainer:** add AudioPlaylistScrollableContainer ([86e2d48](https://github.com/gdominguez210/gdom-ui/commit/86e2d4869343e3490916a393a78d40919f347406))

# [1.22.0](https://github.com/gdominguez210/gdom-ui/compare/v1.21.0...v1.22.0) (2025-04-01)


### Features

* **tailwind-scrollbar:** add tailwind-scrollbar ([a5c1805](https://github.com/gdominguez210/gdom-ui/commit/a5c1805e9d99ce42f3a61ae7e3accc6130a92618))
* upgrade to Tailwind 4 ([34cd366](https://github.com/gdominguez210/gdom-ui/commit/34cd366ac693a14198fe3dbfe73ce02a56f91b05))

# [1.21.0](https://github.com/gdominguez210/gdom-ui/compare/v1.20.0...v1.21.0) (2025-04-01)


### Bug Fixes

* **lib/AudioPlaylistTrack:** add handleKeydown function to handle select behavior for keyboard interactions ([32f6a03](https://github.com/gdominguez210/gdom-ui/commit/32f6a03cfd07e019e6f997f0fceaef02882ba111))


### Features

* **lib/AudioPlaylistContextProvider:** add id to AudioPlaylistContext ([0eb3f4d](https://github.com/gdominguez210/gdom-ui/commit/0eb3f4d1dfd337cbefaca1c444a4a2805409a934))
* **lib/useFocusTrap:** handle click behavior ([d040ef6](https://github.com/gdominguez210/gdom-ui/commit/d040ef60bb0afd265143a8e1c1dfa8670f951686))

# [1.20.0](https://github.com/gdominguez210/gdom-ui/compare/v1.19.1...v1.20.0) (2025-03-31)


### Bug Fixes

* **lib/AudioPlaylistTrack:** pass active prop to primitive ([aabf63e](https://github.com/gdominguez210/gdom-ui/commit/aabf63e458b39c25a53b288adb5eb2bc2229d351))
* **lib/index:** expose AudioPlaylist components in entryfile ([5e091e5](https://github.com/gdominguez210/gdom-ui/commit/5e091e52d834a4b3424f53be94fd0168191ef6d6))


### Features

* **lib/AudioPlaylistContextProvider:** add expandableContainerRef to context ([212e513](https://github.com/gdominguez210/gdom-ui/commit/212e513410b2c4a1c382a13d2a7d6f712f44dcc6))
* **lib/AudioPlaylistExpandableContainer/useAudioPlaylistExpandableContainer:** add useAudioPlaylistExpandableContainer ([b1ca377](https://github.com/gdominguez210/gdom-ui/commit/b1ca377d7c96cfe7024ce597fadfe9801171346e))
* **lib/useFocusElement:** add useFocusElement hook ([e5982fe](https://github.com/gdominguez210/gdom-ui/commit/e5982fef3d5d500ee1d5ec637159ac254844a1ef))
* **lib/useFocusFirstElement:** add useFocusFirstElement hook ([dd06c07](https://github.com/gdominguez210/gdom-ui/commit/dd06c079d62a6b41eb8c36ee4ea14dcf4b88a0c2))
* **lib/useFocusTrap:** add useFocusTrap hook ([42b8162](https://github.com/gdominguez210/gdom-ui/commit/42b81628c335b8da9251c77d73fbeefba0e8f8af))

## [1.19.1](https://github.com/gdominguez210/gdom-ui/compare/v1.19.0...v1.19.1) (2025-03-30)


### Bug Fixes

* **lib/AudioPlayerProgressBar/useAudioPlayerProgressBar:** add utility functions to update audio and progressBar refs ([c5cc127](https://github.com/gdominguez210/gdom-ui/commit/c5cc127ddcd805774b8f2011e263e68c7fad5b64))

# [1.19.0](https://github.com/gdominguez210/gdom-ui/compare/v1.18.0...v1.19.0) (2025-03-28)


### Bug Fixes

* **lib/AudioPlayerContextAudioProvider:** change defaultVolume to 50 ([2092f6e](https://github.com/gdominguez210/gdom-ui/commit/2092f6effb82038409360badab4b8226cbeb0710))
* **lib/AudioPlayerVolumeSlider:** add updateVolumeAudio function to not directly mutate audioRef value and comply with React compiler rules ([ec6dac2](https://github.com/gdominguez210/gdom-ui/commit/ec6dac284fe2beec3de8fa68977a1bf56ab48756))


### Features

* **lib/AudioPlaylist:** add AudioPlaylist component ([c1648fa](https://github.com/gdominguez210/gdom-ui/commit/c1648faeeb774ebef620bdf134dc36543bc8834e))
* **lib/AudioPlaylist:** add AudioPlaylist component ([3ae72fd](https://github.com/gdominguez210/gdom-ui/commit/3ae72fd1d6c6b16ee10b11f86b5618a2391dd2c3))
* **lib/AudioPlaylistContextProvider:** add AudioPlaylistContextProvider ([fe0dc16](https://github.com/gdominguez210/gdom-ui/commit/fe0dc163184ad6cae9a76027118264b8e5c5d54b))
* **lib/AudioPlaylistControlToggle:** add AudioPlaylistControlToggle ([2f05711](https://github.com/gdominguez210/gdom-ui/commit/2f0571141e8e3e18591a30e23cbbf7c84e6ab220))
* **lib/AudioPlaylistDimiss:** add AudioPlaylistDismiss component ([dcac6fe](https://github.com/gdominguez210/gdom-ui/commit/dcac6fec265123f3ddd60fd1ecc52e19b4205103))
* **lib/AudioPlaylistExpandableContainer:** add AudioPlaylistExpandableContainer component ([aa246b7](https://github.com/gdominguez210/gdom-ui/commit/aa246b748bfe8429f17bfc844a2e26df20aac87a))
* **lib/AudioPlaylistHeader:** add AudioPlaylistHeader component ([de83eb6](https://github.com/gdominguez210/gdom-ui/commit/de83eb6ec4e7f02b1b202953f4f506b7d2f29758))
* **lib/AudioPlaylistTrack:** add AudioPlaylistTrack component ([8c87f1a](https://github.com/gdominguez210/gdom-ui/commit/8c87f1a1f1833b2b1ffbff4b5306b311d4d6b910))
* **lib/AudioPlaylistTrackAuthor:** add AudioPlaylistTrackAuthor component ([22e33a2](https://github.com/gdominguez210/gdom-ui/commit/22e33a2d386ef7f155e8e2b79f825a6a8873de59))
* **lib/AudioPlaylistTrackImage:** add AudioPlaylistTrackImage component ([4e603d3](https://github.com/gdominguez210/gdom-ui/commit/4e603d38548375870c8e5063997980c7bfd19641))
* **lib/AudioPlaylistTracks:** add AudioPlaylistTracks component ([2b7e141](https://github.com/gdominguez210/gdom-ui/commit/2b7e1415d5f8e0ac646e28e2accdb666969a93c8))
* **lib/AudioPlaylistTrackTitle:** add AudioPlaylistTrackTitle component ([80df51d](https://github.com/gdominguez210/gdom-ui/commit/80df51d6ce0e2ae6690f1751436950a9127dc221))
* **lib/Icon/data:** add close-fill icon ([fdb04b1](https://github.com/gdominguez210/gdom-ui/commit/fdb04b19f5754e5cdaf18f634842b22048703979))

# [1.18.0](https://github.com/gdominguez210/gdom-ui/compare/v1.17.0...v1.18.0) (2025-03-25)


### Features

* **lib/AudioPlayerAudio:** support ref from props ([72cb02d](https://github.com/gdominguez210/gdom-ui/commit/72cb02dc4071e8632b6ea0fb88ed3a825e792785))
* **lib/AudioPlayerProgressBar:** support ref from props ([91bf46a](https://github.com/gdominguez210/gdom-ui/commit/91bf46abdc2fda9260c34534233e9abea2b77bd5))
* **lib/useComposedRef:** add useComposedRef hook to merge local and prop refs ([133e80e](https://github.com/gdominguez210/gdom-ui/commit/133e80e3ab2bc8d6f2d78e10762d7e5ac694cc19))

# [1.17.0](https://github.com/gdominguez210/gdom-ui/compare/v1.16.0...v1.17.0) (2025-03-24)


### Features

* **lib/AudioPlayerControlButton:** add active prop support ([e6efac0](https://github.com/gdominguez210/gdom-ui/commit/e6efac052108c8fda46bf2c06e7f0a2c2f37f714))
* **lib/Icon:** add new Playlist icons ([9b8c5a4](https://github.com/gdominguez210/gdom-ui/commit/9b8c5a4c12e78fcb5634b42c791ac0a79ceb82d6))

# [1.16.0](https://github.com/gdominguez210/gdom-ui/compare/v1.15.0...v1.16.0) (2025-03-24)


### Bug Fixes

* **lib/AudioPlayerProgressBar/useAudioPlayerProgressBar:** resolve existing animations properly ([3bb0375](https://github.com/gdominguez210/gdom-ui/commit/3bb037599e729e18e8f1e5a4f75adc3c6837cd7d))


### Features

* **lib/AudioPlayerControlButton:** add AudioPlayerControlButton ([6d292b9](https://github.com/gdominguez210/gdom-ui/commit/6d292b9b2a17dc03efec89ad56f7828817c915a1))

# [1.15.0](https://github.com/gdominguez210/gdom-ui/compare/v1.14.0...v1.15.0) (2025-03-20)


### Features

* **lib/AudioPlayerContextAudioProvider:** create new context slice ([8adf84e](https://github.com/gdominguez210/gdom-ui/commit/8adf84e617a80000c79ec42f066210683fb04799))
* **lib/AudioPlayerContextRefsProvider:** create new context slice ([129ef02](https://github.com/gdominguez210/gdom-ui/commit/129ef029e190547ed9df9d496831aa9155d9371c))
* **lib/AudioPlayerContextTimeProvider:** create new context slice ([b3e5bb3](https://github.com/gdominguez210/gdom-ui/commit/b3e5bb39179cd0b187ab29b4aa7160971fbedee1))
* **lib/AudioPlayerContextTrackProvider:** create new context slice ([afda286](https://github.com/gdominguez210/gdom-ui/commit/afda286a7ad5882bd82da6a0f968b682f8513851))
* **lib/AudioPlayerControlAudio:** add AudioPlayerControlAudio, useAudioPlayerMetadata ([483efbd](https://github.com/gdominguez210/gdom-ui/commit/483efbde9a5f8a9a327905ac349e83019d019217))
* **lib/AudioPlayerControlLoop:** add AudioPlayerControlLoop, useAudioPlayerControlLoop ([26d033e](https://github.com/gdominguez210/gdom-ui/commit/26d033e935e056d761aa7a3e9bd20fcf83fe3dee))
* **lib/AudioPlayerControlNext:** add AudioPlayerControlNext, useAudioPlayerNextTrack ([0f806c1](https://github.com/gdominguez210/gdom-ui/commit/0f806c153619bac8a9f5ce8a4811dda82fc632b0))
* **lib/AudioPlayerControlPlay:** add AudioPlayerControl, useAudioPlayerControlPlay ([bee32ec](https://github.com/gdominguez210/gdom-ui/commit/bee32ecbd107bf0dcdf283767749534e06a0766a))
* **lib/AudioPlayerControlPrevious:** add AudioPlayerControlPrevious, useAudioPlayerPreviousTrack ([bec4197](https://github.com/gdominguez210/gdom-ui/commit/bec419707e4cdf43f3a1b3500acea879859a442c))
* **lib/AudioPlayerControls/useAudioPlayerMetadata:** add useAudioPlayerMetadata ([bda31ff](https://github.com/gdominguez210/gdom-ui/commit/bda31ff072818654331809d3149c2e9b6e911290))
* **lib/AudioPlayerControls/useAudioPlayerPlay:** add useAudioPlayerPlay ([c0eaee3](https://github.com/gdominguez210/gdom-ui/commit/c0eaee3d24687e78a82a1c802d0d2f7b289c90fe))
* **lib/AudioPlayerControls/useAudioPlayerTrackControls:** add useAudioPlayerTrackControls ([7be1046](https://github.com/gdominguez210/gdom-ui/commit/7be104612c8e1c375495e0264a33f7a98efb5b50))
* **lib/AudioPlayerControls/utils:** add getNextIndex, getRandomNumber ([40506fc](https://github.com/gdominguez210/gdom-ui/commit/40506fcb88278faa4b37d798db39068fc29f5f78))
* **lib/AudioPlayerControlShuffle:** add AudioPlayerControlShuffle ([6066c7d](https://github.com/gdominguez210/gdom-ui/commit/6066c7dd585b1efa84eb728d794bf4fbfed47e97))
* **lib/AudioPlayerProgressBar:** accept onChange function in context connected component ([281eabc](https://github.com/gdominguez210/gdom-ui/commit/281eabc25991171f120b79df5ef161d9bd3ac920))
* **lib/AudioPlayerProgressBar:** add cross-browser styles ([45bc8f7](https://github.com/gdominguez210/gdom-ui/commit/45bc8f7a93b90dfd40ac7e9d533567b51aa824ed))
* **lib/AudioPlayerVolumeButton:** add AudioPlayerVolumeButton ([6412004](https://github.com/gdominguez210/gdom-ui/commit/641200460946ccdeee705803d4be5bf769e42c90))
* **lib/AudioPlayerVolumeSlider:** add AudioPlayerVolumeSlider ([ed078fd](https://github.com/gdominguez210/gdom-ui/commit/ed078fde28bb0f30780998e62706c9c47cf801b2))
* **lib/Icon/data:** add IconSubset, VolumeIconName types ([cf5234c](https://github.com/gdominguez210/gdom-ui/commit/cf5234cc9c66bd182b6107c9415fb471486920d4))

# [1.14.0](https://github.com/gdominguez210/gdom-ui/compare/v1.13.0...v1.14.0) (2025-03-10)


### Features

* **AudioPlayerAuthor:** accept ref as a prop ([fcd72c6](https://github.com/gdominguez210/gdom-ui/commit/fcd72c64e3d81e1d3677a9bf319d54c78a6d6f06))
* **AudioPlayerControls:** accept ref as a prop ([96e9135](https://github.com/gdominguez210/gdom-ui/commit/96e9135eb52f5ebe609c96fccca8a5320dcf1823))
* **AudioPlayerImage:** accept ref as a prop, add polymorphic behavior ([8fdd7c1](https://github.com/gdominguez210/gdom-ui/commit/8fdd7c127284e46e5f5e93fc9a45ab636f977e8c))
* **AudioPlayerInfo:** accept ref as a prop ([61dfbc5](https://github.com/gdominguez210/gdom-ui/commit/61dfbc5ae6a8fe60dbdcee793d1a96b450d259b5))
* **AudioPlayerProgressBar:** accept ref as a prop ([5f64418](https://github.com/gdominguez210/gdom-ui/commit/5f6441870bd9caa3b3fa86c2d31c3304cc5f7b92))
* **AudioPlayerTime:** accept ref as a prop ([fb934bf](https://github.com/gdominguez210/gdom-ui/commit/fb934bfead3ee916f1e0358b214ee013f096d4cd))
* **AudioPlayerTitle:** accept ref as a prop ([42dc32e](https://github.com/gdominguez210/gdom-ui/commit/42dc32e5e42e7431b064182d13b5be2d4a44d4f0))
* **AudioPlayerVolume:** accept ref as a prop ([3736226](https://github.com/gdominguez210/gdom-ui/commit/3736226068754940e084d3d1ad1472f5620fcbca))

# [1.13.0](https://github.com/gdominguez210/gdom-ui/compare/v1.12.0...v1.13.0) (2025-03-08)


### Bug Fixes

* **lib/AudioPlayerProgressBar:** spread restProps instead of all props ([c8d0c48](https://github.com/gdominguez210/gdom-ui/commit/c8d0c48b7ec551a90754891b1f42db72bfba40d8))


### Features

* **lib/AudioPlayer:** accept defaultTrackIndex ([7d7c237](https://github.com/gdominguez210/gdom-ui/commit/7d7c23721514d029eceaf1a13efe611069cb9508))
* **lib/AudioPlayer:** add defaultVolume prop ([afaf5ff](https://github.com/gdominguez210/gdom-ui/commit/afaf5ffd43f67b940485bbc8b651ea96dec4006f))
* **lib/AudioPlayerContextProvider:** add defaultVolume prop ([1232c2a](https://github.com/gdominguez210/gdom-ui/commit/1232c2aaacfa3168f0c47fb46fd5683fcc629015))

# [1.12.0](https://github.com/gdominguez210/gdom-ui/compare/v1.11.0...v1.12.0) (2025-03-04)


### Features

* **AudioPlayerContextProvider:** add containerRef to context, move volume/mute to provider state ([9c9e260](https://github.com/gdominguez210/gdom-ui/commit/9c9e260f71c89a05d597b44f6acb4f493fcc5df2))
* **AudioPlayerControls:** add accessibility properties for aria-label, aria-pressed ([4ed3b33](https://github.com/gdominguez210/gdom-ui/commit/4ed3b3318097e5e3b23360811b7d715a997015ee))
* **AudioPlayerProgressBar:** add accessibility properties for aria-label, role, aria-value ([b5d655c](https://github.com/gdominguez210/gdom-ui/commit/b5d655c77a877251840890a27556ec45b2c4d11c))

# [1.11.0](https://github.com/gdominguez210/gdom-ui/compare/v1.10.0...v1.11.0) (2025-02-24)


### Features

* **AudioPlayerContextProvider:** expose useAudioPlayerContextState, useAudioPlayerContextDispatch ([aaba9ed](https://github.com/gdominguez210/gdom-ui/commit/aaba9ed9dbd5b2dcca5085f8f0576ff92491366e))
* **useAudioPlayerContextDispatch:** add useAudioPlayerContextDispatch hook ([4c4caea](https://github.com/gdominguez210/gdom-ui/commit/4c4caea9e25ca676b6927846d5229acdf774caa2))

# [1.10.0](https://github.com/gdominguez210/gdom-ui/compare/v1.9.0...v1.10.0) (2025-02-22)


### Bug Fixes

* **AudioPlayerAuthor:** add the generic type to the function signature for AudioPlayerAuthor ([4e6485a](https://github.com/gdominguez210/gdom-ui/commit/4e6485a36d665f4ef59e989bef2f76b45893213c))
* **AudioPlayerAuthor:** refactor component type to be truly polymorphic ([587b5b2](https://github.com/gdominguez210/gdom-ui/commit/587b5b2a382cd1cac0da58cc35aa485e98145184))
* **AudioPlayerControls:** refactor component type to be truly polymorphic ([ef33d54](https://github.com/gdominguez210/gdom-ui/commit/ef33d5442ffa55419530aabde77914c5137c1012))
* **AudioPlayerInfo:** refactor component type to be truly polymorphic ([ac0fe1d](https://github.com/gdominguez210/gdom-ui/commit/ac0fe1deceece5921affd4c51722f486566402b3))
* **AudioPlayer:** refactor component type to be truly polymorphic ([68c5dbf](https://github.com/gdominguez210/gdom-ui/commit/68c5dbff9ef99f966bd944d3761d4ee3e1e421ee))
* **AudioPlayerTime:** refactor component type to be truly polymorphic ([1ec23fd](https://github.com/gdominguez210/gdom-ui/commit/1ec23fd9005d698bd8e9a2960e8b8a0c91d2bcea))
* **AudioPlayerTitle:** refactor component type to be truly polymorphic ([01d9e75](https://github.com/gdominguez210/gdom-ui/commit/01d9e754e009df070854ed1bb8b13080d01cbb92))
* **AudioPlayerVolume:** refactor component type to be truly polymorphic ([d336b93](https://github.com/gdominguez210/gdom-ui/commit/d336b93de9e579f58e98b534638db2130fb7141a))
* **Icon/data:** support forwarded Ref on Icon components from SVGR ([31ac7da](https://github.com/gdominguez210/gdom-ui/commit/31ac7da2debf7eed47132bfb338c5d4c078f4a66))


### Features

* **lib/AudioPlayerTime/useAudioPlayerTime:** add useAudioPlayerTime ([6a095fd](https://github.com/gdominguez210/gdom-ui/commit/6a095fd4a3f7077c79c72d3982522201286e57af))

# [1.9.0](https://github.com/gdominguez210/gdom-ui/compare/v1.8.0...v1.9.0) (2024-09-23)


### Features

* **lib/assets/svgs:** add new repeat icons ([9927806](https://github.com/gdominguez210/gdom-ui/commit/9927806dd92ed7ac9c0412b9dd41897670ea236f))
* **lib/AudioPlayerControls/useAudioPlayerControls:** add useAudioPlayerControls ([05a6d2f](https://github.com/gdominguez210/gdom-ui/commit/05a6d2f07038738a2bc94233d7a4fbe02ee570d1))
* **lib/AudioPlayerControls:** add AudioPlayerControlsBase, AudioPlayerControlsButton ([27c1293](https://github.com/gdominguez210/gdom-ui/commit/27c1293606991febff3531f8339887178aa015ba))

# [1.8.0](https://github.com/gdominguez210/gdom-ui/compare/v1.7.0...v1.8.0) (2024-09-22)


### Features

* **lib/AudioPlayerAuthor:** add AudioPlayerAuthorBase ([e167856](https://github.com/gdominguez210/gdom-ui/commit/e167856f569c92ec3ae824997f51a9d423466c4a))
* **lib/AudioPlayerImage:** add AudioPlayerImageBase ([fcf0721](https://github.com/gdominguez210/gdom-ui/commit/fcf072196942f2d124b70ffdee1b479fc9dbe0ab))
* **lib/AudioPlayerProgressBar/useAudioPlayerProgressBar:** add useAudioPlayerProgressBar ([422ec3f](https://github.com/gdominguez210/gdom-ui/commit/422ec3f1fe693ebaf2a590272df18d714dabd014))
* **lib/AudioPlayerProgressBar:** add AudioPlayerProgressBarBase ([c2d9613](https://github.com/gdominguez210/gdom-ui/commit/c2d9613a5055043d704e3f5d0014395c68d2ca82))
* **lib/AudioPlayerTime/data:** expose formatAudioDurationForDisplay ([3f31df6](https://github.com/gdominguez210/gdom-ui/commit/3f31df6df5d99332756f758c58d9aba438b8b049))
* **lib/AudioPlayerTime:** add AudioPlayerTimeBase ([0c2b3e8](https://github.com/gdominguez210/gdom-ui/commit/0c2b3e815d8c3edfbd4391478739726c696847c0))
* **lib/AudioPlayerTitle:** add AudioPlayerTitleBase ([f69d4e8](https://github.com/gdominguez210/gdom-ui/commit/f69d4e82504f7ea8c17f3b14ac6f2ee5393f29f8))

# [1.7.0](https://github.com/gdominguez210/gdom-ui/compare/v1.6.0...v1.7.0) (2024-09-20)


### Features

* **lib/AudioPlayer:** add AudioPlayer ([a755f8a](https://github.com/gdominguez210/gdom-ui/commit/a755f8a76500b110b792c7465a81139307bde04f))
* **lib/AudioPlayerAuthor:** add AudioPlayerAuthor ([9177a36](https://github.com/gdominguez210/gdom-ui/commit/9177a369f4cf6c4cf8c502279e413d8e8b733965))
* **lib/AudioPlayerContextProvider:** add AudioPlayerContextProvider ([d8cb661](https://github.com/gdominguez210/gdom-ui/commit/d8cb6616b0977e00b31b25de44848672ee88cb1a))
* **lib/AudioPlayerControls:** add AudioPlayerControls ([089f4c7](https://github.com/gdominguez210/gdom-ui/commit/089f4c7d2332118b176c9ead88a27f55a2098e16))
* **lib/AudioPlayerImage:** add AudioPlayerImage ([ceeab17](https://github.com/gdominguez210/gdom-ui/commit/ceeab17f517fdca51be742e0b6ba7e08221a5670))
* **lib/AudioPlayerInfo:** add AudioPlayerInfo ([30ce1a6](https://github.com/gdominguez210/gdom-ui/commit/30ce1a69361697cd169edeed7c28e7c92ef2fd0e))
* **lib/AudioPlayerProgressBar:** add AudioPlayerProgressBar ([651dda6](https://github.com/gdominguez210/gdom-ui/commit/651dda6632a04c040fcdb3edb50d8207976610b4))
* **lib/AudioPlayerTime:** add AudioPlayerTime ([7a810c7](https://github.com/gdominguez210/gdom-ui/commit/7a810c7ae921f8beb6b0b2bff0917c4b012b8a68))
* **lib/AudioPlayerTitle:** add AudioPlayerTitle ([bfaa501](https://github.com/gdominguez210/gdom-ui/commit/bfaa50132cc84e99d057b73e321e9d5727954bad))
* **lib/AudioPlayerVolume:** add AudioPlayerVolume ([5328e05](https://github.com/gdominguez210/gdom-ui/commit/5328e05a19aafef5231765577484dd8fc0b1303c))
* **lib/Icon/data:** add ‘volume-down-fill’ icon ([67e4a67](https://github.com/gdominguez210/gdom-ui/commit/67e4a67e6d55c55e820b7b09351f75985df94d74))

# [1.6.0](https://github.com/gdominguez210/gdom-ui/compare/v1.5.0...v1.6.0) (2024-09-13)


### Bug Fixes

* **lib/assets/svgs:** move SVG icons into svgs folder ([1c7c457](https://github.com/gdominguez210/gdom-ui/commit/1c7c457b1560618e1aa765854bf7af177afa8955))


### Features

* **lib/Icon/data:** update icons object ([3edd960](https://github.com/gdominguez210/gdom-ui/commit/3edd9602395421a62d17d423150ccfc6a989a69c))

# [1.5.0](https://github.com/gdominguez210/gdom-ui/compare/v1.4.0...v1.5.0) (2024-09-13)


### Features

* **lib/assets:** add Audio player icons ([3fa8547](https://github.com/gdominguez210/gdom-ui/commit/3fa85472c950235083d3c3c8b420a839ec637e3d))

# [1.4.0](https://github.com/gdominguez210/gdom-ui/compare/v1.3.0...v1.4.0) (2024-09-03)


### Features

* **lib/Button:** add Button component ([5d4eecc](https://github.com/gdominguez210/gdom-ui/commit/5d4eeccd0ef98026a536870a93f124e18c44bcd4))

# [1.3.0](https://github.com/gdominguez210/gdom-ui/compare/v1.2.1...v1.3.0) (2024-09-03)


### Features

* **lib/assets:** add StarLine svg ([37003bd](https://github.com/gdominguez210/gdom-ui/commit/37003bd62154caf095ec15c7bb17291dd3943e2e))
* **lib/Icon:** add Icon component ([d6060bf](https://github.com/gdominguez210/gdom-ui/commit/d6060bf86da63c7c4cd3b0fb2ceef603a92fed32))
* **svgr:** add svgr vite plugin, and typescript types ([3406860](https://github.com/gdominguez210/gdom-ui/commit/34068606fb97f157f373681d180757181f11664d))

## [1.2.1](https://github.com/gdominguez210/gdom-ui/compare/v1.2.0...v1.2.1) (2024-08-30)


### Bug Fixes

* **lib/Badge:** update BadgeProps interface to use HTMLElement as base interface ([01c829d](https://github.com/gdominguez210/gdom-ui/commit/01c829d6808f13c984188b6ab9739b3aba78359d))

# [1.2.0](https://github.com/gdominguez210/gdom-ui/compare/v1.1.0...v1.2.0) (2024-08-30)


### Features

* **lib/Badge:** add Badge component ([f961e02](https://github.com/gdominguez210/gdom-ui/commit/f961e0235a4958b9058b79f3275af629f2635b08))

# [1.1.0](https://github.com/gdominguez210/gdom-ui/compare/v1.0.0...v1.1.0) (2024-08-30)


### Features

* **Storybook 8.2.9:** update Storybook to v8.2.9 ([ae3f68c](https://github.com/gdominguez210/gdom-ui/commit/ae3f68c69268b4dc076d18a0d61b5771d8bcc666))

# 1.0.0 (2024-08-26)


### Features

* **lib/Button:** add Button component ([fedbc9d](https://github.com/gdominguez210/gdom-ui/commit/fedbc9d35cc8ba6cffee5442bd57f84d97073893))
