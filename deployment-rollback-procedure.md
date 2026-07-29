# Deployment Rollback Procedure

1. Identify the affected deployment and preserve the deployment ID.
2. Confirm whether the issue is application code, configuration, data, or an external provider.
3. Disable the smallest affected feature flag first.
4. Promote the last verified production deployment through Vercel.
5. Do not roll back database migrations without a tested rollback plan.
6. Verify research, legal, Studio, citation, and product routes.
7. Record the incident, user impact, mitigation, and follow-up fix.
8. Re-deploy only after tests, build, and configuration review pass.

Rollback does not alter the truthful status of research or legal approvals.
