import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Link, FileText, Shield, AlertTriangle, CheckCircle, XCircle, Clock, Sparkles } from "lucide-react";
import VerificationResult from "./VerificationResult";

interface AnalysisResult {
  id: string;
  content: string;
  status: "real" | "fake" | "uncertain";
  confidence: number;
  sources: string[];
  analysis: string;
  timestamp: Date;
}

const FakeNewsDetector = () => {
  const [newsInput, setNewsInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult[]>([]);

  // Simulated AI analysis - Replace with actual ChatGPT API call
  const analyzeNews = async (content: string, type: "text" | "url") => {
    setIsAnalyzing(true);
    
    // This is where you'll integrate ChatGPT API
    // For now, simulating the analysis
    setTimeout(() => {
      const mockResult: AnalysisResult = {
        id: Date.now().toString(),
        content: type === "url" ? `Content from: ${content}` : content,
        status: Math.random() > 0.5 ? "real" : "fake",
        confidence: Math.floor(Math.random() * 40) + 60,
        sources: [
          "Reuters Fact Check",
          "AP News Verification",
          "BBC Reality Check"
        ],
        analysis: "Based on cross-referencing with trusted sources and linguistic analysis, this content shows indicators of...",
        timestamp: new Date()
      };
      
      setResults(prev => [mockResult, ...prev]);
      setIsAnalyzing(false);
      setNewsInput("");
      setUrlInput("");
    }, 2000);
  };

  const handleTextAnalysis = () => {
    if (newsInput.trim()) {
      analyzeNews(newsInput, "text");
    }
  };

  const handleUrlAnalysis = () => {
    if (urlInput.trim()) {
      analyzeNews(urlInput, "url");
    }
  };

  return (
    <div className="min-h-screen ai-gradient p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-2xl ai-card">
              <Shield className="w-8 h-8 text-ai-primary" />
            </div>
            <h1 className="text-4xl font-bold text-white">
              AI Fake News Detector
            </h1>
          </div>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Verify news authenticity in real-time using advanced AI analysis and multi-source validation
          </p>
        </div>

        {/* Input Section */}
        <Card className="ai-card border-white/10 mb-8">
          <div className="p-6">
            <Tabs defaultValue="text" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/10">
                <TabsTrigger value="text" className="data-[state=active]:bg-ai-primary">
                  <FileText className="w-4 h-4 mr-2" />
                  Text Analysis
                </TabsTrigger>
                <TabsTrigger value="url" className="data-[state=active]:bg-ai-primary">
                  <Link className="w-4 h-4 mr-2" />
                  URL Verification
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="text" className="mt-6">
                <div className="space-y-4">
                  <Textarea
                    placeholder="Paste your news article, social media post, or any text you want to verify..."
                    value={newsInput}
                    onChange={(e) => setNewsInput(e.target.value)}
                    className="min-h-[120px] bg-white/5 border-white/20 text-white placeholder:text-white/60 resize-none"
                  />
                  <Button
                    onClick={handleTextAnalysis}
                    disabled={!newsInput.trim() || isAnalyzing}
                    className="w-full ai-button text-white border-0"
                  >
                    {isAnalyzing ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing with AI...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Verify News Authenticity
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="url" className="mt-6">
                <div className="space-y-4">
                  <Input
                    placeholder="Enter news article URL to verify..."
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/60"
                  />
                  <Button
                    onClick={handleUrlAnalysis}
                    disabled={!urlInput.trim() || isAnalyzing}
                    className="w-full ai-button text-white border-0"
                  >
                    {isAnalyzing ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing URL...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        Verify URL Content
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </Card>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-ai-accent" />
              Verification Results
            </h2>
            
            {results.map((result) => (
              <VerificationResult key={result.id} result={result} />
            ))}
          </div>
        )}

        {/* Loading State */}
        {isAnalyzing && (
          <Card className="ai-card border-white/10 ai-pulse">
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full ai-gradient flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white animate-pulse" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI Analysis in Progress</h3>
              <p className="text-white/70">
                Cross-checking with trusted sources and analyzing content patterns...
              </p>
            </div>
          </Card>
        )}

        {/* Empty State */}
        {results.length === 0 && !isAnalyzing && (
          <Card className="ai-card border-white/10">
            <div className="p-12 text-center">
              <Shield className="w-16 h-16 mx-auto mb-4 text-ai-accent" />
              <h3 className="text-xl font-semibold text-white mb-2">Ready to Verify</h3>
              <p className="text-white/70 max-w-md mx-auto">
                Enter a news article, social media post, or URL above to start the AI-powered verification process.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FakeNewsDetector;