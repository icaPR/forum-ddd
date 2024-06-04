import { AnswerComment } from "../../enterprise/entities/answer-comment";

export interface AnswerCommentsRepository {
  create(answerComment: AnswerComment): Promise<void>;
  findById(answerId: string): Promise<AnswerComment | null>;
  delete(answerComment: AnswerComment): Promise<void>;
}
