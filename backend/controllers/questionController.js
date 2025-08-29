import Question from "../models/Question.js";
import Session from "../models/Session.js";

// router.post("/add", protect, addQuestionToSession);
export const addQuestionToSession = async (req, res) => {
  const { session, questions } = req.body;
  if (
    !session ||
    !questions ||
    !Array.isArray(questions) ||
    questions.length === 0
  ) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  const getSession = await Session.findById(session);
  if (!getSession) {
    return res.status(404).json({ message: "Session not found" });
  }

  const createQuestions = await Question.insertMany(
    questions.map((q) => ({
      session: session,
      question: q.question,
      answer: q.answer,
    }))
  );
  getSession.questions.push(...createQuestions.map((q) => q._id));
  await getSession.save();
  res.status(201).json({
    message: "Questions added successfully",
    questions: createQuestions,
  });
};

export const togglePinQuestion = async (req, res) => {
  // Implementation for toggling the pin status of a question
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    question.isPinned = !question.isPinned;
    await question.save();
    res.status(200).json({
      message: "Question pin status updated",
      question,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateQuestionNote = async (req, res) => {
  // Implementation for updating a question's note
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    question.note = req.body.note || question.note;
    await question.save();
    res.status(200).json({
      message: "Question note updated",
      question,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
