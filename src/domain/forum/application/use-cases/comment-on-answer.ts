import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { AnswerRepository } from "../repositories/answers-repository";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface CommentOnAnswerUseCaseReq {
  authorId: string;
  answerId: string;
  content: string;
}

interface CommentOnAnswerUseCaseRes {
  answerComment: AnswerComment;
}

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswerRepository,
    private answerCommentRepository: AnswerCommentsRepository
  ) {}

  async handle({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseReq): Promise<CommentOnAnswerUseCaseRes> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found");
    }
    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content,
    });

    await this.answerCommentRepository.create(answerComment);

    return { answerComment };
  }
}
