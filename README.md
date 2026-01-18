# FrontendQuestion - Frontend Interview Preparation Platform

A comprehensive Next.js platform designed to help frontend engineers prepare for technical interviews at top companies. Features interactive mindmaps, question trees, live coding demos, and company-specific playbooks.

## 🚀 Features

### 📚 **Topic-Based Learning Paths**
- **React**: Hooks, performance, patterns, and advanced concepts
- **JavaScript**: Core concepts, async patterns, ES6+ features
- **Browser Internals**: Rendering pipeline, performance optimization
- **System Design**: Frontend architecture, component design patterns
- **Performance**: Core Web Vitals, scalability strategies
- **Testing**: Unit, integration, and e2e testing approaches

### 🧠 **Interactive Mindmaps**
- Visual knowledge graphs with clickable nodes
- SVG-based interactive visualizations
- Connected learning concepts with detailed explanations
- Sample: React Rendering Model with Virtual DOM, Reconciliation, and Fiber

### 🌳 **Question Trees**
- Progressive interview question flows
- Branching logic based on candidate responses
- Difficulty levels and expected signals for each question
- Sample: useCallback interview tree with 11 interconnected questions

### 💻 **Interactive Demos**
- Live coding demonstrations with real-time feedback
- Side-by-side code comparisons
- Copy functionality for easy reference
- Sample: Debounce vs Throttle with interactive examples

### 📖 **Company Playbooks**
- Company-specific interview preparation guides
- Role levels and salary expectations
- Interview process breakdowns and timing strategies
- Sample: Rippling playbook covering L3-L5 frontend roles

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.4 with custom dark theme
- **Components**: Custom UI component library
- **Data**: JSON-based content management
- **Development**: ESLint, PostCSS, Hot Module Replacement

## 🎨 Design System

- **Theme**: Professional dark theme with blue/cyan gradients
- **Typography**: Inter font with proper hierarchy
- **Components**: 15+ reusable UI components
- **Responsive**: Mobile-first design approach
- **Interactive**: Hover effects and smooth transitions

## 📁 Project Structure

```
src/
├── app/                     # Next.js App Router pages
│   ├── demos/[id]/          # Interactive coding demonstrations
│   ├── playbooks/[company]/ # Company-specific interview guides
│   ├── topics/[topic]/      # Topic-based learning paths
│   ├── tree/[id]/           # Question tree explorations
│   └── page.tsx             # Homepage with features showcase
├── components/
│   ├── ui/                  # Reusable UI component library
│   └── demos/               # Interactive demo components
├── data/                    # JSON data files for content
│   ├── mindmaps/            # Mindmap structures and data
│   ├── trees/               # Question tree hierarchies
│   ├── demos/               # Demo configurations
│   └── playbooks/           # Company interview guides
└── lib/                     # Utilities and type definitions
    └── types/               # TypeScript type definitions
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/ManMohanSingh031/frontend-interview-question-ui.git
   cd frontend-interview-question-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Current Content

### Sample Implementation
- ✅ React Rendering mindmap with Virtual DOM concepts
- ✅ useCallback question tree with progressive difficulty
- ✅ Debounce vs Throttle interactive demo
- ✅ Rippling company playbook (L3-L5 interview process)

### Topics Coverage
- **React**: 15 learning resources (Intermediate level)
- **JavaScript**: 20 learning resources (Beginner level)
- **Advanced Topics**: Browser, Performance, System Design, Testing

## 🔧 Development

The platform uses a modular architecture with:

- **Type-safe data structures** for all content types
- **File-based routing** with dynamic pages
- **JSON content management** for easy updates
- **Component composition** patterns
- **Server-side rendering** with client-side interactivity

## 🎨 Customization

### Adding New Content

1. **Mindmaps**: Add JSON files to `src/data/mindmaps/`
2. **Question Trees**: Add JSON files to `src/data/trees/`
3. **Demos**: Add JSON files to `src/data/demos/`
4. **Playbooks**: Add JSON files to `src/data/playbooks/`

### Component Development

All UI components follow consistent patterns with:
- TypeScript interfaces for props
- Tailwind CSS for styling
- Responsive design considerations
- Accessibility best practices

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ for frontend engineers preparing for their next career opportunity.