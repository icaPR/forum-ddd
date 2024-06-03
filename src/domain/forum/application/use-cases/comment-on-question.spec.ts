import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comment-repositories";
import { CommentOnQuestionUseCase } from "./comment-on-question";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repositories";
import { makeQuestion } from "test/factories/make-questions";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: CommentOnQuestionUseCase;

describe("Create a comment on question ", async () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository
    );
  });

  it("should be able to comment a question ", async () => {
    const question = makeQuestion();
    await inMemoryQuestionsRepository.create(question);

    await sut.handle({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: "Comment!",
    });
    expect(inMemoryQuestionCommentsRepository.item[0].content).toEqual(
      "Comment!"
    );
  });
});
