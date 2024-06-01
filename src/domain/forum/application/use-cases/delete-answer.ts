import { AnswerRepository } from "../repositories/answers-repository";

interface DeleteAnswerUseCaseReq {
  answerId: string;
  authorId: string;
}

interface DeleteAnswerUseCaseRes {}

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async handle({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseReq): Promise<DeleteAnswerUseCaseRes> {
    const question = await this.answerRepository.findById(answerId);

    if (!question) {
      throw new Error("Answer not found");
    }
    if (authorId !== question.authorId.toString()) {
      throw new Error("Not allowed");
    }

    await this.answerRepository.delete(question);

    return {};
  }
}
