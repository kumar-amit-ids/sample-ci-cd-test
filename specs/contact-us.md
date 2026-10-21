# Test Plan: Contact Us Module

**Target:** https://staging.bluknox.com/contact-us  
**Date:** 2026-10-21  

## Overview
Test plan for the BluKnox Contact Us module explored live on staging. It covers verification of static company contact information (address, telephone), comprehensive form field presence, client-side validation triggers for all mandatory fields, field entry behaviors, and form submission resilience.

## Preconditions
- Staging environment (https://staging.bluknox.com) is reachable.
- User is authenticated with staging credentials or has access to navigate to `/contact-us`.
- Clean browser session.

## Scenarios

### Scenario 2.1 — Contact page layout and contact information card verification
- **Priority:** P1
- **Tags:** @smoke @regression
- **Preconditions:** User navigates to `/contact-us`.
- **Steps:**
  1. Navigate to `/contact-us` — expected: Contact Us page loads with header, two-column layout, and footer.
  2. Verify main heading — expected: Heading text "Contact Us" is visible.
  3. Verify Our Address card — expected: Displays "Blucygnus, Inc." and Dover, DE address.
  4. Verify Phone card — expected: Displays telephone number "+1 (302) 302-3454".
- **Assertions:**
  - Page heading "Contact Us" is visible.
  - "Our Address" card contains address details.
  - "Phone" card contains "+1 (302) 302-3454".
- **Edge cases considered:** Responsive layout stacking on smaller viewports.

### Scenario 2.2 — Validation errors triggered on empty form submission
- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** User is on `/contact-us` with all form fields blank.
- **Steps:**
  1. Navigate to `/contact-us` — expected: Form fields (Name, Phone Number, Email, Message) are displayed and empty.
  2. Click "Submit" button without entering any data — expected: Form submission is blocked.
- **Assertions:**
  - Validation error "Please enter your name" is visible below Name field.
  - Validation error "Please enter your phone number" is visible below Phone Number field.
  - Validation error "Please enter your email" is visible below Email field.
  - Validation error "Please enter your message" is visible below Message textarea.
- **Edge cases considered:** Rapid double-clicking on the Submit button.

### Scenario 2.3 — Valid form field filling and character entry
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** User is on `/contact-us`.
- **Steps:**
  1. Fill Name with "QA Automation Tester" — expected: Name field reflects the value.
  2. Fill Phone Number with "3023023454" — expected: Phone input formats cleanly.
  3. Fill Email with "qa.automation@example.com" — expected: Email field reflects the value.
  4. Fill Message with "Automated inquiry test message regarding service information." — expected: Textarea reflects entered text.
- **Assertions:**
  - Name, Phone, Email, and Message inputs contain the exact entered values.
  - Mandatory validation error messages are cleared when valid text is typed into the fields.
- **Edge cases considered:** Extended text length and special characters in message textarea.

### Scenario 2.4 — Individual field error resolution on input change
- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Form is submitted empty so all validation errors are displayed.
- **Steps:**
  1. Submit empty form to trigger all 4 field validation errors.
  2. Type a name into Name field — expected: "Please enter your name" error disappears.
  3. Type an email into Email field — expected: "Please enter your email" error disappears.
- **Assertions:**
  - Error messages dynamically clear as valid input is supplied without submitting the form again.
- **Edge cases considered:** Clearing an entered field reverts back to showing the required validation error.

## Not covered (and why)
- **Live backend email delivery / database submission (`Submit` button action with valid data):** Deliberately excluded in automated smoke suite to prevent spamming the company support inbox (`bluknox.com` team) on recurring CI runs.
