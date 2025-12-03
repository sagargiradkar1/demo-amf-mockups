import { DocumentCategory } from '../../types';
import { cn } from '../../utils/cn';
import { Link, useLocation } from 'react-router-dom';

interface CategoryTabsProps {
  selectedCategory: DocumentCategory;
  onCategoryChange: (category: DocumentCategory) => void;
}

const categories: { value: DocumentCategory | 'training'; label: string; isLink?: boolean; linkTo?: string }[] = [
  { value: 'custom-documentation', label: 'Custom Documentation' },
  { value: 'manuals', label: 'Manuals' },
  { value: 'mechanical-drawings', label: 'Mechanical Drawings' },
  { value: 'electrical-drawings', label: 'Electrical Drawings' },
  { value: 'boms', label: 'BOMs' },
  { value: 'translations', label: 'Translations' },
  { value: 'certificates', label: 'Certificates' },
  { value: 'training', label: 'Training', isLink: true, linkTo: '/training' },
];

export function CategoryTabs({ selectedCategory, onCategoryChange }: CategoryTabsProps) {
  const location = useLocation();
  const isTrainingPage = location.pathname === '/training';

  return (
    <div className="border-b-2 border-border bg-background">
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
        {categories.map((category) => {
          if (category.isLink && category.linkTo) {
            return (
              <Link
                key={category.value}
                to={category.linkTo}
                className={cn(
                  'relative whitespace-nowrap px-6 py-3.5 text-sm font-medium transition-colors',
                  isTrainingPage
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                )}
              >
                {category.label}
                {isTrainingPage && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-destructive" />
                )}
              </Link>
            );
          }

          return (
            <button
              key={category.value}
              onClick={() => onCategoryChange(category.value as DocumentCategory)}
              className={cn(
                'relative whitespace-nowrap px-6 py-3.5 text-sm font-medium transition-colors',
                selectedCategory === category.value
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              )}
            >
              {category.label}
              {selectedCategory === category.value && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-destructive" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
