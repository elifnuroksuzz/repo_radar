"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, TrendingUp } from 'lucide-react';
import { useRadarStore } from '@/stores/radar-store';
import { useCosmicAnimation } from '@/hooks/use-cosmic-animation';
import { getLanguageColor } from '@/lib/utils';
import { cn } from '@/lib/utils';

export function LanguageChart() {
  const { getTopLanguages } = useRadarStore();
  const { ref, isVisible } = useCosmicAnimation<HTMLDivElement>();
  
  const topLanguages = getTopLanguages(8);
  const totalBytes = topLanguages.reduce((sum, lang) => sum + lang.value, 0);

  if (topLanguages.length === 0) {
    return (
      <Card className="space-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5 text-cosmic" />
            Programming Languages
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Code className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">No language data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div 
      ref={ref}
      className={cn(
        "transition-all duration-700",
        isVisible ? "animate-fade-in" : "opacity-0 translate-y-10"
      )}
    >
      <Card className="space-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5 text-cosmic" />
              Nebula Languages
            </CardTitle>
            <Badge variant="cosmic">
              <TrendingUp className="w-3 h-3 mr-1" />
              Top {topLanguages.length}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Language List */}
          <div className="space-y-4">
            {topLanguages.map((language, index) => {
              const color = getLanguageColor(language.name);
              
              return (
                <div 
                  key={language.name}
                  className={cn(
                    "space-y-2 transition-all duration-500",
                    isVisible ? "animate-slide-up" : "opacity-0 translate-x-4"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full border-2 border-white/20"
                        style={{ backgroundColor: color }}
                      />
                      <span className="font-medium">{language.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {language.percentage.toFixed(1)}%
                      </span>
                      <Badge 
                        variant="language"
                        style={{ backgroundColor: color }}
                        className="text-xs min-w-[4rem] justify-center"
                      >
                        {(language.value / 1024).toFixed(0)}KB
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-cosmic-gradient transition-all duration-1000 ease-out rounded-full"
                      style={{ 
                        width: `${language.percentage}%`,
                        backgroundColor: color,
                        backgroundImage: `linear-gradient(90deg, ${color}, ${color}dd)`
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary Stats */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-cosmic">
                  {topLanguages.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Languages Used
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-2xl font-bold text-nebula-purple">
                  {(totalBytes / 1024 / 1024).toFixed(1)}MB
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Code Size
                </div>
              </div>
            </div>
          </div>

          {/* Top Language Highlight */}
          {topLanguages.length > 0 && (
            <div className="p-4 rounded-lg bg-cosmic/10 border border-cosmic/20">
              <div className="flex items-center gap-3">
                <div 
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: getLanguageColor(topLanguages[0].name) }}
                />
                <div>
                  <div className="font-semibold text-cosmic">
                    Primary Language: {topLanguages[0].name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {topLanguages[0].percentage.toFixed(1)}% of total codebase
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}