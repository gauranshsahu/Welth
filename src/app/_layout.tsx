import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";

const properties = [
  { id: '1', name: 'Rahul', email: 'rahul@gmail.com' },
  { id: '2', name: 'Aman', email: 'aman@gmail.com' },
  { id: '3', name: 'Priya', email: 'priya@gmail.com' },
  { id: '4', name: 'Neha', email: 'neha@gmail.com' },
];

export default function RootLayout() {
  return (
    <SafeAreaView className='bg-black flex-1 p-4'>
      <View style={{ padding: 16 }}>
        <Text style={{ color: "#fff" }}>Hello reader</Text>
        <TextInput placeholder="Search City..." placeholderTextColor="#fff" style={{ borderWidth: 1, borderColor: "red", borderRadius: 8, padding: 10, marginTop: 12, color: "#fff" }}></TextInput>
        <TouchableOpacity onPress={() => alert("Searching")} style={{ backgroundColor: "red", padding: 12, borderRadius: 8, marginTop: 10, alignItems: "center" }}>
          <Text style={{ color: "white", fontWeight: "600" }}>
            Search
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList data={properties} keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }} renderItem={({ item }) => (
          <View style={{
            padding: 12, display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#222",
            marginBottom: 8,
            borderRadius: 8,
          }}>
            <Text style={{ color: "#fff" }}>{item.id}</Text>
            <Text style={{ color: "#fff" }}>{item.name}</Text>
            <Text style={{ color: "#fff" }}>{item.email}</Text>
          </View>
        )}>
      </FlatList>
    </SafeAreaView>
  );
}
