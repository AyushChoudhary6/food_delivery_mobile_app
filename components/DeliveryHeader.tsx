import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
    Animated,
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface Address {
  id: string;
  label: string;
  address: string;
  icon: string;
}

interface DeliveryHeaderProps {
  address: string;
  city: string;
  cartCount?: number;
  onAddressChange?: (newAddress: string) => void;
}

export const DeliveryHeader: React.FC<DeliveryHeaderProps> = ({
  address,
  city,
  cartCount = 0,
  onAddressChange,
}) => {
  const router = useRouter();
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(`${address}, ${city}`);
  const cartScaleAnim = useRef(new Animated.Value(1)).current;
  const [addresses] = useState<Address[]>([
    {
      id: "1",
      label: "Home",
      address: "Rijeka, Croatia",
      icon: "home",
    },
    {
      id: "2",
      label: "Work",
      address: "Maksimirska 63, Zagreb",
      icon: "briefcase",
    },
    {
      id: "3",
      label: "Gym",
      address: "Teslina 12, Rijeka",
      icon: "fitness",
    },
  ]);

  const handleSelectAddress = (addr: string) => {
    setSelectedAddress(addr);
    onAddressChange?.(addr);
    setShowAddressModal(false);
  };

  const handleChangeAddress = () => {
    setShowAddressModal(false);
    router.push("/add-address");
  };

  const handleCartPress = () => {
    Animated.sequence([
      Animated.timing(cartScaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(cartScaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderAddressItem = ({ item }: { item: Address }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => handleSelectAddress(item.address)}
    >
      <View
        style={[
          styles.addressOption,
          selectedAddress === item.address && styles.selectedOption,
        ]}
      >
        <View style={styles.optionIconContainer}>
          <Ionicons
            name={item.icon as any}
            size={22}
            color={selectedAddress === item.address ? "#FF9500" : "#666"}
          />
        </View>
        <View style={styles.optionInfo}>
          <Text style={styles.optionLabel}>{item.label}</Text>
          <Text style={styles.optionAddress}>{item.address}</Text>
        </View>
        {selectedAddress === item.address && (
          <Ionicons name="checkmark-circle" size={24} color="#FF9500" />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.deliverySection}>
          <View style={styles.deliveryInfo}>
            <Text style={styles.deliveryLabel}>DELIVER TO</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShowAddressModal(true)}
            >
              <View style={styles.addressPressable}>
                <Text style={styles.addressText}>{selectedAddress}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleCartPress}
          >
            <Animated.View
              style={[
                styles.cartButton,
                {
                  transform: [{ scale: cartScaleAnim }],
                },
              ]}
            >
              <Ionicons name="bag" size={20} color="#fff" />
              {cartCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {cartCount > 99 ? "99+" : cartCount}
                  </Text>
                </View>
              )}
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Address Selection Modal */}
      <Modal
        visible={showAddressModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddressModal(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowAddressModal(false)}
        >
          <View style={styles.cardContainer}>
            <Pressable
              onPress={(e) => e.stopPropagation()}
              style={styles.card}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Select Delivery Address</Text>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => setShowAddressModal(false)}
                >
                  <Ionicons name="close" size={24} color="#1A1A1A" />
                </TouchableOpacity>
              </View>

              <FlatList
                data={addresses}
                renderItem={renderAddressItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                style={styles.addressList}
              />

              {/* Change Address Button */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleChangeAddress}
              >
                <View style={styles.changeAddressButton}>
                  <Ionicons name="add-circle-outline" size={20} color="#FF9500" />
                  <Text style={styles.changeAddressText}>Add New Address</Text>
                </View>
              </TouchableOpacity>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  deliverySection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  deliveryInfo: {
    flex: 1,
  },
  deliveryLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FF9500",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  addressPressable: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 8,
  },
  addressText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  cartButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#1A1A1A",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
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
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  cardContainer: {
    width: "100%",
    maxHeight: "65%",
  },
  card: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  addressList: {
    marginTop: 8,
    marginBottom: 12,
  },
  addressOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: "#f9f9f9",
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedOption: {
    backgroundColor: "#FFF8F0",
    borderColor: "#FF9500",
  },
  optionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  optionInfo: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 2,
  },
  optionAddress: {
    fontSize: 13,
    color: "#666",
    fontWeight: "500",
  },
  changeAddressButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    marginHorizontal: -16,
    marginBottom: -16,
    marginTop: 8,
    gap: 8,
  },
  changeAddressText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF9500",
  },
});
