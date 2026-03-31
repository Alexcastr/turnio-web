'use client';

import { cn } from '@/lib/utils/cn';
import { ChevronDown, Search } from 'lucide-react';
import { forwardRef, useState, useRef, useEffect, type ChangeEvent } from 'react';
import {
  COUNTRY_CODES,
  DEFAULT_COUNTRY,
  type CountryCode,
} from '@/lib/data/country-codes';

interface PhoneInputProps {
  label: string;
  error?: string;
  value: string;
  onChange: (fullPhone: string) => void;
  onBlur?: () => void;
  name?: string;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ label, error, value, onChange, onBlur, name }, ref) => {
    const [open, setOpen] = useState(false);
    const [countrySearch, setCountrySearch] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    // Parse country from current value
    const resolveCountry = (): CountryCode => {
      if (!value) return DEFAULT_COUNTRY;
      const sorted = [...COUNTRY_CODES].sort(
        (a, b) => b.dialCode.length - a.dialCode.length,
      );
      for (const c of sorted) {
        if (value.startsWith(c.dialCode)) return c;
      }
      return DEFAULT_COUNTRY;
    };

    const [country, setCountry] = useState<CountryCode>(resolveCountry);

    const localNumber = value.startsWith(country.dialCode)
      ? value.slice(country.dialCode.length)
      : value.replace(/^\+\d+/, '');

    const handleCountrySelect = (c: CountryCode) => {
      setCountry(c);
      setOpen(false);
      setCountrySearch('');
      onChange(`${c.dialCode}${localNumber}`);
    };

    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/[^\d]/g, '');
      onChange(`${country.dialCode}${raw}`);
    };

    const filteredCountries = countrySearch.trim()
      ? COUNTRY_CODES.filter(
          (c) =>
            c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
            c.dialCode.includes(countrySearch),
        )
      : COUNTRY_CODES;

    // Focus search input when dropdown opens
    useEffect(() => {
      if (open) {
        setTimeout(() => searchRef.current?.focus(), 50);
      } else {
        setCountrySearch('');
      }
    }, [open]);

    // Close dropdown on outside click
    useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      };
      if (open) document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, [open]);

    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-text-primary">{label}</label>
        <div className="relative flex" ref={dropdownRef}>
          {/* Country selector button */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className={cn(
              'flex items-center gap-1.5 rounded-l-xl border border-r-0 border-border bg-surface px-3 py-2.5 text-sm',
              'hover:bg-surface-hover transition-colors duration-150 cursor-pointer shrink-0',
              'focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none',
              error && 'border-status-cancelled',
              open && 'border-primary ring-2 ring-primary/20',
            )}
          >
            <span className="text-base leading-none">{country.flag}</span>
            <span className="text-text-secondary text-xs">{country.dialCode}</span>
            <ChevronDown
              className={cn(
                'h-3 w-3 text-text-secondary transition-transform duration-150',
                open && 'rotate-180',
              )}
            />
          </button>

          {/* Phone number input */}
          <input
            ref={ref}
            name={name}
            type="tel"
            inputMode="numeric"
            value={localNumber}
            onChange={handlePhoneChange}
            onBlur={onBlur}
            placeholder="312 456 7890"
            className={cn(
              'w-full rounded-r-xl border border-border bg-surface px-4 py-2.5 text-sm',
              'text-text-primary placeholder:text-text-secondary',
              'outline-none transition-colors duration-150',
              'focus:border-primary focus:ring-2 focus:ring-primary/20',
              error && 'border-status-cancelled',
            )}
          />

          {/* Dropdown */}
          {open && (
            <div className="absolute left-0 top-full z-50 mt-1 w-72 rounded-xl border border-border bg-surface shadow-xl">
              {/* Search */}
              <div className="p-2 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-secondary" />
                  <input
                    ref={searchRef}
                    type="text"
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                    placeholder="Buscar país o código..."
                    className="w-full rounded-lg border border-border bg-surface-hover pl-8 pr-3 py-1.5 text-xs text-text-primary placeholder:text-text-secondary outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Country list */}
              <ul className="max-h-52 overflow-y-auto">
                {filteredCountries.length === 0 ? (
                  <li className="px-4 py-3 text-xs text-text-secondary text-center">
                    Sin resultados
                  </li>
                ) : (
                  filteredCountries.map((c) => (
                    <li key={c.code}>
                      <button
                        type="button"
                        onClick={() => handleCountrySelect(c)}
                        className={cn(
                          'flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors cursor-pointer',
                          'hover:bg-surface-hover',
                          c.code === country.code && 'bg-primary/10 text-primary',
                        )}
                      >
                        <span className="text-base leading-none shrink-0">{c.flag}</span>
                        <span className="flex-1 text-left text-text-primary text-xs truncate">
                          {c.name}
                        </span>
                        <span className="text-text-secondary text-xs shrink-0">{c.dialCode}</span>
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs text-status-cancelled">{error}</p>
        )}
      </div>
    );
  },
);

PhoneInput.displayName = 'PhoneInput';
