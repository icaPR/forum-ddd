import { AnswerRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswerRepository implements AnswerRepository {
  public item: Answer[] = [];

  async create(answer: Answer) {
    this.item.push(answer);
  }
}
