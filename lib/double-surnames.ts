const DOUBLE_SURNAMES = [
  '\u6b27\u9633',
  '\u53f8\u9a6c',
  '\u4e0a\u5b98',
  '\u8bf8\u845b',
  '\u590f\u4faf',
  '\u53f8\u5f92',
  '\u53f8\u7a7a',
  '\u4e1c\u65b9',
  '\u7687\u752b',
  '\u5c09\u8fdf',
  '\u957f\u5b59',
  '\u6155\u5bb9',
  '\u5b87\u6587',
  '\u72ec\u5b64',
  '\u516c\u5b59',
  '\u4ee4\u72d0',
  '\u4ef2\u5b59',
  '\u8f69\u8f95',
  '\u8d6b\u8fde',
  '\u547c\u5ef6',
  '\u62d3\u8dcb',
  '\u7aef\u6728',
  '\u95fe\u4e18',
  '\u5357\u5bab',
  '\u4e1c\u90ed',
  '\u897f\u95e8',
  '\u592a\u53f2',
  '\u7b2c\u4e94',
  '\u949f\u79bb',
  '\u6fb9\u53f0',
] as const;

export type SurnameTypeDetected = 'single' | 'double' | 'unknown';

export function detectSurnameType(fullName: string): SurnameTypeDetected {
  const normalizedName = fullName.replace(/\s+/g, '');
  if (!normalizedName) {
    return 'unknown';
  }

  if (DOUBLE_SURNAMES.some((surname) => normalizedName.startsWith(surname))) {
    return 'double';
  }

  if (/^[\u4E00-\u9FFF]/.test(normalizedName.charAt(0))) {
    return 'single';
  }

  return 'unknown';
}
