import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";

const BlogsPosted = ({ navigation }) => {
  const route = useRoute();
  const { title, content } = route.params;

  const [blogs, setBlogs] = useState([]);

  const handleLike = (blogId) => {
    // Implement logic to handle the like action for the specified blog
    console.log("Liked blog:", blogId);
  };

  const handleDislike = (blogId) => {
    // Implement logic to handle the dislike action for the specified blog
    console.log("Disliked blog:", blogId);
  };

  const handleComment = (blogId) => {
    // Implement logic to handle the comment action for the specified blog
    console.log("Commented on blog:", blogId);
  };

  const handleShare = (blogId) => {
    // Implement logic to handle the share action for the specified blog
    console.log("Shared blog:", blogId);
  };

  const handelgoBack = () => {
    navigation.navigate("Home Screen");
  };

  // Mock data for blogs
  const mockBlogs = [
    {
      id: 1,
      title: title,
      content: content,
      likes: 0,
      dislikes: 0,
    },
  ];

  return (
    <View style={styles.container}>
      {mockBlogs.map((blog) => (
        <View key={blog.id} style={styles.blogContainer}>
          <Text style={styles.blogTitle}>{blog.title}</Text>
          <Text style={styles.blogContent}>{blog.content}</Text>
          <View style={styles.buttonContainer}>
            <Button
              title={`Like (${blog.likes})`}
              onPress={() => handleLike(blog.id)}
            />
            <Button
              title={`Dislike (${blog.dislikes})`}
              onPress={() => handleDislike(blog.id)}
            />
            <Button title="Comment" onPress={() => handleComment(blog.id)} />
            <Button title="Share" onPress={() => handleShare(blog.id)} />
          </View>
          <View style={styles.space} /> {/* Added space above the button */}
          <TouchableOpacity style={styles.button} onPress={handelgoBack}>
            <Text style={styles.buttonText}>Go To Home Screen</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  blogContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "gray",
    padding: 12,
    borderRadius: 4,
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  blogContent: {
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  space: {
    marginBottom: 8, // Adjust the amount of space as needed
  },
  button: {
    backgroundColor: "#2196F3", // Set your desired background color
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF", // Set your desired text color
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BlogsPosted;
