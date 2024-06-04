import { QuestionComment } from "../../enterprise/entities/question-comment";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface FetchQuestionCommentsUseCaseReq {
  page: number;
  questionId: string;
}

interface FetchQuestionCommentsUseCaseRes {
  questionComments: QuestionComment[];
}

export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async handle({
    page,
    questionId,
  }: FetchQuestionCommentsUseCaseReq): Promise<FetchQuestionCommentsUseCaseRes> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      });

    return { questionComments };
  }
}
