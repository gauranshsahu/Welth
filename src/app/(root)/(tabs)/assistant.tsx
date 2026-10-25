import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AssistantScreen() {
  return (
    <SafeAreaView edges={["top"]} className="flex-1 items-center justify-center">
      <Text>Assistant</Text>
    </SafeAreaView>
  );
}