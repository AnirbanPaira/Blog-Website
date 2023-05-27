import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";

const EditPost = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const route = useRoute();
  const { post } = route.params;
  console.log(post);

  // Set the initial values of title and content based on postData
  useEffect(() => {
    setTitle(post.title);
    setContent(post.content);
    console.log(`post contents:${post._id}`);
  }, [post]);

  const handlePost = async () => {
    try {
      if (post) {
        console.log(post._id);
        const updatedPost = {
          title,
          content,
        };

        axios
          .patch(
            `http://localhost:8000/api/user/posts/${post._id}`,
            updatedPost
          )
          .then((res) => {
            alert("Post updated");
          }, navigation.navigate("Home Screen"))
          .catch((error) => {
            console.log(error);
            alert("An error occurred, please try again later", error);
          });
      } else {
        const response = await axios.post(
          "http://localhost:8000/api/user/posts",
          {
            title,
            content,
          }
        );
        console.log(response.data);
        alert("Blog posted");
      }
    } catch (error) {
      console.log(error);
      alert("Error saving data");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Content"
        multiline
        numberOfLines={4}
        value={content}
        onChangeText={setContent}
      />
      <Button title="Post" onPress={handlePost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
  },
});

export default EditPost;
