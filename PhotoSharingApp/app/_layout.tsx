import {Tabs} from "expo-router";

export default function Layout() {
    return <Tabs>
        <Tabs.Screen name="index" options={{title: "Feed"}} />
        <Tabs.Screen name="camera" options={{title: "Camera"}} />
        <Tabs.Screen name="profile" options={{title: "Profile"}} />
    </Tabs>
}