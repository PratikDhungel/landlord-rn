import FontAwesome from '@expo/vector-icons/FontAwesome'
import { DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'
import { StatusBar } from 'expo-status-bar'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/libs/queryClient'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  })

  // Prevent splash from auto-hiding on first mount
  useEffect(() => {
    SplashScreen.preventAutoHideAsync()
  }, [])

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return <RootLayoutNav />
}

const CustomTheme: Theme = {
  dark: false,
  colors: {
    primary: '#007FFF',
    background: '#F0F8FF',
    card: '#f2f2f2',
    text: '#000000',
    border: '#cccccc',
    notification: '#ff80ab',
  },
  fonts: DefaultTheme.fonts,
}

function RootLayoutNav() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={CustomTheme}>
          <StatusBar style="dark" />

          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          </Stack>
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  )
}
