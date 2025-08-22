"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Search, Radar, Github, History, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRadarScan } from '@/hooks/use-radar-scan';
import { useRadarStore } from '@/stores/radar-store';
import { useCosmicAnimation } from '@/hooks/use-cosmic-animation';
import { cn } from '@/lib/utils';

const pilotSearchSchema = z.object({
  spacePilot: z.string()
    .min(1, 'Enter a space pilot identifier')
    .max(100, 'Identifier too long')
    .refine(
      (value) => {
        // Allow GitHub usernames, URLs, or any reasonable input
        const trimmed = value.trim();
        return trimmed.length > 0;
      },
      'Please enter a valid GitHub username or URL'
    ),
});

type PilotSearchForm = z.infer<typeof pilotSearchSchema>;

interface PilotSearchFormProps {
  onScanComplete?: () => void;
}

export function PilotSearchForm({ onScanComplete }: PilotSearchFormProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { scanPilot, isScanning, error } = useRadarScan();
  const { recentScans, clearRecentScans } = useRadarStore();
  const { ref, isVisible } = useCosmicAnimation<HTMLDivElement>();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<PilotSearchForm>({
    resolver: zodResolver(pilotSearchSchema),
    mode: 'onChange',
  });

  const watchedValue = watch('spacePilot');

  const onSubmit = async (data: PilotSearchForm) => {
    const result = await scanPilot(data.spacePilot);
    if (result) {
      reset();
      onScanComplete?.();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setValue('spacePilot', suggestion);
    setShowSuggestions(false);
  };

  const handleClearHistory = () => {
    clearRecentScans();
    setShowSuggestions(false);
  };

  const examples = [
    { username: 'torvalds', description: 'Creator of Linux' },
    { username: 'gaearon', description: 'React core team' },
    { username: 'tj', description: 'Node.js contributor' },
    { username: 'sindresorhus', description: 'Open source maintainer' },
  ];

  return (
    <div 
      ref={ref}
      className={cn(
        "w-full max-w-2xl mx-auto transition-all duration-700",
        isVisible ? "animate-fade-in" : "opacity-0 translate-y-10"
      )}
    >
      <Card className="space-card cosmic-glow">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Radar className={cn(
                "w-16 h-16 text-cosmic transition-all duration-500",
                isScanning ? "animate-spin" : "animate-pulse"
              )} />
              {isScanning && (
                <div className="absolute inset-0 w-16 h-16 rounded-full bg-cosmic/30 blur-md animate-ping" />
              )}
            </div>
          </div>
          
          <CardTitle className="text-3xl mb-2">
            Initialize Radar Scan
          </CardTitle>
          <CardDescription className="text-base">
            Enter a GitHub username or URL to explore the digital galaxy
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="relative">
              <div className="relative">
                <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  {...register('spacePilot')}
                  placeholder="github.com/username or just username"
                  className="pl-10 pr-10 h-12 text-base"
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  disabled={isScanning}
                />
                {watchedValue && (
                  <button
                    type="button"
                    onClick={() => {
                      setValue('spacePilot', '');
                      setShowSuggestions(false);
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Recent Searches Dropdown */}
              {showSuggestions && (recentScans.length > 0 || !watchedValue) && (
                <Card className="absolute top-full left-0 right-0 mt-2 z-50 space-card border-cosmic/30">
                  <CardContent className="p-3">
                    {recentScans.length > 0 && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <History className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">Recent scans</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleClearHistory}
                            className="h-6 px-2 text-xs"
                          >
                            Clear
                          </Button>
                        </div>
                        <div className="space-y-1">
                          {recentScans.slice(0, 5).map((scan) => (
                            <button
                              key={scan}
                              type="button"
                              onClick={() => handleSuggestionClick(scan)}
                              className="w-full text-left px-2 py-1 text-sm hover:bg-accent rounded text-foreground"
                            >
                              {scan}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {!watchedValue && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Search className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Try these examples</span>
                        </div>
                        <div className="space-y-1">
                          {examples.map((example) => (
                            <button
                              key={example.username}
                              type="button"
                              onClick={() => handleSuggestionClick(example.username)}
                              className="w-full text-left px-2 py-1 text-sm hover:bg-accent rounded"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-foreground">{example.username}</span>
                                <span className="text-xs text-muted-foreground">{example.description}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {errors.spacePilot && (
              <p className="text-sm text-destructive flex items-center gap-2">
                <X className="w-4 h-4" />
                {errors.spacePilot.message}
              </p>
            )}

            {error && (
              <Card className="border-destructive/50 bg-destructive/10">
                <CardContent className="p-4">
                  <p className="text-sm text-destructive flex items-center gap-2">
                    <X className="w-4 h-4" />
                    {error}
                  </p>
                </CardContent>
              </Card>
            )}

            <Button
              type="submit"
              variant="cosmic"
              size="lg"
              className="w-full h-12 text-base"
              disabled={!isValid || isScanning}
            >
              {isScanning ? (
                <>
                  <Radar className="w-4 h-4 mr-2 animate-spin" />
                  Scanning Galaxy...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Initiate Radar Scan
                </>
              )}
            </Button>
          </form>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <div className="text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                Supported formats:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="space" className="text-xs">
                  username
                </Badge>
                <Badge variant="space" className="text-xs">
                  github.com/username
                </Badge>
                <Badge variant="space" className="text-xs">
                  https://github.com/username
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}