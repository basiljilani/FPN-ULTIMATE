import { Article, Author, Category } from '../data/articles';

const WP_API_URL = import.meta.env.VITE_WP_API_URL;
const WP_JWT_AUTH_URL = import.meta.env.VITE_WP_JWT_AUTH_URL;

interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  _embedded?: {
    author: Array<{ name: string; avatar_urls: Record<string, string> }>;
  };
}

interface WPAuthResponse {
  token: string;
  user_email: string;
  user_nicename: string;
}

// Transform WordPress post to our Article format
const transformPost = (post: WPPost): Article => ({
  id: post.slug,
  title: post.title.rendered,
  excerpt: post.excerpt.rendered,
  date: new Date(post.date).toISOString(),
  readTime: '5 min', // You might want to calculate this based on content length
  category: 'fintech', // You'll need to map WordPress categories
  author: {
    name: post._embedded?.author?.[0]?.name || 'Unknown Author',
    role: 'Contributor'
  },
  content: post.content.rendered
});

export const wpApi = {
  // Authentication
  login: async (username: string, password: string): Promise<WPAuthResponse> => {
    const response = await fetch(`${WP_JWT_AUTH_URL}/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    if (!response.ok) {
      throw new Error('Authentication failed');
    }
    
    return response.json();
  },

  // Posts
  getPosts: async (): Promise<Article[]> => {
    const response = await fetch(`${WP_API_URL}/wp/v2/posts?_embed`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    const posts: WPPost[] = await response.json();
    return posts.map(transformPost);
  },

  getPost: async (slug: string): Promise<Article> => {
    const response = await fetch(`${WP_API_URL}/wp/v2/posts?slug=${slug}&_embed`);
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    
    const posts: WPPost[] = await response.json();
    if (posts.length === 0) {
      throw new Error('Post not found');
    }
    
    return transformPost(posts[0]);
  },

  // Create post (requires authentication)
  createPost: async (token: string, data: Partial<Article>) => {
    const response = await fetch(`${WP_API_URL}/wp/v2/posts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: data.title,
        content: data.excerpt, // You'll need to handle full content
        status: 'publish'
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to create post');
    }
    
    return response.json();
  },

  // Update post
  updatePost: async (token: string, id: string, data: Partial<Article>) => {
    const response = await fetch(`${WP_API_URL}/wp/v2/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: data.title,
        content: data.excerpt,
        status: 'publish'
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to update post');
    }
    
    return response.json();
  },

  // Delete post
  deletePost: async (token: string, id: string) => {
    const response = await fetch(`${WP_API_URL}/wp/v2/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete post');
    }
    
    return response.json();
  }
};
