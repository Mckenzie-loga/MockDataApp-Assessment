import React, { useEffect, useState, memo } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Post } from "../data/posts";
import { isDueWithin24h } from "../utils/time";
import { formatZar } from "../utils/money";

type Props = {
  post: Post;
  onRemind?: (post: Post) => void;
  onOpen?: (post: Post) => void;
  onImagePress?: (post: Post) => void;
};

const PostCardComponent: React.FC<Props> = ({
  post,
  onRemind,
  onOpen,
  onImagePress,
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Image.prefetch(post.imageUrl).catch(() => {});
  }, [post.imageUrl]);

  return (
    <Pressable
      onPress={() => onOpen?.(post)}
      style={styles.card}
      accessibilityRole="button"
      accessibilityLabel={`Open details for ${post.title}`}
    >
      <Pressable
        onPress={() => onImagePress?.(post)}
        accessibilityRole="imagebutton"
        accessibilityLabel={`View image for ${post.title}`}
      >
        <Image
          style={styles.image}
          source={{ uri: post.imageUrl }}
          placeholder={{ uri: post.thumbnailUrl }}
          transition={200}
          cachePolicy="disk"
          onLoad={() => setLoaded(true)}
          contentFit="cover"
          blurRadius={loaded ? 0 : 10}
        />
      </Pressable>

      <View style={styles.meta}>
        <Text style={styles.title} numberOfLines={2}>
          {post.title}
        </Text>
        <Text style={styles.sub} numberOfLines={1}>
          {post.supplier} {formatZar(post.amountZar)}
        </Text>

        {isDueWithin24h(post.dueAt) && (
          <Pressable
            onPress={(e) => {
              e.stopPropagation();
              onRemind?.(post);
            }}
            style={styles.remindBtn}
            accessibilityRole="button"
            accessibilityLabel={`Set reminder for ${post.title}`}
          >
            <Text style={styles.remindTxt}>Remind me</Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

export const PostCard = memo(PostCardComponent);

const styles = StyleSheet.create({
  card: {
    width: "100%",
    marginVertical: 8,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 2,
  },
  image: { width: "100%", height: 300 },
  meta: { padding: 12, gap: 4 },
  title: { fontSize: 16, fontWeight: "600" },
  sub: { color: "#666", fontSize: 14 },
  remindBtn: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#43b0a1",
    borderRadius: 6,
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
    minWidth: 80,
  },
  remindTxt: { color: "#fff", fontWeight: "600", fontSize: 12 },
});
