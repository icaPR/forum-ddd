import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repositories";
import { CreateQuestionUseCase } from "./create-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe("Create a question ", async () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to create a question ", async () => {
    const result = await sut.handle({
      authorId: "1",
      title: "New Question",
      content: "Content",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryQuestionsRepository.item[0]).toEqual(result.value?.question);
  });
});
