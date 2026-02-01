import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
    Alert,
    Animated,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AddAddressPage() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const saveButtonScale = useRef(new Animated.Value(1)).current;

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    alternateNumber: "",
    address: "",
    landmark: "",
    city: "",
    postalCode: "",
  });

  const [selectedType, setSelectedType] = useState("home");

  const addressTypes = [
    { id: "home", label: "Home", icon: "home" },
    { id: "work", label: "Work", icon: "briefcase" },
    { id: "other", label: "Other", icon: "location" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveAddress = () => {
    if (
      !formData.fullName ||
      !formData.phoneNumber ||
      !formData.address ||
      !formData.city
    ) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    // Animation feedback
    Animated.sequence([
      Animated.timing(saveButtonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(saveButtonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Here you would typically save the address to your backend
    console.log("Address saved:", { ...formData, type: selectedType });
    Alert.alert("Success", "Address saved successfully!");
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={28} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Address</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Address Type Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address Type</Text>
          <View style={styles.typeContainer}>
            {addressTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                activeOpacity={0.7}
                onPress={() => setSelectedType(type.id)}
              >
                <View
                  style={[
                  ]}
                >
                  <Ionicons
                    name={type.icon as any}
                    size={24}
                    color={selectedType === type.id ? "#FF9500" : "#666"}
                  />
                  <Text
                    style={[
                      styles.typeLabel,
                      selectedType === type.id && styles.typeLabelActive,
                    ]}
                  >
                    {type.label}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Full Name */}
        <View style={styles.section}>
          <Text style={styles.label}>
            Full Name <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#999"
            value={formData.fullName}
            onChangeText={(value) => handleInputChange("fullName", value)}
          />
        </View>

        {/* Phone Number */}
        <View style={styles.section}>
          <Text style={styles.label}>
            Phone Number <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            value={formData.phoneNumber}
            onChangeText={(value) => handleInputChange("phoneNumber", value)}
          />
        </View>

        {/* Alternate Number */}
        <View style={styles.section}>
          <Text style={styles.label}>Alternate Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter alternate phone number (optional)"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            value={formData.alternateNumber}
            onChangeText={(value) => handleInputChange("alternateNumber", value)}
          />
        </View>

        {/* Address */}
        <View style={styles.section}>
          <Text style={styles.label}>
            Address <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={[styles.input, styles.textAreaInput]}
            placeholder="Enter your house address, street, building number"
            placeholderTextColor="#999"
            multiline={true}
            numberOfLines={3}
            value={formData.address}
            onChangeText={(value) => handleInputChange("address", value)}
          />
        </View>

        {/* Landmark */}
        <View style={styles.section}>
          <Text style={styles.label}>Landmark</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Near Central Park (optional)"
            placeholderTextColor="#999"
            value={formData.landmark}
            onChangeText={(value) => handleInputChange("landmark", value)}
          />
        </View>

        {/* City */}
        <View style={styles.section}>
          <Text style={styles.label}>
            City <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your city"
            placeholderTextColor="#999"
            value={formData.city}
            onChangeText={(value) => handleInputChange("city", value)}
          />
        </View>

        {/* Postal Code */}
        <View style={styles.section}>
          <Text style={styles.label}>Postal Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter postal code (optional)"
            placeholderTextColor="#999"
            value={formData.postalCode}
            onChangeText={(value) => handleInputChange("postalCode", value)}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleSaveAddress}
        >
          <Animated.View
            style={[
              styles.saveButton,
              {
                transform: [{ scale: saveButtonScale }],
              },
            ]}
          >
            <Text style={styles.saveButtonText}>Save Address</Text>
          </Animated.View>
        </TouchableOpacity>

        <View style={{ height: 20 }} />
      </ScrollView>
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 12,
  },
  typeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  typeButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#f0f0f0",
  },
  typeButtonActive: {
    backgroundColor: "#FFF8F0",
    borderColor: "#FF9500",
  },
  typeLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    marginTop: 8,
  },
  typeLabelActive: {
    color: "#FF9500",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  required: {
    color: "#FF6B6B",
  },
  input: {
    borderWidth: 2,
    borderColor: "#f0f0f0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: "#1A1A1A",
    fontWeight: "500",
    backgroundColor: "#fff",
  },
  textAreaInput: {
    minHeight: 100,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  saveButton: {
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: "#FF9500",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
});
