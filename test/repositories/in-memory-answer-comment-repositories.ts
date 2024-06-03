import { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public item: AnswerComment[] = [];

  async create(questionComment: AnswerComment) {
    this.item.push(questionComment);
  }
}
