import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface FetchAnswerCommentsUseCaseReq {
  page: number;
  answerId: string;
}

interface FetchAnswerCommentsUseCaseRes {
  answerComments: AnswerComment[];
}

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async handle({
    page,
    answerId,
  }: FetchAnswerCommentsUseCaseReq): Promise<FetchAnswerCommentsUseCaseRes> {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, {
        page,
      });

    return { answerComments };
  }
}
