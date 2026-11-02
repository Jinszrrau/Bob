# Example run

```
$ gentleman "our checkout page converts fine on desktop but tanks on mobile, and I don't know if it's speed, layout, or the payment step"
```

Gentleman's response:

```
The problem: you have three suspects and no evidence pointing at any one
of them yet — this isn't a mobile checkout problem, it's a missing-data
problem.

1. Pull mobile vs desktop funnel drop-off by step (not just overall
   conversion). This tells you WHERE people leave, which narrows the
   three suspects to one or two.
2. Check mobile page load time on the checkout page specifically, not
   your homepage. Anything over ~3s on mobile is a real suspect.
3. Screen-record five mobile checkout sessions. Layout problems show up
   fast on video — rage taps, zooming, mis-clicks.
4. If the drop-off is concentrated at the payment step, check whether
   your payment provider's mobile flow adds friction (redirects, extra
   fields, autofill breaking).
5. Fix the single biggest drop-off point first. Don't touch the other two
   suspects yet — you'll waste time and won't know what actually worked.

Most likely to go wrong: jumping straight to a redesign because mobile
"feels slow," without the funnel data to back it up. That's how teams
spend three weeks on a fix that wasn't the problem.

Next action: pull the step-by-step mobile funnel data. Everything else
depends on what it shows.
```
