import { QuestionsRepository } from "../repositories/questions-repository";

interface DeleteQuestionUseCaseReq {
  questionId: string;
  authorId: string;
}

interface DeleteQuestionUseCaseRes {}

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async handle({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseReq): Promise<DeleteQuestionUseCaseRes> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      throw new Error("Question not found");
    }
    if (authorId !== question.authorId.toString()) {
      throw new Error("Not allowed");
    }

    await this.questionsRepository.delete(question);

    return {};
  }
}
