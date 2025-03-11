const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/recommend', async (req, res) => {
  const { input } = req.body;

  const learningPaths = [

      // Existing Learning Paths
      {
        id: '1',
        title: 'Web Development Fundamentals',
        description: 'Master the basics of web development with HTML, CSS, and JavaScript',
        skills: [
          { id: 'html', name: 'HTML', level: 'beginner' },
          { id: 'css', name: 'CSS', level: 'beginner' },
          { id: 'js', name: 'JavaScript', level: 'beginner' },
        ],
        duration: '12 weeks',
        difficulty: 'beginner',
      },
      {
        id: '2',
        title: 'Data Science Essentials',
        description: 'Learn the fundamentals of data science and machine learning',
        skills: [
          { id: 'python', name: 'Python', level: 'intermediate' },
          { id: 'stats', name: 'Statistics', level: 'intermediate' },
          { id: 'ml', name: 'Machine Learning', level: 'intermediate' },
        ],
        duration: '16 weeks',
        difficulty: 'intermediate',
      },
      {
        id: '3',
        title: 'Cloud Architecture',
        description: 'Advanced cloud computing and system design',
        skills: [
          { id: 'aws', name: 'AWS', level: 'advanced' },
          { id: 'devops', name: 'DevOps', level: 'advanced' },
          { id: 'security', name: 'Security', level: 'advanced' },
        ],
        duration: '20 weeks',
        difficulty: 'advanced',
      },
    
      // New Learning Paths
      {
        id: '4',
        title: 'Artificial Intelligence Fundamentals',
        description: 'Introduction to AI and neural networks',
        skills: [
          { id: 'python', name: 'Python', level: 'beginner' },
          { id: 'ai', name: 'AI', level: 'beginner' },
          { id: 'neural-networks', name: 'Neural Networks', level: 'beginner' },
        ],
        duration: '14 weeks',
        difficulty: 'beginner',
      },
      {
        id: '5',
        title: 'Mobile App Development',
        description: 'Build cross-platform mobile apps with React Native and Flutter',
        skills: [
          { id: 'react-native', name: 'React Native', level: 'intermediate' },
          { id: 'flutter', name: 'Flutter', level: 'intermediate' },
          { id: 'android', name: 'Android Development', level: 'intermediate' },
        ],
        duration: '16 weeks',
        difficulty: 'intermediate',
      },
      {
        id: '6',
        title: 'Cybersecurity Basics',
        description: 'Learn about network security, encryption, and penetration testing',
        skills: [
          { id: 'network', name: 'Network Security', level: 'beginner' },
          { id: 'encryption', name: 'Encryption', level: 'beginner' },
          { id: 'pentest', name: 'Penetration Testing', level: 'beginner' },
        ],
        duration: '12 weeks',
        difficulty: 'beginner',
      },
      {
        id: '7',
        title: 'Blockchain Development',
        description: 'Develop and deploy smart contracts on Ethereum',
        skills: [
          { id: 'solidity', name: 'Solidity', level: 'advanced' },
          { id: 'ethereum', name: 'Ethereum', level: 'advanced' },
          { id: 'crypto', name: 'Cryptography', level: 'advanced' },
        ],
        duration: '18 weeks',
        difficulty: 'advanced',
      },
      {
        id: '8',
        title: 'Backend Development with Node.js',
        description: 'Master building RESTful APIs and working with databases',
        skills: [
          { id: 'nodejs', name: 'Node.js', level: 'intermediate' },
          { id: 'express', name: 'Express.js', level: 'intermediate' },
          { id: 'mongodb', name: 'MongoDB', level: 'intermediate' },
        ],
        duration: '16 weeks',
        difficulty: 'intermediate',
      },
      {
        id: '9',
        title: 'Frontend Development with React',
        description: 'Advanced React concepts and state management',
        skills: [
          { id: 'react', name: 'React', level: 'advanced' },
          { id: 'redux', name: 'Redux', level: 'advanced' },
          { id: 'typescript', name: 'TypeScript', level: 'advanced' },
        ],
        duration: '14 weeks',
        difficulty: 'advanced',
      },
      {
        id: '10',
        title: 'DevOps Mastery',
        description: 'Learn CI/CD, Docker, and Kubernetes',
        skills: [
          { id: 'docker', name: 'Docker', level: 'advanced' },
          { id: 'kubernetes', name: 'Kubernetes', level: 'advanced' },
          { id: 'ci/cd', name: 'CI/CD', level: 'advanced' },
        ],
        duration: '18 weeks',
        difficulty: 'advanced',
      },
    ];
     // Add existing learningPaths data here

  const prompt = `Based on this user input: "${input}", recommend the most relevant learning paths from the following list:\n${JSON.stringify(learningPaths)}`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: prompt }],
    });

    res.json({ recommendation: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
