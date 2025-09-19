import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus, FileText, Clock, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  keyword: string;
  title: string;
  content: string;
  suggested_titles: string;
  status: string;
  word_count: number;
  created_at: string;
  published_at?: string;
  updated_at: string;
}

const BlogAdmin = () => {
  const { toast } = useToast();
  const [keyword, setKeyword] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      toast({
        title: "Error",
        description: "Failed to fetch blog posts",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-blog-generate', {
        body: { keyword: keyword.trim() }
      });

      if (error) throw error;

      if (data.success) {
        toast({
          title: "Success",
          description: `Blog post generated for "${keyword}" (${data.wordCount} words)`,
        });
        setKeyword('');
        await fetchBlogPosts(); // Refresh the list
      } else {
        throw new Error(data.error || 'Failed to generate blog post');
      }
    } catch (error) {
      console.error('Error generating blog post:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate blog post",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const updatePostStatus = async (postId: string, status: 'draft' | 'published' | 'archived') => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ 
          status,
          published_at: status === 'published' ? new Date().toISOString() : null
        })
        .eq('id', postId);

      if (error) throw error;

      setBlogPosts(posts => posts.map(post => 
        post.id === postId ? { ...post, status } : post
      ));

      if (selectedPost?.id === postId) {
        setSelectedPost({ ...selectedPost, status });
      }

      toast({
        title: "Success",
        description: `Blog post ${status}`,
      });
    } catch (error) {
      console.error('Error updating post status:', error);
      toast({
        title: "Error",
        description: "Failed to update post status",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Published</Badge>;
      case 'draft':
        return <Badge variant="secondary"><FileText className="w-3 h-3 mr-1" />Draft</Badge>;
      case 'archived':
        return <Badge variant="outline"><Clock className="w-3 h-3 mr-1" />Archived</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 p-6">
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AI Blog Generator
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Generate SEO-optimized blog posts using AI. Enter a keyword to research and create comprehensive articles.
          </p>
        </div>

        {/* Generation Form */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Generate New Blog Post
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <Input
                  placeholder="Enter keyword or topic (e.g., 'life insurance benefits')"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="text-lg"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isGenerating || !keyword.trim()}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating Article...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Generate Blog Post
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Blog Posts List */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Generated Blog Posts</h2>
            {blogPosts.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No blog posts generated yet. Start by entering a keyword above.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {blogPosts.map((post) => (
                  <Card 
                    key={post.id} 
                    className={`cursor-pointer transition-all ${selectedPost?.id === post.id ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setSelectedPost(post)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold truncate">{post.title}</h3>
                        {getStatusBadge(post.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Keyword: {post.keyword}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{post.word_count} words</span>
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Selected Post Details */}
          <div className="space-y-6">
            {selectedPost ? (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">Post Details</h2>
                  <div className="flex gap-2">
                    {selectedPost.status === 'draft' && (
                      <Button 
                        onClick={() => updatePostStatus(selectedPost.id, 'published')}
                        size="sm"
                      >
                        Publish
                      </Button>
                    )}
                    {selectedPost.status === 'published' && (
                      <Button 
                        onClick={() => updatePostStatus(selectedPost.id, 'archived')}
                        variant="outline"
                        size="sm"
                      >
                        Archive
                      </Button>
                    )}
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>{selectedPost.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Keyword: {selectedPost.keyword}</span>
                      <span>{selectedPost.word_count} words</span>
                      {getStatusBadge(selectedPost.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedPost.suggested_titles && (
                      <div>
                        <h4 className="font-semibold mb-2">Suggested Titles:</h4>
                        <Textarea
                          value={selectedPost.suggested_titles}
                          readOnly
                          rows={4}
                          className="text-sm"
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold mb-2">Content Preview:</h4>
                      <Textarea
                        value={selectedPost.content.slice(0, 500) + (selectedPost.content.length > 500 ? '...' : '')}
                        readOnly
                        rows={10}
                        className="text-sm"
                      />
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Select a blog post to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogAdmin;