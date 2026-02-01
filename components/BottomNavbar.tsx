import { Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";
import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  cartCount?: number;
}

export const BottomNavbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  cartCount = 0,
}) => {
  const animationRefs = useRef<{ [key: string]: Animated.Value }>({
    home: new Animated.Value(1),
    search: new Animated.Value(1),
    cart: new Animated.Value(1),
    profile: new Animated.Value(1),
  }).current;

  const tabs = [
    { id: "home", label: "Home", icon: "home" },
    { id: "search", label: "Search", icon: "search" },
    { id: "cart", label: "Cart", icon: "bag" },
    { id: "profile", label: "Profile", icon: "person" },
  ];

  const handleTabPress = (tabId: string) => {
    // Scale animation
    Animated.sequence([
      Animated.timing(animationRefs[tabId], {
        toValue: 0.85,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animationRefs[tabId], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onTabChange(tabId);
  };

  return (
    <View style={styles.navbar}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          activeOpacity={0.8}
          onPress={() => handleTabPress(tab.id)}
          style={[styles.navItem, activeTab === tab.id && styles.activeNavItem]}
        >
          <Animated.View
            style={[
              styles.iconContainer,
              {
                transform: [{ scale: animationRefs[tab.id] }],
              },
            ]}
          >
            <Ionicons
              name={tab.icon as any}
              size={24}
              color={activeTab === tab.id ? "#FF9500" : "#999"}
            />
            {tab.id === "cart" && cartCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {cartCount > 99 ? "99+" : cartCount}
                </Text>
              </View>
            )}
          </Animated.View>
          <Text
            style={[
              styles.navLabel,
              activeTab === tab.id && styles.activeNavLabel,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingBottom: 8,
    paddingTop: 8,
    justifyContent: "space-around",
    alignItems: "center",
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    flex: 1,
  },
  activeNavItem: {
    opacity: 1,
  },
  iconContainer: {
    position: "relative",
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 12,
    color: "#999",
    fontWeight: "500",
  },
  activeNavLabel: {
    color: "#FF9500",
    fontWeight: "600",
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -8,
    backgroundColor: "#FF9500",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
    textAlign: "center",
  },
});
