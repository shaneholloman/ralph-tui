/**
 * ABOUTME: Tests for the semver comparison utility.
 * Verifies numeric segment comparison, missing segments, and metadata stripping.
 */

import { describe, expect, test } from 'bun:test';
import { compareSemverStrings } from './semver.js';

describe('compareSemverStrings', () => {
  test('returns 0 for equal versions', () => {
    expect(compareSemverStrings('2.0', '2.0')).toBe(0);
    expect(compareSemverStrings('1.0.0', '1.0.0')).toBe(0);
  });

  test('returns -1 when first version is less', () => {
    expect(compareSemverStrings('1.0', '2.0')).toBe(-1);
    expect(compareSemverStrings('2.0', '2.1')).toBe(-1);
    expect(compareSemverStrings('1.9', '2.0')).toBe(-1);
  });

  test('returns 1 when first version is greater', () => {
    expect(compareSemverStrings('2.0', '1.0')).toBe(1);
    expect(compareSemverStrings('2.1', '2.0')).toBe(1);
    expect(compareSemverStrings('2.0', '1.9')).toBe(1);
  });

  test('handles numeric comparison correctly (2.10 > 2.9)', () => {
    expect(compareSemverStrings('2.10', '2.9')).toBe(1);
    expect(compareSemverStrings('2.9', '2.10')).toBe(-1);
    expect(compareSemverStrings('1.100', '1.99')).toBe(1);
  });

  test('treats missing segments as 0', () => {
    expect(compareSemverStrings('2', '2.0')).toBe(0);
    expect(compareSemverStrings('2.0', '2.0.0')).toBe(0);
    expect(compareSemverStrings('2', '2.1')).toBe(-1);
  });

  test('strips pre-release and build metadata', () => {
    expect(compareSemverStrings('2.0-beta', '2.0')).toBe(0);
    expect(compareSemverStrings('2.0+build123', '2.0')).toBe(0);
    expect(compareSemverStrings('2.0-alpha', '2.0-beta')).toBe(0);
  });
});
