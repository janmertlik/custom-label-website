#!/bin/bash
# Rebuilds the assembled pages in ../site from the partials in this folder.
# Usage: ./build.sh   (index.html is standalone and not rebuilt here)
cd "$(dirname "$0")"
OUT=../site
build() {
  page="$1"; title="$2"; desc="$3"
  sed "s|__TITLE__|$title|; s|__DESC__|$desc|" head.tpl > "$OUT/$page.html"
  cat header.part "$page.body.html" footer.part >> "$OUT/$page.html"
}
build what-we-make "What We Make · Custom Label by VOLTFUSE" "Caps, beanies, and facewear, built to be customized. Around 25 popular styles, every detail made your way."
build how-it-works "How It Works · Custom Label by VOLTFUSE" "Concept to delivery without the headache. Four steps, accessible minimums, honest pricing, and rigorous quality control."
build our-work "Our Work · Custom Label by VOLTFUSE" "Case studies, client roster, and real reviews. Product in the wild for brands like yours."
build about "About · Custom Label by VOLTFUSE" "Fifteen years of headwear craft, rooted in Atlantic Canada. A merchandise partner, not a print shop."
build start-a-project "Start a Project · Custom Label by VOLTFUSE" "Pick a style, choose your details, and get a free design proof within 24 hours. No commitment."
build contact "Contact · Custom Label by VOLTFUSE" "Tell us about your brand. The fastest way to a quote. We usually reply the same day."
build faq "FAQ · Custom Label by VOLTFUSE" "Minimums, pricing, turnaround, and how custom you can get. Straight answers to common questions."
build 404 "Page Not Found · Custom Label by VOLTFUSE" "This page got lost in the mail."
echo "rebuilt into $OUT"
