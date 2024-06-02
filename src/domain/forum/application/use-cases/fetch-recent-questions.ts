import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";

interface FetchRecentQuestionsUseCaseReq {
  page: number;
}

interface FetchRecentQuestionsUseCaseRes {
  questions: Question[];
}

export class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async handle({
    page,
  }: FetchRecentQuestionsUseCaseReq): Promise<FetchRecentQuestionsUseCaseRes> {
    const questions = await this.questionsRepository.findManyRecent({ page });

    return { questions };
  }
}
