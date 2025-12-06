'use client';

import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterState {
  priceRange: [number, number];
  rating: number[];
  brands: string[];
  colors: string[];
  sizes: string[];
  materials: string[];
  tags: string[];
  gender: string[];
  ageGroup: string[];
  season: string[];
  sortBy: string;
}

interface FilterTagsProps {
  filters: FilterState;
  onRemoveFilter: (filterType: keyof FilterState, value?: string) => void;
  onClearAll: () => void;
  className?: string;
}

const FilterTags: React.FC<FilterTagsProps> = ({
  filters,
  onRemoveFilter,
  onClearAll,
  className = ""
}) => {
  const createFilterTags = () => {
    const tags: { type: keyof FilterState; value?: string; label: string }[] = [];
    
    // Safety check for filters object
    if (!filters) return tags;
    
    // Additional safety check for all filter properties
    const safeFilters = {
      priceRange: filters.priceRange || [0, 1000],
      rating: filters.rating || [],
      brands: filters.brands || [],
      colors: filters.colors || [],
      sizes: filters.sizes || [],
      materials: filters.materials || [],
      tags: filters.tags || [],
      gender: filters.gender || [],
      ageGroup: filters.ageGroup || [],
      season: filters.season || [],
      sortBy: filters.sortBy || 'name'
    };

    // Price range tag (only if different from default)
    if (safeFilters.priceRange[0] > 0 || safeFilters.priceRange[1] < 1000) {
      tags.push({
        type: 'priceRange',
        label: `$${safeFilters.priceRange[0]} - $${safeFilters.priceRange[1]}`
      });
    }

    // Rating tags
    safeFilters.rating.forEach(rating => {
      tags.push({
        type: 'rating',
        value: rating.toString(),
        label: `${rating}+ Stars`
      });
    });

    // Brand tags
    safeFilters.brands.forEach(brand => {
      tags.push({
        type: 'brands',
        value: brand,
        label: brand
      });
    });

    // Color tags
    safeFilters.colors.forEach(color => {
      tags.push({
        type: 'colors',
        value: color,
        label: color
      });
    });

    // Size tags
    safeFilters.sizes.forEach(size => {
      tags.push({
        type: 'sizes',
        value: size,
        label: size
      });
    });

    // Material tags
    safeFilters.materials.forEach(material => {
      tags.push({
        type: 'materials',
        value: material,
        label: material
      });
    });

    // Feature tags
    safeFilters.tags.forEach(tag => {
      tags.push({
        type: 'tags',
        value: tag,
        label: tag
      });
    });

    // Gender tags
    safeFilters.gender.forEach(gender => {
      tags.push({
        type: 'gender',
        value: gender,
        label: gender
      });
    });

    // Age Group tags
    safeFilters.ageGroup.forEach(ageGroup => {
      tags.push({
        type: 'ageGroup',
        value: ageGroup,
        label: ageGroup
      });
    });

    // Season tags
    safeFilters.season.forEach(season => {
      tags.push({
        type: 'season',
        value: season,
        label: season
      });
    });

    return tags;
  };

  const filterTags = createFilterTags();

  if (filterTags.length === 0) {
    return null;
  }

  const handleRemoveTag = (type: keyof FilterState, value?: string) => {
    if (type === 'priceRange') {
      onRemoveFilter('priceRange');
    } else if (type === 'rating' && value) {
      onRemoveFilter('rating', value);
    } else if (value) {
      onRemoveFilter(type, value);
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="text-sm font-medium text-gray-600 mr-2">Active filters:</span>
      
      <AnimatePresence>
        {filterTags.map((tag, index) => (
          <motion.div
            key={`${tag.type}-${tag.value || 'range'}-${index}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200 hover:bg-blue-200 transition-colors"
          >
            <span>{tag.label}</span>
            <button
              onClick={() => handleRemoveTag(tag.type, tag.value)}
              className="flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-300 transition-colors"
              aria-label={`Remove ${tag.label} filter`}
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      {filterTags.length > 1 && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={onClearAll}
          className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium border border-red-200 hover:bg-red-200 transition-colors"
        >
          Clear All
          <X className="w-3 h-3" />
        </motion.button>
      )}
    </div>
  );
};

export default FilterTags;