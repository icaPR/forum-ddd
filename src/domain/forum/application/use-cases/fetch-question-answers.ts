import { Answer } from "../../enterprise/entities/answer";
import { AnswerRepository } from "../repositories/answers-repository";

interface FetchQuestionAnswersUseCaseReq {
  page: number;
  questionId: string;
}

interface FetchQuestionAnswersUseCaseRes {
  answers: Answer[];
}

export class FetchQuestionAnswersUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async handle({
    page,
    questionId,
  }: FetchQuestionAnswersUseCaseReq): Promise<FetchQuestionAnswersUseCaseRes> {
    const answers = await this.answerRepository.findManyByQuestionId(
      questionId,
      { page }
    );

    return { answers };
  }
}
