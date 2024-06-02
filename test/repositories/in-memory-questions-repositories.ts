import { PaginationParams } from "@/core/repositories/pagination-params";
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
  async findManyRecent({ page }: PaginationParams) {
    const questions = this.item
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20);

    return questions;
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
