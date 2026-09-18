# Earning Manager — Step 3
This version turns the Opportunity Scout into a GitHub-ready agent workflow.

## What it does
- Mobile-first dashboard
- Loads opportunities from `data/opportunities.json`
- Shows verification status, payout, time, withdrawal and risk notes
- GitHub Actions can refresh source checks daily
- Manual workflow run is available from GitHub Actions

## Important
This is not yet a fully autonomous account-level task runner. Personalized offers, logins, CAPTCHAs, KYC and financial actions remain user-controlled. The feed deliberately avoids claiming an opportunity is verified when current account-level information is unavailable.

## GitHub Pages
Upload the project files to the repository used for the Earning Manager. Enable Pages from the repository's Actions/Pages settings as appropriate. The `index.html` is the site entry point.

## Next build
Step 4: persistent earnings/task data and the approval center.
