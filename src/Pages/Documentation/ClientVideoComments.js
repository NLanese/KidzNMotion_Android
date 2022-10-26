// Reaact
import { View, Text, TextInput, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import React, {useState} from "react";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";


// Nuton
import { Button, Header } from "../../../NutonComponents";

// Recoil
import { useRecoilValue, useRecoilState } from "recoil";
import {sizeState, clientListState, userState, colorState, fontState, avatarState, videoDataState } from '../../../Recoil/atoms';

// GraphQL
import { CREATE_COMMENT } from "../../../GraphQL/operations";
import { useMutation } from "@apollo/client";

// Ostrich vbn5
import Gradient from "../../../OstrichComponents/Gradient";
import { white } from "material-ui/styles/colors";

// Dimensions
let maxWidth = Dimensions.get('window').width
let maxHeight = Dimensions.get('window').height

export default function ClientVideoComments(props) {
///////////////////////
///                 ///
///   Preliminary   ///
///                 ///
///////////////////////

    ///////////////
    // Constants // 
    ///////////////

        let client1 = props.route.params?.item
        const plan = client1.plan
        const client = client1.user


        const COLORS = useRecoilValue(colorState)
        const FONTS = useRecoilValue(fontState)
        const SIZES = useRecoilValue(sizeState)
        const AVATAR = useRecoilValue(avatarState)
        const navigation = useNavigation();

    /////////////////
    // Local State //
    /////////////////

        // Determines which video and which comments will be shown in the comment modal
        const [selectedVid, setSelectedVid] = useState(false)

        // Determines whether the comment modal is open or not
        const [modalOpen, setModalOpen] = useState(false)

        // Tracks the current type
        const [textEntered, setTextEntered] = useState('')

    //////////////////
    // Recoil State //
    //////////////////

    const [videos, setVideos] = useRecoilState(videoDataState)


    ///////////////
    // Mutations //
    ///////////////

    const [createComment, { loading: loadingC, error: errorC, data: typeC }] =useMutation(CREATE_COMMENT);

///////////////////////
///                 ///
///    Renderings   ///
///                 ///
///////////////////////

   // Renders the header bar and back arrow
   function renderHeader() {
        return(
            <View style={{marginTop: 40}}>
                <Header 
                    onPress={() => navigation.goBack()}
                    goBack={true}
                    profile={true}
                    filterOnPress={() => navigation.navigate("SettingsLanding")}
                    title={`Video Comments`}
                />
            </View>    
        )
    }

    // Renders the header font
    function renderTitle(){
        return(
            <View style={{alignSelf: 'center', marginTop: 30}}>
                <Text style={{...FONTS.Title, color: 'white', textAlign: 'center'}}>
                    {client.firstName} {client.lastName}'s Video Comments
                </Text>
            </View>
        )
    }

    // Renders all Video Tabs with Comments 
    function renderAllVideoComments(){
        return videos.map( (video, index) => {
            return (
                <TouchableOpacity 
                key={index}  
                onPress={() => handleHeaderClick(video)}
                style={{marginTop: 12, marginRight: 4, marginLeft: 4, borderColor: 'white', borderWidth: 0.5, paddingTop: 10, paddingBottom: 10, paddingRight: 4, paddingLeft: 4, borderRadius: 6, flexDirection: 'row'}}>
                    <View style={{flex: 7}}>
                        <Text style={{...FONTS.SubTitle, color: 'white', fontSize: 22}}>
                            {video.title}
                        </Text>
                    </View>
                    <View style={{flex: 3}} >
                        <Text style={{...FONTS.SubTitle, color: 'white', fontSize: 18}}>
                            X Comments
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        })
    }

    // Renders the Modal and Styling. Just the Shell
    function renderCommentModal(){
        if (!modalOpen){
            return null
        }
        return (
            <Modal
                isVisible={modalOpen}
                onBackdropPress={() => setModalOpen(false)}
                hideModalContentWhileAnimating={true}
                backdropTransitionOutTiming={0}
                style={{ margin: 0 }}
                animationIn="zoomIn"
                animationOut="zoomOut"
            >
                <View 
                style={{
                width: SIZES.width - 40,
                backgroundColor: COLORS.white,
                marginHorizontal: 20,
                borderRadius: 10,
                paddingHorizontal: 20,
                paddingTop: 40,
                paddingBottom: 10,
                }}>
                    {renderCommentContent()}
                </View>
            </Modal>
        );
    }

    // Renders the actual content within the modal
    function renderCommentContent(){
        return(
            <View>
                <Text style={{...FONTS.SubTitle, textAlign: 'center', marginBottom: 4}}>
                    Comments for {client1.user.firstName} {client1.user.lastName}
                </Text>

                <Text style={{...FONTS.SubTitle, textAlign: 'center', marginBottom: 10}}>
                    {selectedVid.title}
                </Text>
                {renderAddCommentSpace()}
            </View>
        )
    }

    // Renders the Text Input as well as the send button
    function renderAddCommentSpace(){
        return(
            <View style={{marginRight: 20, marginLeft: 20}}>
                <TextInput
                    style={{borderWidth: 1, borderColor: COLORS.iconDark, borderRadius: 15, height: 120, marginBottom: 20, padding: 10}}
                    value={textEntered}
                    onChangeText={(content) => setTextEntered(content)}
                    multiline={true}
                />
                <Button 
                title={"Save Comment"}
                onPress={() => handleSaveComment(selectedVid)}
            />
            </View>
        )
    }


///////////////////////
///                 ///
///     Handlers    ///
///                 ///
///////////////////////

    // Runs on Pressing a Comment Header
    function handleHeaderClick(video){
        setSelectedVid(video)
        setModalOpen(true)
    }

    // Runs the Save Comment Process
    function handleSaveComment(video){
        createCommentMutation(video)
    }

    // Runs the Create Comment Mutation
    async function createCommentMutation(video){
        return await createComment({
            variables: {
                childCarePlanID: plan.id,
                commentContent: textEntered,
                videoID: video.id
            }
        })
        .catch(err => console.log(err))
        .then((resolved) => {
            console.log(resolved)
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
            style={{height: '120%'}}
        >
            {renderHeader()}
            {renderTitle()}
            <View 
            style={{marginRight: 5, marginLeft: 5, borderColor: 'white', borderWidth: 1, borderRadius: 15, marginTop: 15, height: maxHeight * 0.70}}
            >
                <ScrollView>
                    {renderAllVideoComments()}
                    {renderCommentModal()}
                </ScrollView>
            </View>
        </Gradient>
    )
}