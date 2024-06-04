import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface DeleteAnswerCommentUseCaseReq {
  authorId: string;
  answerCommentId: string;
}

interface DeleteAnswerCommentUseCaseRes {}

export class DeleteAnswerCommentUseCase {
  constructor(private questionCommentRepository: AnswerCommentsRepository) {}

  async handle({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseReq): Promise<DeleteAnswerCommentUseCaseRes> {
    const answerComment = await this.questionCommentRepository.findById(
      answerCommentId
    );

    if (!answerComment) {
      throw new Error("Answer not found");
    }
    if (answerComment.authorId.toString() !== authorId) {
      throw new Error("Not allowed");
    }

    await this.questionCommentRepository.delete(answerComment);
    return {};
  }
}
