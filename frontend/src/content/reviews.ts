/**
 * Patient reviews + Google-review CTA (#home-reviews and the footer link).
 *
 * Two integrity constraints shape this file:
 *  1. Goal-state G3 allows **consent-backed quotes only** — the old site
 *     published no testimonials (see testimonials.ts, deleted in ec0f942),
 *     so `patientReviews` ships empty until the practice supplies quotes
 *     patients have agreed to share. The section renders the aggregate
 *     line + Google CTA regardless, and lights up the quote grid the
 *     moment entries are added here.
 *  2. Independent booking marketplaces (Marham/oladoc/Healthwire) host
 *     the review volume but compete for the booking itself, so we cite
 *     the aggregate without linking out to them (G2: conversion).
 */

export const reviewsHeading = 'Patients speak from experience.';

export const reviewsLead =
  'Most patients arrive through word of mouth — a relative who had surgery here, a colleague’s recommendation, a review left for the next person deciding. If Dr. Siddiq has cared for you or your family, a short Google review is the most useful thing you can leave behind.';

/**
 * TODO(content): verify against the live directory profiles before
 * launch. Snapshot 2026-08-01: Healthwire lists 4.8 / 5 across 1,198
 * patient reviews; oladoc and Marham list him as among the most-reviewed
 * general surgeons in Islamabad.
 */
export const reviewAggregate = {
  score: '4.8',
  outOf: '5',
  caption: 'Average across 1,100+ patient reviews on independent healthcare directories.',
};

export const googleReview = {
  /**
   * Universal Maps deep link — opens the practice listing where the
   * "Write a review" action lives. TODO(content): replace with the exact
   * write-review link (https://search.google.com/local/writereview?placeid=…)
   * once the practice confirms its Google Business Profile.
   */
  url:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Dr. Ghulam Siddiq, Shifa International Hospital, Islamabad'),
  cta: 'Leave a Google review',
  note: 'Opens Google Maps in a new tab — reviews take about a minute.',
};

export interface PatientReview {
  quote: string;
  /** First name or initials — never full names without explicit consent. */
  name: string;
  /** e.g. "Gastric sleeve, 2025" — optional context line. */
  context?: string;
}

// TODO(content): consent-backed quotes only (goal-state G3). Add entries
// here once the practice collects patient permission; the home section
// renders them automatically.
export const patientReviews: PatientReview[] = [];
