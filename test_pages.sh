#!/bin/bash
URLS=(
  "/blog/menstrual-cycle-101-beginners-guide"
  "/blog/cycle-phases-explained-follicular-ovulation-luteal"
  "/blog/hormones-and-your-cycle-explained"
  "/blog/how-to-track-your-cycle-step-by-step"
  "/blog/understanding-your-period-normal-vs-not-normal"
  "/what-is-menstrual-cycle"
  "/what-is-ovulation"
  "/what-is-fertile-window"
  "/what-is-luteal-phase"
  "/what-is-follicular-phase"
  "/use-cases/cycle-tracking-teens-guide"
  "/conditions/pcos-and-cycle-tracking-guide"
)
for path in "${URLS[@]}"; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000$path)
  if [ "$STATUS" -eq 200 ]; then
    echo "OK: $path"
  else
    echo "FAIL ($STATUS): $path"
  fi
done
