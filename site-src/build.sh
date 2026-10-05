#!/bin/bash
# Rebuilds the assembled pages in ../site from the partials in this folder.
# Usage: ./build.sh
cd "$(dirname "$0")"
OUT=../site
build() {
  page="$1"; title="$2"; desc="$3"
  sed "s|__TITLE__|$title|; s|__DESC__|$desc|" head.tpl > "$OUT/$page.html"
  cat header.part "$page.body.html" footer.part >> "$OUT/$page.html"
}
# Pages that moved to the product builder keep their old address as a redirect.
redirect() {
  page="$1"; url="$2"
  cat > "$OUT/$page.html" <<REDIRECT
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Custom Label by VOLTFUSE</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="$url">
<meta http-equiv="refresh" content="0; url=$url">
</head>
<body>
<p>This page has moved. <a href="$url">Continue to $url</a></p>
<script>location.replace("$url");</script>
</body>
</html>
REDIRECT
}
build index "Custom Label by VOLTFUSE · Custom Headwear" "Retail-quality custom headwear, fully managed from concept through production, quality control and delivery."
build how-it-works "Process · Custom Label by VOLTFUSE" "How Custom Label by VOLTFUSE manages custom headwear from idea to mock-ups, production, quality control and delivery."
build our-work "Our Work · Custom Label by VOLTFUSE" "See custom headwear projects for tourism brands, resorts, breweries, events and organizations across Canada."
build about "About · Custom Label by VOLTFUSE" "VOLTFUSE started in Newfoundland in 2010 as a rider-owned brand. Custom Label puts 16 years of headwear experience behind your brand."
build contact "Get in Touch · Custom Label by VOLTFUSE" "Tell Custom Label by VOLTFUSE about your brand and get personalized custom headwear mock-ups and unit pricing in about 24 hours."
build faq "FAQ · Custom Label by VOLTFUSE" "Answers on minimums, process, pricing, turnaround, customization and shipping for Custom Label headwear."
build terms "Terms and Conditions · Custom Label by VOLTFUSE" "Terms and conditions for custom headwear orders with Custom Label by VOLTFUSE."
build 404 "Page Not Found · Custom Label by VOLTFUSE" "This page got lost in the mail."
redirect what-we-make "https://build.voltfuse.com/products"
redirect start-a-project "https://build.voltfuse.com/"
echo "rebuilt into $OUT"
