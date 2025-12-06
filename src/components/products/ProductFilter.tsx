'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { ChevronDown, ChevronUp, X, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FilterState {
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

interface Product {
  id?: string;
  name: string;
  price: number;
  rating?: number;
  reviewCount?: number;
  brand?: string;
  colors?: string[];
  sizes?: string[];
  material?: string;
  tags?: string[];
  gender?: string;
  ageGroup?: string;
  season?: string;
  category: string;
  categoryId: string;
  [key: string]: any;
}

interface ProductFilterProps {
  products: Product[];
  onFilterChange: (filteredProducts: Product[], filters: FilterState) => void;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  products,
  onFilterChange,
  isOpen,
  onToggle,
  className = ""
}) => {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 1000],
    rating: [],
    brands: [],
    colors: [],
    sizes: [],
    materials: [],
    tags: [],
    gender: [],
    ageGroup: [],
    season: [],
    sortBy: 'name'
  });

  const [expandedSections, setExpandedSections] = useState({
    price: true,
    rating: true,
    brand: false,
    color: false,
    size: false,
    material: false,
    tags: false,
    demographics: false,
    season: false
  });

  // Extract unique values from products
  const getUniqueValues = (key: string) => {
    const values = products.reduce((acc: string[], product) => {
      const value = product[key];
      if (Array.isArray(value)) {
        acc.push(...value);
      } else if (value && typeof value === 'string') {
        acc.push(value);
      }
      return acc;
    }, []);
    return [...new Set(values)].sort();
  };

  const uniqueBrands = useMemo(() => getUniqueValues('brand'), [products]);
  const uniqueColors = useMemo(() => getUniqueValues('colors'), [products]);
  const uniqueSizes = useMemo(() => getUniqueValues('sizes'), [products]);
  const uniqueMaterials = useMemo(() => getUniqueValues('material'), [products]);
  const uniqueTags = useMemo(() => getUniqueValues('tags'), [products]);
  const uniqueGender = useMemo(() => getUniqueValues('gender'), [products]);
  const uniqueAgeGroup = useMemo(() => getUniqueValues('ageGroup'), [products]);
  const uniqueSeason = useMemo(() => getUniqueValues('season'), [products]);

  const priceRange = useMemo(() => {
    return products.reduce(
      (acc, product) => {
        return [
          Math.min(acc[0], product.price),
          Math.max(acc[1], product.price)
        ];
      },
      [Infinity, 0]
    );
  }, [products]);

  useEffect(() => {
    if (priceRange[0] !== Infinity && priceRange[1] !== 0) {
      setFilters(prev => ({
        ...prev,
        priceRange: [priceRange[0], priceRange[1]]
      }));
    }
  }, [priceRange]);

  // Filter products based on current filters
  const filterProducts = useCallback((currentFilters: FilterState) => {
    let filtered = products.filter(product => {
      // Price filter
      if (product.price < currentFilters.priceRange[0] || product.price > currentFilters.priceRange[1]) {
        return false;
      }

      // Rating filter
      if (currentFilters.rating.length > 0 && (!product.rating || !currentFilters.rating.includes(Math.floor(product.rating)))) {
        return false;
      }

      // Brand filter
      if (currentFilters.brands.length > 0 && (!product.brand || !currentFilters.brands.includes(product.brand))) {
        return false;
      }

      // Color filter
      if (currentFilters.colors.length > 0) {
        if (!product.colors || !product.colors.some(color => currentFilters.colors.includes(color))) {
          return false;
        }
      }

      // Size filter
      if (currentFilters.sizes.length > 0) {
        if (!product.sizes || !product.sizes.some(size => currentFilters.sizes.includes(size))) {
          return false;
        }
      }

      // Material filter
      if (currentFilters.materials.length > 0 && (!product.material || !currentFilters.materials.includes(product.material))) {
        return false;
      }

      // Tags filter
      if (currentFilters.tags.length > 0) {
        if (!product.tags || !product.tags.some(tag => currentFilters.tags.includes(tag))) {
          return false;
        }
      }

      // Gender filter
      if (currentFilters.gender.length > 0 && (!product.gender || !currentFilters.gender.includes(product.gender))) {
        return false;
      }

      // Age Group filter
      if (currentFilters.ageGroup.length > 0 && (!product.ageGroup || !currentFilters.ageGroup.includes(product.ageGroup))) {
        return false;
      }

      // Season filter
      if (currentFilters.season.length > 0 && (!product.season || !currentFilters.season.includes(product.season))) {
        return false;
      }

      return true;
    });

    // Sort products
    switch (currentFilters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'reviews':
        filtered.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        break;
      case 'name':
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [products]);

  // Apply filters and notify parent whenever filters change
  useEffect(() => {
    const filteredProducts = filterProducts(filters);
    onFilterChange(filteredProducts, filters);
  }, [filters, products]);

  const handleFilterChange = (filterType: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleMultiSelectChange = (filterType: keyof FilterState, value: string) => {
    setFilters(prev => {
      const currentValues = prev[filterType] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return {
        ...prev,
        [filterType]: newValues
      };
    });
  };

  const clearAllFilters = () => {
    setFilters({
      priceRange: [priceRange[0], priceRange[1]],
      rating: [],
      brands: [],
      colors: [],
      sizes: [],
      materials: [],
      tags: [],
      gender: [],
      ageGroup: [],
      season: [],
      sortBy: 'name'
    });
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const activeFiltersCount = 
    filters.rating.length +
    filters.brands.length +
    filters.colors.length +
    filters.sizes.length +
    filters.materials.length +
    filters.tags.length +
    filters.gender.length +
    filters.ageGroup.length +
    filters.season.length;

  const FilterSection = ({ title, isExpanded, onToggle, children }: {
    title: string;
    isExpanded: boolean;
    onToggle: () => void;
    children: React.ReactNode;
  }) => (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left font-medium text-gray-900 hover:text-blue-600 transition-colors"
      >
        {title}
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-3 overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const CheckboxGroup = ({ options, selectedValues, onChange }: {
    options: string[];
    selectedValues: string[];
    onChange: (value: string) => void;
  }) => (
    <div className="space-y-2 max-h-40 overflow-y-auto">
      {options.map(option => (
        <label key={option} className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedValues.includes(option)}
            onChange={() => onChange(option)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">{option}</span>
        </label>
      ))}
    </div>
  );

  return (
    <div className={className}>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={onToggle}
          className="flex items-center justify-between w-full p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900">Filters</span>
            {activeFiltersCount > 0 && (
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </div>
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {(isOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
          >
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Filter className="w-5 h-5 mr-2 text-blue-600" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </h3>
              <button
                onClick={clearAllFilters}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear All
              </button>
            </div>

            <div className="p-4 space-y-6">
              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Sort By
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="name">Name A-Z</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="reviews">Most Reviews</option>
                </select>
              </div>

              {/* Price Range */}
              <FilterSection
                title="Price Range"
                isExpanded={expandedSections.price}
                onToggle={() => toggleSection('price')}
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      value={filters.priceRange[0]}
                      onChange={(e) => handleFilterChange('priceRange', [Number(e.target.value), filters.priceRange[1]])}
                      className="w-20 p-2 border border-gray-300 rounded text-sm"
                      placeholder="Min"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      value={filters.priceRange[1]}
                      onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], Number(e.target.value)])}
                      className="w-20 p-2 border border-gray-300 rounded text-sm"
                      placeholder="Max"
                    />
                  </div>
                  <input
                    type="range"
                    min={priceRange[0]}
                    max={priceRange[1]}
                    value={filters.priceRange[1]}
                    onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], Number(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </FilterSection>

              {/* Rating */}
              <FilterSection
                title="Rating"
                isExpanded={expandedSections.rating}
                onToggle={() => toggleSection('rating')}
              >
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map(rating => (
                    <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.rating.includes(rating)}
                        onChange={() => handleMultiSelectChange('rating', rating.toString())}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex items-center space-x-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">& up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </FilterSection>

              {/* Brand */}
              {uniqueBrands.length > 0 && (
                <FilterSection
                  title="Brand"
                  isExpanded={expandedSections.brand}
                  onToggle={() => toggleSection('brand')}
                >
                  <CheckboxGroup
                    options={uniqueBrands}
                    selectedValues={filters.brands}
                    onChange={(value) => handleMultiSelectChange('brands', value)}
                  />
                </FilterSection>
              )}

              {/* Colors */}
              {uniqueColors.length > 0 && (
                <FilterSection
                  title="Colors"
                  isExpanded={expandedSections.color}
                  onToggle={() => toggleSection('color')}
                >
                  <CheckboxGroup
                    options={uniqueColors}
                    selectedValues={filters.colors}
                    onChange={(value) => handleMultiSelectChange('colors', value)}
                  />
                </FilterSection>
              )}

              {/* Sizes */}
              {uniqueSizes.length > 0 && (
                <FilterSection
                  title="Sizes"
                  isExpanded={expandedSections.size}
                  onToggle={() => toggleSection('size')}
                >
                  <CheckboxGroup
                    options={uniqueSizes}
                    selectedValues={filters.sizes}
                    onChange={(value) => handleMultiSelectChange('sizes', value)}
                  />
                </FilterSection>
              )}

              {/* Material */}
              {uniqueMaterials.length > 0 && (
                <FilterSection
                  title="Material"
                  isExpanded={expandedSections.material}
                  onToggle={() => toggleSection('material')}
                >
                  <CheckboxGroup
                    options={uniqueMaterials}
                    selectedValues={filters.materials}
                    onChange={(value) => handleMultiSelectChange('materials', value)}
                  />
                </FilterSection>
              )}

              {/* Tags */}
              {uniqueTags.length > 0 && (
                <FilterSection
                  title="Features"
                  isExpanded={expandedSections.tags}
                  onToggle={() => toggleSection('tags')}
                >
                  <CheckboxGroup
                    options={uniqueTags}
                    selectedValues={filters.tags}
                    onChange={(value) => handleMultiSelectChange('tags', value)}
                  />
                </FilterSection>
              )}

              {/* Demographics */}
              {(uniqueGender.length > 0 || uniqueAgeGroup.length > 0) && (
                <FilterSection
                  title="Demographics"
                  isExpanded={expandedSections.demographics}
                  onToggle={() => toggleSection('demographics')}
                >
                  <div className="space-y-4">
                    {uniqueGender.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Gender</h4>
                        <CheckboxGroup
                          options={uniqueGender}
                          selectedValues={filters.gender}
                          onChange={(value) => handleMultiSelectChange('gender', value)}
                        />
                      </div>
                    )}
                    {uniqueAgeGroup.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Age Group</h4>
                        <CheckboxGroup
                          options={uniqueAgeGroup}
                          selectedValues={filters.ageGroup}
                          onChange={(value) => handleMultiSelectChange('ageGroup', value)}
                        />
                      </div>
                    )}
                  </div>
                </FilterSection>
              )}

              {/* Season */}
              {uniqueSeason.length > 0 && (
                <FilterSection
                  title="Season"
                  isExpanded={expandedSections.season}
                  onToggle={() => toggleSection('season')}
                >
                  <CheckboxGroup
                    options={uniqueSeason}
                    selectedValues={filters.season}
                    onChange={(value) => handleMultiSelectChange('season', value)}
                  />
                </FilterSection>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductFilter;