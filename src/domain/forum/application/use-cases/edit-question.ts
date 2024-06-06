import { Either, left, right } from "@/core/either";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";
import { NotAllowedError } from "./errors/not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface EditQuestionUseCaseReq {
  questionId: string;
  authorId: string;
  title: string;
  content: string;
}

type EditQuestionUseCaseRes = Either<
  {
    question: Question;
  },
  ResourceNotFoundError | NotAllowedError
>;

export class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async handle({
    questionId,
    authorId,
    title,
    content,
  }: EditQuestionUseCaseReq): Promise<EditQuestionUseCaseRes> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      return left(new ResourceNotFoundError());
    }
    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError());
    }

    question.title = title;
    question.content = content;

    await this.questionsRepository.save(question);

    return right({ question });
  }
}
