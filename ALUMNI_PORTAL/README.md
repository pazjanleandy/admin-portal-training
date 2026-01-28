### Training & Learning Page Enhancements

NOTE: This README assumes you have already followed the setup and guidelines in Andrei50’s original repository README, as this project is based on a cloned version of that repository.

#### Sidebar Integration
- Added `id="app-sidebar"` to the root div of Sidebar.jsx to allow TrainingLearning.jsx to detect sidebar width (used for responsive filter layout).

#### New Components
Added under `src/components/Training_Learning/`:
- `FiltersPanel.jsx`
  - Reusable filter layout component
  - Supports inline and sidebar modes
  - Configurable via props: variant, showSearch, showClearTop, showClearBottom
- `SkillFilterDropdown.jsx`
  - Styled dropdown consistent with existing filter components

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
