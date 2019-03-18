# hook-style-performance-comparison

Profile hook-style component generation against styled-components, emotion & @emotion/styled

## Arbitrary test results (don't trust these, run your own)

From `React.unstable__Profiler` mounting 4000 elements based on 2 components (1 with prop-based style)

```
hook-style
  Actual: 216.4049898274243
  Base:   152.3249913007021

emotion
  Actual: 128.42499604448676
  Base:   72.33999785967171

@emotion/styled
  Actual: 152.72499807178974
  Base:   106.08999780379236

styled-components
  Actual: 308.6600126698613
  Base:   214.07501213252544
```
