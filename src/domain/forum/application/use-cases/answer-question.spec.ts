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
    const { answer } = await sut.handle({
      questionId: "1",
      instructorId: "1",
      content: "Content",
    });

    expect(answer.content).toEqual("Content");
    expect(inMemoryAnswerRepository.item[0].id).toEqual(answer.id);
  });
});
