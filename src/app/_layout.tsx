import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ padding: 16 }}>
        <Text style={{ color: "#fff" }}>Hello reader</Text>
        <TextInput placeholder="Search City..." placeholderTextColor="#fff" style={{borderWidth:1,borderColor:"red",borderRadius:8,padding:10,marginTop:12}}></TextInput>
      </View>
    </SafeAreaView>
  );
}
