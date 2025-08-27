# Design Document

## Overview

The Genius.com-inspired web application will be built using Next.js 15 with App Router, featuring a modern dark theme with interactive song lyrics and annotations. The application leverages React 19, TypeScript, and Tailwind CSS v4 to create a responsive, performant, and accessible user experience.

## Architecture

### Technology Stack

- **Framework**: Next.js 15 with App Router
- **React Version**: React 19.1.0
- **TypeScript**: Full TypeScript implementation
- **Styling**: Tailwind CSS v4 with custom dark theme
- **Font**: Inter font family via Google Fonts
- **State Management**: React hooks for local state
- **Performance**: Server Components, lazy loading, and Suspense

### Project Structure

```
app/
├── layout.tsx (Root layout with header)
├── page.tsx (Homepage with song grid)
├── songs/
│   └── [id]/
│       └── page.tsx (Dynamic song detail pages)
├── globals.css (Global styles and Tailwind imports)
└── loading.tsx (Global loading UI)

components/
├── Header.tsx (Navigation and search)
├── SongCard.tsx (Song grid item)
├── LyricsViewer.tsx (Interactive lyrics display)
├── AnnotationPopup.tsx (Annotation overlay)
└── ui/ (Reusable UI components)

data/
└── mockSongs.ts (Mock data structure)

public/
├── logo.svg
└── images/ (Song thumbnails and assets)
```

## Components and Interfaces

### Core Components

#### Header Component

```typescript
interface HeaderProps {
  className?: string;
}

// Features:
// - Fixed positioning with backdrop blur
// - Logo with home navigation
// - Search bar with autocomplete
// - Responsive burger menu for mobile
// - Dark theme with gold accents
```

#### SongCard Component

```typescript
interface SongCardProps {
  song: Song;
  className?: string;
}

// Features:
// - Thumbnail image with lazy loading
// - Song title and artist information
// - Hover effects with scale and opacity transitions
// - Click navigation to song detail page
// - Responsive sizing
```

#### LyricsViewer Component

```typescript
interface LyricsViewerProps {
  lyrics: LyricLine[];
  annotations: Annotation[];
  onAnnotationClick: (annotation: Annotation) => void;
}

// Features:
// - Line-by-line lyrics rendering
// - Interactive annotation highlighting
// - Hover effects with yellow highlighting
// - Click handlers for annotation popups
// - Responsive text sizing
```

#### AnnotationPopup Component

```typescript
interface AnnotationPopupProps {
  annotation: Annotation | null;
  position: { x: number; y: number };
  onClose: () => void;
  isOpen: boolean;
}

// Features:
// - Positioned overlay with backdrop
// - Smooth enter/exit animations
// - Click-outside-to-close functionality
// - Responsive positioning
// - Dark theme styling
```

## Data Models

### Song Model

```typescript
interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  thumbnailUrl: string;
  lyrics: LyricLine[];
  annotations: Annotation[];
  releaseDate?: string;
  genre?: string;
}
```

### LyricLine Model

```typescript
interface LyricLine {
  id: string;
  text: string;
  lineNumber: number;
  annotations?: string[]; // Array of annotation IDs
}
```

### Annotation Model

```typescript
interface Annotation {
  id: string;
  lyricLineId: string;
  startIndex: number;
  endIndex: number;
  content: string;
  author?: string;
  createdAt?: string;
}
```

## Design System

### Color Palette

The application will use shadcn/ui's existing dark theme with custom accent colors:

- **Background**: Uses shadcn's `background` and `card` tokens
- **Text**: Uses shadcn's `foreground` and `muted-foreground` tokens
- **Accent Gold**: Custom `--accent-gold: #FFD700` for Genius-style highlights
- **Borders**: Uses shadcn's `border` token
- **Annotation Highlight**: Custom yellow highlight with opacity

```css
/* Custom additions to shadcn theme */
:root {
  --accent-gold: #ffd700;
  --annotation-highlight: rgba(255, 215, 0, 0.3);
}
```

### Typography

- **Primary Font**: Inter (via Google Fonts, replacing current Geist fonts)
- **Headings**: Uses shadcn's heading classes with responsive sizing
- **Body Text**: Uses shadcn's text utilities
- **Captions**: Uses shadcn's muted text classes

### Responsive Breakpoints

- **Mobile**: < 640px (1 column grid)
- **Tablet**: 640px - 1024px (2 column grid)
- **Desktop**: > 1024px (3+ column grid)

### Animation System

```css
/* Hover transitions */
.song-card {
  @apply transition-all duration-300 ease-in-out;
  @apply hover:scale-105 hover:opacity-90;
}

/* Annotation highlighting */
.annotation-highlight {
  @apply bg-yellow-400 bg-opacity-30 transition-colors duration-200;
}

/* Popup animations */
.popup-enter {
  @apply opacity-0 scale-95 transition-all duration-200;
}

.popup-enter-active {
  @apply opacity-100 scale-100;
}
```

## Error Handling

### Client-Side Error Boundaries

- Implement React Error Boundaries for component-level error handling
- Graceful fallbacks for failed image loads
- Network error handling for dynamic imports

### Loading States

- Skeleton components for song cards during loading
- Suspense boundaries for lazy-loaded components
- Progressive loading for lyrics and annotations

### Validation

- TypeScript interfaces for compile-time type checking
- Runtime validation for API responses
- Input sanitization for search functionality

## Testing Strategy

### Component Testing

- Unit tests for individual components using Jest and React Testing Library
- Test user interactions (hover, click, navigation)
- Test responsive behavior across breakpoints
- Test accessibility features (keyboard navigation, screen readers)

### Integration Testing

- Test routing between pages
- Test annotation popup interactions
- Test search functionality
- Test mobile menu behavior

### Performance Testing

- Lighthouse audits for Core Web Vitals
- Bundle size analysis
- Image optimization verification
- Server Component rendering validation

## Performance Optimizations

### Server Components

- Use Server Components for static content (song lists, lyrics)
- Client Components only for interactive features (annotations, search)
- Streaming with Suspense for improved perceived performance

### Image Optimization

- Next.js Image component with lazy loading
- WebP format with fallbacks
- Responsive image sizing
- Placeholder blur effects

### Code Splitting

- Dynamic imports for heavy components
- Route-based code splitting via App Router
- Lazy loading for annotation popups

### Caching Strategy

- Static generation for song pages where possible
- Client-side caching for frequently accessed data
- Image caching with appropriate headers

## Accessibility

### WCAG 2.1 AA Compliance

- Semantic HTML structure
- Proper heading hierarchy
- Alt text for all images
- Keyboard navigation support
- Focus management for popups
- Color contrast ratios meeting AA standards

### Screen Reader Support

- ARIA labels for interactive elements
- Live regions for dynamic content updates
- Descriptive link text
- Form labels and error messages

### Keyboard Navigation

- Tab order management
- Escape key to close popups
- Enter/Space for activation
- Arrow keys for navigation where appropriate
