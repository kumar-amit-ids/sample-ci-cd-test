# Test Plan: Authentication & Login Module

**Target:** https://staging.bluknox.com/login  
**Date:** 2026-10-15  

## Overview
Comprehensive test plan for the BluKnox web application login module explored via Playwright MCP. It covers positive authentication flow with valid credentials, client-side input validations, authentication error toasts, password visibility masking, and navigational links.

## Preconditions
- The staging environment (https://staging.bluknox.com) is reachable.
- Staging test credentials are configured in `config/.env.stage` (`USERNAME`, `PASSWORD`).
- Clean browser session with no pre-existing auth tokens in local/session storage.

## Scenarios

### Scenario 1.1 — User logs in successfully with valid credentials
- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** User is on the login page (`/login`) and not logged in.
- **Steps:**
  1. Navigate to `/login` — expected: Login page is displayed with Email and Password inputs, and Sign in button.
  2. Enter valid email from environment configuration (`process.env.USERNAME`) — expected: Email field displays the input value.
  3. Enter valid password from environment configuration (`process.env.PASSWORD`) — expected: Password is masked.
  4. Click "Sign in" button — expected: Sign in button transitions with loading indicator, then navigates to root dashboard (`/`).
- **Assertions:**
  - Page URL redirects to `baseURL` (`https://staging.bluknox.com/`).
  - Top navigation bar displays authenticated controls (e.g., logo, upload button, notification bell, user profile).
- **Edge cases considered:** Slow network response while authenticating, session persistence with "Remember me".

### Scenario 1.2 — Validation errors triggered on empty form submission
- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** User is on the login page with both Email and Password fields empty.
- **Steps:**
  1. Navigate to `/login` — expected: Login page is loaded.
  2. Click "Sign in" button without entering credentials — expected: Form submission is blocked.
- **Assertions:**
  - Validation error "Please input your email!" is visible below Email field.
  - Validation error "Please input your password!" is visible below Password field.
  - User remains on `/login`.
- **Edge cases considered:** Rapid double-clicking on the Sign in button.

### Scenario 1.3 — Validation error displayed for invalid email format
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** User is on the login page.
- **Steps:**
  1. Enter an invalid email format (e.g. `invalid-email`) into the Email field.
  2. Enter any password into the Password field.
  3. Click "Sign in" or trigger blur — expected: Format validation triggers.
- **Assertions:**
  - Validation error "Please enter a valid email!" is visible below the Email field.
  - User remains on `/login`.
- **Edge cases considered:** Missing `@` symbol, missing domain name, leading/trailing whitespace.

### Scenario 1.4 — Error notification on non-existent account or wrong credentials
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** User is on the login page.
- **Steps:**
  1. Enter a valid formatted but unregistered email (e.g., `testuser@example.com`).
  2. Enter an incorrect password.
  3. Click "Sign in" button — expected: Network request is sent to auth API.
- **Assertions:**
  - An error toast notification appears with text: "We couldn't find an account with that email. Please sign up."
  - User remains on `/login`.
- **Edge cases considered:** Transient network error handling, toast auto-dismissal.

### Scenario 1.5 — Password masking and visibility toggle
- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** User is on the login page.
- **Steps:**
  1. Enter text into the Password field — expected: Text is masked (`type="password"`).
  2. Click the password visibility icon (eye icon) — expected: Icon changes to visible eye, input text becomes plain text (`type="text"`).
  3. Click the password visibility icon again — expected: Icon reverts to eye-invisible, input text is masked again.
- **Assertions:**
  - Password input toggles between masked and visible states.
- **Edge cases considered:** Keyboard accessibility for toggling visibility.

### Scenario 1.6 — Navigation to Forgot Password and Registration pages
- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** User is on the login page.
- **Steps:**
  1. Verify "Forgot password?" link exists with `href="/forgot-password"`.
  2. Verify "Create an account" link exists with `href="/signup"`.
- **Assertions:**
  - "Forgot password?" link is visible and navigates to `/forgot-password`.
  - "Create an account" link is visible and navigates to `/signup`.
- **Edge cases considered:** Target links opening in current window vs new tab.

## Not covered (and why)
- **OAuth / Social Logins:** Not present on the BluKnox staging login interface.
- **MFA / 2FA verification step:** Current staging test account logs directly into dashboard without two-factor prompt.
- **Account lockout after N consecutive attempts:** Deliberately excluded to avoid locking shared staging test accounts.
