import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { createContext, useContext, useRef, useMemo, useReducer, useCallback, forwardRef, useEffect, useState } from 'react';

const AUDIO_PLAYER_CONTEXT_TRACK_ERROR = "useAudioPlayerContextTrack must be used within an AudioPlayerContextTrackProvider";
const AudioPlayerContextTrack = createContext(null);

function useAudioPlayerContextTrack() {
  const context = useContext(AudioPlayerContextTrack);
  if (!context) {
    throw new Error(AUDIO_PLAYER_CONTEXT_TRACK_ERROR);
  }
  return context;
}

const CLASS_PART_SEPARATOR = '-';
const createClassGroupUtils = config => {
  const classMap = createClassMap(config);
  const {
    conflictingClassGroups,
    conflictingClassGroupModifiers
  } = config;
  const getClassGroupId = className => {
    const classParts = className.split(CLASS_PART_SEPARATOR);
    // Classes like `-inset-1` produce an empty string as first classPart. We assume that classes for negative values are used correctly and remove it from classParts.
    if (classParts[0] === '' && classParts.length !== 1) {
      classParts.shift();
    }
    return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
  };
  const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
    const conflicts = conflictingClassGroups[classGroupId] || [];
    if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) {
      return [...conflicts, ...conflictingClassGroupModifiers[classGroupId]];
    }
    return conflicts;
  };
  return {
    getClassGroupId,
    getConflictingClassGroupIds
  };
};
const getGroupRecursive = (classParts, classPartObject) => {
  if (classParts.length === 0) {
    return classPartObject.classGroupId;
  }
  const currentClassPart = classParts[0];
  const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
  const classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : undefined;
  if (classGroupFromNextClassPart) {
    return classGroupFromNextClassPart;
  }
  if (classPartObject.validators.length === 0) {
    return undefined;
  }
  const classRest = classParts.join(CLASS_PART_SEPARATOR);
  return classPartObject.validators.find(({
    validator
  }) => validator(classRest))?.classGroupId;
};
const arbitraryPropertyRegex = /^\[(.+)\]$/;
const getGroupIdForArbitraryProperty = className => {
  if (arbitraryPropertyRegex.test(className)) {
    const arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
    const property = arbitraryPropertyClassName?.substring(0, arbitraryPropertyClassName.indexOf(':'));
    if (property) {
      // I use two dots here because one dot is used as prefix for class groups in plugins
      return 'arbitrary..' + property;
    }
  }
};
/**
 * Exported for testing only
 */
const createClassMap = config => {
  const {
    theme,
    classGroups
  } = config;
  const classMap = {
    nextPart: new Map(),
    validators: []
  };
  for (const classGroupId in classGroups) {
    processClassesRecursively(classGroups[classGroupId], classMap, classGroupId, theme);
  }
  return classMap;
};
const processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
  classGroup.forEach(classDefinition => {
    if (typeof classDefinition === 'string') {
      const classPartObjectToEdit = classDefinition === '' ? classPartObject : getPart(classPartObject, classDefinition);
      classPartObjectToEdit.classGroupId = classGroupId;
      return;
    }
    if (typeof classDefinition === 'function') {
      if (isThemeGetter(classDefinition)) {
        processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
        return;
      }
      classPartObject.validators.push({
        validator: classDefinition,
        classGroupId
      });
      return;
    }
    Object.entries(classDefinition).forEach(([key, classGroup]) => {
      processClassesRecursively(classGroup, getPart(classPartObject, key), classGroupId, theme);
    });
  });
};
const getPart = (classPartObject, path) => {
  let currentClassPartObject = classPartObject;
  path.split(CLASS_PART_SEPARATOR).forEach(pathPart => {
    if (!currentClassPartObject.nextPart.has(pathPart)) {
      currentClassPartObject.nextPart.set(pathPart, {
        nextPart: new Map(),
        validators: []
      });
    }
    currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
  });
  return currentClassPartObject;
};
const isThemeGetter = func => func.isThemeGetter;

// LRU cache inspired from hashlru (https://github.com/dominictarr/hashlru/blob/v1.0.4/index.js) but object replaced with Map to improve performance
const createLruCache = maxCacheSize => {
  if (maxCacheSize < 1) {
    return {
      get: () => undefined,
      set: () => {}
    };
  }
  let cacheSize = 0;
  let cache = new Map();
  let previousCache = new Map();
  const update = (key, value) => {
    cache.set(key, value);
    cacheSize++;
    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache;
      cache = new Map();
    }
  };
  return {
    get(key) {
      let value = cache.get(key);
      if (value !== undefined) {
        return value;
      }
      if ((value = previousCache.get(key)) !== undefined) {
        update(key, value);
        return value;
      }
    },
    set(key, value) {
      if (cache.has(key)) {
        cache.set(key, value);
      } else {
        update(key, value);
      }
    }
  };
};
const IMPORTANT_MODIFIER = '!';
const MODIFIER_SEPARATOR = ':';
const MODIFIER_SEPARATOR_LENGTH = MODIFIER_SEPARATOR.length;
const createParseClassName = config => {
  const {
    prefix,
    experimentalParseClassName
  } = config;
  /**
   * Parse class name into parts.
   *
   * Inspired by `splitAtTopLevelOnly` used in Tailwind CSS
   * @see https://github.com/tailwindlabs/tailwindcss/blob/v3.2.2/src/util/splitAtTopLevelOnly.js
   */
  let parseClassName = className => {
    const modifiers = [];
    let bracketDepth = 0;
    let parenDepth = 0;
    let modifierStart = 0;
    let postfixModifierPosition;
    for (let index = 0; index < className.length; index++) {
      let currentCharacter = className[index];
      if (bracketDepth === 0 && parenDepth === 0) {
        if (currentCharacter === MODIFIER_SEPARATOR) {
          modifiers.push(className.slice(modifierStart, index));
          modifierStart = index + MODIFIER_SEPARATOR_LENGTH;
          continue;
        }
        if (currentCharacter === '/') {
          postfixModifierPosition = index;
          continue;
        }
      }
      if (currentCharacter === '[') {
        bracketDepth++;
      } else if (currentCharacter === ']') {
        bracketDepth--;
      } else if (currentCharacter === '(') {
        parenDepth++;
      } else if (currentCharacter === ')') {
        parenDepth--;
      }
    }
    const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
    const baseClassName = stripImportantModifier(baseClassNameWithImportantModifier);
    const hasImportantModifier = baseClassName !== baseClassNameWithImportantModifier;
    const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : undefined;
    return {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    };
  };
  if (prefix) {
    const fullPrefix = prefix + MODIFIER_SEPARATOR;
    const parseClassNameOriginal = parseClassName;
    parseClassName = className => className.startsWith(fullPrefix) ? parseClassNameOriginal(className.substring(fullPrefix.length)) : {
      isExternal: true,
      modifiers: [],
      hasImportantModifier: false,
      baseClassName: className,
      maybePostfixModifierPosition: undefined
    };
  }
  if (experimentalParseClassName) {
    const parseClassNameOriginal = parseClassName;
    parseClassName = className => experimentalParseClassName({
      className,
      parseClassName: parseClassNameOriginal
    });
  }
  return parseClassName;
};
const stripImportantModifier = baseClassName => {
  if (baseClassName.endsWith(IMPORTANT_MODIFIER)) {
    return baseClassName.substring(0, baseClassName.length - 1);
  }
  /**
   * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
   * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
   */
  if (baseClassName.startsWith(IMPORTANT_MODIFIER)) {
    return baseClassName.substring(1);
  }
  return baseClassName;
};

/**
 * Sorts modifiers according to following schema:
 * - Predefined modifiers are sorted alphabetically
 * - When an arbitrary variant appears, it must be preserved which modifiers are before and after it
 */
const createSortModifiers = config => {
  const orderSensitiveModifiers = Object.fromEntries(config.orderSensitiveModifiers.map(modifier => [modifier, true]));
  const sortModifiers = modifiers => {
    if (modifiers.length <= 1) {
      return modifiers;
    }
    const sortedModifiers = [];
    let unsortedModifiers = [];
    modifiers.forEach(modifier => {
      const isPositionSensitive = modifier[0] === '[' || orderSensitiveModifiers[modifier];
      if (isPositionSensitive) {
        sortedModifiers.push(...unsortedModifiers.sort(), modifier);
        unsortedModifiers = [];
      } else {
        unsortedModifiers.push(modifier);
      }
    });
    sortedModifiers.push(...unsortedModifiers.sort());
    return sortedModifiers;
  };
  return sortModifiers;
};
const createConfigUtils = config => ({
  cache: createLruCache(config.cacheSize),
  parseClassName: createParseClassName(config),
  sortModifiers: createSortModifiers(config),
  ...createClassGroupUtils(config)
});
const SPLIT_CLASSES_REGEX = /\s+/;
const mergeClassList = (classList, configUtils) => {
  const {
    parseClassName,
    getClassGroupId,
    getConflictingClassGroupIds,
    sortModifiers
  } = configUtils;
  /**
   * Set of classGroupIds in following format:
   * `{importantModifier}{variantModifiers}{classGroupId}`
   * @example 'float'
   * @example 'hover:focus:bg-color'
   * @example 'md:!pr'
   */
  const classGroupsInConflict = [];
  const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
  let result = '';
  for (let index = classNames.length - 1; index >= 0; index -= 1) {
    const originalClassName = classNames[index];
    const {
      isExternal,
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    } = parseClassName(originalClassName);
    if (isExternal) {
      result = originalClassName + (result.length > 0 ? ' ' + result : result);
      continue;
    }
    let hasPostfixModifier = !!maybePostfixModifierPosition;
    let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
    if (!classGroupId) {
      if (!hasPostfixModifier) {
        // Not a Tailwind class
        result = originalClassName + (result.length > 0 ? ' ' + result : result);
        continue;
      }
      classGroupId = getClassGroupId(baseClassName);
      if (!classGroupId) {
        // Not a Tailwind class
        result = originalClassName + (result.length > 0 ? ' ' + result : result);
        continue;
      }
      hasPostfixModifier = false;
    }
    const variantModifier = sortModifiers(modifiers).join(':');
    const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
    const classId = modifierId + classGroupId;
    if (classGroupsInConflict.includes(classId)) {
      // Tailwind class omitted due to conflict
      continue;
    }
    classGroupsInConflict.push(classId);
    const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
    for (let i = 0; i < conflictGroups.length; ++i) {
      const group = conflictGroups[i];
      classGroupsInConflict.push(modifierId + group);
    }
    // Tailwind class not in conflict
    result = originalClassName + (result.length > 0 ? ' ' + result : result);
  }
  return result;
};

/**
 * The code in this file is copied from https://github.com/lukeed/clsx and modified to suit the needs of tailwind-merge better.
 *
 * Specifically:
 * - Runtime code from https://github.com/lukeed/clsx/blob/v1.2.1/src/index.js
 * - TypeScript types from https://github.com/lukeed/clsx/blob/v1.2.1/clsx.d.ts
 *
 * Original code has MIT license: Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)
 */
