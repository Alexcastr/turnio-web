export interface CountryCode {
  code: string;
  dialCode: string;
  flag: string;
  name: string;
}

export const COUNTRY_CODES: CountryCode[] = [
  { code: 'CO', dialCode: '+57', flag: '🇨🇴', name: 'Colombia' },
  { code: 'MX', dialCode: '+52', flag: '🇲🇽', name: 'México' },
  { code: 'AR', dialCode: '+54', flag: '🇦🇷', name: 'Argentina' },
  { code: 'CL', dialCode: '+56', flag: '🇨🇱', name: 'Chile' },
  { code: 'PE', dialCode: '+51', flag: '🇵🇪', name: 'Perú' },
  { code: 'EC', dialCode: '+593', flag: '🇪🇨', name: 'Ecuador' },
  { code: 'VE', dialCode: '+58', flag: '🇻🇪', name: 'Venezuela' },
  { code: 'BO', dialCode: '+591', flag: '🇧🇴', name: 'Bolivia' },
  { code: 'PY', dialCode: '+595', flag: '🇵🇾', name: 'Paraguay' },
  { code: 'UY', dialCode: '+598', flag: '🇺🇾', name: 'Uruguay' },
  { code: 'PA', dialCode: '+507', flag: '🇵🇦', name: 'Panamá' },
  { code: 'CR', dialCode: '+506', flag: '🇨🇷', name: 'Costa Rica' },
  { code: 'GT', dialCode: '+502', flag: '🇬🇹', name: 'Guatemala' },
  { code: 'HN', dialCode: '+504', flag: '🇭🇳', name: 'Honduras' },
  { code: 'SV', dialCode: '+503', flag: '🇸🇻', name: 'El Salvador' },
  { code: 'NI', dialCode: '+505', flag: '🇳🇮', name: 'Nicaragua' },
  { code: 'CU', dialCode: '+53', flag: '🇨🇺', name: 'Cuba' },
  { code: 'DO', dialCode: '+1', flag: '🇩🇴', name: 'Rep. Dominicana' },
  { code: 'PR', dialCode: '+1', flag: '🇵🇷', name: 'Puerto Rico' },
  { code: 'ES', dialCode: '+34', flag: '🇪🇸', name: 'España' },
  { code: 'GQ', dialCode: '+240', flag: '🇬🇶', name: 'Guinea Ecuatorial' },
];

export const DEFAULT_COUNTRY = COUNTRY_CODES[0]; // Colombia
