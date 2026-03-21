(function () {
  "use strict";

  // Color palette
  const COLORS = {
    // Basic
    black: "#000000",
    white: "#ffffff",
    transparent: "transparent",
    current: "currentColor",

    // Grays
    slate: "#64748b",
    gray: "#6b7280",
    zinc: "#71717a",
    neutral: "#737373",
    stone: "#78716c",

    // Colors
    red: "#ef4444",
    orange: "#f97316",
    amber: "#f59e0b",
    yellow: "#eab308",
    lime: "#84cc16",
    green: "#22c55e",
    emerald: "#10b981",
    teal: "#14b8a6",
    cyan: "#06b6d4",
    sky: "#0ea5e9",
    blue: "#3b82f6",
    indigo: "#6366f1",
    violet: "#8b5cf6",
    purple: "#a855f7",
    fuchsia: "#d946ef",
    pink: "#ec4899",
    rose: "#f43f5e",
  };

  // Named font sizes
  const FONT_SIZES = {
    xs: "12px",
    sm: "14px",
    base: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "30px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "60px",
    "7xl": "72px",
    "8xl": "96px",
    "9xl": "128px",
  };

  // Named font weights
  const FONT_WEIGHTS = {
    thin: "100",
    extralight: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  };

  // Shadow presets
  const SHADOWS = {
    sm: "0 1px 2px 0 rgba(0,0,0,0.05)",
    DEFAULT: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)",
    md: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
    lg: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
    xl: "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
    "2xl": "0 25px 50px -12px rgba(0,0,0,0.25)",
    none: "none",
  };

  // Border-radius presets
  const RADIUS = {
    none: "0px",
    sm: "2px",
    DEFAULT: "4px",
    md: "6px",
    lg: "8px",
    xl: "12px",
    "2xl": "16px",
    "3xl": "24px",
    full: "9999px",
  };

  //? Convert a numeric spacing value into pixels. Values follow a 4px base grid, so `chai-p-4` → 16px.
  function spacingToPx(value) {
    const num = parseFloat(value);
    if (isNaN(num)) return null;
    return num * 4 + "px";
  }

  //? Look up a colour by name from the palette only.
  function resolveColor(name) {
    if (!name) return null;
    return COLORS[name] || null;
  }

  //? Helper to extract arbitrary values in bracket notation, e.g. [#ff5733] or [rgb(0,0,0)] or [20px]
  function extractBracketValue(val) {
    const m = val.match(/^\[(.+)\]$/);
    return m ? m[1] : null;
  }

  //* Static utilities
  //? Each key maps directly to the CSS properties it produces.
  const STATIC_UTILITIES = {
    // Spacing — auto margins
    "m-auto": { margin: "auto" },
    "mx-auto": { "margin-left": "auto", "margin-right": "auto" },
    "my-auto": { "margin-top": "auto", "margin-bottom": "auto" },

    // Sizing — named values
    "w-full": { width: "100%" },
    "w-screen": { width: "100vw" },
    "w-auto": { width: "auto" },
    "h-full": { height: "100%" },
    "h-screen": { height: "100vh" },
    "h-auto": { height: "auto" },
    "min-w-0": { "min-width": "0px" },
    "min-w-full": { "min-width": "100%" },
    "max-w-full": { "max-width": "100%" },
    "min-h-0": { "min-height": "0px" },
    "min-h-full": { "min-height": "100%" },
    "min-h-screen": { "min-height": "100vh" },

    // Display
    block: { display: "block" },
    inline: { display: "inline" },
    "inline-block": { display: "inline-block" },
    flex: { display: "flex" },
    "inline-flex": { display: "inline-flex" },
    grid: { display: "grid" },
    "inline-grid": { display: "inline-grid" },
    hidden: { display: "none" },

    // Flexbox
    "flex-row": { "flex-direction": "row" },
    "flex-col": { "flex-direction": "column" },
    "flex-row-reverse": { "flex-direction": "row-reverse" },
    "flex-col-reverse": { "flex-direction": "column-reverse" },
    "flex-wrap": { "flex-wrap": "wrap" },
    "flex-nowrap": { "flex-wrap": "nowrap" },
    "flex-1": { flex: "1 1 0%" },
    "flex-auto": { flex: "1 1 auto" },
    "flex-none": { flex: "none" },

    // Justify content
    "justify-start": { "justify-content": "flex-start" },
    "justify-end": { "justify-content": "flex-end" },
    "justify-center": { "justify-content": "center" },
    "justify-between": { "justify-content": "space-between" },
    "justify-around": { "justify-content": "space-around" },
    "justify-evenly": { "justify-content": "space-evenly" },

    // Align items
    "items-start": { "align-items": "flex-start" },
    "items-end": { "align-items": "flex-end" },
    "items-center": { "align-items": "center" },
    "items-baseline": { "align-items": "baseline" },
    "items-stretch": { "align-items": "stretch" },

    // Align self
    "self-auto": { "align-self": "auto" },
    "self-start": { "align-self": "flex-start" },
    "self-end": { "align-self": "flex-end" },
    "self-center": { "align-self": "center" },
    "self-stretch": { "align-self": "stretch" },

    // Border
    border: { "border-width": "1px", "border-style": "solid" },
    "border-none": { "border-width": "0px", "border-style": "none" },
    "border-solid": { "border-style": "solid" },
    "border-dashed": { "border-style": "dashed" },
    "border-dotted": { "border-style": "dotted" },

    // Border radius
    rounded: { "border-radius": RADIUS.DEFAULT },

    // Box shadow
    shadow: { "box-shadow": SHADOWS.DEFAULT },

    // Cursor
    "cursor-pointer": { cursor: "pointer" },
    "cursor-default": { cursor: "default" },
    "cursor-not-allowed": { cursor: "not-allowed" },
    "cursor-grab": { cursor: "grab" },

    // Overflow
    "overflow-auto": { overflow: "auto" },
    "overflow-hidden": { overflow: "hidden" },
    "overflow-visible": { overflow: "visible" },
    "overflow-scroll": { overflow: "scroll" },
    "overflow-x-auto": { "overflow-x": "auto" },
    "overflow-y-auto": { "overflow-y": "auto" },
    "overflow-x-hidden": { "overflow-x": "hidden" },
    "overflow-y-hidden": { "overflow-y": "hidden" },

    // Position
    relative: { position: "relative" },
    absolute: { position: "absolute" },
    fixed: { position: "fixed" },
    sticky: { position: "sticky" },
    static: { position: "static" },
    "top-0": { top: "0px" },
    "right-0": { right: "0px" },
    "bottom-0": { bottom: "0px" },
    "left-0": { left: "0px" },
    "inset-0": { top: "0px", right: "0px", bottom: "0px", left: "0px" },

    // Z-index
    "z-auto": { "z-index": "auto" },

    // Text decoration / transform
    underline: { "text-decoration": "underline" },
    "line-through": { "text-decoration": "line-through" },
    "no-underline": { "text-decoration": "none" },
    uppercase: { "text-transform": "uppercase" },
    lowercase: { "text-transform": "lowercase" },
    capitalize: { "text-transform": "capitalize" },
    "normal-case": { "text-transform": "none" },

    // Transitions
    transition: {
      "transition-property":
        "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
      "transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)",
      "transition-duration": "150ms",
    },
    "transition-all": {
      "transition-property": "all",
      "transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)",
      "transition-duration": "150ms",
    },
    "transition-none": { "transition-property": "none" },
    "ease-in": {
      "transition-timing-function": "cubic-bezier(0.4, 0, 1, 1)",
    },
    "ease-out": {
      "transition-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
    },
    "ease-in-out": {
      "transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)",
    },

    // List style
    "list-none": { "list-style-type": "none" },
    "list-disc": { "list-style-type": "disc" },
    "list-decimal": { "list-style-type": "decimal" },

    // Object fit
    "object-contain": { "object-fit": "contain" },
    "object-cover": { "object-fit": "cover" },
    "object-fill": { "object-fit": "fill" },
    "object-none": { "object-fit": "none" },

    // Whitespace
    "whitespace-nowrap": { "white-space": "nowrap" },
    "whitespace-normal": { "white-space": "normal" },
    "whitespace-pre": { "white-space": "pre" },

    // Text overflow
    truncate: {
      overflow: "hidden",
      "text-overflow": "ellipsis",
      "white-space": "nowrap",
    },

    // Pointer events
    "pointer-events-none": { "pointer-events": "none" },
    "pointer-events-auto": { "pointer-events": "auto" },

    // User select
    "select-none": { "user-select": "none" },
    "select-text": { "user-select": "text" },
    "select-all": { "user-select": "all" },
    "select-auto": { "user-select": "auto" },
  };

  //* Dynamic patterns for regex-based lookup
  //? Checked in order — first match wins.
  const DYNAMIC_PATTERNS = [
    // Width & Height (px via spacing scale or bracket notation)
    [
      /^w-(.+)$/,
      (m) => {
        const b = extractBracketValue(m[1]);
        if (b) return { width: b };
        if (/^\d+$/.test(m[1])) return { width: spacingToPx(m[1]) };
        return null;
      },
    ],
    [
      /^h-(.+)$/,
      (m) => {
        const b = extractBracketValue(m[1]);
        if (b) return { height: b };
        if (/^\d+$/.test(m[1])) return { height: spacingToPx(m[1]) };
        return null;
      },
    ],
    [
      /^min-w-(.+)$/,
      (m) => {
        const b = extractBracketValue(m[1]);
        if (b) return { "min-width": b };
        if (/^\d+$/.test(m[1])) return { "min-width": spacingToPx(m[1]) };
        return null;
      },
    ],
    [
      /^min-h-(.+)$/,
      (m) => {
        const b = extractBracketValue(m[1]);
        if (b) return { "min-height": b };
        if (/^\d+$/.test(m[1])) return { "min-height": spacingToPx(m[1]) };
        return null;
      },
    ],
    [
      /^max-w-(.+)$/,
      (m) => {
        const b = extractBracketValue(m[1]);
        if (b) return { "max-width": b };
        if (/^\d+$/.test(m[1])) return { "max-width": spacingToPx(m[1]) };
        return null;
      },
    ],
    [
      /^max-h-(.+)$/,
      (m) => {
        const b = extractBracketValue(m[1]);
        if (b) return { "max-height": b };
        if (/^\d+$/.test(m[1])) return { "max-height": spacingToPx(m[1]) };
        return null;
      },
    ],

    // Padding
    [/^p-(\d+)$/, (m) => ({ padding: spacingToPx(m[1]) })],
    [
      /^px-(\d+)$/,
      (m) => ({
        "padding-left": spacingToPx(m[1]),
        "padding-right": spacingToPx(m[1]),
      }),
    ],
    [
      /^py-(\d+)$/,
      (m) => ({
        "padding-top": spacingToPx(m[1]),
        "padding-bottom": spacingToPx(m[1]),
      }),
    ],
    [/^pt-(\d+)$/, (m) => ({ "padding-top": spacingToPx(m[1]) })],
    [/^pr-(\d+)$/, (m) => ({ "padding-right": spacingToPx(m[1]) })],
    [/^pb-(\d+)$/, (m) => ({ "padding-bottom": spacingToPx(m[1]) })],
    [/^pl-(\d+)$/, (m) => ({ "padding-left": spacingToPx(m[1]) })],

    // Margin
    [/^m-(\d+)$/, (m) => ({ margin: spacingToPx(m[1]) })],
    [
      /^mx-(\d+)$/,
      (m) => ({
        "margin-left": spacingToPx(m[1]),
        "margin-right": spacingToPx(m[1]),
      }),
    ],
    [
      /^my-(\d+)$/,
      (m) => ({
        "margin-top": spacingToPx(m[1]),
        "margin-bottom": spacingToPx(m[1]),
      }),
    ],
    [/^mt-(\d+)$/, (m) => ({ "margin-top": spacingToPx(m[1]) })],
    [/^mr-(\d+)$/, (m) => ({ "margin-right": spacingToPx(m[1]) })],
    [/^mb-(\d+)$/, (m) => ({ "margin-bottom": spacingToPx(m[1]) })],
    [/^ml-(\d+)$/, (m) => ({ "margin-left": spacingToPx(m[1]) })],

    // Background color (named or bracket notation)
    [
      /^bg-(.+)$/,
      (m) => {
        const b = extractBracketValue(m[1]);
        if (b) return { "background-color": b };
        const color = resolveColor(m[1]);
        return color ? { "background-color": color } : null;
      },
    ],

    // Text — alignment / size / color (bracket notation for arbitrary values)
    [
      /^text-(.+)$/,
      (m) => {
        const val = m[1];
        // Bracket notation: text-[#color] or text-[20px]
        const b = extractBracketValue(val);
        if (b) {
          if (/^#|^rgb|^hsl/.test(b)) return { color: b };
          return { "font-size": b };
        }
        // Named alignment
        if (["left", "center", "right", "justify"].includes(val))
          return { "text-align": val };
        // Named font sizes
        if (FONT_SIZES[val]) return { "font-size": FONT_SIZES[val] };
        // Named colors (red, blue, white, etc.)
        const color = resolveColor(val);
        return color ? { color: color } : null;
      },
    ],

    // Font weight
    [
      /^font-(.+)$/,
      (m) => {
        return FONT_WEIGHTS[m[1]]
          ? { "font-weight": FONT_WEIGHTS[m[1]] }
          : null;
      },
    ],

    // Width / height (numeric)
    [/^w-(\d+)$/, (m) => ({ width: spacingToPx(m[1]) })],
    [/^h-(\d+)$/, (m) => ({ height: spacingToPx(m[1]) })],
    [/^max-w-(\d+)$/, (m) => ({ "max-width": spacingToPx(m[1]) })],

    // Gap
    [/^gap-(\d+)$/, (m) => ({ gap: spacingToPx(m[1]) })],
    [/^gap-x-(\d+)$/, (m) => ({ "column-gap": spacingToPx(m[1]) })],
    [/^gap-y-(\d+)$/, (m) => ({ "row-gap": spacingToPx(m[1]) })],

    // Border width (numeric)
    [
      /^border-(\d+)$/,
      (m) => ({ "border-width": m[1] + "px", "border-style": "solid" }),
    ],
    // Border color (named or bracket notation)
    [
      /^border-(.+)$/,
      (m) => {
        const b = extractBracketValue(m[1]);
        if (b) return { "border-color": b };
        const color = resolveColor(m[1]);
        return color ? { "border-color": color } : null;
      },
    ],

    // Border radius
    [
      /^rounded-(.+)$/,
      (m) => {
        if (RADIUS[m[1]]) return { "border-radius": RADIUS[m[1]] };
        if (/^\d+$/.test(m[1])) return { "border-radius": m[1] + "px" };
        return null;
      },
    ],

    // Box shadow (named presets or bracket/custom color)
    [
      /^shadow-(.+)$/,
      (m) => {
        // Named shadow presets
        if (SHADOWS[m[1]]) return { "box-shadow": SHADOWS[m[1]] };
        // Bracket notation, e.g. shadow-[#ff0000]
        const b = extractBracketValue(m[1]);
        if (b) return { "box-shadow": `0 4px 6px -1px ${b}` };
        // Custom color, e.g. shadow-ff0000
        const color = resolveColor(m[1]);
        if (color) return { "box-shadow": `0 4px 6px -1px ${color}` };
        return null;
      },
    ],

    // Opacity
    [/^opacity-(\d+)$/, (m) => ({ opacity: String(parseInt(m[1], 10) / 100) })],

    // Position offsets
    [/^top-(\d+)$/, (m) => ({ top: spacingToPx(m[1]) })],
    [/^right-(\d+)$/, (m) => ({ right: spacingToPx(m[1]) })],
    [/^bottom-(\d+)$/, (m) => ({ bottom: spacingToPx(m[1]) })],
    [/^left-(\d+)$/, (m) => ({ left: spacingToPx(m[1]) })],

    // Z-index
    [/^z-(\d+)$/, (m) => ({ "z-index": m[1] })],

    // Letter spacing
    [
      /^tracking-(.+)$/,
      (m) => {
        const map = {
          tighter: "-0.05em",
          tight: "-0.025em",
          normal: "0em",
          wide: "0.025em",
          wider: "0.05em",
          widest: "0.1em",
        };
        return map[m[1]] ? { "letter-spacing": map[m[1]] } : null;
      },
    ],

    // Line height (numeric first, then named)
    [/^leading-(\d+)$/, (m) => ({ "line-height": spacingToPx(m[1]) })],
    [
      /^leading-(.+)$/,
      (m) => {
        const map = {
          none: "1",
          tight: "1.25",
          snug: "1.375",
          normal: "1.5",
          relaxed: "1.625",
          loose: "2",
        };
        return map[m[1]] ? { "line-height": map[m[1]] } : null;
      },
    ],

    // Grid
    [
      /^grid-cols-(\d+)$/,
      (m) => ({
        "grid-template-columns": `repeat(${m[1]}, minmax(0, 1fr))`,
      }),
    ],
    [
      /^grid-rows-(\d+)$/,
      (m) => ({
        "grid-template-rows": `repeat(${m[1]}, minmax(0, 1fr))`,
      }),
    ],
    [
      /^col-span-(\d+)$/,
      (m) => ({ "grid-column": `span ${m[1]} / span ${m[1]}` }),
    ],
    [
      /^row-span-(\d+)$/,
      (m) => ({ "grid-row": `span ${m[1]} / span ${m[1]}` }),
    ],

    // Transition duration
    [/^duration-(\d+)$/, (m) => ({ "transition-duration": m[1] + "ms" })],
  ];

  //? Given a class name (without the `chai-` prefix), return a plain object of CSS property → value mappings, or null if unrecognised.

  function parseUtility(name) {
    //* 1. Try exact-match lookup first
    if (STATIC_UTILITIES[name]) {
      return STATIC_UTILITIES[name];
    }

    //* 2. Try dynamic patterns
    for (const [regex, handler] of DYNAMIC_PATTERNS) {
      const match = name.match(regex);

      if (match) return handler(match);
    }

    // Unrecognised utility
    return null;
  }

  //? Process a single DOM element: find all `chai-*` classes, resolve styles, apply them as inline styles, and remove the original class names.

  function processElement(el) {
    const classes = Array.from(el.classList);
    const chaiClasses = classes.filter((c) => c.startsWith("chai-"));

    if (chaiClasses.length === 0) return;

    chaiClasses.forEach((cls) => {
      //? strip "chai-" so that we can parse the utility
      const utility = cls.slice(5);
      const styles = parseUtility(utility);

      if (!styles) {
        console.warn(`[Chai Tailwind] Unknown utility: "${cls}"`);
        return;
      }

      Object.entries(styles).forEach(([prop, value]) => {
        //? Convert kebab-case property to camelCase for style assignment
        const camelProp = prop.replace(/-([a-z])/g, (_, ch) =>
          ch.toUpperCase(),
        );
        el.style[camelProp] = value;
      });

      //? Remove the chai-* class from the element
      el.classList.remove(cls);
    });
  }

  //? Walk the entire DOM tree starting from root and process every element
  function processTree(root) {
    const allElements = root.querySelectorAll("*");
    allElements.forEach(processElement);

    //! Also process the root itself if it's an element
    if (root.nodeType === Node.ELEMENT_NODE) {
      processElement(root);
    }
  }

  /**
   *? Initialise the Chai Tailwind engine:
   ** 1. Process all existing elements
   ** 2. Set up a MutationObserver to handle dynamically added content
   **/
  function init() {
    //* Initial pass
    processTree(document.body);

    //* Reveal the page now that all chai-* classes have been resolved
    document.body.classList.add("chai-opacity-100");

    //* Observe future DOM changes so dynamically inserted elements are styled too
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        //? Handle newly added nodes
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            processTree(node);
          }
        });

        //? Handle class attribute changes on existing nodes
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          processElement(mutation.target);
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class"],
    });

    console.log(
      "☕ Chai Tailwind engine initialised \nscanning for chai-* classes",
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
