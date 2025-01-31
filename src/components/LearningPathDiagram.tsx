import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { LearningPath } from '../types';

interface Props {
  path: LearningPath;
}

export default function LearningPathDiagram({ path }: Props) {
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (diagramRef.current) {
      mermaid.initialize({ 
        startOnLoad: true,
        theme: 'neutral',
        flowchart: {
          curve: 'basis'
        }
      });

      const diagram = `
        graph TD
          Start[Start] --> Goals[Define Learning Goals]
          Goals --> Analysis[AI Analysis]
          Analysis --> Style[Learning Style Assessment]
          Style --> Time[Time Availability Check]
          Time --> Skills[Skills Assessment]
          Skills --> Path[Generate Learning Path]
          Path --> Modules[Course Modules]
          
          subgraph Modules
            M1[${path.skills[0]?.name || 'Module 1'}] --> M2[${path.skills[1]?.name || 'Module 2'}]
            M2 --> M3[${path.skills[2]?.name || 'Module 3'}]
          end
          
          Modules --> Progress[Track Progress]
          Progress --> Feedback[AI Feedback Loop]
          Feedback --> |Adjust Path| Analysis
      `;

      // Use a unique ID for each render
      const uniqueId = `learning-path-diagram-${path.id}`;
      
      mermaid.render(uniqueId, diagram).then(({ svg }) => {
        if (diagramRef.current) {
          diagramRef.current.innerHTML = svg;
        }
      }).catch(error => {
        console.error('Error rendering diagram:', error);
      });
    }
  }, [path]);

  return (
    <div ref={diagramRef} className="w-full overflow-x-auto bg-white p-4 rounded-lg shadow-sm" />
  );
}