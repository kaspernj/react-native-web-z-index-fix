import {Platform} from "react-native"

// React Native Web renders every View with `z-index: 0`, which creates a stacking
// context on every element and makes earlier siblings render *below* later ones —
// unlike native, where stacking follows declaration order. This is a web-only bug.
//
// Importing this module for its side effect (on web) injects a stylesheet that resets
// `z-index: auto` on RNW's generated `css-view-*` classes, restoring native-like
// stacking so overlays/tooltips/menus aren't trapped behind later siblings.
//
// The `typeof document` guard keeps it a no-op during web SSR / static rendering.
if (Platform.OS === "web" && typeof document !== "undefined") {
  const style = document.createElement("style")

  style.type = "text/css"
  style.innerHTML = "[class^=\"css-view-\"] { z-index: auto; }"
  document.head.appendChild(style)
}
