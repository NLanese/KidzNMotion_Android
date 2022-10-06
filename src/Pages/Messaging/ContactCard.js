// Reaact
import { View, Text, SafeAreaView, ScrollView, Image, ImageBackground, TouchableOpacity } from "react-native";
import React, {useState} from "react";
import { useNavigation } from "@react-navigation/native";

// Nuton
import { Header, Button, ProfileEditCategoryComponent } from "../../../NutonComponents";
import { AREA, COLORS } from "../../../NutonConstants";
import { Camera } from "../../../svg";

// Recoil
import { useRecoilValue, useRecoilState } from "recoil";
import {sizeState, clientListState, userState, colorState, fontState } from '../../../Recoil/atoms';

// Ostrich
import Gradient from "../../OstrichComponents/Gradient";
import SelectionButton from "../../../OstrichComponents/SelectionButton";

export default function ContactCard({contact}) {
///////////////////////
///                 ///
///   Preliminary   ///
///                 ///
///////////////////////

    ///////////////
    // Constants // 
    ///////////////


    /////////////////
    // Local State //
    /////////////////
        

    //////////////////
    // Recoil State //
    //////////////////


//////////////////////
///                 ///
///    Renderings   ///
///                 ///
///////////////////////


///////////////////////
///                 ///
///     Handlers    ///
///                 ///
///////////////////////


///////////////////////
///                 ///
///    Main Render  ///
///                 ///
///////////////////////
    return(
       <SelectionButton 
            title={contact.}
            hasProfilePic={true}
       />
    )
}