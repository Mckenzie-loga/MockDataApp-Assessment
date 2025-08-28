import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Pressable,
  TextInput,
  Alert,
  Modal,
  Platform,
} from "react-native";
import { fetchPosts } from "./src/api/mockApi";
import { Post } from "./src/data/posts";
import { PostCard } from "./src/components/PostCard";
import {
  requestNotifPermissions,
  scheduleReminder,
  addResponseListener,
} from "./src/notifications";
import { Image } from "expo-image";

export default function App() {
  const [items, setItems] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState<number | null>(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openedId, setOpenedId] = useState<string | null>(null);
  const [clickedImage, setClickedImage] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    requestNotifPermissions().catch(() => {});
    const sub = addResponseListener((postId) => setOpenedId(postId));
    return () => sub.remove();
  }, []);

  const load = useCallback(
    async (p: number, mode: "append" | "replace") => {
      if (loading) return;
      setLoading(true);
      try {
        const res = await fetchPosts(p);
        setItems((prev) => {
          const merged =
            mode === "replace" ? res.items : [...prev, ...res.items];
          const map = new Map(merged.map((x) => [x.id, x]));
          return Array.from(map.values());
        });
        setPage(p);
        setNextPage(res.nextPage);

        if (res.nextPage) {
          const nextRes = await fetchPosts(res.nextPage);
          nextRes.items.forEach((post) =>
            import("expo-image").then(({ Image }) =>
              Image.prefetch(post.imageUrl).catch(() => {})
            )
          );
        }
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Unknown error";
        if (message !== error) {
          setError(message);
          setTimeout(() => setError(null), 6000);
        }
      } finally {
        setLoading(false);
      }
    },
    [loading, error]
  );

  useEffect(() => {
    load(1, "replace");
  }, [load]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    load(1, "replace").finally(() => setRefreshing(false));
  }, [load]);

  const onEndReached = useCallback(() => {
    if (!nextPage || loading) return;
    load(nextPage, "append");
  }, [nextPage, loading, load]);

  const selected = useMemo(
    () => items.find((i) => i.id === openedId) || null,
    [items, openedId]
  );
  const filteredItems = useMemo(
    () =>
      items.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [items, searchQuery]
  );

  const footer = () => (
    <View style={{ paddingVertical: 16, alignItems: "center" }}>
      {loading && <ActivityIndicator />}
      {!nextPage && !loading && (
        <Text style={{ color: "#666" }}>No more items</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f8fa" }}>
      <View
        style={{
          paddingHorizontal: 12,
          paddingTop: 8,
          paddingBottom: 4,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 40, fontWeight: "700" }}>Media Feed</Text>
        {error && (
          <Pressable
            onPress={() => load(page, "append")}
            accessibilityRole="button"
            accessibilityLabel="Retry loading posts"
            style={{
              backgroundColor: "#ff4d4f",
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>Retry</Text>
          </Pressable>
        )}
      </View>

      <View
        style={{
          paddingHorizontal: 12,
          paddingVertical: 8,
          alignItems: "flex-start",
        }}
      >
        <TextInput
          placeholder="Search posts..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          accessibilityLabel="Search posts input"
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            paddingHorizontal: 8,
            height: 36,
            width: 200,
          }}
        />
      </View>

      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingBottom: 24,
          paddingTop: 8,
        }}
        data={filteredItems}
        keyExtractor={(it) => it.id}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onOpen={(p) => setOpenedId(p.id)}
            onImagePress={(p) => setClickedImage(p)}
            onRemind={async (p) => {
              if (!p.dueAt || new Date(p.dueAt).getTime() <= Date.now()) {
                Alert.alert(
                  "Cannot Schedule Reminder",
                  "This post has no due date or is already past."
                );
                return;
              }
              try {
                await scheduleReminder(p.id, p.title, new Date(p.dueAt));
                Alert.alert(
                  "Reminder Scheduled",
                  `A reminder for "${p.title}" has been scheduled.`
                );
              } catch {
                console.warn("Notifications not available on this device.");
                Alert.alert("Reminder Failed", "Failed to set reminder.");
              }
            }}
          />
        )}
        ListFooterComponent={footer}
        onEndReachedThreshold={0.5}
        onEndReached={onEndReached}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            title="Refreshing feed..."
          />
        }
      />

      {/* Detail View */}
      {selected && (
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#fff",
            padding: 16,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            elevation: 10,
          }}
        >
          <Text style={{ fontWeight: "700", fontSize: 16 }}>
            {selected.title}
          </Text>
          <Text style={{ color: "#666", marginTop: 4 }}>
            {selected.supplier}
          </Text>
          <Pressable
            onPress={() => setOpenedId(null)}
            accessibilityRole="button"
            accessibilityLabel="Close detail view"
            style={{ marginTop: 10 }}
          >
            <Text style={{ color: "#43b0a1", fontWeight: "600" }}>Close</Text>
          </Pressable>
        </View>
      )}

      {/* Full-Screen Image Modal */}
      <Modal visible={!!clickedImage} transparent={true} animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.95)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: clickedImage?.imageUrl }}
            style={{ width: "100%", height: "100%" }}
            contentFit="contain"
            accessibilityLabel="Full screen image"
          />
          <Pressable
            onPress={() => setClickedImage(null)}
            accessibilityRole="button"
            accessibilityLabel="Close full screen image"
            style={{
              position: "absolute",
              top: 40,
              right: 20,
              padding: 12,
              backgroundColor: "#fff",
              borderRadius: 24,
            }}
          >
            <Text style={{ fontWeight: "700", fontSize: 16 }}>Close</Text>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
