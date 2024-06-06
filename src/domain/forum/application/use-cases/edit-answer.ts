import { Either, left, right } from "@/core/either";
import { Answer } from "../../enterprise/entities/answer";
import { AnswerRepository } from "../repositories/answers-repository";
import { NotAllowedError } from "./errors/not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface EditAnswerUseCaseReq {
  answerId: string;
  authorId: string;
  content: string;
}

type EditAnswerUseCaseRes = Either<
  {
    answer: Answer;
  },
  ResourceNotFoundError | NotAllowedError
>;

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async handle({
    answerId,
    authorId,
    content,
  }: EditAnswerUseCaseReq): Promise<EditAnswerUseCaseRes> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }
    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError());
    }

    answer.content = content;

    await this.answerRepository.save(answer);

    return right({ answer });
  }
}
