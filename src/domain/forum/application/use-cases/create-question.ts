import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";

interface CreateQuestionUseCaseReq {
  authorId: string;
  title: string;
  content: string;
}

interface CreateQuestionUseCaseRes {
  question: Question;
}

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async handle({
    authorId,
    title,
    content,
  }: CreateQuestionUseCaseReq): Promise<CreateQuestionUseCaseRes> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    });
    await this.questionsRepository.create(question);

    return { question };
  }
}
