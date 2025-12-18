import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Trash2, Sparkles, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [copied, setCopied] = useState(false);

  const extractDevanagari = () => {
    // Unicode range for Devanagari: U+0900 to U+097F
    // Also includes Devanagari Extended: U+A8E0 to U+A8FF
    const devanagariRegex = /[\u0900-\u097F\uA8E0-\uA8FF\s]+/g;
    const matches = inputText.match(devanagariRegex);
    
    if (matches) {
      // Join matches and clean up extra spaces
      const extracted = matches.join(" ").replace(/\s+/g, " ").trim();
      setOutputText(extracted);
    } else {
      setOutputText("");
      toast({
        title: "No Devanagari text found",
        description: "The input doesn't contain any Devanagari characters.",
        variant: "destructive",
      });
    }
  };

  const clearInput = () => {
    setInputText("");
    setOutputText("");
  };

  const copyToClipboard = async () => {
    if (!outputText) return;
    
    await navigator.clipboard.writeText(outputText);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Devanagari text copied to clipboard.",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const characterCount = outputText.replace(/\s/g, "").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Devanagari Text Extractor
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Extract <span className="text-primary">देवनागरी</span> Text
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Paste your mixed text containing English, numbers, and Maithili. 
            Get clean Devanagari text instantly.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Card */}
          <Card className="shadow-lg border-border/50 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Input Text</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearInput}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Clear
                </Button>
              </CardTitle>
              <CardDescription>
                Paste text with English, numbers & Devanagari
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Example: Hello नमस्ते 123 मैथिली world..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[200px] resize-none text-base"
              />
              <Button 
                onClick={extractDevanagari} 
                className="w-full"
                disabled={!inputText.trim()}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Extract Devanagari
              </Button>
            </CardContent>
          </Card>

          {/* Output Card */}
          <Card className="shadow-lg border-border/50 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Extracted Text</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-normal text-muted-foreground bg-muted px-2 py-1 rounded">
                    {characterCount} characters
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    disabled={!outputText}
                    className="text-muted-foreground hover:text-primary"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>
                Clean Devanagari text only
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="min-h-[200px] p-4 rounded-lg bg-muted/50 border border-border/50">
                {outputText ? (
                  <p className="text-lg leading-relaxed text-foreground whitespace-pre-wrap">
                    {outputText}
                  </p>
                ) : (
                  <p className="text-muted-foreground italic">
                    Extracted Devanagari text will appear here...
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.3s" }}>
          Supports Devanagari script (Unicode U+0900 to U+097F) used in Maithili, Hindi, Sanskrit, and more.
        </p>
      </div>
    </div>
  );
};

export default Index;
