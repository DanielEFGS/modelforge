# Legal / Policy Checklist

This is an implementation checklist, not legal advice.

## Before public production

- [ ] Privacy Policy
- [ ] Cookie/consent disclosure appropriate to analytics/ads configuration
- [ ] Terms of Use
- [ ] Generated Code Disclaimer
- [ ] Contact method
- [ ] Dependency/license notices where required
- [ ] AdSense-required privacy disclosures if AdSense is enabled
- [ ] Google-certified CMP integration where required for targeted regions/ad mode
- [ ] `ads.txt` after AdSense publisher ID is known

## Privacy Policy must accurately state

- source JSON/code is processed locally,
- what analytics is collected,
- what advertising technologies/cookies are used,
- whether local storage is used for preferences,
- retention/control information for any external analytics data,
- contact information.

Do not claim “no data collected” if GA4/AdSense is enabled.

Better language:

> ModelForge does not transmit the source data or generated code you place in the converter. Separate analytics/advertising services may process standard website usage information as described in this policy.

## Generated code disclaimer

Explain:
- sample inference may not represent all production data,
- users must review security/validation/database assumptions,
- framework compatibility is verified only for documented targets,
- generated code is provided without guarantee of fitness for a specific production system.

## Advertising

Ads must comply with provider placement/program policies.

Do not:
- label ads as download/navigation,
- ask users to click ads to support the project,
- place ads to invite accidental interaction,
- load personalized advertising without required consent mechanisms.

## Licenses

Maintain `THIRD_PARTY_NOTICES.md` if dependencies require notices.

Before adding code-generation templates copied from framework examples, verify their license/terms and prefer original templates based on documented public APIs rather than copying large copyrighted examples.
