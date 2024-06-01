import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";

interface EditQuestionUseCaseReq {
  questionId: string;
  authorId: string;
  title: string;
  content: string;
}

interface EditQuestionUseCaseRes {
  question: Question;
}

export class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async handle({
    questionId,
    authorId,
    title,
    content,
  }: EditQuestionUseCaseReq): Promise<EditQuestionUseCaseRes> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      throw new Error("Question not found");
    }
    if (authorId !== question.authorId.toString()) {
      throw new Error("Not allowed");
    }

    question.title = title;
    question.content = content;

    await this.questionsRepository.save(question);

    return { question };
  }
}
