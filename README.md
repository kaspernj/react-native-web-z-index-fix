# react-native-web-z-index-fix

React Native Web renders **every `View` with `z-index: 0`**. That makes each element its own
stacking context, so an *earlier* sibling renders **below** a *later* one — the opposite of how
React Native behaves on iOS/Android (where stacking follows declaration order). The practical
symptom: tooltips, dropdowns, menus and other overlays get clipped/hidden behind content that
comes after them in the tree.

This package fixes that with a one-line, side-effect import. On web it injects a tiny stylesheet
that resets `z-index: auto` on RNW's generated `css-view-*` classes, restoring native-like
stacking. On native it does nothing, and during web SSR / static rendering it's a no-op.

## Install

```sh
npm install react-native-web-z-index-fix
```

## Usage

Import it once, as early as possible — e.g. at the top of your app's root layout / entry file:

```js
import "react-native-web-z-index-fix"
```

That's it. There's nothing to call; importing it applies the fix.

## How it works

```css
[class^="css-view-"] { z-index: auto; }
```

RNW emits a `css-view-*` class on every `View`. Setting their `z-index` back to `auto` removes the
per-element stacking contexts so paint order follows the DOM order again.

## Notes

- Web only. On native (`Platform.OS !== "web"`) the import is inert.
- Safe under server-side / static rendering — it only runs when `document` exists.
- Targets `css-view-*` specifically (not all `css-*`), so `Text` and other components are untouched.

## License

ISC
