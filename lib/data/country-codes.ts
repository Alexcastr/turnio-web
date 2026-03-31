export interface CountryCode {
  code: string;
  dialCode: string;
  flag: string;
  name: string;
}

export const COUNTRY_CODES: CountryCode[] = [
  // Hispanohablantes — América del Sur
  { code: 'CO', dialCode: '+57',  flag: '🇨🇴', name: 'Colombia' },
  { code: 'MX', dialCode: '+52',  flag: '🇲🇽', name: 'México' },
  { code: 'AR', dialCode: '+54',  flag: '🇦🇷', name: 'Argentina' },
  { code: 'CL', dialCode: '+56',  flag: '🇨🇱', name: 'Chile' },
  { code: 'PE', dialCode: '+51',  flag: '🇵🇪', name: 'Perú' },
  { code: 'EC', dialCode: '+593', flag: '🇪🇨', name: 'Ecuador' },
  { code: 'VE', dialCode: '+58',  flag: '🇻🇪', name: 'Venezuela' },
  { code: 'BO', dialCode: '+591', flag: '🇧🇴', name: 'Bolivia' },
  { code: 'PY', dialCode: '+595', flag: '🇵🇾', name: 'Paraguay' },
  { code: 'UY', dialCode: '+598', flag: '🇺🇾', name: 'Uruguay' },
  // Hispanohablantes — América Central y Caribe
  { code: 'PA', dialCode: '+507', flag: '🇵🇦', name: 'Panamá' },
  { code: 'CR', dialCode: '+506', flag: '🇨🇷', name: 'Costa Rica' },
  { code: 'GT', dialCode: '+502', flag: '🇬🇹', name: 'Guatemala' },
  { code: 'HN', dialCode: '+504', flag: '🇭🇳', name: 'Honduras' },
  { code: 'SV', dialCode: '+503', flag: '🇸🇻', name: 'El Salvador' },
  { code: 'NI', dialCode: '+505', flag: '🇳🇮', name: 'Nicaragua' },
  { code: 'CU', dialCode: '+53',  flag: '🇨🇺', name: 'Cuba' },
  { code: 'DO', dialCode: '+1809', flag: '🇩🇴', name: 'Rep. Dominicana' },
  { code: 'PR', dialCode: '+1787', flag: '🇵🇷', name: 'Puerto Rico' },
  // Hispanohablantes — Europa y África
  { code: 'ES', dialCode: '+34',  flag: '🇪🇸', name: 'España' },
  { code: 'GQ', dialCode: '+240', flag: '🇬🇶', name: 'Guinea Ecuatorial' },
  // Otros frecuentes
  { code: 'US', dialCode: '+1',   flag: '🇺🇸', name: 'Estados Unidos' },
  { code: 'BR', dialCode: '+55',  flag: '🇧🇷', name: 'Brasil' },
  { code: 'CA', dialCode: '+1',   flag: '🇨🇦', name: 'Canadá' },
  { code: 'PT', dialCode: '+351', flag: '🇵🇹', name: 'Portugal' },
  { code: 'FR', dialCode: '+33',  flag: '🇫🇷', name: 'Francia' },
  { code: 'DE', dialCode: '+49',  flag: '🇩🇪', name: 'Alemania' },
  { code: 'IT', dialCode: '+39',  flag: '🇮🇹', name: 'Italia' },
  { code: 'GB', dialCode: '+44',  flag: '🇬🇧', name: 'Reino Unido' },
];

export const DEFAULT_COUNTRY = COUNTRY_CODES[0]; // Colombia
