import { MD3LightTheme as DefaultTheme, useTheme } from 'react-native-paper'

export const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#007fff',
    secondary: '#dcdcdc',
    surfaceDisabled: '#dcdcdc',
  },
}

export type TAppTheme = typeof AppTheme

const useAppTheme = () => useTheme<TAppTheme>()

export default useAppTheme
