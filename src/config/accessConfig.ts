/**
 * NIBM Workshop Portal — Access Configuration
 *
 * This configuration controls the shared workshop access code used to gate the
 * pre-workshop reading materials for workshop participants.
 *
 * TO CHANGE THE ACCESS CODE:
 * 1. Edit the `DEFAULT_ACCESS_CODE` string below, OR
 * 2. Set the `VITE_WORKSHOP_ACCESS_CODE` environment variable in your Vercel / deployment settings.
 *
 * SECURITY NOTE:
 * This is a lightweight, client-side access gate designed to prevent casual public
 * browsing of pre-workshop materials. It is not an enterprise cryptographic security
 * or user authentication system.
 */

export const ACCESS_CONFIG = {
  /**
   * The shared workshop access code.
   * Participants enter this code on the Workshop Access screen.
   * Code matching is normalized (trimmed and case-insensitive for convenience).
   */
  DEFAULT_ACCESS_CODE: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_WORKSHOP_ACCESS_CODE)
    ? import.meta.env.VITE_WORKSHOP_ACCESS_CODE
    : 'MRNA2026',

  /**
   * Browser localStorage persistence key.
   */
  STORAGE_KEY: 'nibm_workshop_access_granted_v1',

  /**
   * UI Labels and copy
   */
  portalBrand: 'NIBM',
  portalSubtitle: 'Workshop Portal',
  workshopTitle: 'mRNA Vaccine Design and Manufacturing',
  heading: 'Workshop Access',
  description: 'Please enter the access code provided for your workshop to access the pre-workshop reading materials.',
  inputLabel: 'Workshop Access Code',
  inputPlaceholder: 'Enter workshop access code',
  submitButtonText: 'Enter Workshop',
  errorMessage: 'That access code is not recognised. Please check the code provided for your workshop and try again.',
};
