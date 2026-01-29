## Training & Learning Page Enhancements

> **Note:** This README assumes you have already followed the setup and guidelines in Andrei-code05’s original repository README, as this project is based on a cloned version of that repository.

### Prerequisite
Please run the following command before testing the UI:
```bash
'npm install react-icons'

#### Sidebar Integration
- Added `id="app-sidebar"` to the root div of Sidebar.jsx to allow TrainingLearning.jsx to detect sidebar width (used for responsive filter layout).
- Added Dropdown menu in the sidebar for the certifications page navigation.

#### New Components
Added under `src/components/Training_Learning/`:
- `FiltersPanel.jsx`
  - Reusable filter layout component
  - Supports inline and sidebar modes
  - Configurable via props: `variant`, `showSearch`, `showClearTop`, `showClearBottom`

- `SkillFilterDropdown.jsx`
  - Styled dropdown consistent with existing filter components

- `CourseCard.jsx`
  - Displays a single course item card (title, details, link/actions)

- `CreateCourseModal.jsx`
  - Modal form UI for creating a new course entry

- `RecCourses.jsx`
  - “Recommended for you” carousel section (supports full-bleed layout)

- `LearningPaths.jsx`
  - Learning paths / roadmap section (grouped path content UI)

- `LearningPlatformsCarousel.jsx`
  - Horizontal carousel for learning platform cards (logos + external links)

- `ViewHistoryCertification.jsx`
  - Certification history / viewed certification details component (for tracking/display)

- `TrainingLearningDummyData.jsx`
  - Dummy data source for courses + platforms (used for UI testing/demo)

- `CertificationDummyData.jsx`
  - Dummy data source for certifications (used for UI testing/demo)

#### Other UI Components
Located under `src/components/`:
- `CertificateCard.jsx`
  - Card component for displaying a single certification (status, title, basic details)

- `ContinueCertificationCard.jsx`
  - Specialized card for showing in-progress certifications
  - Emphasizes continuation actions (e.g., resume, view progress)


#### TrainingLearning.jsx Behavior
- Implements responsive filter layout:
  - When sidebar is expanded → filters appear inline below search bar
  - When sidebar is collapsed → filters appear in a left-side panel
- Uses ResizeObserver on `#app-sidebar` (no Layout.jsx changes required)
- Search bar remains centered regardless of sidebar state
- All changes are isolated to the Training & Learning page only

#### Architecture Note
- No modifications were made to Layout.jsx behavior
- No global layout side effects introduced



