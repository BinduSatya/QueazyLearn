export const conceptExplainPrompt = (question) =>
  `You are AI trained to generate explanations for concepts. Explain the concept of ${question}.

  Task:
  - Explain the following interview questions and its concepts in depth as if you are teaching a beginner level student/developer.
  - Question : ${question}
  - After the explanation, provide a short and clear title that summarizes the concept for the article or page header.
  - If the explanation needs a code example, add a small code block inside. 
  - Keep formatting very clean and clear.
  - Return the result as a valid JSON object in the following format:
  {
    "title": "Short title here",
    "explanation": "Detailed explanation here",
    "codeExample": "Code example if needed"
  }
  Important: Do not add any extra text. return only valid JSON.
  `;

export const questionAnswerPrompt = (
  role,
  experience,
  topicsToFocus,
  numberOfQuestions
) =>
  `You are an AI trained to generate technical interview questions and answers. 
   Task:
   - Role: ${role}
   - Candidate Experience: ${experience} years
   - Topics to focus: ${topicsToFocus}
   - Write ${numberOfQuestions} interview questions.
   - For each question, generate a detailed but beginner friendly answer. 
   - If the answer needs a code example, add a small code block inside. 
   - keep formatting very clean.
   - Return pure json array like:
   [
    {
      "question": "Question here?",
      "answer": "Answer here"
    },
    ...
   ]
    Important: Do not add any extra text. return only valid JSON.
`;
