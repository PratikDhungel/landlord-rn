import { Text, TextInput, TextInputProps } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'

const LabelTextInput = (props: TextInputProps) => {
  const { label, ...inputProps } = props

  return (
    <View style={styles.textInputContainer}>
      <Text style={styles.textInputLabel}>{label}</Text>
      <TextInput style={styles.textInput} {...inputProps} dense />
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
    backgroundColor: '#e5f2ff',
    fontSize: 14,
  },
})

export default LabelTextInput
