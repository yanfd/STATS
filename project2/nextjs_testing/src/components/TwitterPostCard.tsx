'use client';

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ImagePlus, Send, X, Clock } from 'lucide-react';

const TwitterPostCard: React.FC = () => {
  const [tweetText, setTweetText] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [isPosting, setIsPosting] = useState(false);
  const [postStatus, setPostStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (5 <= hour && hour < 12) {
      return "🌧️ Mornin. Anything wanna share? :)";
    } else if (12 <= hour && hour < 18) {
      return "🌆 Good afternoon, anything wanna share? :)";
    } else {
      return "🌌 late at night. anything wanna share? :)";
    }
  };

  const getCurrentTimestamp = () => {
    return new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).slice(0, 4 - attachedFiles.length);
      setAttachedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handlePost = async () => {
    if (!tweetText.trim() && attachedFiles.length === 0) {
      setPostStatus('error');
      setTimeout(() => setPostStatus('idle'), 3000);
      return;
    }

    setIsPosting(true);
    setPostStatus('idle');

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Tweet posted:', { text: tweetText, files: attachedFiles });
      setPostStatus('success');
      
      setTweetText('');
      setAttachedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      setTimeout(() => setPostStatus('idle'), 3000);
    } catch (error) {
      setPostStatus('error');
      setTimeout(() => setPostStatus('idle'), 3000);
    } finally {
      setIsPosting(false);
    }
  };

  const getStatusMessage = () => {
    switch (postStatus) {
      case 'success':
        return '✅ PUBLISHED. Tweet posted successfully!';
      case 'error':
        return '❌ FAILED: Empty input or error occurred';
      default:
        return '';
    }
  };

  const charactersRemaining = 280 - tweetText.length;

  return (
    <Card className="w-full max-w-lg bg-gre">
      <CardHeader className="w-full flex flex-col items-center pb-2 ">
        <CardTitle className="font-mono text-2xl text-center">
          <div className="text-white mb-2">NEW TWEETS</div>
        </CardTitle>
        <div className="text-sm text-gray-300 text-center">
          {getGreeting()}
        </div>
        <div className="text-xs text-gray-400 flex items-center gap-1 mt-1">
          <Clock className="w-3 h-3" />
          {getCurrentTimestamp()}
        </div>
      </CardHeader>

      <CardContent className="w-full flex flex-col gap-3">
        <div>
          <textarea
            value={tweetText}
            onChange={(e) => setTweetText(e.target.value)}
            placeholder="What's happening?"
            className="w-full min-h-[100px] px-3 py-2 text-sm border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-white/80"
            maxLength={280}
          />
          <div className="flex justify-between items-center text-xs text-gray-400 mt-1">
            <span>Ctrl+Enter to post</span>
            <span className={charactersRemaining < 0 ? 'text-red-500' : charactersRemaining < 20 ? 'text-yellow-500' : ''}>
              {charactersRemaining}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm">📷 Images:</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={attachedFiles.length >= 4}
          >
            <ImagePlus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />

        {attachedFiles.length > 0 && (
          <div className="space-y-1">
            {attachedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-white/50 rounded border">
                <span className="text-xs truncate flex-1">{file.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="h-6 w-6 p-0"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {postStatus !== 'idle' && (
          <div className={`text-sm p-2 rounded ${
            postStatus === 'success' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {getStatusMessage()}
          </div>
        )}

        <Button
          onClick={handlePost}
          disabled={isPosting || charactersRemaining < 0}
          className="w-full"
        >
          {isPosting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Posting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              POST TWEET
            </>
          )}
        </Button>
      </CardContent>
      
      <CardFooter className="text-xs text-center text-gray-400">
        Demo only - no real tweets posted
      </CardFooter>
    </Card>
  );
};

export default TwitterPostCard;