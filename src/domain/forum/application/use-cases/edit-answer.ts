import { Answer } from "../../enterprise/entities/answer";
import { AnswerRepository } from "../repositories/answers-repository";

interface EditAnswerUseCaseReq {
  answerId: string;
  authorId: string;
  content: string;
}

interface EditAnswerUseCaseRes {
  answer: Answer;
}

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async handle({
    answerId,
    authorId,
    content,
  }: EditAnswerUseCaseReq): Promise<EditAnswerUseCaseRes> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found");
    }
    if (authorId !== answer.authorId.toString()) {
      throw new Error("Not allowed");
    }

    answer.content = content;

    await this.answerRepository.save(answer);

    return { answer };
  }
}
