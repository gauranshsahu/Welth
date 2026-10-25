import { Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView edges={["top"]} className="flex-1 items-center justify-center">
      <Text>HomeScreen</Text>
    </SafeAreaView>
  )
}