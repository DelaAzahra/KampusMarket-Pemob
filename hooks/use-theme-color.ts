import { useColorScheme } from './use-color-scheme';

export function useThemeColor(
  colors: { light?: string; dark?: string } | undefined,
  colorName: string
) {
  const theme = useColorScheme();
  const color = colors?.[theme === 'dark' ? 'dark' : 'light'];
  return color ?? '#000000';
}
