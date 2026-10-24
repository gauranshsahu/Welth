import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ padding: 16 }}>
        <Text style={{ color: "#fff" }}>Hello reader</Text>
        <TextInput placeholder="Search City..." placeholderTextColor="#fff" style={{ borderWidth: 1, borderColor: "red", borderRadius: 8, padding: 10, marginTop: 12, color: "#fff" }}></TextInput>
        <TouchableOpacity onPress={() => alert("Searching")} style={{ backgroundColor: "red", padding: 12, borderRadius: 8, marginTop: 10, alignItems: "center" }}>
          <Text style={{ color: "white", fontWeight: "600" }}>
            Search
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
