import { getPostBySlug } from '../lib/markdown';

describe('getPostBySlug', () => {
  it('should return post data for a given slug', () => {
    const post = getPostBySlug('test-post', ['title', 'published', 'content']);
    expect(post.title).toBe('Test Post');
    expect(post.published.toISOString().split('T')[0]).toBe('2025-01-01');
    expect(post.content).toContain('This is a test post content.');
  });

  it('should return an empty object if slug is not found', () => {
    const post = getPostBySlug('non-existent-post', ['title']);
    expect(post).toEqual({});
  });
});
