import { Search, Camera, Clock, DollarSign, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: FilterOptions) => void;
}

interface FilterOptions {
  maxTime?: number;
  maxCost?: number;
  difficulty?: string;
  dietType?: string;
}

export function SearchFilters({ onSearch, onFilterChange }: SearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({});
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string | number) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
    
    // Update active filters for display
    const filterLabels: Record<string, string> = {
      maxTime: `Under ${value} min`,
      maxCost: `Under ₹${value}`,
      difficulty: value as string,
      dietType: value as string,
    };
    
    const newActiveFilters = Object.entries(newFilters)
      .filter(([_, val]) => val)
      .map(([key, val]) => filterLabels[key] || `${key}: ${val}`);
    
    setActiveFilters(newActiveFilters);
  };

  const clearFilter = (filterLabel: string) => {
    const filterKey = Object.entries(filters).find(([key, val]) => {
      const labels: Record<string, string> = {
        maxTime: `Under ${val} min`,
        maxCost: `Under ₹${val}`,
        difficulty: val as string,
        dietType: val as string,
      };
      return labels[key] === filterLabel;
    })?.[0];
    
    if (filterKey) {
      const newFilters = { ...filters };
      delete newFilters[filterKey as keyof FilterOptions];
      setFilters(newFilters);
      onFilterChange(newFilters);
      setActiveFilters(activeFilters.filter(f => f !== filterLabel));
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          placeholder="Search recipes or ingredients..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-12 h-12 bg-background border-2 focus:border-primary"
        />
        <Button 
          size="sm" 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-primary hover:opacity-90"
        >
          <Camera className="w-4 h-4" />
        </Button>
      </div>

      {/* Quick Filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Select onValueChange={(value) => handleFilterChange('maxTime', parseInt(value))}>
          <SelectTrigger className="h-10">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <SelectValue placeholder="Time" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="15">Under 15 min</SelectItem>
            <SelectItem value="30">Under 30 min</SelectItem>
            <SelectItem value="45">Under 45 min</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => handleFilterChange('maxCost', parseInt(value))}>
          <SelectTrigger className="h-10">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" />
              <SelectValue placeholder="Budget" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="50">Under ₹50</SelectItem>
            <SelectItem value="100">Under ₹100</SelectItem>
            <SelectItem value="150">Under ₹150</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => handleFilterChange('difficulty', value)}>
          <SelectTrigger className="h-10">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-primary" />
              <SelectValue placeholder="Level" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => handleFilterChange('dietType', value)}>
          <SelectTrigger className="h-10">
            <SelectValue placeholder="Diet" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Vegetarian">Vegetarian</SelectItem>
            <SelectItem value="Non-Vegetarian">Non-Vegetarian</SelectItem>
            <SelectItem value="Vegan">Vegan</SelectItem>
            <SelectItem value="High-Protein">High-Protein</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="px-3 py-1 cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
              onClick={() => clearFilter(filter)}
            >
              {filter} ×
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}