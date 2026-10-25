import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddTransactionsScreen() {
  return (
    <SafeAreaView edges={["top"]} className="flex-1 items-center justify-center">
      <Text>Add Transactions</Text>
    </SafeAreaView>
  );
} 