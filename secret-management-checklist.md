# Secret Management Checklist

- [ ] Store production secrets only in Vercel encrypted environment variables or the approved secret manager.
- [ ] Never commit `.env.local`, tokens, webhook credentials, session secrets, or database URLs.
- [ ] Use separate preview and production credentials.
- [ ] Rotate the webhook token and auth secret after suspected exposure.
- [ ] Restrict secret access by role and project.
- [ ] Avoid printing environment values in builds, logs, tests, or error pages.
- [ ] Record rotation dates without recording secret values.
- [ ] Review third-party webhook and email access before enabling sends.

Current verified Vercel production variables are encrypted. No authentication or database secret is configured in the repository evidence inspected so far.
