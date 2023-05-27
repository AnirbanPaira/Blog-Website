import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";

const BlogPage = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handlePost = async () => {
    try {
      if (title === "" || content === "") {
        alert("No post to submit");
        return;
      }
      axios
        .post(`http://localhost:8000/api/user/posts`, {
          title: title,
          content: content,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            alert(`Blog posted successfully`);
            navigation.navigate(
              "Your Posted Blogs",
              JSON.stringify({ title, content })
            );
            setTitle("");
            setContent("");
          } else {
            alert(res.data);
          }
        })
        .catch((error) => {
          console.log(error);
          alert("An error occurred, please try again later");
        });
    } catch (error) {
      console.log(error);
      alert(`Error occurred`);
    }
  };

  console.log("Blog posted:", { title, content });

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

export default BlogPage;
