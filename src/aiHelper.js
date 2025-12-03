// AI Helper: Breaks down big tasks into small, actionable steps

const taskPatterns = {
  // Project-based tasks
  project: {
    keywords: ['project', 'build', 'create', 'develop', 'design', 'launch'],
    steps: (task) => [
      `Define goals and requirements for ${extractMainSubject(task)}`,
      'Research and gather necessary resources',
      'Create a detailed outline or wireframe',
      'Break down into smaller milestones',
      'Start with the first milestone',
      'Review and iterate on progress',
      'Finalize and test the complete project'
    ]
  },

  // Learning tasks
  learning: {
    keywords: ['learn', 'study', 'understand', 'master', 'practice'],
    steps: (task) => [
      `Find quality resources about ${extractMainSubject(task)}`,
      'Set aside dedicated time for learning',
      'Start with basics and fundamentals',
      'Take notes and summarize key points',
      'Practice with hands-on exercises',
      'Review and test your understanding',
      'Apply knowledge to a real project'
    ]
  },

  // Writing tasks
  writing: {
    keywords: ['write', 'draft', 'compose', 'article', 'blog', 'essay', 'report'],
    steps: (task) => [
      `Brainstorm ideas for ${extractMainSubject(task)}`,
      'Create a clear outline',
      'Write a rough first draft',
      'Take a break, then review',
      'Edit for clarity and flow',
      'Proofread for errors',
      'Finalize and publish/submit'
    ]
  },

  // Organizational tasks
  organizing: {
    keywords: ['organize', 'clean', 'sort', 'declutter', 'arrange'],
    steps: (task) => [
      `Assess current state of ${extractMainSubject(task)}`,
      'Set clear organizing goals',
      'Gather necessary supplies',
      'Sort items into categories',
      'Remove or donate unwanted items',
      'Arrange remaining items logically',
      'Create a system to maintain organization'
    ]
  },

  // Planning tasks
  planning: {
    keywords: ['plan', 'prepare', 'schedule', 'coordinate'],
    steps: (task) => [
      `Clarify the purpose of ${extractMainSubject(task)}`,
      'List all required components',
      'Set a realistic timeline',
      'Identify potential challenges',
      'Create a step-by-step action plan',
      'Assign priorities to each step',
      'Review and adjust as needed'
    ]
  },

  // Exercise/Health tasks
  fitness: {
    keywords: ['exercise', 'workout', 'fitness', 'health', 'gym', 'run'],
    steps: (task) => [
      `Set a specific goal for ${extractMainSubject(task)}`,
      'Schedule workout times this week',
      'Start with a 5-minute warm-up',
      'Follow a beginner-friendly routine',
      'Track your progress daily',
      'Stay consistent for 21 days',
      'Gradually increase intensity'
    ]
  }
};

// Extract the main subject from task description
function extractMainSubject(task) {
  const words = task.toLowerCase().split(' ');
  const actionWords = ['learn', 'build', 'create', 'write', 'organize', 'plan', 'study', 'develop'];

  const actionIndex = words.findIndex(w => actionWords.some(a => w.includes(a)));

  if (actionIndex !== -1 && actionIndex < words.length - 1) {
    return words.slice(actionIndex + 1).join(' ');
  }

  return 'this task';
}

// Generic step breakdown for any task
function getGenericSteps(task) {
  return [
    `Understand exactly what needs to be done: ${task.substring(0, 50)}...`,
    'Break down into the smallest first action',
    'Gather any tools or resources needed',
    'Set a timer for 25 minutes (Pomodoro)',
    'Start with the easiest part first',
    'Take a 5-minute break after each session',
    'Review progress and adjust next steps'
  ];
}

// Main AI function to break down tasks
export function breakDownTask(taskDescription) {
  if (!taskDescription || taskDescription.trim().length < 5) {
    return {
      success: false,
      message: 'Please describe your task in more detail'
    };
  }

  const lowerTask = taskDescription.toLowerCase();

  // Find matching pattern
  for (const [category, pattern] of Object.entries(taskPatterns)) {
    if (pattern.keywords.some(keyword => lowerTask.includes(keyword))) {
      return {
        success: true,
        category,
        originalTask: taskDescription,
        steps: pattern.steps(taskDescription),
        estimatedTime: '2-4 hours',
        difficulty: calculateDifficulty(taskDescription)
      };
    }
  }

  // Default generic breakdown
  return {
    success: true,
    category: 'general',
    originalTask: taskDescription,
    steps: getGenericSteps(taskDescription),
    estimatedTime: '1-3 hours',
    difficulty: 'Medium'
  };
}

// Calculate difficulty based on task complexity
function calculateDifficulty(task) {
  const complexWords = ['complex', 'difficult', 'advanced', 'comprehensive', 'complete', 'full'];
  const simpleWords = ['simple', 'easy', 'quick', 'basic', 'small'];

  const lowerTask = task.toLowerCase();

  if (complexWords.some(w => lowerTask.includes(w))) return 'Hard';
  if (simpleWords.some(w => lowerTask.includes(w))) return 'Easy';

  return 'Medium';
}

// Generate motivational message based on task
export function getMotivationalMessage(category) {
  const messages = {
    project: "Great! Let's build something amazing step by step.",
    learning: "Learning is a journey. Each small step counts!",
    writing: "Every word you write brings you closer to done.",
    organizing: "A place for everything, and everything in its place.",
    planning: "Proper planning prevents poor performance!",
    fitness: "Your body will thank you. Let's get moving!",
    general: "You've got this! One step at a time."
  };

  return messages[category] || messages.general;
}

// Suggest focus music based on task type
export function suggestMusicForTask(category) {
  const musicSuggestions = {
    project: { genre: 'Lo-fi Hip Hop', tempo: 'Calm, steady beats' },
    learning: { genre: 'Classical Piano', tempo: 'Gentle, focused' },
    writing: { genre: 'Ambient', tempo: 'Minimal, atmospheric' },
    organizing: { genre: 'Upbeat Instrumental', tempo: 'Energetic' },
    planning: { genre: 'Jazz', tempo: 'Smooth, thoughtful' },
    fitness: { genre: 'Electronic', tempo: 'High energy' },
    general: { genre: 'Nature Sounds', tempo: 'Peaceful' }
  };

  return musicSuggestions[category] || musicSuggestions.general;
}
