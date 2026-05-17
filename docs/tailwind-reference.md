# Tailwind CSS Reference

A quick reference for Tailwind classes used in this project. Click any class name to open its official documentation.

---

## Layout & Positioning

| Class | What it does | Docs |
|---|---|---|
| `relative` | Sets `position: relative` — lets absolutely positioned children anchor to this element | [↗](https://tailwindcss.com/docs/position) |
| `absolute` | Sets `position: absolute` — removes element from flow, positions relative to nearest `relative` parent | [↗](https://tailwindcss.com/docs/position) |
| `inset-y-0` | Sets `top: 0` and `bottom: 0` — stretches element full height of parent | [↗](https://tailwindcss.com/docs/inset) |
| `start-0` | Sets `inset-inline-start: 0` — pins to the left edge (RTL-aware) | [↗](https://tailwindcss.com/docs/inset) |
| `flex` | Enables flexbox | [↗](https://tailwindcss.com/docs/display#flex) |
| `items-center` | Vertically centers flex children | [↗](https://tailwindcss.com/docs/align-items) |
| `pointer-events-none` | Disables mouse interaction — used on icons so they don't block the input | [↗](https://tailwindcss.com/docs/pointer-events) |

---

## Spacing

| Class | What it does | Docs |
|---|---|---|
| `max-w-md` | Max width of `28rem` — keeps the form from stretching too wide | [↗](https://tailwindcss.com/docs/max-width) |
| `mx-auto` | Auto left/right margins — centers the element horizontally | [↗](https://tailwindcss.com/docs/margin) |
| `p-3` | `padding: 0.75rem` on all sides | [↗](https://tailwindcss.com/docs/padding) |
| `ps-9` | `padding-inline-start: 2.25rem` — left padding to make room for an icon | [↗](https://tailwindcss.com/docs/padding) |
| `w-4` | Width `1rem` | [↗](https://tailwindcss.com/docs/width) |
| `h-4` | Height `1rem` | [↗](https://tailwindcss.com/docs/height) |
| `w-full` | Width `100%` | [↗](https://tailwindcss.com/docs/width) |

---

## Typography

| Class | What it does | Docs |
|---|---|---|
| `text-sm` | Font size `0.875rem` | [↗](https://tailwindcss.com/docs/font-size) |
| `text-zinc-900` | Dark near-black text | [↗](https://tailwindcss.com/docs/color) |
| `text-zinc-500` | Medium gray — used for placeholders and icons | [↗](https://tailwindcss.com/docs/color) |
| `sr-only` | Visually hides an element but keeps it accessible for screen readers | [↗](https://tailwindcss.com/docs/screen-readers) |

---

## Colors & Backgrounds

| Class | What it does | Docs |
|---|---|---|
| `bg-zinc-100` | Light gray background | [↗](https://tailwindcss.com/docs/background-color) |
| `bg-white` | White background | [↗](https://tailwindcss.com/docs/background-color) |
| `border-zinc-300` | Medium gray border color | [↗](https://tailwindcss.com/docs/border-color) |
| `focus:ring-green-500` | Green focus ring when element is active | [↗](https://tailwindcss.com/docs/ring-color) |
| `focus:border-green-500` | Green border when element is focused | [↗](https://tailwindcss.com/docs/border-color) |

---

## Borders & Shape

| Class | What it does | Docs |
|---|---|---|
| `border` | Adds a `1px` solid border | [↗](https://tailwindcss.com/docs/border-width) |
| `border-b` | Adds a `1px` border on the bottom only | [↗](https://tailwindcss.com/docs/border-width) |
| `rounded-lg` | Border radius `0.5rem` — softly rounded corners | [↗](https://tailwindcss.com/docs/border-radius) |
| `shadow-sm` | Small subtle drop shadow | [↗](https://tailwindcss.com/docs/box-shadow) |

---

## Placeholder

| Class | What it does | Docs |
|---|---|---|
| `placeholder:text-zinc-500` | Sets the color of the placeholder text inside an input | [↗](https://tailwindcss.com/docs/placeholder-color) |

---

## State Prefixes

These prefixes apply a style only when a certain condition is true. They work with any utility class.

| Prefix | When it applies | Docs |
|---|---|---|
| `hover:` | Mouse is hovering over the element | [↗](https://tailwindcss.com/docs/hover-focus-and-other-states#hover) |
| `focus:` | Element is focused (clicked or tabbed into) | [↗](https://tailwindcss.com/docs/hover-focus-and-other-states#focus) |
| `active:` | Element is being clicked | [↗](https://tailwindcss.com/docs/hover-focus-and-other-states#active) |
| `disabled:` | Element has the `disabled` attribute | [↗](https://tailwindcss.com/docs/hover-focus-and-other-states#disabled) |
| `placeholder:` | Targets the placeholder text inside an input | [↗](https://tailwindcss.com/docs/hover-focus-and-other-states#placeholder) |

---

## Useful Links

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Tailwind CSS Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)
- [Tailwind Color Palette](https://tailwindcss.com/docs/customizing-colors)
