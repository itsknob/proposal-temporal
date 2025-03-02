/* global __debug__ */

import * as ES from './ecmascript.mjs';
import { MakeIntrinsicClass } from './intrinsicclass.mjs';
import {
  YEARS,
  MONTHS,
  WEEKS,
  DAYS,
  HOURS,
  MINUTES,
  SECONDS,
  MILLISECONDS,
  MICROSECONDS,
  NANOSECONDS,
  CreateSlots,
  GetSlot,
  SetSlot
} from './slots.mjs';

const ObjectCreate = Object.create;

export class Duration {
  constructor(
    years = 0,
    months = 0,
    weeks = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0,
    microseconds = 0,
    nanoseconds = 0
  ) {
    years = years === undefined ? 0 : ES.ToIntegerIfIntegral(years);
    months = months === undefined ? 0 : ES.ToIntegerIfIntegral(months);
    weeks = weeks === undefined ? 0 : ES.ToIntegerIfIntegral(weeks);
    days = days === undefined ? 0 : ES.ToIntegerIfIntegral(days);
    hours = hours === undefined ? 0 : ES.ToIntegerIfIntegral(hours);
    minutes = minutes === undefined ? 0 : ES.ToIntegerIfIntegral(minutes);
    seconds = seconds === undefined ? 0 : ES.ToIntegerIfIntegral(seconds);
    milliseconds = milliseconds === undefined ? 0 : ES.ToIntegerIfIntegral(milliseconds);
    microseconds = microseconds === undefined ? 0 : ES.ToIntegerIfIntegral(microseconds);
    nanoseconds = nanoseconds === undefined ? 0 : ES.ToIntegerIfIntegral(nanoseconds);

    ES.RejectDuration(years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);

    CreateSlots(this);
    SetSlot(this, YEARS, years);
    SetSlot(this, MONTHS, months);
    SetSlot(this, WEEKS, weeks);
    SetSlot(this, DAYS, days);
    SetSlot(this, HOURS, hours);
    SetSlot(this, MINUTES, minutes);
    SetSlot(this, SECONDS, seconds);
    SetSlot(this, MILLISECONDS, milliseconds);
    SetSlot(this, MICROSECONDS, microseconds);
    SetSlot(this, NANOSECONDS, nanoseconds);

    if (typeof __debug__ !== 'undefined' && __debug__) {
      Object.defineProperty(this, '_repr_', {
        value: `${this[Symbol.toStringTag]} <${ES.TemporalDurationToString(
          years,
          months,
          weeks,
          days,
          hours,
          minutes,
          seconds,
          milliseconds,
          microseconds,
          nanoseconds
        )}>`,
        writable: false,
        enumerable: false,
        configurable: false
      });
    }
  }
  get years() {
    if (!ES.IsTemporalDuration(this)) throw new TypeError('invalid receiver');
    return GetSlot(this, YEARS);
  }
  get months() {
    if (!ES.IsTemporalDuration(this)) throw new TypeError('invalid receiver');
    return GetSlot(this, MONTHS);
  }
  get weeks() {
    if (!ES.IsTemporalDuration(this)) throw new TypeError('invalid receiver');
    return GetSlot(this, WEEKS);
  }
  get days() {
    if (!ES.IsTemporalDuration(this)) throw new TypeError('invalid receiver');
    return GetSlot(this, DAYS);
  }
  get hours() {
    if (!ES.IsTemporalDuration(this)) throw new TypeError('invalid receiver');
    return GetSlot(this, HOURS);
  }
  get minutes() {
    if (!ES.IsTemporalDuration(this)) throw new TypeError('invalid receiver');
    return GetSlot(this, MINUTES);
  }
  get seconds() {
    if (!ES.IsTemporalDuration(this)) throw new TypeError('invalid receiver');
    return GetSlot(this, SECONDS);
  }
  get milliseconds() {
    if (!ES.IsTemporalDuration(this)) throw new TypeError('invalid receiver');
    return GetSlot(this, MILLISECONDS);
  }
  get microseconds() {
    if (!ES.IsTemporalDuration(this)) throw new TypeError('invalid receiver');
    return GetSlot(this, MICROSECONDS);
  }
  get nanoseconds() {
    if (!ES.IsTemporalDuration(this)) throw new TypeError('invalid receiver');
    return GetSlot(this, NANOSECONDS);
  }
  get sign() {
    if (!ES.IsTemporalDuration(this)) throw new TypeError('invalid receiver');
    return ES.DurationSign(
      GetSlot(this, YEARS),
      GetSlot(this, MONTHS),
      GetSlot(this, WEEKS),
      GetSlot(this, DAYS),
      GetSlot(this, HOURS),
      GetSlot(this, MINUTES),
      GetSlot(this, SECONDS),
      GetSlot(this, MILLISECONDS),
      GetSlot(this, MICROSECONDS),
      GetSlot(this, NANOSECONDS)
    );
  }
  get blank() {
    if (!ES.IsTemporalDuration(this)) throw new TypeError('invalid receiver');
    return (
      ES.DurationSign(
        GetSlot(this, YEARS),
        GetSlot(this, MONTHS),
        GetSlot(this, WEEKS),
        GetSlot(this, DAYS),
        GetSlot(this, HOURS),
        GetSlot(this, MINUTES),
        GetSlot(this, SECONDS),
        GetSlot(this, MILLISECONDS),
        GetSlot(this, MICROSECONDS),
        GetSlot(this, NANOSECONDS)
      ) === 0
    );
  }
  with(durationLike) {
    if (!ES.IsTemporalDuration(this)) throw new TypeError('invalid receiver');
    const partialDuration = ES.PrepareTemporalFields(
      durationLike,
      [
        'days',
        'hours',
        'microseconds',
        'milliseconds',
        'minutes',
        'months',
        'nanoseconds',
        'seconds',
        'weeks',
        'years'
      ],
      'partial'
    );
    let {
      years = GetSlot(this, YEARS),
      months = GetSlot(this, MONTHS),
      weeks = GetSlot(this, WEEKS),
      days = GetSlot(this, DAYS),
      hours = GetSlot(this, HOURS),
      minutes = GetSlot(this, MINUTES),
      seconds = GetSlot(this, SECONDS),
      milliseconds = GetSlot(this, MILLISECONDS),
      microseconds = GetSlot(this, MICROSECONDS),
      nanoseconds = GetSlot(this, NANOSECONDS)
    } = partialDuration;
    return new Duration(years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);
  }
  negated() {
    if (!ES.IsTemporalDuration(this)) throw new TypeError('invalid receiver');
    return ES.CreateNegatedTemporalDuration(this);
  }
  abs() {
    if (!ES.IsTemporalDuration(this)) throw new TypeError('invalid receiver');
    return new Duration(
      Math.abs(GetSlot(this, YEARS)),
      Math.abs(GetSlot(this, MONTHS)),
      Math.abs(GetSlot(this, WEEKS)),
      Math.abs(GetSlot(this, DAYS)),
      Math.abs(GetSlot(this, HOURS)),
      Math.abs(GetSlot(this, MINUTES)),
      Math.abs(GetSlot(this, SECONDS)),
      Math.abs(GetSlot(this, MILLISECONDS)),
      Math.abs(GetSlot(this, MICROSECONDS)),
      Math.abs(GetSlot(this, NANOSECONDS))
    );
  }
  add(other, options = undefined) {
    if (!ES.IsTemporalDuration(this)) throw new TypeError('invalid receiver');
    return ES.AddDurationToOrSubtractDurationFromDuration('add', this, other, options);
  }
  subtract(other, options = undefined) {
    if (!ES.IsTemporalDuration(this)) throw new TypeError('invalid receiver');
    return ES.AddDurationToOrSubtractDurationFromDuration('subtract', this, other, options);
  }
  round(roundTo) {
    if (!ES.IsTemporalDuration(this)) throw new TypeError('invalid receiver');
    if (roundTo === undefined) throw new TypeError('options parameter is required');
    let years = GetSlot(this, YEARS);
    let months = GetSlot(this, MONTHS);
    let weeks = GetSlot(this, WEEKS);
    let days = GetSlot(this, DAYS);
    let hours = GetSlot(this, HOURS);
    let minutes = GetSlot(this, MINUTES);
    let seconds = GetSlot(this, SECONDS);
    let milliseconds = GetSlot(this, MILLISECONDS);
    let microseconds = GetSlot(this, MICROSECONDS);
    let nanoseconds = GetSlot(this, NANOSECONDS);

    let defaultLargestUnit = ES.DefaultTemporalLargestUnit(
      years,
      months,
      weeks,
      days,
      hours,
      minutes,
      seconds,
      milliseconds,
      microseconds,
      nanoseconds
    );
    if (ES.Type(roundTo) === 'String') {
      const stringParam = roundTo;
      roundTo = ObjectCreate(null);
      roundTo.smallestUnit = stringParam;
    } else {
      roundTo = ES.GetOptionsObject(roundTo);
    }

    let largestUnit = ES.GetTemporalUnit(roundTo, 'largestUnit', 'datetime', undefined, ['auto']);
    let relativeTo = ES.ToRelativeTemporalObject(roundTo);
    const roundingIncrement = ES.ToTemporalRoundingIncrement(roundTo);
    const roundingMode = ES.ToTemporalRoundingMode(roundTo, 'halfExpand');
    let smallestUnit = ES.GetTemporalUnit(roundTo, 'smallestUnit', 'datetime', undefined);

    let smallestUnitPresent = true;
    if (!smallestUnit) {
      smallestUnitPresent = false;
      smallestUnit = 'nanosecond';
    }
    defaultLargestUnit = ES.LargerOfTwoTemporalUnits(defaultLargestUnit, smallestUnit);
    let largestUnitPresent = true;
    if (!largestUnit) {
      largestUnitPresent = false;
      largestUnit = defaultLargestUnit;
    }
    if (largestUnit === 'auto') largestUnit = defaultLargestUnit;
    if (!smallestUnitPresent && !largestUnitPresent) {
      throw new RangeError('at least one of smallestUnit or largestUnit is required');
    }
    if (ES.LargerOfTwoTemporalUnits(largestUnit, smallestUnit) !== largestUnit) {
      throw new RangeError(`largestUnit ${largestUnit} cannot be smaller than smallestUnit ${smallestUnit}`);
    }

    const maximumIncrements = {
      hour: 24,
      minute: 60,
      second: 60,
      millisecond: 1000,
      microsecond: 1000,
      nanosecond: 1000
    };
    const maximum = maximumIncrements[smallestUnit];
    if (maximum !== undefined) ES.ValidateTemporalRoundingIncrement(roundingIncrement, maximum, false);

    ({ years, months, weeks, days } = ES.UnbalanceDateDurationRelative(
      years,
      months,
      weeks,
      days,
      largestUnit,
      relativeTo
    ));
    ({ years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } =
      ES.RoundDuration(
        years,
        months,
        weeks,
        days,
        hours,
        minutes,
        seconds,
        milliseconds,
        microseconds,
        nanoseconds,
        roundingIncrement,
        smallestUnit,
        roundingMode,
        relativeTo
      ));
    if (ES.IsTemporalZonedDateTime(relativeTo)) {
      ({ years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } =
        ES.AdjustRoundedDurationDays(
          years,
          months,
          weeks,
          days,
          hours,
          minutes,
          seconds,
          milliseconds,
          microseconds,
          nanoseconds,
          roundingIncrement,
          smallestUnit,
          roundingMode,
          relativeTo
        ));
      ({ days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = ES.BalanceTimeDurationRelative(
        days,
        hours,
        minutes,
        seconds,
        milliseconds,
        microseconds,
        nanoseconds,
        largestUnit,
        relativeTo
      ));
    } else {
      ({ days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = ES.BalanceTimeDuration(
        days,
        hours,
        minutes,
        seconds,
        milliseconds,
        microseconds,
        nanoseconds,
        largestUnit
      ));
    }
    ({ years, months, weeks, days } = ES.BalanceDateDurationRelative(
      years,
      months,
      weeks,
      days,
      largestUnit,
      relativeTo
    ));

    return new Duration(years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);
  }
  total(totalOf) {
    if (!ES.IsTemporalDuration(this)) throw new TypeError('invalid receiver');
    let years = GetSlot(this, YEARS);
    let months = GetSlot(this, MONTHS);
    let weeks = GetSlot(this, WEEKS);
    let days = GetSlot(this, DAYS);
    let hours = GetSlot(this, HOURS);
    let minutes = GetSlot(this, MINUTES);
    let seconds = GetSlot(this, SECONDS);
    let milliseconds = GetSlot(this, MILLISECONDS);
    let microseconds = GetSlot(this, MICROSECONDS);
    let nanoseconds = GetSlot(this, NANOSECONDS);

    if (totalOf === undefined) throw new TypeError('options argument is required');
    if (ES.Type(totalOf) === 'String') {
      const stringParam = totalOf;
      totalOf = ObjectCreate(null);
      totalOf.unit = stringParam;
    } else {
      totalOf = ES.GetOptionsObject(totalOf);
    }
    const relativeTo = ES.ToRelativeTemporalObject(totalOf);
    const unit = ES.GetTemporalUnit(totalOf, 'unit', 'datetime', ES.REQUIRED);

    // Convert larger units down to days
    ({ years, months, weeks, days } = ES.UnbalanceDateDurationRelative(years, months, weeks, days, unit, relativeTo));
    // If the unit we're totalling is smaller than `days`, convert days down to that unit.
    let balanceResult;
    if (ES.IsTemporalZonedDateTime(relativeTo)) {
      const intermediate = ES.MoveRelativeZonedDateTime(relativeTo, years, months, weeks, 0);
      balanceResult = ES.BalancePossiblyInfiniteTimeDurationRelative(
        days,
        hours,
        minutes,
        seconds,
        milliseconds,
        microseconds,
        nanoseconds,
        unit,
        intermediate
      );
    } else {
      balanceResult = ES.BalancePossiblyInfiniteTimeDuration(
        days,
        hours,
        minutes,
        seconds,
        milliseconds,
        microseconds,
        nanoseconds,
        unit
      );
    }
    if (balanceResult === 'positive overflow') {
      return Infinity;
    } else if (balanceResult === 'negative overflow') {
      return -Infinity;
    }
    ({ days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = balanceResult);
    // Finally, truncate to the correct unit and calculate remainder
    const { total } = ES.RoundDuration(
      years,
      months,
      weeks,
      days,
      hours,
      minutes,
      seconds,
      milliseconds,
      microseconds,
      nanoseconds,
      1,
      unit,
      'trunc',
      relativeTo
    );
    return total;
  }
  toString(options = undefined) {
    if (!ES.IsTemporalDuration(this)) throw new TypeError('invalid receiver');
    options = ES.GetOptionsObject(options);
    const digits = ES.ToFractionalSecondDigits(options);
    const roundingMode = ES.ToTemporalRoundingMode(options, 'trunc');
    const smallestUnit = ES.GetTemporalUnit(options, 'smallestUnit', 'time', undefined);
    if (smallestUnit === 'hour' || smallestUnit === 'minute') {
      throw new RangeError('smallestUnit must be a time unit other than "hours" or "minutes"');
    }
    const { precision, unit, increment } = ES.ToSecondsStringPrecisionRecord(smallestUnit, digits);

    const { seconds, milliseconds, microseconds, nanoseconds } = ES.RoundDuration(
      0,
      0,
      0,
      0,
      0,
      0,
      GetSlot(this, SECONDS),
      GetSlot(this, MILLISECONDS),
      GetSlot(this, MICROSECONDS),
      GetSlot(this, NANOSECONDS),
      increment,
      unit,
      roundingMode
    );
    return ES.TemporalDurationToString(
      GetSlot(this, YEARS),
      GetSlot(this, MONTHS),
      GetSlot(this, WEEKS),
      GetSlot(this, DAYS),
      GetSlot(this, HOURS),
      GetSlot(this, MINUTES),
      seconds,
      milliseconds,
      microseconds,
      nanoseconds,
      precision
    );
  }
  toJSON() {
    if (!ES.IsTemporalDuration(this)) throw new TypeError('invalid receiver');
    return ES.TemporalDurationToString(
      GetSlot(this, YEARS),
      GetSlot(this, MONTHS),
      GetSlot(this, WEEKS),
      GetSlot(this, DAYS),
      GetSlot(this, HOURS),
      GetSlot(this, MINUTES),
      GetSlot(this, SECONDS),
      GetSlot(this, MILLISECONDS),
      GetSlot(this, MICROSECONDS),
      GetSlot(this, NANOSECONDS)
    );
  }
  toLocaleString(locales = undefined, options = undefined) {
    if (!ES.IsTemporalDuration(this)) throw new TypeError('invalid receiver');
    if (typeof Intl !== 'undefined' && typeof Intl.DurationFormat !== 'undefined') {
      return new Intl.DurationFormat(locales, options).format(this);
    }
    console.warn('Temporal.Duration.prototype.toLocaleString() requires Intl.DurationFormat.');
    return ES.TemporalDurationToString(
      GetSlot(this, YEARS),
      GetSlot(this, MONTHS),
      GetSlot(this, WEEKS),
      GetSlot(this, DAYS),
      GetSlot(this, HOURS),
      GetSlot(this, MINUTES),
      GetSlot(this, SECONDS),
      GetSlot(this, MILLISECONDS),
      GetSlot(this, MICROSECONDS),
      GetSlot(this, NANOSECONDS)
    );
  }
  valueOf() {
    throw new TypeError('use compare() to compare Temporal.Duration');
  }
  static from(item) {
    if (ES.IsTemporalDuration(item)) {
      return new Duration(
        GetSlot(item, YEARS),
        GetSlot(item, MONTHS),
        GetSlot(item, WEEKS),
        GetSlot(item, DAYS),
        GetSlot(item, HOURS),
        GetSlot(item, MINUTES),
        GetSlot(item, SECONDS),
        GetSlot(item, MILLISECONDS),
        GetSlot(item, MICROSECONDS),
        GetSlot(item, NANOSECONDS)
      );
    }
    return ES.ToTemporalDuration(item);
  }
  static compare(one, two, options = undefined) {
    one = ES.ToTemporalDuration(one);
    two = ES.ToTemporalDuration(two);
    options = ES.GetOptionsObject(options);
    const relativeTo = ES.ToRelativeTemporalObject(options);
    const y1 = GetSlot(one, YEARS);
    const mon1 = GetSlot(one, MONTHS);
    const w1 = GetSlot(one, WEEKS);
    let d1 = GetSlot(one, DAYS);
    const h1 = GetSlot(one, HOURS);
    const min1 = GetSlot(one, MINUTES);
    const s1 = GetSlot(one, SECONDS);
    const ms1 = GetSlot(one, MILLISECONDS);
    const µs1 = GetSlot(one, MICROSECONDS);
    let ns1 = GetSlot(one, NANOSECONDS);
    const y2 = GetSlot(two, YEARS);
    const mon2 = GetSlot(two, MONTHS);
    const w2 = GetSlot(two, WEEKS);
    let d2 = GetSlot(two, DAYS);
    const h2 = GetSlot(two, HOURS);
    const min2 = GetSlot(two, MINUTES);
    const s2 = GetSlot(two, SECONDS);
    const ms2 = GetSlot(two, MILLISECONDS);
    const µs2 = GetSlot(two, MICROSECONDS);
    let ns2 = GetSlot(two, NANOSECONDS);
    const shift1 = ES.CalculateOffsetShift(relativeTo, y1, mon1, w1, d1);
    const shift2 = ES.CalculateOffsetShift(relativeTo, y2, mon2, w2, d2);
    if (y1 !== 0 || y2 !== 0 || mon1 !== 0 || mon2 !== 0 || w1 !== 0 || w2 !== 0) {
      ({ days: d1 } = ES.UnbalanceDateDurationRelative(y1, mon1, w1, d1, 'day', relativeTo));
      ({ days: d2 } = ES.UnbalanceDateDurationRelative(y2, mon2, w2, d2, 'day', relativeTo));
    }
    ns1 = ES.TotalDurationNanoseconds(d1, h1, min1, s1, ms1, µs1, ns1, shift1);
    ns2 = ES.TotalDurationNanoseconds(d2, h2, min2, s2, ms2, µs2, ns2, shift2);
    return ES.ComparisonResult(ns1.minus(ns2).toJSNumber());
  }
}

MakeIntrinsicClass(Duration, 'Temporal.Duration');
