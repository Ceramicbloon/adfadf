import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Permissions from "expo-permissions"

export default class Transaction extends React.Component {
    constructor() {
        super()
        this.state = {
            hasCameraPermission: null,
            scanned: false,
            scannedData: '',
            domState: 'normal'
        }
    }
    render() {
        if (this.state.hasCameraPermission) {
            return (<BarCodeScanner onBarCodeScanned={this.handleBarcodeScanner} style = {styles.a}  ></BarCodeScanner>)
        }
        return (
            <View>
                <Text> {this.state.hasCameraPermission ? this.state.scannedData : 'Please give me camera permission'}</Text>
                <TouchableOpacity onPress={() => this.getPermission()}>
                    <Text>Scan QR Code</Text>

                </TouchableOpacity>
            </View>
        )
    }
    getPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({ hasCameraPermission: status === 'granted' })
    }
    handleBarcodeScanner = async ({ type, data }) => {
        this.setState({
            scanned: true,
            scannedData: data
        })

    }

}
const styles = StyleSheet.create({
    a:{
        width:100,
        height:100
    }
})