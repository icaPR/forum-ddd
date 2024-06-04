import { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public item: AnswerComment[] = [];

  async create(answerComment: AnswerComment) {
    this.item.push(answerComment);
  }
  async findById(answerCommentId: string) {
    const answer = this.item.find(
      (item) => item.id.toString() === answerCommentId
    );

    if (!answer) {
      throw null;
    }

    return answer;
  }

  async delete(answerComment: AnswerComment) {
    const index = this.item.findIndex((item) => item.id === answerComment.id);

    this.item.splice(index, 1);
  }
}
