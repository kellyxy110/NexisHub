# Manual QA Checklist

## Mobile

- [ ] Home, Products, Studio, Research, Blog, About, Contact, and Legal at 320, 375, 768, and 1024 CSS pixels
- [ ] No horizontal overflow
- [ ] Touch targets are usable
- [ ] Long titles wrap without clipping
- [ ] Forms remain usable with the virtual keyboard

## Keyboard and screen reader

- [ ] Skip or landmark navigation is available
- [ ] Every interactive element has a visible focus state
- [ ] Menus and disclosures work without a pointer
- [ ] Form labels, errors, and status messages are announced
- [ ] Headings form a logical outline
- [ ] Decorative graphics are hidden from assistive technology
- [ ] External links identify their new-window behaviour where relevant

## Reduced motion and contrast

- [ ] `prefers-reduced-motion` disables non-essential transitions
- [ ] Text and controls meet the intended WCAG 2.2 AA contrast target
- [ ] Focus indicators remain visible on dark and light surfaces

## Print

- [ ] Working paper prints without navigation or interactive controls
- [ ] URLs and citations remain readable
- [ ] Tables and callouts do not split badly
- [ ] Page numbers and document identity appear
- [ ] No sensitive form or participant data appears in a print view

## Performance

- [ ] Static pages render without console errors
- [ ] Images have dimensions and meaningful alternative text
- [ ] Fonts do not block the initial document unnecessarily
- [ ] External product links respond successfully
