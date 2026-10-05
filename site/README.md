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

Content and section order follow the client's approved version (October 2026).

- `index.html` - Home: hero, logo wall, film, two ways to begin, recent projects, process timeline, testimonials, FAQ
- `how-it-works.html` - Process: four step cards, "you bring / we handle", pricing guide, FAQ
- `our-work.html` - roster, filterable photo gallery with a viewer, four case studies that open in a dialog, client videos
- `about.html` - story, the 10-year film, Custom Label today
- `contact.html` - Get in Touch: message form, book a call, browse products
- `faq.html` - four question groups
- `terms.html` - terms and conditions
- `404.html`
- `what-we-make.html`, `start-a-project.html` - redirects only. Products and Start a Project now
  live on the product builder at https://build.voltfuse.com/, so these old addresses forward there.

The shared header/footer live in `../site-src/` as partials; edit the `*.body.html` files and the
partials there, then run `../site-src/build.sh` to regenerate every page, including the home page
and the two redirects.

Not connected yet: the contact form shows a confirmation but does not send anywhere, and
"Book a Call" shows a holding message until an online booking link is supplied.

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
