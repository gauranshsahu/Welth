import { NativeTabs } from "expo-router/native-tabs";
import { useColorScheme } from "react-native";

export default function TabLayout() {
  const dark = useColorScheme() === "dark";

  const accent = "#6C5CE7";                      // change to your brand colour
  const inactive = dark ? "#9CA3AF" : "#6B7280";

  return (
    <NativeTabs
      // Icon + label colours (iOS and Android)
      tintColor={accent}
      iconColor={{ default: inactive, selected: accent }}
      labelStyle={{
        default: { color: inactive, fontSize: 11 },
        selected: { color: accent, fontSize: 11, fontWeight: "600" },
      }}

      // Android: tinted bar, pill indicator, ripple
      backgroundColor={dark ? "#14141C" : "#F7F6FF"}
      indicatorColor={accent + "26"}
      rippleColor={accent + "33"}
      labelVisibilityMode="labeled"

      // iOS below 26: frosted blur
      blurEffect={dark ? "systemUltraThinMaterialDark" : "systemUltraThinMaterialLight"}

      // iOS 26+: bar shrinks when you scroll down
      minimizeBehavior="onScrollDown"
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: "house", selected: "house.fill" }} md="home" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="transactions">
        <NativeTabs.Trigger.Label>Transactions</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="list.bullet" md="receipt_long" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="add-transactions">
        <NativeTabs.Trigger.Label>Add</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: "plus.circle", selected: "plus.circle.fill" }} md="add_circle" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="assistant">
        <NativeTabs.Trigger.Label>Assistant</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="sparkles" md="auto_awesome" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: "person", selected: "person.fill" }} md="person" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}