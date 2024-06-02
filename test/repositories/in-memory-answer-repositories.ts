import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswerRepository implements AnswerRepository {
  public item: Answer[] = [];

  async create(answer: Answer) {
    this.item.push(answer);
  }
  async findById(answerId: string) {
    const answer = this.item.find((item) => item.id.toString() === answerId);

    if (!answer) {
      throw null;
    }

    return answer;
  }
  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = this.item
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20);

    return answers;
  }

  async save(answer: Answer) {
    const index = this.item.findIndex((item) => item.id === answer.id);

    this.item[index] = answer;
  }
  async delete(answer: Answer) {
    const index = this.item.findIndex((item) => item.id === answer.id);

    this.item.splice(index, 1);
  }
}
