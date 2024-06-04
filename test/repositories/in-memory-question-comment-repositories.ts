import { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public item: QuestionComment[] = [];

  async create(questionComment: QuestionComment) {
    this.item.push(questionComment);
  }

  async findById(questionCommentId: string) {
    const question = this.item.find(
      (item) => item.id.toString() === questionCommentId
    );

    if (!question) {
      throw null;
    }

    return question;
  }

  async delete(questionComment: QuestionComment) {
    const index = this.item.findIndex((item) => item.id === questionComment.id);

    this.item.splice(index, 1);
  }
}
