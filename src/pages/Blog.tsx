import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header"; 
import Footer from "@/components/Footer";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  keyword: string;
  created_at: string;
  word_count: number;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPublishedPosts();
  }, []);

  // Ensure broken or external images render a friendly placeholder
  useEffect(() => {
    if (!selectedPost) return;
    const container = contentRef.current;
    if (!container) return;

    const imgs = container.querySelectorAll('img');
    imgs.forEach((img) => {
      img.setAttribute('loading', 'lazy');
      img.setAttribute('decoding', 'async');

      const handleError = () => {
        const alt = img.getAttribute('alt') || selectedPost.keyword || 'Life insurance';
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="480"><rect width="100%" height="100%" fill="#eef2ff"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" fill="#1e3a8a">${alt}</text><text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#6b7280">Image unavailable</text></svg>`;
        try {
          img.src = `data:image/svg+xml;base64,${btoa(svg)}`;
        } catch (_) { /* no-op */ }
        img.removeEventListener('error', handleError);
      };

      img.addEventListener('error', handleError);

      const src = img.getAttribute('src') || '';
      // If already failed before we attached listeners
      if (img.complete && (img.naturalWidth === 0 || img.naturalHeight === 0)) {
        handleError();
        return;
      }
      // If the src looks empty or suspicious, swap immediately
      if (!src || src.startsWith('blob:null') || src === 'about:blank')) {
        handleError();
        return;
      }
    });
  }, [selectedPost]);

  const fetchPublishedPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (wordCount: number) => {
    const wordsPerMinute = 200;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <button
            onClick={() => setSelectedPost(null)}
            className="flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </button>
          
          <article className="max-w-4xl mx-auto">
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {selectedPost.title}
              </h1>
              
              <div className="flex items-center space-x-6 text-muted-foreground text-sm mb-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(selectedPost.created_at)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{getReadingTime(selectedPost.word_count)}</span>
                </div>
              </div>
              
              <div className="bg-primary/10 border border-primary/20 rounded-lg px-4 py-2 inline-block">
                <span className="text-primary font-medium text-sm">
                  {selectedPost.keyword}
                </span>
              </div>
            </header>
            
            <div className="prose prose-lg max-w-none blog-content">
              <div 
                ref={contentRef}
                className="text-foreground leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />
            </div>
          </article>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Life Insurance Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expert insights, tips, and guidance on life insurance to help protect your family's financial future.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-4">Loading blog posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              No blog posts yet
            </h2>
            <p className="text-muted-foreground">
              Check back soon for expert insights on life insurance.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-[var(--shadow-medium)] transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <div className="mb-4">
                  <div className="bg-primary/10 border border-primary/20 rounded-lg px-3 py-1 inline-block mb-3">
                    <span className="text-primary font-medium text-xs">
                      {post.keyword}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-card-foreground mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                    {post.content.substring(0, 150)}...
                  </p>
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(post.created_at)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3 h-3" />
                    <span>{getReadingTime(post.word_count)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;