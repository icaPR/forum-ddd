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
    const { question } = await sut.handle({
      authorId: "1",
      title: "New Question",
      content: "Content",
    });

    expect(question.id).toBeTruthy();
    expect(inMemoryQuestionsRepository.item[0].id).toEqual(question.id);
  });
});
