import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    FlatList,
    Modal,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Address {
  id: string;
  label: string;
  address: string;
  icon: string;
  isDefault?: boolean;
}

export default function AddressPage() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      label: "Home",
      address: "Rijeka, Croatia",
      icon: "home",
      isDefault: true,
    },
    {
      id: "2",
      label: "Work",
      address: "Maksimirska 63, Zagreb",
      icon: "briefcase",
      isDefault: false,
    },
    {
      id: "3",
      label: "Gym",
      address: "Teslina 12, Rijeka",
      icon: "fitness",
      isDefault: false,
    },
  ]);
  const [selectedAddress, setSelectedAddress] = useState("1");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAddress, setNewAddress] = useState("");

  const handleAddAddress = () => {
    if (newAddress.trim()) {
      const newItem: Address = {
        id: String(addresses.length + 1),
        label: "Other",
        address: newAddress,
        icon: "location",
        isDefault: false,
      };
      setAddresses([...addresses, newItem]);
      setNewAddress("");
      setShowAddModal(false);
    }
  };

  const handleSelectAddress = (id: string) => {
    setSelectedAddress(id);
  };

  const handleConfirmAddress = () => {
    router.back();
  };

  const renderAddressItem = ({ item }: { item: Address }) => (
    <Pressable
      style={[
        styles.addressCard,
        selectedAddress === item.id && styles.selectedCard,
      ]}
      onPress={() => handleSelectAddress(item.id)}
    >
      <View style={styles.addressCardContent}>
        <View style={styles.iconContainer}>
          <Ionicons
            name={item.icon as any}
            size={24}
            color={selectedAddress === item.id ? "#FF9500" : "#666"}
          />
        </View>
        <View style={styles.addressInfo}>
          <Text style={styles.addressLabel}>{item.label}</Text>
          <Text style={styles.addressText}>{item.address}</Text>
        </View>
      </View>
      {selectedAddress === item.id && (
        <View style={styles.checkmark}>
          <Ionicons name="checkmark-circle" size={24} color="#FF9500" />
        </View>
      )}
    </Pressable>
  );

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#1A1A1A" />
        </Pressable>
        <Text style={styles.headerTitle}>Delivery Address</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Address List */}
      <FlatList
        data={addresses}
        renderItem={renderAddressItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        scrollEnabled={false}
      />

      {/* Add New Address Button */}
      <Pressable
        style={styles.addAddressButton}
        onPress={() => setShowAddModal(true)}
      >
        <Ionicons name="add-circle-outline" size={24} color="#FF9500" />
        <Text style={styles.addAddressText}>Add New Address</Text>
      </Pressable>

      {/* Confirm Button */}
      <Pressable
        style={styles.confirmButton}
        onPress={handleConfirmAddress}
      >
        <Text style={styles.confirmButtonText}>Confirm Address</Text>
      </Pressable>

      {/* Add Address Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Address</Text>
              <Pressable onPress={() => setShowAddModal(false)}>
                <Ionicons name="close" size={28} color="#1A1A1A" />
              </Pressable>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Enter your address"
              placeholderTextColor="#999"
              value={newAddress}
              onChangeText={setNewAddress}
            />

            <Pressable
              style={styles.modalButton}
              onPress={handleAddAddress}
            >
              <Text style={styles.modalButtonText}>Add Address</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  addressCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#f0f0f0",
  },
  selectedCard: {
    borderColor: "#FF9500",
    backgroundColor: "#FFF8F0",
  },
  addressCardContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  addressInfo: {
    flex: 1,
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  checkmark: {
    marginLeft: 8,
  },
  addAddressButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#FF9500",
    backgroundColor: "#fff",
  },
  addAddressText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF9500",
    marginLeft: 8,
  },
  confirmButton: {
    marginHorizontal: 16,
    marginBottom: 24,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: "#FF9500",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  input: {
    borderWidth: 2,
    borderColor: "#f0f0f0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#1A1A1A",
    marginBottom: 16,
    fontWeight: "500",
  },
  modalButton: {
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: "#FF9500",
    justifyContent: "center",
    alignItems: "center",
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
});
