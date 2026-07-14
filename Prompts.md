# Sprint 12 Development Prompts

1. I have an existing Next.js 15 movie application. How can I integrate Storybook into the project without affecting the existing functionality?

2. During Storybook installation, which configuration options should I select for component development, documentation, accessibility, and testing?

3. I installed Storybook in my Next.js project. Explain the purpose of the generated files like main.js, preview.jsx, and vitest configuration.

4. My Storybook components are rendering only plain text and not showing the application's styling. Help me debug the missing CSS configuration.

5. Storybook throws an error when loading globals.css. Explain why this happens and provide the correct configuration approach.

6. How should I configure preview.jsx in Storybook to apply my Next.js global styles and maintain consistency with the application UI?

7. My components use Redux Toolkit through useSelector and useDispatch. How can I create a reusable Redux Provider decorator for Storybook stories?

8. Create a Storybook setup approach for testing state-dependent components like Navbar and MovieCard with different Redux states.

9. How can I write a Storybook story for MovieCard that displays different scenarios such as default movie and favorite movie states?

10. How can I pass mock movie data through Storybook args while keeping the stories clean and reusable?

11. My TMDB image URLs work in the browser but images are broken inside Storybook. Help me identify the cause and fix the issue.

12. My Storybook SearchSection component depends on API calls. How should I handle API data and avoid real API requests while testing components?

13. SearchSection is giving 404 errors for API routes inside Storybook. Explain why this happens and suggest the correct mocking approach.

14. How can I test components with different user interactions in Storybook, such as search input, filters, and favorite buttons?

15. Storybook generated default example files that are not related to my project. Which files should be removed before committing?

16. Review my Storybook folder structure and suggest whether it contains only project-related components and configurations.

17. I created Storybook stories for my components. How can I verify that they follow good component testing practices?

18. My Git repository contains previous sprint history. How should I create and push Sprint 12 changes into a separate repository correctly?

19. Before deployment, what checks should I perform to ensure Storybook integration has not affected the Next.js production build?

20. Review my final Storybook setup and suggest improvements needed before project submission.
