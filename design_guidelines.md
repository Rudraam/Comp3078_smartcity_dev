# Smart City App Design Guidelines

## Design Approach
**Reference-Based Approach** - Drawing inspiration from travel and utility apps like Airbnb (for city exploration) and modern productivity tools like Notion (for information organization). This hybrid approach balances visual appeal with functional data presentation.

## Core Design Elements

### Color Palette
**Light Mode:**
- Primary: 220 85% 45% (Modern blue for trust and technology)
- Secondary: 200 25% 25% (Sophisticated dark gray)
- Accent: 160 60% 50% (Fresh teal for highlights)
- Background: 0 0% 98% (Clean off-white)

**Dark Mode:**
- Primary: 220 70% 60% (Lighter blue for visibility)
- Secondary: 200 15% 85% (Light gray text)
- Accent: 160 50% 65% (Muted teal)
- Background: 220 25% 8% (Deep blue-black)

### Typography
- **Primary**: Inter (clean, modern readability)
- **Display**: Outfit (friendly headings)
- Hierarchy: text-4xl/3xl for headers, text-lg for body, text-sm for metadata

### Layout System
**Tailwind Spacing**: Consistent use of 4, 6, 8, 12, 16, 24 units
- Cards: p-6, gap-4
- Sections: py-12, px-4
- Component spacing: space-y-6

### Component Library

**Registration/Auth:**
- Clean form cards with subtle shadows
- Input fields with focus states matching primary color
- Social login options with icon integration

**Welcome Page:**
- Large hero section with city skyline imagery
- Animated greeting cards showcasing app features
- Smooth fade-in animations for content sections

**City Search:**
- Prominent search bar with autocomplete dropdown
- Recent/popular cities as quick-select chips
- Map integration preview

**City Dashboard:**
- Grid layout with information cards
- Weather widget with icons and gradients
- Pollution meter with color-coded indicators
- Event cards with imagery and quick actions
- Transport/restaurant/hotel sections with clear CTAs

**Navigation:**
- Bottom tab bar for mobile (Home, Search, Favorites, Profile)
- Side navigation for desktop
- Breadcrumb navigation for city details

### Images
**Hero Image**: Large panoramic city skyline (1920x800) on welcome page showing diverse urban landscapes with subtle overlay gradient from primary color
**City Cards**: Medium landscape images (400x250) for each city showing iconic landmarks
**Feature Icons**: Weather, pollution, events, transport, dining, accommodation icons from Heroicons
**Background Elements**: Subtle geometric patterns or city silhouettes as decorative elements

### Animations
- Minimal and purposeful only
- Page transitions: subtle slide effects
- Loading states: skeleton screens for data fetching
- Card hover: gentle lift with shadow increase

## Key Design Principles
1. **Information Hierarchy**: Clear visual separation between data types
2. **Progressive Disclosure**: Show essential info first, details on demand
3. **Accessibility**: High contrast ratios, consistent dark mode
4. **Mobile-First**: Touch-friendly interactions, thumb-zone navigation
5. **Data Visualization**: Charts and meters for pollution/weather data

This design creates a trustworthy, modern interface that makes city exploration feel both informative and delightful.