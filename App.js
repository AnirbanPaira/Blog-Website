import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import DashBord from "./components/DashBord";
import Registration from "./components/Registeration";
import Blogpage from "./components/Blogpage";
import BlogsPosted from "./components/Blogsposted";
import UserPosts from "./components/UserPosts";
import EditPost from "./components/EditPost";

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login Page">
        <Stack.Screen name="Login Page" component={DashBord} />
        <Stack.Screen name="Registeration" component={Registration} />
        <Stack.Screen name="Posts" component={Blogpage} />
        <Stack.Screen name="Your Posted Blogs" component={BlogsPosted} />
        <Stack.Screen name="Home Screen" component={UserPosts} />
        <Stack.Screen name="Edit Post" component={EditPost} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
