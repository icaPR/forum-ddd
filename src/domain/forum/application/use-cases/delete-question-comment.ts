import { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface DeleteQuestionCommentUseCaseReq {
  authorId: string;
  questionCommentId: string;
}

interface DeleteQuestionCommentUseCaseRes {}

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentRepository: QuestionCommentsRepository) {}

  async handle({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseReq): Promise<DeleteQuestionCommentUseCaseRes> {
    const questionComment = await this.questionCommentRepository.findById(
      questionCommentId
    );

    if (!questionComment) {
      throw new Error("Question not found");
    }
    if (questionComment.authorId.toString() !== authorId) {
      throw new Error("Not allowed");
    }

    await this.questionCommentRepository.delete(questionComment);
    return {};
  }
}
