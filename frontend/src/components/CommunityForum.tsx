import { forumPosts } from '../data/forum';
import AIAnalyzer from './AIAnalyzer';
import TagSuggester from './TagSuggester';

export default function CommunityForum() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Community Forum</h1>
      <ul className="space-y-4">
        {forumPosts.map(post => (
          <li key={post.id} className="border rounded-lg p-4 shadow hover:shadow-xl transition bg-white">
            <div className="text-gray-700 mb-2">{post.content}</div>
            <div className="text-sm text-gray-500">
              Posted by: {post.author} | Date: {post.date} | Replies: {post.replies}
            </div>
            <AIAnalyzer text={post.content} />
            <TagSuggester text={post.content} />
          </li>
        ))}
      </ul>
    </div>
  );
} 