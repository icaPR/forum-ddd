import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public item: Question[] = [];

  async create(question: Question) {
    this.item.push(question);
  }

  async findBySlug(slug: string) {
    const question = this.item.find((item) => item.slug.value === slug);

    if (!question) {
      throw new Error("Question not found");
    }

    return question;
  }

  async findById(questionId: string) {
    const question = this.item.find(
      (item) => item.id.toString() === questionId
    );

    if (!question) {
      throw null;
    }

    return question;
  }
  async save(question: Question) {
    const index = this.item.findIndex((item) => item.id === question.id);

    this.item[index] = question;
  }

  async delete(question: Question) {
    const index = this.item.findIndex((item) => item.id === question.id);

    this.item.splice(index, 1);
  }
}
