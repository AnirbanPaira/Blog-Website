import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "react-native-vector-icons";
import axios from "axios";

const UserPosts = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [like, setLike] = useState(0);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/user/posts");
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikePress = () => {
    setLike(like + 1);
  };

  const handleDislikePress = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/posts/${id}/dislike`
      );
      console.log(response.data);
      fetchPosts(); // Refresh posts after dislike
    } catch (error) {
      console.log("Error disliking post:", error.message);
      alert("Error disliking post: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/user/posts/${id}`
      );
      console.log(response.data);
      if (response.status === 200) {
        console.log("Post deleted successfully");
        alert("Post deleted successfully");
        fetchPosts(); // Refresh posts after deletion
      } else {
        throw new Error("Unable to delete post");
      }
    } catch (error) {
      console.log("Error deleting post:", error.message);
      alert("Error deleting post: " + error.message);
    }
  };

  const handleEdit = (post) => {
    if (post && post._id) {
      navigation.navigate("Edit Post", { post });
    } else {
      console.log("Invalid post object:", post);
    }
  };

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.photoButton}>
          <Image source={{ uri: item.photo }} style={styles.photo} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLikePress}>
          <Ionicons
            name="heart-outline"
            size={24}
            color={like > 0 ? "red" : "black"}
          />
          <Text
            style={[styles.buttonText, { color: like > 0 ? "red" : "black" }]}
          >
            Like {like}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleDislikePress(item._id)}
        >
          <Ionicons
            name="thumbs-down-outline"
            size={24}
            color={item.dislikes > 0 ? "blue" : "black"}
          />
          <Text
            style={[
              styles.buttonText,
              { color: item.dislikes > 0 ? "blue" : "black" },
            ]}
          >
            Dislike {item.dislikes}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleDelete(item._id)}
        >
          <AntDesign name="delete" size={24} color="black" />
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleEdit(item)}
        >
          <Ionicons name="create" size={24} color="black" />
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleAddPost = () => {
    navigation.navigate("Posts");
    console.log("Add Post button clicked");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item._id}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddPost}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  postContainer: {
    marginBottom: 16,
    backgroundColor: "#F2F2F2",
    padding: 16,
    borderRadius: 8,
    position: "relative",
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333333",
    backgroundColor: "#ebf5ff",
    padding: 8,
    borderRadius: 4,
  },
  postContent: {
    marginBottom: 8,
    color: "#555555",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    marginLeft: 4,
    color: "#333333",
  },
  addButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#4287f5",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 24,
    color: "#FFFFFF",
  },
  photoButton: {
    position: "absolute",
    top: 8,
    left: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: "hidden",
  },
  photo: {
    width: "100%",
    height: "100%",
  },
});

export default UserPosts;
