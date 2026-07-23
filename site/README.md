# Custom Label by VOLTFUSE · Website

The new Custom Label site, built from the brand handover: the black-and-white
design system, Oswald / D-DIN / Libre Baskerville, the canvas linen texture on
dark bands only, die-cut product stickers, and the VOLTFUSE-orange signal used
for interaction only.

## Run it locally

Any static server works. For example:

```
python3 -m http.server 4173 --directory site
```

Then open http://localhost:4173. There is no build step and no dependencies;
every page is plain HTML + one stylesheet + one script. Fonts are self-hosted
in `assets/fonts/` (D-DIN is not on Google Fonts, so keep it self-hosted).

## Pages

- `index.html` - Home, all 11 sections from the approved wireframe
- `what-we-make.html` - catalogue with Caps / Beanies / Facewear tabs
- `how-it-works.html` - process, minimums, dark QC band, pricing table, FAQ preview
- `our-work.html` - roster, alternating case studies, filterable gallery, reviews
- `about.html` - story, values, partnership, VOLTFUSE heritage band
- `start-a-project.html` - the interactive Builder (see below)
- `contact.html`, `faq.html`, `404.html`

The shared header/footer live in `../site-src/` as partials; edit there and run
`../site-src/build.sh` to regenerate every page except `index.html` (standalone).

## The Builder

`start-a-project.html` implements the dynamic minimum-order-quantity module that
was flagged as open work in the handover (transcript section 8, item 4):
colourway rows with quantity steppers, a live progress bar filling toward the
100-unit minimum, a warning state under 100 that flips to success at 100+, a
per-colour "min 50" flag, and a live per-unit estimate that follows the
volume-pricing tiers per category. "Request proof" stays disabled until the
minimum is met.

## Handover items addressed

1. Light linen texture: not used; light surfaces are flat canvas (texture only on dark bands).
2. "Woven label tag" renamed: the UI uses category labels / chips.
3. Testimonials: upright Libre Baskerville, larger and darker, with real client logos.
4. Dynamic MOQ module: built (see above).
- The orange digital signal is kept (still awaiting client sign-off; the system
  holds if it is dropped to pure monochrome - swap `--signal` usage to black).

## Placeholders to swap before launch

- The three Our Work testimonials for Quidi Vidi, Lamb's, and The Newfoundland
  Distillery Co. are paraphrased placeholders; replace with exact quotes from
  the real review library.
- Case-study and gallery imagery uses product cutouts on dark linen tiles;
  swap in the live-site lifestyle photos listed in
  `handover-doc/04_website-assets/ASSET-MANIFEST.md` when available.
- Forms (contact, newsletter, request proof) are front-end only; wire them to
  your form handler or CRM.
- Social links point at the VOLTFUSE channels; update if Custom Label gets its own.
