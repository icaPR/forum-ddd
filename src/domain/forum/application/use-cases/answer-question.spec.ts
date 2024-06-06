import { InMemoryAnswerRepository } from "test/repositories/in-memory-answer-repositories";
import { AnswerQuestionUseCase } from "./answer-question";

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: AnswerQuestionUseCase;

describe("Create an answer ", async () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository);
  });

  it("should be able to create an answer ", async () => {
    const result = await sut.handle({
      questionId: "1",
      instructorId: "1",
      content: "Content",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryAnswerRepository.item[0]).toEqual(result.value?.answer);
  });
});
