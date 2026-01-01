# React Native Content App

A content-driven React Native application built using modern best practices.  
The app demonstrates real-world handling of dynamic data, performance, navigation, and user experience under uncertain network conditions.

---

##  Features

###  Home
- Welcome screen introducing app purpose
- Clear navigation entry points
- Two primary modules:
  - Posts
  - Products

###  Posts Module
- Data fetched from **DummyJSON Posts API**
- FlatList with:
  - Pagination (infinite scroll)
  - Pull-to-refresh
- Loading skeletons using **React Native Paper**
- Graceful error handling
- Detail screen with:
  - Full content
  - Tags
  - Interactive like button

###  Products Module
- Data fetched from **DummyJSON Products API**
- Optimized list rendering
- Product detail screen showing:
  - Image
  - Price
  - Rating
  - Stock
  - Description
- Consistent UI & loading states

---

##  Tech Stack

- **React Native (0.83+)**
- **Functional Components & Hooks**
- **React Navigation (Native Stack)**
- **React Native Paper**
- **React Native Vector Icons**
- **Safe Area Context**
- **DummyJSON Public API**

---

##  Setup Instructions

###  Install Dependencies
```bash
npm install
