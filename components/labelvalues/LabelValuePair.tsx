import React from 'react'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'

interface ILabelValuePairProps {
  label: string
  value: string
  containerStyles?: ViewStyle
}

const LabelValuePair = ({ label, value, containerStyles }: ILabelValuePairProps) => {
  const combinedContainerStyles = [styles.labelValueContainer, containerStyles && containerStyles]

  return (
    <View style={combinedContainerStyles}>
      <Text>
        <Text style={styles.labelText}>{label}: </Text>

        <Text>{value}</Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  labelValueContainer: {
    marginBottom: 12,
  },
  labelText: {
    fontWeight: 600,
  },
})

export default LabelValuePair
