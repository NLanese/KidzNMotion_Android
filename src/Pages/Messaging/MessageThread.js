// Reaact
import { View, Text, SafeAreaView, ScrollView, Image, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import React, {useState} from "react";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


// Nuton
import { Header, Button, ProfileEditCategoryComponent, InputField } from "../../../NutonComponents";
import { AREA, COLORS } from "../../../NutonConstants";
import { Camera } from "../../../svg";

// GraphQL
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE, GET_CHAT_FROM_ID, GET_USER } from "../../../GraphQL/operations";
import client from "../../utils/apolloClient";

// Recoil
import { useRecoilValue, useRecoilState } from "recoil";
import {sizeState, userState, colorState, fontState, avatarState } from '../../../Recoil/atoms';


// Ostrich
import Gradient from "../../../OstrichComponents/Gradient";
import { useEffect } from "react";
import { render } from "react-dom";

let maxWidth = Dimensions.get('window').width
let maxHeight = Dimensions.get('window').height

export default function MessageThread(props) {
///////////////////////
///                 ///
///   Preliminary   ///
///                 ///
///////////////////////

    const COLORS = useRecoilValue(colorState)
    const FONTS = useRecoilValue(fontState)
    const SIZES = useRecoilValue(sizeState)
    const AVATAR = useRecoilValue(avatarState)
    const navigation = useNavigation();

    let OgChatroom 
    let color2
    let imported
    let hardCodedAndOwned = false

    if (!props.hardCodedChat){
        OgChatroom = props.route.params?.item
        color2 = COLORS.gradientColor1
        imported = true
    }
    else{
        OgChatroom = props.hardCodedChat[0]
        color2 = COLORS.gradientColor2
        imported = false
    }

    if (props.isItMe){
        hardCodedAndOwned = true
    }

    const [user, setUser] = useRecoilState(userState)

    const [contact, setContact] = useState({
        firstName: "null",
        lastName: "null",
        profilePic: "null"
    })

    const [chatroom, setChatroom] = useState(OgChatroom)

    const [chatToRender, setChatToRender] = useState(chatroom)

    const [textEntered, setTextEntered] = useState()

    const [reset, setReset] = useState(props.reset)


///////////////////////
///                 ///
///    useEffect    ///
///                 ///
///////////////////////

    // Populates Contact
    useEffect(() => {
        setContact(chatroom.users.filter(person => {
            if (person.id !== user.id){
                return person
            }
        })[0])
    }, [])

    // Resets feed on render
    // useEffect(() => {
    //     user.chatRooms.forEach(chat => {
    //         if (chat.id === chatroom.id){
    //             setChatroom(chat)
    //             return null
    //         }
    //     })
    // }, [user])

    useEffect(() => {
        let OgChatroom 
        let color2
        let imported
        let hardCodedAndOwned = false

    
        if (!props.hardCodedChat){
            OgChatroom = props.route.params?.item
            color2 = COLORS.gradientColor1
            imported = true
        }
        else{
            OgChatroom = props.hardCodedChat[0]
            color2 = COLORS.gradientColor2
            imported = false
        }
        setChatroom(OgChatroom)
    }, [reset])



///////////////////////
///                 ///
///    Mutations    ///
///                 ///
///////////////////////

    const [sendMessage, { loading: loadingAdd, error: errorAdd, data: typeAdd }] =useMutation(SEND_MESSAGE);

///////////////////////
///                 ///
///      Style      ///
///                 ///
///////////////////////

    const Styles = StyleSheet.create({
        yourMessageBubble: {
            padding: maxWidth * 0.01,
            paddingLeft: maxWidth * 0.03,
            backgroundColor: COLORS.gradientColor1,
            // backgroundColor: 'rgba(255, 255, 255, .40)',
            borderRadius: 10,
            // borderWidth: 1,
            // borderColor: 'black',
            flex: 7,
            marginBottom: 8
        },
        yourMessageBubbleNA: {
            padding: maxWidth * 0.01,
            paddingLeft: maxWidth * 0.03,
            marginLeft: maxWidth * 0.015,
            borderRadius: 10,
            flex: 7,
            marginBottom: 8
        },
        messageProfilePic:{
            flex: 2
        },
        theirMessageBubble: {
            padding: maxWidth * 0.01,
            marginRight: maxWidth * 0.015,
            paddingLeft: maxWidth * 0.03,
            backgroundColor: 'white',
            borderRadius: 10,
            flex: 7,
            marginBottom: 8
        },
        theirMessageBubbleNA: {
            padding: maxWidth * 0.01,
            paddingRight: maxWidth * 0.03,
            borderRadius: 10,
            flex: 7,
            marginBottom: 8
        },
        messageSpace: {
            // position: 'relative',
            marginRight: 2, 
            marginLeft: 2, 
            borderColor: COLORS.iconLight, 
            height: maxHeight * .75, 
            padding: 4, 
            borderColor: COLORS.iconLight, 
            borderWidth: 1, 
            borderRadius: 10,
            paddingTop: 30, 
            paddingBottom: 20,
        },
        textBubbleView: {
        //    position: 'relative',
           height: maxHeight * .16,
           backgroundColor: COLORS.gradientColor1,
           flexDirection: 'row'
        },
        textInput: {
            borderWidth: 1,
            borderRadius: 10,
            borderColor: 'black',
            marginLeft: maxWidth * 0.07,
            margin: 10,
            height: maxHeight * 0.12,
            width: maxWidth * .75,
            backgroundColor: 'white',
            paddingRight: 20,
            paddingLeft: 20,
            paddingTop: 10,
            paddingBottom: 15
        }
    })
   
///////////////////////
///                 ///
///    Renderings   ///
///                 ///
///////////////////////

    // Renders the Header guy
    function renderHeader() {
        if (!imported){
            return null
        }
        return (
            <View style={{marginTop: 40}}>
                <Header
                    title={`Chat with ${contact.firstName}`}
                    goBack={true}
                    onPress={() => navigation.goBack()}
                    profile={false}
                    thisFontSize={18}
                />
            </View>
        );
    }

    // Renders a single message
    function renderSingleMessage(message, thisUser, first, last){


        if (!message.sentBy){
            return null
        }

        /////////////////
        // Sent By You //
        if (thisUser){
            
            //////////////////////////////////// 
            // This is the first of the clump //
            if (first){
                return(
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <View style={Styles.messageProfilePic} />

                        <View style={Styles.theirMessageBubbleNA} />

                        <View style={Styles.yourMessageBubble}>
                            <Text>{message.content}</Text>
                        </View>

                        <View style={Styles.messageProfilePic}>

                        </View>
                    </View>
                )
            }

            ////////////////////////////////////
            // This is the last of the clump //
            if (last){
                return(
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <View style={Styles.messageProfilePic} />

                        <View style={Styles.theirMessageBubbleNA}>
                            
                        </View>


                        <View style={Styles.yourMessageBubble}>
                            <Text>{message.content}</Text>
                        </View>

                        <View style={Styles.messageProfilePic}/>

                    </View>
                )
            }

            /////////////////////////////////////////
            // Neither first nor last of the clump //
            if (!last && !first){
                return(
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <View style={Styles.messageProfilePic} />

                        <View style={Styles.theirMessageBubbleNA}>
                            
                        </View>


                        <View style={Styles.yourMessageBubble}>
                            <Text>{message.content}</Text>
                        </View>

                        <View style={Styles.messageProfilePic}/>

                    </View>
                )
            }
            
        }
        ///////////////////
        // Sent By Other //
        else if (!thisUser){


            //////////////////////////////////// 
            // This is the first of the clump //
            if (first){
                return(
                    <View style={{display: 'flex', flexDirection: 'row'}}>

                        <View style={Styles.messageProfilePic}>

                        </View>
                        <View style={Styles.theirMessageBubble}>
                            <Text>{message.content}</Text>
                        </View>


                        <View style={Styles.yourMessageBubbleNA}/>

                        <View style={Styles.messageProfilePic}/>
                    </View>
                )
            }

            ////////////////////////////////////
            // This is the last of the clump //
            if (last){
                return(
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <View style={Styles.messageProfilePic} />

                        <View style={Styles.theirMessageBubble}>
                            <Text>{message.content}</Text>
                        </View>


                        <View style={Styles.yourMessageBubbleNA}/>

                        <View style={Styles.messageProfilePic}/>
                    </View>
                )
            }

            /////////////////////////////////////////
            // Neither first nor last of the clump //
            if (!last && !first){
                return(
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <View style={Styles.messageProfilePic} />

                        <View style={Styles.theirMessageBubble}>
                            <Text>{message.content}</Text>
                        </View>


                        <View style={Styles.yourMessageBubbleNA}>
                            
                        </View>

                        <View style={Styles.messageProfilePic}/>

                    </View>
                )
            }
        }


    }

    // Renders all messages consecutively sent by the same user
    function renderMessagesBySameSender(messageArray){

        let thisSend = user.id
        if (!imported){
            thisSend = props.hardCoderUserId
        }
        ////////////////////////////////////////////
        // Iterates through all Supplied Messages //
        return messageArray.map((message, index) => {

            if (!message.sentBy){
                return null
            }

            // This User? If its the user id, yes otherwise, no
            let thisUser = message.sentBy.userID === thisSend ? true : false

            // Fist message? Index == 0 yes, otherwise, no
            let first = index === 0 ? true : false

            // Last message? index = legnth - 1 yes, otheriwse no
            let last = index < messageArray.legth ? false : true

            ////////////
            // RETURN //
            return renderSingleMessage(message, thisUser, first, last)
        })
    }

    // Renders all of the messages
    function renderAllMessages(){

        /////////////////////////////////////////
        // Gets all consecutive message clumps //
        let messageClumps = chopAtDifferentSenders(chatroom.messages)

        //////////////////////////////////////////////////////////////////////////////////
        // Breaks up each message clump into an individual render to return all message //
        return messageClumps.map(messageClump => {
            return renderMessagesBySameSender(messageClump)
        })
    }

    // Renders The Text Input Space
    function renderTextInput(){
        return(
            <View style={Styles.textInput}>
                <TextInput
                    style={{height: '100%'}}
                    value={textEntered}
                    onChangeText={(content) => setTextEntered(content)}
                    multiline={true}
                />
            </View>
        )
    }

    // Renders the Send Button
    function renderSendButton(){
        return(
            <TouchableOpacity onPress={() => handleSendMessage()} style={{marginTop: 60}}>
                <Gradient
                    style={{height: 50, width: 50, borderRadius: 100, justifyContent: 'center', borderColor: 'black', borderWidth: 1}}
                    colorOne={COLORS.gradientColor1}
                    colorTwo={COLORS.gradientColor2}
                > 
                   <Text style={{textAlign: 'center', fontFamily: 'Gilroy-Bold', fontSize: 16}}>Send</Text>
                </Gradient>
            </TouchableOpacity>
        )
    }
    
    // Combines the Text Input and Send Button into one display
    function renderInputSpace(){
        return(
            <View style={Styles.textBubbleView}>
                {renderTextInput()}
                {renderSendButton()}
            </View>
        )
    }

    // Main Render
    function MainRender(){
        if (!imported){
            if (hardCodedAndOwned){
                console.log("1")
                return(
                    <View style={{height: maxHeight * 0.85, marginRight: 7, backgroundColor: COLORS.gradientColor2, borderRadius: 15, marginRight: 7,}}>
                        {/* All messages */}
                        <ScrollView style={{...Styles.messageSpace, height: '90%'}} contentContainerStyle={{height: 'auto', paddingBottom: maxHeight * .10, }}>
                            {renderAllMessages()}
                        </ScrollView>
                        {renderInputSpace()}
                    </View>
                )
            }
            console.log("2")
            return(
                <View>
                    <ScrollView style={Styles.messageSpace} contentContainerStyle={{height: 'auto', paddingBottom: maxHeight * .10, }}>
                        {renderAllMessages()}
                    </ScrollView>
                </View>
            )
        }
        else{
            console.log("#")
            return(
                <View>
                    {/* All messages */}
                    <ScrollView style={Styles.messageSpace} contentContainerStyle={{height: 'auto', paddingBottom: maxHeight * .10, }}>
                        {renderAllMessages()}
                    </ScrollView>
                    {renderInputSpace()}
                </View>
            )
        }
    }




///////////////////////
///                 ///
///     Handlers    ///
///                 ///
///////////////////////


    // Returns all of the messages, but grouped by sender
    function chopAtDifferentSenders(messageArray){

        console.clear()

        ///////////////
        // Constants //
        let user1 = user
        let user2 = contact
        let returnArrayOfMessages = []
        let arrayOfSameSender = []

        ///////////////////////////////////
        // Iterates through all messages //
        for (let i = 0; i < messageArray.length + 1; i++){

            ///////////////////////////////////////////////////////////////////////////
            // Final iteration, one beyond legth. This pushes all remaining messaged //
            if (!(i < messageArray.length)){
                returnArrayOfMessages.push(arrayOfSameSender)
            }

            ///////////////////////
            // Normal Iterations //
            else {

                /////////////////////////////////////
                // First time accessing this array //
                if (arrayOfSameSender.length === 0){
                    arrayOfSameSender.push(messageArray[i])
                }

                ////////////////////////////////
                // Another of the Same Sender //
                else if (messageArray[i].sentBy.id === arrayOfSameSender[0].sentBy.id){
                    arrayOfSameSender.push(messageArray[i])
                }

                //////////////////////
                // Different Sender //
                else if (messageArray[i].sentBy.id !== arrayOfSameSender[0].sentBy.id){
                    returnArrayOfMessages.push(arrayOfSameSender)
                    arrayOfSameSender = []
                    arrayOfSameSender.push(messageArray[i])
                }
            }

            
        }
 
        //////////////////
        // Final Return //
        return returnArrayOfMessages
    }

    // Does all the mutations, queries, and state changes related nwith sending a message
    function handleSendMessage(){
        if (textEntered === "" || !textEntered){
            return null
        }
        handleSendMessageMutation()
        .then( async (resolved) => {
            setTextEntered("")
            await getAndSetUser()
        })
    }

    // Runs the Apollo Mutation to send the message
    async function handleSendMessageMutation(){
        return await sendMessage({
            variables: {
                content: textEntered,
                chatRoomID: chatroom.id
            }
        }).catch(err => console.log(err))
    }

    async function getAndSetUser(){
        await client.query({
            query: GET_USER,
            fetchPolicy: 'network-only'  
        })
        .then(async (resolved) => {
            await setUser(resolved.data.getUser)
        })
        .catch((error) => {
            console.log(error)
        })
    }

///////////////////////
///                 ///
///    Main Render  ///
///                 ///
///////////////////////
    return(
        <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
        >
            <Gradient
                colorOne={COLORS.gradientColor1}
                colorTwo={COLORS.gradientColor2}
                style={{width: maxWidth * 1.02}}
            >
                {renderHeader()}
                {MainRender()}
            </Gradient>
        </KeyboardAwareScrollView>
        
    )
}