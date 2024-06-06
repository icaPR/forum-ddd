import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AnswerRepository } from "../repositories/answers-repository";
import { Answer } from "../../enterprise/entities/answer";
import { Either, right } from "@/core/either";

interface AnswerQuestionUseCaseReq {
  instructorId: string;
  questionId: string;
  content: string;
}

type AnswerQuestionUseCaseRes = Either<{ answer: Answer }, null>;

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
    return right({ answer });
  }
}
