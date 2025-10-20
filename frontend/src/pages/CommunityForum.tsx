// src/pages/CommunityForum.tsx
import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  Collapse,
  CircularProgress,
  IconButton,
  Divider,
} from "@mui/material";
import { ThumbUp, Comment } from "@mui/icons-material";
import AIAnalyzer from "../components/AIAnalyzer";
import TagSuggester from "../components/TagSuggester";
import theme from "../styles/theme";
import { authFetch, plainFetch } from "../services/http"; // ✅ shared helpers

type ForumComment = {
  author?: string;
  content: string;
  createdAt?: string;
};

type ForumPost = {
  _id?: string;
  id?: string;
  author?: string;
  content: string;
  createdAt?: string;
  likes?: number;
  comments?: ForumComment[];
};

export default function CommunityForum() {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPostContent, setNewPostContent] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      setLoading(true);
      const res = await plainFetch("/api/forum"); // ✅ no auth needed
      const data = await res.json();
      const list: ForumPost[] = Array.isArray(data) ? data : data?.data || [];
      setPosts(list);
    } catch (err) {
      console.error("Error loading forum posts:", err);
    } finally {
      setLoading(false);
    }
  }

  function pid(p: ForumPost) {
    return (p._id || p.id || "") as string;
  }

  async function handleCreate() {
    const content = newPostContent.trim();
    if (!content) return;

    try {
      const res = await authFetch("/api/forum", {
        method: "POST",
        body: JSON.stringify({ content }), // backend auto-sets author
      });
      const created = await res.json();
      setPosts((prev) => [created, ...prev]);
      setNewPostContent("");
    } catch (err) {
      console.error("Error creating post:", err);
    }
  }

  function toggleComments(postId: string) {
    setExpanded((prev) => ({ ...prev, [postId]: !prev[postId] }));
  }

  function onChangeComment(postId: string, value: string) {
    setCommentInputs((prev) => ({ ...prev, [postId]: value }));
  }

  async function submitComment(postId: string) {
    const content = (commentInputs[postId] || "").trim();
    if (!content) return;

    try {
      const res = await authFetch(`/api/forum/${postId}/comments`, {
        method: "POST",
        body: JSON.stringify({ content }),
      });
      const updated = await res.json();
      setPosts((prev) => prev.map((p) => (pid(p) === postId ? updated : p)));
      setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  }

  async function likePost(postId: string) {
    try {
      const res = await authFetch(`/api/forum/${postId}/like`, {
        method: "POST",
      });
      const updated = await res.json();
      setPosts((prev) => prev.map((p) => (pid(p) === postId ? updated : p)));
    } catch (err) {
      console.error("Error liking post:", err);
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 800, color: theme.colors.textPrimary }}
        >
          Community Forum
        </Typography>
        <Typography variant="body1" sx={{ color: theme.colors.textSecondary }}>
          Share tips, ask questions, and engage with the community.
        </Typography>
      </Box>

      {/* New Post */}
      <Box
        sx={{
          mb: 4,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr auto" },
          gap: 1.5,
          alignItems: "start",
        }}
      >
        <TextField
          fullWidth
          multiline
          minRows={3}
          placeholder="Share your thoughts..."
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleCreate}
          sx={{
            bgcolor: theme.colors.primary,
            "&:hover": { bgcolor: theme.colors.secondary },
            height: { xs: 40, sm: "auto" },
          }}
        >
          Post
        </Button>
      </Box>

      {/* Posts */}
      <Box>
        {posts.length === 0 ? (
          <Typography color="text.secondary">
            No posts yet. Be the first to post!
          </Typography>
        ) : (
          posts.map((post) => {
            const id = pid(post);
            const initials =
              (post.author || "Anonymous").trim().charAt(0).toUpperCase() || "A";
            const created = post.createdAt
              ? new Date(post.createdAt).toLocaleString()
              : "";

            return (
              <Box key={id} sx={{ mb: 4 }}>
                {/* Header */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Avatar
                    sx={{
                      bgcolor: theme.colors.primary,
                      mr: 2,
                      width: 36,
                      height: 36,
                    }}
                  >
                    {initials}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {post.author || "Anonymous"}
                    </Typography>
                    {created && (
                      <Typography variant="caption" color="text.secondary">
                        {created}
                      </Typography>
                    )}
                  </Box>
                </Box>

                {/* Content */}
                <Typography sx={{ mb: 1, textAlign: "left", ml: 6 }}>
                  {post.content}
                </Typography>

                {/* AI helpers */}
                <Box sx={{ ml: 6, display: "grid", gap: 1, mb: 1 }}>
                  <AIAnalyzer text={post.content} />
                  <TagSuggester text={post.content} />
                </Box>

                {/* Actions */}
                <Box sx={{ display: "flex", gap: 1, alignItems: "center", ml: 6 }}>
                  <IconButton size="small" onClick={() => likePost(id)}>
                    <ThumbUp fontSize="small" />
                  </IconButton>
                  <Typography variant="body2">{post.likes || 0}</Typography>

                  <Button
                    size="small"
                    startIcon={<Comment />}
                    onClick={() => toggleComments(id)}
                    sx={{ ml: 1 }}
                  >
                    Comments ({post.comments?.length || 0})
                  </Button>
                </Box>

                {/* Previous comments */}
                <Collapse in={!!expanded[id]} unmountOnExit>
                  <Box sx={{ ml: 6, mt: 1, textAlign: "left" }}>
                    {(post.comments || []).map((c, i) => (
                      <Box key={i} sx={{ mb: 1.2 }}>
                        <Typography variant="subtitle2">
                          {c.author || "User"}
                        </Typography>
                        <Typography variant="body2">{c.content}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Collapse>

                {/* New comment */}
                <Box sx={{ display: "flex", gap: 1, mt: 1, ml: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Write a comment..."
                    value={commentInputs[id] || ""}
                    onChange={(e) => onChangeComment(id, e.target.value)}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => submitComment(id)}
                    sx={{
                      bgcolor: theme.colors.primary,
                      "&:hover": { bgcolor: theme.colors.secondary },
                    }}
                  >
                    Comment
                  </Button>
                </Box>

                <Divider sx={{ mt: 2 }} />
              </Box>
            );
          })
        )}
      </Box>
    </Container>
  );
}
