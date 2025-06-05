import { Text, TextInput, TextInputProps } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'

const LabelTextInput = (props: TextInputProps) => {
  const { label, ...inputProps } = props

  return (
    <View style={styles.textInputContainer}>
      <Text style={styles.textInputLabel}>{label}</Text>
      <TextInput
        style={styles.textInput}
        {...inputProps}
        dense
        outlineColor="#444444"
        activeOutlineColor="#007fff"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  textInputContainer: {
    marginBottom: 12,
  },
  textInputLabel: {
    marginBottom: 4,
  },
  textInput: {
    backgroundColor: 'transparent',
    fontSize: 14,
  },
})

export default LabelTextInput
