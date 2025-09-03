import Session from "../models/Session.js";
import Question from "../models/Question.js";

// router.post("/create", protect, createSession);
// Creating a new session and related questions
export const createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions } =
      req.body;

    console.log(role, experience, topicsToFocus, description);

    const user = req.user._id;
    const session = await Session.create({
      userId: user,
      role,
      experience,
      topicsToFocus,
      description,
    });
    console.log("session created", session);

    const questionDocs = await Promise.all(
      questions.map(async (q) => {
        const question = await Question.create({
          session: session._id,
          question: q.question,
          answer: q.answer,
        });
        console.log("question created", question);
        return question._id;
      })
    );

    session.questions = questionDocs;
    await session.save();
    console.log("sessions updated");

    res.status(201).json({
      message: "Session created successfully",
      session,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating session", error });
  }
};

// router.get("/user-sessions", protect, getUserSessions);
// Get all sessions for a user
export const getUserSessions = async (req, res) => {
  try {
    const userId = req.user._id;
    const sessions = await Session.find({ userId })
      .sort({ createdAt: -1 })
      .populate("questions");
    res
      .status(200)
      .json({ message: "User sessions retrieved successfully", sessions });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user sessions", error });
  }
};

// router.get("/:id", protect, getSessionById);
export const getSessionById = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await Session.findById(id)
      ?.populate({
        path: "questions",
        option: { sort: { isPinned: -1, createdAt: 1 } },
      })
      .exec();

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    res
      .status(200)
      .json({ message: "Session retrieved successfully", session });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving session", error });
  }
};

// router.delete("/:id", protect, deleteSession);
export const deleteSession = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await Session.findById(id);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this session" });
    }
    await Question.deleteMany({ session: session._id });
    await session.deleteOne();
    res.status(200).json({ message: "Session deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting session", error });
  }
};
