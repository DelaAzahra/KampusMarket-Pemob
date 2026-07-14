import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/colors';

interface CategoryChipProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

export default function CategoryChip({ label, isActive, onPress }: CategoryChipProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.chip,
        isActive && styles.chipActive,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          isActive && styles.textActive,
        ]}
      >
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.card,
    borderWidth: 1.5,
    borderColor: Colors.border,
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  text: {
    fontSize: 13,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  textActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
