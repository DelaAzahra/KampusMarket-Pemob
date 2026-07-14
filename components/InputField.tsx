import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

interface InputFieldProps extends TextInputProps {
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
  error?: string;
  touched?: boolean;
}

export default function InputField({
  label,
  iconName,
  error,
  touched,
  style,
  ...props
}: InputFieldProps) {
  let borderColor = Colors.border;
  if (touched) {
    borderColor = error ? Colors.danger : Colors.success;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, { borderColor }]}>
        <Ionicons
          name={iconName}
          size={20}
          color={error && touched ? Colors.danger : Colors.textMuted}
          style={styles.icon}
        />
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={Colors.placeholder}
          {...props}
        />
      </View>
      {touched && error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 12,
    backgroundColor: Colors.background,
    paddingHorizontal: 12,
    height: 52,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    color: Colors.text,
    fontSize: 15,
  },
  errorText: {
    color: Colors.danger,
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
});
