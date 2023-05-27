import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import axios from "axios";

const DashBord = ({ navigation }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

  const handleLogin = async () => {
    try {
      if (name === "" || password === "") {
        alert("Please enter your name and password");
        return;
      }
      axios
        .post(`http://localhost:8000/api/user/login`, {
          name: name,
          password: password,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            alert(`Hello ${name}`);
            console.log("dddddddddd");
            navigation.navigate("Home Screen");
          } else {
            alert(res.data);
          }
        })
        .catch((error) => {
          console.log(error);
          alert("An error occurred");
        });
    } catch (error) {
      console.log(error);
      alert(`**********Error*********`);
    }
  };

  const handleRegister = () => {
    // Perform registration logic here
    console.log("Register clicked");
    navigation.navigate("Registeration");
  };

  const handleImageUpload = () => {
    // Implement image upload logic here
    console.log("Image clicked");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images.png")}
        style={styles.logo}
      ></Image>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleImageUpload}
          style={styles.imageUpload}
        >
          {image ? (
            <Image source={image} style={styles.image} />
          ) : (
            <Text style={styles.uploadText}>Click to upload image</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "cover",
    marginBottom: 30,
  },
  formContainer: {
    width: "80%",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#ffffff",
  },
  button: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2196f3",
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  imageUpload: {
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "cover",
    borderRadius: 18,
    objectFit: "cover",
  },
  uploadText: {
    fontSize: 16,
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default DashBord;
