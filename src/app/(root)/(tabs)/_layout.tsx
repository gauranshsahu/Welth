import { NativeTabs } from "expo-router/native-tabs";

// Mirrors your tailwind.config.js colours (native props can't use className)
const COLORS = {
  bar: "#141822",        // brand.surface
  active: "#2ECC71",     // primary
  inactive: "#8A8D96",   // brand.text-secondary
};

export default function TabLayout() {
  return (
    <NativeTabs
      // Icon + label colours (iOS and Android)
      tintColor={COLORS.active}
      iconColor={{ default: COLORS.inactive, selected: COLORS.active }}
      labelStyle={{
        default: { color: COLORS.inactive, fontSize: 11 },
        selected: { color: COLORS.active, fontSize: 11, fontWeight: "600" },
      }}

      // Android: dark surface bar, soft green pill, green ripple
      backgroundColor={COLORS.bar}
      indicatorColor={COLORS.active + "26"}
      rippleColor={COLORS.active + "33"}
      labelVisibilityMode="labeled"

      // iOS below 26: dark frosted blur
      blurEffect="systemUltraThinMaterialDark"

      // iOS 26+: bar shrinks when scrolling down
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

      <NativeTabs.Trigger name="add-transaction">
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