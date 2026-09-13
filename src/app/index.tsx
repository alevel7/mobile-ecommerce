import { useAuth, useSignUp } from '@clerk/expo'
import { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import Toast from "react-native-toast-message";

export default function MainScreen() {
    const { isLoaded, isSignedIn } = useAuth()
    const { signUp } = useSignUp()

    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')
    const [isVerifying, setIsVerifying] = useState(false)

    const handleSignUp = async () => {
        const { error } = await signUp.password({ emailAddress, password })
        if (error) {
            Toast.show({
                type: 'error',
                text1: 'Sign Up Error',
                text2: error.message,
            });
            return
        }

        const { error: sendError } = await signUp.verifications.sendEmailCode()
        if (sendError) {
            // Handle the error in your app.
            Toast.show({
                type: 'error',
                text1: 'Verification Error',
                text2: sendError.message,
            });
            return
        }

        setIsVerifying(true)
    }

    const handleVerify = async () => {
        const { error } = await signUp.verifications.verifyEmailCode({ code })
        if (error) {
            // Handle the error in your app.
            Toast.show({
                type: 'error',
                text1: 'Verification Error',
                text2: error.message,
            });
            return
        }

        const { error: finalizeError } = await signUp.finalize()
        if (finalizeError) {
            // Handle the error in your app.
            Toast.show({
                type: 'error',
                text1: 'Finalization Error',
                text2: finalizeError.message,
            });
            return
        }
    }

    if (!isLoaded) {
        return null
    }

    if (isSignedIn) {
        return (
            <View style={styles.container}>
                <Text>You're signed in</Text>
            </View>
        )
    }

    if (isVerifying) {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    value={code}
                    placeholder="Enter your verification code"
                    onChangeText={setCode}
                    keyboardType="numeric"
                />
                <Button title="Verify" onPress={handleVerify} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                autoCapitalize="none"
                value={emailAddress}
                placeholder="Enter email"
                onChangeText={setEmailAddress}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                value={password}
                placeholder="Enter password"
                secureTextEntry={true}
                onChangeText={setPassword}
            />
            <Button title="Sign up" onPress={handleSignUp} />
            {/* Required for sign-up flows on Expo web. Clerk skips the browser CAPTCHA on iOS and Android */}
            <View nativeID="clerk-captcha" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 12,
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
})