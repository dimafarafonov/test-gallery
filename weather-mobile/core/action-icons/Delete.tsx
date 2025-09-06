import { MaterialIcons } from "@expo/vector-icons";
import { Alert, TouchableOpacity } from "react-native";

type Props = {
  label: string;
  onDelete: () => void;
};

export const DeleteIcon = ({ label, onDelete }: Props) => {
  return (
    <TouchableOpacity
      onPress={() =>
        Alert.alert("Delete Item", `Are you sure you want to delete "${label}"?`, [
          { text: "Cancel", style: "cancel" },
          { text: "Delete", onPress: onDelete, style: "destructive" },
        ])
      }
    >
      <MaterialIcons name="delete-outline" size={24} color="#0fe66cff" />
    </TouchableOpacity>
  );
};
