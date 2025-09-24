import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, AlertTriangle, Clock, ExternalLink } from "lucide-react";

interface AnalysisResult {
  id: string;
  content: string;
  status: "real" | "fake" | "uncertain";
  confidence: number;
  sources: string[];
  analysis: string;
  timestamp: Date;
}

interface VerificationResultProps {
  result: AnalysisResult;
}

const VerificationResult = ({ result }: VerificationResultProps) => {
  const getStatusIcon = () => {
    switch (result.status) {
      case "real":
        return <CheckCircle className="w-5 h-5" />;
      case "fake":
        return <XCircle className="w-5 h-5" />;
      case "uncertain":
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getStatusColor = () => {
    switch (result.status) {
      case "real":
        return "verification-real";
      case "fake":
        return "verification-fake";
      case "uncertain":
        return "verification-uncertain";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusText = () => {
    switch (result.status) {
      case "real":
        return "Likely Authentic";
      case "fake":
        return "Likely Fake";
      case "uncertain":
        return "Requires Review";
      default:
        return "Analyzing...";
    }
  };

  const getConfidenceColor = () => {
    if (result.confidence >= 80) return "text-green-400";
    if (result.confidence >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <Card className="ai-card border-white/10 slide-up">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Badge className={`${getStatusColor()} flex items-center gap-2 px-3 py-1`}>
              {getStatusIcon()}
              {getStatusText()}
            </Badge>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Clock className="w-4 h-4" />
              {result.timestamp.toLocaleTimeString()}
            </div>
          </div>
          <div className="text-right">
            <div className={`text-lg font-bold ${getConfidenceColor()}`}>
              {result.confidence}%
            </div>
            <div className="text-xs text-white/60">Confidence</div>
          </div>
        </div>

        {/* Content Preview */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-white/80 mb-2">Content Analyzed:</h4>
          <div className="bg-white/5 border border-white/10 rounded-lg p-3">
            <p className="text-white/90 text-sm leading-relaxed">
              {result.content.length > 200 
                ? `${result.content.substring(0, 200)}...` 
                : result.content}
            </p>
          </div>
        </div>

        {/* Confidence Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-white/80">AI Confidence Score</span>
            <span className={`text-sm font-bold ${getConfidenceColor()}`}>
              {result.confidence}%
            </span>
          </div>
          <Progress 
            value={result.confidence} 
            className="h-2 bg-white/10"
          />
        </div>

        {/* AI Analysis */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-white/80 mb-2">AI Analysis:</h4>
          <div className="bg-white/5 border border-white/10 rounded-lg p-3">
            <p className="text-white/90 text-sm leading-relaxed">
              {result.analysis}
            </p>
          </div>
        </div>

        {/* Sources */}
        <div>
          <h4 className="text-sm font-medium text-white/80 mb-2">Cross-Referenced Sources:</h4>
          <div className="space-y-2">
            {result.sources.map((source, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 text-sm text-ai-accent hover:text-white/90 cursor-pointer transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                {source}
              </div>
            ))}
          </div>
        </div>

        {/* API Integration Note */}
        <div className="mt-4 p-3 bg-ai-primary/10 border border-ai-primary/20 rounded-lg">
          <p className="text-xs text-ai-accent">
            <strong>API Integration Point:</strong> Replace the mock analysis in FakeNewsDetector.tsx 
            with your ChatGPT API call. The API key should be stored in environment variables.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default VerificationResult;