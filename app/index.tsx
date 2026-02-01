import { BottomNavbar } from "@/components/BottomNavbar";
import { DeliveryHeader } from "@/components/DeliveryHeader";
import { offers } from "@/constants";
import { useState } from "react";
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Page() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState("home");
  const [cartCount] = useState(9);

  return (
    <View style={styles.container}>
      {/* Delivery Header */}
      <DeliveryHeader
        address="Rijeka"
        city="Croatia"
        cartCount={cartCount}
      />

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome Back! 👋</Text>
        </View>

        {/* Special Offers Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔥 Special Offers</Text>
          <FlatList
            data={offers}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <Pressable 
                style={[styles.offerCard, { backgroundColor: item.color }]} 
                onPress={() => console.log("Pressed offer id:", item.id)}
              >
                <Image 
                  source={{ uri: item.image }} 
                  style={styles.offerImage}
                />
                <View style={styles.offerContent}>
                  <Text style={styles.offerTitle}>{item.title}</Text>
                  <Text style={styles.offerBadge}>Limited Time</Text>
                </View>
              </Pressable>  
            )}
          />
        </View>

        {/* Footer Spacing */}
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <BottomNavbar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        cartCount={cartCount}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  header: {
    marginBottom: 24,
    marginTop: 8,
  },
  greeting: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 12,
  },
  offerCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  offerImage: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  offerContent: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    flex: 1,
  },
  offerBadge: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
});