function twJoin() {
  let index = 0;
  let argument;
  let resolvedValue;
  let string = '';
  while (index < arguments.length) {
    if (argument = arguments[index++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += ' ');
        string += resolvedValue;
      }
    }
  }
  return string;
}
const toValue = mix => {
  if (typeof mix === 'string') {
    return mix;
  }
  let resolvedValue;
  let string = '';
  for (let k = 0; k < mix.length; k++) {
    if (mix[k]) {
      if (resolvedValue = toValue(mix[k])) {
        string && (string += ' ');
        string += resolvedValue;
      }
    }
  }
  return string;
};
function createTailwindMerge(createConfigFirst, ...createConfigRest) {
  let configUtils;
  let cacheGet;
  let cacheSet;
  let functionToCall = initTailwindMerge;
  function initTailwindMerge(classList) {
    const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
    configUtils = createConfigUtils(config);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList);
  }
  function tailwindMerge(classList) {
    const cachedResult = cacheGet(classList);
    if (cachedResult) {
      return cachedResult;
    }
    const result = mergeClassList(classList, configUtils);
    cacheSet(classList, result);
    return result;
  }
  return function callTailwindMerge() {
    return functionToCall(twJoin.apply(null, arguments));
  };
}
const fromTheme = key => {
  const themeGetter = theme => theme[key] || [];
  themeGetter.isThemeGetter = true;
  return themeGetter;
};
const arbitraryValueRegex = /^\[(?:(\w[\w-]*):)?(.+)\]$/i;
const arbitraryVariableRegex = /^\((?:(\w[\w-]*):)?(.+)\)$/i;
const fractionRegex = /^\d+\/\d+$/;
const tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
const lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
const colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/;
// Shadow always begins with x and y offset separated by underscore optionally prepended by inset
const shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
const imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
const isFraction = value => fractionRegex.test(value);
const isNumber = value => Boolean(value) && !Number.isNaN(Number(value));
const isInteger = value => Boolean(value) && Number.isInteger(Number(value));
const isPercent = value => value.endsWith('%') && isNumber(value.slice(0, -1));
const isTshirtSize = value => tshirtUnitRegex.test(value);
const isAny = () => true;
const isLengthOnly = value =>
// `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
// For example, `hsl(0 0% 0%)` would be classified as a length without this check.
// I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
lengthUnitRegex.test(value) && !colorFunctionRegex.test(value);
const isNever = () => false;
const isShadow = value => shadowRegex.test(value);
const isImage = value => imageRegex.test(value);
const isAnyNonArbitrary = value => !isArbitraryValue(value) && !isArbitraryVariable(value);
const isArbitrarySize = value => getIsArbitraryValue(value, isLabelSize, isNever);
const isArbitraryValue = value => arbitraryValueRegex.test(value);
const isArbitraryLength = value => getIsArbitraryValue(value, isLabelLength, isLengthOnly);
const isArbitraryNumber = value => getIsArbitraryValue(value, isLabelNumber, isNumber);
const isArbitraryPosition = value => getIsArbitraryValue(value, isLabelPosition, isNever);
const isArbitraryImage = value => getIsArbitraryValue(value, isLabelImage, isImage);
const isArbitraryShadow = value => getIsArbitraryValue(value, isNever, isShadow);
const isArbitraryVariable = value => arbitraryVariableRegex.test(value);
const isArbitraryVariableLength = value => getIsArbitraryVariable(value, isLabelLength);
const isArbitraryVariableFamilyName = value => getIsArbitraryVariable(value, isLabelFamilyName);
const isArbitraryVariablePosition = value => getIsArbitraryVariable(value, isLabelPosition);
const isArbitraryVariableSize = value => getIsArbitraryVariable(value, isLabelSize);
const isArbitraryVariableImage = value => getIsArbitraryVariable(value, isLabelImage);
const isArbitraryVariableShadow = value => getIsArbitraryVariable(value, isLabelShadow, true);
// Helpers
const getIsArbitraryValue = (value, testLabel, testValue) => {
  const result = arbitraryValueRegex.exec(value);
  if (result) {
    if (result[1]) {
      return testLabel(result[1]);
    }
    return testValue(result[2]);
  }
  return false;
};
const getIsArbitraryVariable = (value, testLabel, shouldMatchNoLabel = false) => {
  const result = arbitraryVariableRegex.exec(value);
  if (result) {
    if (result[1]) {
      return testLabel(result[1]);
    }
    return shouldMatchNoLabel;
  }
  return false;
};
// Labels
const isLabelPosition = label => label === 'position';
const imageLabels = /*#__PURE__*/new Set(['image', 'url']);
const isLabelImage = label => imageLabels.has(label);
const sizeLabels = /*#__PURE__*/new Set(['length', 'size', 'percentage']);
const isLabelSize = label => sizeLabels.has(label);
const isLabelLength = label => label === 'length';
const isLabelNumber = label => label === 'number';
const isLabelFamilyName = label => label === 'family-name';
const isLabelShadow = label => label === 'shadow';
const getDefaultConfig = () => {
  /**
   * Theme getters for theme variable namespaces
   * @see https://tailwindcss.com/docs/theme#theme-variable-namespaces
   */
  /***/
  const themeColor = fromTheme('color');
  const themeFont = fromTheme('font');
  const themeText = fromTheme('text');
  const themeFontWeight = fromTheme('font-weight');
  const themeTracking = fromTheme('tracking');
  const themeLeading = fromTheme('leading');
  const themeBreakpoint = fromTheme('breakpoint');
  const themeContainer = fromTheme('container');
  const themeSpacing = fromTheme('spacing');
  const themeRadius = fromTheme('radius');
  const themeShadow = fromTheme('shadow');
  const themeInsetShadow = fromTheme('inset-shadow');
  const themeDropShadow = fromTheme('drop-shadow');
  const themeBlur = fromTheme('blur');
  const themePerspective = fromTheme('perspective');
  const themeAspect = fromTheme('aspect');
  const themeEase = fromTheme('ease');
  const themeAnimate = fromTheme('animate');
  /**
   * Helpers to avoid repeating the same scales
   *
   * We use functions that create a new array every time they're called instead of static arrays.
   * This ensures that users who modify any scale by mutating the array (e.g. with `array.push(element)`) don't accidentally mutate arrays in other parts of the config.
   */
  /***/
  const scaleBreak = () => ['auto', 'avoid', 'all', 'avoid-page', 'page', 'left', 'right', 'column'];
  const scalePosition = () => ['bottom', 'center', 'left', 'left-bottom', 'left-top', 'right', 'right-bottom', 'right-top', 'top'];
  const scaleOverflow = () => ['auto', 'hidden', 'clip', 'visible', 'scroll'];
  const scaleOverscroll = () => ['auto', 'contain', 'none'];
  const scaleUnambiguousSpacing = () => [isArbitraryVariable, isArbitraryValue, themeSpacing];
  const scaleInset = () => [isFraction, 'full', 'auto', ...scaleUnambiguousSpacing()];
  const scaleGridTemplateColsRows = () => [isInteger, 'none', 'subgrid', isArbitraryVariable, isArbitraryValue];
  const scaleGridColRowStartAndEnd = () => ['auto', {
    span: ['full', isInteger, isArbitraryVariable, isArbitraryValue]
  }, isInteger, isArbitraryVariable, isArbitraryValue];
  const scaleGridColRowStartOrEnd = () => [isInteger, 'auto', isArbitraryVariable, isArbitraryValue];
  const scaleGridAutoColsRows = () => ['auto', 'min', 'max', 'fr', isArbitraryVariable, isArbitraryValue];
  const scaleAlignPrimaryAxis = () => ['start', 'end', 'center', 'between', 'around', 'evenly', 'stretch', 'baseline'];
  const scaleAlignSecondaryAxis = () => ['start', 'end', 'center', 'stretch'];
  const scaleMargin = () => ['auto', ...scaleUnambiguousSpacing()];
  const scaleSizing = () => [isFraction, 'auto', 'full', 'dvw', 'dvh', 'lvw', 'lvh', 'svw', 'svh', 'min', 'max', 'fit', ...scaleUnambiguousSpacing()];
  const scaleColor = () => [themeColor, isArbitraryVariable, isArbitraryValue];
  const scaleGradientStopPosition = () => [isPercent, isArbitraryVariableLength, isArbitraryLength];
  const scaleRadius = () => [
  // Deprecated since Tailwind CSS v4.0.0
  '', 'none', 'full', themeRadius, isArbitraryVariable, isArbitraryValue];
  const scaleBorderWidth = () => ['', isNumber, isArbitraryVariableLength, isArbitraryLength];
  const scaleLineStyle = () => ['solid', 'dashed', 'dotted', 'double'];
  const scaleBlendMode = () => ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];
  const scaleBlur = () => [
  // Deprecated since Tailwind CSS v4.0.0
  '', 'none', themeBlur, isArbitraryVariable, isArbitraryValue];
  const scaleOrigin = () => ['center', 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left', isArbitraryVariable, isArbitraryValue];
  const scaleRotate = () => ['none', isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleScale = () => ['none', isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleSkew = () => [isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleTranslate = () => [isFraction, 'full', ...scaleUnambiguousSpacing()];
  return {
    cacheSize: 500,
    theme: {
      animate: ['spin', 'ping', 'pulse', 'bounce'],
      aspect: ['video'],
      blur: [isTshirtSize],
      breakpoint: [isTshirtSize],
      color: [isAny],
      container: [isTshirtSize],
      'drop-shadow': [isTshirtSize],
      ease: ['in', 'out', 'in-out'],
      font: [isAnyNonArbitrary],
      'font-weight': ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'],
      'inset-shadow': [isTshirtSize],
      leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose'],
      perspective: ['dramatic', 'near', 'normal', 'midrange', 'distant', 'none'],
      radius: [isTshirtSize],
      shadow: [isTshirtSize],
      spacing: ['px', isNumber],
      text: [isTshirtSize],
      tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest']
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ['auto', 'square', isFraction, isArbitraryValue, isArbitraryVariable, themeAspect]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ['container'],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [isNumber, isArbitraryValue, isArbitraryVariable, themeContainer]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      'break-after': [{
        'break-after': scaleBreak()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      'break-before': [{
        'break-before': scaleBreak()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      'break-inside': [{
        'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column']
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      'box-decoration': [{
        'box-decoration': ['slice', 'clone']
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ['border', 'content']
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ['block', 'inline-block', 'inline', 'flex', 'inline-flex', 'table', 'inline-table', 'table-caption', 'table-cell', 'table-column', 'table-column-group', 'table-footer-group', 'table-header-group', 'table-row-group', 'table-row', 'flow-root', 'grid', 'inline-grid', 'contents', 'list-item', 'hidden'],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ['sr-only', 'not-sr-only'],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ['right', 'left', 'none', 'start', 'end']
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ['left', 'right', 'both', 'none', 'start', 'end']
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ['isolate', 'isolation-auto'],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      'object-fit': [{
        object: ['contain', 'cover', 'fill', 'none', 'scale-down']
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      'object-position': [{
        object: [...scalePosition(), isArbitraryValue, isArbitraryVariable]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: scaleOverflow()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      'overflow-x': [{
        'overflow-x': scaleOverflow()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      'overflow-y': [{
        'overflow-y': scaleOverflow()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: scaleOverscroll()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      'overscroll-x': [{
        'overscroll-x': scaleOverscroll()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      'overscroll-y': [{
        'overscroll-y': scaleOverscroll()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: scaleInset()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      'inset-x': [{
        'inset-x': scaleInset()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      'inset-y': [{
        'inset-y': scaleInset()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: scaleInset()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: scaleInset()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: scaleInset()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: scaleInset()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: scaleInset()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: scaleInset()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ['visible', 'invisible', 'collapse'],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [isInteger, 'auto', isArbitraryVariable, isArbitraryValue]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [isFraction, 'full', 'auto', themeContainer, ...scaleUnambiguousSpacing()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      'flex-direction': [{
        flex: ['row', 'row-reverse', 'col', 'col-reverse']
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      'flex-wrap': [{
        flex: ['nowrap', 'wrap', 'wrap-reverse']
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [isNumber, isFraction, 'auto', 'initial', 'none', isArbitraryValue]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ['', isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ['', isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [isInteger, 'first', 'last', 'none', isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      'grid-cols': [{
        'grid-cols': scaleGridTemplateColsRows()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-start-end': [{
        col: scaleGridColRowStartAndEnd()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-start': [{
        'col-start': scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-end': [{
        'col-end': scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      'grid-rows': [{
        'grid-rows': scaleGridTemplateColsRows()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-start-end': [{
        row: scaleGridColRowStartAndEnd()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-start': [{
        'row-start': scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-end': [{
        'row-end': scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      'grid-flow': [{
        'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense']
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      'auto-cols': [{
        'auto-cols': scaleGridAutoColsRows()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      'auto-rows': [{
        'auto-rows': scaleGridAutoColsRows()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: scaleUnambiguousSpacing()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      'gap-x': [{
        'gap-x': scaleUnambiguousSpacing()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      'gap-y': [{
        'gap-y': scaleUnambiguousSpacing()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      'justify-content': [{
        justify: [...scaleAlignPrimaryAxis(), 'normal']
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      'justify-items': [{
        'justify-items': [...scaleAlignSecondaryAxis(), 'normal']
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      'justify-self': [{
        'justify-self': ['auto', ...scaleAlignSecondaryAxis()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      'align-content': [{
        content: ['normal', ...scaleAlignPrimaryAxis()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      'align-items': [{
        items: [...scaleAlignSecondaryAxis(), 'baseline']
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      'align-self': [{
        self: ['auto', ...scaleAlignSecondaryAxis(), 'baseline']
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      'place-content': [{
        'place-content': scaleAlignPrimaryAxis()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      'place-items': [{
        'place-items': [...scaleAlignSecondaryAxis(), 'baseline']
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      'place-self': [{
        'place-self': ['auto', ...scaleAlignSecondaryAxis()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: scaleUnambiguousSpacing()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: scaleUnambiguousSpacing()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: scaleUnambiguousSpacing()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: scaleMargin()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: scaleMargin()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: scaleMargin()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: scaleMargin()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: scaleMargin()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: scaleMargin()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: scaleMargin()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: scaleMargin()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: scaleMargin()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      'space-x': [{
        'space-x': scaleUnambiguousSpacing()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      'space-x-reverse': ['space-x-reverse'],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      'space-y': [{
        'space-y': scaleUnambiguousSpacing()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      'space-y-reverse': ['space-y-reverse'],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: scaleSizing()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [themeContainer, 'screen', ...scaleSizing()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      'min-w': [{
        'min-w': [themeContainer, 'screen', /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
        'none', ...scaleSizing()]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      'max-w': [{
        'max-w': [themeContainer, 'screen', 'none', /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
        'prose', /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
        {
          screen: [themeBreakpoint]
        }, ...scaleSizing()]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ['screen', ...scaleSizing()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      'min-h': [{
        'min-h': ['screen', 'none', ...scaleSizing()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      'max-h': [{
        'max-h': ['screen', ...scaleSizing()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      'font-size': [{
        text: ['base', themeText, isArbitraryVariableLength, isArbitraryLength]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      'font-smoothing': ['antialiased', 'subpixel-antialiased'],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      'font-style': ['italic', 'not-italic'],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      'font-weight': [{
        font: [themeFontWeight, isArbitraryVariable, isArbitraryNumber]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      'font-stretch': [{
        'font-stretch': ['ultra-condensed', 'extra-condensed', 'condensed', 'semi-condensed', 'normal', 'semi-expanded', 'expanded', 'extra-expanded', 'ultra-expanded', isPercent, isArbitraryValue]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      'font-family': [{
        font: [isArbitraryVariableFamilyName, isArbitraryValue, themeFont]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-normal': ['normal-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-ordinal': ['ordinal'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-slashed-zero': ['slashed-zero'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-figure': ['lining-nums', 'oldstyle-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-spacing': ['proportional-nums', 'tabular-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-fraction': ['diagonal-fractions', 'stacked-fractions'],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [themeTracking, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      'line-clamp': [{
        'line-clamp': [isNumber, 'none', isArbitraryVariable, isArbitraryNumber]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [/** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
        themeLeading, ...scaleUnambiguousSpacing()]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      'list-image': [{
        'list-image': ['none', isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      'list-style-position': [{
        list: ['inside', 'outside']
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      'list-style-type': [{
        list: ['disc', 'decimal', 'none', isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      'text-alignment': [{
        text: ['left', 'center', 'right', 'justify', 'start', 'end']
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      'placeholder-color': [{
        placeholder: scaleColor()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      'text-color': [{
        text: scaleColor()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      'text-decoration': ['underline', 'overline', 'line-through', 'no-underline'],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      'text-decoration-style': [{
        decoration: [...scaleLineStyle(), 'wavy']
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      'text-decoration-thickness': [{
        decoration: [isNumber, 'from-font', 'auto', isArbitraryVariable, isArbitraryLength]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      'text-decoration-color': [{
        decoration: scaleColor()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      'underline-offset': [{
        'underline-offset': [isNumber, 'auto', isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      'text-transform': ['uppercase', 'lowercase', 'capitalize', 'normal-case'],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      'text-wrap': [{
        text: ['wrap', 'nowrap', 'balance', 'pretty']
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: scaleUnambiguousSpacing()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      'vertical-align': [{
        align: ['baseline', 'top', 'middle', 'bottom', 'text-top', 'text-bottom', 'sub', 'super', isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'break-spaces']
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ['normal', 'words', 'all', 'keep']
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ['none', 'manual', 'auto']
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ['none', isArbitraryVariable, isArbitraryValue]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      'bg-attachment': [{
        bg: ['fixed', 'local', 'scroll']
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      'bg-clip': [{
        'bg-clip': ['border', 'padding', 'content', 'text']
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      'bg-origin': [{
        'bg-origin': ['border', 'padding', 'content']
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      'bg-position': [{
        bg: [...scalePosition(), isArbitraryVariablePosition, isArbitraryPosition]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      'bg-repeat': [{
        bg: ['no-repeat', {
          repeat: ['', 'x', 'y', 'space', 'round']
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      'bg-size': [{
        bg: ['auto', 'cover', 'contain', isArbitraryVariableSize, isArbitrarySize]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      'bg-image': [{
        bg: ['none', {
          linear: [{
            to: ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl']
          }, isInteger, isArbitraryVariable, isArbitraryValue],
          radial: ['', isArbitraryVariable, isArbitraryValue],
          conic: [isInteger, isArbitraryVariable, isArbitraryValue]
        }, isArbitraryVariableImage, isArbitraryImage]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      'bg-color': [{
        bg: scaleColor()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-from-pos': [{
        from: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-via-pos': [{
        via: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-to-pos': [{
        to: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-from': [{
        from: scaleColor()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-via': [{
        via: scaleColor()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-to': [{
        to: scaleColor()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: scaleRadius()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-s': [{
        'rounded-s': scaleRadius()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-e': [{
        'rounded-e': scaleRadius()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-t': [{
        'rounded-t': scaleRadius()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-r': [{
        'rounded-r': scaleRadius()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-b': [{
        'rounded-b': scaleRadius()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-l': [{
        'rounded-l': scaleRadius()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-ss': [{
        'rounded-ss': scaleRadius()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-se': [{
        'rounded-se': scaleRadius()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-ee': [{
        'rounded-ee': scaleRadius()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-es': [{
        'rounded-es': scaleRadius()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-tl': [{
        'rounded-tl': scaleRadius()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-tr': [{
        'rounded-tr': scaleRadius()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-br': [{
        'rounded-br': scaleRadius()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-bl': [{
        'rounded-bl': scaleRadius()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w': [{
        border: scaleBorderWidth()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-x': [{
        'border-x': scaleBorderWidth()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-y': [{
        'border-y': scaleBorderWidth()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-s': [{
        'border-s': scaleBorderWidth()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-e': [{
        'border-e': scaleBorderWidth()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-t': [{
        'border-t': scaleBorderWidth()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-r': [{
        'border-r': scaleBorderWidth()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-b': [{
        'border-b': scaleBorderWidth()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-l': [{
        'border-l': scaleBorderWidth()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      'divide-x': [{
        'divide-x': scaleBorderWidth()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      'divide-x-reverse': ['divide-x-reverse'],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      'divide-y': [{
        'divide-y': scaleBorderWidth()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      'divide-y-reverse': ['divide-y-reverse'],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      'border-style': [{
        border: [...scaleLineStyle(), 'hidden', 'none']
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      'divide-style': [{
        divide: [...scaleLineStyle(), 'hidden', 'none']
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color': [{
        border: scaleColor()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-x': [{
        'border-x': scaleColor()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-y': [{
        'border-y': scaleColor()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-s': [{
        'border-s': scaleColor()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-e': [{
        'border-e': scaleColor()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-t': [{
        'border-t': scaleColor()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-r': [{
        'border-r': scaleColor()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-b': [{
        'border-b': scaleColor()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-l': [{
        'border-l': scaleColor()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      'divide-color': [{
        divide: scaleColor()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      'outline-style': [{
        outline: [...scaleLineStyle(), 'none', 'hidden']
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      'outline-offset': [{
        'outline-offset': [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      'outline-w': [{
        outline: ['', isNumber, isArbitraryVariableLength, isArbitraryLength]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      'outline-color': [{
        outline: [themeColor]
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
        // Deprecated since Tailwind CSS v4.0.0
        '', 'none', themeShadow, isArbitraryVariableShadow, isArbitraryShadow]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      'shadow-color': [{
        shadow: scaleColor()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      'inset-shadow': [{
        'inset-shadow': ['none', isArbitraryVariable, isArbitraryValue, themeInsetShadow]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      'inset-shadow-color': [{
        'inset-shadow': scaleColor()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      'ring-w': [{
        ring: scaleBorderWidth()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      'ring-w-inset': ['ring-inset'],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      'ring-color': [{
        ring: scaleColor()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      'ring-offset-w': [{
        'ring-offset': [isNumber, isArbitraryLength]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      'ring-offset-color': [{
        'ring-offset': scaleColor()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      'inset-ring-w': [{
        'inset-ring': scaleBorderWidth()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      'inset-ring-color': [{
        'inset-ring': scaleColor()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      'mix-blend': [{
        'mix-blend': [...scaleBlendMode(), 'plus-darker', 'plus-lighter']
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      'bg-blend': [{
        'bg-blend': scaleBlendMode()
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
        // Deprecated since Tailwind CSS v3.0.0
        '', 'none', isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: scaleBlur()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      'drop-shadow': [{
        'drop-shadow': [
        // Deprecated since Tailwind CSS v4.0.0
        '', 'none', themeDropShadow, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ['', isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      'hue-rotate': [{
        'hue-rotate': [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ['', isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ['', isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      'backdrop-filter': [{
        'backdrop-filter': [
        // Deprecated since Tailwind CSS v3.0.0
        '', 'none', isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      'backdrop-blur': [{
        'backdrop-blur': scaleBlur()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      'backdrop-brightness': [{
        'backdrop-brightness': [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      'backdrop-contrast': [{
        'backdrop-contrast': [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      'backdrop-grayscale': [{
        'backdrop-grayscale': ['', isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      'backdrop-hue-rotate': [{
        'backdrop-hue-rotate': [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      'backdrop-invert': [{
        'backdrop-invert': ['', isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      'backdrop-opacity': [{
        'backdrop-opacity': [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      'backdrop-saturate': [{
        'backdrop-saturate': [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      'backdrop-sepia': [{
        'backdrop-sepia': ['', isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      'border-collapse': [{
        border: ['collapse', 'separate']
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing': [{
        'border-spacing': scaleUnambiguousSpacing()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing-x': [{
        'border-spacing-x': scaleUnambiguousSpacing()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing-y': [{
        'border-spacing-y': scaleUnambiguousSpacing()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      'table-layout': [{
        table: ['auto', 'fixed']
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ['top', 'bottom']
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ['', 'all', 'colors', 'opacity', 'shadow', 'transform', 'none', isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      'transition-behavior': [{
        transition: ['normal', 'discrete']
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [isNumber, 'initial', isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ['linear', 'initial', themeEase, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ['none', themeAnimate, isArbitraryVariable, isArbitraryValue]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ['hidden', 'visible']
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [themePerspective, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      'perspective-origin': [{
        'perspective-origin': scaleOrigin()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: scaleRotate()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      'rotate-x': [{
        'rotate-x': scaleRotate()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      'rotate-y': [{
        'rotate-y': scaleRotate()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      'rotate-z': [{
        'rotate-z': scaleRotate()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: scaleScale()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      'scale-x': [{
        'scale-x': scaleScale()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      'scale-y': [{
        'scale-y': scaleScale()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      'scale-z': [{
        'scale-z': scaleScale()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      'scale-3d': ['scale-3d'],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: scaleSkew()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      'skew-x': [{
        'skew-x': scaleSkew()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      'skew-y': [{
        'skew-y': scaleSkew()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [isArbitraryVariable, isArbitraryValue, '', 'none', 'gpu', 'cpu']
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      'transform-origin': [{
        origin: scaleOrigin()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      'transform-style': [{
        transform: ['3d', 'flat']
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: scaleTranslate()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      'translate-x': [{
        'translate-x': scaleTranslate()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      'translate-y': [{
        'translate-y': scaleTranslate()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      'translate-z': [{
        'translate-z': scaleTranslate()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      'translate-none': ['translate-none'],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: scaleColor()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ['none', 'auto']
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      'caret-color': [{
        caret: scaleColor()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      'color-scheme': [{
        scheme: ['normal', 'dark', 'light', 'light-dark', 'only-dark', 'only-light']
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ['auto', 'default', 'pointer', 'wait', 'text', 'move', 'help', 'not-allowed', 'none', 'context-menu', 'progress', 'cell', 'crosshair', 'vertical-text', 'alias', 'copy', 'no-drop', 'grab', 'grabbing', 'all-scroll', 'col-resize', 'row-resize', 'n-resize', 'e-resize', 's-resize', 'w-resize', 'ne-resize', 'nw-resize', 'se-resize', 'sw-resize', 'ew-resize', 'ns-resize', 'nesw-resize', 'nwse-resize', 'zoom-in', 'zoom-out', isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      'field-sizing': [{
        'field-sizing': ['fixed', 'content']
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      'pointer-events': [{
        'pointer-events': ['auto', 'none']
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ['none', '', 'y', 'x']
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      'scroll-behavior': [{
        scroll: ['auto', 'smooth']
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-m': [{
        'scroll-m': scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mx': [{
        'scroll-mx': scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-my': [{
        'scroll-my': scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-ms': [{
        'scroll-ms': scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-me': [{
        'scroll-me': scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mt': [{
        'scroll-mt': scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mr': [{
        'scroll-mr': scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mb': [{
        'scroll-mb': scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-ml': [{
        'scroll-ml': scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-p': [{
        'scroll-p': scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-px': [{
        'scroll-px': scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-py': [{
        'scroll-py': scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-ps': [{
        'scroll-ps': scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pe': [{
        'scroll-pe': scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pt': [{
        'scroll-pt': scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pr': [{
        'scroll-pr': scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pb': [{
        'scroll-pb': scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pl': [{
        'scroll-pl': scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      'snap-align': [{
        snap: ['start', 'end', 'center', 'align-none']
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      'snap-stop': [{
        snap: ['normal', 'always']
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      'snap-type': [{
        snap: ['none', 'x', 'y', 'both']
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      'snap-strictness': [{
        snap: ['mandatory', 'proximity']
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ['auto', 'none', 'manipulation']
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      'touch-x': [{
        'touch-pan': ['x', 'left', 'right']
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      'touch-y': [{
        'touch-pan': ['y', 'up', 'down']
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      'touch-pz': ['touch-pinch-zoom'],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ['none', 'text', 'all', 'auto']
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      'will-change': [{
        'will-change': ['auto', 'scroll', 'contents', 'transform', isArbitraryVariable, isArbitraryValue]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ['none', ...scaleColor()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      'stroke-w': [{
        stroke: [isNumber, isArbitraryVariableLength, isArbitraryLength, isArbitraryNumber]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ['none', ...scaleColor()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      'forced-color-adjust': [{
        'forced-color-adjust': ['auto', 'none']
      }]
    },
    conflictingClassGroups: {
      overflow: ['overflow-x', 'overflow-y'],
      overscroll: ['overscroll-x', 'overscroll-y'],
      inset: ['inset-x', 'inset-y', 'start', 'end', 'top', 'right', 'bottom', 'left'],
      'inset-x': ['right', 'left'],
      'inset-y': ['top', 'bottom'],
      flex: ['basis', 'grow', 'shrink'],
      gap: ['gap-x', 'gap-y'],
      p: ['px', 'py', 'ps', 'pe', 'pt', 'pr', 'pb', 'pl'],
      px: ['pr', 'pl'],
      py: ['pt', 'pb'],
      m: ['mx', 'my', 'ms', 'me', 'mt', 'mr', 'mb', 'ml'],
      mx: ['mr', 'ml'],
      my: ['mt', 'mb'],
      size: ['w', 'h'],
      'font-size': ['leading'],
      'fvn-normal': ['fvn-ordinal', 'fvn-slashed-zero', 'fvn-figure', 'fvn-spacing', 'fvn-fraction'],
      'fvn-ordinal': ['fvn-normal'],
      'fvn-slashed-zero': ['fvn-normal'],
      'fvn-figure': ['fvn-normal'],
      'fvn-spacing': ['fvn-normal'],
      'fvn-fraction': ['fvn-normal'],
      'line-clamp': ['display', 'overflow'],
      rounded: ['rounded-s', 'rounded-e', 'rounded-t', 'rounded-r', 'rounded-b', 'rounded-l', 'rounded-ss', 'rounded-se', 'rounded-ee', 'rounded-es', 'rounded-tl', 'rounded-tr', 'rounded-br', 'rounded-bl'],
      'rounded-s': ['rounded-ss', 'rounded-es'],
      'rounded-e': ['rounded-se', 'rounded-ee'],
      'rounded-t': ['rounded-tl', 'rounded-tr'],
      'rounded-r': ['rounded-tr', 'rounded-br'],
      'rounded-b': ['rounded-br', 'rounded-bl'],
      'rounded-l': ['rounded-tl', 'rounded-bl'],
      'border-spacing': ['border-spacing-x', 'border-spacing-y'],
      'border-w': ['border-w-s', 'border-w-e', 'border-w-t', 'border-w-r', 'border-w-b', 'border-w-l'],
      'border-w-x': ['border-w-r', 'border-w-l'],
      'border-w-y': ['border-w-t', 'border-w-b'],
      'border-color': ['border-color-s', 'border-color-e', 'border-color-t', 'border-color-r', 'border-color-b', 'border-color-l'],
      'border-color-x': ['border-color-r', 'border-color-l'],
      'border-color-y': ['border-color-t', 'border-color-b'],
      translate: ['translate-x', 'translate-y', 'translate-none'],
      'translate-none': ['translate', 'translate-x', 'translate-y', 'translate-z'],
      'scroll-m': ['scroll-mx', 'scroll-my', 'scroll-ms', 'scroll-me', 'scroll-mt', 'scroll-mr', 'scroll-mb', 'scroll-ml'],
      'scroll-mx': ['scroll-mr', 'scroll-ml'],
      'scroll-my': ['scroll-mt', 'scroll-mb'],
      'scroll-p': ['scroll-px', 'scroll-py', 'scroll-ps', 'scroll-pe', 'scroll-pt', 'scroll-pr', 'scroll-pb', 'scroll-pl'],
      'scroll-px': ['scroll-pr', 'scroll-pl'],
      'scroll-py': ['scroll-pt', 'scroll-pb'],
      touch: ['touch-x', 'touch-y', 'touch-pz'],
      'touch-x': ['touch'],
      'touch-y': ['touch'],
      'touch-pz': ['touch']
    },
    conflictingClassGroupModifiers: {
      'font-size': ['leading']
    },
    orderSensitiveModifiers: ['before', 'after', 'placeholder', 'file', 'marker', 'selection', 'first-line', 'first-letter', 'backdrop', '*', '**']
  };
};
const twMerge = /*#__PURE__*/createTailwindMerge(getDefaultConfig);

function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}

function AudioPlayerAuthorPrimitive(props) {
  const { as: Element = "p", children, className, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    Element,
    {
      className: twMerge(clsx("line-clamp-1 text-sm text-gray-400", className)),
      ...restProps,
      children
    }
  );
}

function AudioPlayerAuthor(props) {
  const { currentTrack: { author } = {} } = useAudioPlayerContextTrack();
  if (!author) return null;
  return /* @__PURE__ */ jsx(
    AudioPlayerAuthorPrimitive,
    {
      ...props,
      title: author,
      children: author
    }
  );
}

const TRACK_ACTIONS = {
  SET_CURRENT_TRACK_INDEX: "SET_CURRENT_TRACK_INDEX"
};
function trackReducer(state, action) {
  switch (action.type) {
    case TRACK_ACTIONS.SET_CURRENT_TRACK_INDEX:
      return {
        ...state,
        currentTrackIndex: action.payload.currentTrackIndex,
        currentTrack: state.tracks[action.payload.currentTrackIndex]
      };
    default:
      return state;
  }
}

const AudioPlayerContextRefs = createContext(
  void 0
);
const AUDIO_PLAYER_CONTEXT_REFS_ERROR = "useAudioPlayerContextRefs must be used within an AudioPlayerContextRefsProvider";

function AudioPlayerContextRefsProvider(props) {
  const { children } = props;
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const contextValue = useMemo(() => ({ audioRef, progressBarRef }), [audioRef, progressBarRef]);
  return /* @__PURE__ */ jsx(AudioPlayerContextRefs.Provider, { value: contextValue, children });
}

function AudioPlayerContextTrackProvider(props) {
  const { children, tracks, defaultTrackIndex = 0 } = props;
  const [state, dispatch] = useReducer(trackReducer, {
    currentTrackIndex: defaultTrackIndex,
    tracks,
    currentTrack: tracks[defaultTrackIndex]
  });
  const setTrackIndex = useCallback((index) => {
    dispatch({
      type: TRACK_ACTIONS.SET_CURRENT_TRACK_INDEX,
      payload: { currentTrackIndex: index }
    });
  }, []);
  const contextValue = useMemo(
    () => ({
      ...state,
      setTrackIndex
    }),
    [state, setTrackIndex]
  );
  return /* @__PURE__ */ jsx(AudioPlayerContextTrack.Provider, { value: contextValue, children });
}

const AUDIO_PLAYER_CONTEXT_TIME_ERROR = "useAudioPlayerContextTime must be used within an AudioPlayerContextTimeProvider";
const AudioPlayerContextTime = createContext(null);

const TIME_ACTIONS = {
  SET_CURRENT_TIME: "SET_CURRENT_TIME",
  SET_DURATION: "SET_DURATION"
};
function timeReducer(state, action) {
  switch (action.type) {
    case TIME_ACTIONS.SET_CURRENT_TIME:
      return { ...state, currentTime: action.payload.currentTime };
    case TIME_ACTIONS.SET_DURATION:
      return { ...state, duration: action.payload.duration };
    default:
      return state;
  }
}

function AudioPlayerContextTimeProvider(props) {
  const { defaultDuration = 0, defaultCurrentTime = 0, children } = props;
  const [state, dispatch] = useReducer(timeReducer, {
    currentTime: defaultCurrentTime,
    duration: defaultDuration
  });
  const seek = useCallback((time) => {
    dispatch({ type: TIME_ACTIONS.SET_CURRENT_TIME, payload: { currentTime: time } });
  }, []);
  const setDuration = useCallback((duration) => {
    dispatch({ type: TIME_ACTIONS.SET_DURATION, payload: { duration } });
  }, []);
  const contextValue = useMemo(
    () => ({
      ...state,
      seek,
      setDuration
    }),
    [state, seek, setDuration]
  );
  return /* @__PURE__ */ jsx(AudioPlayerContextTime.Provider, { value: contextValue, children });
}

const AUDIO_PLAYER_CONTEXT_AUDIO_ERROR = "useAudioPlayerContextAudio must be used within an AudioPlayerContextAudioProvider";
const AudioPlayerContextAudio = createContext(null);

const AUDIO_ACTIONS = {
  SET_IS_PLAYING: "SET_IS_PLAYING",
  SET_VOLUME: "SET_VOLUME",
  SET_MUTE: "SET_MUTE",
  SET_SHUFFLE: "SET_SHUFFLE",
  SET_LOOP: "SET_LOOP"
};
function audioReducer(state, action) {
  switch (action.type) {
    case AUDIO_ACTIONS.SET_IS_PLAYING:
      return {
        ...state,
        isPlaying: action.payload.isPlaying === "toggle" ? !state.isPlaying : action.payload.isPlaying
      };
    case AUDIO_ACTIONS.SET_VOLUME:
      return { ...state, volume: action.payload.volume };
    case AUDIO_ACTIONS.SET_MUTE:
      return {
        ...state,
        mute: action.payload.mute === "toggle" ? !state.mute : action.payload.mute
      };
    case AUDIO_ACTIONS.SET_SHUFFLE:
      return {
        ...state,
        shuffle: action.payload.shuffle === "toggle" ? !state.shuffle : action.payload.shuffle
      };
    case AUDIO_ACTIONS.SET_LOOP:
      return {
        ...state,
        loop: action.payload.loop === "toggle" ? !state.loop : action.payload.loop
      };
    default:
      return state;
  }
}

function AudioPlayerContextAudioProvider(props) {
  const {
    defaultVolume = 50,
    defaultMute = false,
    defaultShuffle = false,
    defaultLoop = false,
    children
  } = props;
  const [state, dispatch] = useReducer(audioReducer, {
    isPlaying: false,
    volume: defaultVolume,
    mute: defaultMute,
    shuffle: defaultShuffle,
    loop: defaultLoop
  });
  const play = useCallback(() => {
    dispatch({ type: AUDIO_ACTIONS.SET_IS_PLAYING, payload: { isPlaying: true } });
  }, []);
  const pause = useCallback(() => {
    dispatch({ type: AUDIO_ACTIONS.SET_IS_PLAYING, payload: { isPlaying: false } });
  }, []);
  const togglePlay = useCallback(() => {
    dispatch({ type: AUDIO_ACTIONS.SET_IS_PLAYING, payload: { isPlaying: "toggle" } });
  }, []);
  const setVolume = useCallback((volume) => {
    dispatch({ type: AUDIO_ACTIONS.SET_VOLUME, payload: { volume } });
  }, []);
  const setMute = useCallback((mute) => {
    dispatch({ type: AUDIO_ACTIONS.SET_MUTE, payload: { mute } });
  }, []);
  const toggleMute = useCallback(() => {
    dispatch({ type: AUDIO_ACTIONS.SET_MUTE, payload: { mute: "toggle" } });
  }, []);
  const setShuffle = useCallback((shuffle) => {
    dispatch({ type: AUDIO_ACTIONS.SET_SHUFFLE, payload: { shuffle } });
  }, []);
  const toggleShuffle = useCallback(() => {
    dispatch({ type: AUDIO_ACTIONS.SET_SHUFFLE, payload: { shuffle: "toggle" } });
  }, []);
  const setLoop = useCallback((loop) => {
    dispatch({ type: AUDIO_ACTIONS.SET_LOOP, payload: { loop } });
  }, []);
  const toggleLoop = useCallback(() => {
    dispatch({ type: AUDIO_ACTIONS.SET_LOOP, payload: { loop: "toggle" } });
  }, []);
  const contextValue = useMemo(
    () => ({
      ...state,
      play,
      pause,
      togglePlay,
      setVolume,
      setMute,
      toggleMute,
      setShuffle,
      toggleShuffle,
      setLoop,
      toggleLoop
    }),
    [
      state,
      play,
      pause,
      togglePlay,
      setVolume,
      setMute,
      toggleMute,
      setShuffle,
      toggleShuffle,
      setLoop,
      toggleLoop
    ]
  );
  return /* @__PURE__ */ jsx(AudioPlayerContextAudio.Provider, { value: contextValue, children });
}

function AudioPlayerContextProvider({
  children,
  defaultTrackIndex,
  defaultVolume,
  defaultMute,
  defaultShuffle,
  defaultLoop,
  tracks
}) {
  return /* @__PURE__ */ jsx(AudioPlayerContextRefsProvider, { children: /* @__PURE__ */ jsx(
    AudioPlayerContextTrackProvider,
    {
      defaultTrackIndex,
      tracks,
      children: /* @__PURE__ */ jsx(AudioPlayerContextTimeProvider, { children: /* @__PURE__ */ jsx(
        AudioPlayerContextAudioProvider,
        {
          defaultVolume,
          defaultMute,
          defaultShuffle,
          defaultLoop,
          children
        }
      ) })
    }
  ) });
}

function AudioPlayerControls(props) {
  const { as: Element = "div", children, className, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    Element,
    {
      className: twMerge(clsx("flex items-center justify-center gap-1 p-4 text-2xl", className)),
      ...restProps,
      children
    }
  );
}

const SvgStarLine = (props, ref) => /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", ref, ...props }, /* @__PURE__ */ React.createElement("path", { d: "M8.00044 12.3471L3.10221 15.0889L4.19619 9.58317L0.0749512 5.77199L5.64928 5.11106L8.00044 0.0137939L10.3516 5.11106L15.9259 5.77199L11.8047 9.58317L12.8986 15.0889L8.00044 12.3471ZM8.00044 10.7555L10.9495 12.4062L10.2909 9.09136L12.7722 6.79671L9.416 6.39875L8.00044 3.32978L6.58485 6.39875L3.22865 6.79671L5.70997 9.09136L5.0513 12.4062L8.00044 10.7555Z" }));
const ForwardRef$i = forwardRef(SvgStarLine);

const SvgForwardEndFill = (props, ref) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", width: "1em", height: "1em", ref, ...props }, /* @__PURE__ */ React.createElement("path", { d: "M22 4C21.4477 4 21 4.44772 21 5V10.6665L11.7774 4.51806C11.6952 4.4633 11.5987 4.43408 11.5 4.43408C11.2239 4.43408 11 4.65794 11 4.93408V10.6665L1.77735 4.51806C1.69522 4.4633 1.59871 4.43408 1.5 4.43408C1.22386 4.43408 1 4.65794 1 4.93408V19.0656C1 19.1643 1.02922 19.2608 1.08397 19.3429C1.23715 19.5727 1.54759 19.6348 1.77735 19.4816L11 13.3332V19.0656C11 19.1643 11.0292 19.2608 11.084 19.3429C11.2372 19.5727 11.5476 19.6348 11.7774 19.4816L21 13.3332V19C21 19.5523 21.4477 20 22 20C22.5523 20 23 19.5523 23 19V5C23 4.44772 22.5523 4 22 4Z" }));
const ForwardRef$h = forwardRef(SvgForwardEndFill);

const SvgPauseLargeFill = (props, ref) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", width: "1em", height: "1em", ref, ...props }, /* @__PURE__ */ React.createElement("path", { d: "M6 3H8V21H6V3ZM16 3H18V21H16V3Z" }));
const ForwardRef$g = forwardRef(SvgPauseLargeFill);

const SvgPlayLargeFill = (props, ref) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", width: "1em", height: "1em", ref, ...props }, /* @__PURE__ */ React.createElement("path", { d: "M6 20.1957V3.80421C6 3.01878 6.86395 2.53993 7.53 2.95621L20.6432 11.152C21.2699 11.5436 21.2699 12.4563 20.6432 12.848L7.53 21.0437C6.86395 21.46 6 20.9812 6 20.1957Z" }));
const ForwardRef$f = forwardRef(SvgPlayLargeFill);

const SvgRewindFill = (props, ref) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", width: "1em", height: "1em", ref, ...props }, /* @__PURE__ */ React.createElement("path", { d: "M12 10.6667L21.2227 4.51823C21.4524 4.36506 21.7629 4.42714 21.9161 4.65691C21.9708 4.73904 22 4.83554 22 4.93426V19.0657C22 19.3419 21.7762 19.5657 21.5 19.5657C21.4013 19.5657 21.3048 19.5365 21.2227 19.4818L12 13.3333V19.0657C12 19.3419 11.7762 19.5657 11.5 19.5657C11.4013 19.5657 11.3048 19.5365 11.2227 19.4818L0.62407 12.416C0.394306 12.2628 0.332219 11.9524 0.485395 11.7226C0.522013 11.6677 0.569144 11.6206 0.62407 11.584L11.2227 4.51823C11.4524 4.36506 11.7629 4.42714 11.9161 4.65691C11.9708 4.73904 12 4.83554 12 4.93426V10.6667Z" }));
const ForwardRef$e = forwardRef(SvgRewindFill);

const SvgRewindStartFill = (props, ref) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", width: "1em", height: "1em", ref, ...props }, /* @__PURE__ */ React.createElement("path", { d: "M2 4C1.44772 4 1 4.44772 1 5V19C1 19.5523 1.44772 20 2 20C2.55228 20 3 19.5523 3 19V13.3332L12.2227 19.4816C12.3048 19.5364 12.4013 19.5656 12.5 19.5656C12.7762 19.5656 13 19.3418 13 19.0656V13.3332L22.2227 19.4816C22.3048 19.5364 22.4013 19.5656 22.5 19.5656C22.7762 19.5656 23 19.3418 23 19.0656V4.93413C23 4.83542 22.9708 4.73892 22.9161 4.65679C22.7629 4.42702 22.4524 4.36493 22.2227 4.51811L13 10.6665V4.93413C13 4.83542 12.9708 4.73892 12.9161 4.65679C12.7629 4.42702 12.4524 4.36493 12.2227 4.51811L3 10.6666V5C3 4.44772 2.55228 4 2 4Z" }));
const ForwardRef$d = forwardRef(SvgRewindStartFill);

const SvgShuffleFill = (props, ref) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", width: "1em", height: "1em", ref, ...props }, /* @__PURE__ */ React.createElement("path", { d: "M18 17.8832V16L23 19L18 22V19.9095C14.9224 19.4698 12.2513 17.4584 11.0029 14.5453L11 14.5386L10.9971 14.5453C9.57893 17.8544 6.32508 20 2.72483 20H2V18H2.72483C5.52503 18 8.05579 16.3312 9.15885 13.7574L9.91203 12L9.15885 10.2426C8.05579 7.66878 5.52503 6 2.72483 6H2V4H2.72483C6.32508 4 9.57893 6.14557 10.9971 9.45473L11 9.46141L11.0029 9.45473C12.2513 6.5416 14.9224 4.53022 18 4.09051V2L23 5L18 8V6.11684C15.7266 6.53763 13.7737 8.0667 12.8412 10.2426L12.088 12L12.8412 13.7574C13.7737 15.9333 15.7266 17.4624 18 17.8832Z" }));
const ForwardRef$c = forwardRef(SvgShuffleFill);

const SvgSpeedFill = (props, ref) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", width: "1em", height: "1em", ref, ...props }, /* @__PURE__ */ React.createElement("path", { d: "M12 13.3334L2.77735 19.4818C2.54759 19.635 2.23715 19.5729 2.08397 19.3432C2.02922 19.261 2 19.1645 2 19.0658V4.93433C2 4.65818 2.22386 4.43433 2.5 4.43433C2.59871 4.43433 2.69522 4.46355 2.77735 4.5183L12 10.6667V4.93433C12 4.65818 12.2239 4.43433 12.5 4.43433C12.5987 4.43433 12.6952 4.46355 12.7774 4.5183L23.376 11.584C23.6057 11.7372 23.6678 12.0477 23.5146 12.2774C23.478 12.3323 23.4309 12.3795 23.376 12.4161L12.7774 19.4818C12.5476 19.635 12.2372 19.5729 12.084 19.3432C12.0292 19.261 12 19.1645 12 19.0658V13.3334Z" }));
const ForwardRef$b = forwardRef(SvgSpeedFill);

const SvgStopLargeFill = (props, ref) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", width: "1em", height: "1em", ref, ...props }, /* @__PURE__ */ React.createElement("path", { d: "M3 4C3 3.44772 3.44772 3 4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4Z" }));
const ForwardRef$a = forwardRef(SvgStopLargeFill);

const SvgVolumeMuteFill = (props, ref) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", width: "1em", height: "1em", ref, ...props }, /* @__PURE__ */ React.createElement("path", { d: "M5.88889 16H2C1.44772 16 1 15.5523 1 15V9.00001C1 8.44772 1.44772 8.00001 2 8.00001H5.88889L11.1834 3.66815C11.3971 3.49329 11.7121 3.52479 11.887 3.73851C11.9601 3.82784 12 3.93971 12 4.05513V19.9449C12 20.221 11.7761 20.4449 11.5 20.4449C11.3846 20.4449 11.2727 20.405 11.1834 20.3319L5.88889 16ZM20.4142 12L23.9497 15.5355L22.5355 16.9498L19 13.4142L15.4645 16.9498L14.0503 15.5355L17.5858 12L14.0503 8.46447L15.4645 7.05026L19 10.5858L22.5355 7.05026L23.9497 8.46447L20.4142 12Z" }));
const ForwardRef$9 = forwardRef(SvgVolumeMuteFill);

const SvgVolumeDownFill = (props, ref) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", width: "1em", height: "1em", ref, ...props }, /* @__PURE__ */ React.createElement("path", { d: "M8.88889 16H5C4.44772 16 4 15.5523 4 15V9.00001C4 8.44772 4.44772 8.00001 5 8.00001H8.88889L14.1834 3.66815C14.3971 3.49329 14.7121 3.52479 14.887 3.73851C14.9601 3.82784 15 3.93971 15 4.05513V19.9449C15 20.221 14.7761 20.4449 14.5 20.4449C14.3846 20.4449 14.2727 20.405 14.1834 20.3319L8.88889 16ZM18.8631 16.5911L17.4411 15.169C18.3892 14.4376 19 13.2901 19 12C19 10.5697 18.2493 9.31469 17.1203 8.6076L18.5589 7.169C20.0396 8.2616 21 10.0187 21 12C21 13.8422 20.1698 15.4904 18.8631 16.5911Z" }));
const ForwardRef$8 = forwardRef(SvgVolumeDownFill);

const SvgVolumeUpFill = (props, ref) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", width: "1em", height: "1em", ref, ...props }, /* @__PURE__ */ React.createElement("path", { d: "M2 16.0001H5.88889L11.1834 20.3319C11.2727 20.405 11.3846 20.4449 11.5 20.4449C11.7761 20.4449 12 20.2211 12 19.9449V4.05519C12 3.93977 11.9601 3.8279 11.887 3.73857C11.7121 3.52485 11.3971 3.49335 11.1834 3.66821L5.88889 8.00007H2C1.44772 8.00007 1 8.44778 1 9.00007V15.0001C1 15.5524 1.44772 16.0001 2 16.0001ZM23 12C23 15.292 21.5539 18.2463 19.2622 20.2622L17.8445 18.8444C19.7758 17.1937 21 14.7398 21 12C21 9.26016 19.7758 6.80629 17.8445 5.15557L19.2622 3.73779C21.5539 5.75368 23 8.70795 23 12ZM18 12C18 10.0883 17.106 8.38548 15.7133 7.28673L14.2842 8.71584C15.3213 9.43855 16 10.64 16 12C16 13.36 15.3213 14.5614 14.2842 15.2841L15.7133 16.7132C17.106 15.6145 18 13.9116 18 12Z" }));
const ForwardRef$7 = forwardRef(SvgVolumeUpFill);

const SvgRepeatFill = (props, ref) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", width: "1em", height: "1em", ref, ...props }, /* @__PURE__ */ React.createElement("path", { d: "M6 4H21C21.5523 4 22 4.44772 22 5V12H20V6H6V9L1 5L6 1V4ZM18 20H3C2.44772 20 2 19.5523 2 19V12H4V18H18V15L23 19L18 23V20Z" }));
const ForwardRef$6 = forwardRef(SvgRepeatFill);

const SvgRepeatOneFill = (props, ref) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", width: "1em", height: "1em", ref, ...props }, /* @__PURE__ */ React.createElement("path", { d: "M8 20V21.9325C8 22.2086 7.77614 22.4325 7.5 22.4325C7.38303 22.4325 7.26977 22.3915 7.17991 22.3166L3.06093 18.8841C2.84879 18.7073 2.82013 18.392 2.99691 18.1799C3.09191 18.0659 3.23264 18 3.38103 18H8L18 18C19.1046 18 20 17.1046 20 16V8H22V16C22 18.2091 20.2091 20 18 20H8ZM16 4V2.0675C16 1.79136 16.2239 1.5675 16.5 1.5675C16.617 1.5675 16.7302 1.60851 16.8201 1.68339L20.9391 5.11587C21.1512 5.29266 21.1799 5.60794 21.0031 5.82008C20.9081 5.93407 20.7674 5.99998 20.619 5.99998H16L6 6C4.89543 6 4 6.89543 4 8V16H2V8C2 5.79086 3.79086 4 6 4H16ZM11 8H13V16H11V10H9V9L11 8Z" }));
const ForwardRef$5 = forwardRef(SvgRepeatOneFill);

const SvgRepeat2Fill = (props, ref) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", width: "1em", height: "1em", ref, ...props }, /* @__PURE__ */ React.createElement("path", { d: "M8 20V21.9325C8 22.2086 7.77614 22.4325 7.5 22.4325C7.38303 22.4325 7.26977 22.3915 7.17991 22.3166L3.06093 18.8841C2.84879 18.7073 2.82013 18.392 2.99691 18.1799C3.09191 18.0659 3.23264 18 3.38103 18L18 18C19.1046 18 20 17.1046 20 16V8H22V16C22 18.2091 20.2091 20 18 20H8ZM16 4V2.0675C16 1.79136 16.2239 1.5675 16.5 1.5675C16.617 1.5675 16.7302 1.60851 16.8201 1.68339L20.9391 5.11587C21.1512 5.29266 21.1799 5.60794 21.0031 5.82008C20.9081 5.93407 20.7674 5.99998 20.619 5.99998L6 6C4.89543 6 4 6.89543 4 8V16H2V8C2 5.79086 3.79086 4 6 4H16Z" }));
const ForwardRef$4 = forwardRef(SvgRepeat2Fill);

const SvgDiscFill = (props, ref) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", width: "1em", height: "1em", ref, ...props }, /* @__PURE__ */ React.createElement("path", { d: "M13 9.17071C12.6872 9.06015 12.3506 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12V2.4578C19.0571 3.73207 22 7.52236 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C12.3375 2 12.6711 2.01672 13 2.04938V9.17071Z" }));
const ForwardRef$3 = forwardRef(SvgDiscFill);

const SvgPlayList2Fill = (props, ref) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", width: "1em", height: "1em", ref, ...props }, /* @__PURE__ */ React.createElement("path", { d: "M22 18V20H2V18H22ZM2 3.5L10 8.5L2 13.5V3.5ZM22 11V13H12V11H22ZM22 4V6H12V4H22Z" }));
const ForwardRef$2 = forwardRef(SvgPlayList2Fill);

const SvgPlayListAddFill = (props, ref) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", width: "1em", height: "1em", ref, ...props }, /* @__PURE__ */ React.createElement("path", { d: "M2 18H12V20H2V18ZM2 11H22V13H2V11ZM2 4H22V6H2V4ZM18 18V15H20V18H23V20H20V23H18V20H15V18H18Z" }));
const ForwardRef$1 = forwardRef(SvgPlayListAddFill);

const SvgCloseFill = (props, ref) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", width: "1em", height: "1em", ref, ...props }, /* @__PURE__ */ React.createElement("path", { d: "M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z" }));
const ForwardRef = forwardRef(SvgCloseFill);

const icons = {
  "star-line": ForwardRef$i,
  "forward-end-fill": ForwardRef$h,
  "pause-large-fill": ForwardRef$g,
  "play-large-fill": ForwardRef$f,
  "repeat-fill": ForwardRef$6,
  "repeat-one-fill": ForwardRef$5,
  "repeat-2-fill": ForwardRef$4,
  "rewind-fill": ForwardRef$e,
  "rewind-start-fill": ForwardRef$d,
  "shuffle-fill": ForwardRef$c,
  "speed-fill": ForwardRef$b,
  "stop-large-fill": ForwardRef$a,
  "volume-mute-fill": ForwardRef$9,
  "volume-down-fill": ForwardRef$8,
  "volume-up-fill": ForwardRef$7,
  "disc-fill": ForwardRef$3,
  "play-list-2-fill": ForwardRef$2,
  "play-list-add-line": ForwardRef$1,
  "close-fill": ForwardRef
};

function Icon(props) {
  const { name, className, ...restProps } = props;
  const Icon2 = icons[name];
  return /* @__PURE__ */ jsx(
    Icon2,
    {
      className: twMerge(clsx("h-[1em] fill-current", className)),
      ...restProps
    }
  );
}

function AudioPlayerImagePrimitive(props) {
  const {
    as: Element = "div",
    className,
    altText,
    width = 96,
    height = 96,
    src,
    ...restProps
  } = props;
  return /* @__PURE__ */ jsx(
    Element,
    {
      className: twMerge(
        clsx(
          "flex h-24 w-24 items-center justify-center overflow-hidden bg-neutral-100/10",
          className
        )
      ),
      ...restProps,
      children: src ? /* @__PURE__ */ jsx(
        "img",
        {
          src,
          alt: altText,
          className: "h-full w-full object-cover",
          width,
          height
        }
      ) : /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-4xl", children: /* @__PURE__ */ jsx(Icon, { name: "disc-fill" }) }) })
    }
  );
}

function AudioPlayerImage(props) {
  const { currentTrack: { thumbnail, title } = {} } = useAudioPlayerContextTrack();
  return /* @__PURE__ */ jsx(
    AudioPlayerImagePrimitive,
    {
      ...props,
      src: thumbnail,
      altText: title ? `${title} thumbnail` : ""
    }
  );
}

function AudioPlayerInfo(props) {
  const { as: Element = "div", className, children, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    Element,
    {
      className: twMerge(clsx("flex items-center gap-4", className)),
      ...restProps,
      children
    }
  );
}

function useAudioPlayerContextRefs() {
  const context = useContext(AudioPlayerContextRefs);
  if (!context) {
    throw new Error(AUDIO_PLAYER_CONTEXT_REFS_ERROR);
  }
  return context;
}

function updateProgressBar(progressBar, value) {
  if (!progressBar) return;
  progressBar.value = value.toString();
}
function updateAudioCurrentTime(audio, time) {
  if (!audio) return;
  audio.currentTime = time;
}
function useAudioPlayerProgressBar({
  audioRef,
  cssVariableName = "--range-progress",
  duration,
  isPlaying,
  onProgressChange,
  progressBarRef
}) {
  const animationRef = useRef(null);
  const handleProgressChange = useCallback(() => {
    if (!audioRef.current || !progressBarRef.current) return;
    const newTime = Number(progressBarRef.current.value);
    updateAudioCurrentTime(audioRef.current, newTime);
    onProgressChange(newTime);
    progressBarRef.current.style.setProperty(cssVariableName, `${newTime / duration * 100}%`);
  }, [audioRef, progressBarRef, duration, cssVariableName, onProgressChange]);
  const updateProgress = useCallback(() => {
    if (!audioRef.current || !progressBarRef.current || !duration) return;
    const currentTime = audioRef.current.currentTime;
    onProgressChange(currentTime);
    updateProgressBar(progressBarRef.current, currentTime);
    progressBarRef.current.style.setProperty(cssVariableName, `${currentTime / duration * 100}%`);
  }, [audioRef, progressBarRef, duration, cssVariableName, onProgressChange]);
  const startAnimation = useCallback(() => {
    if (audioRef?.current && progressBarRef?.current && duration) {
      const animate = () => {
        updateProgress();
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [audioRef, progressBarRef, duration, updateProgress]);
  useEffect(() => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    if (isPlaying) {
      startAnimation();
      return;
    }
    updateProgress();
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isPlaying, duration, startAnimation, updateProgress]);
  return {
    handleProgressChange
  };
}

function useAudioPlayerContextTime() {
  const context = useContext(AudioPlayerContextTime);
  if (!context) {
    throw new Error(AUDIO_PLAYER_CONTEXT_TIME_ERROR);
  }
  return context;
}

function useAudioPlayerContextAudio() {
  const context = useContext(AudioPlayerContextAudio);
  if (!context) {
    throw new Error(AUDIO_PLAYER_CONTEXT_AUDIO_ERROR);
  }
  return context;
}

function setRef(ref, instance) {
  if (!ref) return void 0;
  if (typeof ref === "function") {
    const result = ref(instance);
    if (typeof result === "function") {
      return result;
    }
  } else if ("current" in ref) {
    ref.current = instance;
  }
  return void 0;
}
function composeRefs(...refs) {
  return (instance) => {
    const evaluatedRefs = refs.map((ref) => setRef(ref, instance));
    return () => {
      evaluatedRefs.forEach((value, index) => {
        if (typeof value === "function") {
          value();
        } else {
          setRef(refs[index], null);
        }
      });
    };
  };
}
function useComposedRefs(...refs) {
  return useCallback(composeRefs(...refs), [refs]);
}

function AudioPlayerProgressBarPrimitive(props) {
  const { className, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    "input",
    {
      className: twMerge(
        clsx(
          // Base styles
          "[--range-progress:0%]",
          "appearance-none",
          "bg-gray-500",
          "relative",
          "w-full",
          "h-2",
          "cursor-pointer",
          "focus-within:outline-white",
          // Progress bar styles
          "before:block",
          "before:w-(--range-progress)",
          "before:bg-neutral-100",
          `before:content-['']`,
          "before:absolute",
          "before:top-0",
          "before:left-0",
          "before:h-2",
          // WebKit (Chrome, Safari, newer Edge) track styles
          "[&::-webkit-slider-runnable-track]:bg-transparent",
          "[&::-webkit-slider-runnable-track]:appearance-none",
          "[&::-webkit-slider-runnable-track]:shadow-none",
          "[&::-webkit-slider-runnable-track]:border-transparent",
          // WebKit thumb (hidden)
          "[&::-webkit-slider-thumb]:appearance-none",
          "[&::-webkit-slider-thumb]:w-0",
          "[&::-webkit-slider-thumb]:h-0",
          "[&::-webkit-slider-thumb]:border-none",
          // Firefox track styles
          "[&::-moz-range-track]:bg-transparent",
          "[&::-moz-range-track]:appearance-none",
          "[&::-moz-range-track]:border-none",
          "[&::-moz-range-progress]:appearance-none",
          "[&::-moz-range-progress]:bg-neutral-100",
          "[&::-moz-range-progress]:h-2",
          // Firefox thumb (hidden)
          "[&::-moz-range-thumb]:appearance-none",
          "[&::-moz-range-thumb]:w-0",
          "[&::-moz-range-thumb]:h-0",
          "[&::-moz-range-thumb]:border-none",
          // IE/Edge track styles
          "[&::-ms-track]:bg-transparent",
          "[&::-ms-track]:appearance-none",
          "[&::-ms-track]:border-none",
          "[&::-ms-fill-lower]:bg-neutral-100",
          "[&::-ms-fill-upper]:bg-gray-500",
          // IE/Edge thumb (hidden)
          "[&::-ms-thumb]:appearance-none",
          "[&::-ms-thumb]:w-0",
          "[&::-ms-thumb]:h-0",
          "[&::-ms-thumb]:border-none",
          className
        )
      ),
      "aria-label": "Audio progress",
      role: "slider",
      defaultValue: "0",
      ...restProps,
      type: "range",
      style: { "--range-progress": `${restProps.value ?? 0}%` }
    }
  );
}

function AudioPlayerProgressBar(props) {
  const { onChange, ref, ...restProps } = props;
  const { audioRef, progressBarRef } = useAudioPlayerContextRefs();
  const { isPlaying } = useAudioPlayerContextAudio();
  const { duration, seek } = useAudioPlayerContextTime();
  const { handleProgressChange } = useAudioPlayerProgressBar({
    audioRef,
    duration,
    isPlaying,
    onProgressChange: seek,
    progressBarRef
  });
  const handleChange = useCallback(
    (e) => {
      handleProgressChange(e);
      onChange?.(e);
    },
    [handleProgressChange, onChange]
  );
  const composedRef = useComposedRefs(progressBarRef, ref);
  return /* @__PURE__ */ jsx(
    AudioPlayerProgressBarPrimitive,
    {
      ...restProps,
      onChange: handleChange,
      ref: composedRef
    }
  );
}

/**
 * @module constants
 * @summary Useful constants
 * @description
 * Collection of useful date constants.
 *
 * The constants could be imported from `date-fns/constants`:
 *
 * ```ts
 * import { maxTime, minTime } from "./constants/date-fns/constants";
 *
 * function isAllowedTime(time) {
 *   return time <= maxTime && time >= minTime;
 * }
 * ```
 */


/**
 * @constant
 * @name millisecondsInDay
 * @summary Milliseconds in 1 day.
 */
const millisecondsInDay = 86400000;

/**
 * @constant
 * @name millisecondsInMinute
 * @summary Milliseconds in 1 minute
 */
const millisecondsInMinute = 60000;

/**
 * @constant
 * @name millisecondsInHour
 * @summary Milliseconds in 1 hour
 */
const millisecondsInHour = 3600000;

/**
 * @constant
 * @name constructFromSymbol
 * @summary Symbol enabling Date extensions to inherit properties from the reference date.
 *
 * The symbol is used to enable the `constructFrom` function to construct a date
 * using a reference date and a value. It allows to transfer extra properties
 * from the reference date to the new date. It's useful for extensions like
 * [`TZDate`](https://github.com/date-fns/tz) that accept a time zone as
 * a constructor argument.
 */
const constructFromSymbol = Symbol.for("constructDateFrom");

/**
 * @name constructFrom
 * @category Generic Helpers
 * @summary Constructs a date using the reference date and the value
 *
 * @description
 * The function constructs a new date using the constructor from the reference
 * date and the given value. It helps to build generic functions that accept
 * date extensions.
 *
 * It defaults to `Date` if the passed reference date is a number or a string.
 *
 * Starting from v3.7.0, it allows to construct a date using `[Symbol.for("constructDateFrom")]`
 * enabling to transfer extra properties from the reference date to the new date.
 * It's useful for extensions like [`TZDate`](https://github.com/date-fns/tz)
 * that accept a time zone as a constructor argument.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The reference date to take constructor from
 * @param value - The value to create the date
 *
 * @returns Date initialized using the given date and value
 *
 * @example
 * import { constructFrom } from "./constructFrom/date-fns";
 *
 * // A function that clones a date preserving the original type
 * function cloneDate<DateType extends Date>(date: DateType): DateType {
 *   return constructFrom(
 *     date, // Use constructor from the given date
 *     date.getTime() // Use the date value to create a new date
 *   );
 * }
 */
function constructFrom(date, value) {
  if (typeof date === "function") return date(value);

  if (date && typeof date === "object" && constructFromSymbol in date)
    return date[constructFromSymbol](value);

  if (date instanceof Date) return new date.constructor(value);

  return new Date(value);
}

/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * Starting from v3.7.0, it clones a date using `[Symbol.for("constructDateFrom")]`
 * enabling to transfer extra properties from the reference date to the new date.
 * It's useful for extensions like [`TZDate`](https://github.com/date-fns/tz)
 * that accept a time zone as a constructor argument.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param argument - The value to convert
 *
 * @returns The parsed date in the local time zone
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */
function toDate(argument, context) {
  // [TODO] Get rid of `toDate` or `constructFrom`?
  return constructFrom(argument, argument);
}

/**
 * The {@link addDays} function options.
 */

/**
 * @name addDays
 * @category Day Helpers
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of days to be added.
 * @param options - An object with options
 *
 * @returns The new date with the days added
 *
 * @example
 * // Add 10 days to 1 September 2014:
 * const result = addDays(new Date(2014, 8, 1), 10)
 * //=> Thu Sep 11 2014 00:00:00
 */
function addDays(date, amount, options) {
  const _date = toDate(date);
  if (isNaN(amount)) return constructFrom(date, NaN);

  // If 0 days, no-op to avoid changing times in the hour before end of DST
  if (!amount) return _date;

  _date.setDate(_date.getDate() + amount);
  return _date;
}

/**
 * The {@link addMonths} function options.
 */

/**
 * @name addMonths
 * @category Month Helpers
 * @summary Add the specified number of months to the given date.
 *
 * @description
 * Add the specified number of months to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of months to be added.
 * @param options - The options object
 *
 * @returns The new date with the months added
 *
 * @example
 * // Add 5 months to 1 September 2014:
 * const result = addMonths(new Date(2014, 8, 1), 5)
 * //=> Sun Feb 01 2015 00:00:00
 *
 * // Add one month to 30 January 2023:
 * const result = addMonths(new Date(2023, 0, 30), 1)
 * //=> Tue Feb 28 2023 00:00:00
 */
function addMonths(date, amount, options) {
  const _date = toDate(date);
  if (isNaN(amount)) return constructFrom(date, NaN);
  if (!amount) {
    // If 0 months, no-op to avoid changing times in the hour before end of DST
    return _date;
  }
  const dayOfMonth = _date.getDate();

  // The JS Date object supports date math by accepting out-of-bounds values for
  // month, day, etc. For example, new Date(2020, 0, 0) returns 31 Dec 2019 and
  // new Date(2020, 13, 1) returns 1 Feb 2021.  This is *almost* the behavior we
  // want except that dates will wrap around the end of a month, meaning that
  // new Date(2020, 13, 31) will return 3 Mar 2021 not 28 Feb 2021 as desired. So
  // we'll default to the end of the desired month by adding 1 to the desired
  // month and using a date of 0 to back up one day to the end of the desired
  // month.
  const endOfDesiredMonth = constructFrom(date, _date.getTime());
  endOfDesiredMonth.setMonth(_date.getMonth() + amount + 1, 0);
  const daysInMonth = endOfDesiredMonth.getDate();
  if (dayOfMonth >= daysInMonth) {
    // If we're already at the end of the month, then this is the correct date
    // and we're done.
    return endOfDesiredMonth;
  } else {
    // Otherwise, we now know that setting the original day-of-month value won't
    // cause an overflow, so set the desired day-of-month. Note that we can't
    // just set the date of `endOfDesiredMonth` because that object may have had
    // its time changed in the unusual case where where a DST transition was on
    // the last day of the month and its local time was in the hour skipped or
    // repeated next to a DST transition.  So we use `date` instead which is
    // guaranteed to still have the original time.
    _date.setFullYear(
      endOfDesiredMonth.getFullYear(),
      endOfDesiredMonth.getMonth(),
      dayOfMonth,
    );
    return _date;
  }
}

/**
 * The {@link add} function options.
 */

/**
 * @name add
 * @category Common Helpers
 * @summary Add the specified years, months, weeks, days, hours, minutes, and seconds to the given date.
 *
 * @description
 * Add the specified years, months, weeks, days, hours, minutes, and seconds to the given date.
 *
 * @typeParam DateType - The `Date` type the function operates on. Gets inferred from passed arguments. Allows using extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param duration - The object with years, months, weeks, days, hours, minutes, and seconds to be added.
 * @param options - An object with options
 *
 * @returns The new date with the seconds added
 *
 * @example
 * // Add the following duration to 1 September 2014, 10:19:50
 * const result = add(new Date(2014, 8, 1, 10, 19, 50), {
 *   years: 2,
 *   months: 9,
 *   weeks: 1,
 *   days: 7,
 *   hours: 5,
 *   minutes: 9,
 *   seconds: 30,
 * })
 * //=> Thu Jun 15 2017 15:29:20
 */
function add(date, duration, options) {
  const {
    years = 0,
    months = 0,
    weeks = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
  } = duration;

  // Add years and months
  const _date = toDate(date);
  const dateWithMonths =
    months || years ? addMonths(_date, months + years * 12) : _date;

  // Add weeks and days
  const dateWithDays =
    days || weeks ? addDays(dateWithMonths, days + weeks * 7) : dateWithMonths;

  // Add days, hours, minutes, and seconds
  const minutesToAdd = minutes + hours * 60;
  const secondsToAdd = seconds + minutesToAdd * 60;
  const msToAdd = secondsToAdd * 1000;

  return constructFrom(date, +dateWithDays + msToAdd);
}

/**
 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
 * They usually appear for dates that denote time before the timezones were introduced
 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
 * and GMT+01:00:00 after that date)
 *
 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
 * which would lead to incorrect calculations.
 *
 * This function returns the timezone offset in milliseconds that takes seconds in account.
 */
function getTimezoneOffsetInMilliseconds(date) {
  const _date = toDate(date);
  const utcDate = new Date(
    Date.UTC(
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate(),
      _date.getHours(),
      _date.getMinutes(),
      _date.getSeconds(),
      _date.getMilliseconds(),
    ),
  );
  utcDate.setUTCFullYear(_date.getFullYear());
  return +date - +utcDate;
}

function normalizeDates(context, ...dates) {
  const normalize = constructFrom.bind(
    null,
    dates.find((date) => typeof date === "object"),
  );
  return dates.map(normalize);
}

/**
 * The {@link startOfDay} function options.
 */

/**
 * @name startOfDay
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - The options
 *
 * @returns The start of a day
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
function startOfDay(date, options) {
  const _date = toDate(date);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

/**
 * The {@link differenceInCalendarDays} function options.
 */

/**
 * @name differenceInCalendarDays
 * @category Day Helpers
 * @summary Get the number of calendar days between the given dates.
 *
 * @description
 * Get the number of calendar days between the given dates. This means that the times are removed
 * from the dates and then the difference in days is calculated.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - The options object
 *
 * @returns The number of calendar days
 *
 * @example
 * // How many calendar days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * const result = differenceInCalendarDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 366
 * // How many calendar days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * const result = differenceInCalendarDays(
 *   new Date(2011, 6, 3, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 1
 */
function differenceInCalendarDays(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate,
  );

  const laterStartOfDay = startOfDay(laterDate_);
  const earlierStartOfDay = startOfDay(earlierDate_);

  const laterTimestamp =
    +laterStartOfDay - getTimezoneOffsetInMilliseconds(laterStartOfDay);
  const earlierTimestamp =
    +earlierStartOfDay - getTimezoneOffsetInMilliseconds(earlierStartOfDay);

  // Round the number of days to the nearest integer because the number of
  // milliseconds in a day is not constant (e.g. it's different in the week of
  // the daylight saving time clock shift).
  return Math.round((laterTimestamp - earlierTimestamp) / millisecondsInDay);
}

/**
 * @name compareAsc
 * @category Common Helpers
 * @summary Compare the two dates and return -1, 0 or 1.
 *
 * @description
 * Compare the two dates and return 1 if the first date is after the second,
 * -1 if the first date is before the second or 0 if dates are equal.
 *
 * @param dateLeft - The first date to compare
 * @param dateRight - The second date to compare
 *
 * @returns The result of the comparison
 *
 * @example
 * // Compare 11 February 1987 and 10 July 1989:
 * const result = compareAsc(new Date(1987, 1, 11), new Date(1989, 6, 10))
 * //=> -1
 *
 * @example
 * // Sort the array of dates:
 * const result = [
 *   new Date(1995, 6, 2),
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * ].sort(compareAsc)
 * //=> [
 * //   Wed Feb 11 1987 00:00:00,
 * //   Mon Jul 10 1989 00:00:00,
 * //   Sun Jul 02 1995 00:00:00
 * // ]
 */
function compareAsc(dateLeft, dateRight) {
  const diff = +toDate(dateLeft) - +toDate(dateRight);

  if (diff < 0) return -1;
  else if (diff > 0) return 1;

  // Return 0 if diff is 0; return NaN if diff is NaN
  return diff;
}

/**
 * The {@link differenceInCalendarMonths} function options.
 */

/**
 * @name differenceInCalendarMonths
 * @category Month Helpers
 * @summary Get the number of calendar months between the given dates.
 *
 * @description
 * Get the number of calendar months between the given dates.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options
 *
 * @returns The number of calendar months
 *
 * @example
 * // How many calendar months are between 31 January 2014 and 1 September 2014?
 * const result = differenceInCalendarMonths(
 *   new Date(2014, 8, 1),
 *   new Date(2014, 0, 31)
 * )
 * //=> 8
 */
function differenceInCalendarMonths(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate,
  );

  const yearsDiff = laterDate_.getFullYear() - earlierDate_.getFullYear();
  const monthsDiff = laterDate_.getMonth() - earlierDate_.getMonth();

  return yearsDiff * 12 + monthsDiff;
}

/**
 * The {@link differenceInCalendarYears} function options.
 */

/**
 * @name differenceInCalendarYears
 * @category Year Helpers
 * @summary Get the number of calendar years between the given dates.
 *
 * @description
 * Get the number of calendar years between the given dates.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options

 * @returns The number of calendar years
 *
 * @example
 * // How many calendar years are between 31 December 2013 and 11 February 2015?
 * const result = differenceInCalendarYears(
 *   new Date(2015, 1, 11),
 *   new Date(2013, 11, 31)
 * );
 * //=> 2
 */
function differenceInCalendarYears(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate,
  );
  return laterDate_.getFullYear() - earlierDate_.getFullYear();
}

/**
 * The {@link differenceInDays} function options.
 */

/**
 * @name differenceInDays
 * @category Day Helpers
 * @summary Get the number of full days between the given dates.
 *
 * @description
 * Get the number of full day periods between two dates. Fractional days are
 * truncated towards zero.
 *
 * One "full day" is the distance between a local time in one day to the same
 * local time on the next or previous day. A full day can sometimes be less than
 * or more than 24 hours if a daylight savings change happens between two dates.
 *
 * To ignore DST and only measure exact 24-hour periods, use this instead:
 * `Math.trunc(differenceInHours(dateLeft, dateRight)/24)|0`.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options
 *
 * @returns The number of full days according to the local timezone
 *
 * @example
 * // How many full days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * const result = differenceInDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 365
 *
 * @example
 * // How many full days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * const result = differenceInDays(
 *   new Date(2011, 6, 3, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 0
 *
 * @example
 * // How many full days are between
 * // 1 March 2020 0:00 and 1 June 2020 0:00 ?
 * // Note: because local time is used, the
 * // result will always be 92 days, even in
 * // time zones where DST starts and the
 * // period has only 92*24-1 hours.
 * const result = differenceInDays(
 *   new Date(2020, 5, 1),
 *   new Date(2020, 2, 1)
 * )
 * //=> 92
 */
function differenceInDays(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate,
  );

  const sign = compareLocalAsc(laterDate_, earlierDate_);
  const difference = Math.abs(
    differenceInCalendarDays(laterDate_, earlierDate_),
  );

  laterDate_.setDate(laterDate_.getDate() - sign * difference);

  // Math.abs(diff in full days - diff in calendar days) === 1 if last calendar day is not full
  // If so, result must be decreased by 1 in absolute value
  const isLastDayNotFull = Number(
    compareLocalAsc(laterDate_, earlierDate_) === -sign,
  );

  const result = sign * (difference - isLastDayNotFull);
  // Prevent negative zero
  return result === 0 ? 0 : result;
}

// Like `compareAsc` but uses local time not UTC, which is needed
// for accurate equality comparisons of UTC timestamps that end up
// having the same representation in local time, e.g. one hour before
// DST ends vs. the instant that DST ends.
function compareLocalAsc(laterDate, earlierDate) {
  const diff =
    laterDate.getFullYear() - earlierDate.getFullYear() ||
    laterDate.getMonth() - earlierDate.getMonth() ||
    laterDate.getDate() - earlierDate.getDate() ||
    laterDate.getHours() - earlierDate.getHours() ||
    laterDate.getMinutes() - earlierDate.getMinutes() ||
    laterDate.getSeconds() - earlierDate.getSeconds() ||
    laterDate.getMilliseconds() - earlierDate.getMilliseconds();

  if (diff < 0) return -1;
  if (diff > 0) return 1;

  // Return 0 if diff is 0; return NaN if diff is NaN
  return diff;
}

function getRoundingMethod(method) {
  return (number) => {
    const round = method ? Math[method] : Math.trunc;
    const result = round(number);
    // Prevent negative zero
    return result === 0 ? 0 : result;
  };
}

/**
 * The {@link differenceInHours} function options.
 */

/**
 * @name differenceInHours
 * @category Hour Helpers
 * @summary Get the number of hours between the given dates.
 *
 * @description
 * Get the number of hours between the given dates.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options.
 *
 * @returns The number of hours
 *
 * @example
 * // How many hours are between 2 July 2014 06:50:00 and 2 July 2014 19:00:00?
 * const result = differenceInHours(
 *   new Date(2014, 6, 2, 19, 0),
 *   new Date(2014, 6, 2, 6, 50)
 * )
 * //=> 12
 */
function differenceInHours(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate,
  );
  const diff = (+laterDate_ - +earlierDate_) / millisecondsInHour;
  return getRoundingMethod(options?.roundingMethod)(diff);
}

/**
 * @name differenceInMilliseconds
 * @category Millisecond Helpers
 * @summary Get the number of milliseconds between the given dates.
 *
 * @description
 * Get the number of milliseconds between the given dates.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 *
 * @returns The number of milliseconds
 *
 * @example
 * // How many milliseconds are between
 * // 2 July 2014 12:30:20.600 and 2 July 2014 12:30:21.700?
 * const result = differenceInMilliseconds(
 *   new Date(2014, 6, 2, 12, 30, 21, 700),
 *   new Date(2014, 6, 2, 12, 30, 20, 600)
 * )
 * //=> 1100
 */
function differenceInMilliseconds(laterDate, earlierDate) {
  return +toDate(laterDate) - +toDate(earlierDate);
}

/**
 * The {@link differenceInMinutes} function options.
 */

/**
 * @name differenceInMinutes
 * @category Minute Helpers
 * @summary Get the number of minutes between the given dates.
 *
 * @description
 * Get the signed number of full (rounded towards 0) minutes between the given dates.
 *
 * @param dateLeft - The later date
 * @param dateRight - The earlier date
 * @param options - An object with options.
 *
 * @returns The number of minutes
 *
 * @example
 * // How many minutes are between 2 July 2014 12:07:59 and 2 July 2014 12:20:00?
 * const result = differenceInMinutes(
 *   new Date(2014, 6, 2, 12, 20, 0),
 *   new Date(2014, 6, 2, 12, 7, 59)
 * )
 * //=> 12
 *
 * @example
 * // How many minutes are between 10:01:59 and 10:00:00
 * const result = differenceInMinutes(
 *   new Date(2000, 0, 1, 10, 0, 0),
 *   new Date(2000, 0, 1, 10, 1, 59)
 * )
 * //=> -1
 */
function differenceInMinutes(dateLeft, dateRight, options) {
  const diff =
    differenceInMilliseconds(dateLeft, dateRight) / millisecondsInMinute;
  return getRoundingMethod(options?.roundingMethod)(diff);
}

/**
 * The {@link endOfDay} function options.
 */

/**
 * @name endOfDay
 * @category Day Helpers
 * @summary Return the end of a day for the given date.
 *
 * @description
 * Return the end of a day for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of a day
 *
 * @example
 * // The end of a day for 2 September 2014 11:55:00:
 * const result = endOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 23:59:59.999
 */
function endOfDay(date, options) {
  const _date = toDate(date);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

/**
 * The {@link endOfMonth} function options.
 */

/**
 * @name endOfMonth
 * @category Month Helpers
 * @summary Return the end of a month for the given date.
 *
 * @description
 * Return the end of a month for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of a month
 *
 * @example
 * // The end of a month for 2 September 2014 11:55:00:
 * const result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */
function endOfMonth(date, options) {
  const _date = toDate(date);
  const month = _date.getMonth();
  _date.setFullYear(_date.getFullYear(), month + 1, 0);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

/**
 * @name isLastDayOfMonth
 * @category Month Helpers
 * @summary Is the given date the last day of a month?
 *
 * @description
 * Is the given date the last day of a month?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is the last day of a month
 *
 * @example
 * // Is 28 February 2014 the last day of a month?
 * const result = isLastDayOfMonth(new Date(2014, 1, 28))
 * //=> true
 */
function isLastDayOfMonth(date, options) {
  const _date = toDate(date);
  return +endOfDay(_date) === +endOfMonth(_date);
}

/**
 * The {@link differenceInMonths} function options.
 */

/**
 * @name differenceInMonths
 * @category Month Helpers
 * @summary Get the number of full months between the given dates.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options
 *
 * @returns The number of full months
 *
 * @example
 * // How many full months are between 31 January 2014 and 1 September 2014?
 * const result = differenceInMonths(new Date(2014, 8, 1), new Date(2014, 0, 31))
 * //=> 7
 */
function differenceInMonths(laterDate, earlierDate, options) {
  const [laterDate_, workingLaterDate, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    laterDate,
    earlierDate,
  );

  const sign = compareAsc(workingLaterDate, earlierDate_);
  const difference = Math.abs(
    differenceInCalendarMonths(workingLaterDate, earlierDate_),
  );

  if (difference < 1) return 0;

  if (workingLaterDate.getMonth() === 1 && workingLaterDate.getDate() > 27)
    workingLaterDate.setDate(30);

  workingLaterDate.setMonth(workingLaterDate.getMonth() - sign * difference);

  let isLastMonthNotFull = compareAsc(workingLaterDate, earlierDate_) === -sign;

  if (
    isLastDayOfMonth(laterDate_) &&
    difference === 1 &&
    compareAsc(laterDate_, earlierDate_) === 1
  ) {
    isLastMonthNotFull = false;
  }

  const result = sign * (difference - +isLastMonthNotFull);
  return result === 0 ? 0 : result;
}

/**
 * The {@link differenceInSeconds} function options.
 */

/**
 * @name differenceInSeconds
 * @category Second Helpers
 * @summary Get the number of seconds between the given dates.
 *
 * @description
 * Get the number of seconds between the given dates.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options.
 *
 * @returns The number of seconds
 *
 * @example
 * // How many seconds are between
 * // 2 July 2014 12:30:07.999 and 2 July 2014 12:30:20.000?
 * const result = differenceInSeconds(
 *   new Date(2014, 6, 2, 12, 30, 20, 0),
 *   new Date(2014, 6, 2, 12, 30, 7, 999)
 * )
 * //=> 12
 */
function differenceInSeconds(laterDate, earlierDate, options) {
  const diff = differenceInMilliseconds(laterDate, earlierDate) / 1000;
  return getRoundingMethod(options?.roundingMethod)(diff);
}

/**
 * The {@link differenceInYears} function options.
 */

/**
 * @name differenceInYears
 * @category Year Helpers
 * @summary Get the number of full years between the given dates.
 *
 * @description
 * Get the number of full years between the given dates.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options
 *
 * @returns The number of full years
 *
 * @example
 * // How many full years are between 31 December 2013 and 11 February 2015?
 * const result = differenceInYears(new Date(2015, 1, 11), new Date(2013, 11, 31))
 * //=> 1
 */
function differenceInYears(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate,
  );

  // -1 if the left date is earlier than the right date
  // 2023-12-31 - 2024-01-01 = -1
  const sign = compareAsc(laterDate_, earlierDate_);

  // First calculate the difference in calendar years
  // 2024-01-01 - 2023-12-31 = 1 year
  const diff = Math.abs(differenceInCalendarYears(laterDate_, earlierDate_));

  // Now we need to calculate if the difference is full. To do that we set
  // both dates to the same year and check if the both date's month and day
  // form a full year.
  laterDate_.setFullYear(1584);
  earlierDate_.setFullYear(1584);

  // For it to be true, when the later date is indeed later than the earlier date
  // (2026-02-01 - 2023-12-10 = 3 years), the difference is full if
  // the normalized later date is also later than the normalized earlier date.
  // In our example, 1584-02-01 is earlier than 1584-12-10, so the difference
  // is partial, hence we need to subtract 1 from the difference 3 - 1 = 2.
  const partial = compareAsc(laterDate_, earlierDate_) === -sign;

  const result = sign * (diff - +partial);

  // Prevent negative zero
  return result === 0 ? 0 : result;
}

function normalizeInterval(context, interval) {
  const [start, end] = normalizeDates(context, interval.start, interval.end);
  return { start, end };
}

/**
 * The {@link intervalToDuration} function options.
 */

/**
 * @name intervalToDuration
 * @category Common Helpers
 * @summary Convert interval to duration
 *
 * @description
 * Convert an interval object to a duration object.
 *
 * @param interval - The interval to convert to duration
 * @param options - The context options
 *
 * @returns The duration object
 *
 * @example
 * // Get the duration between January 15, 1929 and April 4, 1968.
 * intervalToDuration({
 *   start: new Date(1929, 0, 15, 12, 0, 0),
 *   end: new Date(1968, 3, 4, 19, 5, 0)
 * });
 * //=> { years: 39, months: 2, days: 20, hours: 7, minutes: 5, seconds: 0 }
 */
function intervalToDuration(interval, options) {
  const { start, end } = normalizeInterval(options?.in, interval);
  const duration = {};

  const years = differenceInYears(end, start);
  if (years) duration.years = years;

  const remainingMonths = add(start, { years: duration.years });
  const months = differenceInMonths(end, remainingMonths);
  if (months) duration.months = months;

  const remainingDays = add(remainingMonths, { months: duration.months });
  const days = differenceInDays(end, remainingDays);
  if (days) duration.days = days;

  const remainingHours = add(remainingDays, { days: duration.days });
  const hours = differenceInHours(end, remainingHours);
  if (hours) duration.hours = hours;

  const remainingMinutes = add(remainingHours, { hours: duration.hours });
  const minutes = differenceInMinutes(end, remainingMinutes);
  if (minutes) duration.minutes = minutes;

  const remainingSeconds = add(remainingMinutes, { minutes: duration.minutes });
  const seconds = differenceInSeconds(end, remainingSeconds);
  if (seconds) duration.seconds = seconds;

  return duration;
}

function isDefined(argument) {
  return argument !== void 0;
}
function formatAudioDurationForDisplay(audioDurationInSeconds = 0) {
  const {
    hours,
    minutes = 0,
    seconds = 0
  } = intervalToDuration({
    start: 0,
    end: audioDurationInSeconds * 1e3
  });
  const formatWithZero = (num) => String(num).padStart(2, "0");
  return [hours, minutes, seconds].filter(isDefined).map(formatWithZero).join(":");
}
function useAudioPlayerTime(props) {
  const { currentTime, duration } = props;
  return {
    currentTimeDisplay: formatAudioDurationForDisplay(currentTime),
    durationDisplay: formatAudioDurationForDisplay(duration)
  };
}

function AudioPlayerTimePrimitive(props) {
  const { as: Element = "span", className, children, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    Element,
    {
      className: twMerge(
        clsx("inline-block font-mono text-sm tabular-nums", "min-w-[6ch]", "text-right", className)
      ),
      ...restProps,
      children
    }
  );
}

function AudioPlayerTime(props) {
  const { currentTime, duration } = useAudioPlayerContextTime();
  const { currentTimeDisplay, durationDisplay } = useAudioPlayerTime({ currentTime, duration });
  return /* @__PURE__ */ jsxs(AudioPlayerTimePrimitive, { ...props, children: [
    currentTimeDisplay,
    " / ",
    durationDisplay
  ] });
}

function AudioPlayerTitlePrimitive(props) {
  const { as: Element = "p", children, className, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    Element,
    {
      className: twMerge(clsx("line-clamp-1 font-bold lg:max-w-64 lg:truncate", className)),
      ...restProps,
      children
    }
  );
}

function AudioPlayerTitle(props) {
  const { currentTrack: { title } = {} } = useAudioPlayerContextTrack();
  if (!title) return null;
  return /* @__PURE__ */ jsx(
    AudioPlayerTitlePrimitive,
    {
      title,
      ...props,
      children: title
    }
  );
}

function AudioPlayerVolume(props) {
  const { as: Element = "div", className, children, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    Element,
    {
      className: twMerge(clsx("flex items-center gap-2", className)),
      ...restProps,
      children
    }
  );
}

function AudioPlayerControlButton(props) {
  const { active = false, className, children, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    "button",
    {
      className: twMerge(
        clsx(
          "rounded-md p-2 focus-within:outline-white hover:bg-black/30 focus:bg-black/30",
          active && "bg-black/30",
          className
        )
      ),
      ...restProps,
      children
    }
  );
}

function AudioPlayerVolumeButtonPrimitive(props) {
  const { iconName, title, className, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    AudioPlayerControlButton,
    {
      className: twMerge(clsx("text-2xl", className)),
      title,
      ...restProps,
      children: /* @__PURE__ */ jsx(Icon, { name: iconName })
    }
  );
}

const VOLUME_ICON_PROPERTIES = {
  MUTE: { name: "volume-mute-fill", label: "Volume Muted" },
  LOW: { name: "volume-down-fill", label: "Volume Low" },
  HIGH: { name: "volume-up-fill", label: "Volume High" }
};
function getVolumeIconProperties(volume, isMuted) {
  if (isMuted || volume < 5) return VOLUME_ICON_PROPERTIES.MUTE;
  if (volume >= 40) return VOLUME_ICON_PROPERTIES.HIGH;
  return VOLUME_ICON_PROPERTIES.LOW;
}
function AudioPlayerVolumeButton(props) {
  const { onClick, ...restProps } = props;
  const { mute, volume, toggleMute } = useAudioPlayerContextAudio();
  const handleClick = useCallback(
    (e) => {
      onClick?.(e);
      toggleMute();
    },
    [onClick, toggleMute]
  );
  const { name, label } = getVolumeIconProperties(volume, mute);
  return /* @__PURE__ */ jsx(
    AudioPlayerVolumeButtonPrimitive,
    {
      ...restProps,
      "aria-label": mute ? "Unmute" : "Mute",
      "aria-pressed": mute,
      onClick: handleClick,
      iconName: name,
      title: label
    }
  );
}

function AudioPlayerVolumeSliderPrimitive(props) {
  const { className, min = 0, max = 100, value, orientation = "horizontal", ...restProps } = props;
  return /* @__PURE__ */ jsx(
    "input",
    {
      className: twMerge(
        clsx(
          "[--volume-value:0%]",
          "appearance-none",
          "bg-gray-500",
          "relative",
          "cursor-pointer",
          "focus-within:outline-white",
          orientation === "horizontal" ? ["w-full", "h-2"] : ["[writing-mode:bt-lr]", "[appearance:slider-vertical]", "h-32", "w-2"],
          // Progress bar styles
          "before:block",
          "before:w-(--volume-value)",
          "before:bg-neutral-100",
          `before:content-['']`,
          "before:absolute",
          "before:top-0",
          "before:left-0",
          "before:h-full",
          // WebKit track styles
          "[&::-webkit-slider-runnable-track]:bg-transparent",
          "[&::-webkit-slider-runnable-track]:appearance-none",
          "[&::-webkit-slider-runnable-track]:shadow-none",
          "[&::-webkit-slider-runnable-track]:border-transparent",
          // WebKit thumb (hidden)
          "[&::-webkit-slider-thumb]:appearance-none",
          "[&::-webkit-slider-thumb]:w-0",
          "[&::-webkit-slider-thumb]:h-0",
          "[&::-webkit-slider-thumb]:border-none",
          // Firefox track styles
          "[&::-moz-range-track]:bg-transparent",
          "[&::-moz-range-track]:appearance-none",
          "[&::-moz-range-track]:border-none",
          "[&::-moz-range-progress]:appearance-none",
          "[&::-moz-range-progress]:bg-neutral-100",
          "[&::-moz-range-progress]:h-2",
          // Firefox thumb (hidden)
          "[&::-moz-range-thumb]:appearance-none",
          "[&::-moz-range-thumb]:w-0",
          "[&::-moz-range-thumb]:h-0",
          "[&::-moz-range-thumb]:border-none",
          // IE/Edge track styles
          "[&::-ms-track]:bg-transparent",
          "[&::-ms-track]:appearance-none",
          "[&::-ms-track]:border-none",
          "[&::-ms-fill-lower]:bg-neutral-100",
          "[&::-ms-fill-upper]:bg-gray-500",
          // IE/Edge thumb (hidden)
          "[&::-ms-thumb]:appearance-none",
          "[&::-ms-thumb]:w-0",
          "[&::-ms-thumb]:h-0",
          "[&::-ms-thumb]:border-none",
          className
        )
      ),
      type: "range",
      min,
      max,
      value,
      "aria-label": "Volume Control",
      role: "slider",
      "aria-valuemin": min,
      "aria-valuemax": max,
      "aria-valuenow": value,
      "aria-valuetext": `Volume ${value}%`,
      "aria-orientation": orientation,
      style: { "--volume-value": `${value}%` },
      ...restProps
    }
  );
}

function updateAudioVolume(audio, volume) {
  if (!audio) return;
  audio.volume = volume / 100;
}
function AudioPlayerVolumeSlider(props) {
  const { onChange, ...restProps } = props;
  const { volume, setVolume } = useAudioPlayerContextAudio();
  const { audioRef } = useAudioPlayerContextRefs();
  const handleVolumeChange = useCallback(
    (e) => {
      const newVolume = Number(e.target.value);
      setVolume(newVolume);
      onChange?.(e);
      updateAudioVolume(audioRef.current, newVolume);
    },
    [onChange, setVolume, audioRef]
  );
  return /* @__PURE__ */ jsx(
    AudioPlayerVolumeSliderPrimitive,
    {
      ...restProps,
      value: volume,
      onChange: handleVolumeChange
    }
  );
}

function useAudioPlayerMetadata({
  audioRef,
  progressBarRef,
  onDurationChange
}) {
  const handleLoadedMetadata = useCallback(() => {
    const seconds = audioRef.current?.duration;
    if (typeof seconds !== "undefined") {
      onDurationChange(seconds);
      if (progressBarRef.current) {
        progressBarRef.current.max = seconds.toString();
      }
    }
  }, [audioRef, progressBarRef, onDurationChange]);
  return { handleLoadedMetadata };
}

function AudioPlayerControlAudioPrimitive(props) {
  return /* @__PURE__ */ jsx("audio", { ...props });
}

function AudioPlayerControlAudio(props) {
  const { onLoadedMetadata, ref, ...restProps } = props;
  const { audioRef, progressBarRef } = useAudioPlayerContextRefs();
  const { setDuration } = useAudioPlayerContextTime();
  const { currentTrack } = useAudioPlayerContextTrack();
  const { mute } = useAudioPlayerContextAudio();
  const { handleLoadedMetadata } = useAudioPlayerMetadata({
    audioRef,
    progressBarRef,
    onDurationChange: setDuration
  });
  const handleMetadata = useCallback(
    (event) => {
      handleLoadedMetadata();
      onLoadedMetadata?.(event);
    },
    [handleLoadedMetadata, onLoadedMetadata]
  );
  const composedRef = useComposedRefs(audioRef, ref);
  return /* @__PURE__ */ jsx(
    AudioPlayerControlAudioPrimitive,
    {
      ...restProps,
      ref: composedRef,
      src: currentTrack?.src,
      onLoadedMetadata: handleMetadata,
      muted: mute
    }
  );
}

function useAudioPlayerControlPlay(props) {
  const { isPlaying, audioRef, currentTrackIndex } = props;
  useEffect(() => {
    isPlaying ? audioRef?.current?.play() : audioRef?.current?.pause();
  }, [audioRef, isPlaying, currentTrackIndex]);
}

function AudioPlayerControlPlayPrimitive(props) {
  const { active = false, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    AudioPlayerControlButton,
    {
      "aria-label": active ? "Pause" : "Play",
      "aria-pressed": active,
      ...restProps,
      children: /* @__PURE__ */ jsx(Icon, { name: active ? "pause-large-fill" : "play-large-fill" })
    }
  );
}

function AudioPlayerControlPlay(props) {
  const { onClick, ...restProps } = props;
  const { isPlaying, togglePlay } = useAudioPlayerContextAudio();
  const { audioRef } = useAudioPlayerContextRefs();
  const { currentTrackIndex } = useAudioPlayerContextTrack();
  useAudioPlayerControlPlay({
    isPlaying,
    audioRef,
    currentTrackIndex
  });
  const handleClick = useCallback(
    (e) => {
      togglePlay();
      onClick?.(e);
    },
    [togglePlay, onClick]
  );
  return /* @__PURE__ */ jsx(
    AudioPlayerControlPlayPrimitive,
    {
      active: isPlaying,
      onClick: handleClick,
      ...restProps
    }
  );
}

function getNextIndex(currentIndex, tracksLength, direction) {
  return (currentIndex + direction + tracksLength) % tracksLength;
}
function getRandomNumber(min, max, excludeArray = []) {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  if (excludeArray.includes(randomNumber)) {
    return getRandomNumber(min, max, excludeArray);
  }
  return randomNumber;
}

function useAudioPlayerPreviousTrack({
  loop,
  shuffle,
  currentTrackIndex,
  tracksLength,
  onTimeChange,
  onTrackIndexChange,
  audioRef
}) {
  const handlePreviousTrack = useCallback(() => {
    if (audioRef?.current?.currentTime >= 1 || loop) {
      onTimeChange(0);
      audioRef.current.currentTime = 0;
      return;
    }
    if (shuffle) {
      const previousIndex2 = getRandomNumber(0, tracksLength - 1, [currentTrackIndex]);
      return onTrackIndexChange(previousIndex2);
    }
    const previousIndex = getNextIndex(currentTrackIndex, tracksLength, -1);
    onTrackIndexChange(previousIndex);
  }, [currentTrackIndex, loop, onTimeChange, onTrackIndexChange, tracksLength, audioRef, shuffle]);
  return {
    handlePreviousTrack
  };
}

function AudioPlayerControlPreviousPrimitive(props) {
  return /* @__PURE__ */ jsx(
    AudioPlayerControlButton,
    {
      "aria-label": "Previous Track",
      ...props,
      children: /* @__PURE__ */ jsx(
        Icon,
        {
          name: "rewind-start-fill",
          className: "scale-90"
        }
      )
    }
  );
}

function AudioPlayerControlPrevious(props) {
  const { onClick, ...restProps } = props;
  const { seek } = useAudioPlayerContextTime();
  const { currentTrackIndex, tracks, setTrackIndex } = useAudioPlayerContextTrack();
  const { loop, shuffle } = useAudioPlayerContextAudio();
  const { audioRef } = useAudioPlayerContextRefs();
  const { handlePreviousTrack } = useAudioPlayerPreviousTrack({
    loop,
    shuffle,
    currentTrackIndex,
    tracksLength: tracks.length,
    onTimeChange: seek,
    onTrackIndexChange: setTrackIndex,
    audioRef
  });
  const handleClick = useCallback(
    (e) => {
      handlePreviousTrack();
      onClick?.(e);
    },
    [handlePreviousTrack, onClick]
  );
  return /* @__PURE__ */ jsx(
    AudioPlayerControlPreviousPrimitive,
    {
      onClick: handleClick,
      ...restProps
    }
  );
}

function useAudioPlayerNextTrack({
  loop,
  shuffle,
  currentTrackIndex,
  tracksLength,
  onTimeChange,
  onTrackIndexChange,
  audioRef
}) {
  const handleNextTrack = useCallback(() => {
    if (loop) {
      onTimeChange(0);
      audioRef.current.currentTime = 0;
      return;
    }
    if (shuffle) {
      const nextIndex2 = getRandomNumber(0, tracksLength - 1, [currentTrackIndex]);
      return onTrackIndexChange(nextIndex2);
    }
    const nextIndex = getNextIndex(currentTrackIndex, tracksLength, 1);
    onTrackIndexChange(nextIndex);
  }, [currentTrackIndex, loop, onTimeChange, onTrackIndexChange, tracksLength, audioRef, shuffle]);
  useEffect(() => {
    const currentAudioRef = audioRef.current;
    if (!currentAudioRef) return;
    const handleEnded = () => {
      if (loop) {
        currentAudioRef.play();
        return;
      }
      handleNextTrack();
    };
    currentAudioRef.addEventListener("ended", handleEnded);
    return () => {
      currentAudioRef.removeEventListener("ended", handleEnded);
    };
  }, [audioRef, handleNextTrack, loop]);
  return {
    handleNextTrack
  };
}

function AudioPlayerControlNextPrimitive(props) {
  return /* @__PURE__ */ jsx(
    AudioPlayerControlButton,
    {
      "aria-label": "Next Track",
      ...props,
      children: /* @__PURE__ */ jsx(
        Icon,
        {
          name: "forward-end-fill",
          className: "scale-90"
        }
      )
    }
  );
}

function AudioPlayerControlNext(props) {
  const { onClick, ...restProps } = props;
  const { audioRef } = useAudioPlayerContextRefs();
  const { seek } = useAudioPlayerContextTime();
  const { currentTrackIndex, tracks, setTrackIndex } = useAudioPlayerContextTrack();
  const { loop, shuffle } = useAudioPlayerContextAudio();
  const { handleNextTrack } = useAudioPlayerNextTrack({
    loop,
    shuffle,
    currentTrackIndex,
    tracksLength: tracks.length,
    onTimeChange: seek,
    onTrackIndexChange: setTrackIndex,
    audioRef
  });
  const handleClick = useCallback(
    (e) => {
      handleNextTrack();
      onClick?.(e);
    },
    [handleNextTrack, onClick]
  );
  return /* @__PURE__ */ jsx(
    AudioPlayerControlNextPrimitive,
    {
      onClick: handleClick,
      ...restProps
    }
  );
}

function AudioPlayerControlShufflePrimitive(props) {
  const { active = false, className, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    AudioPlayerControlButton,
    {
      className: twMerge(
        clsx(
          { "text-neutral-100/50": !active },
          "hover:text-neutral-100",
          "focus:text-neutral-100",
          className
        )
      ),
      "aria-label": "Toggle Shuffle",
      "aria-pressed": active,
      ...restProps,
      children: /* @__PURE__ */ jsx(
        Icon,
        {
          name: "shuffle-fill",
          className: "scale-75"
        }
      )
    }
  );
}

function AudioPlayerControlShuffle(props) {
  const { onClick, ...restProps } = props;
  const { shuffle, toggleShuffle } = useAudioPlayerContextAudio();
  const handleClick = useCallback(
    (e) => {
      toggleShuffle();
      onClick?.(e);
    },
    [toggleShuffle, onClick]
  );
  return /* @__PURE__ */ jsx(
    AudioPlayerControlShufflePrimitive,
    {
      active: shuffle,
      onClick: handleClick,
      ...restProps
    }
  );
}

function AudioPlayerControlLoopPrimitive(props) {
  const { active = false, className, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    AudioPlayerControlButton,
    {
      className: twMerge(
        clsx(
          { "text-neutral-100/50": !active },
          "hover:text-neutral-100",
          "focus-within:text-neutral-100",
          className
        )
      ),
      "aria-label": "Toggle Loop",
      "aria-pressed": active,
      ...restProps,
      children: /* @__PURE__ */ jsx(
        Icon,
        {
          name: active ? "repeat-one-fill" : "repeat-2-fill",
          className: "scale-75"
        }
      )
    }
  );
}

function AudioPlayerControlLoop(props) {
  const { onClick, ...restProps } = props;
  const { loop, toggleLoop } = useAudioPlayerContextAudio();
  const handleClick = useCallback(
    (e) => {
      toggleLoop();
      onClick?.(e);
    },
    [toggleLoop, onClick]
  );
  return /* @__PURE__ */ jsx(
    AudioPlayerControlLoopPrimitive,
    {
      active: loop,
      onClick: handleClick,
      ...restProps
    }
  );
}

function AudioPlayer(props) {
  const { as: Element = "div", children, className, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    Element,
    {
      className: twMerge(
        clsx(
          "flex flex-col justify-center overflow-hidden rounded-md bg-slate-700 text-neutral-100"
        ),
        className
      ),
      tabIndex: -1,
      ...restProps,
      children
    }
  );
}

const AudioPlayerCompoundComponent = {
  Root: Object.assign(AudioPlayer, { displayName: "AudioPlayer.Root" }),
  Provider: Object.assign(AudioPlayerContextProvider, { displayName: "AudioPlayer.Provider" }),
  Author: Object.assign(AudioPlayerAuthor, { displayName: "AudioPlayer.Author" }),
  Controls: Object.assign(AudioPlayerControls, { displayName: "AudioPlayer.Controls" }),
  Image: Object.assign(AudioPlayerImage, { displayName: "AudioPlayer.Image" }),
  Info: Object.assign(AudioPlayerInfo, { displayName: "AudioPlayer.Info" }),
  ProgressBar: Object.assign(AudioPlayerProgressBar, { displayName: "AudioPlayer.ProgressBar" }),
  Time: Object.assign(AudioPlayerTime, { displayName: "AudioPlayer.Time" }),
  Title: Object.assign(AudioPlayerTitle, { displayName: "AudioPlayer.Title" }),
  Volume: Object.assign(AudioPlayerVolume, { displayName: "AudioPlayer.Volume" }),
  VolumeButton: Object.assign(AudioPlayerVolumeButton, { displayName: "AudioPlayer.VolumeButton" }),
  VolumeSlider: Object.assign(AudioPlayerVolumeSlider, { displayName: "AudioPlayer.VolumeSlider" }),
  ControlAudio: Object.assign(AudioPlayerControlAudio, { displayName: "AudioPlayer.ControlAudio" }),
  ControlPlay: Object.assign(AudioPlayerControlPlay, { displayName: "AudioPlayer.ControlPlay" }),
  ControlPrevious: Object.assign(AudioPlayerControlPrevious, {
    displayName: "AudioPlayer.ControlPrevious"
  }),
  ControlNext: Object.assign(AudioPlayerControlNext, { displayName: "AudioPlayer.ControlNext" }),
  ControlShuffle: Object.assign(AudioPlayerControlShuffle, {
    displayName: "AudioPlayer.ControlShuffle"
  }),
  ControlLoop: Object.assign(AudioPlayerControlLoop, { displayName: "AudioPlayer.ControlLoop" })
};

function AudioPlaylist(props) {
  const { as: Element = "div", className, children, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    Element,
    {
      className: twMerge(clsx("flex flex-col border-slate-600 bg-slate-800", className)),
      ...restProps,
      children
    }
  );
}

const AUDIO_PLAYLIST_CONTEXT_ERROR = "useAudioPlaylistContext must be used within an AudioPlaylistContextProvider";
const AudioPlaylistContext = createContext(null);

function AudioPlaylistContextProvider(props) {
  const { children, defaultVisible = false, id = "audio-playlist" } = props;
  const [isPlaylistVisible, setIsPlaylistVisible] = useState(defaultVisible);
  const toggleRef = useRef(null);
  const expandableContainerRef = useRef(null);
  const togglePlaylist = useCallback(() => {
    setIsPlaylistVisible((prev) => !prev);
  }, []);
  const contextValue = useMemo(
    () => ({ isPlaylistVisible, togglePlaylist, toggleRef, expandableContainerRef, id }),
    [isPlaylistVisible, togglePlaylist, id]
  );
  return /* @__PURE__ */ jsx(AudioPlaylistContext.Provider, { value: contextValue, children });
}

function useAudioPlaylistContext() {
  const context = useContext(AudioPlaylistContext);
  if (!context) {
    throw new Error(AUDIO_PLAYLIST_CONTEXT_ERROR);
  }
  return context;
}

function AudioPlaylistTracks(props) {
  const { as: Element = "ul", className, children, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    Element,
    {
      className: twMerge(clsx("flex flex-col gap-2 p-4", className)),
      ...restProps,
      children
    }
  );
}

function AudioPlaylistHeader(props) {
  const { as: Element = "div", className, children, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    Element,
    {
      className: twMerge(
        clsx(
          "flex items-center justify-between border-b border-slate-700 p-4 text-lg font-medium",
          className
        )
      ),
      ...restProps,
      children
    }
  );
}

function AudioPlaylistDismissPrimitive(props) {
  const { className, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    AudioPlayerControlButton,
    {
      "aria-label": "Close playlist",
      className: twMerge(clsx("text-2xl", className)),
      ...restProps,
      children: /* @__PURE__ */ jsx(Icon, { name: "close-fill" })
    }
  );
}

function AudioPlaylistDismiss(props) {
  const { className, onClick, ...restProps } = props;
  const { togglePlaylist } = useAudioPlaylistContext();
  const handleClick = useCallback(
    (e) => {
      togglePlaylist();
      onClick?.(e);
    },
    [togglePlaylist, onClick]
  );
  return /* @__PURE__ */ jsx(
    AudioPlaylistDismissPrimitive,
    {
      onClick: handleClick,
      className,
      ...restProps
    }
  );
}

function AudioPlaylistControlTogglePrimitive(props) {
  const { active = false, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    AudioPlayerControlButton,
    {
      active,
      "aria-label": active ? "Hide playlist" : "Show playlist",
      "aria-expanded": active,
      ...restProps,
      children: /* @__PURE__ */ jsx(Icon, { name: "play-list-2-fill" })
    }
  );
}

function AudioPlaylistControlToggle(props) {
  const { onClick, ref, ...restProps } = props;
  const { isPlaylistVisible, togglePlaylist, toggleRef, id } = useAudioPlaylistContext();
  const handleClick = useCallback(
    (e) => {
      togglePlaylist();
      onClick?.(e);
    },
    [togglePlaylist, onClick]
  );
  const composedRef = useComposedRefs(toggleRef, ref);
  return /* @__PURE__ */ jsx(
    AudioPlaylistControlTogglePrimitive,
    {
      "aria-expanded": isPlaylistVisible,
      "aria-controls": id,
      ref: composedRef,
      active: isPlaylistVisible,
      onClick: handleClick,
      ...restProps
    }
  );
}

function AudioPlaylistExpandableContainerPrimitive(props) {
  const { as: Element = "div", isExpanded, children, className, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    Element,
    {
      className: twMerge(
        clsx(
          "relative overflow-hidden transition-all duration-300",
          {
            "max-h-[300px] opacity-100": isExpanded,
            "pointer-events-none max-h-0 opacity-0": !isExpanded
          },
          className
        )
      ),
      "aria-hidden": !isExpanded,
      ...restProps,
      children
    }
  );
}

function getFirstFocusableElement(element) {
  const selector = 'a[href]:not([disabled]), button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), details:not([disabled]), [tabindex]:not([tabindex="-1"])';
  return element.querySelector(selector);
}
function useFocusFirstElement({ containerRef, shouldFocus }) {
  const firstFocusableElementRef = useRef(null);
  useEffect(() => {
    if (!containerRef.current || !shouldFocus) return;
    const container = containerRef.current;
    firstFocusableElementRef.current = getFirstFocusableElement(container);
    if (!firstFocusableElementRef.current) return;
    const styles = window.getComputedStyle(container);
    const hasTransition = parseFloat(styles.transitionDuration) > 0;
    const hasAnimation = parseFloat(styles.animationDuration) > 0 && styles.animationName !== "none";
    const handleVisualEffectEnd = (e) => {
      if (e.target === containerRef.current && firstFocusableElementRef.current) {
        firstFocusableElementRef.current.focus();
      }
    };
    if (hasTransition) {
      container.addEventListener("transitionend", handleVisualEffectEnd);
    }
    if (hasAnimation) {
      container.addEventListener("animationend", handleVisualEffectEnd);
    }
    if (!hasTransition && !hasAnimation) {
      firstFocusableElementRef.current.focus();
    }
    return () => {
      container.removeEventListener("transitionend", handleVisualEffectEnd);
      container.removeEventListener("animationend", handleVisualEffectEnd);
    };
  }, [containerRef, shouldFocus]);
  return {
    focus: () => {
      if (firstFocusableElementRef.current) {
        firstFocusableElementRef.current.focus();
      }
    },
    hasFocusableElement: () => firstFocusableElementRef.current !== null
  };
}

function useFocusElement({
  containerRef,
  elementToFocus,
  shouldFocus
}) {
  useEffect(() => {
    if (!containerRef.current || !elementToFocus.current || !shouldFocus) return;
    const container = containerRef.current;
    const element = elementToFocus.current;
    const styles = window.getComputedStyle(container);
    const hasTransition = parseFloat(styles.transitionDuration) > 0;
    const hasAnimation = parseFloat(styles.animationDuration) > 0 && styles.animationName !== "none";
    const handleVisualEffectEnd = (e) => {
      if (e.target === containerRef.current && element) {
        element.focus();
      }
    };
    if (hasTransition) {
      container.addEventListener("transitionend", handleVisualEffectEnd);
    }
    if (hasAnimation) {
      container.addEventListener("animationend", handleVisualEffectEnd);
    }
    if (!hasTransition && !hasAnimation) {
      element.focus();
    }
    return () => {
      container.removeEventListener("transitionend", handleVisualEffectEnd);
      container.removeEventListener("animationend", handleVisualEffectEnd);
    };
  }, [containerRef, elementToFocus, shouldFocus]);
  return {
    focus: () => {
      if (elementToFocus.current) {
        elementToFocus.current.focus();
      }
    }
  };
}

function findFocusableElements(element) {
  const selector = 'a[href]:not([disabled]):not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), input:not([disabled]):not([type="hidden"]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), details:not([disabled]):not([tabindex="-1"]), [tabindex]:not([disabled]):not([tabindex="-1"])';
  return Array.from(element.querySelectorAll(selector));
}
function useFocusTrap({
  containerRef,
  isActive,
  onEscape,
  onOutsideClick,
  preventOutsideClicks = true
}) {
  const focusableElementsRef = useRef([]);
  const firstElementRef = useRef(null);
  const lastElementRef = useRef(null);
  const updateFocusableElements = useCallback(() => {
    if (!containerRef.current) {
      focusableElementsRef.current = [];
      firstElementRef.current = null;
      lastElementRef.current = null;
      return false;
    }
    focusableElementsRef.current = findFocusableElements(containerRef.current);
    if (focusableElementsRef.current.length > 0) {
      firstElementRef.current = focusableElementsRef.current[0] || null;
      const lastIndex = focusableElementsRef.current.length - 1;
      lastElementRef.current = focusableElementsRef.current[lastIndex] || null;
      return true;
    }
    firstElementRef.current = null;
    lastElementRef.current = null;
    return false;
  }, [containerRef]);
  useEffect(() => {
    if (!isActive) {
      focusableElementsRef.current = [];
      firstElementRef.current = null;
      lastElementRef.current = null;
      return;
    }
    updateFocusableElements();
  }, [containerRef, isActive, updateFocusableElements]);
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Tab") {
        const firstElement = firstElementRef.current;
        const lastElement = lastElementRef.current;
        if (!firstElement || !lastElement) return;
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
      if (event.key === "Escape") {
        onEscape?.();
      }
    },
    [onEscape]
  );
  const handleOutsideClick = useCallback(
    (event) => {
      if (!containerRef.current || !isActive) return;
      const target = event.target;
      if (containerRef.current.contains(target)) {
        return;
      }
      if (preventOutsideClicks) {
        event.preventDefault();
        event.stopPropagation();
      }
      onOutsideClick?.(event);
    },
    [containerRef, isActive, preventOutsideClicks, onOutsideClick]
  );
  useEffect(() => {
    if (!isActive || !containerRef.current) return;
    document.addEventListener("keydown", handleKeyDown);
    if (preventOutsideClicks || onOutsideClick) {
      document.addEventListener("click", handleOutsideClick, { capture: true });
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (preventOutsideClicks || onOutsideClick) {
        document.removeEventListener("click", handleOutsideClick, { capture: true });
      }
    };
  }, [
    isActive,
    handleKeyDown,
    handleOutsideClick,
    containerRef,
    preventOutsideClicks,
    onOutsideClick
  ]);
  const getFocusableElements = useCallback(() => {
    return [...focusableElementsRef.current];
  }, []);
  const getFirstElement = useCallback(() => {
    return firstElementRef.current;
  }, []);
  const getLastElement = useCallback(() => {
    return lastElementRef.current;
  }, []);
  return {
    isTrapped: isActive && !!containerRef.current,
    refresh: updateFocusableElements,
    getFocusableElements,
    getFirstElement,
    getLastElement
  };
}

function useAudioPlaylistExpandableContainer(props) {
  const { isPlaylistVisible, containerRef, toggleRef, onClose } = props;
  useFocusFirstElement({
    containerRef,
    shouldFocus: isPlaylistVisible
  });
  useFocusElement({
    containerRef,
    elementToFocus: toggleRef,
    shouldFocus: !isPlaylistVisible
  });
  useFocusTrap({
    containerRef,
    isActive: isPlaylistVisible,
    onEscape: onClose,
    preventOutsideClicks: false
  });
}

function AudioPlaylistExpandableContainer(props) {
  const { isPlaylistVisible, expandableContainerRef, toggleRef, togglePlaylist, id } = useAudioPlaylistContext();
  const composedRef = useComposedRefs(expandableContainerRef, props.ref);
  useAudioPlaylistExpandableContainer({
    isPlaylistVisible,
    containerRef: expandableContainerRef,
    toggleRef,
    onClose: togglePlaylist
  });
  return /* @__PURE__ */ jsx(
    AudioPlaylistExpandableContainerPrimitive,
    {
      "aria-hidden": !isPlaylistVisible,
      id,
      ref: composedRef,
      isExpanded: isPlaylistVisible,
      ...props
    }
  );
}

function AudioPlaylistScrollableContainer(props) {
  const {
    as: Element = "div",
    children,
    className,
    maxHeight = "300px",
    style,
    ...restProps
  } = props;
  return /* @__PURE__ */ jsx(
    Element,
    {
      className: twMerge(
        clsx(
          "overflow-y-auto",
          "scrollbar-thin scrollbar-thumb-slate-400/30 scrollbar-track-slate-800/20 hover:scrollbar-thumb-slate-400/50",
          "scrollbar-thumb-rounded-none",
          className
        )
      ),
      style: {
        maxHeight,
        ...style
      },
      ...restProps,
      children
    }
  );
}

function AudioPlaylistTrackPrimitive(props) {
  const { active, as: Element = "li", children, className, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    Element,
    {
      tabIndex: 0,
      role: "button",
      "aria-current": active ? "true" : "false",
      className: twMerge(
        clsx(
          "flex cursor-pointer items-center gap-3 rounded-md p-2 transition-colors duration-200 focus-within:outline-white",
          {
            "bg-black/50": active,
            "hover:bg-black/30 focus-visible:bg-black/30": !active
          },
          className
        )
      ),
      ...restProps,
      children
    }
  );
}

const AUDIO_PLAYLIST_TRACK_CONTEXT_ERROR = "useAudioPlaylistTrackContext must be used within an AudioPlaylistTrackContextProvider";
const AudioPlaylistTrackContext = createContext(null);

function useAudioPlaylistTrackContext() {
  const context = useContext(AudioPlaylistTrackContext);
  if (!context) {
    throw new Error(AUDIO_PLAYLIST_TRACK_CONTEXT_ERROR);
  }
  return context;
}

function AudioPlaylistTrack(props) {
  const { onClick, onKeyDown, children, ...restProps } = props;
  const {
    active,
    onSelect,
    track: { title, author }
  } = useAudioPlaylistTrackContext();
  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      onSelect();
      onClick?.(e);
    },
    [onSelect, onClick]
  );
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect();
      }
      onKeyDown?.(e);
    },
    [onSelect, onKeyDown]
  );
  return /* @__PURE__ */ jsx(
    AudioPlaylistTrackPrimitive,
    {
      active,
      "aria-label": `Play ${title} by ${author}`,
      ...restProps,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      children
    }
  );
}

function AudioPlaylistTrackContextProvider(props) {
  const { children, index, track } = props;
  const { currentTrackIndex, setTrackIndex } = useAudioPlayerContextTrack();
  const { isPlaying, togglePlay, play } = useAudioPlayerContextAudio();
  const onSelect = useCallback(() => {
    if (currentTrackIndex !== index) {
      setTrackIndex(index);
      play();
    } else {
      togglePlay();
    }
  }, [currentTrackIndex, index, togglePlay, setTrackIndex, play]);
  const contextValue = useMemo(
    () => ({
      active: currentTrackIndex === index,
      isPlaying,
      track,
      onSelect
    }),
    [currentTrackIndex, index, isPlaying, track, onSelect]
  );
  return /* @__PURE__ */ jsx(AudioPlaylistTrackContext.Provider, { value: contextValue, children });
}

function AudioPlaylistTrackImagePrimitive(props) {
  const {
    src,
    altText,
    active = false,
    isPlaying = false,
    width = 48,
    height = 48,
    className,
    ...restProps
  } = props;
  return /* @__PURE__ */ jsxs("div", { className: "group relative h-12 w-12 shrink-0 overflow-hidden rounded-md", children: [
    /* @__PURE__ */ jsx(
      AudioPlayerImagePrimitive,
      {
        src,
        altText,
        width,
        height,
        className: clsx("h-full w-full rounded-md", { "border-2 border-white": active }, className),
        ...restProps
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: clsx("absolute inset-0 flex items-center justify-center transition-opacity", {
          "opacity-100": active,
          "opacity-0 group-hover:opacity-100 group-focus:opacity-100": !active
        }),
        children: /* @__PURE__ */ jsx(
          AudioPlayerControlPlayPrimitive,
          {
            tabIndex: -1,
            active: active && isPlaying,
            className: "border-none bg-transparent p-0 text-xl shadow-none hover:bg-transparent focus:bg-transparent focus:outline-hidden"
          }
        )
      }
    )
  ] });
}

function AudioPlaylistTrackImage(props) {
  const {
    active,
    isPlaying,
    track: { thumbnail = "", title }
  } = useAudioPlaylistTrackContext();
  return /* @__PURE__ */ jsx(
    AudioPlaylistTrackImagePrimitive,
    {
      ...props,
      active,
      isPlaying,
      src: thumbnail,
      altText: `${title} thumbnail`
    }
  );
}

function AudioPlaylistTrackTitlePrimitive(props) {
  const { as, className, children, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    AudioPlayerTitlePrimitive,
    {
      as,
      className: twMerge(clsx("text-sm leading-tight font-medium", className)),
      ...restProps,
      children
    }
  );
}

function AudioPlaylistTrackTitle(props) {
  const {
    track: { title }
  } = useAudioPlaylistTrackContext();
  return /* @__PURE__ */ jsx(AudioPlaylistTrackTitlePrimitive, { ...props, children: title });
}

function AudioPlaylistTrackAuthorPrimitive(props) {
  const { as, className, children, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    AudioPlayerAuthorPrimitive,
    {
      as,
      className: twMerge(clsx("text-xs", className)),
      ...restProps,
      children
    }
  );
}

function AudioPlaylistTrackAuthor(props) {
  const {
    track: { author }
  } = useAudioPlaylistTrackContext();
  return /* @__PURE__ */ jsx(AudioPlaylistTrackAuthorPrimitive, { ...props, children: author });
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

const falsyToString = (value)=>typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
const cx = clsx;
const cva = (base, config)=>(props)=>{
        var _config_compoundVariants;
        if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
        const { variants, defaultVariants } = config;
        const getVariantClassNames = Object.keys(variants).map((variant)=>{
            const variantProp = props === null || props === void 0 ? void 0 : props[variant];
            const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
            if (variantProp === null) return null;
            const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
            return variants[variant][variantKey];
        });
        const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param)=>{
            let [key, value] = param;
            if (value === undefined) {
                return acc;
            }
            acc[key] = value;
            return acc;
        }, {});
        const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param)=>{
            let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
            return Object.entries(compoundVariantOptions).every((param)=>{
                let [key, value] = param;
                return Array.isArray(value) ? value.includes({
                    ...defaultVariants,
                    ...propsWithoutUndefined
                }[key]) : ({
                    ...defaultVariants,
                    ...propsWithoutUndefined
                })[key] === value;
            }) ? [
                ...acc,
                cvClass,
                cvClassName
            ] : acc;
        }, []);
        return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
    };

const badgeStyles = cva(
  "inline-flex items-center rounded-full border border-solid font-normal text-center",
  {
    variants: {
      variant: {
        neutral: "bg-gray-50 border-neutral-200 text-neutral-600",
        danger: "bg-red-50 border-red-200 text-red-600",
        warning: "bg-amber-50 border-amber-200 text-amber-600",
        success: "bg-green-50 border-green-200 text-green-600",
        brand: "bg-indigo-50 border-indigo-50 text-indigo-600"
      },
      size: {
        sm: "text-xs px-1.5 py-0.5",
        md: "text-sm px-2 py-0.5",
        lg: "text-sm px-2.5 py-1"
      }
    },
    defaultVariants: {
      variant: "neutral",
      size: "md"
    }
  }
);
function _Badge(props, ref) {
  const {
    as = "span",
    children,
    className,
    variant = "neutral",
    size = "md",
    ...restProps
  } = props;
  const Node = as;
  return /* @__PURE__ */ jsx(
    Node,
    {
      className: twMerge(badgeStyles({ variant, size, className })),
      ...restProps,
      ref,
      children
    }
  );
}
const Badge = forwardRef(_Badge);
Badge.displayName = "Badge";

const buttonStyles = cva(
  ["inline-flex justify-center items-center rounded-sm font-medium focus-visible:outline-hidden"],
  {
    variants: {
      variant: {
        primary: "bg-indigo-700 hover:bg-indigo-800 focus:bg-indigo-800 active:bg-indigo-800 text-white",
        secondary: "bg-white hover:bg-neutral-50 focus:bg-neutral-50 active:bg-neutral-50 border-[0.5px] hover:border focus:border active:border border-solid border-neutral-200",
        tertiary: "text-indigo-700 hover:bg-neutral-50 focus:bg-neutral-50 active:bg-neutral-50",
        destructive: "text-white bg-red-600 hover:bg-red-700 focus:bg-red-700 active:bg-red-700 focus:shadow-red-700/12",
        linkColor: "text-indigo-700 hover:text-indigo-800 focus:text-indigo-800 active:text-indigo-800",
        linkGray: "text-neutral-600 hover:text-neutral-900 focus:text-neutral-900 active:text-neutral-900"
      },
      size: {
        md: "gap-1 text-sm",
        lg: "gap-1.5 text-base",
        xl: "gap-2 text-base",
        xxl: "gap-2.5 text-lg"
      },
      disabled: {
        true: "text-neutral-400 pointer-events-none",
        false: ""
      },
      iconOnly: {
        true: "gap-2",
        false: ""
      },
      isDestructive: {
        true: "focus:shadow-[0px_0px_0px_4px_rgba(0.8509804010391235,0.1764705926179886,0.125490203499794,0.12),0px_0px_0px_1px_rgba(0.8509804010391235,0.1764705926179886,0.125490203499794,1.00)]",
        false: "focus:shadow-[0px_0px_0px_4px_rgba(0.2666666805744171,0.2980392277240753,0.9058823585510254,0.12)]"
      }
    },
    compoundVariants: [
      {
        variant: ["primary", "secondary", "tertiary", "destructive"],
        size: "md",
        className: "px-3.5 py-2.5"
      },
      {
        variant: ["primary", "secondary", "tertiary", "destructive"],
        size: "lg",
        className: "px-4 py-2.5"
      },
      {
        variant: ["primary", "secondary", "tertiary", "destructive"],
        size: "xl",
        className: "px-5 py-3"
      },
      {
        variant: ["primary", "secondary", "tertiary", "destructive"],
        size: "xxl",
        className: "px-6 py-4"
      },
      {
        variant: ["primary", "secondary", "tertiary", "destructive"],
        disabled: true,
        className: "bg-neutral-100 text-neutral-400 pointer-events-none"
      },
      {
        variant: ["primary", "secondary", "tertiary", "destructive", "linkColor", "linkGray"],
        iconOnly: true,
        size: "md",
        className: "p-2.5 gap-2"
      },
      {
        variant: ["primary", "secondary", "tertiary", "destructive", "linkColor", "linkGray"],
        iconOnly: true,
        size: "lg",
        className: "p-3 gap-2"
      },
      {
        variant: ["primary", "secondary", "tertiary", "destructive", "linkColor", "linkGray"],
        iconOnly: true,
        size: "xl",
        className: "p-3.5"
      },
      {
        variant: ["primary", "secondary", "tertiary", "destructive", "linkColor", "linkGray"],
        iconOnly: true,
        size: "xxl",
        className: "p-4"
      }
    ],
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);
function _Button(props, ref) {
  const {
    children,
    disabled,
    variant = "primary",
    size = "md",
    className,
    iconOnly,
    ...restProps
  } = props;
  const isDestructive = variant === "destructive";
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      className: twMerge(
        buttonStyles({ variant, size, disabled, iconOnly, isDestructive, className })
      ),
      disabled,
      ...restProps,
      children
    }
  );
}
const Button = forwardRef(_Button);
Button.displayName = "Button";

export { AudioPlayerCompoundComponent as AudioPlayer, AudioPlayerAuthor, AudioPlayerAuthorPrimitive, AudioPlayerContextAudioProvider, AudioPlayerContextProvider, AudioPlayerContextRefsProvider, AudioPlayerContextTimeProvider, AudioPlayerContextTrackProvider, AudioPlayerControls, AudioPlayerImage, AudioPlayerImagePrimitive, AudioPlayerInfo, AudioPlayer as AudioPlayerPrimitive, AudioPlayerProgressBar, AudioPlayerProgressBarPrimitive, AudioPlayerTime, AudioPlayerTimePrimitive, AudioPlayerTitle, AudioPlayerTitlePrimitive, AudioPlayerVolume, AudioPlaylistCompoundComponent as AudioPlaylist, AudioPlaylistContextProvider, AudioPlaylistControlToggle, AudioPlaylistControlTogglePrimitive, AudioPlaylistDismiss, AudioPlaylistDismissPrimitive, AudioPlaylistExpandableContainer, AudioPlaylistExpandableContainerPrimitive, AudioPlaylistHeader, AudioPlaylist as AudioPlaylistPrimitive, AudioPlaylistScrollableContainer, AudioPlaylistTrack, AudioPlaylistTrackAuthor, AudioPlaylistTrackAuthorPrimitive, AudioPlaylistTrackImage, AudioPlaylistTrackImagePrimitive, AudioPlaylistTrackPrimitive, AudioPlaylistTrackTitle, AudioPlaylistTrackTitlePrimitive, AudioPlaylistTracks, Badge, Button, Icon, formatAudioDurationForDisplay, useAudioPlayerContextAudio, useAudioPlayerContextRefs, useAudioPlayerContextTime, useAudioPlayerContextTrack, useAudioPlayerProgressBar, useAudioPlayerTime, useAudioPlaylistContext, useAudioPlaylistExpandableContainer };
