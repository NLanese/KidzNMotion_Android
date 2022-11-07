// Reaact
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import React, {useEffect, useState} from "react";
import { useNavigation } from "@react-navigation/native";

// Nuton
import { Header, Button, InputField } from "../../../NutonComponents";
import { AREA, COLORS, FONTS } from "../../../NutonConstants";

// Apollo / GraphQL
import { useMutation } from "@apollo/client";
import { EDIT_ORGANIZATION_SETTINGS } from "../../../GraphQL/operations";

// Recoil
import { useRecoilValue, useRecoilState } from "recoil";
import {sizeState, clientListState, userState, colorState, fontState, organizationState } from '../../../Recoil/atoms';

// Ostrich
import Gradient from "../../../OstrichComponents/Gradient";
import SelectionButton from "../../../OstrichComponents/SelectionButton";

export default function OrganizationSettings() {
///////////////////////
///                 ///
///   Preliminary   ///
///                 ///
///////////////////////

    ///////////////
    // Constants // 
    ///////////////

        const COLORS = useRecoilValue(colorState)
        const SIZES = useRecoilValue(sizeState)
        const navigation = useNavigation();

    //////////////////
    // Recoil State //
    //////////////////

        // User Settings
        const [user, setUser] = useRecoilState(userState)

        // Organization Settings
        const [org, setOrg] = useRecoilState(organizationState)

    /////////////////
    // Local State //
    /////////////////

        // Entered Name
        const [newName, setNewName] = useState(org.name)     
        
        // Entered Number
        let ogNum = "No Number Entered"
        if (org.phoneNumber){
            ogNum = org.phoneNumber
        }
        const [newNumber, setNewNumber] = useState(ogNum)

        // UseEffect to waive off null phoneNumbers
        useEffect(() => {
            if (org.phoneNumber){
                setNewNumber(org.phoneNumber)
            }
            else{
                // setNewNumber("Please Fill This In")
            }
        }, [org])


    ///////////////
    // Mutations //
    ///////////////

        const [saveSettingsMutation, {loading: loadingMeeting, error: errorMeeting, data: meetingData}] = useMutation(EDIT_ORGANIZATION_SETTINGS)

//////////////////////
///                 ///
///    Renderings   ///
///                 ///
///////////////////////

    // Renders the header bar and back arrow
    function renderHeader() {
        return(
            <View style={{marginTop: 40, marginBottom: 30}}>
                <Header 
                    onPress={() => navigation.goBack()}
                    goBack={true}
                    title={"Organization Settings"}
                />
            </View>    
        ) 
    }

    // Renders any text fields for the org
    function renderOrganizationTextFields() {
        return(
            <View style={{marginTop: 40}}>
                <View style={{width: '80%', marginLeft: '10%'}}>
                <Text style={{...FONTS.Title, color: COLORS.iconLight, marginBottom: 10.}}>
                    Name: {org.name}
                </Text>
                <InputField
                    placeholder={newName}
                    title="Name"
                    containerStyle={{ marginBottom: 10 }}
                    onChangeText={(content) => setNewName(content) }
                />
            </View>

            <View style={{width: '80%', marginLeft: '10%', marginTop: 50}}>
                <Text style={{...FONTS.Title, color: COLORS.iconLight, marginBottom: 10.}}>
                    Phone Number: {org.phoneNumber}
                </Text>
                <InputField
                    placeholder={newNumber}
                    title="Phone Number"
                    containerStyle={{ marginBottom: 10 }}
                    onChangeText={(content) => setNewNumber(content) }
                />
            </View>
            </View>
        )
    }

    // Renders the Save Button
    function renderSaveSettingsButton(){
        return(
            <View style={{marginLeft: 30, marginRight: 30, marginTop: 50}}>
                <Button
                    title={"Save Settings"}
                    onPress={() => saveOrgSettings()}
                />
            </View>
        )
    }

    // Renders the Button to Dissolve the Organization
    function renderDissolveOrganization() {
        return(
            <View style={{marginLeft: -5, marginTop: -75}}>
                <SelectionButton
                    title={"Delete Organization"}
                    subtitle={"This will delete your account, as well as any connected to this organization"}
                    leftAlign={true}
                />
            </View>
        )
    }

///////////////////////
///                 ///
///     Handlers    ///
///                 ///
///////////////////////


    function saveOrgSettings(){
        editOrgSettings()
        .then(resolved => {
            if (resolved === -1){
                console.log(resolved)
            }
            else{
                console.log(resolved)
            }
        })
    }

    // Fires the mutation
    async function editOrgSettings(){
      
        // No Phone Number
        if (newNumber === "Please Fill This In"){
            return false
        }
        // Yes Phone Number
        return await saveSettingsMutation({
            variables: {
                name: newName,
                phoneNumber: newNumber
            }
        })
        .catch( err => {
            console.log(err)
            return false
        })
    }


///////////////////////
///                 ///
///    Main Render  ///
///                 ///
///////////////////////
    return(
        <Gradient
            colorOne={COLORS.gradientColor1}
            colorTwo={COLORS.gradientColor2}
            style={{height: '100%'}}
        >
            {renderHeader()}
            {renderOrganizationTextFields()}
            {/* <View style={{marginLeft: '10%', marginRight: '10%', marginTop: 25, marginBottom: 40}}>
                <Text style={{...FONTS.Title, color: COLORS.iconLight}}>
                    Organization Code: {user.ownedOrganization.name}
                </Text>
                <Text style={{...FONTS.Title, fontSize: 22, color: COLORS.iconDark}}>
                    kjfhgoaeijrggoa
                </Text>
            </View>   */}
            {renderSaveSettingsButton()}  
            <View style={{marginTop: '50%'}}>
                {renderDissolveOrganization()}
            </View>
        </Gradient>
    )
}