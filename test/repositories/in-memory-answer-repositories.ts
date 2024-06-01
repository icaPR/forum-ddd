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

  async delete(answer: Answer) {
    const index = this.item.findIndex((item) => item.id === answer.id);

    this.item.splice(index, 1);
  }
}
