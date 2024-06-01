import { Question } from "../../enterprise/entities/question";
import { AnswerRepository } from "../repositories/answers-repository";
import { QuestionsRepository } from "../repositories/questions-repository";

interface ChooseQuestionBestAnswerUseCaseReq {
  answerId: string;
  authorId: string;
}

interface ChooseQuestionBestAnswerUseCaseRes {
  question: Question;
}
export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answerRepository: AnswerRepository
  ) {}

  async handle({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerUseCaseReq): Promise<ChooseQuestionBestAnswerUseCaseRes> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found");
    }
    const question = await this.questionsRepository.findById(
      answer.questionId.toValue()
    );

    if (!question) {
      throw new Error("Question not found");
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error("Not allowed");
    }

    question.bestAnswerId = answer.id;

    await this.questionsRepository.save(question);

    return { question };
  }
}
