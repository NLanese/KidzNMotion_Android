import { View, Text, TextInput } from "react-native";
import React from "react";
import { Shadow } from "react-native-shadow-2";

import { useRecoilValue } from "recoil";
import { colorState, fontState } from '../Recoil/atoms';

export default function InputField(props) {
    const {
        containerStyle,
        placeholder,
        icon,
        secureTextEntry,
        title,
        onChangeText,
        placeholderTextColor,
        titleTextColor,
        multiline,
        scrollEnabled,
    } = props
    
    const COLORS = useRecoilValue(colorState)
    const FONTS = useRecoilValue(fontState)
    return (
        // <Shadow
        //     viewStyle={{ width: "100%", ...containerStyle }}
        //     startColor={COLORS.shadowStartColor}
        //     finalColor={COLORS.shadowFinalColor}
        //     distance={COLORS.shadowDistance}
        // >
            <View
                style={{
                    
                    height: 60,
                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                    borderColor: COLORS.iconLight,
                    borderRadius: 10,
                    borderWidth: 1.5,
                    paddingLeft: 20,
                    paddingVertical: 8,
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                    ...props.style
                }}
            >
                <View stlye={{flex: 1}}>
                    <Text
                        style={{
                            fontFamily: 'Gilroy-SemiBold',
                            fontSize: 14,
                            color: COLORS.inputTitle,
                            lineHeight: 12 * 1.7,
                            marginTop: 10,
                            marginLeft: 3
                        }}
                    >
                        {title}
                    </Text>
                    <TextInput
                        style={{ paddingRight: 20, width: "100%", color: COLORS.buttonColorDark, height: '100%', marginTop: -10 }}
                        placeholder={placeholder}
                        placeholderTextColor={COLORS.inputPlaceholder}
                        secureTextEntry={secureTextEntry}
                        onChange={(val) => onChangeText(val.nativeEvent.text)}
                        placeholderTextColor={(placeholderTextColor || COLORS.lightGray)}
                        multiline={multiline}
                        scrollEnabled={scrollEnabled || false}
                    />
                </View>
                <View style={{flex: 1}} />
                {icon && icon}
            </View>
        // </Shadow>
    );
}
