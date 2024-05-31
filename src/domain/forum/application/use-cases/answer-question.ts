import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AnswerRepository } from "../repositories/answers-repository";
import { Answer } from "../../enterprise/entities/answer";

interface AnswerQuestionUseCaseReq {
  instructorId: string;
  questionId: string;
  content: string;
}
interface AnswerQuestionUseCaseRes {
  answer: Answer;
}
export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async handle({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseReq): Promise<AnswerQuestionUseCaseRes> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    });
    await this.answerRepository.create(answer);
    return { answer };
  }
}
