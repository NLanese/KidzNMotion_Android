export default function getMsgNotificationsToBeDismissed(notifications, contact){
    console.log(notifications)
    return notifications.filter( noti => {
        if (noti.title === `New Message From ${contact.firstName}`){
            return noti
        }
    })
}