#!/bin/bash
INDEXNOW_KEY="d8b5c90d34b14d2ba7710321ed3e4c4d"
URLS=(
  "https://lunacycle.alfo.online/blog/menstrual-cycle-101-beginners-guide"
  "https://lunacycle.alfo.online/blog/cycle-phases-explained-follicular-ovulation-luteal"
  "https://lunacycle.alfo.online/blog/hormones-and-your-cycle-explained"
  "https://lunacycle.alfo.online/blog/how-to-track-your-cycle-step-by-step"
  "https://lunacycle.alfo.online/blog/understanding-your-period-normal-vs-not-normal"
  "https://lunacycle.alfo.online/what-is-menstrual-cycle"
  "https://lunacycle.alfo.online/what-is-ovulation"
  "https://lunacycle.alfo.online/what-is-fertile-window"
  "https://lunacycle.alfo.online/what-is-luteal-phase"
  "https://lunacycle.alfo.online/what-is-follicular-phase"
  "https://lunacycle.alfo.online/use-cases/cycle-tracking-teens-guide"
  "https://lunacycle.alfo.online/conditions/pcos-and-cycle-tracking-guide"
)

# Ping IndexNow
URL_LIST=$(printf '"%s",' "${URLS[@]}" | sed 's/,$//')
curl -X POST https://api.indexnow.org/indexnow \
  -H "Content-Type: application/json" \
  -d "{\"host\":\"lunacycle.alfo.online\",\"key\":\"$INDEXNOW_KEY\",\"urlList\":[$URL_LIST]}"
