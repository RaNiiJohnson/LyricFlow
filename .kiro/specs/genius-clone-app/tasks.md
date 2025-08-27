# Implementation Plan

- [x] 1. Set up project foundation and data structure

  - Create TypeScript interfaces for Song, LyricLine, and Annotation models
  - Create mock data file with sample songs, lyrics, and annotations
  - Update app layout to use Inter font and custom CSS variables for gold accent
  - _Requirements: 6.1, 6.3, 4.1, 4.5_

- [x] 2. Create core UI components using shadcn/ui
- [x] 2.1 Build Header component with navigation and search

  - Create Header component with logo, navigation menu, and search bar
  - Implement responsive burger menu for mobile using shadcn Sheet component
  - Add search functionality with basic filtering
  - Style with dark theme and gold accents
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 4.3_

- [x] 2.2 Build SongCard component for homepage grid

  - Create SongCard component displaying song title, artist, and thumbnail
  - Implement hover effects with scale and opacity transitions
  - Add click navigation to song detail pages
  - Make component responsive for different screen sizes
  - _Requirements: 1.4, 1.5, 4.4, 5.4_

- [x] 3. Implement homepage with responsive song grid

  - Update app/page.tsx to display grid of popular songs
  - Implement responsive layout (1 column mobile, 3+ columns desktop)
  - Add loading states and error handling
  - Integrate with mock data
  - _Requirements: 1.1, 1.2, 1.3, 5.1, 5.4_

- [x] 4. Create dynamic song detail pages
- [x] 4.1 Set up dynamic routing for songs

  - Create app/songs/[id]/page.tsx with dynamic route handling
  - Implement song data fetching based on ID parameter
  - Add proper TypeScript typing for page props
  - Handle invalid song IDs with 404 pages
  - _Requirements: 3.1, 6.4, 5.1_

- [x] 4.2 Build LyricsViewer component with annotation support

  - Create LyricsViewer component to display lyrics line by line
  - Implement hover highlighting for annotated text sections
  - Add click handlers for annotation interactions
  - Style with responsive text sizing and proper spacing
  - _Requirements: 3.2, 3.3, 3.6, 7.1, 7.2_

- [x] 4.3 Build AnnotationPopup component

  - Create popup component for displaying annotation content
  - Implement positioning logic relative to clicked text
  - Add smooth enter/exit animations using Tailwind transitions
  - Implement click-outside-to-close functionality
  - Handle responsive positioning for mobile devices
  - _Requirements: 3.4, 3.5, 7.3, 7.4, 7.5_

- [-] 5. Integrate annotation system with state management

  - Implement React state management for annotation interactions
  - Connect LyricsViewer with AnnotationPopup component
  - Add proper event handling for hover and click states
  - Ensure smooth user experience with proper loading states
  - _Requirements: 7.5, 3.3, 3.4, 3.5_

- [ ] 6. Implement performance optimizations
- [ ] 6.1 Add lazy loading and code splitting

  - Implement lazy loading for heavy components using React.lazy
  - Add Suspense boundaries with loading fallbacks
  - Optimize image loading with Next.js Image component
  - _Requirements: 5.2, 5.3_

- [ ] 6.2 Optimize with Server Components

  - Convert static components to Server Components where appropriate
  - Ensure Client Components are only used for interactive features
  - Implement proper data fetching patterns for song pages
  - _Requirements: 5.1, 6.1_

- [ ] 7. Add responsive design and mobile optimizations

  - Test and refine responsive breakpoints across all components
  - Optimize touch interactions for mobile annotation system
  - Ensure proper mobile navigation and search functionality
  - Test performance on mobile devices
  - _Requirements: 5.4, 2.2, 7.4_

- [ ] 8. Implement accessibility features

  - Add proper ARIA labels and semantic HTML structure
  - Implement keyboard navigation for all interactive elements
  - Add focus management for annotation popups
  - Test with screen readers and ensure proper contrast ratios
  - _Requirements: 6.1, 7.2, 7.4_

- [ ] 9. Add error handling and loading states

  - Implement error boundaries for component-level error handling
  - Add skeleton loading components for song cards and lyrics
  - Handle network errors and invalid routes gracefully
  - Add proper TypeScript error handling throughout
  - _Requirements: 5.2, 5.3, 6.1_

- [ ] 10. Final integration and testing
  - Test complete user flow from homepage to song details
  - Verify all annotation interactions work correctly
  - Test responsive behavior across different screen sizes
  - Ensure all components work together seamlessly
  - Validate that the app runs successfully with npm run dev
  - _Requirements: 1.1, 3.1, 3.2, 3.3, 3.4, 3.5, 5.5_
